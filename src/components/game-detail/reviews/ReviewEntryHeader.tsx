import { faBug } from "@fortawesome/free-solid-svg-icons/faBug";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons/faTurnUp";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";
import type { GameReviewAuthor } from "@/lib/types";
import { ReviewDate } from "./ReviewDate";

interface ReviewEntryHeaderProps {
  author: GameReviewAuthor;
  createdAt: string;
  isEdited: boolean;
  replyTo: GameReviewAuthor | null;
  isBug: boolean;
}

export async function ReviewEntryHeader({
  author,
  createdAt,
  isEdited,
  replyTo,
  isBug,
}: ReviewEntryHeaderProps) {
  const t = await getTranslations("gameReviews");
  // Only staff stay unnamed in a public thread
  const nameOf = (who: GameReviewAuthor) => who.name ?? t("moderator");

  return (
    <div className="review-entry-header">
      <div className="review-entry-meta">
        <span
          className={`review-author${author.role === "player" ? "" : " review-author--team"}`}
        >
          {nameOf(author)}
        </span>
        {author.role === "author" && (
          <span className="review-pill review-pill--main">
            {t("translationAuthor")}
          </span>
        )}
        {replyTo && (
          <span className="review-reply-to">
            <SvgIcon icon={faTurnUp} className="review-reply-to-icon" />
            {nameOf(replyTo)}
          </span>
        )}
        <span className="review-date">
          <ReviewDate iso={createdAt} />
          {isEdited && ` · ${t("edited")}`}
        </span>
      </div>
      {isBug && (
        <span className="review-pill review-pill--accent">
          <SvgIcon icon={faBug} />
          {t("bug")}
        </span>
      )}
    </div>
  );
}
