"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faHandshake } from "@fortawesome/free-solid-svg-icons/faHandshake";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faRotate } from "@fortawesome/free-solid-svg-icons/faRotate";
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
  {
    icon: null,
    number: true,
    title: "Величезний каталог",
    description:
      "Доступ до <strong>[count] українізаторів</strong> для AAA-тайтлів, інді-проєктів та класики.",
    link: "/games",
    linkText: "Перейти до каталогу",
  },
  {
    icon: faMagnifyingGlass,
    title: "Автоматичний пошук ігор",
    description:
      "Лаунчер самостійно сканує ваші бібліотеки у <strong>Steam, Epic Games Store</strong> та інших сервісах, знаходячи встановлені ігри.",
  },
  {
    icon: faDownload,
    title: "Встановлення в один клік:",
    description:
      "Обирайте гру, натискайте «Встановити переклад» — і все готово до запуску українською мовою.",
  },
  {
    icon: faFloppyDisk,
    title: "Безпека та резервні копії",
    description:
      "Сервіс автоматично створює бекапи оригінальних файлів, щоб ви могли все повернути назад у будь-який момент.",
  },
  {
    icon: faRotate,
    title: "Автооновлення",
    description:
      "Лаунчер автоматично знаходить нові версії перекладів і сповіщає про оновлення.",
  },
  {
    icon: faGamepad,
    title: "Повна підтримка Linux, MacOS та Steam Deck",
    description: "Оптимізовано для комфортної гри на популярних системах.",
  },
  {
    icon: faHandshake,
    title: "Зручна співпраця",
    description:
      "Легко додавайте свої переклади в лаунчер і співпрацюйте з іншими командами.",
    link: "/collaboration",
    linkText: "Співпрацювати",
  },
  {
    icon: faGithub,
    title: "Відкритий код",
    description:
      "Повна прозорість і можливість перевірити безпеку. Ми нічого не приховуємо.",
    link: "https://github.com/Vadko/lbk-launcher",
    linkText: "Подивитись код",
  },
];

export function ShowcaseSection() {
  const { data: gamesCount } = useGamesCount();

  return (
    <CardGridSection
      id="showcase"
      title="Чому варто завантажити LBK Launcher?"
      description="Забудьте про ручне копіювання файлів та пошук українізаторів на форумах. Ми зібрали все в одному зручному інтерфейсі."
      columns={4}
      centerText
    >
      {FEATURES.map((feature, index) => (
        <HoverCard key={index}>
          {feature.number ? (
            <div className="hover-card__number">
              {gamesCount ? <AnimatedGamesCount count={gamesCount} /> : 80}+
            </div>
          ) : (
            <div className="hover-card__icon">
              <SvgIcon icon={feature.icon!} />
            </div>
          )}
          <h3>{feature.title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: feature.description.replace(
                "[count]",
                `${gamesCount ?? 80}`
              ),
            }}
          ></p>
          {feature.link && (
            <a
              href={feature.link}
              {...(feature.link.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="why-btn"
            >
              {feature.linkText}
              <SvgIcon icon={faArrowRight} />
            </a>
          )}
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
