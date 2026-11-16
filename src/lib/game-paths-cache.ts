import { getFromCache, setCache } from "@/lib/cache";
import { createServerClient } from "@/lib/supabase/server";
import { teamToSlug } from "@/lib/transliterate";

const GAME_PATHS_KEY = "games:paths";
const GAME_PATHS_TTL_SECONDS = 86_400;

export function gamePathKey(slug: string, teamSlug: string | null): string {
  return teamSlug ? `${slug}/${teamSlug}` : slug;
}

async function fetchGamePaths(): Promise<string[] | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("games")
    .select("slug, team")
    .eq("approved", true)
    .eq("hide", false);

  if (error) {
    return null;
  }
  return [
    ...new Set(
      data.flatMap((row) => [
        row.slug,
        gamePathKey(row.slug, teamToSlug(row.team)),
      ])
    ),
  ];
}

// Every live /games/{slug}[/{team}] key; a miss is only a hint, the proxy re-checks it live before answering 404
export async function getGamePaths(): Promise<Set<string>> {
  const cached = await getFromCache<string[]>(GAME_PATHS_KEY);
  if (cached) {
    return new Set(cached);
  }

  const paths = await fetchGamePaths();
  if (paths) {
    await setCache(GAME_PATHS_KEY, paths, GAME_PATHS_TTL_SECONDS);
  }
  return new Set(paths ?? []);
}

export async function refreshGamePathsCache(): Promise<void> {
  const paths = await fetchGamePaths();
  if (paths) {
    await setCache(GAME_PATHS_KEY, paths, GAME_PATHS_TTL_SECONDS);
  }
}

export async function fetchLiveTeamSlugs(
  slug: string
): Promise<Set<string> | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("games")
    .select("team")
    .eq("slug", slug)
    .eq("approved", true)
    .eq("hide", false);

  if (error) {
    return null;
  }
  return new Set(data.map((row) => teamToSlug(row.team)));
}
