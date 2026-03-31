import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { getReadablePlatform } from "@/helpers/getReadablePlatform";
import { teamToSlug } from "@/lib/transliterate";
import type { Game } from "@/lib/types";
import { RocketIcon } from "../icons";

interface GameSidebarProps {
  game: Game;
}

export function GameSidebar({ game }: GameSidebarProps) {
  const socialLinks = [
    { url: game.telegram, icon: faTelegram, label: "Telegram" },
    { url: game.discord, icon: faDiscord, label: "Discord" },
    { url: game.youtube, icon: faYoutube, label: "YouTube" },
    { url: game.twitter, icon: faXTwitter, label: "X" },
    { url: game.website, icon: faGlobe, label: "Веб-сайт" },
  ].filter((link) => link.url);

  return (
    <aside className="game-sidebar">
      {/* Download CTA */}
      <div className="game-sidebar-card game-download-cta">
        <div className="game-download-header">
          <SvgIcon icon={faDownload} />
          <h3>Встановіть переклад</h3>
        </div>
        <p>Завантажте LBK Launcher і встановіть переклад в один клац</p>
        <Link href="/" className="dl-btn game-dl-btn">
          <SvgIcon icon={faWindows} />
          <div className="dl-info">
            <span>Завантажити лаунчер</span>
            <small>Windows / macOS / Linux</small>
          </div>
        </Link>
        {game.slug && game.team && (
          <>
            <a
              href={`lbk://games/${game.slug}/${encodeURIComponent(game.team)}`}
              className="btn-neon btn-launcher"
            >
              <RocketIcon />
              Відкрити в лаунчері
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
        <div className="game-sidebar-card game-support-card">
          <h3>Підтримка</h3>
          <a
            href={game.support_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-support"
          >
            <SvgIcon icon={faHeart} />
            Підтримати переклад
          </a>
        </div>
      )}

      {/* Steam Link */}
      {game.steam_app_id && (
        <div className="game-sidebar-card game-steam-card">
          <a
            href={`https://store.steampowered.com/app/${game.steam_app_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary btn-steam"
          >
            <SvgIcon icon={faSteam} />
            Сторінка в Steam
          </a>
        </div>
      )}

      {/* Achievements */}
      {game.achievements_archive_path && (
        <div className="game-sidebar-card game-achievements-card">
          <div className="game-achievements-badge">
            <SvgIcon icon={faTrophy} />
            <span>Включає переклад досягнень</span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="game-sidebar-card game-stats-card">
        <h3>Статистика</h3>
        <div className="game-stats-list">
          {!game.status || game.status !== "planned" ? (
            <div className="game-stat">
              <span>Завантажень</span>
              <strong>
                {!game.downloads || game.downloads < 20
                  ? "до 20"
                  : game.downloads.toLocaleString("uk-UA")}
              </strong>
            </div>
          ) : null}
          {game.platforms && game.platforms.length > 0 && (
            <div className="game-stat">
              <span>Платформи</span>
              <strong>
                {game.platforms.map(getReadablePlatform).join(", ")}
              </strong>
            </div>
          )}
          <div className="game-stat">
            <span>Створено</span>
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
            <span>Оновлено</span>
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
        <div className="game-sidebar-card game-links-card">
          <h3>Посилання</h3>
          <div className="game-social-links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="game-social-link"
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
