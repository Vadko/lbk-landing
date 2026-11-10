import { isManualTranslation } from "./translationRank";
import type { GameGroup } from "./types";

type CatalogOrder = [
  column: string,
  options: { ascending: boolean; nullsFirst?: boolean },
];

export const isNameSort = (
  sortBy?: string
): sortBy is "name" | "" | undefined => !sortBy || sortBy === "name";

// A search under the default name sort lists games with a manual translation first, each part by its rating (as the launcher does)
export function catalogOrder(sortBy?: string, search?: string): CatalogOrder[] {
  const order: CatalogOrder[] =
    search && isNameSort(sortBy)
      ? [
          ["has_manual", { ascending: false }],
          ["rating", { ascending: false, nullsFirst: false }],
        ]
      : [
          [
            sortBy || "name",
            { ascending: isNameSort(sortBy), nullsFirst: false },
          ],
        ];
  return [...order, ["slug", { ascending: true }]];
}

const hasManualTranslation = (game: GameGroup) =>
  game.translations.some(isManualTranslation);

export function manualFirst(games: GameGroup[]): GameGroup[] {
  return [
    ...games.filter(hasManualTranslation),
    ...games.filter((game) => !hasManualTranslation(game)),
  ];
}
