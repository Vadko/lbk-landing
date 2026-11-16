export function isUnlocalizedPath(pathname: string): boolean {
  return (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/monitoring" ||
    pathname.startsWith("/monitoring/")
  );
}
