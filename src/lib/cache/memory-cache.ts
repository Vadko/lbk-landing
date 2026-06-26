import type { Cache } from "./types";

// Per-process fallback used when REDIS_URL isn't set (local dev), so we don't hit
// the database on every request just because Redis isn't running. Holds the data
// in a process-local map — fine for a single dev process.
export class MemoryCache implements Cache {
  private store = new Map<string, { value: string; expiresAt: number }>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry || entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }
    return JSON.parse(entry.value) as T;
  }

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    this.store.set(key, {
      value: JSON.stringify(value),
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
}
