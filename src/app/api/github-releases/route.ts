import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import type { GitHubRelease } from "@/lib/types";

const GITHUB_REPO = "Vadko/littlebit-launcher";
const KV_KEY = "github-releases-data";
const CACHE_TTL_SECONDS = 3600; // 1 година

interface CachedData {
  latest: GitHubRelease;
  totalDownloads: number;
  cachedAt: number;
}

async function fetchFromGitHub(): Promise<CachedData> {
  const [latestResponse, allReleasesResponse] = await Promise.all([
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    }),
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=100`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    }),
  ]);

  if (!latestResponse.ok) {
    throw new Error("Failed to fetch latest release");
  }

  const latest: GitHubRelease = await latestResponse.json();

  let totalDownloads = 0;
  if (allReleasesResponse.ok) {
    const releases: GitHubRelease[] = await allReleasesResponse.json();
    for (const release of releases) {
      for (const asset of release.assets) {
        totalDownloads += asset.download_count;
      }
    }
  }

  return {
    latest,
    totalDownloads,
    cachedAt: Date.now(),
  };
}

function getKV(): CloudflareEnv["NEXT_CACHE_WORKERS_KV"] | null {
  try {
    const { env } = getCloudflareContext();
    return env.NEXT_CACHE_WORKERS_KV ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const kv = getKV();

    // Спробувати отримати з KV
    if (kv) {
      const cached = await kv.get<CachedData>(KV_KEY, "json");

      if (cached) {
        const age = (Date.now() - cached.cachedAt) / 1000;
        if (age < CACHE_TTL_SECONDS) {
          return NextResponse.json({
            latest: cached.latest,
            totalDownloads: cached.totalDownloads,
            cached: true,
            age: Math.round(age),
          });
        }
      }
    }

    // Фетчимо свіжі дані
    const freshData = await fetchFromGitHub();

    // Зберігаємо в KV якщо доступний
    if (kv) {
      await kv.put(KV_KEY, JSON.stringify(freshData), {
        expirationTtl: CACHE_TTL_SECONDS,
      });
    }

    return NextResponse.json({
      latest: freshData.latest,
      totalDownloads: freshData.totalDownloads,
      cached: false,
    });
  } catch (error) {
    console.error("GitHub releases API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 }
    );
  }
}
