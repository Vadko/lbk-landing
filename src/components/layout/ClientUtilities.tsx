"use client";

import dynamic from "next/dynamic";

const BodyClassManager = dynamic(
  () =>
    import("@/components/layout/BodyClassManager").then((m) => ({
      default: m.BodyClassManager,
    })),
  { ssr: false }
);
const RouteScrollTop = dynamic(
  () =>
    import("@/components/layout/RouteScrollTop").then((m) => ({
      default: m.RouteScrollTop,
    })),
  { ssr: false }
);
const ScrollToTop = dynamic(
  () =>
    import("@/components/layout/ScrollToTop").then((m) => ({
      default: m.ScrollToTop,
    })),
  { ssr: false }
);

export function ClientUtilities() {
  return (
    <>
      <BodyClassManager />
      <RouteScrollTop />
      <ScrollToTop />
    </>
  );
}
