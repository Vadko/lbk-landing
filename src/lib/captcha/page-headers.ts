import { createHash } from "node:crypto";
import { CAPTCHA_PAGE_SCRIPT } from "./page-script";

const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";

const scriptHash = createHash("sha256")
  .update(CAPTCHA_PAGE_SCRIPT)
  .digest("base64");

// Only the hashed inline script runs, so scripts Cloudflare injects at the edge (Zaraz, JS Detections) are blocked
const CONTENT_SECURITY_POLICY = [
  "default-src 'none'",
  `script-src 'sha256-${scriptHash}' ${TURNSTILE_ORIGIN}`,
  `frame-src ${TURNSTILE_ORIGIN}`,
  `connect-src ${TURNSTILE_ORIGIN}`,
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

export const CAPTCHA_PAGE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow",
};
