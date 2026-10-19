import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { BOT_URL } from "@/lib/constants";
import { LegalLayout } from "../../legal-layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translatorTerms");
  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://lbklauncher.com/terms/translators",
    },
  };
}

const b = (chunks: ReactNode) => <strong>{chunks}</strong>;

export default async function TermsTranslatorsPage() {
  const t = await getTranslations("translatorTerms");

  return (
    <LegalLayout title={t("title")} lastUpdated={t("lastUpdated")}>
      <section>
        <p>{t.rich("intro", { b })}</p>
      </section>
      <section>
        <h2>
          <strong>{t("rights.title")}</strong>
        </h2>
        <p>
          {t.rich("rights.lead", {
            link: (chunks) => <a href="https://lbklauncher.com/">{chunks}</a>,
          })}
        </p>
        <ul>
          <li>{t.rich("rights.extension", { b })}</li>
          <li>{t.rich("rights.distribution", { b })}</li>
          <li>{t.rich("rights.authorship", { b })}</li>
          <li>
            {t.rich("rights.statuses", { b })}
            <ul>
              <li>{t("rights.statusRequest")}</li>
              <li>{t("rights.statusRevoke")}</li>
            </ul>
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <strong>{t("quality.title")}</strong>
        </h2>
        <ul>
          <li>
            {t.rich("quality.original", { b })}
            <ul>
              <li>{t("quality.originalOnly")}</li>
              <li>{t("quality.noRuReplacement")}</li>
            </ul>
          </li>
          <li>{t.rich("quality.gameAuthorship", { b })}</li>
          <li>
            {t.rich("quality.aiLabel", { b })}
            <ul>
              <li>{t("quality.aiNoRecommendations")}</li>
              <li>{t("quality.aiEarlyAccess")}</li>
              <li>{t("quality.aiNoPlanned")}</li>
              <li>{t("quality.aiLowEffort")}</li>
            </ul>
          </li>
          <li>{t.rich("quality.aiReplacement", { b })}</li>
          <li>{t.rich("quality.negativeFeedback", { b })}</li>
          <li>{t.rich("quality.intentionalHarm", { b })}</li>
          <li>{t.rich("quality.ownTech", { b })}</li>
        </ul>
      </section>
      <section>
        <h2>
          <strong>{t("fundraising.title")}</strong>
        </h2>
        <p>{t("fundraising.lead")}</p>
        <ul>
          <li>{t.rich("fundraising.promises", { b })}</li>
          <li>{t.rich("fundraising.suspension", { b })}</li>
          <li>{t.rich("fundraising.freeAccess", { b })}</li>
        </ul>
      </section>
      <section>
        <h2>
          <strong>{t("liability.title")}</strong>
        </h2>
        <ul>
          <li>{t.rich("liability.disclaimer", { b })}</li>
          <li>
            {t.rich("liability.removal", {
              b,
              botUrl: BOT_URL,
              bot: (chunks) => <a href={BOT_URL}>{chunks}</a>,
            })}
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <strong>{t("privacy.title")}</strong>
        </h2>
        <ul>
          <li>{t.rich("privacy.account", { b })}</li>
          <li>{t.rich("privacy.notifications", { b })}</li>
          <li>
            {t.rich("privacy.fullList", {
              b,
              link: (chunks) => <a href="/privacy">{chunks}</a>,
            })}
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <strong>{t("contacts.title")}</strong>
        </h2>
        <p>{t("contacts.lead")}</p>
        <ul>
          <li>
            <strong>Email: </strong>{" "}
            <a href="mailto:pr@gameglobe-localisation.com">
              pr@gameglobe-localisation.com
            </a>
          </li>
          <li>
            <strong>Telegram: </strong> <a href={BOT_URL}>{BOT_URL}</a>
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
