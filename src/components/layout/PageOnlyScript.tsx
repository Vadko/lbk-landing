"use client";

const PAGE_ONLY_SCRIPT = `if (new URLSearchParams(location.search).get("page") === "only") document.documentElement.dataset.pageOnly = "";`;

// Marks ?page=only before first paint so the embed never flashes the chrome; text/plain on the client, where React only warns
export function PageOnlyScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: PAGE_ONLY_SCRIPT }}
    />
  );
}
