import { CardGridSection } from "../ui/CardGridSection";
import { HoverCard } from "../ui/HoverCard";

interface TopDonator {
  name: string;
  amount: string;
  message: string;
}

const topDonators: TopDonator[] = [
  {
    name: "Віталій Б.",
    amount: "20,000",
    message: "Дякую за можливість грати рідною мовою. Це безцінно.",
  },
  {
    name: "M. Danyliuk",
    amount: "6,666",
    message: "Ти робиш неможливе можливим! Найкращий лаунчер!",
  },
  {
    name: "MoreManUA",
    amount: "5,000",
    message: "Підтримка українського контенту — це наш обов'язок.",
  },
];

export function SpecialThanksSection() {
  return (
    <CardGridSection
      id="top-donaters"
      columns={3}
      centerText
      title="Особлива подяка"
      description="Ці люди внесли неоціненний вклад у розвиток української ігрової спільноти."
    >
      {topDonators.map((donator, index) => (
        <HoverCard key={index} className="donator-card">
          <h3 className="donator-card__name">{donator.name}</h3>
          <p className="donator-card__amount">₴ {donator.amount}</p>
          <p className="donator-card__message">“{donator.message}”</p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
