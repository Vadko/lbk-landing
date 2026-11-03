import type {
  GameReview,
  GameReviewAuthor,
  GameReviewReply,
} from "@/lib/types";
import { ReviewAvatar } from "./ReviewAvatar";
import { ReviewEntryHeader } from "./ReviewEntryHeader";
import { ReviewImages } from "./ReviewImages";

interface ReviewEntryProps {
  entry: GameReview | GameReviewReply;
  isRoot: boolean;
  hasThreadLine: boolean;
  isBug: boolean;
  replyTo: GameReviewAuthor | null;
  images: string[];
}

export function ReviewEntry({
  entry,
  isRoot,
  hasThreadLine,
  isBug,
  replyTo,
  images,
}: ReviewEntryProps) {
  return (
    <article
      id={`review-${entry.id}`}
      className={`review-entry${isRoot ? " review-entry--root" : ""}`}
    >
      {hasThreadLine && (
        <span aria-hidden className="review-line review-entry-trunk" />
      )}
      <ReviewAvatar author={entry.author} isRoot={isRoot} />
      <div className="review-entry-body">
        <ReviewEntryHeader
          author={entry.author}
          createdAt={entry.createdAt}
          isEdited={entry.editedAt !== null}
          replyTo={replyTo}
          isBug={isBug}
        />
        <p className="review-text">{entry.text}</p>
        <ReviewImages images={images} />
      </div>
    </article>
  );
}
