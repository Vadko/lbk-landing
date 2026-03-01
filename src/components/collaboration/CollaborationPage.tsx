import Image from "next/image";
import { PageHeroSection } from "@/components/ui/PageHeroSection";
import { CodeIcon } from "../icons";
import { CtaSection } from "../ui/CtaSection";
import { HoverCard } from "../ui/HoverCard";
import { PartnerValueSection } from "./PartnerValueSection";
import { PlatformAudienceSection } from "./PlatformAudienceSection";

const FLOW_STEPS = [
  "Зареєструйтеся на платформі та створіть профіль",
  "Пройти верифікацію профілю",
  "Додати переклад до гри та зберегти його у системі",
  "Дочекатися верифікацію перекладу",
  "І все! Переклад стає доступним гравцям",
];

export function CollaborationPage() {
  return (
    <>
      <PageHeroSection
        title="Додайте свій переклад у лаунчер"
        description="Сучасний дизайн, зручний інтерфейс і все потрібне для комфортної гри українською."
        ctaText="Стати партнером"
        ctaHref="https://t.me/lbk_launcher_bot"
        className="collab-hero"
      />

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
              Ми надаємо партнерам спеціальну адмінпанель для керування
              фанатськими перекладами, від завантаження до автоматичної доставки
              гравцям.
            </p>

            <ul className="collab-admin-list">
              <li>Завантаження та оновлення перекладів</li>
              <li>Автоматична доставка гравцям</li>
              <li>Модерація та контроль версій</li>
            </ul>
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
        buttonText="Зв'язатись з нами"
        buttonHref="https://t.me/lbk_launcher_bot"
      />
    </>
  );
}
