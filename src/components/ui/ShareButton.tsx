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

  const handleClick = () => {
    // On mobile, ShareModal will handle native share automatically
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="btn-neon btn-share"
        type="button"
      >
        <ShareIcon />
        Поділитися
      </button>
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameSlug={gameSlug}
        teamSlug={teamSlug}
        gameName={gameTitle}
        teamName={teamName}
      />
    </>
  );
}
