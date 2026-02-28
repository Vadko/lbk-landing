"use client";

import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useTeams } from "@/hooks/useGames";
import { useLandingStats } from "@/hooks/useLandingStats";

export function StatSection() {
  const { data: teams } = useTeams();
  const { data: stats } = useLandingStats();

  const statsData = [
    {
      number: stats?.totalDownloads,
      title: "Перекладів",
      description: "Скільки завантажили перекладів за весь час",
    },
    {
      number: stats?.totalPlaytimeHours,
      title: "Годин",
      description: "Скільки часу награно з нашим лаунчером",
    },
    {
      number: teams ? `${teams.length}+` : undefined,
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
      {statsData.map((feature, index) => (
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
