import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "en", "be", "pl"],
  defaultLocale: "uk",
  localePrefix: "as-needed",
  localeDetection: false,
  alternateLinks: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
