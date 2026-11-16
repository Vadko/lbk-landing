import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { BelowFoldSections } from "@/components/landing/BelowFoldSections";
import { HeroSection } from "@/components/landing/HeroSection";
import { localizedAlternates } from "@/lib/localizedAlternates";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: localizedAlternates("/", await getLocale()) };
}

export default async function Home() {
  return (
    <>
      <PageViewTracker event="view_homepage" />
      <HeroSection />
      <BelowFoldSections />
    </>
  );
}
