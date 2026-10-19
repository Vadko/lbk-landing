import type { Metadata } from "next";

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PartnersListSection } from "@/components/collaboration/PartnersListSection";
import { PartnersStatsSection } from "@/components/collaboration/PartnersStatsSection";
import { PartnerValueSection } from "@/components/collaboration/PartnerValueSection";
import { PlatformAudienceSection } from "@/components/collaboration/PlatformAudienceSection";
import { CodeIcon } from "@/components/icons";
import { CtaSection } from "@/components/ui/CtaSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { PageHeroSection } from "@/components/ui/PageHeroSection";
import { BOT_URL } from "@/lib/constants";

const FLOW_STEPS = [
  "register",
  "verifyProfile",
  "addTranslation",
  "awaitReview",
  "done",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("collaboration");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CollaborationRoutePage() {
  const t = await getTranslations("collaboration");

  return (
    <>
      <PageHeroSection
        title={t("hero.title")}
        description={t("hero.description")}
        ctaText={t("hero.cta")}
        ctaHref={`${BOT_URL}?text=${t("botMessage")}`}
      />

      <PartnersStatsSection />
      <PartnersListSection />
      <PartnerValueSection />

      <section className="container">
        <HoverCard className="collab-admin-panel">
          <div className="collab-admin-panel-card">
            <div className="hover-card__icon collab-admin-icon">
              <CodeIcon aria-hidden />
            </div>

            <h2>{t("adminPanel.title")}</h2>
            <p>{t("adminPanel.description")}</p>

            <ul className="collab-admin-list mobile-full">
              <li>{t("adminPanel.uploads")}</li>
              <li>{t("adminPanel.delivery")}</li>
              <li>{t("adminPanel.moderation")}</li>
            </ul>

            <a className="btn btn-main" href={BOT_URL}>
              {t("adminPanel.cta")}
            </a>
          </div>

          <Image
            src="/assets/collaboration-admin-panel.webp"
            alt={t("adminPanel.imageAlt")}
            width={430}
            height={574}
          />
        </HoverCard>
      </section>

      <PlatformAudienceSection />

      <section className="container collab-flow">
        <HoverCard>
          <h2 className="section-title center">{t("flow.title")}</h2>

          <ol className="collab-flow-list">
            {FLOW_STEPS.map((step, index) => (
              <li key={step}>
                <span className="collab-flow-number">{index + 1}</span>
                <p>{t(`flow.${step}`)}</p>
              </li>
            ))}
          </ol>
        </HoverCard>
      </section>

      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref={`${BOT_URL}?text=${t("botMessage")}`}
      />
    </>
  );
}
