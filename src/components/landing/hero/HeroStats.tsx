"use client";

import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useCountUp } from "@/hooks/useCountUp";
import { useGamesCount } from "@/hooks/useGames";
import { useLandingStats } from "@/hooks/useLandingStats";

function AnimatedStat({ value }: { value: number }) {
  const { value: animatedValue, ref } = useCountUp({
    end: value,
    duration: 2000,
  });
  return <span ref={ref}>{animatedValue}</span>;
}

export function HeroStats() {
  const { data: gamesCount } = useGamesCount();
  const { data: stats } = useLandingStats();

  return (
    <div className="stats-mini">
      <div>
        <SvgIcon icon={faGamepad} />
        <span>
          {gamesCount ? <AnimatedStat value={gamesCount} /> : "80"}+ Ігор
        </span>
      </div>
      {stats?.totalUniquePlayers && (
        <div>
          <SvgIcon icon={faUsers} />
          <span>
            <AnimatedStat value={stats.totalUniquePlayers} />+ Користувачів
          </span>
        </div>
      )}
    </div>
  );
}
