"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import type { GitHubRelease } from "@/lib/types";

const GITHUB_REPO = "Vadko/littlebit-launcher";

interface AllReleasesData {
  latest: GitHubRelease;
  totalDownloads: number;
}

async function fetchAllReleases(): Promise<AllReleasesData> {
  // Fetch all releases to get total downloads
  const allReleasesResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!allReleasesResponse.ok) {
    throw new Error("Failed to fetch releases");
  }

  const allReleases: GitHubRelease[] = await allReleasesResponse.json();

  if (allReleases.length === 0) {
    throw new Error("No releases found");
  }

  // Calculate total downloads from all releases
  const totalDownloads = allReleases.reduce((total, release) => {
    return total + release.assets.reduce((sum, a) => sum + a.download_count, 0);
  }, 0);

  return {
    latest: allReleases[0],
    totalDownloads,
  };
}

export function useGitHubRelease() {
  return useQuery({
    queryKey: queryKeys.github.release,
    queryFn: fetchAllReleases,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

export function getDownloadLinks(data: AllReleasesData | undefined) {
  if (!data) {
    return {
      windows: null,
      macos: null,
      linux: null,
      version: null,
      publishedAt: null,
      totalDownloads: 0,
    };
  }

  const { latest: release, totalDownloads } = data;
  const assets = release.assets;

  const windows = assets.find((a) => a.name.endsWith("Setup.exe"));
  const macos = assets.find((a) => a.name.endsWith(".dmg"));
  const linux = assets.find((a) => a.name.endsWith(".AppImage"));

  return {
    windows: windows?.browser_download_url ?? null,
    macos: macos?.browser_download_url ?? null,
    linux: linux?.browser_download_url ?? null,
    version: release.tag_name.replace("v", ""),
    publishedAt: release.published_at,
    totalDownloads,
  };
}

export function detectOS(): "windows" | "macos" | "linux" | "unknown" {
  if (typeof navigator === "undefined") return "unknown";

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("mac")) return "macos";
  if (userAgent.includes("linux")) return "linux";

  return "unknown";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
