import { createHash } from "node:crypto";
import { createTranslator } from "next-intl";
import { describe, expect, it } from "vitest";
import { uk } from "@/i18n/uk";
import { CAPTCHA_PAGE_HEADERS } from "./page-headers";
import { renderCaptchaPage } from "./render-page";

const t = createTranslator({ locale: "uk", messages: uk });

function inlineScripts(html: string): string[] {
  return [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => match[1] ?? ""
  );
}

describe("renderCaptchaPage", () => {
  it("allows exactly its inline script through the CSP hash", () => {
    const scripts = inlineScripts(renderCaptchaPage(t, "site-key"));
    const csp = CAPTCHA_PAGE_HEADERS["Content-Security-Policy"];

    expect(scripts).toHaveLength(1);
    expect(renderCaptchaPage(t, "site-key")).toContain(
      '<script data-cfasync="false">'
    );
    const hash = createHash("sha256")
      .update(scripts[0] ?? "")
      .digest("base64");
    expect(csp).toContain(`'sha256-${hash}'`);
    expect(csp).not.toContain("unsafe-inline");
  });

  it("hands the site key to the script and renders the dictionary text", () => {
    const html = renderCaptchaPage(t, "0x4AAA-key");

    expect(html).toContain('data-sitekey="0x4AAA-key"');
    expect(html).toContain(`<title>${t("captchaPage.title")}</title>`);
  });

  it("escapes the site key", () => {
    const html = renderCaptchaPage(t, '"><script>');

    expect(html).toContain('data-sitekey="&quot;&gt;&lt;script&gt;"');
    expect(inlineScripts(html)).toHaveLength(1);
  });
});
