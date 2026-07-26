"use client";

import type { ComponentType, SVGProps } from "react";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const { value: animatedValue, ref } = useCountUp({
    end: value,
    duration: 2000,
  });
  return (
    <div ref={ref}>
      {animatedValue}
      {suffix}
    </div>
  );
}

export function PartnersStatsSection() {
  const statsData: Array<{
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    number?: number;
    suffix?: string;
    title: string;
    description: string;
  }> = [
    {
      number: 34168,
      title: "Перекладачів з нами",
      description: "Активні команди та окремі перекладачі",
    },
    {
      number: 26,
      title: "Завантажень на переклад",
      description: "Скільки завантажень перекладу ви можете отримати",
    },
    {
      number: 26,
      title: "Користувачів підтримало",
      description: "Скільки раз вже підтримали перекладачів",
    },
  ];

  return (
    <CardGridSection
      id="collaboration-stats"
      columns={3}
      centerText
      title="Наші цифри"
    >
      {statsData.map((feature, index) => {
        const { Icon } = feature;
        return (
          <HoverCard key={index} className="hover-card--big">
            {Icon && (
              <div className="hover-card__icon">
                <Icon width={32} height={32} aria-hidden />
              </div>
            )}
            <div className="hover-card__number">
              {typeof feature.number === "number" ? (
                <AnimatedNumber
                  value={feature.number}
                  suffix={feature.suffix}
                />
              ) : (
                <div className="spinner" style={{ margin: "0 auto" }} />
              )}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </HoverCard>
        );
      })}
    </CardGridSection>
  );
}
