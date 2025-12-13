import { createServerClient } from "@/lib/supabase/server";
import type { Game } from "@/lib/types";

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .eq("approved", true)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getAllGameSlugs(): Promise<string[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("games")
    .select("slug")
    .eq("approved", true);

  if (error) {
    return [];
  }

  return data.map((g) => g.slug);
}
