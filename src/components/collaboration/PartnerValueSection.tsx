import type { ComponentType, SVGProps } from "react";
import { DownloadIcon, GrowthIcon, HeartIcon } from "@/components/icons";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";

const PARTNER_VALUE_CARDS: Array<{
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}> = [
  {
    Icon: GrowthIcon,
    title: "Зростання аудиторії",
    description:
      "Щоденний притік нових користувачів без великих витрат на залучення.",
  },
  {
    Icon: DownloadIcon,
    title: "Зручність гри та поширення",
    description: "Процес централізованого розповсюдження перекладів.",
  },
  {
    Icon: HeartIcon,
    title: "Підтримка спільноти",
    description:
      "Велика кількість користувачів активно підтримує ініціативи спільноти.",
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
            className="hover-card--big collab-value-card"
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
