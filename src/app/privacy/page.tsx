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
    <LegalLayout title="Політика приватності" lastUpdated="23 червня 2026">
      <section>
        <p>
          Ми цінуємо вашу приватність і збираємо лише ті дані, які необхідні для
          стабільної роботи продукту.
        </p>
      </section>

      <section>
        <h2>Які дані ми збираємо?</h2>

        <h3>На сайті</h3>
        <p>
          Використовується <strong>Google Analytics</strong> для аналізу типу
          трафіку, популярності ігор та ефективності інтерфейсу. Збираються
          стандартні технічні дані: тип браузера, країна, час перебування.
        </p>

        <h3>У десктоп-клієнті</h3>
        <p>
          <strong>Mixpanel</strong> — для відстеження технічних та продуктових
          івентів:
        </p>
        <ul>
          <li>взаємодія зі сторінками клієнту;</li>
          <li>взаємодія з елементами на сторінках клієнту;</li>
          <li>успішність завантаження файлів;</li>
          <li>помилки встановлення;</li>
          <li>версія ОС.</li>
        </ul>

        <p>
          <strong>LBK Analytics</strong> — для server-side аналітики:
        </p>
        <ul>
          <li>комунікація даних між сервером та клієнтом;</li>
          <li>кількість завантажень файлів;</li>
          <li>помилки встановлення;</li>
          <li>версія ОС.</li>
        </ul>
      </section>

      <section>
        <h2>Безпека та анонімність</h2>

        <h3>Деанонімізація</h3>
        <p>
          Усі зібрані дані є анонімними. Аналітичні платформи генерують
          унікальний ID. Ми не збираємо ваші імена, паролі чи платіжну
          інформацію.
        </p>

        <h3>Передача третім особам</h3>
        <p>
          Ми <strong>не продаємо</strong> ваші персоналізовані дані, вподобання,
          список ігор чи іншу інформацію. Технічна інформація передається лише
          аналітичним платформам (Google, Mixpanel, LBK Analytics) виключно для
          внутрішнього аналізу.
        </p>

        <h3>Прозорість</h3>
        <p>
          Ви завжди можете дізнатися, які саме івенти відправляє клієнт,
          вивчивши відкритий код фронтенду (GNU GPL v3).
        </p>
      </section>

      <section>
        <h2>Контакти</h2>
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
