import {
  countReplies,
  type ReplyNode,
  VISIBLE_REPLIES,
} from "@/lib/reviews/reply-tree";
import { ReviewEntry } from "./ReviewEntry";
import { ReviewRemovedEntry } from "./ReviewRemovedEntry";
import { ReviewRepliesToggle } from "./ReviewRepliesToggle";
import { type BranchLevel, ReviewThreadRow } from "./ReviewThreadRow";

interface ReviewReplyBranchProps {
  level: BranchLevel;
  nodes: ReplyNode[];
}

export function ReviewReplyBranch({ level, nodes }: ReviewReplyBranchProps) {
  const hasToggle = nodes.length > VISIBLE_REPLIES;
  const rows = nodes.map(({ reply, replyTo, children }, index) => (
    <ReviewThreadRow
      key={reply.id}
      level={level}
      isLast={!hasToggle && index === nodes.length - 1}
    >
      {"removed" in reply ? (
        <ReviewRemovedEntry id={reply.id} />
      ) : (
        <ReviewEntry
          entry={reply}
          isRoot={false}
          hasThreadLine={children.length > 0}
          isBug={false}
          replyTo={replyTo}
          images={[]}
        />
      )}
      <ReviewReplyBranch level="reply" nodes={children} />
    </ReviewThreadRow>
  ));

  if (!hasToggle) {
    return rows;
  }
  return (
    <>
      {rows.slice(0, VISIBLE_REPLIES)}
      <ReviewRepliesToggle
        level={level}
        hiddenCount={countReplies(nodes.slice(VISIBLE_REPLIES))}
      >
        {rows.slice(VISIBLE_REPLIES)}
      </ReviewRepliesToggle>
    </>
  );
}
