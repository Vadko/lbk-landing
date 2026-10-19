import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { BelowFoldSections } from "@/components/landing/BelowFoldSections";
import { HeroSection } from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <>
      <PageViewTracker event="view_homepage" />
      <HeroSection />
      <BelowFoldSections />
    </>
  );
}
