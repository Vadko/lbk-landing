import { getTranslations } from "next-intl/server";
import { CAPTCHA_PAGE_HEADERS } from "@/lib/captcha/page-headers";
import { renderCaptchaPage } from "@/lib/captcha/render-page";

// The launcher's hidden window solves Turnstile here; a deploy without the site key leaves it with captcha_unavailable
export async function GET() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    console.error("Captcha page: NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
    return new Response(null, { status: 503 });
  }
  const t = await getTranslations({ locale: "uk" });
  return new Response(renderCaptchaPage(t, siteKey), {
    headers: CAPTCHA_PAGE_HEADERS,
  });
}
