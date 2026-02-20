import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  let shouldRedirect = false;
  let newUrl = `${protocol}://${hostname}${pathname}${search}`;

  // Редирект з WWW на non-WWW
  if (hostname.startsWith("www.")) {
    const newHost = hostname.replace(/^www\./, "");
    newUrl = `${protocol === "http" ? "https" : protocol}://${newHost}${pathname}${search}`;
    shouldRedirect = true;
  }

  // Виконуємо 301 редирект якщо потрібно
  if (shouldRedirect) {
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  return NextResponse.next();
}

// Застосовуємо middleware до всіх маршрутів окрім статичних файлів та API Next.js
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
