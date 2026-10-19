import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { OpenInLauncher } from "@/components/open/OpenInLauncher";
import {
  getAllGameSlugsWithTeams,
  getGameBySlugAndTeamSlug,
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
      locale: "uk_UA",
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
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);

  if (!game) {
    const newPath = await resolveMovedGamePath(slug, teamSlugParam, "/open");
    if (newPath) {
      redirect(newPath);
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
