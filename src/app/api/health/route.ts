import { NextResponse } from "next/server";

// Coolify's container health check: no IO, so a Supabase or Redis outage never takes the site out of Traefik
export function GET() {
  return NextResponse.json({ ok: true });
}
