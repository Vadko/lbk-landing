import { getTranslations } from "next-intl/server";
import { getFirstReviewsPage } from "@/lib/reviews/reviews-cache";
import type { GameReviewType } from "@/lib/types";
import { MoreReviews } from "./MoreReviews";
import { ReviewThread } from "./ReviewThread";

interface ReviewListProps {
  gameId: string;
  count: number;
  type?: GameReviewType;
}

export async function ReviewList({ gameId, count, type }: ReviewListProps) {
  const t = await getTranslations("gameReviews");
  // A list the counters show as empty skips the function, so a build does not call it for every game
  const page = count > 0 ? await getFirstReviewsPage(gameId, type) : null;

  if (count === 0 || page?.items.length === 0) {
    return (
      <p className="game-reviews-empty">
        {t(type === "error" ? "emptyErrors" : "empty")}
      </p>
    );
  }
  return (
    <div className="review-list">
      {page?.items.map((review) => (
        <ReviewThread key={review.id} review={review} />
      ))}
      {/* Without a first page the browser asks for it again */}
      {(!page || page.nextCursor) && (
        <MoreReviews
          gameId={gameId}
          type={type}
          cursor={page?.nextCursor ?? null}
        />
      )}
    </div>
  );
}
