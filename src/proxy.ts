import { type NextRequest, NextResponse } from "next/server";
import { resolveGamePath } from "@/lib/proxy-games";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  // Редирект з WWW на non-WWW (301)
  if (hostname.startsWith("www.")) {
    const newHost = hostname.replace(/^www\./, "");
    const newUrl = `${protocol === "http" ? "https" : protocol}://${newHost}${pathname}${search}`;
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // 410 Gone / 308 для видалених та перейменованих перекладів.
  const gameResponse = await resolveGamePath(request);
  if (gameResponse) {
    return gameResponse;
  }

  return NextResponse.next();
}

// Застосовуємо proxy до всіх маршрутів окрім статичних файлів та API Next.js
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
