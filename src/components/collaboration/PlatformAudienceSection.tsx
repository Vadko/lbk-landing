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
  label: string;
}> = [
  // {
  //   icon: GamepadIcon,
  //   label: "Розробники ігор",
  // },
  {
    icon: GlobeIcon,
    label: "Локалізаційні команди",
  },
  {
    icon: UsersIcon,
    label: "Фанатські спільноти",
  },
  // {
  //   icon: BuildingIcon,
  //   label: "Видавці ігор",
  // },
  {
    icon: GameConsoleIcon,
    label: "Інді-студії",
  },
];

export function PlatformAudienceSection() {
  return (
    <CardGridSection
      title="Для кого ця платформа"
      columns={3}
      centerText
      className="collab-platform-audience"
    >
      {PLATFORM_AUDIENCE.map((item) => {
        const Icon = item.icon;
        return (
          <HoverCard key={item.label} className="collab-audience-card">
            <Icon aria-hidden className="collab-audience-icon" />
            <h3>{item.label}</h3>
          </HoverCard>
        );
      })}
    </CardGridSection>
  );
}
