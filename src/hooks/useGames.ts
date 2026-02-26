"use client";

import { useQuery } from "@tanstack/react-query";
import type { Database } from "@/lib/database.types";
import { queryKeys } from "@/lib/queryKeys";
import { buildFtsQuery, getTranslitVariant } from "@/lib/search-utils";
import { supabase } from "@/lib/supabase/client";
import type {
  GameGroup,
  GamesGroupedResponse,
  TranslationItem,
} from "@/lib/types";

type GamesGroupedRow = Database["public"]["Views"]["games_grouped"]["Row"];

const GAMES_PER_PAGE = 12;

interface FetchGamesParams {
  offset: number;
  limit: number;
  search?: string;
  statuses?: string[];
  authors?: string[];
}

// Type guard to check if row has required non-null fields
function isValidGameRow(
  row: GamesGroupedRow
): row is GamesGroupedRow & { slug: string; name: string } {
  return row.slug !== null && row.name !== null;
}

// Parse translations from JSON to typed array
function parseTranslations(translations: unknown): TranslationItem[] {
  if (!translations || !Array.isArray(translations)) return [];
  return translations as TranslationItem[];
}

// Get the most recent updated_at from translations
function getLatestUpdatedAt(translations: TranslationItem[]): string {
  if (translations.length === 0) return new Date().toISOString();
  return translations.reduce(
    (latest, t) => (t.updated_at > latest ? t.updated_at : latest),
    translations[0].updated_at
  );
}

// Map database row to GameGroup
function mapRowToGameGroup(
  row: GamesGroupedRow & { slug: string; name: string }
): GameGroup {
  const translations = parseTranslations(row.translations);
  return {
    slug: row.slug,
    name: row.name,
    banner_path: row.banner_path,
    thumbnail_path: row.thumbnail_path,
    is_adult: row.is_adult ?? false,
    updated_at: getLatestUpdatedAt(translations),
    translations,
  };
}

// Check if we have active filters
function hasActiveFilters(statuses?: string[], authors?: string[]): boolean {
  const hasStatuses = statuses && statuses.length > 0;
  const hasAuthors = authors && authors.length > 0;
  return Boolean(hasStatuses || hasAuthors);
}

// Fuzzy search fallback via RPC (when FTS returns 0 results)
async function fuzzySearchGames(
  search: string,
  offset: number,
  limit: number
): Promise<GamesGroupedResponse> {
  const normalized = search.toLowerCase().trim();
  const translit = getTranslitVariant(search);

  const { data, error } = await supabase.rpc("fuzzy_search_games", {
    search_query: normalized,
    search_query_translit: translit ?? undefined,
    similarity_threshold: 0.15,
    limit_val: 50,
  });

  if (error) {
    console.error("Fuzzy search error:", error.message);
    return { games: [], total: 0, hasMore: false, nextOffset: offset + limit };
  }

  const allGames = (data ?? []).filter(isValidGameRow).map(mapRowToGameGroup);

  const total = allGames.length;
  const paginatedGames = allGames.slice(offset, offset + limit);

  return {
    games: paginatedGames,
    total,
    hasMore: offset + limit < total,
    nextOffset: offset + limit,
  };
}

