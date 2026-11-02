"use server";

import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { fetchReviewsPage } from "@/lib/reviews/fetch-reviews-page";
import type { GameReviewType } from "@/lib/types";
import { ReviewThread } from "./ReviewThread";

interface ReviewsBatch {
  threads: ReactNode;
  nextCursor: string | null;
}

// A page arrives rendered, so the browser only appends it
export async function loadMoreReviews(
  gameId: string,
  cursor: string | null,
  type?: GameReviewType
): Promise<ReviewsBatch> {
  const page = await fetchReviewsPage(gameId, cursor, type);
  if (cursor === null && page.items.length === 0) {
    const t = await getTranslations("gameReviews");
    return {
      threads: (
        <p className="game-reviews-empty">
          {t(type === "error" ? "emptyErrors" : "empty")}
        </p>
      ),
      nextCursor: null,
    };
  }
  return {
    threads: page.items.map((review) => (
      <ReviewThread key={review.id} review={review} />
    )),
    nextCursor: page.nextCursor,
  };
}
