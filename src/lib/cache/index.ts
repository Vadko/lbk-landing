import { MemoryCache } from "./memory-cache";
import { RedisCache } from "./redis-cache";
import type { Cache } from "./types";

// One cache instance per process. Stored on globalThis so dev hot-reload doesn't
// keep creating new clients (and new Redis connections) on every edit — the
// standard singleton pattern for connection clients in Next.js. Only the client
// lives here; the cached data is in Redis (or, in dev, the fallback's own map),
// so we never rely on this global for state.
const globalForCache = globalThis as unknown as { cache?: Cache };

function getCache(): Cache {
  globalForCache.cache ??= process.env.REDIS_URL
    ? new RedisCache(process.env.REDIS_URL)
    : new MemoryCache();
  return globalForCache.cache;
}

export function getFromCache<T>(key: string): Promise<T | null> {
  return getCache().get<T>(key);
}

export function setCache(
  key: string,
  value: unknown,
  ttlSeconds: number
): Promise<void> {
  return getCache().set(key, value, ttlSeconds);
}
