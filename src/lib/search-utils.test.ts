import { describe, expect, it } from "vitest";
import { buildFtsQueries, getTranslitVariant } from "./search-utils";

function translitOf(input: string): string {
  return getTranslitVariant(input) ?? "";
}

describe("buildFtsQueries", () => {
  it("tries the number first, then the query without it", () => {
    const translit = translitOf("gta");
    expect(buildFtsQueries("gta 5")).toEqual([
      `('gta':* & '5':*) | ('${translit}':* & '5':*)`,
      `('gta':*) | ('${translit}':*)`,
    ]);
  });

  it("keeps the number in a Cyrillic query and its transliteration", () => {
    const cyrillic = translitOf("vidmak 3");
    const [withNumber, withoutNumber] = buildFtsQueries(cyrillic);
    expect(withNumber).toContain("'vidmak':* & '3':*");
    expect(withoutNumber).toContain("('vidmak':*)");
    expect(withoutNumber).not.toContain("'3'");
  });

  it("never builds a lone number from one-letter words", () => {
    expect(buildFtsQueries("s.t.a.l.k.e.r. 2")).toEqual([]);
    expect(buildFtsQueries("x 2")).toEqual([]);
  });

  it("builds one query when there is no single-digit number", () => {
    const translit = translitOf("witcher");
    expect(buildFtsQueries("witcher")).toEqual([
      `('witcher':*) | ('${translit}':*)`,
    ]);
    expect(buildFtsQueries("cyberpunk 2077")).toHaveLength(1);
    expect(buildFtsQueries("2077")).toEqual(["('2077':*)"]);
  });

  it("returns nothing for an empty query", () => {
    expect(buildFtsQueries("")).toEqual([]);
  });
});
