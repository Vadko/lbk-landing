import { describe, expect, it } from "vitest";
import { catalogOrder } from "./catalogSearchOrder";

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
