import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { GamepadIcon, GlobeIcon, UsersIcon } from "@/components/icons";
import { HoverCard } from "@/components/ui/HoverCard";

interface ValueCard {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const VALUE_CARDS: ValueCard[] = [
  {
    Icon: UsersIcon,
    title: "Висока залученість аудиторії",
    description: "Гравці активно використовують лаунчер щодня",
  },
  {
    Icon: GlobeIcon,
    title: "Передбачуваний охоплення",
    description: "Стабільні показники DAU та утримання",
  },
  {
    Icon: GamepadIcon,
    title: "Геймерська демографія",
    description: "Реклама показується у релевантному, природному середовищі",
  },
];

export function WhyAdvertisersChooseUs() {
  return (
    <section className="why-advertisers-section">
      <div className="container">
        <h2 className="why-advertisers__title">
          Чому рекламодавці обирають нас
        </h2>
        <div className="why-advertisers__grid">
          <HoverCard className="why-advertisers__main-card">
            <Image
              src="/assets/abstract-stat-image.svg"
              alt="+35% органічне зростання аудиторії"
              width={411}
              height={512}
            />
          </HoverCard>

          {/* Права колонка з трьома картками */}
          <div className="why-advertisers__cards">
            {VALUE_CARDS.map((card) => {
              const { Icon } = card;
              return (
                <HoverCard key={card.title} className="why-advertisers__card">
                  <div className="hover-card__icon">
                    <Icon width={32} height={32} aria-hidden />
                  </div>
                  <div className="card__content">
                    <h3 className="card__title">{card.title}</h3>
                    <p className="card__description">{card.description}</p>
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
