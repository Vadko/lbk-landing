"use client";

import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AuthorName } from "@/components/ui/AuthorName";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { TranslateTypeBadge } from "@/components/ui/TranslateTypeBadge";
import { getImageUrl } from "@/lib/images";
import { teamToSlug } from "@/lib/transliterate";
import type { GameGroup, TranslationItem } from "@/lib/types";

interface GameCardProps {
  game: GameGroup;
  priority?: boolean;
}

const STATUS_CLASSES: Record<TranslationItem["status"], string> = {
  completed: "game-card-status completed",
  "in-progress": "game-card-status in-progress",
  planned: "game-card-status planned",
  "tech-improvement": "game-card-status tech-improvement",
};

function TranslationRow({
  translation,
  slug,
}: {
  translation: TranslationItem;
  slug: string;
}) {
  const t = useTranslations("gameStatus");
  const progress = Math.round(
    ((translation.translation_progress ?? 0) +
      (translation.editing_progress ?? 0)) /
      2
  );

  return (
    <Link
      href={`/games/${slug}/${teamToSlug(translation.team)}`}
      prefetch
      className="game-card-translation"
    >
      <span className="game-card-translation-team">
        <AuthorName team={translation.team} />
        {(translation.ai === "edited" || translation.ai === "non-edited") && (
          <div className="game-card-translation-badge">
            <TranslateTypeBadge type={translation.ai} />
          </div>
        )}
      </span>
      <div className="game-card-translation-info">
        <span
          className={`game-card-translation-status ${STATUS_CLASSES[translation.status]}`}
        >
          {t(translation.status)}
        </span>
        {translation.status !== "planned" && progress > 0 && (
          <div className="game-card-translation-progress">
            <div className="progress-bar progress-bar-small">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="game-card-translation-percent">{progress}%</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function GameCard({ game, priority }: GameCardProps) {
  const t = useTranslations("gameCard");
  const imageUrl =
    getImageUrl(game.capsule_path, game.updated_at) ||
    getImageUrl(game.banner_path, game.updated_at);

  // For single translation, link directly to the translation page
  const cardHref =
    game.translations.length === 1
      ? `/games/${game.slug}/${teamToSlug(game.translations[0].team)}`
      : `/games/${game.slug}`;

  return (
    <div className="game-card">
      <Link href={cardHref} prefetch className="game-card-image-link">
        <div className="game-card-image">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={t("imageAlt", { game: game.name })}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="game-card-placeholder">
              <SvgIcon icon={faGamepad} />
            </div>
          )}
        </div>
      </Link>

      <div className="game-card-content">
        <Link href={cardHref} prefetch>
          <h3 className="game-card-title">{game.name}</h3>
        </Link>

        <div className="game-card-translations">
          {game.translations.map((translation) => (
            <TranslationRow
              key={translation.id}
              translation={translation}
              slug={game.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
