import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { CardGridSection } from "../ui/CardGridSection";

const CARDS = [
  {
    icon: faRocket,
    title: "Додайте свою гру",
    description:
      "Український переклад вашої гри стане доступний тисячам користувачів.",
    link: "https://t.me/lbk_launcher_bot",
    linkText: "Написати нам",
    linkIcon: faTelegram,
    isGithub: false,
  },
  {
    icon: faUsers,
    title: "Спільнота",
    description:
      "Приєднуйтеся до нашого Telegram-каналу — для новин, пропозицій і спілкування.",
    link: "https://t.me/LittleBitUA",
    linkText: "Приєднатися",
    linkIcon: faTelegram,
    isGithub: false,
  },
];

export function CollaborationSection() {
  return (
    <CardGridSection
      id="collaboration"
      title="Приєднуйтесь до спільноти"
      columns={2}
      centerText
    >
      {CARDS.map((card, index) => (
        <div key={index} className="collab-card">
          <div className="collab-icon">
            <SvgIcon icon={card.icon} />
          </div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-main collab-btn}`}
          >
            <SvgIcon icon={card.linkIcon} />
            {card.linkText}
          </a>
        </div>
      ))}
    </CardGridSection>
  );
}
