"use client";

import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useTeams } from "@/hooks/useGames";
import { useLandingStats } from "@/hooks/useLandingStats";

function formatCompactNumber(num: number): string {
  if (num >= 1000) {
    const value = num / 1000;
    const formatted = value % 1 === 0 ? value.toString() : value.toFixed(1);
    return `${formatted}K`;
  }
  return num.toString();
}

export function MetricSection() {
  const { data: teams } = useTeams();
  const { data: stats } = useLandingStats();

  const metrics = [
    {
      number: stats
        ? `${formatCompactNumber(stats.totalUniquePlayers)}+`
        : undefined,
      title: "Гравців загалом",
      description: "Уся база активних гравців",
    },
    {
      number: stats ? formatCompactNumber(stats.dau) : undefined,
      title: "DAU",
      description: "Активна аудиторія кожного дня",
    },
    {
      number: teams ? `${teams.length}+` : undefined,
      title: "Творців",
      description: "Високе короткострокове та довгострокове утримання",
    },
  ];

  return (
    <CardGridSection
      id="metrics"
      columns={3}
      centerText
    >
      {metrics.map((feature, index) => (
        <HoverCard key={index} className="hover-card--big">
          <div className="hover-card__number">
            {feature.number ?? <div className="spinner" style={{ margin: "0 auto" }} />}
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
