import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpenInLauncher } from "@/components/open/OpenInLauncher";
import {
  getAllGameSlugsWithTeams,
  getGameBySlugAndTeamSlug,
} from "@/lib/games";
import { getImageUrl } from "@/lib/images";
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

  const description = `Відкрити ${game.name} українською від ${game.team} в LBK Launcher. Встановіть переклад в один клац!`;

  return {
    title: `Відкрити ${game.name} в LBK Launcher`,
    description,
    openGraph: {
      title: `Відкрити ${game.name} в LBK Launcher`,
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
      type: "website",
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title: `Відкрити ${game.name} в LBK Launcher`,
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

export const revalidate = 3600;

export default async function OpenGamePage({ params }: PageProps) {
  const { slug, team: teamSlugParam } = await params;
  const game = await getGameBySlugAndTeamSlug(slug, teamSlugParam);

  if (!game) {
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
