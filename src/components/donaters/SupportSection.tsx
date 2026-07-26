import Image from "next/image";

export function SupportSection() {
  return (
    <section className="support-section">
      <div className="container">
        <div className="support-card glass-bg">
          <Image
            src="/assets/help-box.svg"
            alt="Іконка підтримки LBK Launcher"
            width={155}
            height={150}
          />

          <div className="support-card__content">
            <h2 className="support-card__title">Підтримай LBK Launcher</h2>
            <p className="support-card__description">
              Кожен донат допомагає нам орендувати сервери, оплачувати ліцензії
              та підтримувати творців українських перекладів.
            </p>
          </div>
          <div className="support-card__actions">
            <a className="btn btn-main" href="#">
              Задонатити зараз
            </a>
            <a className="btn glass-bg" href="#">
              Дізнатися більше
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
