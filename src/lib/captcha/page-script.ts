// Runs in the launcher's hidden captcha window; window.lbkCaptchaHost is the contextBridge API of its preload, absent in a browser
export const CAPTCHA_PAGE_SCRIPT = `(() => {
  "use strict";
  const host = window.lbkCaptchaHost;
  if (!host) {
    return;
  }
  const API_URL =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  const REQUEST_ID = /^[A-Za-z0-9_-]{1,64}$/;
  const ACTION = /^[A-Za-z0-9_-]{1,32}$/;
  const CDATA = /^[A-Za-z0-9_-]{1,255}$/;
  const siteKey = document.documentElement.dataset.sitekey;
  const queued = [];
  let turnstile = null;
  let failure = null;

  const fail = (code) => {
    failure = code;
    host.unavailable(code);
    for (const request of queued.splice(0)) {
      host.reject(request.requestId, code);
    }
  };

  const solve = (request) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    let widgetId;
    let settled = false;
    const settle = (reply) => {
      if (settled) {
        return;
      }
      settled = true;
      reply();
      setTimeout(() => {
        if (widgetId !== undefined) {
          turnstile.remove(widgetId);
        }
        container.remove();
      }, 0);
    };
    const reject = (code) => () => host.reject(request.requestId, code);
    try {
      widgetId = turnstile.render(container, {
        sitekey: siteKey,
        action: request.action,
        cData: request.cData,
        retry: "never",
        "refresh-expired": "never",
        "response-field": false,
        "feedback-enabled": false,
        callback: (token) => settle(() => host.resolve(request.requestId, token)),
        "error-callback": (code) => {
          settle(reject(String(code)));
          return true;
        },
        "timeout-callback": () => settle(reject("timeout")),
        "unsupported-callback": () => settle(reject("unsupported")),
      });
    } catch {
      settle(reject("render_failed"));
      return;
    }
    if (widgetId === undefined) {
      settle(reject("render_failed"));
    }
  };

  host.onRequest((request) => {
    if (
      !request ||
      typeof request.requestId !== "string" ||
      !REQUEST_ID.test(request.requestId)
    ) {
      return;
    }
    if (
      typeof request.action !== "string" ||
      !ACTION.test(request.action) ||
      typeof request.cData !== "string" ||
      !CDATA.test(request.cData)
    ) {
      host.reject(request.requestId, "invalid_request");
      return;
    }
    if (turnstile) {
      solve(request);
    } else if (failure) {
      host.reject(request.requestId, failure);
    } else {
      queued.push(request);
    }
  });

  const script = document.createElement("script");
  script.src = API_URL;
  script.onload = () => {
    if (!window.turnstile) {
      fail("script_error");
      return;
    }
    turnstile = window.turnstile;
    host.ready();
    queued.splice(0).forEach(solve);
  };
  script.onerror = () => fail("script_error");
  document.head.appendChild(script);
})();`;
