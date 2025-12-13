import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();

  const { data: games } = await supabase
    .from("games")
    .select("slug, updated_at")
    .eq("approved", true);

  const gameUrls: MetadataRoute.Sitemap = (games ?? []).map((game) => ({
    url: `https://lblauncher.com/games/${game.slug}`,
    lastModified: new Date(game.updated_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://lblauncher.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://lblauncher.com/games",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...gameUrls,
  ];
}
