import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { count, error } = await supabase
      .from("games_grouped")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { count: count ?? 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Games count API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch count" },
      { status: 500 }
    );
  }
}
