import type { Metadata } from "next";

import Image from "next/image";
import { PartnersListSection } from "@/components/collaboration/PartnersListSection";
import { PartnersStatsSection } from "@/components/collaboration/PartnersStatsSection";
import { PartnerValueSection } from "@/components/collaboration/PartnerValueSection";
import { PlatformAudienceSection } from "@/components/collaboration/PlatformAudienceSection";
import { CodeIcon } from "@/components/icons";
import { CtaSection } from "@/components/ui/CtaSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { PageHeroSection } from "@/components/ui/PageHeroSection";

const FLOW_STEPS = [
  "Зареєструватися на платформі та створити профіль",
  "Пройти верифікацію профілю",
  "Додати переклад до гри та зберегти його у системі",
  "Дочекатися верифікацію перекладу",
  "І все! Переклад стає доступним гравцям",
];

export const metadata: Metadata = {
  title: "Співпраця з LBK Launcher",
  description:
    "Сторінка для партнерів LBK Launcher: переваги платформи, процес підключення перекладів і контакт для співпраці.",
};

export default function CollaborationRoutePage() {
  return (
    <>
      <PageHeroSection
        title="Додайте свій переклад у лаунчер"
        description="Сучасний дизайн, зручний інтерфейс і все потрібне для комфортної гри українською."
        ctaText="Додати переклад"
        ctaHref="https://admin.lbklauncher.com"
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

            <h2>
              Зручна адмін панель для розповсюдження фанатських перекладів
            </h2>
            <p>
              Ми надаємо партнерам спеціальну адмін панель для керування
              фанатськими перекладами, від завантаження до автоматичної доставки
              гравцям.
            </p>

            <ul className="collab-admin-list mobile-full">
              <li>Завантаження та оновлення перекладів</li>
              <li>Автоматична доставка гравцям</li>
              <li>Модерація та контроль версій</li>
            </ul>

            <a className="btn btn-main" href="https://admin.lbklauncher.com">
              Спробувати
            </a>
          </div>

          <Image
            src="/assets/collaboration-admin-panel.webp"
            alt="Адмін панель партнерів LBK Launcher"
            width={430}
            height={574}
          />
        </HoverCard>
      </section>

      <PlatformAudienceSection />

      <section className="container collab-flow">
        <HoverCard>
          <h2 className="section-title center">Як це працює?</h2>

          <ol className="collab-flow-list">
            {FLOW_STEPS.map((step, index) => (
              <li key={step}>
                <span className="collab-flow-number">{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </HoverCard>
      </section>

      <CtaSection
        title="Готові до співпраці?"
        description="Зв'яжіться з нами, щоб отримати детальну статистику та варіанти інтеграції."
        buttonText="Зв'язатися з нами"
        buttonHref="https://t.me/lbk_launcher_bot"
      />
    </>
  );
}
