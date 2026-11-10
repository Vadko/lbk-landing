import { describe, expect, it } from "vitest";
import { catalogOrder, manualFirst } from "./catalogSearchOrder";
import type { GameGroup, TranslationItem } from "./types";

function game(slug: string, ais: (string | null)[]): GameGroup {
  return {
    slug,
    name: slug,
    banner_path: null,
    capsule_path: null,
    is_adult: false,
    has_voice: false,
    updated_at: "2026-01-01T00:00:00Z",
    translations: ais.map(
      (ai, index): TranslationItem => ({
        id: `${slug}-${index}`,
        team: "team",
        status: "completed",
        translation_progress: 100,
        editing_progress: 0,
        version: null,
        banner_path: null,
        updated_at: "2026-01-01T00:00:00Z",
        translation_updated_at: "2026-01-01T00:00:00Z",
        achievements_archive_path: null,
        ai,
        kind: "regular",
      })
    ),
  };
}

const BY_RANK = [
  ["has_manual", { ascending: false }],
  ["rating", { ascending: false, nullsFirst: false }],
  ["slug", { ascending: true }],
];

describe("catalogOrder", () => {
  it.each([
    ["a search under the default sort", undefined, "doom", BY_RANK],
    ["a search under the name sort", "name", "doom", BY_RANK],
    [
      "the unsearched catalog",
      undefined,
      undefined,
      [
        ["name", { ascending: true, nullsFirst: false }],
        ["slug", { ascending: true }],
      ],
    ],
    [
      "a search under an explicit sort",
      "downloads",
      "doom",
      [
        ["downloads", { ascending: false, nullsFirst: false }],
        ["slug", { ascending: true }],
      ],
    ],
  ])("orders %s", (_label, sortBy, search, expected) => {
    expect(catalogOrder(sortBy, search)).toEqual(expected);
  });
});

describe("manualFirst", () => {
  it("moves games with a manual translation first and keeps the order within each part", () => {
    const games = [
      game("ai-best", ["edited"]),
      game("mixed", ["non-edited", null]),
      game("ai-next", ["non-edited"]),
      game("manual", [null]),
    ];

    expect(manualFirst(games).map((item) => item.slug)).toEqual([
      "mixed",
      "manual",
      "ai-best",
      "ai-next",
    ]);
  });
});
