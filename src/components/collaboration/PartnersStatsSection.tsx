"use client";

import { useTranslations } from "next-intl";
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

export function PartnersStatsSection() {
  const { data: stats } = useLandingStats();
  const t = useTranslations("collaboration.stats");

  const statsData: Array<{
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    number?: number;
    suffix?: string;
    id: "creators" | "downloads" | "supporters";
  }> = [
    {
      number: stats?.totalCreators,
      id: "creators",
    },
    {
      number: stats?.totalDownloads,
      id: "downloads",
    },
    {
      number: stats?.totalSupporters,
      id: "supporters",
    },
  ];

  return (
    <CardGridSection
      id="collaboration-stats"
      columns={3}
      centerText
      title={t("title")}
    >
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