// Paginated fetch using games_grouped view
async function fetchGamesGrouped({
  offset,
  limit,
  search,
  statuses,
  authors,
}: FetchGamesParams): Promise<GamesGroupedResponse> {
  // If filtering by statuses or authors, we need to filter by checking translations JSON
  if (hasActiveFilters(statuses, authors)) {
    return fetchGamesGroupedWithFilter({
      offset,
      limit,
      search,
      statuses,
      authors,
    });
  }

  let query = supabase
    .from("games_grouped")
    .select("*", { count: "exact" })
    .order("name")
    .range(offset, offset + limit - 1);

  if (search) {
    const ftsQuery = buildFtsQuery(search);
    query = query.textSearch("name_fts", ftsQuery, { config: "simple" });
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const games = (data ?? []).filter(isValidGameRow).map(mapRowToGameGroup);

  const total = count ?? 0;

  // Fuzzy fallback when FTS returns 0 results
  if (search && total === 0) {
    return fuzzySearchGames(search, offset, limit);
  }

  return {
    games,
    total,
    hasMore: offset + limit < total,
    nextOffset: offset + limit,
  };
}

// Filter in memory since view doesn't support JSON field filtering
async function fetchGamesGroupedWithFilter({
  offset,
  limit,
  search,
  statuses,
  authors,
}: FetchGamesParams): Promise<GamesGroupedResponse> {
  let query = supabase.from("games_grouped").select("*").order("name");

  if (search) {
    const ftsQuery = buildFtsQuery(search);
    query = query.textSearch("name_fts", ftsQuery, { config: "simple" });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const rows = data ?? [];

  // Fuzzy fallback when FTS returns 0 results
  if (search && rows.length === 0) {
    const fuzzyResult = await fuzzySearchGames(search, 0, 50);
    const filteredFuzzy = fuzzyResult.games.filter((game) => {
      if (statuses && statuses.length > 0) {
        if (!game.translations.some((t) => statuses.includes(t.status))) {
          return false;
        }
      }
      if (authors && authors.length > 0) {
        if (
          !game.translations.some((t) =>
            authors.some((author) => t.team?.includes(author))
          )
        ) {
          return false;
        }
      }
      return true;
    });
    const total = filteredFuzzy.length;
    const paginatedGames = filteredFuzzy.slice(offset, offset + limit);
    return {
      games: paginatedGames,
      total,
      hasMore: offset + limit < total,
      nextOffset: offset + limit,
    };
  }

  // Filter groups based on translations
  const filteredGroups = rows.filter(isValidGameRow).filter((row) => {
    const translations = parseTranslations(row.translations);

    // Filter by statuses - game matches if ANY translation has one of selected statuses
    if (statuses && statuses.length > 0) {
      if (!translations.some((t) => statuses.includes(t.status))) {
        return false;
      }
    }

    // Filter by authors - game matches if ANY translation has one of selected authors
    // Uses partial match to handle comma-separated team field (e.g., "Author A, Author B")
    if (authors && authors.length > 0) {
      const matchesAuthor = translations.some((t) =>
        authors.some((author) => t.team?.includes(author))
      );
      if (!matchesAuthor) {
        return false;
      }
    }

    return true;
  });

  const games = filteredGroups.map(mapRowToGameGroup);

  const total = games.length;
  const paginatedGames = games.slice(offset, offset + limit);

  return {
    games: paginatedGames,
    total,
    hasMore: offset + limit < total,
    nextOffset: offset + limit,
  };
}

export function useGamesPaginated(
  page: number,
  search?: string,
  statuses?: string[],
  authors?: string[]
) {
  return useQuery({
    queryKey: queryKeys.games.list({ search, statuses, authors, page }),
    queryFn: () =>
      fetchGamesGrouped({
        offset: (page - 1) * GAMES_PER_PAGE,
        limit: GAMES_PER_PAGE,
        search,
        statuses,
        authors,
      }),
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

// Fetch unique authors from games' team field
// Parses comma-separated teams into individual authors
export function useTeams() {
  return useQuery({
    queryKey: queryKeys.games.authors(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("games")
        .select("team")
        .eq("approved", true)
        .eq("hide", false);

      if (error) {
        throw new Error(error.message);
      }

      // Parse comma-separated team field into individual authors
      const allAuthors = data
        .flatMap((row) => {
          if (!row.team) return [];
          return row.team.split(",").map((author) => author.trim());
        })
        .filter((author) => author.length > 0);

      // Get unique authors and sort alphabetically
      const uniqueAuthors = [...new Set(allAuthors)].sort((a, b) =>
        a.localeCompare(b, "uk")
      );

      return uniqueAuthors;
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}
