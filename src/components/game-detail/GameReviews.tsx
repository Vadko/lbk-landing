"use client";

import { useState } from "react";
import { REVIEWS_PAGE_SIZE, useGameReviews } from "@/hooks/useGameReviews";
import { useInView } from "@/hooks/useInView";
import type { GameReview, GameReviewReply } from "@/lib/types";
import { ReviewImages } from "./ReviewImages";
import { ReviewsPagination } from "./ReviewsPagination";

interface GameReviewsProps {
  gameId: string;
}

const TIME_ZONE = "Europe/Kyiv";
const DAY_MS = 86_400_000;

function dayKey(date: Date): number {
  const [y, m, d] = date
    .toLocaleDateString("en-CA", { timeZone: TIME_ZONE })
    .split("-")
    .map(Number);
  return Date.UTC(y, m - 1, d);
}

function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  const time = date.toLocaleTimeString("uk-UA", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  });
  const daysAgo = Math.round((dayKey(new Date()) - dayKey(date)) / DAY_MS);

  if (daysAgo === 0) {
    return `Сьогодні, ${time}`;
  }
  if (daysAgo === 1) {
    return `Вчора, ${time}`;
  }
  const day = date
    .toLocaleDateString("uk-UA", {
      timeZone: TIME_ZONE,
      day: "numeric",
      month: "short",
    })
    .replace(".", "");
  return `${day}, ${time}`;
}

function formatCommentsCount(count: number): string {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) {
    return `${count} коментарів`;
  }
  if (last === 1) {
    return `${count} коментар`;
  }
  if (last >= 2 && last <= 4) {
    return `${count} коментарі`;
  }
  return `${count} коментарів`;
}

function AuthorReply({
  reply,
  isLast,
}: {
  reply: GameReviewReply;
  isLast: boolean;
}) {
  return (
    <div className={`review-reply${isLast ? " last" : ""}`}>
      <div className="review-reply-head">
        <span className="review-reply-badge">Відповідь автора</span>
        <span className="review-date">{formatReviewDate(reply.createdAt)}</span>
      </div>
      <p className="review-text">{reply.text}</p>
    </div>
  );
}

function ReviewItem({ review }: { review: GameReview }) {
  return (
    <div className="review-item">
      <p className="review-date">{formatReviewDate(review.createdAt)}</p>
      <p className="review-text">{review.text}</p>
      <ReviewImages images={review.images} />
      {review.replies.length > 0 && (
        <div className="review-replies">
          {review.replies.map((reply, i) => (
            <AuthorReply
              key={reply.id}
              reply={reply}
              isLast={i === review.replies.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function GameReviews({ gameId }: GameReviewsProps) {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView<HTMLElement>("200px");
  const { data, isPending, isError, isPlaceholderData } = useGameReviews(
    gameId,
    page,
    inView
  );
  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / (data.pageSize || REVIEWS_PAGE_SIZE)))
    : 1;

  return (
    <section ref={ref} className="game-section game-reviews">
      <div className="game-reviews-header">
        <h2>Відгуки спільноти</h2>
        <p className="game-reviews-count">
          {data && formatCommentsCount(data.total)}
        </p>
      </div>

      {isError ? (
        <p className="game-reviews-state">
          Не вдалося завантажити відгуки. Спробуйте пізніше.
        </p>
      ) : isPending || !data ? (
        <div className="game-reviews-state">
          <span className="game-reviews-spinner" />
        </div>
      ) : data.items.length === 0 ? (
        <p className="game-reviews-empty">Поки що немає відгуків.</p>
      ) : (
        <div className={`review-list${isPlaceholderData ? " loading" : ""}`}>
          {data.items.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <ReviewsPagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      )}
    </section>
  );
}
