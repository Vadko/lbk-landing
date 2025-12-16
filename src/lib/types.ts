import type { Database } from "./database.types";

export type Game = Database["public"]["Tables"]["games"]["Row"];

export type GameStatus = Database["public"]["Enums"]["game_status"];

// Translation item for grouped games
export type TranslationItem = Pick<
  Game,
  | "id"
  | "team"
  | "status"
  | "translation_progress"
  | "version"
  | "updated_at"
>;

// Grouped game with multiple translations
export interface GameGroup {
  slug: string;
  name: string;
  banner_path: string | null;
  thumbnail_path: string | null;
  is_adult: boolean;
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
