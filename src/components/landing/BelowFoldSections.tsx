"use client";

import dynamic from "next/dynamic";

const StatSection = dynamic(
  () =>
    import("@/components/landing/StatSection").then((m) => ({
      default: m.StatSection,
    })),
  { ssr: false }
);

const GallerySection = dynamic(
  () =>
    import("@/components/landing/GallerySection").then((m) => ({
      default: m.GallerySection,
    })),
  { ssr: false }
);

const ShowcaseSection = dynamic(
  () =>
    import("@/components/landing/ShowcaseSection").then((m) => ({
      default: m.ShowcaseSection,
    })),
  { ssr: false }
);

const CollaborationSection = dynamic(
  () =>
    import("@/components/landing/CollaborationSection").then((m) => ({
      default: m.CollaborationSection,
    })),
  { ssr: false }
);

const FaqSection = dynamic(
  () =>
    import("@/components/landing/FaqSection").then((m) => ({
      default: m.FaqSection,
    })),
  { ssr: false }
);

export function BelowFoldSections() {
  return (
    <>
      <StatSection />
      <GallerySection />
      <ShowcaseSection />
      <CollaborationSection />
      <FaqSection />
    </>
  );
}
