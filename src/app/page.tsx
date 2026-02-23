import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { CollaborationSection } from "@/components/landing/CollaborationSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";
import { StatSection } from "@/components/landing/StatSection";

export default function Home() {
  return (
    <>
      <PageViewTracker event="view_homepage" />
      <HeroSection />
      <StatSection />
      <GallerySection />
      <ShowcaseSection />
      <CollaborationSection />
      <FaqSection />
    </>
  );
}
