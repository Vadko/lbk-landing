import { getPathname } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";

const SITE_URL = "https://lbklauncher.com";

const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  uk: "uk_UA",
  en: "en_US",
  be: "be_BY",
  pl: "pl_PL",
};

export function openGraphLocale(locale: Locale): string {
  return OPEN_GRAPH_LOCALES[locale];
}

export function localizedUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${getPathname({ href: path, locale })}`;
}

export function localizedAlternates(path: string, locale: Locale) {
  return {
    canonical: localizedUrl(path, locale),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((entry) => [entry, localizedUrl(path, entry)])
      ),
      "x-default": localizedUrl(path, routing.defaultLocale),
    },
  };
}

// A game's description, the bulk of its page, is stored in Ukrainian only, so every locale's copy names the uk page as canonical and none claims hreflang
export function gameAlternates(path: string) {
  return { canonical: localizedUrl(path, routing.defaultLocale) };
}
