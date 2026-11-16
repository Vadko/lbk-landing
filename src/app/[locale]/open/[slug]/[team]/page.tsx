import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { OpenInLauncher } from "@/components/open/OpenInLauncher";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getAllGameSlugsWithTeams,
  getGameBySlugAndTeamSlug,
} from "@/lib/games";
import { getImageUrl } from "@/lib/images";
import { openGraphLocale } from "@/lib/localizedAlternates";
import { resolveMovedGamePath } from "@/lib/redirects";
import { teamToSlug } from "@/lib/transliterate";

interface PageProps {
  params: Promise<{ slug: string; team: string }>;
}

export const instant = false;

// An unknown slug renders before the response starts, so its 404 or 308 is the real status instead of a streamed 200
export const unstable_paramMatching = { slug: "blocking", team: "blocking" };

export async function generateStaticParams() {
  // Next throws when a child generateStaticParams returns [] for a parent locale, so every call lists the uk pages and en/be/pl render on demand
  const slugsWithTeams = await getAllGameSlugsWithTeams();
  return slugsWithTeams.map(({ slug, teamSlug }) => ({
    locale: routing.defaultLocale,
    slug,
    team: teamSlug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await getLocale();
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);
  const tMeta = await getTranslations("gameMeta");
  const t = await getTranslations("openLauncher");

  if (!game) {
    return { title: tMeta("translationNotFound") };
  }

  const description = t("metaDescription", {
    game: game.name,
    team: game.team,
  });

  return {
    title: t("metaTitle", { game: game.name }),
    description,
    openGraph: {
      title: t("metaTitle", { game: game.name }),
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
      type: "website",
      locale: openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle", { game: game.name }),
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
    },
    robots: {
      index: false, // Don't index these redirect pages
      follow: true,
    },
  };
}

export default async function OpenGamePage({ params }: PageProps) {
  const locale = await getLocale();
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);

  if (!game) {
    const newPath = await resolveMovedGamePath(slug, teamSlugParam, "/open");
    if (newPath) {
      redirect({ href: newPath, locale });
    }
    notFound();
  }

  const bannerUrl = getImageUrl(game.banner_path, game.updated_at);
  const logoUrl = getImageUrl(game.logo_path, game.updated_at);
  const teamSlug = teamToSlug(game.team);

  return (
    <OpenInLauncher
      gameName={game.name}
      gameSlug={game.slug}
      team={game.team}
      teamSlug={teamSlug}
      bannerUrl={bannerUrl}
      logoUrl={logoUrl}
    />
  );
}
