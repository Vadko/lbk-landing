import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import Link from "next/link";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import {
  FundraisingProgress,
  GameBanner,
  GameFAQ,
  GameInstallSteps,
  GameProgress,
  GameSidebar,
} from "@/components/game-detail";
import { GameTeamLink } from "@/components/ui/GameTeamLink";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { STATUS_LABELS } from "@/lib/constants";
import { getFeaturedInfo } from "@/lib/featuredTranslations";
import {
  generateBreadcrumbLD,
  generateFAQLD,
  generateSoftwareApplicationLD,
} from "@/lib/game-jsonld";
import { getImageUrl } from "@/lib/images";
import { teamToSlug } from "@/lib/transliterate";
import type { Game } from "@/lib/types";
import { AIEditedBadgeIcon } from "../ui/icons/AIEditedBadgeIcon";
import { AIBadgeIcon } from "../ui/icons/AIBadgeIcon";

interface GameDetailArticleProps {
  game: Game;
  slug: string;
  otherTranslations: Game[];
}

export function GameDetailArticle({
  game,
  slug,
  otherTranslations,
}: GameDetailArticleProps) {
  const status = STATUS_LABELS[game.status] || STATUS_LABELS.planned;
  const bannerUrl = getImageUrl(game.banner_path, game.updated_at);
  const logoUrl = getImageUrl(game.logo_path, game.updated_at);
  const featuredInfo = getFeaturedInfo(slug, game.team);

  const breadcrumbItems = [
    { name: "Головна", url: "https://lbklauncher.com" },
    { name: "Каталог", url: "https://lbklauncher.com/games" },
    { name: game.name, url: `https://lbklauncher.com/games/${slug}` },
    ...(otherTranslations.length > 0
      ? [
          {
            name: game.team,
            url: `https://lbklauncher.com/games/${slug}/${teamToSlug(game.team)}`,
          },
        ]
      : []),
  ];

  return (
    <article className="game-detail">
      <PageViewTracker event="view_game_details" gameName={game.name} />
      <GameBanner bannerUrl={bannerUrl} logoUrl={logoUrl} name={game.name} />

      <div className="game-content">
        <div className="container">
          <nav className="game-breadcrumb">
            <Link href="/">Головна</Link>
            <span>/</span>
            <Link href="/games">Каталог</Link>
            <span>/</span>
            {otherTranslations.length > 0 ? (
              <>
                <Link href={`/games/${slug}`}>{game.name}</Link>
                <span>/</span>
                <span className="current">{game.team}</span>
              </>
            ) : (
              <span className="current">{game.name}</span>
            )}
          </nav>

          <div className="game-info-grid">
            <div className="game-main">
              <header className="game-header">
                <div className="game-title-row">
                  <h1>{game.name}</h1>
                  <span className={status.className}>{status.label}</span>
                </div>
                {featuredInfo && (
                  <div className="featured-badge-block">
                    <SvgIcon icon={faTrophy} />
                    {featuredInfo.description}
                  </div>
                )}
                <p className="game-meta">
                  Переклад від <GameTeamLink team={game.team} />
                  {game.version && ` • Версія ${game.version}`}
                </p>
                {(game.ai === "edited" || game.ai === "non-edited") && (
                  <div className="game-ai-badge">
                    {game.ai === "edited" ? (
                      <AIEditedBadgeIcon size={16} />
                    ) : (
                      <AIBadgeIcon size={16} />
                    )}
                    {game.ai === "edited"
                      ? "ШІ + редактура людиною"
                      : "Переклад ШІ"}
                  </div>
                )}
              </header>

              {otherTranslations.length > 0 && (
                <section className="game-section game-other-translations">
                  <h2>Інші переклади цієї гри</h2>
                  <div className="game-translations-list">
                    {otherTranslations.map((t) => (
                      <Link
                        key={t.id}
                        href={`/games/${slug}/${teamToSlug(t.team)}`}
                        className="game-translation-link"
                      >
                        <span className="game-translation-team">{t.team}</span>
                        <span className="game-translation-progress">
                          {t.translation_progress}%
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <GameProgress
                translationProgress={game.translation_progress}
                editingProgress={game.editing_progress}
                voiceProgress={game.voice_progress}
                fontsProgress={game.fonts_progress}
                texturesProgress={game.textures_progress}
              />

              <FundraisingProgress
                current={game.fundraising_current}
                goal={game.fundraising_goal}
              />

              {game.description && (
                <section className="game-section">
                  <h2>Про переклад</h2>
                  <p className="game-description whitespace-pre-line">
                    {game.description}
                  </p>
                </section>
              )}

              {game.game_description && (
                <section className="game-section">
                  <h2>Про гру</h2>
                  <p className="game-description whitespace-pre-line">
                    {game.game_description}
                  </p>
                </section>
              )}

              <GameInstallSteps gameName={game.name} />
              <GameFAQ game={game} />
            </div>

            <GameSidebar game={game} />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSoftwareApplicationLD(game)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQLD(game)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbLD(breadcrumbItems)),
        }}
      />
    </article>
  );
}
