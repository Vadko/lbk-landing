/* eslint-disable no-restricted-syntax -- keyboard-layout query forms are Cyrillic */
import { describe, expect, it } from "vitest";
import { buildFtsQueries, getTranslitVariant } from "./search-utils";

function translitOf(input: string): string {
  return getTranslitVariant(input) ?? "";
}

describe("buildFtsQueries", () => {
  it("tries the number first, then the query without it", () => {
    const translit = translitOf("gta");
    const [withNumber, withoutNumber] = buildFtsQueries("gta 5");
    expect(withNumber).toContain(
      `('gta':* & '5':*) | ('${translit}':* & '5':*)`
    );
    expect(withoutNumber).toContain(`('gta':*) | ('${translit}':*)`);
    expect(withoutNumber).not.toContain("'5'");
  });

  it("keeps the number in a Cyrillic query and its transliteration", () => {
    const cyrillic = translitOf("vidmak 3");
    const [withNumber, withoutNumber] = buildFtsQueries(cyrillic);
    expect(withNumber).toContain("'vidmak':* & '3':*");
    expect(withoutNumber).toContain("('vidmak':*)");
    expect(withoutNumber).not.toContain("'3'");
  });

  it("tries the other keyboard layout last", () => {
    expect(buildFtsQueries("цфк").at(-1)).toBe("('war':*)");
    expect(buildFtsQueries("Dslmvfr").at(-1)).toBe("('відьмак':*)");
  });

  it.each([
    "s.t.a.l.k.e.r. 2",
    "x 2",
  ])("never turns %s into a lone number", (input) => {
    expect(buildFtsQueries(input).join(" ")).not.toContain("('2':*)");
  });

  it("never drops a number that is a word of its own", () => {
    expect(buildFtsQueries("2077")).toEqual(["('2077':*)"]);
    for (const query of buildFtsQueries("cyberpunk 2077")) {
      expect(query).toContain("'2077':*");
    }
  });

  it("returns nothing for an empty query", () => {
    expect(buildFtsQueries("")).toEqual([]);
  });
});
