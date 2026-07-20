import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { DonatersHeroSection } from "./DonatersHeroSection";
import { DonatersStatsSection } from "./DonatersStatsSection";
import { LeaderboardSection } from "./LeaderboardSection";
import { SpecialThanksSection } from "./SpecialThanksSection";
import { SubscriptionSection } from "./SubscriptionSection";
import { SupportSection } from "./SupportSection";

export function DonatersPage() {
  return (
    <>
      <DonatersHeroSection />
      <DonatersStatsSection />
      <SubscriptionSection />
      <SupportSection />
      <SpecialThanksSection />
      <LeaderboardSection />
    </>
  );
}
