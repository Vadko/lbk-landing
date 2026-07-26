import Image from "next/image";
import { CardGridSection } from "../ui/CardGridSection";
import { HoverCard } from "../ui/HoverCard";

interface TopDonator {
  name: string;
  amount: string;
  message: string;
  avatar: string;
}

const topDonators: TopDonator[] = [
  {
    name: "Maximus Prime",
    amount: "₴ 50,000",
    message: "Ти робиш неможливе можливим! Найкращий лаунчер!",
    avatar: "/assets/donaters/maximus-prime.png",
  },
  {
    name: "Elena_UA",
    amount: "₴ 32,400",
    message: "Дякую за можливість грати рідною мовою. Це безцінно.",
    avatar: "/assets/donaters/elena_ua.png",
  },
  {
    name: "Iron_Shield",
    amount: "₴ 28,100",
    message: "Підтримка українського контенту — це наш обов'язок.",
    avatar: "/assets/donaters/iron_shield.png",
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
          <div className="donator-card__avatar">
            <Image
              src={donator.avatar}
              alt={donator.name}
              width={100}
              height={100}
            />
          </div>
          <h3 className="donator-card__name">{donator.name}</h3>
          <p className="donator-card__amount">{donator.amount}</p>
          <p className="donator-card__message">“{donator.message}”</p>
        </HoverCard>
      ))}
    </CardGridSection>
  );
}
