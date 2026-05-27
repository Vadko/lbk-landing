import { faSteam, faXbox } from "@fortawesome/free-brands-svg-icons";
import { faEpic, faGOG } from "@/components/icons/BrandIcons";
import { SvgIcon } from "@/components/ui/SvgIcon";
import type { Game } from "@/lib/types";

interface ShopButtonsProps {
  game: Game;
}

export function ShopButtons({ game }: ShopButtonsProps) {
  return (
    <div className="game-sidebar-card game-steam-card">
      {game.steam_app_id && (
        <a
          href={`https://store.steampowered.com/app/${game.steam_app_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-steam"
        >
          <SvgIcon icon={faSteam} />
          Сторінка в Steam
        </a>
      )}
      {game.gog_store_url && (
        <a
          href={game.gog_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-gog"
        >
          <SvgIcon icon={faGOG} />
          Сторінка в GOG Galaxy
        </a>
      )}
      {game.epic_store_url && (
        <a
          href={game.epic_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-epic"
        >
          <SvgIcon icon={faEpic} />
          Сторінка в Epic Games Store
        </a>
      )}
      {game.xbox_store_url && (
        <a
          href={game.xbox_store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-xbox"
        >
          <SvgIcon icon={faXbox} />
          Сторінка в Microsoft Store
        </a>
      )}
    </div>
  );
}
