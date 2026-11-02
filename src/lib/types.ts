import type { Database } from "./database.types";

export type Platform = Database["public"]["Enums"]["install_source"];

export type Game = Database["public"]["Tables"]["games"]["Row"];

/** Steam installs a Workshop translation itself — it has its own instructions and its own FAQ. */
export const isWorkshopTranslation = (game: Pick<Game, "kind">) =>
  game.kind === "workshop";

// Translation item for grouped games
export type TranslationItem = Pick<
  Game,
  | "id"
  | "team"
  | "status"
  | "translation_progress"
  | "editing_progress"
  | "version"
  | "banner_path"
  | "updated_at"
  | "translation_updated_at"
  | "achievements_archive_path"
  | "ai"
  | "kind"
>;

// Grouped game with multiple translations
export interface GameGroup {
  slug: string;
  name: string;
  banner_path: string | null;
  capsule_path: string | null;
  is_adult: boolean;
  has_voice: boolean;
  updated_at: string;
  translations: TranslationItem[];
}

export interface GamesGroupedResponse {
  games: GameGroup[];
  total: number;
  hasMore: boolean;
  nextOffset: number;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  assets: {
    name: string;
    browser_download_url: string;
    download_count: number;
  }[];
}

export interface GameReviewAuthor {
  role: Database["public"]["Enums"]["review_author_role"];
  // A player's nickname or the translation's team; staff stay unnamed
  name: string | null;
  avatarSeed: string | null;
}

interface GameReviewEntry {
  id: string;
  text: string;
  createdAt: string;
  editedAt: string | null;
  author: GameReviewAuthor;
}

export interface GameReviewReply extends GameReviewEntry {
  // The reply this one answers; null when it answers the review itself
  parentId: string | null;
}

// The server keeps a removed reply as a stub only while a visible reply hangs under it
export interface GameReviewRemovedReply {
  id: string;
  parentId: string | null;
  createdAt: string;
  removed: true;
}

export type GameReviewThreadReply = GameReviewReply | GameReviewRemovedReply;

export type GameReviewType = Database["public"]["Enums"]["feedback_type"];

export interface GameReview extends GameReviewEntry {
  type: GameReviewType;
  // Signed URLs that expire six hours after the page was fetched
  screenshots: string[];
  replies: GameReviewThreadReply[];
}

export interface GameReviewsPage {
  items: GameReview[];
  nextCursor: string | null;
}
