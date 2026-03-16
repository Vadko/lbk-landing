import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { GameDetailArticle } from "@/components/game-detail";
import {
  getAllGameSlugsWithTeams,
  getGameBySlugAndTeamSlug,
  getGamesBySlug,
} from "@/lib/games";
import { getImageUrl } from "@/lib/images";
import { getRedirect } from "@/lib/redirects";
import { teamToSlug } from "@/lib/transliterate";

interface PageProps {
  params: Promise<{ slug: string; team: string }>;
}

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

  if (!game) {
    return { title: "Переклад не знайдено" };
  }

  const statusText =
    game.status === "completed"
      ? "100%"
      : game.status === "in-progress"
        ? `${game.translation_progress}%`
        : "у розробці";

  const description = `Український переклад ${game.name} від команди ${game.team}. Статус перекладу: ${statusText}. Дізнайтеся, як автоматично встановити українізатор через LBK Launcher та грати українською вже зараз.`;

  return {
    title: {
      absolute: `${game.name} українською мовою — Переклад від ${game.team} | Скачати в LBK Launcher`,
    },
    description,
    keywords: [
      `${game.name} українською`,
      `${game.name} український переклад`,
      `${game.name} ${game.team}`,
      `${game.name} українізатор`,
      `${game.name} локалізація`,
      `${game.name} переклад`,
      `${game.name} ua`,
      `${game.name} ukrainian`,
      `скачати ${game.name} українською`,
      `як перекласти ${game.name}`,
      "українізатор ігор",
      "LBK Launcher",
    ],
    openGraph: {
      title: `${game.name} українською від ${game.team} | LBK Launcher`,
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
      type: "article",
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.name} українською від ${game.team}`,
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

export const revalidate = 3600;

export default async function GameTranslationPage({ params }: PageProps) {
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);

  if (!game) {
    const newPath = await getRedirect(`/games/${slug}/${teamSlugParam}`);
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
