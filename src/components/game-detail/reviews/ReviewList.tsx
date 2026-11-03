import { getTranslations } from "next-intl/server";
import { getFirstReviewsPage } from "@/lib/reviews/reviews-cache";
import type { GameReviewType } from "@/lib/types";
import { MoreReviews } from "./MoreReviews";
import { ReviewThread } from "./ReviewThread";

interface ReviewListProps {
  gameId: string;
  type?: GameReviewType;
}

export async function ReviewList({ gameId, type }: ReviewListProps) {
  const t = await getTranslations("gameReviews");
  const page = await getFirstReviewsPage(gameId, type);

  if (page?.items.length === 0) {
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
