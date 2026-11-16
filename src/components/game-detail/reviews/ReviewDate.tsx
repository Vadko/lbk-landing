"use client";

import { useLocale, useTranslations } from "next-intl";
import { useClientValue } from "@/hooks/useClientValue";
import {
  absoluteReviewDate,
  relativeReviewDate,
} from "@/lib/reviews/review-date";

interface ReviewDateProps {
  iso: string;
}

export function ReviewDate({ iso }: ReviewDateProps) {
  const t = useTranslations("gameReviews");
  const locale = useLocale();
  const label = useClientValue(
    () => relativeReviewDate(t, iso, locale, new Date()),
    absoluteReviewDate(iso, locale)
  );
  return <time dateTime={iso}>{label}</time>;
}
