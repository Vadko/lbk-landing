import { faAward } from "@fortawesome/free-solid-svg-icons/faAward";
import { faMedal } from "@fortawesome/free-solid-svg-icons/faMedal";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { SvgIcon } from "../ui/SvgIcon";

interface Donator {
  name: string;
  amount: string;
  lastDonation: string;
}

const leaderboard: Donator[] = [
  {
    name: "Віталій Б.",
    amount: "20,000",
    lastDonation: "2026-07-23T14:20:00",
  },
  {
    name: "M. Danyliuk",
    amount: "6,666",
    lastDonation: "2026-07-26T19:15:00",
  },
  {
    name: "🐈",
    amount: "5,150",
    lastDonation: "2026-07-25T09:00:00",
  },
  {
    name: "MoreManUA",
    amount: "5,000",
    lastDonation: "2026-07-24T09:00:00",
  },
  {
    name: "Руслан І.",
    amount: "4,000",
    lastDonation: "2026-04-27T09:00:00",
  },
];

function pluralize(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few;
  }
  return many;
}

function formatLastDonation(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const time = date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const dayDiff = Math.round(
    (startOfDay(now) - startOfDay(date)) / (1000 * 60 * 60 * 24)
  );

  if (dayDiff === 0) {
    return `Сьогодні, ${time}`;
  }
  if (dayDiff === 1) {
    return `Вчора, ${time}`;
  }
  if (dayDiff < 7) {
    return `${dayDiff} ${pluralize(dayDiff, "день", "дні", "днів")} тому`;
  }
  if (dayDiff < 30) {
    const weeks = Math.round(dayDiff / 7);
    return `${weeks} ${pluralize(weeks, "тиждень", "тижні", "тижнів")} тому`;
  }

  const months = Math.round(dayDiff / 30);
  return `${months} ${pluralize(months, "місяць", "місяці", "місяців")} тому`;
}

export function LeaderboardSection() {
  return (
    <section className="section-margin">
      <div className="container">
        <h2 className="section__title">Рейтинг донатерів</h2>
        <div className="leaderboard-table__wrapper">
          <table className="leaderboard-table">
            <tbody>
              <tr className="leaderboard-table__header">
                <th>#</th>
                <th>Ім&apos;я донатера</th>
                <th>Сума донатів</th>
                <th>Останній донат</th>
              </tr>
              {leaderboard.map((donator, index) => {
                const rank = index + 1;
                return (
                  <tr key={rank}>
                    <td>
                      <span
                        className={`leaderboard-table__rank leaderboard-table__rank--${rank <= 3 ? rank : "default"}`}
                      >
                        {rank === 1 && <SvgIcon icon={faTrophy} />}
                        {rank === 2 && <SvgIcon icon={faMedal} />}
                        {rank === 3 && <SvgIcon icon={faAward} />}
                        {rank}
                      </span>
                    </td>
                    <td>
                      <span className="leaderboard-table__name">
                        {donator.name}
                      </span>
                    </td>
                    <td>₴ {donator.amount}</td>
                    <td>{formatLastDonation(donator.lastDonation)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
