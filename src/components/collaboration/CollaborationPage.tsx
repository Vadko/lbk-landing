import Image from "next/image";
import { PartnerValueSection } from "./PartnerValueSection";
import { PlatformAudienceSection } from "./PlatformAudienceSection";
import { HoverCard } from "../ui/HoverCard";

const FLOW_STEPS = [
  "Зареєструватися на платформі та створити профіль",
  "Пройти верифікацію, обліковий запис",
  "Додати переклад до гри та зберегти зміни в системі",
  "Отримати верифікацію перекладу",
  "Готово! Переклад стає доступним користувачам",
];

export function CollaborationPage() {
  return (
    <>
      <section className="container collab-hero">
        <h1>Додайте свій переклад у лаунчер</h1>
        <p>
          Сучасний дизайн, зручний інтерфейс і все потрібне для комфортної гри
          українською.
        </p>
        <a
          href="https://t.me/lbk_launcher_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-main btn--big collab-primary-btn"
        >
          Стати партнером
        </a>
      </section>

      <PartnerValueSection />

      <section className="container">
        <HoverCard className="collab-admin-panel">
          <div className="collab-admin-panel-card">
            <div className="hover-card__icon collab-admin-icon">
              <Image
                src="/assets/icons/fi_8750790.svg"
                alt=""
                aria-hidden
                width={32}
                height={32}
              />
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

      <section className="container collab-cta">
        <HoverCard>
          <h2>Готові до співпраці?</h2>
          <p>
            Зв&apos;яжіться з нами, щоб отримати детальну статистику та варіанти
            інтеграції.
          </p>
          <a
            href="https://t.me/lbk_launcher_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-main btn--big collab-primary-btn"
          >
            Зв&apos;язатись з нами
          </a>
        </HoverCard>
      </section>
    </>
  );
}
