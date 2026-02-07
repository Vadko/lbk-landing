import { sendGAEvent } from "@next/third-parties/google";

export function trackFileDownload(url: string) {
  try {
    const pathname = new URL(url).pathname;
    const fileName = pathname.split("/").pop() || url;
    const ext = fileName.includes(".") ? `.${fileName.split(".").pop()}` : "";
    sendGAEvent("event", "file_download", {
      file_name: fileName,
      file_extension: ext,
    });
  } catch {
    sendGAEvent("event", "file_download", {
      file_name: url,
      file_extension: "",
    });
  }
}

export function trackShareLinkCopied(gameTitle: string) {
  sendGAEvent("event", "share_link_copied", { game_title: gameTitle });
}

export function trackViewGamesCatalog() {
  sendGAEvent("event", "view_games_catalog");
}

export function trackViewHomepage() {
  sendGAEvent("event", "view_homepage");
}

export function trackViewTranslatorsPage() {
  sendGAEvent("event", "view_translators_page");
}

export function trackViewGameDetails(gameName: string) {
  sendGAEvent("event", "view_game_details", { game_name: gameName });
}

export function trackViewSearchResults(
  searchTerm: string,
  resultsCount: number
) {
  sendGAEvent("event", "view_search_results", {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}
