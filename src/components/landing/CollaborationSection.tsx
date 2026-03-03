import { CardGridSection } from "../ui/CardGridSection";

const CARDS = [
  {
    icon: "fa-solid fa-rocket",
    title: "Додайте свою гру",
    description:
      "Український переклад вашої гри стане доступний тисячам користувачів.",
    link: "https://t.me/lbk_launcher_bot",
    linkText: "Написати нам",
    linkIcon: "fa-brands fa-telegram",
    isGithub: false,
  },
  {
    icon: "fa-solid fa-users",
    title: "Спільнота",
    description:
      "Приєднуйтеся до нашого Telegram-каналу — для новин, пропозицій і спілкування.",
    link: "https://t.me/LittleBitUA",
    linkText: "Приєднатися",
    linkIcon: "fa-brands fa-telegram",
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
            <i className={card.icon} />
          </div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-main collab-btn}`}
          >
            <i className={card.linkIcon} />
            {card.linkText}
          </a>
        </div>
      ))}
    </CardGridSection>
  );
}
