import { describe, expect, it } from "vitest";
import { parseGamePath } from "./game-path";

describe("parseGamePath", () => {
  it.each([
    ["/games/portal", { locale: "uk", slug: "portal", teamSlug: null }],
    ["/games/portal/", { locale: "uk", slug: "portal", teamSlug: null }],
    [
      "/games/portal/team-a",
      { locale: "uk", slug: "portal", teamSlug: "team-a" },
    ],
    ["/en/games/portal", { locale: "en", slug: "portal", teamSlug: null }],
    [
      "/be/games/portal/team-a",
      { locale: "be", slug: "portal", teamSlug: "team-a" },
    ],
    ["/games/caf%C3%A9", { locale: "uk", slug: "café", teamSlug: null }],
    ["/games/en", { locale: "uk", slug: "en", teamSlug: null }],
    ["/games/be/en", { locale: "uk", slug: "be", teamSlug: "en" }],
  ])("%s", (pathname, expected) => {
    expect(parseGamePath(pathname)).toEqual(expected);
  });

  it.each([
    ["/"],
    ["/games"],
    ["/en"],
    ["/en/games"],
    ["/games/a/b/c"],
    ["/open/a/b"],
    ["/en/open/a/b"],
  ])("%s is not a game path", (pathname) => {
    expect(parseGamePath(pathname)).toBeNull();
  });
});
