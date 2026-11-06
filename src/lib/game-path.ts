import { splitLocale } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/routing";

interface GamePath {
  locale: Locale;
  slug: string;
  teamSlug: string | null;
}

export function parseGamePath(pathname: string): GamePath | null {
  const { locale, path } = splitLocale(pathname);
  const normalized =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const segments = normalized.split("/").filter(Boolean);

  if (segments[0] !== "games" || segments.length < 2 || segments.length > 3) {
    return null;
  }

  return {
    locale,
    slug: decodeURIComponent(segments[1]),
    teamSlug: segments[2] ? decodeURIComponent(segments[2]) : null,
  };
}
