import { describe, expect, it } from "vitest";
import { isUnlocalizedPath } from "./unlocalized-path";

describe("isUnlocalizedPath", () => {
  it.each([
    ["/sitemap.xml", true],
    ["/robots.txt", true],
    ["/monitoring", true],
    ["/monitoring/envelope", true],
    ["/monitoring-tools", false],
    ["/en/sitemap.xml", false],
    ["/games", false],
    ["/", false],
  ])("%s -> %s", (pathname, expected) => {
    expect(isUnlocalizedPath(pathname)).toBe(expected);
  });
});
