import { cacheLife } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export async function fetchRedirect(oldPath: string): Promise<string | null> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("slug_redirects")
    .select("new_path")
    .eq("old_path", oldPath)
    .maybeSingle();

  return data?.new_path ?? null;
}

export async function getRedirect(oldPath: string): Promise<string | null> {
  "use cache";
  cacheLife("hours");

  return fetchRedirect(oldPath);
}

export async function findMovedGamePath(
  slug: string,
  teamSlug: string | null,
  lookup: (oldPath: string) => Promise<string | null>
): Promise<string | null> {
  if (!teamSlug) {
    return lookup(`/games/${slug}`);
  }
  const newPath = await lookup(`/games/${slug}/${teamSlug}`);
  if (newPath) {
    return newPath;
  }
  const newSlugPath = await lookup(`/games/${slug}`);
  return newSlugPath ? `${newSlugPath}/${teamSlug}` : null;
}

export async function resolveMovedGamePath(
  slug: string,
  teamSlug?: string,
  prefix = "/games"
): Promise<string | null> {
  const newPath = await findMovedGamePath(slug, teamSlug ?? null, getRedirect);
  if (!newPath) {
    return null;
  }
  return prefix === "/games" ? newPath : newPath.replace(/^\/games/, prefix);
}
