"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { queryKeys } from "@/lib/queryKeys";
import type {
  GamesGroupedResponse,
  GameGroup,
  TranslationItem,
} from "@/lib/types";

const GAMES_PER_PAGE = 12;

interface FetchGamesParams {
  offset: number;
  limit: number;
  search?: string;
  status?: string;
}

// Parse translations from JSON to typed array
function parseTranslations(translations: unknown): TranslationItem[] {
  if (!translations || !Array.isArray(translations)) return [];
  return translations as TranslationItem[];
}

// Paginated fetch using games_grouped view
async function fetchGamesGrouped({
  offset,
  limit,
  search,
  status,
}: FetchGamesParams): Promise<GamesGroupedResponse> {
  // If filtering by status, we need to filter by checking translations JSON
  if (status && status !== "all") {
    return fetchGamesGroupedWithStatusFilter({ offset, limit, search, status });
  }

  let query = supabase
    .from("games_grouped")
    .select("*", { count: "exact" })
    .order("name")
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const games: GameGroup[] = (data ?? [])
    .filter((row) => row.slug && row.name)
    .map((row) => ({
      slug: row.slug!,
      name: row.name!,
      banner_path: row.banner_path,
      thumbnail_path: row.thumbnail_path,
      is_adult: row.is_adult ?? false,
      translations: parseTranslations(row.translations),
    }));

  const total = count ?? 0;

  return {
    games,
    total,
    hasMore: offset + limit < total,
    nextOffset: offset + limit,
  };
}

// Fallback for status filtering (filter in memory since view doesn't support it)
async function fetchGamesGroupedWithStatusFilter({
  offset,
  limit,
  search,
  status,
}: FetchGamesParams): Promise<GamesGroupedResponse> {
  let query = supabase
    .from("games_grouped")
    .select("*")
    .order("name");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  // Filter groups that have at least one translation with the requested status
  const filteredGroups = (data ?? [])
    .filter((row) => row.slug && row.name)
    .filter((row) => {
      const translations = parseTranslations(row.translations);
      return translations.some((t) => t.status === status);
    });

  const games: GameGroup[] = filteredGroups.map((row) => ({
    slug: row.slug!,
    name: row.name!,
    banner_path: row.banner_path,
    thumbnail_path: row.thumbnail_path,
    is_adult: row.is_adult ?? false,
    translations: parseTranslations(row.translations),
  }));

  const total = games.length;
  const paginatedGames = games.slice(offset, offset + limit);

  return {
    games: paginatedGames,
    total,
    hasMore: offset + limit < total,
    nextOffset: offset + limit,
  };
}

export function useGamesInfinite(search?: string, status?: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.games.list({ search, status }),
    queryFn: ({ pageParam = 0 }) =>
      fetchGamesGrouped({
        offset: pageParam,
        limit: GAMES_PER_PAGE,
        search,
        status,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });
}

export function useGamesCount() {
  return useQuery({
    queryKey: queryKeys.games.count(),
    queryFn: async () => {
      const { count, error } = await supabase
        .from("games_grouped")
        .select("*", { count: "exact", head: true });

      if (error) {
        throw new Error(error.message);
      }

      return count ?? 0;
    },
  });
}
