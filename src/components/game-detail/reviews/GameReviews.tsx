import { getTranslations } from "next-intl/server";
import { getFirstReviewsPage } from "@/lib/reviews/reviews-cache";
import { GameReviewsHeader } from "./GameReviewsHeader";
import { MoreReviews } from "./MoreReviews";
import { ReviewThread } from "./ReviewThread";

interface GameReviewsProps {
  gameId: string;
  gameSlug: string;
  team: string;
}

export async function GameReviews({
  gameId,
  gameSlug,
  team,
}: GameReviewsProps) {
  const t = await getTranslations("gameReviews");
  const page = await getFirstReviewsPage(gameId);

  return (
    <section id="reviews" className="game-section game-reviews">
      <GameReviewsHeader total={page?.total} gameSlug={gameSlug} team={team} />

      {page?.items.length === 0 ? (
        <p className="game-reviews-empty">{t("empty")}</p>
      ) : (
        <div className="review-list">
          {page?.items.map((review) => (
            <ReviewThread key={review.id} review={review} />
          ))}
          {/* Without a first page the browser asks for it again */}
          {(!page || page.nextCursor) && (
            <MoreReviews gameId={gameId} cursor={page?.nextCursor ?? null} />
          )}
        </div>
      )}
    </section>
  );
}
