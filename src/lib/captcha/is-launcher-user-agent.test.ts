import { describe, expect, it } from "vitest";
import { isLauncherUserAgent } from "./is-launcher-user-agent";

const LAUNCHER =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) lbk-launcher/2.23.1 Chrome/152.0.7977.130 Electron/44.5.1 Safari/537.36";
const UNNAMED_ELECTRON =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.7977.130 Electron/44.5.1 Safari/537.36";
const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";

describe("isLauncherUserAgent", () => {
  it("accepts the launcher's Electron window", () => {
    expect(isLauncherUserAgent(LAUNCHER)).toBe(true);
    expect(isLauncherUserAgent(UNNAMED_ELECTRON)).toBe(true);
  });

  it("refuses a browser and a request without a User-Agent", () => {
    expect(isLauncherUserAgent(CHROME)).toBe(false);
    expect(isLauncherUserAgent("")).toBe(false);
    expect(isLauncherUserAgent(null)).toBe(false);
  });
});
