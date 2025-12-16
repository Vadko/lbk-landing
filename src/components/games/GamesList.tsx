"use client";

import { useState, useCallback } from "react";
import { useGamesInfinite } from "@/hooks/useGames";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GameCard } from "./GameCard";
import { GamesSearch } from "./GamesSearch";

export function GamesList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGamesInfinite(search, status);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const observerTarget = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore: hasNextPage ?? false,
    isLoading: isFetchingNextPage,
  });

  const allGames = data?.pages.flatMap((page) => page.games) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  return (
    <div>
      <GamesSearch
        value={search}
        onChange={setSearch}
        status={status}
        onStatusChange={setStatus}
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
            {allGames.map((game, index) => (
              <div key={game.slug} className="game-card-wrapper">
                <GameCard game={game} />
                {hasNextPage && index === allGames.length - 5 && (
                  <div ref={observerTarget} style={{ height: 0 }} />
                )}
              </div>
            ))}
          </div>

          {isFetchingNextPage && (
            <div className="loading-spinner">
              <div className="spinner" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
