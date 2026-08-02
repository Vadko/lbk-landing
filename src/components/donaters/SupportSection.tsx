import Image from "next/image";
import Link from "next/link";

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
            <a
              className="btn btn-main"
              target="_blank"
              rel="noopener noreferrer"
              href="https://donatello.to/atlantDeMaPeine?g=pidtrimka-roboti-lbk-launcher"
            >
              Задонатити зараз
            </a>
            <Link
              className="btn glass-bg"
              href="/#showcase"
              target="_blank"
              rel="noopener noreferrer"
            >
              Дізнатися більше
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
