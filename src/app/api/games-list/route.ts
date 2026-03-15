import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Database } from "@/lib/database.types";
import { buildFtsQuery, getTranslitVariant } from "@/lib/search-utils";
import { createServerClient } from "@/lib/supabase/server";
import type { GameGroup, TranslationItem } from "@/lib/types";

type GamesGroupedRow = Database["public"]["Views"]["games_grouped"]["Row"];

const GAMES_PER_PAGE = 12;

function isValidGameRow(
  row: GamesGroupedRow
): row is GamesGroupedRow & { slug: string; name: string } {
  return row.slug !== null && row.name !== null;
}

function parseTranslations(translations: unknown): TranslationItem[] {
  if (!translations || !Array.isArray(translations)) return [];
  return translations as TranslationItem[];
}

function getLatestUpdatedAt(translations: TranslationItem[]): string {
  if (translations.length === 0) return new Date().toISOString();
  return translations.reduce(
    (latest, t) => (t.updated_at > latest ? t.updated_at : latest),
    translations[0].updated_at
  );
}

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

function hasActiveFilters(statuses?: string[], authors?: string[]): boolean {
  return Boolean(
    (statuses && statuses.length > 0) || (authors && authors.length > 0)
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Number(searchParams.get("page") || "1");
    const search = searchParams.get("search") || undefined;
    const statusesParam = searchParams.get("statuses");
    const authorsParam = searchParams.get("authors");
    const sortBy = searchParams.get("sortBy") || undefined;

    const statuses = statusesParam ? statusesParam.split(",") : undefined;
    const authors = authorsParam ? authorsParam.split(",") : undefined;
    const offset = (page - 1) * GAMES_PER_PAGE;
    const limit = GAMES_PER_PAGE;

    const supabase = createServerClient();

    if (hasActiveFilters(statuses, authors)) {
      const result = await fetchWithFilter(supabase, {
        offset,
        limit,
        search,
        statuses,
        authors,
        sortBy,
      });
      return NextResponse.json(result, { headers: cacheHeaders() });
    }

    if (search && search.trim().length < 3) {
      const result = await fuzzySearch(supabase, search, offset, limit, sortBy);
      return NextResponse.json(result, { headers: cacheHeaders() });
    }

    const orderAscending = sortBy === "name" || !sortBy;

    let query = supabase
      .from("games_grouped")
      .select("*", { count: "exact" })
      .order(sortBy || "name", { ascending: orderAscending, nullsFirst: false })
      .range(offset, offset + limit - 1);

    if (search) {
      const ftsQuery = buildFtsQuery(search);
      query = query.textSearch("name_fts", ftsQuery, { config: "simple" });
    }

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    const games = (data ?? []).filter(isValidGameRow).map(mapRowToGameGroup);
    const total = count ?? 0;

    if (search && total === 0) {
      const result = await fuzzySearch(supabase, search, offset, limit, sortBy);
      return NextResponse.json(result, { headers: cacheHeaders() });
    }

    return NextResponse.json(
      {
        games,
        total,
        hasMore: offset + limit < total,
        nextOffset: offset + limit,
      },
      { headers: cacheHeaders() }
    );
  } catch (error) {
    console.error("Games list API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

function cacheHeaders() {
  return { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" };
}

async function fuzzySearch(
  supabase: ReturnType<typeof createServerClient>,
  search: string,
  offset: number,
  limit: number,
  sortBy?: string
) {
  const normalized = search.toLowerCase().trim();
  const translit = getTranslitVariant(search);
  const orderAscending = sortBy === "name" || !sortBy;

  const { data, error } = await supabase
    .rpc("fuzzy_search_games", {
      search_query: normalized,
      search_query_translit: translit ?? undefined,
      similarity_threshold: 0.15,
      limit_val: 50,
    })
    .order(sortBy || "name", { ascending: orderAscending, nullsFirst: false });

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

async function fetchWithFilter(
  supabase: ReturnType<typeof createServerClient>,
  params: {
    offset: number;
    limit: number;
    search?: string;
    statuses?: string[];
    authors?: string[];
    sortBy?: string;
  }
) {
  const { offset, limit, search, statuses, authors, sortBy } = params;

  if (search && search.trim().length < 3) {
    const fuzzyResult = await fuzzySearch(supabase, search, 0, 50, sortBy);
    const filtered = filterGames(fuzzyResult.games, statuses, authors);
    const total = filtered.length;
    return {
      games: filtered.slice(offset, offset + limit),
      total,
      hasMore: offset + limit < total,
      nextOffset: offset + limit,
    };
  }

  const orderAscending = sortBy === "name" || !sortBy;
  let query = supabase
    .from("games_grouped")
    .select("*")
    .order(sortBy || "name", { ascending: orderAscending, nullsFirst: false });

  if (search) {
    const ftsQuery = buildFtsQuery(search);
    query = query.textSearch("name_fts", ftsQuery, { config: "simple" });
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const rows = data ?? [];

  if (search && rows.length === 0) {
    const fuzzyResult = await fuzzySearch(supabase, search, 0, 50, sortBy);
    const filtered = filterGames(fuzzyResult.games, statuses, authors);
    const total = filtered.length;
    return {
      games: filtered.slice(offset, offset + limit),
      total,
      hasMore: offset + limit < total,
      nextOffset: offset + limit,
    };
  }

  const allGames = rows.filter(isValidGameRow).map(mapRowToGameGroup);
  const filtered = filterGames(allGames, statuses, authors);
  const total = filtered.length;
  return {
    games: filtered.slice(offset, offset + limit),
    total,
    hasMore: offset + limit < total,
    nextOffset: offset + limit,
  };
}

function filterGames(
  games: GameGroup[],
  statuses?: string[],
  authors?: string[]
): GameGroup[] {
  return games.filter((game) => {
    if (
      statuses?.length &&
      !game.translations.some((t) => statuses.includes(t.status))
    ) {
      return false;
    }
    if (
      authors?.length &&
      !game.translations.some((t) => authors.some((a) => t.team?.includes(a)))
    ) {
      return false;
    }
    return true;
  });
}
