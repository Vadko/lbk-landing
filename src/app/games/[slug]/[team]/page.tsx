import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GameDetailArticle } from "@/components/game-detail";
import {
  getAllGameSlugsWithTeams,
  getGameBySlugAndTeamSlug,
  getGamesBySlug,
} from "@/lib/games";
import { getImageUrl } from "@/lib/images";
import { resolveMovedGamePath } from "@/lib/redirects";
import { teamToSlug } from "@/lib/transliterate";

interface PageProps {
  params: Promise<{ slug: string; team: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  const slugsWithTeams = await getAllGameSlugsWithTeams();
  return slugsWithTeams.map(({ slug, teamSlug }) => ({
    slug,
    team: teamSlug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);
  const t = await getTranslations("gameMeta");

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
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title: t("teamTwitterTitle", { game: game.name, team: game.team }),
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
    },
    alternates: {
      canonical: `https://lbklauncher.com/games/${slug}/${teamToSlug(game.team)}`,
    },
  };
}

export default async function GameTranslationPage({ params }: PageProps) {
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);

  if (!game) {
    const newPath = await resolveMovedGamePath(slug, teamSlugParam);
    if (newPath) {
      permanentRedirect(newPath);
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
