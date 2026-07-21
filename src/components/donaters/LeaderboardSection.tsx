import { faAward } from "@fortawesome/free-solid-svg-icons/faAward";
import { faMedal } from "@fortawesome/free-solid-svg-icons/faMedal";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import Image from "next/image";
import { SvgIcon } from "../ui/SvgIcon";

interface Donator {
  rank: number;
  logo?: string;
  name: string;
  amount: string;
  lastDonation: string;
}

const leaderboard: Donator[] = [
  {
    rank: 1,
    name: "Maximus Prime",
    amount: "₴ 50,000",
    lastDonation: "Сьогодні, 14:20",
  },
  {
    rank: 2,
    name: "Elena_UA",
    amount: "₴ 32,400",
    lastDonation: "Вчора, 19:15",
  },
  {
    rank: 3,
    name: "Iron_Shield",
    amount: "₴ 28,150",
    lastDonation: "2 дні тому",
  },
  {
    rank: 4,
    name: "Volodymyr_K",
    amount: "₴ 12,000",
    lastDonation: "3 дні тому",
  },
  {
    rank: 5,
    name: "Stepan_Giga_Fan",
    amount: "₴ 9,800",
    lastDonation: "3 місяць тому",
  },
  {
    rank: 6,
    name: "Cyber_Kozak",
    amount: "₴ 8,500",
    lastDonation: "10 днів тому",
  },
  {
    rank: 7,
    name: "Night_Owl",
    amount: "₴ 7,200",
    lastDonation: "2 тижні тому",
  },
];

export function LeaderboardSection() {
  return (
    <section className="leaderboard-section">
      <div className="container">
        <div className="leaderboard-section__header">
          <h2 className="leaderboard-section__title">Рейтинг донатерів</h2>
          <div className="leaderboard-section__tabs">
            <button className="leaderboard-section__tab leaderboard-section__tab--active">
              За весь час
            </button>
            <button className="leaderboard-section__tab">За місяць</button>
            <button className="leaderboard-section__tab">За тиждень</button>
          </div>
        </div>
        <table className="leaderboard-table">
          <tbody>
            <tr className="leaderboard-table__header">
              <th>#</th>
              <th>Ім&apos;я донатера</th>
              <th>Сума донатів</th>
              <th>Останній донат</th>
            </tr>
            {leaderboard.map((donator) => (
              <tr key={donator.rank}>
                <td>
                  <span
                    className={`leaderboard-table__rank leaderboard-table__rank--${donator.rank <= 3 ? donator.rank : "default"}`}
                  >
                    {donator.rank === 1 && <SvgIcon icon={faTrophy} />}
                    {donator.rank === 2 && <SvgIcon icon={faMedal} />}
                    {donator.rank === 3 && <SvgIcon icon={faAward} />}
                    {donator.rank}
                  </span>
                </td>
                <td>
                  <span className="leaderboard-table__name">
                    {donator.logo && (
                      <Image
                        src={donator.logo}
                        alt={donator.name}
                        width={40}
                        height={40}
                        className="leaderboard-table__logo"
                      />
                    )}
                    {donator.name}
                  </span>
                </td>
                <td>{donator.amount}</td>
                <td>{donator.lastDonation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn--outline leaderboard-section__more-button">
          Показати більше
        </button>
      </div>
    </section>
  );
}
