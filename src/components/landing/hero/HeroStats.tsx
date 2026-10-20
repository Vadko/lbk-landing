"use client";

import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("landingHero.stats");
  const { data: gamesCount } = useGamesCount();
  const { data: stats } = useLandingStats();
  const totalUniquePlayers = stats?.totalUniquePlayers ?? 0;

  return (
    <div className="stats-mini">
      <div>
        <SvgIcon icon={faGamepad} />
        <span>
          {t.rich("games", {
            count: () => <AnimatedStat value={gamesCount ?? 0} />,
          })}
        </span>
      </div>
      {totalUniquePlayers > 0 && (
        <div>
          <SvgIcon icon={faUsers} />
          <span>
            {t.rich("users", {
              count: () => <AnimatedStat value={totalUniquePlayers} />,
            })}
          </span>
        </div>
      )}
    </div>
  );
}
