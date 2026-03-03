"use client";

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
  const { data: stats } = useLandingStats();

  const metrics = [
    {
      number: stats?.totalUniquePlayers,
      formatFn: formatCompactNumber,
      suffix: "+",
      title: "Гравців загалом",
      description: "Уся база активних гравців",
    },
    {
      number: stats?.dau,
      formatFn: formatCompactNumber,
      title: "DAU",
      description: "Активна аудиторія кожного дня",
    },
    {
      number: stats?.totalCreators,
      title: "Творців",
      description: "Скільки творців перекладу з нами",
    },
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
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
