import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { PageHeroSection } from "@/components/ui/PageHeroSection";
import { DonatersStatsSection } from "./DonatersStatsSection";
import { LeaderboardSection } from "./LeaderboardSection";
import { SpecialThanksSection } from "./SpecialThanksSection";
import { SubscriptionSection } from "./SubscriptionSection";
import { SupportSection } from "./SupportSection";

export function DonatersPage() {
  return (
    <>
      <PageViewTracker event="view_donaters_page" />
      <PageHeroSection
        title="Топ донатерів"
        description="Підтримайте проєкт — і ваше ім&apos;я буде тут. Кожна гривня наближає нові українські локалізації."
      />
      <DonatersStatsSection />
      <SubscriptionSection />
      <SupportSection />
      <SpecialThanksSection />
      <LeaderboardSection />
    </>
  );
}
