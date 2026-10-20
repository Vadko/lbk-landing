import { getTranslations } from "next-intl/server";
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
  id:
    | "growth"
    | "convenience"
    | "community"
    | "curator"
    | "feedback"
    | "guideDraft"
    | "links";
  span?: boolean;
}> = [
  {
    Icon: GrowthIcon,
    id: "growth",
    span: true,
  },
  {
    Icon: DownloadIcon,
    id: "convenience",
  },
  {
    Icon: HeartIcon,
    id: "community",
  },
  {
    Icon: UsersIcon,
    id: "curator",
  },
  {
    Icon: RocketIcon,
    id: "feedback",
  },
  {
    Icon: GlobeIcon,
    id: "guideDraft",
  },
  {
    Icon: CodeIcon,
    id: "links",
    span: true,
  },
];

export async function PartnerValueSection() {
  const t = await getTranslations("collaboration.value");

  return (
    <CardGridSection
      title={t("title")}
      columns={3}
      centerText
      className="collab-partner-value"
    >
      {PARTNER_VALUE_CARDS.map((card) => {
        const { Icon } = card;
        return (
          <HoverCard
            key={card.id}
            className={`hover-card--big collab-value-card${card.span ? " collab-value-card--span" : ""}`}
          >
            <div className="hover-card__icon">
              <Icon width={32} height={32} aria-hidden />
            </div>
            <h3>{t(`${card.id}.title`)}</h3>
            <p>{t(`${card.id}.description`)}</p>
          </HoverCard>
        );
      })}
    </CardGridSection>
  );
}
