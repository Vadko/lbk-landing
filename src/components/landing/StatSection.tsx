"use client";

import type { ComponentType, SVGProps } from "react";
import { UsersIcon } from "@/components/icons";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useTeams } from "@/hooks/useGames";
import { useLandingStats } from "@/hooks/useLandingStats";

export function StatSection() {
  const { data: teams } = useTeams();
  const { data: stats } = useLandingStats();

  const statsData: Array<{
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
    number?: string | number;
    title: string;
    description: string;
  }> = [
    {
      Icon: UsersIcon,
      number: stats?.totalUniquePlayers,
      title: "Користувачів",
      description: "Унікальних користувачів лаунчера",
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
              {feature.number ?? (
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
