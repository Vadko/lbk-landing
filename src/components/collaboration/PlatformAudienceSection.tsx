import { getTranslations } from "next-intl/server";
import type { ComponentType, SVGProps } from "react";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import {
  BuildingIcon,
  GameConsoleIcon,
  GamepadIcon,
  GlobeIcon,
  UsersIcon,
} from "../icons";

const PLATFORM_AUDIENCE: Array<{
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  id: "localizationTeams" | "fanCommunities" | "indieStudios";
}> = [
  // {
  //   icon: GamepadIcon,
  //   label: "Розробники ігор",
  // },
  {
    icon: GlobeIcon,
    id: "localizationTeams",
  },
  {
    icon: UsersIcon,
    id: "fanCommunities",
  },
  // {
  //   icon: BuildingIcon,
  //   label: "Видавці ігор",
  // },
  {
    icon: GameConsoleIcon,
    id: "indieStudios",
  },
];

export async function PlatformAudienceSection() {
  const t = await getTranslations("collaboration.audience");

  return (
    <CardGridSection
      title={t("title")}
      columns={3}
      centerText
      className="collab-platform-audience"
    >
      {PLATFORM_AUDIENCE.map((item) => {
        const Icon = item.icon;
        return (
          <HoverCard key={item.id} className="collab-audience-card">
            <Icon aria-hidden className="color-accent" />
            <h3>{t(item.id)}</h3>
          </HoverCard>
        );
      })}
    </CardGridSection>
  );
}
