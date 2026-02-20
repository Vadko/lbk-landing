import type { Metadata } from "next";
import { LegalLayout } from "../legal-layout";

export const metadata: Metadata = {
  title: "Політика приватності",
  description:
    "Політика приватності LBK Launcher. Дізнайтеся, як ми збираємо, використовуємо та захищаємо ваші персональні дані.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lbklauncher.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Політика приватності" lastUpdated="20 лютого 2026">
      <section>
        <p>
          Ми цінуємо вашу приватність і збираємо лише ті дані, які необхідні для
          стабільної роботи продукту.
        </p>
      </section>

      <section>
        <h4>Які дані ми збираємо?</h4>
        <ul>
          <li>
            <strong>На сайті:</strong> Використовується{" "}
            <strong>Google Analytics</strong> для аналізу трафіку, популярності
            ігор та ефективності інтерфейсу. Збираються стандартні технічні дані
            (тип браузера, країна, час перебування).
          </li>
          <li>
            <strong>У десктоп-клієнті:</strong> Ми використовуємо{" "}
            <strong>Mixpanel</strong> для відстеження технічних івентів
            (успішність завантаження файлів, помилки встановлення, версія ОС).
          </li>
        </ul>
      </section>

      <section>
        <h4>Безпека та анонімність</h4>
        <ul>
          <li>
            <strong>Деанонімізація:</strong> Усі зібрані дані є анонімними. Ми
            не збираємо ваші імена, паролі чи платіжну інформацію.
          </li>
          <li>
            <strong>Передача третім особам:</strong> Ми{" "}
            <strong>не продаємо</strong> ваші дані. Технічна інформація
            передається лише аналітичним платформам (Google, Mixpanel) виключно
            для внутрішнього аналізу.
          </li>
        </ul>
        <p>
          <strong>Прозорість:</strong> Ви завжди можете дізнатися, які саме
          івенти відправляє клієнт, вивчивши відкритий код фронтенду (GNU GPL
          v3).
        </p>
      </section>

      <section>
        <h4>Контакти</h4>
        <p>Якщо у вас є будь-які питання, звертайтесь:</p>
        <ul>
          <li>
            <strong>Email: </strong>
            <a
              target="_blank"
              href="mailto:pr@gameglobe-localisation.com"
              rel="noopener noreferrer"
            >
              pr@gameglobe-localisation.com
            </a>
          </li>
          <li>
            <strong>Telegram: </strong>
            <a
              href="https://t.me/lbk_launcher_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://t.me/lbk_launcher_bot
            </a>
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
