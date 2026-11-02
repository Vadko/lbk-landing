import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { BelowFoldSections } from "@/components/landing/BelowFoldSections";
import { HeroSection } from "@/components/landing/HeroSection";
import { type LocaleParams, resolveLocale } from "@/i18n/resolve-locale";

export default async function Home({ params }: LocaleParams) {
  await resolveLocale(params);
  return (
    <>
      <PageViewTracker event="view_homepage" />
      <HeroSection />
      <BelowFoldSections />
    </>
  );
}
