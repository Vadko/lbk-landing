import type { Metadata } from "next";

import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { DonatersStatsSection } from "@/components/donaters/DonatersStatsSection";
import { LeaderboardSection } from "@/components/donaters/LeaderboardSection";
import { SpecialThanksSection } from "@/components/donaters/SpecialThanksSection";
// import { SubscriptionSection } from "@/components/donaters/SubscriptionSection";
import { SupportSection } from "@/components/donaters/SupportSection";
import { PageHeroSection } from "@/components/ui/PageHeroSection";

export const metadata: Metadata = {
  title: "Топ донатерів",
  description:
    "Підтримайте проєкт — і ваше ім'я буде тут. Кожна гривня наближає нові українські локалізації.",
};

export default function DonatersRoutePage() {
  return (
    <>
      <PageViewTracker event="view_donaters_page" />
      <PageHeroSection
        title="Топ донатерів"
        description="Підтримайте проєкт — і ваше ім&apos;я буде тут. Кожна гривня наближає нові українські локалізації."
        ctaText="Підтримати на Donatello"
        ctaHref="https://donatello.to/atlantDeMaPeine?g=pidtrimka-roboti-lbk-launcher"
      />
      <DonatersStatsSection />
      {/* <SubscriptionSection /> */}
      <SupportSection />
      <SpecialThanksSection />
      <LeaderboardSection />
    </>
  );
}
