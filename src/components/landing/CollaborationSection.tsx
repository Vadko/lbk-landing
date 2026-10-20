import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { BOT_URL } from "@/lib/constants";
import { CardGridSection } from "../ui/CardGridSection";
import { HoverCard } from "../ui/HoverCard";

const CARDS = [
  { key: "addGame", icon: faRocket, link: BOT_URL, linkIcon: faTelegram },
  {
    key: "community",
    icon: faUsers,
    link: "https://t.me/LittleBitUA",
    linkIcon: faTelegram,
  },
  {
    key: "makeTranslation",
    icon: faBook,
    link: "/guides&tools",
    linkIcon: faBook,
  },
] as const;

export function CollaborationSection() {
  const t = useTranslations("landingCommunity");

  return (
    <CardGridSection
      id="collaboration"
      title={t("title")}
      columns={3}
      centerText
    >
      {CARDS.map((card, index) => (
        <HoverCard key={index} className="hover-card--big">
          <div className="collab-icon">
            <SvgIcon icon={card.icon} />
          </div>
          <h3>{t(`cards.${card.key}.title`)}</h3>
          <p>{t(`cards.${card.key}.description`)}</p>
          {card.link.includes("http") ? (
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-main collab-btn"
            >
              <SvgIcon icon={card.linkIcon} />
              {t(`cards.${card.key}.link`)}
            </a>
          ) : (
            <Link href={card.link} className="btn btn-main collab-btn">
              <SvgIcon icon={card.linkIcon} />
              {t(`cards.${card.key}.link`)}
            </Link>
          )}
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
