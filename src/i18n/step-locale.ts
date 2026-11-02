import { type Locale, routing } from "./routing";

export function stepLocale(current: Locale, step: 1 | -1): Locale {
  const { locales } = routing;
  const index = locales.indexOf(current);
  return locales[(index + step + locales.length) % locales.length];
}
