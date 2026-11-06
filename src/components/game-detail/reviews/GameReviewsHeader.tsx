import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { launcherGameUrl } from "@/lib/launcherGameUrl";

interface GameReviewsHeaderProps {
  count: number;
  gameSlug: string;
  team: string;
}

export async function GameReviewsHeader({
  count,
  gameSlug,
  team,
}: GameReviewsHeaderProps) {
  const t = await getTranslations("gameReviews");

  return (
    <div className="game-reviews-header">
      <div className="game-reviews-heading">
        <SvgIcon icon={faComments} />
        <h2>{t("title")}</h2>
        {count > 0 && <span className="game-reviews-total">{count}</span>}
      </div>
      <a
        href={launcherGameUrl(gameSlug, team, "reviews")}
        className="btn btn-neon game-reviews-launcher"
      >
        <SvgIcon icon={faGamepad} />
        {t("openInLauncher")}
        <SvgIcon icon={faArrowRight} className="game-reviews-launcher-arrow" />
      </a>
      <p className="game-reviews-hint">{t("writeHint")}</p>
    </div>
  );
}
