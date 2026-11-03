import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { routing } from "@/i18n/routing";
import { localizedAlternates, localizedUrl } from "@/lib/localizedAlternates";
import { createServerClient } from "@/lib/supabase/server";
import { teamToSlug } from "@/lib/transliterate";

type SitemapEntry = MetadataRoute.Sitemap[number];

function withLocales(
  path: string,
  entry: Omit<SitemapEntry, "url" | "alternates">
): MetadataRoute.Sitemap {
  const { languages } = localizedAlternates(path, routing.defaultLocale);
  return routing.locales.map((locale) => ({
    ...entry,
    url: localizedUrl(path, locale),
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("hours");

  const supabase = createServerClient();

  const { data: games } = await supabase
    .from("games")
    .select("slug, team, updated_at")
    .eq("approved", true)
    .eq("hide", false);

  const allGames = games ?? [];

  // Group games by slug to determine which have multiple translations
  const slugGroups = new Map<string, typeof allGames>();
  for (const game of allGames) {
    const existing = slugGroups.get(game.slug) ?? [];
    existing.push(game);
    slugGroups.set(game.slug, existing);
  }

  const gameUrls: MetadataRoute.Sitemap = [];

  for (const [slug, translations] of slugGroups) {
    if (translations.length > 1) {
      const latestUpdate = translations.reduce(
        (latest, t) =>
          new Date(t.updated_at) > latest ? new Date(t.updated_at) : latest,
        new Date(0)
      );
      gameUrls.push(
        ...withLocales(`/games/${slug}`, {
          lastModified: latestUpdate,
          changeFrequency: "weekly",
          priority: 0.7,
        })
      );
    }

    for (const translation of translations) {
      gameUrls.push(
        ...withLocales(`/games/${slug}/${teamToSlug(translation.team)}`, {
          lastModified: new Date(translation.updated_at),
          changeFrequency: "weekly",
          priority: 0.6,
        })
      );
    }
  }

  return [
    ...withLocales("/", {
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }),
    ...withLocales("/games", {
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }),
    ...withLocales("/setup", {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...withLocales("/tech-stack", {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    }),
    ...withLocales("/privacy", {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }),
    ...withLocales("/terms/players", {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }),
    ...withLocales("/terms/translators", {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }),
    ...gameUrls,
  ];
}
