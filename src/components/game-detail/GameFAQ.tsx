import { getTranslations } from "next-intl/server";
import { getReadablePlatform } from "@/helpers/getReadablePlatform";
import { type Game, isWorkshopTranslation } from "@/lib/types";

interface GameFAQProps {
  game: Game;
}

export async function GameFAQ({ game }: GameFAQProps) {
  const t = await getTranslations("gameFaq");
  const tPlatform = await getTranslations("storePlatform");
  const isWorkshop = isWorkshopTranslation(game);
  const kind = isWorkshop ? "workshop" : "launcher";

  return (
    <section className="game-section game-faq">
      <h2>{t("title", { game: game.name })}</h2>
      <div className="faq-list">
        <details className="faq-item">
          <summary>{t("freeQuestion", { game: game.name })}</summary>
          <p>{t("freeAnswer", { game: game.name, team: game.team, kind })}</p>
        </details>
        <details className="faq-item">
          <summary>{t("licenseQuestion")}</summary>
          <p>
            {/* Майстерня живе лише в Steam — решта магазинів для неї не існує */}
            {t("licenseAnswer", {
              game: game.name,
              source:
                !isWorkshop && game.platforms.includes("other")
                  ? "launcher"
                  : "versions",
              platforms: isWorkshop
                ? "Steam"
                : game.platforms
                    ?.map((platform) =>
                      getReadablePlatform(tPlatform, platform)
                    )
                    .join(", ") || "Steam, GOG, Epic Games",
            })}
          </p>
        </details>
        <details className="faq-item">
          <summary>{t("updateQuestion")}</summary>
          <p>{t("updateAnswer", { kind })}</p>
        </details>
        {(game.voice_progress ?? 0) > 0 && (
          <details className="faq-item">
            <summary>{t("voiceQuestion", { game: game.name })}</summary>
            <p>
              {t("voiceAnswer", {
                team: game.team,
                progress: String(game.voice_progress),
              })}
            </p>
          </details>
        )}
      </div>
    </section>
  );
}
