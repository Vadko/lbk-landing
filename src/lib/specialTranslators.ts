// List of special translators to highlight in the UI
interface SpecialTranslator {
  name: string;
  team?: string;
  descriptionKey: "earlyHelper" | "launcherTeam";
}

const SPECIAL_TRANSLATORS: SpecialTranslator[] = [
  { name: "Владислав", team: "Sent_DeZ", descriptionKey: "earlyHelper" },
  { name: "Вена", team: "Ліниві ШІ", descriptionKey: "earlyHelper" },
  { name: "Євгеній", team: "kurasagi", descriptionKey: "earlyHelper" },
  {
    name: "Костянтин",
    team: "Перекладач Патріотів (KostyanChek8)",
    descriptionKey: "earlyHelper",
  },
  {
    name: "GameGlobe Localization",
    team: "GameGlobe Localization",
    descriptionKey: "launcherTeam",
  },
  { name: "Little Bit", team: "Little Bit", descriptionKey: "launcherTeam" },
];

// Get special translator info for a specific author name
export const getSpecialTranslatorInfo = (
  authorName: string
): SpecialTranslator | null => {
  const authorLower = authorName.toLowerCase().trim();
  return (
    SPECIAL_TRANSLATORS.find(
      (t) =>
        t.name.toLowerCase() === authorLower ||
        (t.team && t.team.toLowerCase() === authorLower)
    ) || null
  );
};
