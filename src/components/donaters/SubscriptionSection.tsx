import { SubscriptionCard } from "./SubscriptionCard";
import { SubscriptionInfo } from "./SubscriptionInfo";

export function SubscriptionSection() {
  const bronzeFeatures = ["Золотий значок", "Доступ до чату", "Ранній доступ"];

  const silverFeatures = ["Бронза +", "Пріоритет у запитах", "Ранній доступ"];

  const goldFeatures = ["Срібло +", "Ексклюзивні можливості", "Вага у голосі"];

  return (
    <section className="subscription-section">
      <div className="container">
        <div className="subscription-section__header">
          <h2 className="section-title subscription-section__title">
            Підписка на Донателло
          </h2>
          <p className="section-description subscription-section__description">
            Отримайте особливий статус та ексклюзивні можливості, підтримуючи
            розвиток платформи.
          </p>
        </div>
        <div className="subscription-section__grid">
          <SubscriptionInfo />
          <SubscriptionCard
            tier="Бронза"
            price="₴ 99"
            period="міс"
            features={bronzeFeatures}
            buttonText="Обрати"
            variant="bronze"
          />
          <SubscriptionCard
            tier="Срібло"
            price="₴ 249"
            period="міс"
            features={silverFeatures}
            buttonText="Обрати"
            variant="silver"
            highlighted={true}
          />
          <SubscriptionCard
            tier="Золото"
            price="₴ 499"
            period="міс"
            features={goldFeatures}
            buttonText="Обрати"
            variant="gold"
          />
        </div>
      </div>
    </section>
  );
}
