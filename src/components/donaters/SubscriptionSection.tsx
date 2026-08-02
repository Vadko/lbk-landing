import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { HoverCard } from "../ui/HoverCard";
import { SvgIcon } from "../ui/SvgIcon";

interface SubscriptionCardProps {
  tier: string;
  price?: string;
  features: string[];
}

function SubscriptionCard({ tier, price, features }: SubscriptionCardProps) {
  return (
    <div className="subscription-card glass-bg">
      <div className="subscription-card__header">
        <h3 className="subscription-card__tier">{tier}</h3>
        {price && (
          <div className="subscription-card__price">
            ₴ {price}
            <span className="subscription-card__period"> / міс</span>
          </div>
        )}
      </div>
      <ul className="subscription-card__features">
        {features.map((feature, index) => (
          <li key={index} className="subscription-card__feature">
            <SvgIcon icon={faCheck} className="subscription-card__check" />
            {feature}
          </li>
        ))}
      </ul>
      <a className="btn btn-main" href="#">
        Обрати
      </a>
    </div>
  );
}

export function SubscriptionSection() {
  const bronzeFeatures = ["Золотий значок", "Доступ до чату"];
  const silverFeatures = ["Бронза +", "Пріоритет у запитах", "Ранній доступ"];
  const goldFeatures = ["Срібло +", "Ексклюзивний мерч", "Ім'я в титрах"];

  return (
    <section className="subscription-section section-margin">
      <div className="container">
        <h2 className="section-title center">Підписка на Донателло</h2>
        <p className="section-description center">
          Отримайте особливий статус та ексклюзивні можливості, підтримуючи
          розвиток платформи.
        </p>
        <HoverCard>
          <div className="subscription-section__grid">
            <div className="subscription-info">
              <div className="subscription-info__content">
                <h3 className="subscription-info__title">Що дає підписка?</h3>
                <p className="subscription-info__description">
                  Токен Донателло — це ваша перепустка до клубу привілейованих
                  гравців. Ви отримуєте золоту рамку, пріоритет у запитах на
                  переклад та доступ до закритих тестів нових функцій лаунчера.
                </p>
              </div>
              <a href="#" className="btn btn--big btn-gradient">
                Стати донатером
              </a>
            </div>
            <div className="subscription-tiers">
              <SubscriptionCard
                tier="Бронза"
                price="99"
                features={bronzeFeatures}
              />
              <SubscriptionCard
                tier="Срібло"
                price="249"
                features={silverFeatures}
              />
              <SubscriptionCard
                tier="Золото"
                price="499"
                features={goldFeatures}
              />
            </div>
          </div>
        </HoverCard>
      </div>
    </section>
  );
}
