"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ShareIcon } from "../icons";
import { ShareModal } from "./ShareModal";

interface ShareButtonProps {
  gameSlug: string;
  teamSlug: string;
  gameTitle: string;
  teamName: string;
}

export function ShareButton({
  gameSlug,
  teamSlug,
  gameTitle,
  teamName,
}: ShareButtonProps) {
  const t = useTranslations("shareGame");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Detect mobile device
  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const shareUrl = `https://lbklauncher.com/open/${gameSlug}/${teamSlug}`;
  const shareText = t("text", { game: gameTitle, team: teamName });

  const handleClick = () => {
    if (isMobile && navigator.share) {
      navigator
        .share({
          title: t("nativeTitle"),
          text: shareText,
          url: shareUrl,
        })
        .then(() => {
          return;
        })
        .catch(() => {
          // ignore errors and fallback to modal
        });
    }
    // On mobile, ShareModal will handle native share automatically
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-neon share-btn btn-share"
        type="button"
      >
        <ShareIcon />
        {t("button")}
      </button>
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameName={gameTitle}
        shareUrl={shareUrl}
        shareText={shareText}
      />
    </>
  );
}
