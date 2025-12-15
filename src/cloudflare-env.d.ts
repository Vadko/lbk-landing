declare global {
  interface CloudflareEnv {
    NEXT_CACHE_WORKERS_KV: KVNamespace;
  }
}

export {};
