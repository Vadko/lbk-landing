"use client";

import { faRotate } from "@fortawesome/free-solid-svg-icons/faRotate";
import { unstable_isUnrecognizedActionError } from "next/navigation";
import { useTranslations } from "next-intl";
import { Fragment, type ReactNode, useState } from "react";
import { ActionIcon } from "@/components/ui/ActionIcon";
import { useActionPhase } from "@/hooks/useActionPhase";
import { useInfiniteScrollSentinel } from "@/hooks/useInfiniteScrollSentinel";
import type { GameReviewType } from "@/lib/types";
import { loadMoreReviews } from "./loadMoreReviews";

interface MoreReviewsProps {
  gameId: string;
  type?: GameReviewType;
  cursor: string | null;
}

interface Batch {
  cursor: string | null;
  threads: ReactNode;
}

export function MoreReviews({
  gameId,
  type,
  cursor: firstCursor,
}: MoreReviewsProps) {
  const t = useTranslations("gameReviews");
  const [batches, setBatches] = useState<Batch[]>([]);
  const [cursor, setCursor] = useState(firstCursor);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  // A deploy renames the action, so a tab opened before it loads more only after a reload
  const [isOutdated, setIsOutdated] = useState(false);
  const retry = useActionPhase();

  const load = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const page = await loadMoreReviews(gameId, cursor, type);
      setBatches((current) => [...current, { cursor, threads: page.threads }]);
      // A repeated cursor would re-arm the sentinel after every load
      setHasMore(page.nextCursor !== null && page.nextCursor !== cursor);
      setCursor(page.nextCursor);
      setFailed(false);
      return true;
    } catch (error) {
      setIsOutdated(unstable_isUnrecognizedActionError(error));
      setFailed(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // The button stays up while its check mark plays, when a click must not load again
  const handleRetry = () => {
    if (isOutdated) {
      window.location.reload();
    } else if (failed && !retry.isPending) {
      void retry.run(load, { isSuccess: (loaded) => loaded });
    }
  };
  const showError = retry.isBusy || (failed && !isLoading);
  const attachSentinel = useInfiniteScrollSentinel({
    hasNextPage: hasMore,
    isBusy: isLoading,
    fetchNextPage: () => void load(),
  });

  return (
    <>
      {batches.map((batch) => (
        <Fragment key={batch.cursor ?? ""}>{batch.threads}</Fragment>
      ))}
      {/* A failed page stays in view, so the sentinel waits for the manual retry instead of looping */}
      {hasMore && !showError && (
        <div ref={attachSentinel} className="review-sentinel" aria-hidden />
      )}
      {isLoading && !retry.isBusy && (
        <div className="review-list-state">
          <div className="spinner spinner-small" />
        </div>
      )}
      {showError && (
        <div className="review-list-state">
          <p>
            {t(
              firstCursor === null && batches.length === 0
                ? "loadFailed"
                : "loadMoreFailed"
            )}
          </p>
          <button
            type="button"
            className="btn glass-bg"
            onClick={handleRetry}
            aria-busy={retry.isPending}
          >
            <ActionIcon phase={retry.phase} icon={faRotate} />
            {t("retry")}
          </button>
        </div>
      )}
    </>
  );
}
