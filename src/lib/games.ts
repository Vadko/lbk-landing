import { createServerClient } from "@/lib/supabase/server";
import type { Game } from "@/lib/types";

// Get all translations for a specific game slug
export async function getGamesBySlug(slug: string): Promise<Game[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .eq("approved", true)
    .order("translation_progress", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

// Get a specific translation by slug and team
export async function getGameBySlugAndTeam(
  slug: string,
  team: string
): Promise<Game | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .eq("team", team)
    .eq("approved", true)
    .single();

  if (error) {
    return null;
  }

  return data;
}

// Get unique game slugs (for generating static paths)
export async function getAllGameSlugs(): Promise<string[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("slug")
    .eq("approved", true);

  if (error) {
    return [];
  }

  // Return unique slugs
  const uniqueSlugs = [...new Set(data.map((g) => g.slug))];
  return uniqueSlugs;
}

// Get all slug+team combinations (for sitemap)
export async function getAllGameSlugsWithTeams(): Promise<
  { slug: string; team: string }[]
> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("slug, team")
    .eq("approved", true);

  if (error) {
    return [];
  }

  return data;
}
