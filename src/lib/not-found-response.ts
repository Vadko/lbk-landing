import { type NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/i18n/routing";

// No route matches /_not-found, so global-not-found answers with a real 404 in the locale from this header, the one next-intl's middleware sets
export function notFoundResponse(
  request: NextRequest,
  locale: Locale
): NextResponse {
  const headers = new Headers(request.headers);
  headers.set("X-NEXT-INTL-LOCALE", locale);
  return NextResponse.rewrite(new URL("/_not-found", request.url), {
    status: 404,
    request: { headers },
  });
}
