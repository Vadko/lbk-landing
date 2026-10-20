import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ComponentType, SVGProps } from "react";
import { GamepadIcon, GlobeIcon, UsersIcon } from "@/components/icons";
import { HoverCard } from "@/components/ui/HoverCard";

interface ValueCard {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  id: "engagement" | "reach" | "demographics";
}

const VALUE_CARDS: ValueCard[] = [
  {
    Icon: UsersIcon,
    id: "engagement",
  },
  {
    Icon: GlobeIcon,
    id: "reach",
  },
  {
    Icon: GamepadIcon,
    id: "demographics",
  },
];

export async function WhyAdvertisersChooseUs() {
  const t = await getTranslations("advertisers.why");

  return (
    <section className="why-advertisers-section">
      <div className="container">
        <h2 className="section-title">{t("title")}</h2>
        <div className="why-advertisers__grid">
          <HoverCard className="why-advertisers__main-card">
            <Image
              src="/assets/abstract-stat-image.svg"
              alt={t("imageAlt")}
              width={411}
              height={512}
            />
          </HoverCard>

          {/* Права колонка з трьома картками */}
          <div className="why-advertisers__cards">
            {VALUE_CARDS.map((card) => {
              const { Icon } = card;
              return (
                <HoverCard key={card.id} className="why-advertisers__card">
                  <div className="hover-card__icon">
                    <Icon width={32} height={32} aria-hidden />
                  </div>
                  <div className="card__content">
                    <h3>{t(`${card.id}.title`)}</h3>
                    <p>{t(`${card.id}.description`)}</p>
                  </div>
                </HoverCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
