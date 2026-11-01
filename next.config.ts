import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";
import createNextIntlPlugin from "next-intl/plugin";
import { version } from "./package.json";

const commit = process.env.SOURCE_COMMIT?.slice(0, 7);
const release = commit ? `${version}-${commit}` : version;

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // ~4.9k pages prerender against Supabase; the default 60 s caps a "use cache" fill at 54 s.
  staticPageGenerationTimeout: 180,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "latest",
    hideLogsAfterAbort: true,
    // A .next/cache restored between deploys made Turbopack ship a stale CSS chunk alongside fresh JS.
    turbopackFileSystemCacheForBuild: false,
    inlineCss: true,
    optimizePackageImports: [
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supabase.lbklauncher.com",
      },
    ],
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  silent: !process.env.CI,
  tunnelRoute: "/monitoring",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  sentryUrl: process.env.SENTRY_URL,
  widenClientFileUpload: true,
  release: {
    name: release,
  },
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayIframe: true,
    excludeReplayShadowDom: true,
    excludeReplayWorker: true,
    excludeTracing: true,
  },
});
