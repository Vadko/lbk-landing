"use client";

import { CardGridSection } from "@/components/ui/CardGridSection";
import { HoverCard } from "@/components/ui/HoverCard";
import { useCountUp } from "@/hooks/useCountUp";
import { useGamesCount } from "@/hooks/useGames";

function AnimatedGamesCount({ count }: { count: number }) {
  const { value: animatedValue, ref } = useCountUp({ end: count, duration: 2000 });
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
    icon: "fa-solid fa-magnifying-glass",
    title: "Автоматичний пошук ігор",
    description:
      "Лаунчер самостійно сканує ваші бібліотеки у <strong>Steam, Epic Games Store</strong> та інших сервісах, знаходячи встановлені ігри.",
  },
  {
    icon: "fa-solid fa-download",
    title: "Встановлення в один клік:",
    description:
      "Обирайте гру, натискайте «Встановти переклад» — і все готово до запуску українською мовою.",
  },
  {
    icon: "fa-solid fa-floppy-disk",
    title: "Безпека та резервні копії",
    description:
      "Сервіс автоматично створює бекапи оригінальних файлів, щоб ви могли все повернути назад у будь-який момент.",
  },
  {
    icon: "fa-solid fa-rotate",
    title: "Автооновлення",
    description:
      "Лаунчер автоматично знаходить нові версії перекладів і сповіщає про оновлення.",
  },
  {
    icon: "fa-solid fa-gamepad",
    title: "Повна підтримка Linux, MacOS та Steam Deck",
    description: "Оптимізовано для комфортної гри на популярних системах.",
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Зручна співпраця",
    description:
      "Легко додавайте свої переклади в лаунчер і співпрацюйте з іншими командами.",
    link: "/collaboration",
    linkText: "Співпрацювати",
  },
  {
    icon: "fa-brands fa-github",
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
              <i className={feature.icon!} />
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
              target="_blank"
              rel="noopener noreferrer"
              className="why-btn"
            >
              {feature.linkText}
              <i className="fa-solid fa-arrow-right" />
            </a>
          )}
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
