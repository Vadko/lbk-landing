"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMockReviews } from "@/lib/mockReviews";
import { queryKeys } from "@/lib/queryKeys";
import type { GameReviewsPage } from "@/lib/types";

export const REVIEWS_PAGE_SIZE = 10;
const THIRTY_MINUTES = 30 * 60 * 1000;
const USE_MOCK_REVIEWS = process.env.NEXT_PUBLIC_USE_MOCK_REVIEWS !== "false";

async function fetchGameReviews(): Promise<GameReviewsPage> {
  throw new Error("Reviews API is not available yet");
}

export function useGameReviews(gameId: string, page: number, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.reviews.list(gameId, page),
    queryFn: () =>
      USE_MOCK_REVIEWS
        ? getMockReviews(gameId, page, REVIEWS_PAGE_SIZE)
        : fetchGameReviews(),
    enabled,
    staleTime: THIRTY_MINUTES,
    gcTime: THIRTY_MINUTES,
    placeholderData: keepPreviousData,
  });
}
