import type { createTranslator, Messages } from "next-intl";
import { CAPTCHA_PAGE_SCRIPT } from "./page-script";

type Translator = ReturnType<typeof createTranslator<Messages>>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderCaptchaPage(t: Translator, siteKey: string): string {
  const title = escapeHtml(t("captchaPage.title"));
  const description = escapeHtml(t("captchaPage.description"));
  return `<!doctype html>
<html lang="uk" data-sitekey="${escapeHtml(siteKey)}">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
</head>
<body>
<main>
<h1>${title}</h1>
<p>${description}</p>
</main>
<script data-cfasync="false">${CAPTCHA_PAGE_SCRIPT}</script>
</body>
</html>
`;
}
