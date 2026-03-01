"use client";

import type { ComponentType, SVGProps } from "react";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useCountUp } from "@/hooks/useCountUp";
import { useLandingStats } from "@/hooks/useLandingStats";

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

export function StatSection() {
  const { data: stats } = useLandingStats();

  const statsData: Array<{
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    number?: number;
    suffix?: string;
    title: string;
    description: string;
  }> = [
    {
      number: stats?.totalDownloads,
      title: "Завантажень",
      description: "Скільки завантажили перекладів за весь час",
    },
    {
      number: stats?.totalPlaytimeHours,
      title: "Годин",
      description: "Скільки часу награно з нашим лаунчером",
    },
    {
      number: stats?.totalCreators,
      title: "Творців",
      description: "Скільки творців перекладу з нами",
    },
  ];

  return (
    <CardGridSection
      id="stats"
      title="Нас обирають тисячі"
      columns={3}
      centerText
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
