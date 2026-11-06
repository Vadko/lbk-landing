"use client";

import { useTranslations } from "next-intl";
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
  const label = useClientValue(
    () => relativeReviewDate(t, iso, new Date()),
    absoluteReviewDate(iso)
  );
  return <time dateTime={iso}>{label}</time>;
}
