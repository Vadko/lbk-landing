"use client";

import { useState } from "react";
import { trackShareLinkCopied } from "@/lib/analytics";
import { ShareIcon } from "../icons";

interface ShareButtonProps {
  gameSlug: string;
  teamSlug: string;
  gameTitle: string;
}

export function ShareButton({
  gameSlug,
  teamSlug,
  gameTitle,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `https://lbklauncher.com/open/${gameSlug}/${teamSlug}`;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Відкрити в LBK Launcher",
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      trackShareLinkCopied(gameTitle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort fallback
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      trackShareLinkCopied(gameTitle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`btn-neon btn-share ${copied ? "copied" : ""}`}
      type="button"
    >
      <ShareIcon />
      {copied ? "Скопійовано!" : "Поділитись"}
    </button>
  );
}
