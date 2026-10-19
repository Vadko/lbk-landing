"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useGamesPaginated, useTeams } from "@/hooks/useGames";
import { trackFailedSearch, trackViewSearchResults } from "@/lib/analytics";
import { GAMES_PER_PAGE } from "@/lib/constants";
import type { GamesGroupedResponse } from "@/lib/types";
import { GameCard } from "./GameCard";
import { GamesSearch, type GamesSearchProps } from "./GamesSearch";

interface GamesListProps {
  initialData?: GamesGroupedResponse;
}

interface GamesListViewProps extends GamesListProps {
  searchParams: Pick<URLSearchParams, "get">;
}

interface GamesCatalogProps {
  searchProps: GamesSearchProps;
  data: GamesGroupedResponse | undefined;
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const noop = () => {};

// GamesListView with no URL params, minus React Query: it reads the clock, which the prerender rejects
const DEFAULT_SEARCH_PROPS: GamesSearchProps = {
  value: "",
  onChange: noop,
  selectedStatuses: [],
  onStatusesChange: noop,
  selectedAuthors: [],
  onAuthorsChange: noop,
  authors: [],
  authorsLoading: true,
  sortBy: "name",
  onSortChange: noop,
  hasVoice: false,
  onVoiceChange: noop,
  hasAchievements: false,
  onAchievementsChange: noop,
  fromWorkshop: false,
  onWorkshopChange: noop,
  selectedTranslationTypes: [],
  onTranslationTypesChange: noop,
  onClearStatusFilters: noop,
};

// useSearchParams() makes the prerender skip its subtree, so the fallback puts the unfiltered catalog into the static HTML
export function GamesList({ initialData }: GamesListProps) {
  return (
    <Suspense
      fallback={
        <GamesCatalog
          searchProps={DEFAULT_SEARCH_PROPS}
          data={initialData}
          isLoading={false}
          error={null}
          currentPage={1}
          onPageChange={noop}
        />
      }
    >
      <GamesListFromUrl initialData={initialData} />
    </Suspense>
  );
}

function GamesListFromUrl({ initialData }: GamesListProps) {
  const searchParams = useSearchParams();
  return (
    <GamesListView initialData={initialData} searchParams={searchParams} />
  );
}

function GamesListView({ initialData, searchParams }: GamesListViewProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  // Read current page from URL params
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    return page > 0 ? page : 1;
  }, [searchParams]);

  // Fetch authors list (renamed from teams for clarity)
  const { data: authors = [], isLoading: authorsLoading } = useTeams();

  // Read selected statuses from URL params (comma-separated)
  const selectedStatuses = useMemo(() => {
    const statusesParam = searchParams.get("statuses");
    if (!statusesParam) {
      return [];
    }
    return statusesParam.split(",").filter(Boolean);
  }, [searchParams]);

  // Read selected authors from URL params (comma-separated)
  const selectedAuthors = useMemo(() => {
    const authorsParam = searchParams.get("authors");
    // Support old 'team' param for backward compatibility
    const teamParam = searchParams.get("team");
    if (authorsParam) {
      return authorsParam.split(",").filter(Boolean);
    }
    if (teamParam) {
      return [teamParam];
    }
    return [];
  }, [searchParams]);

  // Read sort option from URL params
  const sortBy = useMemo(() => {
    const sortParam = searchParams.get("sort");
    return sortParam || "name";
  }, [searchParams]);

  // Read has-voice filter from URL params
  const hasVoice = useMemo(() => {
    return searchParams.get("voice") === "1";
  }, [searchParams]);

  // Read has-achievements filter from URL params
  const hasAchievements = useMemo(() => {
    return searchParams.get("achievements") === "1";
  }, [searchParams]);

  // Read the "Workshop only" filter from the URL
  const fromWorkshop = useMemo(() => {
    return searchParams.get("workshop") === "1";
  }, [searchParams]);

  // Read the selected translation types (human / AI / AI + edited) from the URL params
  const selectedTranslationTypes = useMemo(() => {
    const typesParam = searchParams.get("translationTypes");
    if (!typesParam) {
      return [];
    }
    return typesParam.split(",").filter(Boolean);
  }, [searchParams]);

  // Update the URL with partial changes: positional boolean arguments are far too easy to mix up here
  const updateFilters = useCallback(
    (patch: {
      statuses?: string[];
      authors?: string[];
      page?: number;
      sortBy?: string;
      hasVoice?: boolean;
      hasAchievements?: boolean;
      fromWorkshop?: boolean;
      translationTypes?: string[];
    }) => {
      const next = {
        statuses: selectedStatuses,
        authors: selectedAuthors,
        page: 1,
        sortBy,
        hasVoice,
        hasAchievements,
        fromWorkshop,
        translationTypes: selectedTranslationTypes,
        ...patch,
      };

      const params = new URLSearchParams();
      if (next.statuses.length > 0) {
        params.set("statuses", next.statuses.join(","));
      }
      if (next.authors.length > 0) {
        params.set("authors", next.authors.join(","));
      }
      if (next.sortBy && next.sortBy !== "name") {
        params.set("sort", next.sortBy);
      }
      if (next.hasVoice) {
        params.set("voice", "1");
      }
      if (next.hasAchievements) {
        params.set("achievements", "1");
      }
      if (next.fromWorkshop) {
        params.set("workshop", "1");
      }
      if (next.translationTypes.length > 0) {
        params.set("translationTypes", next.translationTypes.join(","));
      }
      if (next.page > 1) {
        params.set("page", next.page.toString());
      }
      const queryString = params.toString();
      router.push(queryString ? `/games?${queryString}` : "/games");
    },
    [
      router,
      selectedStatuses,
      selectedAuthors,
      sortBy,
      hasVoice,
      hasAchievements,
      fromWorkshop,
      selectedTranslationTypes,
    ]
  );

  const handleStatusesChange = useCallback(
    (statuses: string[]) => updateFilters({ statuses }),
    [updateFilters]
  );

  const handleAuthorsChange = useCallback(
    (authors: string[]) => updateFilters({ authors }),
    [updateFilters]
  );

  const handleSortChange = useCallback(
    (newSortBy: string) => updateFilters({ sortBy: newSortBy }),
    [updateFilters]
  );

  const handleVoiceChange = useCallback(
    (newHasVoice: boolean) => updateFilters({ hasVoice: newHasVoice }),
    [updateFilters]
  );

  const handleAchievementsChange = useCallback(
    (newHasAchievements: boolean) =>
      updateFilters({ hasAchievements: newHasAchievements }),
    [updateFilters]
  );

  const handleWorkshopChange = useCallback(
    (newFromWorkshop: boolean) =>
      updateFilters({ fromWorkshop: newFromWorkshop }),
    [updateFilters]
  );

  const handleTranslationTypesChange = useCallback(
    (translationTypes: string[]) => updateFilters({ translationTypes }),
    [updateFilters]
  );

  // Reset the statuses and derived flags in one transition, otherwise they overwrite each other
  const handleClearStatusFilters = useCallback(() => {
    updateFilters({
      statuses: [],
      hasVoice: false,
      hasAchievements: false,
      fromWorkshop: false,
      translationTypes: [],
    });
  }, [updateFilters]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters({ page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateFilters]
  );

  const isDefaultView =
    currentPage === 1 &&
    !search &&
    selectedStatuses.length === 0 &&
    selectedAuthors.length === 0 &&
    !hasVoice &&
    !hasAchievements &&
    !fromWorkshop &&
    selectedTranslationTypes.length === 0 &&
    (sortBy === "name" || !sortBy);

  const { data, isLoading, error } = useGamesPaginated(
    currentPage,
    search,
    selectedStatuses,
    selectedAuthors,
    sortBy,
    isDefaultView ? initialData : undefined,
    hasVoice,
    hasAchievements,
    fromWorkshop,
    selectedTranslationTypes
  );

  const total = data?.total ?? 0;

  // Track search results when user has a search query and results arrive
  const lastTrackedSearch = useRef("");
  useEffect(() => {
    if (
      search &&
      !isLoading &&
      total > 0 &&
      lastTrackedSearch.current !== search
    ) {
      lastTrackedSearch.current = search;
      trackViewSearchResults(search, total);
    }
  }, [search, isLoading, total]);

  // Track failed searches (0 results) with delay to avoid tracking intermediate typing states
  const lastTrackedFailedSearch = useRef("");
  const failedSearchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    clearTimeout(failedSearchTimer.current);
    if (
      search.trim().length >= 3 &&
      !isLoading &&
      total === 0 &&
      lastTrackedFailedSearch.current !== search
    ) {
      failedSearchTimer.current = setTimeout(() => {
        lastTrackedFailedSearch.current = search;
        trackFailedSearch(search);
      }, 1500);
    }
    return () => clearTimeout(failedSearchTimer.current);
  }, [search, isLoading, total]);

  // Reset to page 1 when search query changes
  const prevSearch = useRef(search);
  useEffect(() => {
    if (search !== prevSearch.current) {
      prevSearch.current = search;
      if (currentPage > 1) {
        updateFilters({ page: 1 });
      }
    }
  }, [
    search,
    currentPage,
    selectedStatuses,
    selectedAuthors,
    sortBy,
    hasVoice,
    hasAchievements,
    updateFilters,
  ]);

  return (
    <GamesCatalog
      searchProps={{
        value: search,
        onChange: setSearch,
        selectedStatuses,
        onStatusesChange: handleStatusesChange,
        selectedAuthors,
        onAuthorsChange: handleAuthorsChange,
        authors,
        authorsLoading,
        sortBy,
        onSortChange: handleSortChange,
        hasVoice,
        onVoiceChange: handleVoiceChange,
        hasAchievements,
        onAchievementsChange: handleAchievementsChange,
        fromWorkshop,
        onWorkshopChange: handleWorkshopChange,
        selectedTranslationTypes,
        onTranslationTypesChange: handleTranslationTypesChange,
        onClearStatusFilters: handleClearStatusFilters,
      }}
      data={data}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
}

