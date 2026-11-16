import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    // next-intl imports "next/navigation" without an extension, which only a bundler resolves
    server: { deps: { inline: ["next-intl"] } },
  },
});
