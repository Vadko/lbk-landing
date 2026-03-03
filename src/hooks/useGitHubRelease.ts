"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import type { GitHubRelease } from "@/lib/types";

interface AllReleasesData {
  latest: GitHubRelease;
  totalDownloads: number;
}

async function fetchAllReleases(): Promise<AllReleasesData> {
  const response = await fetch("/api/github-releases");

  if (!response.ok) {
    throw new Error("Failed to fetch releases");
  }

  const data = await response.json();

  return {
    latest: data.latest,
    totalDownloads: data.totalDownloads,
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
      windowsPortable: null,
      macos: null,
      macosArm: null,
      macosX64: null,
      linux: null,
      version: null,
      publishedAt: null,
      totalDownloads: 0,
    };
  }

  const { latest: release, totalDownloads } = data;
  const assets = release.assets;

  const windows = assets.find((a) => a.name.endsWith("Setup.exe"));
  const windowsPortable = assets.find((a) => a.name.endsWith("Portable.exe"));
  const macosArm = assets.find(
    (a) => a.name.includes("arm64") && a.name.endsWith(".dmg")
  );
  const macosX64 = assets.find(
    (a) =>
      (a.name.includes("x64") || a.name.includes("x86")) &&
      a.name.endsWith(".dmg")
  );
  const macos = macosArm ?? macosX64;
  const linux = assets.find((a) => a.name.endsWith(".AppImage"));

  return {
    windows: windows?.browser_download_url ?? null,
    windowsPortable: windowsPortable?.browser_download_url ?? null,
    macos: macos?.browser_download_url ?? null,
    macosArm: macosArm?.browser_download_url ?? null,
    macosX64: macosX64?.browser_download_url ?? null,
    linux: linux?.browser_download_url ?? null,
    version: release.tag_name.replace("v", ""),
    publishedAt: release.published_at,
    totalDownloads,
  };
}

export function detectMacArch(): "arm64" | "x64" {
  if (typeof window === "undefined") return "arm64";

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = (
          gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
        ).toLowerCase();
        // Apple Silicon shows "apple gpu" in WebGL renderer
        if (renderer.includes("apple")) return "arm64";
        // Intel/AMD indicate Intel Mac (x64)
        if (
          renderer.includes("intel") ||
          renderer.includes("amd") ||
          renderer.includes("radeon")
        )
          return "x64";
      }
    }
  } catch {
    // ignore WebGL errors
  }

  // Default to arm64 (majority of Macs sold since 2020)
  return "arm64";
}

export function detectOS():
  | "windows"
  | "macos"
  | "linux"
  | "steamdeck"
  | "unknown" {
  if (typeof navigator === "undefined") return "unknown";

  const userAgent = navigator.userAgent.toLowerCase();

  // Steam Deck detection (must be before generic linux check)
  // Steam Deck UA: "Valve Steam Client/Steam Deck" or contains "steam deck"
  if (userAgent.includes("steam deck") || userAgent.includes("valve steam")) {
    return "steamdeck";
  }

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
