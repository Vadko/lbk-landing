import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "en", "be"],
  defaultLocale: "uk",
  localePrefix: "as-needed",
  localeDetection: false,
  alternateLinks: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return routing.locales.some((locale) => locale === value);
}
