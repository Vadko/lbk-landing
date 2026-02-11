"use client";

import { useCallback, useRef } from "react";
import { useGamesCount } from "@/hooks/useGames";

const FEATURES = [
  {
    icon: null,
    number: true,
    title: "Підтримуваних ігор",
    description:
      "Велика бібліотека українізованих ігор, яка постійно поповнюється.",
    link: "/games",
    linkText: "Перейти до каталогу",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "Автоматичний пошук",
    description:
      "Лаунчер сам знаходить усі встановлені ігри у ваших бібліотеках.",
  },
  {
    icon: "fa-solid fa-floppy-disk",
    title: "Резервні копії",
    description:
      "Автоматично створюємо резервні копії оригінальних файлів перед встановленням.",
  },
  {
    icon: "fa-solid fa-rotate",
    title: "Автооновлення",
    description:
      "Лаунчер автоматично знаходить нові версії перекладів і сповіщає про оновлення.",
  },
  {
    icon: "fa-solid fa-gamepad",
    title: "Геймпад і Steam Deck",
    description:
      "Повна підтримка керування геймпадом та оптимізація для Steam Deck.",
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Зручна співпраця",
    description:
      "Легко додавайте свої переклади в лаунчер і співпрацюйте з іншими командами.",
  },
  {
    icon: "fa-solid fa-palette",
    title: "Налаштуйте під себе",
    description:
      "Приємний дизайн, гнучкі налаштування інтерфейсу та сповіщень.",
  },
  {
    icon: "fa-brands fa-github",
    title: "Відкритий код",
    description:
      "Повна прозорість і можливість перевірити безпеку. Ми нічого не приховуємо.",
  },
];

interface WhyCardProps {
  feature: (typeof FEATURES)[0];
  gamesCount?: number | null;
}

function WhyCard({ feature, gamesCount }: WhyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    const animate = () => {
      if (!cardRef.current) return;
      angleRef.current += 0.5;
      if (angleRef.current >= 360) angleRef.current = 0;
      cardRef.current.style.setProperty(
        "--gradient-angle",
        String(angleRef.current)
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const handleMouseEnter = useCallback(() => {
    startAnimation();
  }, [startAnimation]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${posX}%`);
    cardRef.current.style.setProperty("--mouse-y", `${posY}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", "50%");
      cardRef.current.style.setProperty("--mouse-y", "50%");
      angleRef.current = 0;
      cardRef.current.style.setProperty("--gradient-angle", "0");
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="why-card"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {feature.number ? (
        <div className="why-number">{gamesCount ?? 80}+</div>
      ) : (
        <div className="why-icon">
          <i className={feature.icon!} />
        </div>
      )}
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      {feature.link && (
        <a
          href={feature.link}
          target="_blank"
          rel="noopener noreferrer"
          className="why-btn"
        >
          {feature.linkText}
        </a>
      )}
    </div>
  );
}

export function ShowcaseSection() {
  const { data: gamesCount } = useGamesCount();

  return (
    <section id="showcase" className="showcase">
      <div className="container">
        <h2 className="section-title center">Чому варто завантажити LBK Launcher?</h2>
        <p className="section-description center">Забудьте про ручне копіювання файлів та пошук українізаторів на форумах. Ми зібрали все в одному зручному інтерфейсі.</p>

        <div className="why-grid">
          {FEATURES.map((feature, index) => (
            <WhyCard key={index} feature={feature} gamesCount={gamesCount} />
          ))}
        </div>
      </div>
    </section>
  );
}
