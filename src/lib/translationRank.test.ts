import { describe, expect, it } from "vitest";
import { byTranslationRank, translationRating } from "./translationRank";

interface Counters {
  likes: number;
  downloads: number | null;
  reviews: number;
  ai: string | null;
}

function translation(
  id: string,
  counters: Partial<Counters> = {},
  translation_progress = 100
) {
  return {
    id,
    likes: 0,
    downloads: 0,
    reviews: 0,
    ai: null,
    translation_progress,
    ...counters,
  };
}

describe("translationRating", () => {
  it.each([
    [
      "a new manual translation",
      { likes: 0, downloads: 0, reviews: 0, ai: null },
      0.295,
    ],
    [
      "a popular manual translation",
      { likes: 50, downloads: 1000, reviews: 5, ai: null },
      0.951874,
    ],
    [
      "an AI translation a human edited",
      { likes: 50, downloads: 1000, reviews: 5, ai: "edited" },
      0.901874,
    ],
    [
      "a raw AI translation",
      { likes: 50, downloads: 1000, reviews: 5, ai: "non-edited" },
      0.839374,
    ],
    [
      "an unknown AI kind, as raw AI",
      { likes: 50, downloads: 1000, reviews: 5, ai: "future-kind" },
      0.839374,
    ],
    [
      "NULL downloads, as 0",
      { likes: 0, downloads: null, reviews: 0, ai: null },
      0.295,
    ],
    [
      "negative counters, as 0",
      { likes: -3, downloads: -80, reviews: -1, ai: null },
      0.295,
    ],
  ])("rates %s", (_label, counters: Counters, expected) => {
    expect(translationRating(translation("t", counters))).toBeCloseTo(
      expected,
      6
    );
  });
});

describe("byTranslationRank", () => {
  it("lists manual translations first, then AI ones, each by rating", () => {
    const ranked = [
      translation("manual-low", { downloads: 5 }),
      translation("ai-top", {
        ai: "edited",
        likes: 900,
        downloads: 20000,
        reviews: 300,
      }),
      translation(
        "manual-high",
        { likes: 40, downloads: 600, reviews: 12 },
        60
      ),
      translation("ai-raw", { ai: "non-edited", likes: 3, downloads: 90 }),
    ].sort(byTranslationRank);

    expect(ranked.map((item) => item.id)).toEqual([
      "manual-high",
      "manual-low",
      "ai-top",
      "ai-raw",
    ]);
  });

  it.each([
    [
      "the higher translation progress",
      translation("b", {}, 90),
      translation("a", {}, 40),
      ["b", "a"],
    ],
    ["the id", translation("b"), translation("a"), ["a", "b"]],
  ])("breaks an equal rating by %s", (_label, first, second, expected) => {
    expect(
      [first, second].sort(byTranslationRank).map((item) => item.id)
    ).toEqual(expected);
  });
});
