import { describe, expect, it } from "vitest";
import {
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
        "x-default": "https://lbklauncher.com/games",
      },
    });
  });
});

describe("openGraphLocale", () => {
  it.each([
    ["uk", "uk_UA"],
    ["en", "en_US"],
    ["be", "be_BY"],
  ] as const)("%s -> %s", (locale, expected) => {
    expect(openGraphLocale(locale)).toBe(expected);
  });
});
