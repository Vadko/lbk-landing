import type { Database } from "./database.types";
import type { TranslateTypeBadgeType } from "@/components/ui/TranslateTypeBadge";

export type Platform = Database["public"]["Enums"]["install_source"];

export type Game = Database["public"]["Tables"]["games"]["Row"];

// Translation item for grouped games
export type TranslationItem = Pick<
  Game,
  | "id"
  | "team"
  | "status"
  | "translation_progress"
  | "version"
  | "banner_path"
  | "updated_at"
  | "achievements_archive_path"
> & {
  badge_type?: TranslateTypeBadgeType;
};

// Grouped game with multiple translations
export interface GameGroup {
  slug: string;
  name: string;
  banner_path: string | null;
  thumbnail_path: string | null;
  is_adult: boolean;
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
