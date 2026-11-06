"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { type BranchLevel, ReviewThreadRow } from "./ReviewThreadRow";

interface ReviewRepliesToggleProps {
  level: BranchLevel;
  hiddenCount: number;
  // The rows past the first few, rendered on the server
  children: ReactNode;
}

export function ReviewRepliesToggle({
  level,
  hiddenCount,
  children,
}: ReviewRepliesToggleProps) {
  const t = useTranslations("gameReviews");
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded && (
        <div className="review-reveal">
          <div>{children}</div>
        </div>
      )}
      <ReviewThreadRow level={level} isLast isToggle>
        <button
          type="button"
          className="review-replies-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <SvgIcon icon={expanded ? faChevronUp : faChevronDown} />
          {expanded
            ? t("hideReplies")
            : t("showMoreReplies", { count: hiddenCount })}
        </button>
      </ReviewThreadRow>
    </>
  );
}
