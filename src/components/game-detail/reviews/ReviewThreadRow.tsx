import type { ReactNode } from "react";

export type BranchLevel = "review" | "reply";

interface ReviewThreadRowProps {
  level: BranchLevel;
  isLast: boolean;
  isToggle?: boolean;
  children: ReactNode;
}

// The branch hangs from the centre of its parent's avatar, and its corner ends at the centre of the row's avatar or toggle
export function ReviewThreadRow({
  level,
  isLast,
  isToggle = false,
  children,
}: ReviewThreadRowProps) {
  const row = `review-row review-row--${level}${isToggle ? " review-row--toggle" : ""}`;
  return (
    <div className={row}>
      <span
        aria-hidden
        className={`review-line review-row-trunk${isLast ? " is-last" : ""}`}
      />
      <span aria-hidden className="review-line review-row-corner" />
      {children}
    </div>
  );
}
