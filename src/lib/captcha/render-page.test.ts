import { createHash } from "node:crypto";
import { createTranslator } from "next-intl";
import { describe, expect, it } from "vitest";
import { uk } from "@/i18n/uk";
import { CAPTCHA_PAGE_HEADERS } from "./page-headers";
import { CAPTCHA_PAGE_SCRIPT } from "./page-script";
import { renderCaptchaPage } from "./render-page";

const t = createTranslator({ locale: "uk", messages: uk });

const scriptTagCount = (html: string) =>
  html.toLowerCase().split("<script").length - 1;

describe("renderCaptchaPage", () => {
  it("allows exactly its inline script through the CSP hash", () => {
    const html = renderCaptchaPage(t, "site-key");
    const csp = CAPTCHA_PAGE_HEADERS["Content-Security-Policy"];
    const hash = createHash("sha256")
      .update(CAPTCHA_PAGE_SCRIPT)
      .digest("base64");

    expect(scriptTagCount(html)).toBe(1);
    // The parser ends the script at the first </script, so the hashed text must not contain one
    expect(CAPTCHA_PAGE_SCRIPT.toLowerCase()).not.toContain("</script");
    expect(html).toContain(
      `<script data-cfasync="false">${CAPTCHA_PAGE_SCRIPT}</script>`
    );
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
    expect(scriptTagCount(html)).toBe(1);
  });
});
