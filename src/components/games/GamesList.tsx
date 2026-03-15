"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useGamesPaginated, useTeams } from "@/hooks/useGames";
import { trackFailedSearch, trackViewSearchResults } from "@/lib/analytics";
import type { GamesGroupedResponse } from "@/lib/types";
import { GameCard } from "./GameCard";
import { GamesSearch } from "./GamesSearch";

interface GamesListProps {
  initialData?: GamesGroupedResponse;
}

export function GamesList({ initialData }: GamesListProps) {
  const searchParams = useSearchParams();
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
    if (!statusesParam) return [];
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

  // Update URL with new filter values and reset to page 1
  const updateFilters = useCallback(
    (
      newStatuses: string[],
      newAuthors: string[],
      page?: number,
      newSortBy?: string
    ) => {
      const params = new URLSearchParams();
      if (newStatuses.length > 0) {
        params.set("statuses", newStatuses.join(","));
      }
      if (newAuthors.length > 0) {
        params.set("authors", newAuthors.join(","));
      }
      if (newSortBy && newSortBy !== "name") {
        params.set("sort", newSortBy);
      }
      if (page && page > 1) {
        params.set("page", page.toString());
      }
      const queryString = params.toString();
      router.push(queryString ? `/games?${queryString}` : "/games");
    },
    [router]
  );

  const handleStatusesChange = useCallback(
    (newStatuses: string[]) => {
      updateFilters(newStatuses, selectedAuthors, 1, sortBy);
    },
    [updateFilters, selectedAuthors, sortBy]
  );

  const handleAuthorsChange = useCallback(
    (newAuthors: string[]) => {
      updateFilters(selectedStatuses, newAuthors, 1, sortBy);
    },
    [updateFilters, selectedStatuses, sortBy]
  );

  const handleSortChange = useCallback(
    (newSortBy: string) => {
      updateFilters(selectedStatuses, selectedAuthors, 1, newSortBy);
    },
    [updateFilters, selectedStatuses, selectedAuthors]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters(selectedStatuses, selectedAuthors, page, sortBy);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateFilters, selectedStatuses, selectedAuthors, sortBy]
  );

  const isDefaultView =
    currentPage === 1 &&
    !search &&
    selectedStatuses.length === 0 &&
    selectedAuthors.length === 0 &&
    (sortBy === "name" || !sortBy);

  const { data, isLoading, error } = useGamesPaginated(
    currentPage,
    search,
    selectedStatuses,
    selectedAuthors,
    sortBy,
    isDefaultView ? initialData : undefined
  );

  const allGames = data?.games ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 12);

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
        updateFilters(selectedStatuses, selectedAuthors, 1, sortBy);
      }
    }
  }, [
    search,
    currentPage,
    selectedStatuses,
    selectedAuthors,
    sortBy,
    updateFilters,
  ]);

  return (
    <div>
      <GamesSearch
        value={search}
        onChange={setSearch}
        selectedStatuses={selectedStatuses}
        onStatusesChange={handleStatusesChange}
        selectedAuthors={selectedAuthors}
        onAuthorsChange={handleAuthorsChange}
        authors={authors}
        authorsLoading={authorsLoading}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      {!isLoading && (
        <p className="games-count">
          Знайдено ігор: <strong>{total}</strong>
        </p>
      )}

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : error ? (
        <div className="games-empty">
          <SvgIcon icon={faExclamationTriangle} />
          <h3>Помилка</h3>
          <p>Помилка завантаження ігор</p>
        </div>
      ) : allGames.length === 0 ? (
        <div className="games-empty">
          <SvgIcon icon={faGamepad} />
          <h3>Ігор не знайдено</h3>
          <p>Спробуйте змінити параметри пошуку</p>
        </div>
      ) : (
        <>
          <div className="games-grid">
            {allGames.map((game, index) => (
              <div key={game.slug} className="game-card-wrapper">
                <GameCard game={game} priority={index < 4} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Попередня сторінка"
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
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`Сторінка ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Наступна сторінка"
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
