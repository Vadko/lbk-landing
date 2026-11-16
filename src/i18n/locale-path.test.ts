import { describe, expect, it } from "vitest";
import { localizedPath, splitLocale } from "./locale-path";

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
    ["/gone", "uk", "/gone"],
    ["/", "en", "/en"],
    ["/gone", "en", "/en/gone"],
    ["/maintenance", "pl", "/pl/maintenance"],
  ] as const)("%s in %s -> %s", (path, locale, expected) => {
    expect(localizedPath(path, locale)).toBe(expected);
  });
});
