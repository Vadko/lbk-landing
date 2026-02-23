import type { Metadata } from "next";
import { LegalLayout } from "../../legal-layout";

export const metadata: Metadata = {
  title: "Правила користування",
  description:
    "Умови використання LBK Launcher для гравців. Правила користування програмою та встановлення українізаторів.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lbklauncher.com/terms/players",
  },
};

export default function TermsPlayersPage() {
  return (
    <LegalLayout title="Правила користування" lastUpdated="6 лютого 2026">
      <section>
        <p>
          Ці Умови регулюють використання сайту{" "}
          <a
            href="https://lbklauncher.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            lbklauncher.com
          </a>{" "}
          та десктопного клієнта <strong>LBK Launcher</strong>.
        </p>
        <p>
          <strong>Сторони:</strong> LBK Team (GameGlobe Localization та Little
          Bit) та Користувач &quot;ви&quot;, продуктів LBK Team - сайту та
          десктоп клієнту (ланчеру).
        </p>
      </section>

      <section>
        <h4>Визначення та ключові терміни</h4>
        <ul>
          <li>
            <strong>Країна:</strong> країна, де розташована LBK Team або її
            власники/засновники, у цьому випадку — Україна.
          </li>
          <li>
            <strong>Сервіс:</strong> послуга, яку надає GameGlobe Localization
            (вул. Металістів, 4, Київ, 02000) та Little Bit, як описано у
            відповідних умовах (якщо доступно) та на цій платформі.
          </li>
          <li>
            <strong>Вебсайт:</strong> сайт GameGlobe Localization, доступний за
            URL:{" "}
            <a
              href="https://ggloc.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ggloc.org/
            </a>
            .
          </li>
          <li>
            <strong>Ви:</strong> особа або організація, що користуються
            сервісами від GameGlobe Localization та Little Bit для використання
            Сервісів.
          </li>
        </ul>
      </section>

      <section>
        <h4>Ліцензування та інтелектуальна власність</h4>
        <ul>
          <li>
            <strong>Front-end клієнта:</strong> Вихідний код графічного
            інтерфейсу та клієнтської частини є відкритим і поширюється під
            ліцензією <strong>GNU GPL v3</strong>. Ви маєте право модифікувати
            та поширювати його згідно з умовами цієї ліцензії.
          </li>
          <li>
            <strong>Back-end та API:</strong> Вся серверна частина, бази даних
            та логіка API є виключною інтелектуальною власністю{" "}
            <strong>LBK Team</strong>. Будь-які спроби несанкціонованого
            доступу, брутфорсу, реверс-інжинірингу серверних протоколів або
            втручання в роботу серверної інфраструктури{" "}
            <strong>суворо заборонені</strong>.
          </li>
          <li>
            <strong>Контент (Переклади):</strong> Усі локалізації, доступні в
            лаунчері, за ліцензією для кінцевого користувача з обмеженням лише
            для некомерційного приватного використання. Вони призначені виключно
            для особистого ознайомлення та некомерційного використання. Ви не
            маєте права перепродавати або використовувати ці файли у комерційних
            продуктах без дозволу правовласників.
          </li>
        </ul>
      </section>

      <section>
        <h4>Обмеження відповідальності</h4>
        <p>
          Програмне забезпечення надається за принципом &quot;as is&quot; (як
          є). LBK Team не несе відповідальності за можливі конфлікти з
          античитами ігор, технічні збої або втрату ігрового прогресу,
          спричинені встановленням перекладів.
        </p>
        <p className="text-sm text-text-main font-semibold leading-relaxed">
          ВИ ВИКОРИСТОВУЄТЕ ЛАУНЧЕР НА ВЛАСНИЙ РИЗИК. МИ НЕ ГАРАНТУЄМО
          ВІДСУТНІСТЬ БАНІВ В ОНЛАЙН-ІГРАХ
        </p>
      </section>

      <section>
        <h4>Контакти</h4>
        <p className="text-sm text-text-muted leading-relaxed mb-2">
          Якщо у вас є будь-які питання, звертайтесь:
        </p>
        <ul>
          <li>
            <strong>Email: </strong>
            <a
              href="mailto:pr@gameglobe-localisation.com"
              target="_blank"
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
