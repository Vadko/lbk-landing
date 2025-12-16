interface GameProgressProps {
  translationProgress: number;
  editingProgress: number;
  voiceProgress?: number | null;
}

export function GameProgress({
  translationProgress,
  editingProgress,
  voiceProgress,
}: GameProgressProps) {
  return (
    <section className="game-section">
      <h2>Прогрес перекладу</h2>
      <div className="game-progress-list">
        <div className="game-progress-item">
          <div className="game-progress-header">
            <span>Переклад тексту</span>
            <span>{translationProgress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${translationProgress}%` }}
            />
          </div>
        </div>

        {editingProgress > 0 && (
          <div className="game-progress-item">
            <div className="game-progress-header">
              <span>Редагування</span>
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

        {voiceProgress && voiceProgress > 0 && (
          <div className="game-progress-item">
            <div className="game-progress-header">
              <span>Озвучення</span>
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
      </div>
    </section>
  );
}
