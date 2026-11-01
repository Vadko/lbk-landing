import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GameBanner, GameDetailArticle } from "@/components/game-detail";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { STATUS_BADGE_CLASSES } from "@/lib/constants";
import { generateBreadcrumbLD } from "@/lib/game-jsonld";
import { getAllGameSlugs, getGamesBySlug } from "@/lib/games";
import { getImageUrl } from "@/lib/images";
import { getRedirect } from "@/lib/redirects";
import { teamToSlug } from "@/lib/transliterate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  const slugs = await getAllGameSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const translations = await getGamesBySlug(slug);
  const t = await getTranslations("gameMeta");

  if (translations.length === 0) {
    return { title: t("gameNotFound") };
  }

  const game = translations[0];

  // Single translation — canonical points to the team page
  if (translations.length === 1) {
    const description = t("description", {
      game: game.name,
      team: game.team,
    });
    return {
      title: {
        absolute: t("title", { game: game.name }),
      },
      description,
      keywords: t("keywords", { game: game.name }),
      robots: {
        index: false,
        follow: true,
      },
      openGraph: {
        title: t("ogTitle", { game: game.name }),
        description,
        images: game.banner_path
          ? [getImageUrl(game.banner_path, game.updated_at)!]
          : undefined,
        type: "article",
        locale: "uk_UA",
      },
      twitter: {
        card: "summary_large_image",
        title: t("twitterTitle", { game: game.name }),
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

  // Multiple translations
  const teamNames = translations.map((t) => t.team).join(", ");
  const description = t("multiDescription", {
    game: game.name,
    teams: teamNames,
  });

  return {
    title: {
      absolute: t("title", { game: game.name }),
    },
    description,
    keywords: t("keywords", { game: game.name }),
    openGraph: {
      title: t("ogTitle", { game: game.name }),
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
      type: "article",
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle", { game: game.name }),
      description,
      images: game.banner_path
        ? [getImageUrl(game.banner_path, game.updated_at)!]
        : undefined,
    },
    alternates: {
      canonical: `https://lbklauncher.com/games/${slug}`,
    },
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const translations = await getGamesBySlug(slug);

  if (translations.length === 0) {
    const newPath = await getRedirect(`/games/${slug}`);
    if (newPath) {
      permanentRedirect(newPath);
    }
    notFound();
  }

  // Single translation — render detail page (no redirect)
  if (translations.length === 1) {
    return (
      <GameDetailArticle
        game={translations[0]}
        slug={slug}
        otherTranslations={[]}
      />
    );
  }

  // Multiple translations — show selection page
  const t = await getTranslations();
  const game = translations[0];
  const bannerUrl = getImageUrl(game.banner_path, game.updated_at);
  const logoUrl = getImageUrl(game.logo_path, game.updated_at);

  return (
    <article className="game-detail">
      <GameBanner bannerUrl={bannerUrl} logoUrl={logoUrl} name={game.name} />

      <div className="game-content">
        <div className="container">
          <nav className="game-breadcrumb">
            <Link href="/">{t("gameBreadcrumbs.home")}</Link>
            <span>/</span>
            <Link href="/games">{t("gameBreadcrumbs.catalogLower")}</Link>
            <span>/</span>
            <span className="current">{game.name}</span>
          </nav>

          <div className="game-translations-select">
            <header className="game-header">
              <h1>{game.name}</h1>
              <p className="game-translations-subtitle">
                {t("gameSelect.subtitle", {
                  count: String(translations.length),
                })}
              </p>
            </header>

            <div className="game-translations-grid">
              {translations.map((translation) => {
                const translationBanner = getImageUrl(translation.banner_path);

                return (
                  <Link
                    key={translation.id}
                    href={`/games/${slug}/${teamToSlug(translation.team)}`}
                    prefetch
                    className="game-translation-card"
                  >
                    <div className="game-translation-card-image">
                      {translationBanner ? (
                        <Image
                          src={translationBanner}
                          alt={t("gameSelect.cardAlt", {
                            game: game.name,
                            team: translation.team,
                          })}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="game-card-placeholder">
                          <SvgIcon icon={faGamepad} />
                        </div>
                      )}
                    </div>

                    <div className="game-translation-card-content">
                      <h2 className="game-translation-card-team">
                        {translation.team}
                      </h2>

                      <div className="game-translation-card-meta">
                        <span
                          className={STATUS_BADGE_CLASSES[translation.status]}
                        >
                          {t(`gameStatus.${translation.status}`)}
                        </span>
                        {translation.version && (
                          <span className="game-translation-card-version">
                            v{translation.version}
                          </span>
                        )}
                      </div>

                      <div className="game-translation-card-progress">
                        <div className="game-progress-header">
                          <span>{t("gameSelect.progress")}</span>
                          <span>{translation.translation_progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${translation.translation_progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <p className="game-translation-card-updated">
                        {t("gameSelect.updated", {
                          date: new Date(
                            translation.translation_updated_at
                          ).toLocaleString("uk-UA", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "Europe/Kyiv",
                          }),
                        })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbLD([
              {
                name: t("gameBreadcrumbs.home"),
                url: "https://lbklauncher.com",
              },
              {
                name: t("gameBreadcrumbs.catalog"),
                url: "https://lbklauncher.com/games",
              },
              { name: game.name, url: `https://lbklauncher.com/games/${slug}` },
            ])
          ),
        }}
      />
    </article>
  );
}
