import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";

interface ReviewRemovedEntryProps {
  id: string;
}

// Stands in for a removed reply so the answers under it keep their place
export async function ReviewRemovedEntry({ id }: ReviewRemovedEntryProps) {
  const t = await getTranslations("gameReviews");
  return (
    <article id={`review-${id}`} className="review-entry review-removed">
      <span aria-hidden className="review-avatar review-avatar--reply">
        <SvgIcon icon={faBan} />
      </span>
      <p>{t("removed")}</p>
    </article>
  );
}
