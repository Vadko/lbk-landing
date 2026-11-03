import { createServerClient } from "@/lib/supabase/server";
import type { GameReviewsPage, GameReviewType } from "@/lib/types";

const PAGE_SIZE = 10;
const TIMEOUT_MS = 10_000;

// Without a machine id the function lists only public, published threads
export async function fetchReviewsPage(
  gameId: string,
  cursor: string | null,
  type?: GameReviewType
): Promise<GameReviewsPage> {
  const { data, error } =
    await createServerClient().functions.invoke<GameReviewsPage>(
      "reviews?action=list",
      {
        body: { gameId, cursor, limit: PAGE_SIZE, ...(type && { type }) },
        timeout: TIMEOUT_MS,
      }
    );
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("Reviews list returned no body");
  }
  return { items: data.items, nextCursor: data.nextCursor };
}
