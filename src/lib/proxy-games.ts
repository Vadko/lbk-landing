import { type NextRequest, NextResponse } from "next/server";
import { localizedPath } from "@/i18n/locale-path";
import { getDeletedSlugs } from "@/lib/deleted-slugs-cache";
import { parseGamePath } from "@/lib/game-path";
import {
  fetchLiveTeamSlugs,
  gamePathKey,
  getGamePaths,
} from "@/lib/game-paths-cache";
import { notFoundResponse } from "@/lib/not-found-response";
import { fetchRedirect, findMovedGamePath } from "@/lib/redirects";
import { statusPageResponse } from "@/lib/status-page";

// Only live translations reach the page: a blocking render of any other slug would be written to the ISR cache on disk, one entry per URL
export async function resolveGamePath(
  request: NextRequest
): Promise<NextResponse | null> {
  const game = parseGamePath(request.nextUrl.pathname);
  if (!game) {
    return null;
  }
  const { locale, section, slug, teamSlug } = game;

  // Hot path: one Redis read, no Supabase
  const gamePaths = await getGamePaths();
  if (gamePaths.has(gamePathKey(slug, teamSlug))) {
    return null;
  }

  // The cached set may predate a new translation; on a Supabase error the page decides as before
  const liveTeams = await fetchLiveTeamSlugs(slug);
  if (
    !liveTeams ||
    (liveTeams.size > 0 && (!teamSlug || liveTeams.has(teamSlug)))
  ) {
    return null;
  }

  const movedPath = await findMovedGamePath(slug, teamSlug, fetchRedirect);
  if (movedPath) {
    const target =
      section === "open" ? movedPath.replace(/^\/games/, "/open") : movedPath;
    const url = new URL(localizedPath(target, locale), request.url);
    url.search = request.nextUrl.search;
    // /games keeps 308 so search engines move the authority; /open is a noindex deep link
    return NextResponse.redirect(url, section === "open" ? 307 : 308);
  }

  // A real 410 for a deleted translation makes search engines drop the URL instead of treating it as a soft 404
  if (
    section === "games" &&
    liveTeams.size === 0 &&
    (await getDeletedSlugs()).has(slug)
  ) {
    return statusPageResponse("/gone", 410, {}, locale);
  }

  return notFoundResponse(request, locale);
}
