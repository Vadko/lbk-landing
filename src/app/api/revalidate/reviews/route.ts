import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { gameTag } from "@/lib/games";
import { reviewsTag } from "@/lib/reviews/reviews-cache";

// lbk-admin calls this whenever a public thread of the game changes
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const { gameId } = await request.json();

    if (typeof gameId !== "string" || !gameId) {
      return NextResponse.json(
        { error: "gameId is required" },
        { status: 400 }
      );
    }

    revalidateTag(reviewsTag(gameId), { expire: 0 });
    revalidateTag(gameTag(gameId), { expire: 0 });

    return NextResponse.json({ revalidated: true, gameId });
  } catch (error) {
    console.error("Revalidate reviews API error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
