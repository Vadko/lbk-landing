import type { Database } from "./database.types";

export type Game = Database["public"]["Tables"]["games"]["Row"];

export type GameStatus = Database["public"]["Enums"]["game_status"];

export type GameListItem = Pick<
  Game,
  | "id"
  | "name"
  | "slug"
  | "status"
  | "thumbnail_path"
  | "translation_progress"
  | "team"
  | "banner_path"
>;

export interface GamesResponse {
  games: GameListItem[];
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
