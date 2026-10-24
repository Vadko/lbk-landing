import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { BOT_URL } from "@/lib/constants";
import { LegalLayout } from "../legal-layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacyPolicy");

  return {
    title: t("title"),
    description: t("metaDescription"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://lbklauncher.com/privacy",
    },
  };
}

const CONTACT_EMAIL = "pr@gameglobe-localisation.com";

const LEGAL_BASIS_ROWS = [
  { purpose: "delivery", category: "essential", basis: "requestOrTerms" },
  { purpose: "subscription", category: "essential", basis: "request" },
  { purpose: "abuse", category: "essential", basis: "stability" },
  {
    purpose: "improve",
    category: "improve",
    basis: "legitimateInterest",
  },
  {
    purpose: "develop",
    category: "develop",
    basis: "legitimateInterest",
  },
  {
    purpose: "diagnostics",
    category: "diagnostics",
    basis: "legitimateInterest",
  },
  { purpose: "feedback", category: "userAction", basis: "consent" },
  { purpose: "account", category: "account", basis: "requestOrTerms" },
] as const;

const b = (chunks: ReactNode) => <strong>{chunks}</strong>;

const email = (chunks: ReactNode) => (
  <a href={`mailto:${CONTACT_EMAIL}`} target="_blank" rel="noopener noreferrer">
    {chunks}
  </a>
);

const bot = (chunks: ReactNode) => (
  <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
    {chunks}
  </a>
);

const turnstile = (chunks: ReactNode) => (
  <a
    href="https://www.cloudflare.com/turnstile-privacy-policy/"
    target="_blank"
    rel="noopener noreferrer"
  >
    {chunks}
  </a>
);

