import { faAward } from "@fortawesome/free-solid-svg-icons/faAward";
import { faMedal } from "@fortawesome/free-solid-svg-icons/faMedal";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
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

type LeaderboardTranslator = Awaited<
  ReturnType<typeof getTranslations<"donaters.leaderboard">>
>;

function formatLastDonation(isoDate: string, t: LeaderboardTranslator): string {
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
    return t("today", { time });
  }
  if (dayDiff === 1) {
    return t("yesterday", { time });
  }
  if (dayDiff < 7) {
    return t("daysAgo", { count: dayDiff });
  }
  if (dayDiff < 30) {
    return t("weeksAgo", { count: Math.round(dayDiff / 7) });
  }

  return t("monthsAgo", { count: Math.round(dayDiff / 30) });
}

export async function LeaderboardSection() {
  "use cache";
  cacheLife("days");
  const t = await getTranslations("donaters.leaderboard");

  return (
    <section className="section-margin">
      <div className="container">
        <h2 className="section__title">{t("title")}</h2>
        <div className="leaderboard-table__wrapper">
          <table className="leaderboard-table">
            <tbody>
              <tr className="leaderboard-table__header">
                <th>#</th>
                <th>{t("name")}</th>
                <th>{t("amount")}</th>
                <th>{t("lastDonation")}</th>
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
                    <td>{formatLastDonation(donator.lastDonation, t)}</td>
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
