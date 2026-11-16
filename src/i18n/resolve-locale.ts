import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { type Locale, routing } from "./routing";

export interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export async function resolveLocale(
  params: LocaleParams["params"]
): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return locale;
}
