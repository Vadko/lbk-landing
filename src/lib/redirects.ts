import { createServerClient } from "@/lib/supabase/server";

export async function getRedirect(oldPath: string): Promise<string | null> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("slug_redirects")
    .select("new_path")
    .eq("old_path", oldPath)
    .single();

  return data?.new_path ?? null;
}
