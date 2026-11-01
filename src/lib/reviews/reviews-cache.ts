import { cacheLife, cacheTag } from "next/cache";
import type { GameReviewsPage } from "@/lib/types";
import { fetchReviewsPage } from "./fetch-reviews-page";

export const reviewsTag = (gameId: string) => `reviews:${gameId}`;

export async function getFirstReviewsPage(
  gameId: string
): Promise<GameReviewsPage | null> {
  "use cache";
  cacheTag(reviewsTag(gameId));

  try {
    const page = await fetchReviewsPage(gameId, null);
    // Screenshot URLs are signed for six hours, so a cached page expires well before them
    cacheLife({ revalidate: 3600, expire: 14_400 });
    return page;
  } catch (error) {
    console.error("Reviews API error:", error);
    // A failure must not stay baked into the page for hours
    cacheLife("minutes");
    return null;
  }
}
