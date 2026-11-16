import { splitLocale } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/routing";

interface GamePath {
  locale: Locale;
  section: "games" | "open";
  slug: string;
  teamSlug: string | null;
}

export function parseGamePath(pathname: string): GamePath | null {
  const { locale, path } = splitLocale(pathname);
  const normalized =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const segments = normalized.split("/").filter(Boolean);

  const section =
    segments[0] === "games" && segments.length >= 2 && segments.length <= 3
      ? "games"
      : segments[0] === "open" && segments.length === 3
        ? "open"
        : null;
  if (!section) {
    return null;
  }

  try {
    return {
      locale,
      section,
      slug: decodeURIComponent(segments[1]),
      teamSlug: segments[2] ? decodeURIComponent(segments[2]) : null,
    };
  } catch {
    // A malformed escape would otherwise throw a URIError out of the proxy as a 500
    return null;
  }
}
