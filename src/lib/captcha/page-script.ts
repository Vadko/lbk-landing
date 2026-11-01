// Runs in the launcher's hidden captcha window, whose main process calls window.lbkCaptcha.solve through executeJavaScript
export const CAPTCHA_PAGE_SCRIPT = `(() => {
  "use strict";
  const API_URL =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  const siteKey = document.documentElement.dataset.sitekey;

  const loaded = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = API_URL;
    script.onload = () => resolve(window.turnstile ?? null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });

  const render = (turnstile, action, cData) =>
    new Promise((resolve) => {
      const container = document.createElement("div");
      document.body.appendChild(container);
      let widgetId;
      let settled = false;
      const settle = (result) => {
        if (settled) {
          return;
        }
        settled = true;
        resolve(result);
        setTimeout(() => {
          if (widgetId !== undefined) {
            turnstile.remove(widgetId);
          }
          container.remove();
        }, 0);
      };
      try {
        widgetId = turnstile.render(container, {
          sitekey: siteKey,
          action,
          cData,
          retry: "never",
          "refresh-expired": "never",
          "response-field": false,
          "feedback-enabled": false,
          callback: (token) => settle({ token }),
          "error-callback": (code) => {
            settle({ error: String(code) });
            return true;
          },
          "timeout-callback": () => settle({ error: "timeout" }),
          "unsupported-callback": () => settle({ error: "unsupported" }),
        });
      } catch {
        settle({ error: "render_failed" });
        return;
      }
      if (widgetId === undefined) {
        settle({ error: "render_failed" });
      }
    });

  window.lbkCaptcha = Object.freeze({
    solve: async (action, cData) => {
      const turnstile = await loaded;
      if (!turnstile) {
        return { error: "script_error" };
      }
      return render(turnstile, action, cData);
    },
  });
})();`;
