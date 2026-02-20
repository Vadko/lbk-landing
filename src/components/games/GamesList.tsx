"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGamesPaginated, useTeams } from "@/hooks/useGames";
import { trackViewSearchResults } from "@/lib/analytics";
import { GameCard } from "./GameCard";
import { GamesSearch } from "./GamesSearch";

export function GamesList() {
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

  // Update URL with new filter values and reset to page 1
  const updateFilters = useCallback(
    (newStatuses: string[], newAuthors: string[], page?: number) => {
      const params = new URLSearchParams();
      if (newStatuses.length > 0) {
        params.set("statuses", newStatuses.join(","));
      }
      if (newAuthors.length > 0) {
        params.set("authors", newAuthors.join(","));
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
      updateFilters(newStatuses, selectedAuthors, 1);
    },
    [updateFilters, selectedAuthors]
  );

  const handleAuthorsChange = useCallback(
    (newAuthors: string[]) => {
      updateFilters(selectedStatuses, newAuthors, 1);
    },
    [updateFilters, selectedStatuses]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters(selectedStatuses, selectedAuthors, page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateFilters, selectedStatuses, selectedAuthors]
  );

  const { data, isLoading, error } = useGamesPaginated(
    currentPage,
    search,
    selectedStatuses,
    selectedAuthors
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
          <i className="fa-solid fa-exclamation-triangle" />
          <h3>Помилка</h3>
          <p>Помилка завантаження ігор</p>
        </div>
      ) : allGames.length === 0 ? (
        <div className="games-empty">
          <i className="fa-solid fa-gamepad" />
          <h3>Ігор не знайдено</h3>
          <p>Спробуйте змінити параметри пошуку</p>
        </div>
      ) : (
        <>
          <div className="games-grid">
            {allGames.map((game) => (
              <div key={game.slug} className="game-card-wrapper">
                <GameCard game={game} />
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
                <i className="fa-solid fa-chevron-left" />
              </button>

              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
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
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
