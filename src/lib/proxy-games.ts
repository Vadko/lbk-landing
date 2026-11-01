import { type NextRequest, NextResponse } from "next/server";
import { getDeletedSlugs } from "@/lib/deleted-slugs-cache";
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

// Parse /games/:slug and /games/:slug/:team, or null for anything else.
function parseGamePath(
  pathname: string
): { slug: string; teamSlug: string | null } | null {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const segments = normalized.split("/").filter(Boolean);

  if (segments[0] !== "games" || segments.length < 2 || segments.length > 3) {
    return null;
  }

  return {
    slug: decodeURIComponent(segments[1]),
    teamSlug: segments[2] ? decodeURIComponent(segments[2]) : null,
  };
}

async function decide(
  slug: string,
  teamSlug: string | null
): Promise<NextResponse> {
  // Hot path: slug was never deleted → page handles it (renders 200, or for a
  // missing/renamed URL issues its own 404 / 308). No Supabase hit.
  const deletedSlugs = await getDeletedSlugs();
  if (!deletedSlugs.has(slug)) {
    return NextResponse.next();
  }

  // Slug is tombstoned. Confirm it's still gone — a slug re-created under the
  // same name renders normally and the old tombstone is ignored.
  if (await slugExistsLive(slug)) {
    return NextResponse.next();
  }

  // A rename leaves a redirect entry → let the page issue its 308 instead.
  const canonicalPath = teamSlug
    ? `/games/${slug}/${teamSlug}`
    : `/games/${slug}`;
  if (await fetchRedirect(canonicalPath)) {
    return NextResponse.next();
  }

  return statusPageResponse("/gone", 410);
}

/**
 * Resolve a /games/* request to a 410 / 308 / next() response, or null if the
 * path isn't a game page (so the proxy can handle it normally).
 */
export async function resolveGamePath(
  request: NextRequest
): Promise<NextResponse | null> {
  const game = parseGamePath(request.nextUrl.pathname);
  if (!game) {
    return null;
  }
  return decide(game.slug, game.teamSlug);
}
