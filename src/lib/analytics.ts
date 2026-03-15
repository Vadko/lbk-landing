declare global {
  interface Window {
    zaraz?: {
      track: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.zaraz) {
    window.zaraz.track(eventName, params);
  }
}

export function trackFileDownload(url: string) {
  try {
    const pathname = new URL(url).pathname;
    const fileName = pathname.split("/").pop() || url;
    const ext = fileName.includes(".") ? `.${fileName.split(".").pop()}` : "";
    track("file_download", { file_name: fileName, file_extension: ext });
  } catch {
    track("file_download", { file_name: url, file_extension: "" });
  }
}

export function trackShareLinkCopied(gameTitle: string) {
  track("share_link_copied", { game_title: gameTitle });
}

export function trackViewGamesCatalog() {
  track("view_games_catalog");
}

export function trackViewHomepage() {
  track("view_homepage");
}

export function trackViewTranslatorsPage() {
  track("view_translators_page");
}

export function trackViewGameDetails(gameName: string) {
  track("view_game_details", { game_name: gameName });
}

export function trackViewSearchResults(
  searchTerm: string,
  resultsCount: number
) {
  track("view_search_results", {
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
    }).catch(() => {});
  } catch {
    // Never throw from analytics
  }
}
