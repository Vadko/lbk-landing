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
      <ol className="game-install-steps">
        <li>
          <strong>
            {isWorkshop ? "Завантажте Steam" : "Завантажте LBK Launcher"}
          </strong>{" "}
          {isWorkshop
            ? "— безкоштовну програму для встановлення ігор"
            : "— безкоштовну програму для встановлення українських перекладів ігор"}
        </li>
        <li>
          <strong>Знайдіть {gameName}</strong>{" "}
          {isWorkshop
            ? "у каталозі майстерні Steam"
            : "у каталозі ігор лаунчера"}
        </li>
        <li>
          <strong>
            {isWorkshop ? 'Натисніть "Підписатися"' : 'Натисніть "Встановити"'}
          </strong>{" "}
          {isWorkshop
            ? "— модифікація автоматично завантажиться та встановиться"
            : "— переклад автоматично завантажиться та встановиться"}
        </li>
        <li>
          <strong>Запустіть гру</strong> та насолоджуйтеся українською
          локалізацією!
        </li>
      </ol>
    </section>
  );
}
