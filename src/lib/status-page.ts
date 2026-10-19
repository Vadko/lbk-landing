import { NextResponse } from "next/server";

export const STATUS_PAGE_HEADER = "x-lbk-status-page";

// Next renders a page only as 200/401/403/404, so the proxy fetches the prerendered page from this server and re-sends it with the real status
export async function statusPageResponse(
  path: "/gone" | "/maintenance",
  status: number,
  headers: Record<string, string> = {}
): Promise<NextResponse> {
  const init = {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  };

  try {
    // Next sets PORT to the port it actually listens on, in dev and start alike
    const page = await fetch(
      `http://localhost:${process.env.PORT ?? 3000}${path}`,
      {
        headers: { [STATUS_PAGE_HEADER]: "1" },
        cache: "no-store",
        // A stalled render must not hold every 410/503 for undici's 300 s default
        signal: AbortSignal.timeout(3000),
      }
    );
    if (page.ok) {
      return new NextResponse(page.body, init);
    }
    console.error(`Status page ${path} answered ${page.status}`);
  } catch (error) {
    console.error(`Status page ${path} fetch failed:`, error);
  }

  return new NextResponse(null, init);
}
