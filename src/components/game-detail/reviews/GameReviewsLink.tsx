import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";

interface GameReviewsLinkProps {
  count: number;
}

export async function GameReviewsLink({ count }: GameReviewsLinkProps) {
  const t = await getTranslations("gameReviews");

  if (count === 0) {
    return null;
  }

  return (
    <>
      {" • "}
      <a href="#reviews" className="game-reviews-link">
        <SvgIcon icon={faMessage} />
        {t("count", { count })}
      </a>
    </>
  );
}
