import { describe, expect, it } from "vitest";
import { parseGamePath } from "./game-path";

describe("parseGamePath", () => {
  it.each([
    [
      "/games/portal",
      { locale: "uk", section: "games", slug: "portal", teamSlug: null },
    ],
    [
      "/games/portal/",
      { locale: "uk", section: "games", slug: "portal", teamSlug: null },
    ],
    [
      "/games/portal/team-a",
      { locale: "uk", section: "games", slug: "portal", teamSlug: "team-a" },
    ],
    [
      "/en/games/portal",
      { locale: "en", section: "games", slug: "portal", teamSlug: null },
    ],
    [
      "/be/games/portal/team-a",
      { locale: "be", section: "games", slug: "portal", teamSlug: "team-a" },
    ],
    [
      "/games/caf%C3%A9",
      { locale: "uk", section: "games", slug: "café", teamSlug: null },
    ],
    [
      "/games/en",
      { locale: "uk", section: "games", slug: "en", teamSlug: null },
    ],
    [
      "/games/be/en",
      { locale: "uk", section: "games", slug: "be", teamSlug: "en" },
    ],
    [
      "/open/portal/team-a",
      { locale: "uk", section: "open", slug: "portal", teamSlug: "team-a" },
    ],
    [
      "/en/open/portal/team-a",
      { locale: "en", section: "open", slug: "portal", teamSlug: "team-a" },
    ],
  ])("%s", (pathname, expected) => {
    expect(parseGamePath(pathname)).toEqual(expected);
  });

  it.each([
    ["/"],
    ["/games"],
    ["/en"],
    ["/en/games"],
    ["/games/a/b/c"],
    ["/open/a"],
    ["/open/a/b/c"],
    ["/games/%E0%A4%A"],
    ["/en/games/x/%ZZ"],
  ])("%s is not a game path", (pathname) => {
    expect(parseGamePath(pathname)).toBeNull();
  });
});
