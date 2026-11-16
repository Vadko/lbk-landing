import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { be } from "./be";
import { en } from "./en";
import { pl } from "./pl";
import { type Locale, routing } from "./routing";
import { type Messages, uk } from "./uk";

const dictionaries: Record<Locale, Messages> = { uk, en, be, pl };

export default getRequestConfig(async ({ locale: override, requestLocale }) => {
  // global-not-found has no root params; there the locale comes from the header next-intl's middleware sets on the request
  const requested = override ?? (await rootLocale()) ?? (await requestLocale);
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  return {
    locale,
    timeZone: "Europe/Kyiv",
    // en, be and pl share uk's keys and ICU arguments (dictionaries.test.ts), only the literal texts differ
    messages: dictionaries[locale] as typeof uk,
  };
});
