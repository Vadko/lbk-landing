import { getTranslations } from "next-intl/server";
import { AnimatedMill } from "./AnimatedMill";
import { MillIcon } from "./MillIcon";

export async function MaintenancePage() {
  const t = await getTranslations("maintenance");

  return (
    <section className="maintenance-page">
      <div className="maintenance-content">
        <AnimatedMill>
          <MillIcon className="maintenance-mill" />
        </AnimatedMill>
        <h1 className="maintenance-title">{t("title")}</h1>
        <p className="maintenance-text">{t("text")}</p>
        <div className="maintenance-status">
          <span className="maintenance-status-dot" />
          <span>{t("status")}</span>
        </div>
      </div>
    </section>
  );
}
