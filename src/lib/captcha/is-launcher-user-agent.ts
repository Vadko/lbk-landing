// Electron's default User-Agent carries "Electron/<version>"; the launcher keeps it, as Turnstile asks of embedded windows
export function isLauncherUserAgent(userAgent: string | null): boolean {
  return userAgent?.includes("Electron/") ?? false;
}
