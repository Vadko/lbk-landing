import { faSteam, faXbox } from "@fortawesome/free-brands-svg-icons";
import { getTranslations } from "next-intl/server";
import { faEA, faEpic, faGOG, faUbisoft } from "@/components/icons/BrandIcons";
import { SvgIcon } from "@/components/ui/SvgIcon";
import type { Game } from "@/lib/types";

interface ShopButtonsProps {
  game: Game;
}

export async function ShopButtons({ game }: ShopButtonsProps) {
  const t = await getTranslations("gameSidebar.stores");
  const hasAnyStore = Boolean(
    game.steam_app_id ||
      game.gog_store_url ||
      game.epic_store_url ||
      game.xbox_store_url ||
      game.uplay_store_url ||
      game.ea_store_url
  );

  if (!hasAnyStore) {
    return null;
  }

  return (
    <div className="game-sidebar-card glass-bg glass-bg--no-hover game-steam-card store-list">
      {game.steam_app_id && (
        <a
          href={`https://store.steampowered.com/app/${game.steam_app_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn glass-bg btn-steam"
        >
          <SvgIcon icon={faSteam} />
          {t("steam")}
        </a>
      )}
      {game.gog_store_url && (
        <a
          href={game.gog_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn glass-bg btn-gog"
        >
          <SvgIcon icon={faGOG} />
          {t("gog")}
        </a>
      )}
      {game.epic_store_url && (
        <a
          href={game.epic_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn glass-bg btn-epic"
        >
          <SvgIcon icon={faEpic} />
          {t("epic")}
        </a>
      )}
      {game.xbox_store_url && (
        <a
          href={game.xbox_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn glass-bg btn-xbox"
        >
          <SvgIcon icon={faXbox} />
          {t("xbox")}
        </a>
      )}
      {game.uplay_store_url && (
        <a
          href={game.uplay_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-uplay"
        >
          <SvgIcon icon={faUbisoft} />
          {t("uplay")}
        </a>
      )}
      {game.ea_store_url && (
        <a
          href={game.ea_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-ea"
        >
          <SvgIcon icon={faEA} />
          {t("ea")}
        </a>
      )}
    </div>
  );
}
