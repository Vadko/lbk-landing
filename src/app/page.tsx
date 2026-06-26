import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { BelowFoldSections } from "@/components/landing/BelowFoldSections";
import { HeroSection } from "@/components/landing/HeroSection";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <PageViewTracker event="view_homepage" />
      <HeroSection />
      <BelowFoldSections />
    </>
  );
}
