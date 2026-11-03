import type { GameReviewAuthor, GameReviewThreadReply } from "@/lib/types";

// A branch shows this many replies until it is expanded
export const VISIBLE_REPLIES = 3;

export interface ReplyNode {
  reply: GameReviewThreadReply;
  // Set when the answered entry sits on the last level, so this one is shown beside it
  replyTo: GameReviewAuthor | null;
  depth: number;
  children: ReplyNode[];
}

const byTime = (a: ReplyNode, b: ReplyNode) =>
  Date.parse(a.reply.createdAt) - Date.parse(b.reply.createdAt);

// A removed parent has no author left to name
const authorOf = (reply: GameReviewThreadReply) =>
  "removed" in reply ? null : reply.author;

export function buildReplyTree(
  reviewId: string,
  replies: GameReviewThreadReply[],
  maxDepth: number
): ReplyNode[] {
  const ids = new Set(replies.map((reply) => reply.id));
  const answers = new Map<string, GameReviewThreadReply[]>();
  for (const reply of replies) {
    // A reply whose parent was removed or is not loaded falls back to the first level
    const parentId =
      reply.parentId !== null && ids.has(reply.parentId)
        ? reply.parentId
        : reviewId;
    answers.set(parentId, [...(answers.get(parentId) ?? []), reply]);
  }

  const level = (
    parentId: string,
    depth: number,
    replyTo: GameReviewAuthor | null
  ): ReplyNode[] =>
    (answers.get(parentId) ?? [])
      .flatMap((reply) => {
        if (depth < maxDepth) {
          const children = level(reply.id, depth + 1, null);
          return [{ reply, replyTo, depth, children }];
        }
        // Answers to an entry on the last level sit beside it
        const beside = level(reply.id, depth, authorOf(reply));
        return [{ reply, replyTo, depth, children: [] }, ...beside];
      })
      .sort(byTime);

  return level(reviewId, 1, null);
}

export function countReplies(nodes: ReplyNode[]): number {
  return nodes.reduce((sum, node) => sum + 1 + countReplies(node.children), 0);
}
