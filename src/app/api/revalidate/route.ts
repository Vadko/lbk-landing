import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { teamToSlug } from "@/lib/transliterate";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const { slug, team, oldTeam } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const paths: string[] = [];

    // Revalidate game pages
    const teamSlug = team ? teamToSlug(team) : null;
    if (teamSlug) {
      revalidatePath(`/games/${slug}/${teamSlug}`);
      paths.push(`/games/${slug}/${teamSlug}`);
    }

    // Revalidate old team page so it picks up the redirect
    const oldTeamSlug = oldTeam ? teamToSlug(oldTeam) : null;
    if (oldTeamSlug && oldTeamSlug !== teamSlug) {
      revalidatePath(`/games/${slug}/${oldTeamSlug}`);
      paths.push(`/games/${slug}/${oldTeamSlug}`);
    }

    // Game overview page (all teams)
    revalidatePath(`/games/${slug}`);
    paths.push(`/games/${slug}`);
    // Games list page
    revalidatePath("/games");
    paths.push("/games");

    return NextResponse.json({ revalidated: true, paths });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate", message: (error as Error).message },
      { status: 500 }
    );
  }
}
