import type { createTranslator, Messages } from "next-intl";

type ReviewsTranslator = ReturnType<
  typeof createTranslator<Messages, "gameReviews">
>;

const TIME_ZONE = "Europe/Kyiv";
const DAY_MS = 86_400_000;

function kyivDay(date: Date): { year: number; start: number } {
  const [year = 0, month = 1, day = 1] = date
    .toLocaleDateString("en-CA", { timeZone: TIME_ZONE })
    .split("-")
    .map(Number);
  return { year, start: Date.UTC(year, month - 1, day) };
}

const timeOf = (date: Date, locale: string) =>
  date.toLocaleTimeString(locale, {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  });

const dayOf = (date: Date, locale: string, withYear: boolean) =>
  date
    .toLocaleDateString(locale, {
      timeZone: TIME_ZONE,
      day: "numeric",
      month: "short",
      ...(withYear && { year: "numeric" }),
    })
    .replace(".", "");

// A cached render cannot know today, so it carries the full date
export function absoluteReviewDate(iso: string, locale: string): string {
  const date = new Date(iso);
  return `${dayOf(date, locale, true)}, ${timeOf(date, locale)}`;
}

export function relativeReviewDate(
  t: ReviewsTranslator,
  iso: string,
  locale: string,
  now: Date
): string {
  const date = new Date(iso);
  const then = kyivDay(date);
  const today = kyivDay(now);
  const daysAgo = Math.round((today.start - then.start) / DAY_MS);
  if (daysAgo === 0) {
    return t("today", { time: timeOf(date, locale) });
  }
  if (daysAgo === 1) {
    return t("yesterday", { time: timeOf(date, locale) });
  }
  return `${dayOf(date, locale, then.year !== today.year)}, ${timeOf(date, locale)}`;
}
