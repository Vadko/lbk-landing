import Image from "next/image";

export function SupportSection() {
  return (
    <section className="support-section">
      <div className="container">
        <div className="support-card">
          <Image
            src="/assets/help-box.svg"
            alt="+35% органічне зростання аудиторії"
            width={155}
            height={150}
          />

          <h2 className="support-card__title">Підтримай LBK Launcher</h2>
          <p className="support-card__description">
            Кожен донат допомагає нам орендувати сервери, оплачувати ліцензії та
            підтримувати творців українських перекладів.
          </p>
          <div className="support-card__actions">
            <button className="support-card__button support-card__button--primary">
              Задонатити зараз
            </button>
            <button className="support-card__button support-card__button--secondary">
              Дізнатися більше
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
