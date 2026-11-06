import { describe, expect, it } from "vitest";
import { localeSwitchHref, localizedPath, splitLocale } from "./locale-path";

describe("splitLocale", () => {
  it.each([
    ["/", "uk", "/"],
    ["/games", "uk", "/games"],
    ["/en", "en", "/"],
    ["/en/", "en", "/"],
    ["/en/games/portal", "en", "/games/portal"],
    ["/be/gone", "be", "/gone"],
    ["/uk/games", "uk", "/games"],
    ["/games/en", "uk", "/games/en"],
    ["/games/be/some-team", "uk", "/games/be/some-team"],
    ["/english", "uk", "/english"],
  ])("%s -> %s %s", (pathname, locale, path) => {
    expect(splitLocale(pathname)).toEqual({ locale, path });
  });
});

describe("localizedPath", () => {
  it.each([
    ["/", "uk", "/"],
    ["/games", "uk", "/games"],
    ["/", "en", "/en"],
    ["/gone", "en", "/en/gone"],
    ["/games/portal", "be", "/be/games/portal"],
    ["/guides&tools", "en", "/en/guides&tools"],
  ] as const)("%s in %s -> %s", (path, locale, expected) => {
    expect(localizedPath(path, locale)).toBe(expected);
  });
});

describe("localeSwitchHref", () => {
  it.each([
    [
      "/games",
      "en",
      "?sort=downloads&voice=1",
      "/en/games?sort=downloads&voice=1",
    ],
    ["/en/games", "uk", "?sort=name", "/games?sort=name"],
    ["/en", "be", "#gallery", "/be#gallery"],
    ["/", "en", "#gallery", "/en#gallery"],
    ["/be", "uk", "#showcase", "/#showcase"],
    ["/games/en", "be", "", "/be/games/en"],
    ["/en/nothing", "be", "", "/be/nothing"],
  ] as const)("%s to %s with %s", (pathname, locale, suffix, expected) => {
    expect(localeSwitchHref(pathname, locale, suffix)).toBe(expected);
  });
});
