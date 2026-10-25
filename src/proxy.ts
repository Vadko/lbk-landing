import { type NextRequest, NextResponse } from "next/server";
import { isMaintenanceMode } from "@/lib/maintenance";
import { resolveGamePath } from "@/lib/proxy-games";
import { STATUS_PAGE_HEADER, statusPageResponse } from "@/lib/status-page";

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

  // The launcher's captcha window keeps working through maintenance; the page itself sets noindex
  if (pathname === "/captcha") {
    return NextResponse.next();
  }

  // Only the proxy's own fetch reaches the status pages; a direct visit gets the 404 it would without them
  if (pathname === "/gone" || pathname === "/maintenance") {
    if (request.headers.get(STATUS_PAGE_HEADER) === "1") {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  // 503 + Retry-After so search engines keep the indexed pages instead of the stub
  if (isMaintenanceMode()) {
    return statusPageResponse("/maintenance", 503, { "Retry-After": "3600" });
  }

  // 410 Gone / 308 for deleted and renamed translations.
  const gameResponse = await resolveGamePath(request);
  if (gameResponse) {
    return gameResponse;
  }

  const response = NextResponse.next();
  // Filtered catalog URLs stay out of the index; reading searchParams in metadata would make /games dynamic
  if (pathname === "/games" && search) {
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
