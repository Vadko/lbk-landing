"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useGamesCount } from "@/hooks/useGames";
import { BOT_URL } from "@/lib/constants";

const FAQ_ITEMS = [
  "howItWorks",
  "games",
  "safety",
  "free",
  "platforms",
  "addTranslation",
  "workshop",
  "workshopUpdates",
  "sources",
  "techStack",
  "uninstall",
  "support",
] as const;

type FaqItem = (typeof FAQ_ITEMS)[number];

const botLink = (chunks: React.ReactNode) => (
  <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
    {chunks}
  </a>
);

export function FaqSection() {
  const t = useTranslations("landingFaq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: gamesCount } = useGamesCount();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderAnswer = (item: FaqItem) => {
    switch (item) {
      case "techStack":
        return (
          <p>
            {t.rich("items.techStack.answer", {
              link: (chunks) => <Link href="/tech-stack">{chunks}</Link>,
            })}
          </p>
        );
      case "games":
        return (
          <p>
            {t("items.games.answer", {
              count: String(gamesCount ?? ""),
            })}
          </p>
        );
      case "addTranslation":
      case "support":
        return <p>{t.rich(`items.${item}.answer`, { bot: botLink })}</p>;
      default:
        return <p>{t(`items.${item}.answer`)}</p>;
    }
  };

  const column1: FaqItem[] = [];
  const column2: FaqItem[] = [];

  FAQ_ITEMS.forEach((item, index) => {
    if (index % 2 === 0) {
      column1.push(item);
    } else {
      column2.push(item);
    }
  });

  const renderFaqItem = (item: FaqItem, originalIndex: number) => (
    <div
      key={originalIndex}
      className={`faq-item glass-bg ${openIndex === originalIndex ? "active" : ""}`}
    >
      <button className="faq-question" onClick={() => toggle(originalIndex)}>
        <span>{t(`items.${item}.question`)}</span>
        <SvgIcon icon={faChevronDown} />
      </button>

      <div className="faq-answer">{renderAnswer(item)}</div>
    </div>
  );

  return (
    <section id="faq" className="section-margin">
      <div className="container">
        <h2 className="section-title center">{t("title")}</h2>

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
