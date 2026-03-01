"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

interface LandingStats {
  totalDownloads: number;
  totalPlaytimeHours: number;
  totalUniquePlayers: number;
  totalCreators: number;
  dau: number;
}

async function fetchLandingStats(): Promise<LandingStats> {
  const response = await fetch("/api/landing-stats");

  if (!response.ok) {
    throw new Error("Failed to fetch landing stats");
  }

  return response.json();
}

export function useLandingStats() {
  return useQuery({
    queryKey: queryKeys.landing.stats,
    queryFn: fetchLandingStats,
    staleTime: 24 * 60 * 60 * 1000,
  });
}
