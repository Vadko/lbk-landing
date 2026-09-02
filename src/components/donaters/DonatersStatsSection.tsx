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

export function DonatersStatsSection() {
  const statsData: Array<{
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    number?: number;
    suffix?: string;
    title: string;
    description: string;
  }> = [
    {
      number: 104.5,
      suffix: "K",
      title: "Всього зібрано",
      description: "За весь час існування проєкту",
    },
    {
      number: 812,
      title: "Донатерів",
      description: "Унікальних користувачів, що підтримали нас",
    },
  ];

  return (
    <CardGridSection id="donaters-stats" columns={2} centerText>
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
