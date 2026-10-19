import { getTranslations } from "next-intl/server";
import { CardGridSection } from "../ui/CardGridSection";
import { HoverCard } from "../ui/HoverCard";

interface TopDonator {
  name: string;
  amount: string;
  message: "vitaliiB" | "mDanyliuk" | "moreManUA";
}

const topDonators: TopDonator[] = [
  {
    name: "Віталій Б.",
    amount: "20,000",
    message: "vitaliiB",
  },
  {
    name: "M. Danyliuk",
    amount: "6,666",
    message: "mDanyliuk",
  },
  {
    name: "MoreManUA",
    amount: "5,000",
    message: "moreManUA",
  },
];

export async function SpecialThanksSection() {
  const t = await getTranslations("donaters.specialThanks");

  return (
    <CardGridSection
      id="top-donaters"
      columns={3}
      centerText
      title={t("title")}
      description={t("description")}
    >
      {topDonators.map((donator, index) => (
        <HoverCard key={index} className="donator-card">
          <h3 className="donator-card__name">{donator.name}</h3>
          <p className="donator-card__amount">₴ {donator.amount}</p>
          <p className="donator-card__message">
            “{t(`messages.${donator.message}`)}”
          </p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