function GamesCatalog({
  searchProps,
  data,
  isLoading,
  error,
  currentPage,
  onPageChange,
}: GamesCatalogProps) {
  const t = useTranslations("catalogList");
  const allGames = data?.games ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / GAMES_PER_PAGE);

  return (
    <div>
      <GamesSearch {...searchProps} />

      {!isLoading && (
        <p className="games-count">
          {t.rich("found", {
            total: String(total),
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      )}

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : error ? (
        <div className="games-empty">
          <SvgIcon icon={faExclamationTriangle} />
          <h3>{t("errorTitle")}</h3>
          <p>{t("errorText")}</p>
        </div>
      ) : allGames.length === 0 ? (
        <div className="games-empty">
          <SvgIcon icon={faGamepad} />
          <h3>{t("emptyTitle")}</h3>
          <p>{t("emptyText")}</p>
        </div>
      ) : (
        <>
          <div className="games-grid">
            {allGames.map((game, index) => (
              <div key={game.slug} className="game-card-wrapper">
                <GameCard game={game} priority={index < 6} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label={t("prevPage")}
              >
                <SvgIcon icon={faChevronLeft} />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`pagination-btn ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                    onClick={() => onPageChange(pageNum)}
                    aria-label={t("page", { page: String(pageNum) })}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label={t("nextPage")}
              >
                <SvgIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
