import type { ComponentType, SVGProps } from "react";
import {
  CodeIcon,
  DownloadIcon,
  GlobeIcon,
  GrowthIcon,
  HeartIcon,
  RocketIcon,
  UsersIcon,
} from "@/components/icons";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";

const PARTNER_VALUE_CARDS: Array<{
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  span?: boolean;
  description: string;
}> = [
  {
    Icon: GrowthIcon,
    title: "Зростання аудиторії",
    span: true,
    description:
      "Додавання перекладу у сервіс, що вже зібрало більше 20+ тисяч гравців..",
  },
  {
    Icon: DownloadIcon,
    title: "Зручність гри та поширення",
    description: "Зручно для ваших гравців завантажити та встановити переклад.",
  },
  {
    Icon: HeartIcon,
    title: "Підтримка спільноти",
    description:
      "Велика частка користувачів активно підтримує ініціативи спільноти.",
  },
  {
    Icon: UsersIcon,
    title: "Steam-куратор LBK",
    description: "Додавання вашого перекладу у Steam-куратор LBK.",
  },
  {
    Icon: RocketIcon,
    title: "Відгуки без форм",
    description: "Можливість збирати відгуки від користувачів без гугл-форми.",
  },
  {
    Icon: GlobeIcon,
    title: "Драфт для посібника",
    description: "Змога отримати драфт для вашого Steam-посібника.",
  },
  {
    Icon: CodeIcon,
    title: "Максимум посилань",
    span: true,
    description:
      "Створення сторінки з максимальною к-стю посилань, а також додаткове поширення в пошуку.",
  },
];

export function PartnerValueSection() {
  return (
    <CardGridSection
      title="Цінність для партнерів"
      columns={3}
      centerText
      className="collab-partner-value"
    >
      {PARTNER_VALUE_CARDS.map((card) => {
        const { Icon } = card;
        return (
          <HoverCard
            key={card.title}
            className={`hover-card--big collab-value-card${card.span ? " collab-value-card--span" : ""}`}
          >
            <div className="hover-card__icon">
              <Icon width={32} height={32} aria-hidden />
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </HoverCard>
        );
      })}
    </CardGridSection>
  );
}
