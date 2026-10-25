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

interface CaptchaRequest {
  requestId?: unknown;
  action?: unknown;
  cData?: unknown;
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

function loadPage({ withHost = true } = {}) {
  const appended: FakeElement[] = [];
  const timers: Array<() => void> = [];
  const host = {
    ready: vi.fn(),
    unavailable: vi.fn(),
    resolve: vi.fn(),
    reject: vi.fn(),
    onRequest: vi.fn(),
  };
  const turnstile = {
    render: vi.fn<Render>(() => "widget-1"),
    remove: vi.fn(),
  };
  const window: Record<string, unknown> = withHost
    ? { lbkCaptchaHost: host }
    : {};
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
  const send = (request: CaptchaRequest) => {
    const listener = host.onRequest.mock.calls[0]?.[0];
    if (typeof listener !== "function") {
      throw new Error("the page did not subscribe to requests");
    }
    listener(request);
  };
  const renderOptions = (call = 0) => {
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
    host,
    turnstile,
    appended,
    apiScript,
    loadApi,
    send,
    renderOptions,
    containers,
    flushTimers,
  };
}

const REQUEST = { requestId: "req-1", action: "review", cData: "a1b2c3" };

describe("captcha page script", () => {
  it("does nothing in a browser without the launcher's host", () => {
    const page = loadPage({ withHost: false });

    expect(page.appended).toEqual([]);
  });

  it("loads Turnstile for explicit rendering and reports ready", () => {
    const page = loadPage();

    expect(page.apiScript().src).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
    );
    expect(page.host.ready).not.toHaveBeenCalled();

    page.loadApi();

    expect(page.host.ready).toHaveBeenCalledOnce();
  });

  it("reports an unavailable Turnstile when api.js fails to load", () => {
    const page = loadPage();

    page.apiScript().onerror?.();

    expect(page.host.unavailable).toHaveBeenCalledWith("script_error");
    expect(page.host.ready).not.toHaveBeenCalled();
  });

  it("rejects queued and later requests once api.js fails", () => {
    const page = loadPage();
    page.send(REQUEST);

    page.apiScript().onerror?.();
    page.send({ ...REQUEST, requestId: "req-2" });

    expect(page.host.reject).toHaveBeenCalledWith("req-1", "script_error");
    expect(page.host.reject).toHaveBeenCalledWith("req-2", "script_error");
    expect(page.turnstile.render).not.toHaveBeenCalled();
  });

  it("treats api.js without a turnstile global as a failed load", () => {
    const page = loadPage();
    page.send(REQUEST);

    page.apiScript().onload?.();

    expect(page.host.unavailable).toHaveBeenCalledWith("script_error");
    expect(page.host.reject).toHaveBeenCalledWith("req-1", "script_error");
    expect(page.host.ready).not.toHaveBeenCalled();
  });

  it("renders a fresh widget per request and resolves with its token", () => {
    const page = loadPage();
    page.loadApi();

    page.send(REQUEST);

    const options = page.renderOptions();
    expect(options).toMatchObject({
      sitekey: "site-key",
      action: "review",
      cData: "a1b2c3",
      retry: "never",
      "refresh-expired": "never",
      "response-field": false,
    });

    options.callback("token-1");

    expect(page.host.resolve).toHaveBeenCalledWith("req-1", "token-1");
    expect(page.turnstile.remove).not.toHaveBeenCalled();
    page.flushTimers();
    expect(page.turnstile.remove).toHaveBeenCalledWith("widget-1");
    expect(page.containers()[0]?.removed).toBe(true);
  });

  it("rejects once with the Turnstile error code and marks it handled", () => {
    const page = loadPage();
    page.loadApi();
    page.send(REQUEST);
    const options = page.renderOptions();

    expect(options["error-callback"]("300030")).toBe(true);
    options["error-callback"]("300031");
    options.callback("late-token");

    expect(page.host.reject).toHaveBeenCalledOnce();
    expect(page.host.reject).toHaveBeenCalledWith("req-1", "300030");
    expect(page.host.resolve).not.toHaveBeenCalled();
  });

  it("rejects a timed-out or unsupported challenge", () => {
    const page = loadPage();
    page.loadApi();
    page.send(REQUEST);
    page.send({ ...REQUEST, requestId: "req-2" });

    page.renderOptions(0)["timeout-callback"]();
    page.renderOptions(1)["unsupported-callback"]();

    expect(page.host.reject).toHaveBeenCalledWith("req-1", "timeout");
    expect(page.host.reject).toHaveBeenCalledWith("req-2", "unsupported");
  });

  it("rejects when Turnstile cannot render the widget", () => {
    const page = loadPage();
    page.loadApi();
    page.turnstile.render.mockImplementationOnce(() => {
      throw new Error("bad sitekey");
    });
    page.turnstile.render.mockImplementationOnce(() => undefined);

    page.send(REQUEST);
    page.send({ ...REQUEST, requestId: "req-2" });

    expect(page.host.reject).toHaveBeenCalledWith("req-1", "render_failed");
    expect(page.host.reject).toHaveBeenCalledWith("req-2", "render_failed");
    page.flushTimers();
    expect(page.turnstile.remove).not.toHaveBeenCalled();
  });

  it("queues requests that arrive before Turnstile loads", () => {
    const page = loadPage();

    page.send(REQUEST);
    expect(page.turnstile.render).not.toHaveBeenCalled();

    page.loadApi();

    expect(page.renderOptions().action).toBe("review");
  });

  it("rejects a request whose action or cData Turnstile would refuse", () => {
    const page = loadPage();
    page.loadApi();

    page.send({ ...REQUEST, action: "has space" });
    page.send({ ...REQUEST, requestId: "req-2", cData: undefined });
    page.send({ ...REQUEST, requestId: "req-3", action: "a".repeat(33) });

    expect(page.host.reject).toHaveBeenCalledWith("req-1", "invalid_request");
    expect(page.host.reject).toHaveBeenCalledWith("req-2", "invalid_request");
    expect(page.host.reject).toHaveBeenCalledWith("req-3", "invalid_request");
    expect(page.turnstile.render).not.toHaveBeenCalled();
  });

  it("ignores a request it could not answer", () => {
    const page = loadPage();
    page.loadApi();

    page.send({ ...REQUEST, requestId: "bad id" });
    page.send({ ...REQUEST, requestId: 42 });

    expect(page.host.reject).not.toHaveBeenCalled();
    expect(page.turnstile.render).not.toHaveBeenCalled();
  });
});
