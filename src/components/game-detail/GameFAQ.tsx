import { getReadablePlatform } from "@/helpers/getReadablePlatform";
import { type Game, isWorkshopTranslation } from "@/lib/types";

interface GameFAQProps {
  game: Game;
}

export function GameFAQ({ game }: GameFAQProps) {
  const isWorkshop = isWorkshopTranslation(game);

  return (
    <section className="game-section game-faq">
      <h2>Часті питання про переклад {game.name}</h2>
      <div className="faq-list">
        <details className="faq-item">
          <summary>Чи безкоштовний український переклад {game.name}?</summary>
          <p>
            Так, переклад {game.name} від команди {game.team} повністю
            безкоштовний.{" "}
            {isWorkshop
              ? "Встановіть українську локалізацію за кілька клаців через Steam майстерню."
              : "Завантажте LBK Launcher та встановіть українську локалізацію за кілька клаців."}
          </p>
        </details>
        <details className="faq-item">
          <summary>
            Чи потрібна ліцензійна гра для встановлення перекладу?
          </summary>
          <p>
            Так, для коректної роботи перекладу потрібна оригінальна гра{" "}
            {game.name}. Переклад працює з{" "}
            {/* Майстерня живе лише в Steam — решта магазинів для неї не існує */}
            {isWorkshop
              ? "версіями з Steam"
              : game.platforms.includes("other")
                ? "оригінальним лаунчером гри"
                : `версіями з ${
                    game.platforms?.map(getReadablePlatform).join(", ") ||
                    "Steam, GOG, Epic Games"
                  }`}
            .
          </p>
        </details>
        <details className="faq-item">
          <summary>Як оновити переклад до нової версії?</summary>
          <p>
            {isWorkshop
              ? "LBK Launcher автоматично не перевіряє оновлення. Коли вийде нова версія перекладу, ви отримаєте сповіщення та зможете оновити переклад в Steam в один клац."
              : "LBK Launcher автоматично перевіряє оновлення. Коли вийде нова версія перекладу, ви отримаєте сповіщення та зможете оновити в один клац."}
          </p>
        </details>
        {game.voice_progress && game.voice_progress > 0 && (
          <details className="faq-item">
            <summary>Чи є українське озвучення для {game.name}?</summary>
            <p>
              Так! Команда {game.team} працює над українським озвученням. Наразі
              озвучено {game.voice_progress}% гри.
            </p>
          </details>
        )}
      </div>
    </section>
  );
}
