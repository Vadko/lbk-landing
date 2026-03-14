import Link from "next/link";
import { FaIcon } from "@/components/ui/FaIcon";
import { ShareButton } from "@/components/ui/ShareButton";
import { getReadablePlatform } from "@/helpers/getReadablePlatform";
import { teamToSlug } from "@/lib/transliterate";
import type { Game } from "@/lib/types";
import { RocketIcon } from "../icons";

interface GameSidebarProps {
  game: Game;
}

export function GameSidebar({ game }: GameSidebarProps) {
  const socialLinks = [
    { url: game.telegram, icon: "fa-brands fa-telegram", label: "Telegram" },
    { url: game.discord, icon: "fa-brands fa-discord", label: "Discord" },
    { url: game.youtube, icon: "fa-brands fa-youtube", label: "YouTube" },
    { url: game.twitter, icon: "fa-brands fa-x-twitter", label: "X" },
    { url: game.website, icon: "fa-solid fa-globe", label: "Веб-сайт" },
  ].filter((link) => link.url);

  return (
    <aside className="game-sidebar">
      {/* Download CTA */}
      <div className="game-sidebar-card game-download-cta">
        <div className="game-download-header">
          <FaIcon icon="fa-solid fa-download" />
          <h3>Встановіть переклад</h3>
        </div>
        <p>Завантажте LBK Launcher і встановіть переклад в один клац</p>
        <Link href="/" className="dl-btn game-dl-btn">
          <FaIcon icon="fa-brands fa-windows" />
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
            <FaIcon icon="fa-solid fa-heart" />
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
            <FaIcon icon="fa-brands fa-steam" />
            Сторінка в Steam
          </a>
        </div>
      )}

      {/* Achievements */}
      {game.achievements_archive_path && (
        <div className="game-sidebar-card game-achievements-card">
          <div className="game-achievements-badge">
            <FaIcon icon="fa-solid fa-trophy" />
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
                <FaIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
