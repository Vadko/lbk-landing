"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faHandshake } from "@fortawesome/free-solid-svg-icons/faHandshake";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faRotate } from "@fortawesome/free-solid-svg-icons/faRotate";
import { useTranslations } from "next-intl";
import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useCountUp } from "@/hooks/useCountUp";
import { useGamesCount } from "@/hooks/useGames";

function AnimatedGamesCount({ count }: { count: number }) {
  const { value: animatedValue, ref } = useCountUp({
    end: count,
    duration: 2000,
  });
  return <span ref={ref}>{animatedValue}</span>;
}

const FEATURES = [
  { key: "catalog", number: true, link: "/games" },
  { key: "autoSearch", icon: faMagnifyingGlass },
  { key: "oneClick", icon: faDownload },
  { key: "backups", icon: faFloppyDisk },
  { key: "autoUpdate", icon: faRotate },
  { key: "platforms", icon: faGamepad },
  { key: "collaboration", icon: faHandshake, link: "/collaboration" },
  {
    key: "openSource",
    icon: faGithub,
    link: "https://github.com/Vadko/lbk-launcher",
  },
] as const;

const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

export function ShowcaseSection() {
  const t = useTranslations("landingShowcase");
  const { data: gamesCount } = useGamesCount();

  return (
    <CardGridSection
      id="showcase"
      title={t("title")}
      description={t("description")}
      columns={4}
      centerText
    >
      {FEATURES.map((feature, index) => (
        <HoverCard key={index}>
          {"number" in feature ? (
            <div className="hover-card__number">
              <AnimatedGamesCount count={gamesCount ?? 0} />+
            </div>
          ) : (
            <div className="hover-card__icon">
              <SvgIcon icon={feature.icon} />
            </div>
          )}
          <h3>{t(`features.${feature.key}.title`)}</h3>
          <p>
            {t.rich(`features.${feature.key}.description`, {
              b: strong,
              count: String(gamesCount ?? 0),
            })}
          </p>
          {"link" in feature && (
            <a
              href={feature.link}
              {...(feature.link.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="why-btn"
            >
              {t(`features.${feature.key}.link`)}
              <SvgIcon icon={faArrowRight} />
            </a>
          )}
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
