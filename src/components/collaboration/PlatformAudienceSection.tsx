import Image from "next/image";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";

const PLATFORM_AUDIENCE = [
  {
    icon: "/assets/icons/fi_12250131.svg",
    label: "Розробники ігор",
  },
  {
    icon: "/assets/icons/fi_11502452.svg",
    label: "Локалізаційні команди",
  },
  {
    icon: "/assets/icons/fi_2118701.svg",
    label: "Фанатські спільноти",
  },
  {
    icon: "/assets/icons/fi_8621847.svg",
    label: "Видавці ігор",
  },
  {
    icon: "/assets/icons/fi_4489681.svg",
    label: "Інді-студії",
  },
];

export function PlatformAudienceSection() {
  return (
    <CardGridSection
      title="Для кого ця платформа"
      columns={5}
      centerText
      className="collab-platform-audience"
    >
      {PLATFORM_AUDIENCE.map((item) => (
        <HoverCard key={item.label} className="collab-audience-card">
          <Image
            src={item.icon}
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="collab-audience-icon"
          />
          <h3>{item.label}</h3>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
