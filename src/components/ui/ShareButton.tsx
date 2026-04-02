"use client";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Detect mobile device
  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const shareUrl = `https://lbklauncher.com/open/${gameSlug}/${teamSlug}`;
  const shareText = `${gameTitle} з українською локалізацією від ${teamName} можна зручно встановити у LBK Launcher`;

  const handleClick = async () => {
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "Відкрити в LBK Launcher",
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (error) {
        alert(`Помилка при поширенні: ${error}`);
        if (error instanceof Error && error.name !== "AbortError") {
          setIsModalOpen(true);
        }
        return;
      }
    }
    // On mobile, ShareModal will handle native share automatically
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="share-btn btn-neon btn-share"
        type="button"
      >
        <ShareIcon />
        Поділитися
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
