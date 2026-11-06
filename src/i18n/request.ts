import { locale as rootLocale } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { be } from "./be";
import { en } from "./en";
import { isLocale, type Locale, routing } from "./routing";
import { type Messages, uk } from "./uk";

const dictionaries: Record<Locale, Messages> = { uk, en, be };

export default getRequestConfig(async ({ locale: override }) => {
  const requested = override ?? (await rootLocale());
  const locale = isLocale(requested) ? requested : routing.defaultLocale;
  return {
    locale,
    timeZone: "Europe/Kyiv",
    // en and be share uk's keys and ICU arguments (dictionaries.test.ts), only the literal texts differ
    messages: dictionaries[locale] as typeof uk,
  };
});
