import { type Locale, routing } from "./routing";

// The proxy bundle resolves next-intl under react-server, where its entries pull in request.ts and next/root-params, so this module stays dependency-free
function isLocale(value: string | undefined): value is Locale {
  return routing.locales.some((locale) => locale === value);
}

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
