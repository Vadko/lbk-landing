import { describe, expect, it } from "vitest";
import { stepLocale } from "./step-locale";

describe("stepLocale", () => {
  it.each([
    ["uk", 1, "en"],
    ["en", 1, "be"],
    ["be", 1, "uk"],
    ["uk", -1, "be"],
    ["be", -1, "en"],
  ] as const)("%s %i -> %s", (current, step, expected) => {
    expect(stepLocale(current, step)).toBe(expected);
  });
});
