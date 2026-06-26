import { getFromCache, setCache } from "@/lib/cache";
import { createServerClient } from "@/lib/supabase/server";

// Cached set of slugs recorded in the deleted_games tombstone table, used by the
// proxy to decide a 410. Kept warm by the revalidate webhook (recompute-and-set
// on every admin change), so user requests never pay for a rebuild — the long
// TTL is just a safety net if Redis is ever flushed.

const DELETED_SLUGS_KEY = "games:deleted-slugs";
const DELETED_SLUGS_TTL_SECONDS = 86_400;

async function fetchDeletedSlugs(): Promise<string[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("deleted_games")
    .select("slug")
    .not("slug", "is", null);

  return [
    ...new Set(
      (data ?? [])
        .map((row) => row.slug)
        .filter((slug): slug is string => slug !== null)
    ),
  ];
}

export async function getDeletedSlugs(): Promise<Set<string>> {
  const cached = await getFromCache<string[]>(DELETED_SLUGS_KEY);
  if (cached) {
    return new Set(cached);
  }

  const slugs = await fetchDeletedSlugs();
  await setCache(DELETED_SLUGS_KEY, slugs, DELETED_SLUGS_TTL_SECONDS);
  return new Set(slugs);
}

/**
 * Recompute the set and write it to Redis. Called by the revalidate webhook so
 * the cache is refreshed admin-side after a deletion — users never wait on a
 * rebuild.
 */
export async function refreshDeletedSlugsCache(): Promise<void> {
  const slugs = await fetchDeletedSlugs();
  await setCache(DELETED_SLUGS_KEY, slugs, DELETED_SLUGS_TTL_SECONDS);
}
