import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { BOT_URL } from "@/lib/constants";
import { LegalLayout } from "../../legal-layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("playerTerms");

  return {
    title: t("title"),
    description: t("metaDescription"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://lbklauncher.com/terms/players",
    },
  };
}

const b = (chunks: ReactNode) => <strong>{chunks}</strong>;

export default async function TermsPlayersPage() {
  const t = await getTranslations("playerTerms");
  const tLegal = await getTranslations("legalLayout");

  return (
    <LegalLayout title={t("title")} lastUpdated={t("lastUpdated")}>
      <section>
        <p>
          {t.rich("intro", {
            b,
            site: (chunks) => (
              <a
                href="https://lbklauncher.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
        <p>{t.rich("parties", { b })}</p>
      </section>

      <section>
        <h4>{t("definitions.title")}</h4>
        <ul>
          <li>{t.rich("definitions.country", { b })}</li>
          <li>{t.rich("definitions.service", { b })}</li>
          <li>
            {t.rich("definitions.website", {
              b,
              link: (chunks) => (
                <a
                  href="https://ggloc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </li>
          <li>{t.rich("definitions.you", { b })}</li>
        </ul>
      </section>

      <section>
        <h4>{t("licensing.title")}</h4>
        <ul>
          <li>{t.rich("licensing.frontend", { b })}</li>
          <li>{t.rich("licensing.backend", { b })}</li>
          <li>{t.rich("licensing.content", { b })}</li>
        </ul>
      </section>

      <section>
        <h4>{t("liability.title")}</h4>
        <p>{t("liability.body")}</p>
        <p className="text-sm text-text-main font-semibold leading-relaxed">
          {t("liability.warning")}
        </p>
      </section>

      <section>
        <h4>{t("contacts.title")}</h4>
        <p className="text-sm text-text-muted leading-relaxed mb-2">
          {t("contacts.intro")}
        </p>
        <ul>
          <li>
            <strong>{tLegal("emailLabel")} </strong>
            <a
              href="mailto:pr@gameglobe-localisation.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              pr@gameglobe-localisation.com
            </a>
          </li>
          <li>
            <strong>{tLegal("telegramLabel")} </strong>
            <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
              {BOT_URL}
            </a>
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
