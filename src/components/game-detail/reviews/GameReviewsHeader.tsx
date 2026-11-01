import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { getTranslations } from "next-intl/server";
import { RocketIcon } from "@/components/icons";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { launcherGameUrl } from "@/lib/launcherGameUrl";

interface GameReviewsHeaderProps {
  total: number | undefined;
  gameSlug: string;
  team: string;
}

export async function GameReviewsHeader({
  total,
  gameSlug,
  team,
}: GameReviewsHeaderProps) {
  const t = await getTranslations("gameReviews");

  return (
    <div className="game-reviews-header">
      <div className="game-reviews-heading">
        <SvgIcon icon={faComments} />
        <h2>{t("title")}</h2>
        {!!total && <span className="game-reviews-total">{total}</span>}
      </div>
      <a
        href={launcherGameUrl(gameSlug, team, "reviews")}
        className="btn btn-neon game-reviews-launcher"
      >
        <RocketIcon />
        {t("openInLauncher")}
      </a>
      <p className="game-reviews-hint">{t("writeHint")}</p>
    </div>
  );
}
