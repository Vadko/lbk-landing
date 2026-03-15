import { createServerClient } from "@/lib/supabase/server";
import { teamToSlug } from "@/lib/transliterate";
import type {
  Game,
  GameGroup,
  GamesGroupedResponse,
  TranslationItem,
} from "@/lib/types";

// Get all translations for a specific game slug
export async function getGamesBySlug(slug: string): Promise<Game[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .eq("approved", true)
    .eq("hide", false)
    .order("translation_progress", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

// Get a specific translation by slug and team slug (transliterated)
export async function getGameBySlugAndTeamSlug(
  slug: string,
  teamSlug: string
): Promise<Game | null> {
  const supabase = createServerClient();

  // Get all games with this slug and find matching team by transliterated slug
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .eq("approved", true)
    .eq("hide", false);

  if (error || !data) {
    return null;
  }

  // Find the game where team slug matches
  const game = data.find((g) => teamToSlug(g.team) === teamSlug);
  return game || null;
}

// Get unique game slugs (for generating static paths)
export async function getAllGameSlugs(): Promise<string[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("slug")
    .eq("approved", true)
    .eq("hide", false);

  if (error) {
    return [];
  }

  // Return unique slugs
  const uniqueSlugs = [...new Set(data.map((g) => g.slug))];
  return uniqueSlugs;
}

// Get all slug+teamSlug combinations (for static paths)
export async function getAllGameSlugsWithTeams(): Promise<
  { slug: string; teamSlug: string }[]
> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("slug, team")
    .eq("approved", true)
    .eq("hide", false);

  if (error) {
    return [];
  }

  return data.map((g) => ({
    slug: g.slug,
    teamSlug: teamToSlug(g.team),
  }));
}

// Fetch first page of games for SSR (no spinner on initial load)
export async function getInitialGames(): Promise<GamesGroupedResponse> {
  const supabase = createServerClient();
  const limit = 12;

  const { data, error, count } = await supabase
    .from("games_grouped")
    .select("*", { count: "exact" })
    .order("name", { ascending: true, nullsFirst: false })
    .range(0, limit - 1);

  if (error) {
    return { games: [], total: 0, hasMore: false, nextOffset: limit };
  }

  const games = (data ?? [])
    .filter(
      (row): row is typeof row & { slug: string; name: string } =>
        row.slug !== null && row.name !== null
    )
    .map((row): GameGroup => {
      const translations = (
        Array.isArray(row.translations) ? row.translations : []
      ) as TranslationItem[];
      const updatedAt =
        translations.length > 0
          ? translations.reduce(
              (latest, t) => (t.updated_at > latest ? t.updated_at : latest),
              translations[0].updated_at
            )
          : new Date().toISOString();
      return {
        slug: row.slug,
        name: row.name,
        banner_path: row.banner_path,
        thumbnail_path: row.thumbnail_path,
        is_adult: row.is_adult ?? false,
        updated_at: updatedAt,
        translations,
      };
    });

  const total = count ?? 0;
  return { games, total, hasMore: limit < total, nextOffset: limit };
}
