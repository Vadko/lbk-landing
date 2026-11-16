import { describe, expect, it } from "vitest";
import {
  gameAlternates,
  localizedAlternates,
  localizedUrl,
  openGraphLocale,
} from "./localizedAlternates";

describe("localizedUrl", () => {
  it.each([
    ["/", "uk", "https://lbklauncher.com/"],
    ["/", "en", "https://lbklauncher.com/en"],
    ["/games", "uk", "https://lbklauncher.com/games"],
    [
      "/games/portal/team-a",
      "be",
      "https://lbklauncher.com/be/games/portal/team-a",
    ],
    ["/guides&tools", "en", "https://lbklauncher.com/en/guides&tools"],
  ] as const)("%s in %s", (path, locale, expected) => {
    expect(localizedUrl(path, locale)).toBe(expected);
  });
});

describe("localizedAlternates", () => {
  it("points canonical at the current locale and lists every language", () => {
    expect(localizedAlternates("/games", "en")).toEqual({
      canonical: "https://lbklauncher.com/en/games",
      languages: {
        uk: "https://lbklauncher.com/games",
        en: "https://lbklauncher.com/en/games",
        be: "https://lbklauncher.com/be/games",
        pl: "https://lbklauncher.com/pl/games",
        "x-default": "https://lbklauncher.com/games",
      },
    });
  });
});

describe("gameAlternates", () => {
  it("points every locale at the uk page without hreflang", () => {
    expect(gameAlternates("/games/portal/team-a")).toEqual({
      canonical: "https://lbklauncher.com/games/portal/team-a",
    });
  });
});

describe("openGraphLocale", () => {
  it.each([
    ["uk", "uk_UA"],
    ["en", "en_US"],
    ["be", "be_BY"],
    ["pl", "pl_PL"],
  ] as const)("%s -> %s", (locale, expected) => {
    expect(openGraphLocale(locale)).toBe(expected);
  });
});
