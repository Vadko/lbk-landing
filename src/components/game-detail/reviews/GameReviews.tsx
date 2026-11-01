import { getTranslations } from "next-intl/server";
import { getFirstReviewsPage } from "@/lib/reviews/reviews-cache";
import { MoreReviews } from "./MoreReviews";
import { ReviewThread } from "./ReviewThread";

interface GameReviewsProps {
  gameId: string;
}

export async function GameReviews({ gameId }: GameReviewsProps) {
  const t = await getTranslations("gameReviews");
  const page = await getFirstReviewsPage(gameId);

  return (
    <section className="game-section game-reviews">
      <div className="game-reviews-header">
        <h2>{t("title")}</h2>
        <p className="game-reviews-count">
          {page && t("count", { count: page.total })}
        </p>
      </div>

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
