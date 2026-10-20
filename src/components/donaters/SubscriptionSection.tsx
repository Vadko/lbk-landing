import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import type { Messages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { HoverCard } from "../ui/HoverCard";
import { SvgIcon } from "../ui/SvgIcon";

type SubscriptionFeature =
  keyof Messages["donaters"]["subscription"]["features"];

interface SubscriptionCardProps {
  tier: keyof Messages["donaters"]["subscription"]["tiers"];
  price?: string;
  features: SubscriptionFeature[];
}

async function SubscriptionCard({
  tier,
  price,
  features,
}: SubscriptionCardProps) {
  const t = await getTranslations("donaters.subscription");

  return (
    <div className="subscription-card glass-bg">
      <div className="subscription-card__header">
        <h3 className="subscription-card__tier">{t(`tiers.${tier}`)}</h3>
        {price && (
          <div className="subscription-card__price">
            ₴ {price}
            <span className="subscription-card__period"> {t("perMonth")}</span>
          </div>
        )}
      </div>
      <ul className="subscription-card__features">
        {features.map((feature) => (
          <li key={feature} className="subscription-card__feature">
            <SvgIcon icon={faCheck} className="subscription-card__check" />
            {t(`features.${feature}`)}
          </li>
        ))}
      </ul>
      <a className="btn btn-main" href="#">
        {t("choose")}
      </a>
    </div>
  );
}

export async function SubscriptionSection() {
  const t = await getTranslations("donaters.subscription");
  const bronzeFeatures: SubscriptionFeature[] = ["goldBadge", "chatAccess"];
  const silverFeatures: SubscriptionFeature[] = [
    "bronzePlus",
    "priorityRequests",
    "earlyAccess",
  ];
  const goldFeatures: SubscriptionFeature[] = [
    "silverPlus",
    "exclusiveMerch",
    "nameInCredits",
  ];

  return (
    <section className="subscription-section section-margin">
      <div className="container">
        <h2 className="section-title center">{t("title")}</h2>
        <p className="section-description center">{t("description")}</p>
        <HoverCard>
          <div className="subscription-section__grid">
            <div className="subscription-info">
              <div className="subscription-info__content">
                <h3 className="subscription-info__title">
                  {t("benefitsTitle")}
                </h3>
                <p className="subscription-info__description">
                  {t("benefitsDescription")}
                </p>
              </div>
              <a href="#" className="btn btn--big btn-gradient">
                {t("becomeDonor")}
              </a>
            </div>
            <div className="subscription-tiers">
              <SubscriptionCard
                tier="bronze"
                price="99"
                features={bronzeFeatures}
              />
              <SubscriptionCard
                tier="silver"
                price="249"
                features={silverFeatures}
              />
              <SubscriptionCard
                tier="gold"
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
