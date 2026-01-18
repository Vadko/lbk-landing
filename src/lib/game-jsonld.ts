import type { Game } from "./types";

export function generateSoftwareApplicationLD(game: Game) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${game.name} — Український переклад від ${game.team}`,
    description: `Український переклад ${game.name} від ${game.team}. Завантажте безкоштовно через LBK Launcher.`,
    applicationCategory: "GameApplication",
    operatingSystem: game.platforms?.join(", ") || "Windows",
    author: {
      "@type": "Organization",
      name: game.team,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "UAH",
    },
    inLanguage: "uk",
    downloadUrl: "https://lblauncher.com",
  };
}

export function generateFAQLD(game: Game) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Чи безкоштовний український переклад ${game.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Так, переклад ${game.name} від команди ${game.team} повністю безкоштовний. Завантажте LBK Launcher та встановіть українську локалізацію за кілька клаців.`,
        },
      },
      {
        "@type": "Question",
        name: `Як встановити український переклад ${game.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Завантажте безкоштовний LBK Launcher з lblauncher.com, знайдіть ${game.name} у каталозі ігор та натисніть "Встановити". Переклад автоматично завантажиться та встановиться.`,
        },
      },
      {
        "@type": "Question",
        name: `Чи потрібна ліцензійна гра для встановлення перекладу ${game.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Так, для коректної роботи перекладу потрібна оригінальна гра ${game.name}. Переклад працює з версіями з ${game.platforms?.join(", ") || "Steam, GOG, Epic Games"}.`,
        },
      },
    ],
  };
}

export function generateBreadcrumbLD(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
