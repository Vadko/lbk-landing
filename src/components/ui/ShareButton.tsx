"use client";

import { useState } from "react";

interface ShareButtonProps {
  gameSlug: string;
  teamSlug: string;
}

export function ShareButton({ gameSlug, teamSlug }: ShareButtonProps) {
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`btn-share ${copied ? "copied" : ""}`}
      type="button"
    >
      <i className={copied ? "fa-solid fa-check" : "fa-solid fa-share-nodes"} />
      {copied ? "Скопійовано!" : "Поділитись"}
    </button>
  );
}
