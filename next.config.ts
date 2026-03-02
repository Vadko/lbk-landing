import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
});
