import { getTranslations } from "next-intl/server";

interface GameProgressProps {
  translationProgress: number;
  editingProgress: number;
  voiceProgress?: number | null;
  fontsProgress?: number | null;
  texturesProgress?: number | null;
}

export async function GameProgress({
  translationProgress,
  editingProgress,
  voiceProgress,
  fontsProgress,
  texturesProgress,
}: GameProgressProps) {
  const t = await getTranslations("gameProgress");

  return (
    <section className="game-section game-progress">
      <h2>{t("title")}</h2>
      <div className="game-progress-list">
        <div className="game-progress-item">
          <div className="game-progress-header">
            <span>{t("text")}</span>
            <span>{translationProgress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${translationProgress}%` }}
            />
          </div>
        </div>

        {editingProgress != null && (
          <div className="game-progress-item">
            <div className="game-progress-header">
              <span>{t("editing")}</span>
              <span>{editingProgress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${editingProgress}%` }}
              />
            </div>
          </div>
        )}

        {voiceProgress != null && (
          <div className="game-progress-item">
            <div className="game-progress-header">
              <span>{t("voice")}</span>
              <span>{voiceProgress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${voiceProgress}%` }}
              />
            </div>
          </div>
        )}

        {fontsProgress != null && (
          <div className="game-progress-item">
            <div className="game-progress-header">
              <span>{t("fonts")}</span>
              <span>{fontsProgress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${fontsProgress}%` }}
              />
            </div>
          </div>
        )}

        {texturesProgress != null && (
          <div className="game-progress-item">
            <div className="game-progress-header">
              <span>{t("textures")}</span>
              <span>{texturesProgress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${texturesProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
