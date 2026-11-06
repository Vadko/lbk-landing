import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { splitLocale } from "@/i18n/locale-path";
import { routing } from "@/i18n/routing";
import { isLauncherUserAgent } from "@/lib/captcha/is-launcher-user-agent";
import { isMaintenanceMode } from "@/lib/maintenance";
import { resolveGamePath } from "@/lib/proxy-games";
import { STATUS_PAGE_HEADER, statusPageResponse } from "@/lib/status-page";
import { isUnlocalizedPath } from "@/lib/unlocalized-path";

const intlMiddleware = createMiddleware(routing);

// Lands on [locale]/[...rest], which renders the localized 404 with the navbar
function notFound(request: NextRequest) {
  return NextResponse.rewrite(
    new URL(`/${routing.defaultLocale}/_not-found`, request.url),
    { status: 404 }
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  // WWW to non-WWW redirect (301)
  if (hostname.startsWith("www.")) {
    const newHost = hostname.replace(/^www\./, "");
    const newUrl = `${protocol === "http" ? "https" : protocol}://${newHost}${pathname}${search}`;
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Only the launcher's captcha window sees the page, through maintenance too; anything else gets a 404
  if (pathname === "/captcha") {
    if (isLauncherUserAgent(request.headers.get("user-agent"))) {
      return NextResponse.next();
    }
    return notFound(request);
  }

  const { locale, path } = splitLocale(pathname);

  // Only the proxy's own fetch reaches the status pages; a direct visit gets the 404 it would without them
  if (path === "/gone" || path === "/maintenance") {
    if (request.headers.get(STATUS_PAGE_HEADER) === "1") {
      return intlMiddleware(request);
    }
    return notFound(request);
  }

  // 503 + Retry-After so search engines keep the indexed pages instead of the stub
  if (isMaintenanceMode()) {
    return statusPageResponse(
      "/maintenance",
      503,
      { "Retry-After": "3600" },
      locale
    );
  }

  // 410 Gone for deleted translations; a null answer carries on to the page
  const gameResponse = await resolveGamePath(request);
  if (gameResponse) {
    return gameResponse;
  }

  if (isUnlocalizedPath(pathname)) {
    return NextResponse.next();
  }

  const response = intlMiddleware(request);
  // Filtered catalog URLs stay out of the index; reading searchParams in metadata would make /games dynamic
  if (path === "/games" && search) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }
  return response;
}

// Apply the proxy to every route except static files and Next.js API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
