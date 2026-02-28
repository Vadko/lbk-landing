import { NextResponse } from "next/server";
import { getFromCache, setCache } from "@/lib/redis";
import { createServerClient } from "@/lib/supabase/server";

const CACHE_KEY = "landing:stats";
const CACHE_TTL_SECONDS = 86400;

interface LandingStats {
  totalDownloads: number;
  totalPlaytimeHours: number;
  totalUniquePlayers: number;
  totalCreators: number;
  dau: number;
}

async function fetchFromSupabase(): Promise<LandingStats> {
  const supabase = createServerClient();
  const { data, error } = await supabase.rpc("get_landing_stats").single();

  if (error) {
    throw new Error(`Supabase RPC error: ${error.message}`);
  }

  return {
    totalDownloads: Number(data.total_downloads),
    totalPlaytimeHours: Math.round(Number(data.total_playtime_hours)),
    totalUniquePlayers: Number(data.total_unique_players),
    totalCreators: Number(data.total_creators),
    dau: Number(data.dau),
  };
}

export async function GET() {
  const cached = await getFromCache<LandingStats>(CACHE_KEY);

  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=60",
        "X-Cache": "HIT",
      },
    });
  }

  try {
    const data = await fetchFromSupabase();
    await setCache(CACHE_KEY, data, CACHE_TTL_SECONDS);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=60",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Landing stats API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats", message: String(error) },
      { status: 500 }
    );
  }
}
