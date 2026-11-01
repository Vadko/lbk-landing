import type { Messages } from "next-intl";

// Featured translations to highlight in the UI with trophy badge
interface FeaturedTranslation {
  id: keyof Messages["featuredBadge"];
  gameSlug: string;
  team?: string; // If specified, only this team's translation is featured
  year: number;
}

const FEATURED_TRANSLATIONS: FeaturedTranslation[] = [
  {
    id: "persona4Golden",
    gameSlug: "persona_4_golden",
    year: 2026,
  },
  {
    id: "dispatch",
    gameSlug: "dispatch",
    year: 2025,
  },
];

// Get featured info for a game/translation
export const getFeaturedInfo = (
  gameSlug: string,
  team?: string
): FeaturedTranslation | null => {
  return (
    FEATURED_TRANSLATIONS.find(
      (t) =>
        t.gameSlug === gameSlug && (t.team === undefined || t.team === team)
    ) || null
  );
};
