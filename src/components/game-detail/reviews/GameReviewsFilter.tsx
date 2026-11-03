"use client";

import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import type { GameReviewType } from "@/lib/types";

type Filter = "all" | GameReviewType;

const FILTERS: Filter[] = ["all", "feedback", "error"];

interface GameReviewsFilterProps {
  reviews: number;
  errorReviews: number;
  lists: Record<Filter, ReactNode>;
}

export function GameReviewsFilter({
  reviews,
  errorReviews,
  lists,
}: GameReviewsFilterProps) {
  const t = useTranslations("gameReviews");
  const [filter, setFilter] = useState<Filter | null>(null);
  const shown = filter ?? "all";
  const counts: Record<Filter, number> = {
    all: reviews,
    feedback: reviews - errorReviews,
    error: errorReviews,
  };

  return (
    <>
      {reviews > 0 && (
        <div className="review-filters">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              className="review-filter"
              aria-pressed={filter === option}
              onClick={() => setFilter(filter === option ? null : option)}
            >
              {t(`filters.${option}`)}
              <span className="review-filter-count">{counts[option]}</span>
            </button>
          ))}
        </div>
      )}
      <hr className="review-divider" />

      {/* Hidden lists stay mounted, so their loaded pages survive a filter switch */}
      {FILTERS.map((option) => (
        <div key={option} hidden={option !== shown}>
          {lists[option]}
        </div>
      ))}
    </>
  );
}
