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
    question: "Чи безпечно використовувати LBK Launcher?",
    answer:
      "Так, лаунчер має відкритий вихідний код, що виключає наявність шкідливого ПЗ. Система резервного копіювання гарантує цілісність файлів вашої гри.",
  },
  {
    question: "Як видалити переклад і повернути оригінал?",
    answer:
      "Оберіть гру в лаунчері й натисніть кнопку «Видалити переклад». Лаунчер автоматично відновить оригінальні файли з резервної копії.",
  },
  {
    question: "Які ігри підтримуються?",
    answer: "games-count",
  },
  {
    question: "Лаунчер безкоштовний?",
    answer:
      "Так, LBK Launcher повністю безкоштовний — і таким залишиться назавжди. Ми робимо це для української спільноти геймерів.",
  },
  {
    question: "Як додати свій переклад до лаунчера?",
    answer:
      "Напишіть нам у Telegram через бота @lbk_launcher_bot. Обговоримо деталі й допоможемо інтегрувати ваш переклад — швидко та просто!",
  },
  {
    question: "На чому зроблений лаунчер?",
    answer: "tech-stack",
  },
  {
    question: "Для яких платформ доступний лаунчер?",
    answer: "Ви можете завантажити LBK Launcher для Windows, Linux (AppImage) та macOS. Окрему увагу приділено підтримці Steam Deck",
  },
  {
    question: "Звідки беруться переклади?",
    answer: "Ми співпрацюємо з провідними командами перекладачів та інді-авторами. Ви також можете додати свій переклад до нашого каталогу через Telegram-бота.",
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

  return (
    <section id="faq" className="faq-sec">
      <div className="container">
        <h2 className="section-title center">Часті питання</h2>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggle(index)}>
                <span>{item.question}</span>
                <i className="fa-solid fa-chevron-down" />
              </button>

              <div className="faq-answer">{renderAnswer(item.answer)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
