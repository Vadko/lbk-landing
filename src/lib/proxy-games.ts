import type { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/i18n/routing";
import { getDeletedSlugs } from "@/lib/deleted-slugs-cache";
import { parseGamePath } from "@/lib/game-path";
import { fetchRedirect } from "@/lib/redirects";
import { statusPageResponse } from "@/lib/status-page";
import { createServerClient } from "@/lib/supabase/server";

// Decides the response for /games/* requests so deleted translations return a
// real "410 Gone" — search engines drop the URL from the index quickly instead
// of treating it as a soft 404.

// Lightweight live check (HEAD count, no rows) — only runs for a tombstoned
// slug, to confirm it's really gone and wasn't re-created under the same slug.
async function slugExistsLive(slug: string): Promise<boolean> {
  const supabase = createServerClient();
  const { count } = await supabase
    .from("games")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug)
    .eq("approved", true)
    .eq("hide", false);

  return (count ?? 0) > 0;
}

async function decide(
  slug: string,
  teamSlug: string | null,
  locale: Locale
): Promise<NextResponse | null> {
  // Hot path: slug was never deleted → the page handles it (renders 200, or for a
  // missing/renamed URL issues its own 404 / 308). No Supabase hit.
  const deletedSlugs = await getDeletedSlugs();
  if (!deletedSlugs.has(slug)) {
    return null;
  }

  // Slug is tombstoned. Confirm it's still gone — a slug re-created under the
  // same name renders normally and the old tombstone is ignored.
  if (await slugExistsLive(slug)) {
    return null;
  }

  // A rename leaves a redirect entry → let the page issue its 308 instead.
  const canonicalPath = teamSlug
    ? `/games/${slug}/${teamSlug}`
    : `/games/${slug}`;
  if (await fetchRedirect(canonicalPath)) {
    return null;
  }

  return statusPageResponse("/gone", 410, {}, locale);
}

/**
 * Resolve a /games/* request to a 410 response, or null to let the request
 * continue (a live page, a rename the page redirects, or not a game path).
 */
export async function resolveGamePath(
  request: NextRequest
): Promise<NextResponse | null> {
  const game = parseGamePath(request.nextUrl.pathname);
  if (!game) {
    return null;
  }
  return decide(game.slug, game.teamSlug, game.locale);
}
