"use client";

import {
  faFacebook,
  faReddit,
  faSignalMessenger,
  faTelegram,
  faThreads,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { trackShareLinkCopied } from "@/lib/analytics";
import { SvgIcon } from "./SvgIcon";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  shareUrl: string;
  shareText: string;
}

interface SocialPlatform {
  key: string;
  name: string;
  icon:
    | typeof faTelegram
    | typeof faWhatsapp
    | typeof faReddit
    | typeof faFacebook
    | typeof faSignalMessenger
    | typeof faThreads
    | typeof faXTwitter;
  getShareUrl: (shareUrl: string, shareText: string) => string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    key: "telegram",
    name: "Telegram",
    icon: faTelegram,
    getShareUrl: (shareUrl, shareText) =>
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&type=custom_url&app_absent=0`,
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    icon: faWhatsapp,
    getShareUrl: (shareUrl, shareText) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
  },
  {
    key: "reddit",
    name: "Reddit",
    icon: faReddit,
    getShareUrl: (shareUrl, shareText) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: faFacebook,
    // Facebook share
    getShareUrl: (shareUrl, shareText) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
  },
  {
    key: "signal",
    name: "Signal",
    icon: faSignalMessenger,
    getShareUrl: (shareUrl, shareText) =>
      `https://signal.me/#p/${encodeURIComponent(shareText + " " + shareUrl)}`,
  },
  {
    key: "threads",
    name: "Threads",
    icon: faThreads,
    getShareUrl: (shareUrl, shareText) =>
      `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`,
  },
  {
    key: "x",
    name: "X",
    icon: faXTwitter,
    getShareUrl: (shareUrl, shareText) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
  },
];

export function ShareModal({
  isOpen,
  onClose,
  gameName,
  shareUrl,
  shareText,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      trackShareLinkCopied(gameName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      trackShareLinkCopied(gameName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: SocialPlatform) => {
    const url = platform.getShareUrl(shareUrl, shareText);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="share-modal-overlay" onClick={handleBackdropClick}>
      <div className="share-modal">
        <button
          className="share-modal-close"
          onClick={onClose}
          type="button"
          aria-label="Закрити"
        >
          <SvgIcon icon={faXmark} />
        </button>

        <div className="share-modal-header">
          <h2>Поширити</h2>
        </div>

        <div className="share-modal-section">
          <p className="share-modal-section-title">Поділитися в:</p>
          <div className="share-modal-socials">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.key}
                className="share-modal-social-btn"
                onClick={() => handleShare(platform)}
                type="button"
                title={platform.name}
              >
                <SvgIcon icon={platform.icon} />
              </button>
            ))}
          </div>
        </div>

        <div className="share-modal-section">
          <p className="share-modal-section-title">
            Або скопіюйте посилання чи текст:
          </p>
          <div className="share-modal-link-container">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="share-modal-link-input"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              className={`share-modal-copy-btn ${copied ? "copied" : ""}`}
              onClick={() => handleCopy(shareText + "\n" + shareUrl)}
              type="button"
            >
              <SvgIcon icon={faCopy} />
              {copied ? "Скопійовано!" : "Копіювати текст"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
