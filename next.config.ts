import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { version } from "./package.json";

const commit = process.env.SOURCE_COMMIT?.slice(0, 7);
const release = commit ? `${version}-${commit}` : version;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.lbklauncher.com",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
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
});
