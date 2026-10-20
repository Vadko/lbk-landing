"use client";

import { useTranslations } from "next-intl";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useCountUp } from "@/hooks/useCountUp";
import { useLandingStats } from "@/hooks/useLandingStats";

function formatCompactNumber(num: number): string {
  if (num >= 1000) {
    const value = num / 1000;
    const formatted = value % 1 === 0 ? value.toString() : value.toFixed(1);
    return `${formatted}K`;
  }
  return num.toString();
}

function AnimatedMetric({
  value,
  formatFn,
  suffix = "",
}: {
  value: number;
  formatFn?: (num: number) => string;
  suffix?: string;
}) {
  const { value: animatedValue, ref } = useCountUp({
    end: value,
    duration: 2000,
  });
  const displayValue = formatFn
    ? formatFn(Number(animatedValue))
    : animatedValue;
  return (
    <div ref={ref}>
      {displayValue}
      {suffix}
    </div>
  );
}

export function MetricSection() {
  const t = useTranslations("landingStats");
  const { data: stats } = useLandingStats();

  const metrics: Array<{
    key: "players" | "dau" | "creators";
    number?: number;
    formatFn?: (num: number) => string;
    suffix?: string;
  }> = [
    {
      key: "players",
      number: stats?.totalUniquePlayers,
      formatFn: formatCompactNumber,
      suffix: "+",
    },
    { key: "dau", number: stats?.dau, formatFn: formatCompactNumber },
    { key: "creators", number: stats?.totalCreators },
  ];

  return (
    <CardGridSection id="metrics" columns={3} centerText>
      {metrics.map((feature, index) => (
        <HoverCard key={index} className="hover-card--big">
          <div className="hover-card__number">
            {typeof feature.number === "number" ? (
              <AnimatedMetric
                value={feature.number}
                formatFn={feature.formatFn}
                suffix={feature.suffix}
              />
            ) : (
              <div className="spinner" style={{ margin: "0 auto" }} />
            )}
          </div>
          <h3>{t(`${feature.key}.title`)}</h3>
          <p>{t(`${feature.key}.description`)}</p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
