import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { GamesList } from "@/components/games/GamesList";
import { getInitialGames } from "@/lib/games";
import { getGamesCount } from "@/lib/games-count";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("catalogPage");
  const count = String(await getGamesCount());
  return {
    title: t("metaTitle", { count }),
    description: t("metaDescription"),
    keywords: t("keywords"),
    openGraph: {
      title: t("ogTitle", { count }),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: "https://lbklauncher.com/games",
    },
  };
}

export default async function GamesPage() {
  const t = await getTranslations("catalogPage");
  const initialGames = await getInitialGames();
  return (
    <section className="games-page">
      <div className="container">
        <div className="games-header">
          <h1 className="page-title">{t("title")}</h1>
          <p>{t("lead")}</p>
        </div>

        <GamesList initialData={initialGames} />
      </div>
    </section>
  );
}
