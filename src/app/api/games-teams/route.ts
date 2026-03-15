import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("games")
      .select("team")
      .eq("approved", true)
      .eq("hide", false);

    if (error) {
      throw new Error(error.message);
    }

    const allAuthors = data
      .flatMap((row) => {
        if (!row.team) return [];
        return row.team.split(",").map((author) => author.trim());
      })
      .filter((author) => author.length > 0);

    const uniqueAuthors = [...new Set(allAuthors)].sort((a, b) =>
      a.localeCompare(b, "uk")
    );

    return NextResponse.json(uniqueAuthors, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Games teams API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
