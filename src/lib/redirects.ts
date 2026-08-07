import { createServerClient } from "@/lib/supabase/server";

export async function getRedirect(oldPath: string): Promise<string | null> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("slug_redirects")
    .select("new_path")
    .eq("old_path", oldPath)
    .maybeSingle();

  return data?.new_path ?? null;
}


export async function resolveMovedGamePath(
  slug: string,
  teamSlug?: string,
  prefix = "/games",
): Promise<string | null> {
  const oldPath = teamSlug ? `/games/${slug}/${teamSlug}` : `/games/${slug}`;
  let newPath = await getRedirect(oldPath);

  if (!newPath && teamSlug) {
    const newSlugPath = await getRedirect(`/games/${slug}`);
    if (newSlugPath) {
      newPath = `${newSlugPath}/${teamSlug}`;
    }
  }

  if (!newPath) {
    return null;
  }
  return prefix === "/games" ? newPath : newPath.replace(/^\/games/, prefix);
}
