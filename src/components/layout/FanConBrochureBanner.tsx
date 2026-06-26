"use client";

import dynamic from "next/dynamic";

// The banner's visibility depends on a cookie, so render it client-only: with
// ssr: false there's no server HTML for it and therefore no hydration mismatch.
export const FanConBrochureBanner = dynamic(
  () =>
    import("./FanConBrochureBannerContent").then((m) => ({
      default: m.FanConBrochureBannerContent,
    })),
  { ssr: false }
);
