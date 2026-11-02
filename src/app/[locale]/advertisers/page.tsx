import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BOT_URL } from "@/lib/constants";
// import { PageHeroSection } from "@/components/ui/PageHeroSection";
// import { MetricSection } from "@/components/landing/MetricSection";
// import { CtaSection } from "@/components/ui/CtaSection";
// import { WhyAdvertisersChooseUs } from "@/components/advertisers/WhyAdvertisersChooseUs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("advertisers");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AdvertisersRoutePage() {
  // TODO: Uncomment when advertisers page is ready
  notFound();
  /*
  return (
      <>
        <PageHeroSection
          title="Рекламуйтеся там, де грають щодня"
          description="Досягайте активних гравців із високою щоденною активністю та стійким довгостроковим утриманням."
          ctaText="Зв'язатися з нами"
          ctaHref={BOT_URL}
          className="advertisers-hero"
        />
        <MetricSection />
        <WhyAdvertisersChooseUs />
        <CtaSection
          title="Готові досягти активних гравців?"
          description="Ми надаємо реальні метрики використання та прозору звітність, щоб рекламодавці чітко розуміли продуктивність та охоплення."
          buttonText="Отримати деталі"
          buttonHref={BOT_URL}
        />
      </>
    );
  */
}