export default async function PrivacyPage() {
  const t = await getTranslations("privacyPolicy");
  const tLegal = await getTranslations("legalLayout");

  return (
    <LegalLayout title={t("title")} lastUpdated={t("lastUpdated")}>
      <section>
        <p>{t("intro.service")}</p>
        <p>{t("intro.openSource")}</p>
      </section>

      <section>
        <h2>{t("controller.title")}</h2>
        <p>{t.rich("controller.body", { b })}</p>
        <p>{t("controller.contactsIntro")}</p>
        <ul>
          <li>
            {t.rich("controller.email", { address: CONTACT_EMAIL, email })}
          </li>
          <li>{t.rich("controller.bot", { bot })}</li>
        </ul>
      </section>

      <section>
        <h2>{t("categories.title")}</h2>
        <p>{t("categories.intro")}</p>
        <h3>{t("categories.essentialTitle")}</h3>
        <p>{t("categories.essentialBody")}</p>
        <p>{t("categories.includesThem")}</p>
        <ul>
          <li>{t("categories.essentialItems.archive")}</li>
          <li>{t("categories.essentialItems.install")}</li>
          <li>{t("categories.essentialItems.subscription")}</li>
          <li>{t("categories.essentialItems.abuse")}</li>
          <li>{t("categories.essentialItems.account")}</li>
        </ul>
        <h3>{t("categories.improveTitle")}</h3>
        <p>{t("categories.improveBody")}</p>
        <p>{t("categories.includesIt")}</p>
        <ul>
          <li>{t("categories.improveItems.session")}</li>
          <li>{t("categories.improveItems.firstRun")}</li>
          <li>{t("categories.improveItems.mixpanel")}</li>
          <li>{t("categories.improveItems.banners")}</li>
        </ul>
        <h3>{t("categories.developTitle")}</h3>
        <p>{t("categories.developBody")}</p>
        <p>{t("categories.includesIt")}</p>
        <ul>
          <li>{t("categories.developItems.support")}</li>
          <li>{t("categories.developItems.failedSearch")}</li>
          <li>{t("categories.developItems.removal")}</li>
          <li>{t("categories.developItems.playtime")}</li>
        </ul>
        <h3>{t("categories.diagnosticsTitle")}</h3>
        <p>{t("categories.diagnosticsBody")}</p>
        <p>{t("categories.optOut")}</p>
        <h3>{t("categories.publicTitle")}</h3>
        <p>{t("categories.publicBody")}</p>
        <p>{t("categories.noTracking")}</p>
      </section>

      <section>
        <h2>{t("localOnly.title")}</h2>
        <p>{t("localOnly.intro")}</p>
        <ul>
          <li>{t.rich("localOnly.items.installedGames", { b })}</li>
          <li>{t.rich("localOnly.items.accounts", { b })}</li>
          <li>{t.rich("localOnly.items.steamLibrary", { b })}</li>
          <li>{t.rich("localOnly.items.database", { b })}</li>
          <li>{t.rich("localOnly.items.backups", { b })}</li>
          <li>{t.rich("localOnly.items.search", { b })}</li>
          <li>{t.rich("localOnly.items.sync", { b })}</li>
          <li>{t.rich("localOnly.items.playtime", { b })}</li>
        </ul>
        <p>{t("localOnly.closing")}</p>
      </section>

      <section>
        <h2>{t("network.title")}</h2>
        <h3>{t("network.downloadTitle")}</h3>
        <p>{t("network.downloadIntro")}</p>
        <ul>
          <li>{t("network.downloadItems.gameId")}</li>
          <li>{t("network.downloadItems.archivePath")}</li>
          <li>{t("network.downloadItems.archiveType")}</li>
          <li>{t("network.downloadItems.machineId")}</li>
        </ul>
        <p>{t("network.downloadBody")}</p>
        <h3>{t("network.workshopTitle")}</h3>
        <p>{t("network.workshopBody")}</p>
        <h3>{t("network.subscriptionTitle")}</h3>
        <p>{t("network.subscriptionBody")}</p>
      </section>

      <section>
        <h2>{t("productAnalytics.title")}</h2>
        <p>{t("productAnalytics.intro")}</p>
        <ul>
          <li>{t.rich("productAnalytics.items.session", { b })}</li>
          <li>{t.rich("productAnalytics.items.firstSession", { b })}</li>
          <li>{t.rich("productAnalytics.items.mixpanel", { b })}</li>
          <li>{t.rich("productAnalytics.items.banners", { b })}</li>
        </ul>
      </section>

      <section>
        <h2>{t("localizationAnalytics.title")}</h2>
        <p>{t("localizationAnalytics.intro")}</p>
        <ul>
          <li>{t.rich("localizationAnalytics.items.support", { b })}</li>
          <li>{t.rich("localizationAnalytics.items.failedSearch", { b })}</li>
          <li>{t.rich("localizationAnalytics.items.removal", { b })}</li>
          <li>{t.rich("localizationAnalytics.items.playtime", { b })}</li>
        </ul>
      </section>

      <section>
        <h2>{t("feedback.title")}</h2>
        <p>{t("feedback.intro")}</p>
        <h3>{t("feedback.reviewTitle")}</h3>
        <p>{t("feedback.reviewIntro")}</p>
        <ul>
          <li>{t("feedback.reviewItems.gameId")}</li>
          <li>{t("feedback.reviewItems.type")}</li>
          <li>{t("feedback.reviewItems.message")}</li>
          <li>{t("feedback.reviewItems.appVersion")}</li>
          <li>{t("feedback.reviewItems.platform")}</li>
          <li>{t("feedback.reviewItems.machineId")}</li>
        </ul>
        <h3>{t("feedback.screenshotsTitle")}</h3>
        <p>{t("feedback.screenshotsBody")}</p>
        <h3>{t("feedback.logsTitle")}</h3>
        <p>{t("feedback.logsBody")}</p>
      </section>

      <section>
        <h2>{t("crashReports.title")}</h2>
        <p>{t("crashReports.body")}</p>
        <p>{t("crashReports.optIn")}</p>
        <p>{t.rich("crashReports.glitchtip", { b })}</p>
      </section>

      <section>
        <h2>{t("website.title")}</h2>
        <h3>{t("website.publicTitle")}</h3>
        <p>{t.rich("website.zaraz", { b })}</p>
        <p>{t("website.failedSearch")}</p>
        <h3>{t("website.videoTitle")}</h3>
        <p>{t("website.videoBody")}</p>
        <h3>{t("website.releasesTitle")}</h3>
        <p>{t("website.releasesBody")}</p>
      </section>

      <section>
        <h2>{t("accounts.title")}</h2>
        <p>{t("accounts.intro")}</p>
        <p>{t("accounts.dataIntro")}</p>
        <ul>
          <li>{t("accounts.items.name")}</li>
          <li>{t("accounts.items.email")}</li>
          <li>{t("accounts.items.google")}</li>
          <li>{t("accounts.items.service")}</li>
        </ul>
        <p>{t("accounts.analytics")}</p>
      </section>

      <section>
        <h2>{t("legalBasis.title")}</h2>
        <table className="legal-table">
          <thead>
            <tr>
              <th>{t("legalBasis.columns.purpose")}</th>
              <th>{t("legalBasis.columns.category")}</th>
              <th>{t("legalBasis.columns.basis")}</th>
            </tr>
          </thead>
          <tbody>
            {LEGAL_BASIS_ROWS.map((row) => (
              <tr key={row.purpose}>
                <td>{t(`legalBasis.purposes.${row.purpose}`)}</td>
                <td>{t(`legalBasis.categories.${row.category}`)}</td>
                <td>{t(`legalBasis.bases.${row.basis}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{t("legalBasis.objection")}</p>
      </section>

      <section>
        <h2>{t("retention.title")}</h2>
        <p>{t("retention.intro")}</p>
        <p>{t("retention.body")}</p>
      </section>

      <section>
        <h2>{t("recipients.title")}</h2>
        <h3>{t("recipients.infraTitle")}</h3>
        <ul>
          <li>{t.rich("recipients.supabase", { b })}</li>
          <li>{t.rich("recipients.glitchtip", { b })}</li>
        </ul>
        <p>{t("recipients.coolify")}</p>
        <h3>{t("recipients.externalTitle")}</h3>
        <ul>
          <li>{t.rich("recipients.external.mixpanel", { b })}</li>
          <li>{t.rich("recipients.external.zaraz", { b })}</li>
          <li>{t.rich("recipients.external.turnstile", { b, turnstile })}</li>
          <li>{t.rich("recipients.external.googleAnalytics", { b })}</li>
          <li>{t.rich("recipients.external.resend", { b })}</li>
          <li>{t.rich("recipients.external.youtube", { b })}</li>
          <li>{t.rich("recipients.external.steam", { b })}</li>
          <li>{t.rich("recipients.external.github", { b })}</li>
          <li>{t.rich("recipients.external.notifications", { b })}</li>
        </ul>
        <p>{t("recipients.partners")}</p>
      </section>

      <section>
        <h2>{t("steamFallback.title")}</h2>
        <p>{t("steamFallback.body")}</p>
        <p>{t("steamFallback.notStored")}</p>
      </section>

      <section>
        <h2>{t("dataLocation.title")}</h2>
        <p>{t.rich("dataLocation.servers", { b })}</p>
        <p>{t("dataLocation.external")}</p>
      </section>

      <section>
        <h2>{t("rights.title")}</h2>
        <p>{t("rights.intro")}</p>
        <ul>
          <li>{t("rights.items.access")}</li>
          <li>{t("rights.items.rectify")}</li>
          <li>{t("rights.items.erase")}</li>
          <li>{t("rights.items.object")}</li>
        </ul>
        <p>
          {t.rich("rights.requests", { address: CONTACT_EMAIL, email, bot })}
        </p>
        <p>{t("rights.identification")}</p>
      </section>

      <section>
        <h2>{t("security.title")}</h2>
        <ul>
          <li>{t("security.items.roles")}</li>
          <li>{t("security.items.storage")}</li>
          <li>{t("security.items.passwords")}</li>
          <li>{t("security.items.tokens")}</li>
          <li>{t("security.items.secrets")}</li>
          <li>{t("security.items.encryption")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("notDone.title")}</h2>
        <ul>
          <li>{t("notDone.items.sell")}</li>
          <li>{t("notDone.items.account")}</li>
          <li>{t("notDone.items.screenshots")}</li>
          <li>{t("notDone.items.clipboard")}</li>
          <li>{t("notDone.items.machineId")}</li>
          <li>{t("notDone.items.ads")}</li>
          <li>{t("notDone.items.fingerprint")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("changes.title")}</h2>
        <p>{t("changes.body")}</p>
      </section>

      <section>
        <h2>{t("contactsTitle")}</h2>
        <ul>
          <li>
            <strong>{tLegal("emailLabel")}</strong> {email(CONTACT_EMAIL)}
          </li>
          <li>
            <strong>{tLegal("telegramLabel")}</strong> {bot(BOT_URL)}
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
