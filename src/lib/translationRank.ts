import type { Game } from "./types";

type RankedTranslation = Pick<
  Game,
  "id" | "ai" | "likes" | "downloads" | "reviews" | "translation_progress"
>;

const PRIOR_DOWNLOADS = 70;
const PRIOR_LIKE_RATE = 0.1;

export const isManualTranslation = (translation: Pick<Game, "ai">) =>
  translation.ai === null;

function quality(ai: string | null): number {
  if (ai === null) {
    return 1;
  }
  return ai === "edited" ? 0.8 : 0.55;
}

const counter = (value: number | null) => Math.max(value ?? 0, 0);

// Same formula as lbk-admin's translation_rating() and the launcher's, so all three order translations alike
export function translationRating(translation: RankedTranslation): number {
  const likes = counter(translation.likes);
  const downloads = counter(translation.downloads);
  const reviews = counter(translation.reviews);
  return (
    (0.45 * (likes + PRIOR_DOWNLOADS * PRIOR_LIKE_RATE)) /
      (downloads + PRIOR_DOWNLOADS) +
    0.25 * quality(translation.ai) +
    0.2 * Math.log10(downloads + 1) +
    0.1 * Math.log10(reviews + 1)
  );
}

export function byTranslationRank(
  a: RankedTranslation,
  b: RankedTranslation
): number {
  if (isManualTranslation(a) !== isManualTranslation(b)) {
    return isManualTranslation(a) ? -1 : 1;
  }
  const rating = translationRating(b) - translationRating(a);
  if (rating !== 0) {
    return rating;
  }
  const progress = b.translation_progress - a.translation_progress;
  if (progress !== 0) {
    return progress;
  }
  if (a.id === b.id) {
    return 0;
  }
  return a.id < b.id ? -1 : 1;
}
