import type { createTranslator, Messages } from "next-intl";
import { type Game, isWorkshopTranslation } from "./types";

type Translator = ReturnType<typeof createTranslator<Messages>>;

export function generateSoftwareApplicationLD(t: Translator, game: Game) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t("gameFaq.softwareName", { game: game.name, team: game.team }),
    description: t("gameMeta.description", {
      game: game.name,
      team: game.team,
    }),
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
    downloadUrl: "https://lbklauncher.com",
  };
}

export function generateFAQLD(t: Translator, game: Game) {
  // The markup has to repeat the visible page text, otherwise Google sees one
  // answer and the user another
  const isWorkshop = isWorkshopTranslation(game);
  const kind = isWorkshop ? "workshop" : "launcher";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("gameFaq.freeQuestion", { game: game.name }),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("gameFaq.freeAnswer", {
            game: game.name,
            team: game.team,
            kind,
          }),
        },
      },
      {
        "@type": "Question",
        name: t("gameFaq.installQuestion", { game: game.name }),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("gameFaq.installAnswer", { game: game.name, kind }),
        },
      },
      {
        "@type": "Question",
        name: t("gameFaq.licenseQuestionNamed", { game: game.name }),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("gameFaq.licenseAnswer", {
            game: game.name,
            source: "versions",
            platforms: isWorkshop
              ? "Steam"
              : game.platforms?.join(", ") || "Steam, GOG, Epic Games",
          }),
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
