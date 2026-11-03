import { faShieldHalved } from "@fortawesome/free-solid-svg-icons/faShieldHalved";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { vyshyvankaDataUri } from "@lbklauncher/dicebear-vyshyvanka";
import Image from "next/image";
import { SvgIcon } from "@/components/ui/SvgIcon";
import type { GameReviewAuthor } from "@/lib/types";

interface ReviewAvatarProps {
  author: GameReviewAuthor;
  isRoot: boolean;
}

// A player gets a generated avatar from the seed the server assigned with the nickname
const ICONS: Record<GameReviewAuthor["role"], typeof faUser> = {
  player: faUser,
  author: faUsers,
  moderator: faShieldHalved,
};

export function ReviewAvatar({ author, isRoot }: ReviewAvatarProps) {
  const size = isRoot ? "review-avatar--root" : "review-avatar--reply";
  if (author.role === "player" && author.avatarSeed) {
    const px = isRoot ? 40 : 28;
    return (
      <Image
        src={vyshyvankaDataUri(author.avatarSeed)}
        alt=""
        width={px}
        height={px}
        unoptimized
        className={`review-avatar ${size}`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`review-avatar ${size} review-avatar--${author.role}`}
    >
      <SvgIcon icon={ICONS[author.role]} />
    </span>
  );
}
