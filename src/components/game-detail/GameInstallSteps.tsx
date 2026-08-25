interface GameInstallStepsProps {
  gameName: string;
  /** Переклад із Майстерні ставить сам Steam — лаунчер тут лише інформує */
  isWorkshop?: boolean;
}

export function GameInstallSteps({
  gameName,
  isWorkshop = false,
}: GameInstallStepsProps) {
  return (
    <section className="game-section game-install-section">
      <h2>Як встановити український переклад {gameName}</h2>
      {isWorkshop ? (
        <ol className="game-install-steps">
          <li>
            <strong>Завантажте Steam</strong> — безкоштовну програму для
            встановлення ігор
          </li>
          <li>
            <strong>Знайдіть {gameName}</strong> у каталозі майстерні Steam
          </li>
          <li>
            <strong>Натисніть &quot;Підписатися&quot;</strong> — модифікація
            автоматично завантажиться та встановиться
          </li>
          <li>
            <strong>Запустіть гру</strong> та насолоджуйтеся українською
            локалізацією!
          </li>
        </ol>
      ) : (
        <ol className="game-install-steps">
          <li>
            <strong>Завантажте LBK Launcher</strong> — безкоштовну програму для
            встановлення українських перекладів ігор
          </li>
          <li>
            <strong>Знайдіть {gameName}</strong> у каталозі ігор лаунчера
          </li>
          <li>
            <strong>Натисніть &quot;Встановити&quot;</strong> — переклад
            автоматично завантажиться та встановиться
          </li>
          <li>
            <strong>Запустіть гру</strong> та насолоджуйтеся українською
            локалізацією!
          </li>
        </ol>
      )}
    </section>
  );
}
