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

export function StatSection() {
  const t = useTranslations("landingStats");
  const { data: stats } = useLandingStats();

  const statsData: Array<{
    key: "downloads" | "hours" | "creators";
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    number?: number;
    suffix?: string;
  }> = [
    { key: "downloads", number: stats?.totalDownloads },
    { key: "hours", number: stats?.totalPlaytimeHours },
    { key: "creators", number: stats?.totalCreators },
  ];

  return (
    <CardGridSection id="stats" title={t("title")} columns={3} centerText>
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
            <h3>{t(`${feature.key}.title`)}</h3>
            <p>{t(`${feature.key}.description`)}</p>
          </HoverCard>
        );
      })}
    </CardGridSection>
  );
}
