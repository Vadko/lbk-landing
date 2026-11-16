import { routing } from "@/i18n/routing";

// Pages are cached under their internal path, which always carries the locale, even for the unprefixed default
export function internalPaths(path: string): string[] {
  return routing.locales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  );
}
