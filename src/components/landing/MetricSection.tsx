"use client";

import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useTeams } from "@/hooks/useGames";

const METRICS = [
  {
    number: '15K+',
    title: "Гравців загалом",
    description: "Уся база активних гравців",
  },
  {
    number: "3.2K",
    title: "DAU",
    description: "Активна аудиторія кожного дня",
  },
  {
    number: "243",
    title: "Творців",
    description: "Високе короткострокове та довгострокове утримання",
  },
];

export function MetricSection() {
  const { data: teams } = useTeams();

  return (
    <CardGridSection
      id="metrics"
      columns={3}
      centerText
    >
      {METRICS.map((feature, index) => (
        <HoverCard key={index} className="hover-card--big">
          <div className="hover-card__number">
            {index === 2 ? `${teams?.length}+` : feature.number}
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
