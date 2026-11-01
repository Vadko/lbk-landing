import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { getFirstReviewsPage } from "@/lib/reviews/reviews-cache";

interface GameReviewsChipProps {
  gameId: string;
}

// Shares the cached first page with GameReviews, so the count costs no request
export async function GameReviewsChip({ gameId }: GameReviewsChipProps) {
  const t = await getTranslations("gameReviews");
  const page = await getFirstReviewsPage(gameId);

  if (!page?.total) {
    return null;
  }

  return (
    <a href="#reviews" className="game-reviews-chip">
      <SvgIcon icon={faComments} />
      {t("count", { count: page.total })}
    </a>
  );
}
