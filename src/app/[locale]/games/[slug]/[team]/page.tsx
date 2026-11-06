import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GameDetailArticle } from "@/components/game-detail";
import { permanentRedirect } from "@/i18n/navigation";
import { resolveLocale } from "@/i18n/resolve-locale";
import { routing } from "@/i18n/routing";
import {
  getAllGameSlugsWithTeams,
  getGameBySlugAndTeamSlug,
  getGamesBySlug,
} from "@/lib/games";
import { getImageUrl } from "@/lib/images";
import {
  localizedAlternates,
  openGraphLocale,
} from "@/lib/localizedAlternates";
import { resolveMovedGamePath } from "@/lib/redirects";
import { teamToSlug } from "@/lib/transliterate";

interface PageProps {
  params: Promise<{ locale: string; slug: string; team: string }>;
}

export const instant = false;

export async function generateStaticParams() {
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
  const locale = await resolveLocale(params);
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);
  const t = await getTranslations({ locale, namespace: "gameMeta" });

  if (!game) {
    return { title: t("translationNotFound") };
  }

  const description = t("teamDescription", {
    game: game.name,
    team: game.team,
    status: game.status === "in-progress" ? "inProgress" : game.status,
    progress: String(game.translation_progress),
  });

  return {
    title: {
      absolute: t("teamTitle", { game: game.name, team: game.team }),
    },
    description,
    keywords: t("teamKeywords", { game: game.name, team: game.team }),
    openGraph: {
      title: t("teamOgTitle", { game: game.name, team: game.team }),
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
      type: "article",
      locale: openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("teamTwitterTitle", { game: game.name, team: game.team }),
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
    },
    alternates: localizedAlternates(
      `/games/${slug}/${teamToSlug(game.team)}`,
      locale
    ),
  };
}

export default async function GameTranslationPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);

  if (!game) {
    const newPath = await resolveMovedGamePath(slug, teamSlugParam);
    if (newPath) {
      permanentRedirect({ href: newPath, locale });
    }
    notFound();
  }

  const allTranslations = await getGamesBySlug(slug);
  const otherTranslations = allTranslations.filter((t) => t.team !== game.team);

  return (
    <GameDetailArticle
      game={game}
      slug={slug}
      otherTranslations={otherTranslations}
    />
  );
}
