import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ShareButton } from "@/components/ui/ShareButton";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { getReadablePlatform } from "@/helpers/getReadablePlatform";
import { teamToSlug } from "@/lib/transliterate";
import type { Game } from "@/lib/types";
import { RocketIcon } from "../icons";
import { ShopButtons } from "./ShopButtons";

interface GameSidebarProps {
  game: Game;
}

export async function GameSidebar({ game }: GameSidebarProps) {
  const t = await getTranslations("gameSidebar");
  const tPlatform = await getTranslations("storePlatform");
  const socialLinks = [
    { url: game.telegram, icon: faTelegram, label: "Telegram" },
    { url: game.discord, icon: faDiscord, label: "Discord" },
    { url: game.youtube, icon: faYoutube, label: "YouTube" },
    { url: game.twitter, icon: faXTwitter, label: "X" },
    { url: game.website, icon: faGlobe, label: t("website") },
  ].filter((link) => link.url);

  return (
    <aside className="game-sidebar">
      {/* Download CTA */}
      <div className="game-sidebar-card glass-bg glass-bg--no-hover game-download-cta">
        <div className="game-download-header">
          <SvgIcon icon={faDownload} />
          <h3>{t("installTitle")}</h3>
        </div>
        <p>{t("installText")}</p>
        <Link href="/" className="btn btn-gradient btn--big">
          <SvgIcon icon={faWindows} />
          <div className="dl-info">
            <span>{t("downloadLauncher")}</span>
            <small>Windows / macOS / Linux</small>
          </div>
        </Link>
        {game.slug && game.team && (
          <>
            <a
              href={`lbk://games/${game.slug}/${encodeURIComponent(game.team)}`}
              className="btn btn-neon btn-launcher"
            >
              <RocketIcon />
              {t("openInLauncher")}
            </a>
            <ShareButton
              gameSlug={game.slug}
              teamSlug={teamToSlug(game.team)}
              gameTitle={game.name}
              teamName={game.team}
            />
          </>
        )}
      </div>

      {/* Support */}
      {game.support_url && (
        <div className="game-sidebar-card glass-bg glass-bg--no-hover game-support-card">
          <h3>{t("support")}</h3>
          <a
            href={game.support_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-support"
          >
            <SvgIcon icon={faHeart} />
            {t("supportButton")}
          </a>
        </div>
      )}

      <ShopButtons game={game} />

      {/* Achievements */}
      {game.achievements_archive_path && (
        <div className="game-sidebar-card glass-bg glass-bg--no-hover game-achievements-card">
          <div className="game-achievements-badge">
            <SvgIcon icon={faTrophy} />
            <span>{t("achievements")}</span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="game-sidebar-card glass-bg glass-bg--no-hover game-stats-card">
        <h3>{t("stats")}</h3>
        <div className="game-stats-list">
          {!game.status || game.status !== "planned" ? (
            <div className="game-stat">
              <span>{t("downloads")}</span>
              <strong>
                {!game.downloads || game.downloads < 20
                  ? t("downloadsFew")
                  : game.downloads.toLocaleString("uk-UA")}
              </strong>
            </div>
          ) : null}
          {game.platforms && game.platforms.length > 0 && (
            <div className="game-stat">
              <span>{t("platforms")}</span>
              <strong>
                {game.platforms
                  .map((platform) => getReadablePlatform(tPlatform, platform))
                  .join(", ")}
              </strong>
            </div>
          )}
          <div className="game-stat">
            <span>{t("created")}</span>
            <strong>
              {new Date(game.created_at).toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Europe/Kyiv",
              })}
            </strong>
          </div>
          <div className="game-stat">
            <span>{t("updated")}</span>
            <strong>
              {new Date(game.translation_updated_at).toLocaleString("uk-UA", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Kyiv",
              })}
            </strong>
          </div>
        </div>
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="game-sidebar-card glass-bg glass-bg--no-hover game-links-card">
          <h3>{t("links")}</h3>
          <div className="game-social-links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn game-social-link"
                title={link.label}
              >
                <SvgIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
