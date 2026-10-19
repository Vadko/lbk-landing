import type { Game } from "./types";

export const GAMES_PER_PAGE = 20;

// export const ADMIN_URL = "https://admin.lbklauncher.com/?ref=landing";
export const BOT_URL = "https://t.me/lbk_launcher_bot";

export const STATUS_BADGE_CLASSES: Record<Game["status"], string> = {
  completed: "game-status-badge completed",
  "in-progress": "game-status-badge in-progress",
  planned: "game-status-badge planned",
  "tech-improvement": "game-status-badge tech-improvement",
};
