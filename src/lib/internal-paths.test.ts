import { describe, expect, it } from "vitest";
import { internalPaths } from "./internal-paths";

describe("internalPaths", () => {
  it.each([
    ["/games", ["/uk/games", "/en/games", "/be/games"]],
    [
      "/games/portal/team-a",
      [
        "/uk/games/portal/team-a",
        "/en/games/portal/team-a",
        "/be/games/portal/team-a",
      ],
    ],
    [
      "/open/portal/team-a",
      [
        "/uk/open/portal/team-a",
        "/en/open/portal/team-a",
        "/be/open/portal/team-a",
      ],
    ],
    ["/", ["/uk", "/en", "/be"]],
  ])("%s", (path, expected) => {
    expect(internalPaths(path)).toEqual(expected);
  });
});
