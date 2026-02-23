"use client";

import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useTeams } from "@/hooks/useGames";

const STATS = [
  {
    number: 15746,
    title: "Перекладів",
    description: "Скільки завантажили перекладів за весь час",
  },
  {
    number: 7873,
    title: "Годин",
    description: "Скільки часу награно з нашим лаунчером",
  },
  {
    number: 243,
    title: "Творців",
    description: "Скільки творців перекладу з нами",
  },
];

export function StatSection() {
  const  { data: teams } = useTeams();

  return (
    <CardGridSection
      id="stats"
      title="Нас обирають тисячі"
      columns={3}
      centerText
    >
      {STATS.map((feature, index) => (
        <HoverCard key={index} className="hover-card--big">
          <div className="hover-card__number">{index === 2 ? `${teams?.length}+` : feature.number}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
