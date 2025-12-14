/**
 * R2 public URL for images (via custom domain)
 */
const R2_IMAGES_URL =
  process.env.NEXT_PUBLIC_R2_IMAGES_URL || "https://images.lblauncher.com";

/**
 * Converts a storage path to a full R2 storage URL.
 * Handles both relative paths and full URLs.
 */
export function getImageUrl(path: string | null): string | null {
  if (!path) return null;

  // Already a full URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${R2_IMAGES_URL}/${cleanPath}`;
}
