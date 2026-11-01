import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";
import { CAPTCHA_PAGE_SCRIPT } from "./page-script";

interface FakeElement {
  tagName: string;
  src?: string;
  onload?: () => void;
  onerror?: () => void;
  removed: boolean;
  remove: () => void;
}

interface RenderOptions {
  sitekey: string;
  action: string;
  cData: string;
  retry: string;
  callback: (token: string) => void;
  "error-callback": (code: string) => unknown;
  "timeout-callback": () => void;
  "unsupported-callback": () => void;
}

type Render = (container: FakeElement, options: RenderOptions) => unknown;

interface CaptchaApi {
  solve: (action: string, cData: string) => Promise<unknown>;
}

function loadPage() {
  const appended: FakeElement[] = [];
  const timers: Array<() => void> = [];
  const turnstile = {
    render: vi.fn<Render>(() => "widget-1"),
    remove: vi.fn(),
  };
  const window: { lbkCaptcha?: CaptchaApi; turnstile?: unknown } = {};
  const createElement = (tagName: string): FakeElement => {
    const element: FakeElement = {
      tagName,
      removed: false,
      remove: () => {
        element.removed = true;
      },
    };
    return element;
  };
  const append = (element: FakeElement) => {
    appended.push(element);
  };
  runInNewContext(CAPTCHA_PAGE_SCRIPT, {
    window,
    document: {
      documentElement: { dataset: { sitekey: "site-key" } },
      createElement,
      head: { appendChild: append },
      body: { appendChild: append },
    },
    setTimeout: (callback: () => void) => {
      timers.push(callback);
    },
  });

  const apiScript = () => {
    const script = appended.find((element) => element.tagName === "script");
    if (!script) {
      throw new Error("api.js was not requested");
    }
    return script;
  };
  const loadApi = () => {
    window.turnstile = turnstile;
    apiScript().onload?.();
  };
  const solve = (action = "review", cData = "a1b2c3") => {
    if (!window.lbkCaptcha) {
      throw new Error("the page did not expose lbkCaptcha");
    }
    return window.lbkCaptcha.solve(action, cData);
  };
  // The call reaches render only after awaiting api.js
  const rendered = async (call = 0) => {
    await vi.waitFor(() => {
      expect(turnstile.render).toHaveBeenCalledTimes(call + 1);
    });
    const options = turnstile.render.mock.calls[call]?.[1];
    if (!options) {
      throw new Error(`render call ${call} did not happen`);
    }
    return options;
  };
  const containers = () =>
    appended.filter((element) => element.tagName === "div");
  const flushTimers = () => {
    for (const callback of timers.splice(0)) {
      callback();
    }
  };

  return {
    turnstile,
    apiScript,
    loadApi,
    solve,
    rendered,
    containers,
    flushTimers,
  };
}

describe("captcha page script", () => {
  it("loads Turnstile for explicit rendering as the page loads", () => {
    const page = loadPage();

    expect(page.apiScript().src).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
    );
  });

  it("renders a fresh widget per call and resolves with its token", async () => {
    const page = loadPage();
    page.loadApi();

    const answer = page.solve();
    const options = await page.rendered();
    expect(options).toMatchObject({
      sitekey: "site-key",
      action: "review",
      cData: "a1b2c3",
      retry: "never",
      "refresh-expired": "never",
      "response-field": false,
    });
    options.callback("token-1");

    await expect(answer).resolves.toEqual({ token: "token-1" });
    expect(page.turnstile.remove).not.toHaveBeenCalled();
    page.flushTimers();
    expect(page.turnstile.remove).toHaveBeenCalledWith("widget-1");
    expect(page.containers()[0]?.removed).toBe(true);
  });

  it("answers once with the Turnstile error code and marks it handled", async () => {
    const page = loadPage();
    page.loadApi();

    const answer = page.solve();
    const options = await page.rendered();

    expect(options["error-callback"]("300030")).toBe(true);
    options["error-callback"]("300031");
    options.callback("late-token");

    await expect(answer).resolves.toEqual({ error: "300030" });
  });

  it("answers a timed-out or unsupported challenge", async () => {
    const page = loadPage();
    page.loadApi();

    const timedOut = page.solve();
    (await page.rendered(0))["timeout-callback"]();
    const unsupported = page.solve();
    (await page.rendered(1))["unsupported-callback"]();

    await expect(timedOut).resolves.toEqual({ error: "timeout" });
    await expect(unsupported).resolves.toEqual({ error: "unsupported" });
  });

  it("answers render_failed when Turnstile cannot render the widget", async () => {
    const page = loadPage();
    page.loadApi();
    page.turnstile.render.mockImplementationOnce(() => {
      throw new Error("bad sitekey");
    });
    page.turnstile.render.mockImplementationOnce(() => undefined);

    await expect(page.solve()).resolves.toEqual({ error: "render_failed" });
    await expect(page.solve()).resolves.toEqual({ error: "render_failed" });
    page.flushTimers();
    expect(page.turnstile.remove).not.toHaveBeenCalled();
  });

  it("waits for Turnstile when called before it loads", async () => {
    const page = loadPage();

    const answer = page.solve();
    await Promise.resolve();
    expect(page.turnstile.render).not.toHaveBeenCalled();
    page.loadApi();
    (await page.rendered()).callback("token-1");

    await expect(answer).resolves.toEqual({ token: "token-1" });
  });

  it("answers script_error before and after api.js fails to load", async () => {
    const page = loadPage();

    const early = page.solve();
    page.apiScript().onerror?.();

    await expect(early).resolves.toEqual({ error: "script_error" });
    await expect(page.solve()).resolves.toEqual({ error: "script_error" });
    expect(page.turnstile.render).not.toHaveBeenCalled();
  });

  it("treats api.js without a turnstile global as a failed load", async () => {
    const page = loadPage();

    page.apiScript().onload?.();

    await expect(page.solve()).resolves.toEqual({ error: "script_error" });
  });
});
