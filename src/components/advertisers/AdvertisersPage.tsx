import { PageHeroSection } from "@/components/ui/PageHeroSection";
import { MetricSection } from "../landing/MetricSection";
import { CtaSection } from "../ui/CtaSection";
import { WhyAdvertisersChooseUs } from "./WhyAdvertisersChooseUs";

export function AdvertisersPage() {
  return (
    <>
      <PageHeroSection
        title="Рекламуйтеся там, де грають щодня"
        description="Досягайте активних гравців із високою щоденною активністю та стійким довгостроковим утриманням."
        ctaText="Зв'язатись з нами"
        ctaHref="https://t.me/lbk_launcher_bot"
        className="advertisers-hero"
      />

      <MetricSection />

      <WhyAdvertisersChooseUs />

      <CtaSection
        title="Готові досягти активних гравців?"
        description="Ми надаємо реальні метрики використання та прозору звітність, щоб рекламодавці чітко розуміли продуктивність та охоплення."
        buttonText="Отримати деталі"
        buttonHref="https://t.me/lbk_launcher_bot"
      />
    </>
  );
}
