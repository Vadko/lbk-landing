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

// Anonymous persistent user ID for analytics (no PII)
const ANALYTICS_UID_KEY = "lb_analytics_uid";
function getAnalyticsUid(): string {
  try {
    const existing = localStorage.getItem(ANALYTICS_UID_KEY);
    if (existing) return existing;
    const uid = crypto.randomUUID();
    localStorage.setItem(ANALYTICS_UID_KEY, uid);
    return uid;
  } catch {
    return crypto.randomUUID();
  }
}

export function trackFailedSearch(searchTerm: string) {
  try {
    const trimmed = searchTerm.trim();
    if (trimmed.length < 3) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return;

    // Fire-and-forget: don't await, don't block UI
    fetch(`${supabaseUrl}/functions/v1/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
      },
      body: JSON.stringify({
        type: "failed_search",
        query: trimmed,
        source: "web",
        userIdentifier: getAnalyticsUid(),
      }),
    }).catch(() => {
      // Silently ignore - tracking should never impact UX
    });
  } catch {
    // Never throw from analytics
  }
}
