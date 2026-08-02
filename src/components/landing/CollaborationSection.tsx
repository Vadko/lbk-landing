import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import Link from "next/link";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { CardGridSection } from "../ui/CardGridSection";
import { HoverCard } from "../ui/HoverCard";

const CARDS = [
  {
    icon: faRocket,
    title: "Додайте свою гру",
    description:
      "Український переклад вашої гри стане доступний тисячам користувачів.",
    link: "https://t.me/lbk_launcher_bot",
    linkText: "Написати нам",
    linkIcon: faTelegram,
  },
  {
    icon: faUsers,
    title: "Спільнота",
    description:
      "Приєднуйтеся до нашого Telegram-каналу — для новин, пропозицій і спілкування.",
    link: "https://t.me/LittleBitUA",
    linkText: "Приєднатися",
    linkIcon: faTelegram,
  },
  {
    icon: faBook,
    title: "Зробіть свій переклад",
    description:
      "Список корисних матеріалів, що стануть у нагоді, якщо ви хочете спробувати.",
    link: "/guides&tools",
    linkText: "Спробувати",
    linkIcon: faBook,
  },
];

export function CollaborationSection() {
  return (
    <CardGridSection
      id="collaboration"
      title="Приєднуйтеся до спільноти"
      columns={3}
      centerText
    >
      {CARDS.map((card, index) => (
        <HoverCard key={index} className="hover-card--big">
          <div className="collab-icon">
            <SvgIcon icon={card.icon} />
          </div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          {card.link.includes("http") ? (
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-main collab-btn"
            >
              <SvgIcon icon={card.linkIcon} />
              {card.linkText}
            </a>
          ) : (
            <Link href={card.link} className="btn btn-main collab-btn">
              <SvgIcon icon={card.linkIcon} />
              {card.linkText}
            </Link>
          )}
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
