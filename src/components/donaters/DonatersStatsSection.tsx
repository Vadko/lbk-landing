export function DonatersStatsSection() {
  return (
    <section className="donaters-stats">
      <div className="container">
        <div className="donaters-stats__grid">
          <div className="donaters-stats__card">
            <div className="donaters-stats__number">₴ 842K</div>
            <div className="donaters-stats__label">Всього зібрано</div>
            <div className="donaters-stats__sublabel">
              За весь час існування проєкту
            </div>
          </div>
          <div className="donaters-stats__card">
            <div className="donaters-stats__number">3 240</div>
            <div className="donaters-stats__label">Донатерів</div>
            <div className="donaters-stats__sublabel">
              Унікальних користувачів, що підтримали нас
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
