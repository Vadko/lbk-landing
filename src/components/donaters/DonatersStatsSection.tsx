"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("donaters.stats");
  const statsData: Array<{
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    number?: number;
    suffix?: string;
    id: "collected" | "donors";
  }> = [
    {
      number: 114,
      suffix: "K",
      id: "collected",
    },
    {
      number: 858,
      id: "donors",
    },
  ];

  return (
    <CardGridSection id="donaters-stats" columns={2} centerText>
      {statsData.map((feature) => {
        const { Icon } = feature;
        return (
          <HoverCard key={feature.id} className="hover-card--big">
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
            <h3>{t(`${feature.id}.title`)}</h3>
            <p>{t(`${feature.id}.description`)}</p>
          </HoverCard>
        );
      })}
    </CardGridSection>
  );
}
