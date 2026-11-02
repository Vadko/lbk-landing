import { isLocale, type Locale, routing } from "./routing";

export function splitLocale(pathname: string): {
  locale: Locale;
  path: string;
} {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) {
    return { locale: first, path: `/${rest.join("/")}` };
  }
  return { locale: routing.defaultLocale, path: pathname };
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === routing.defaultLocale) {
    return path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
