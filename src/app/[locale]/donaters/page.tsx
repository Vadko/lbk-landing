import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { DonatersStatsSection } from "@/components/donaters/DonatersStatsSection";
import { LeaderboardSection } from "@/components/donaters/LeaderboardSection";
import { SpecialThanksSection } from "@/components/donaters/SpecialThanksSection";
// import { SubscriptionSection } from "@/components/donaters/SubscriptionSection";
import { SupportSection } from "@/components/donaters/SupportSection";
import { PageHeroSection } from "@/components/ui/PageHeroSection";
import { type LocaleParams, resolveLocale } from "@/i18n/resolve-locale";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "donaters" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DonatersRoutePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("donaters");

  return (
    <>
      <PageViewTracker event="view_donaters_page" />
      <PageHeroSection
        title={t("title")}
        description={t("description")}
        ctaText={t("heroCta")}
        ctaHref="https://donatello.to/atlantDeMaPeine?g=pidtrimka-roboti-lbk-launcher"
      />
      <DonatersStatsSection />
      {/* <SubscriptionSection /> */}
      <SupportSection />
      <SpecialThanksSection />
      <LeaderboardSection locale={locale} />
    </>
  );
}
