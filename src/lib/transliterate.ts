import CyrillicToTranslit from "cyrillic-to-translit-js";

const translitUk = CyrillicToTranslit({ preset: "uk" });

export function teamToSlug(team: string): string {
  return translitUk
    .transform(team)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
