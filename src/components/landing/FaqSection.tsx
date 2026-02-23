"use client";

import { useState } from "react";
import { useGamesCount } from "@/hooks/useGames";

const FAQ_ITEMS = [
  {
    question: "Як це працює?",
    answer:
      "Усе дуже просто: завантажте лаунчер — він автоматично знайде встановлені ігри на вашому пристрої. Оберіть потрібну гру й натисніть «Встановити переклад». Готово!",
  },
  {
    question: "Які ігри підтримуються?",
    answer: "games-count",
  },
  {
    question: "Чи безпечно використовувати LBK Launcher?",
    answer:
      "Так, лаунчер має відкритий вихідний код, що виключає наявність шкідливого ПЗ. Система резервного копіювання гарантує цілісність файлів вашої гри.",
  },
  {
    question: "Лаунчер безкоштовний?",
    answer:
      "Так, LBK Launcher повністю безкоштовний — і таким залишиться назавжди. Ми робимо це для української спільноти геймерів.",
  },
  {
    question: "Для яких платформ доступний лаунчер?",
    answer:
      "Ви можете завантажити LBK Launcher для Windows, Linux (AppImage) та macOS. Окрему увагу приділено підтримці Steam Deck",
  },
  {
    question: "Як додати свій переклад до лаунчера?",
    answer:
      "Напишіть нам у Telegram через бота @lbk_launcher_bot. Обговоримо деталі й допоможемо інтегрувати ваш переклад — швидко та просто!",
  },
  {
    question: "Звідки беруться переклади?",
    answer:
      "Ми співпрацюємо з провідними командами перекладачів та інді-авторами. Ви також можете додати свій переклад до нашого каталогу через Telegram-бота.",
  },
  {
    question: "На чому зроблений лаунчер?",
    answer: "tech-stack",
  },
  {
    question: "Як видалити переклад і повернути оригінал?",
    answer:
      "Оберіть гру в лаунчері й натисніть кнопку «Видалити переклад». Лаунчер автоматично відновить оригінальні файли з резервної копії.",
  },
  {
    question: "Якщо я зіштовхнувся з проблемою?",
    answer:
      "Зверніться до нашої служби підтримки через Telegram-бота @lbk_launcher_bot. Ми допоможемо вирішити будь-які проблеми швидко та ефективно.",
  },
];

const TECH_STACK = [
  {
    name: "Electron 39 + Vite",
    desc: "настільний фреймворк та швидке збирання",
  },
  { name: "React 18 + TypeScript", desc: "інтерфейс користувача" },
  { name: "Tailwind CSS", desc: "стилі та дизайн" },
  { name: "Framer Motion", desc: "плавні анімації інтерфейсу" },
  { name: "Zustand", desc: "керування станом застосунку" },
  {
    name: "better-sqlite3",
    desc: "локальна база даних для швидкої роботи офлайн",
  },
  { name: "Supabase", desc: "синхронізація даних та realtime оновлення" },
  { name: "electron-builder", desc: "білд та автооновлення" },
  { name: "Lucide React", desc: "іконки" },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: gamesCount } = useGamesCount();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderAnswer = (answer: string) => {
    if (answer === "tech-stack") {
      return (
        <ul className="tech-stack">
          {TECH_STACK.map((tech, i) => (
            <li key={i}>
              <strong>{tech.name}</strong> — {tech.desc}
            </li>
          ))}
        </ul>
      );
    }
    if (answer === "games-count") {
      return (
        <p>
          Наразі підтримується {gamesCount}+ ігор, і цей список постійно
          поповнюється. Серед них — популярні AAA-тайтли, інді-ігри та класика.
          Повний перелік доступний у самому лаунчері.
        </p>
      );
    }
    return <p>{answer}</p>;
  };

  const column1: typeof FAQ_ITEMS = [];
  const column2: typeof FAQ_ITEMS = [];

  FAQ_ITEMS.forEach((item, index) => {
    if (index % 2 === 0) column1.push(item);
    else column2.push(item);
  });

  const renderFaqItem = (
    item: (typeof FAQ_ITEMS)[0],
    originalIndex: number
  ) => (
    <div
      key={originalIndex}
      className={`faq-item ${openIndex === originalIndex ? "active" : ""}`}
    >
      <button className="faq-question" onClick={() => toggle(originalIndex)}>
        <span>{item.question}</span>
        <i className="fa-solid fa-chevron-down" />
      </button>

      <div className="faq-answer">{renderAnswer(item.answer)}</div>
    </div>
  );

  return (
    <section id="faq" className="faq-sec">
      <div className="container">
        <h2 className="section-title center">Часті питання</h2>

        <div className="faq-list">
          <div className="faq-column">
            {column1.map((item, idx) => renderFaqItem(item, idx * 2))}
          </div>
          <div className="faq-column">
            {column2.map((item, idx) => renderFaqItem(item, idx * 2 + 1))}
          </div>
        </div>
      </div>
    </section>
  );
}
