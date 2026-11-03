"use client";

import { useCallback, useEffect, useRef } from "react";

interface InfiniteScrollOptions {
  hasNextPage: boolean;
  // Holds the sentinel, which looks again once this turns false
  isBusy: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScrollSentinel({
  hasNextPage,
  isBusy,
  fetchNextPage,
}: InfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const attachSentinel = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      if (!node) {
        return;
      }
      // The next page starts loading about a screen before the list ends
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasNextPage && !isBusy) {
            fetchNextPage();
          }
        },
        { rootMargin: "600px 0px" }
      );
      observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isBusy]
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return attachSentinel;
}
