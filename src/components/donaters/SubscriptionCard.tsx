interface SubscriptionCardProps {
  tier: string;
  price?: string;
  period?: string;
  features: string[];
  buttonText: string;
  variant: "bronze" | "silver" | "gold";
  highlighted?: boolean;
}

export function SubscriptionCard({
  tier,
  price,
  period,
  features,
  buttonText,
  variant,
  highlighted = false,
}: SubscriptionCardProps) {
  return (
    <div
      className={`subscription-card ${highlighted ? "subscription-card--highlighted" : ""} subscription-card--${variant}`}
    >
      <div className="subscription-card__header">
        <div className="subscription-card__tier-info">
          <h3 className="subscription-card__tier">{tier}</h3>
          {price && (
            <div className="subscription-card__price">
              {price}
              {period && (
                <span className="subscription-card__period"> / {period}</span>
              )}
            </div>
          )}
        </div>
        <div className="subscription-card__question">Що дає підписка?</div>
      </div>
      <ul className="subscription-card__features">
        {features.map((feature, index) => (
          <li key={index} className="subscription-card__feature">
            <svg
              className="subscription-card__check"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33301 8.66667L6.66634 12L12.6663 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="btn subscription-card__button">{buttonText}</button>
    </div>
  );
}
