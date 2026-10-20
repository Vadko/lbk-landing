import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function SupportSection() {
  const t = await getTranslations("donaters.support");

  return (
    <section className="support-section">
      <div className="container">
        <div className="support-card glass-bg">
          <Image
            src="/assets/help-box.svg"
            alt={t("imageAlt")}
            width={155}
            height={150}
          />

          <div className="support-card__content">
            <h2 className="support-card__title">{t("title")}</h2>
            <p className="support-card__description">{t("description")}</p>
          </div>
          <div className="support-card__actions">
            <a
              className="btn btn-main"
              target="_blank"
              rel="noopener noreferrer"
              href="https://donatello.to/atlantDeMaPeine?g=pidtrimka-roboti-lbk-launcher"
            >
              {t("donate")}
            </a>
            <Link
              className="btn glass-bg"
              href="/#showcase"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
