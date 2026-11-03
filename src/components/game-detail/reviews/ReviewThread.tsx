import { buildReplyTree } from "@/lib/reviews/reply-tree";
import type { GameReview } from "@/lib/types";
import { ReviewEntry } from "./ReviewEntry";
import { ReviewReplyBranch } from "./ReviewReplyBranch";

interface ReviewThreadProps {
  review: GameReview;
}

// Deeper answers stay on the last level and name whom they answer, so the text keeps its width
const MAX_DEPTH = 3;

export function ReviewThread({ review }: ReviewThreadProps) {
  const tree = buildReplyTree(review.id, review.replies, MAX_DEPTH);

  return (
    <div className="review-thread">
      <ReviewEntry
        entry={review}
        isRoot
        hasThreadLine={tree.length > 0}
        isBug={review.type === "error"}
        replyTo={null}
        images={review.screenshots}
      />
      <ReviewReplyBranch level="review" nodes={tree} />
    </div>
  );
}
