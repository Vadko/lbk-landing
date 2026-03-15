"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import type { GamesGroupedResponse } from "@/lib/types";

export function useGamesPaginated(
  page: number,
  search?: string,
  statuses?: string[],
  authors?: string[],
  sortBy?: string,
  initialData?: GamesGroupedResponse
) {
  return useQuery({
    queryKey: queryKeys.games.list({ search, statuses, authors, page, sortBy }),
    initialData,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (search) params.set("search", search);
      if (statuses?.length) params.set("statuses", statuses.join(","));
      if (authors?.length) params.set("authors", authors.join(","));
      if (sortBy) params.set("sortBy", sortBy);

      const response = await fetch(`/api/games-list?${params}`);
      if (!response.ok) throw new Error("Failed to fetch games");
      return response.json() as Promise<GamesGroupedResponse>;
    },
  });
}

export function useGamesCount() {
  return useQuery({
    queryKey: queryKeys.games.count(),
    queryFn: async () => {
      const response = await fetch("/api/games-count");
      if (!response.ok) throw new Error("Failed to fetch count");
      const data = await response.json();
      return data.count as number;
    },
  });
}

export function useTeams() {
  return useQuery({
    queryKey: queryKeys.games.authors(),
    queryFn: async () => {
      const response = await fetch("/api/games-teams");
      if (!response.ok) throw new Error("Failed to fetch teams");
      return response.json() as Promise<string[]>;
    },
    staleTime: 1000 * 60 * 10,
  });
}
