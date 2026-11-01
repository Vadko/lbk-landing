import { cacheLife } from "next/cache";
import { getFromCache, setCache } from "@/lib/cache";
import { createServerClient } from "@/lib/supabase/server";

const GAMES_COUNT_KEY = "games:count";
const GAMES_COUNT_TTL_SECONDS = 86_400;

export async function getGamesCount(): Promise<number> {
  "use cache";

  const cached = await getFromCache<number>(GAMES_COUNT_KEY);
  if (cached !== null) {
    cacheLife("hours");
    return cached;
  }

  const supabase = createServerClient();
  const { count } = await supabase
    .from("games_grouped")
    .select("*", { count: "exact", head: true });

  const value = count ?? 0;
  if (value > 0) {
    await setCache(GAMES_COUNT_KEY, value, GAMES_COUNT_TTL_SECONDS);
    cacheLife("hours");
  } else {
    cacheLife("minutes");
  }
  return value;
}
