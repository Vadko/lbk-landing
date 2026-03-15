"use client";

import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import { faLinux } from "@fortawesome/free-brands-svg-icons/faLinux";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faBox } from "@fortawesome/free-solid-svg-icons/faBox";
import { useCallback } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useClientValue } from "@/hooks/useClientValue";
import {
  detectMacArch,
  detectOS,
  getDownloadLinks,
  useGitHubRelease,
} from "@/hooks/useGitHubRelease";
import { trackFileDownload } from "@/lib/analytics";

export function HeroDownload() {
  const { data: release } = useGitHubRelease();
  const downloadLinks = getDownloadLinks(release);
  const os = useClientValue(detectOS, "windows");
  const macArch = useClientValue(detectMacArch, "arm64");

  const fireConfetti = useCallback(() => {
    import("canvas-confetti").then((mod) => {
      mod.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00C2FF", "#BD00FF", "#ffffff"],
      });
    });
  }, []);

  const handleDownload = (url: string | null) => {
    if (url) {
      trackFileDownload(url);
      fireConfetti();
      if (url.endsWith(".flatpakref")) {
        window.location.assign(url);
      } else {
        window.open(url, "_blank");
      }
    }
  };

  const FLATPAKREF_URL =
    "https://flatpak.lbklauncher.com/com.lbk.launcher.flatpakref";
  const isSteamDeck = os === "steamdeck";

  const getMainDownloadUrl = () => {
    if (isSteamDeck) return FLATPAKREF_URL;
    if (os === "macos")
      return macArch === "x64"
        ? (downloadLinks.macosX64 ?? downloadLinks.macos)
        : (downloadLinks.macosArm ?? downloadLinks.macos);
    if (os === "linux") return downloadLinks.linux;
    return downloadLinks.windows;
  };

  const getMainDownloadLabel = () => {
    if (isSteamDeck) return "Встановити на Steam Deck";
    if (os === "macos") return "Завантажити для macOS";
    if (os === "linux") return "Завантажити для Linux";
    return "Завантажити для Windows";
  };

  const getMainDownloadSubtitle = () => {
    if (isSteamDeck) return "Flatpak";
    if (os === "macos")
      return macArch === "x64" ? ".dmg (Intel)" : ".dmg (Apple Silicon)";
    if (os === "linux") return "AppImage";
    return "x64 Installer";
  };

  const getMainDownloadIcon = () => {
    if (isSteamDeck) return faSteam;
    if (os === "macos") return faApple;
    if (os === "linux") return faLinux;
    return faWindows;
  };

  return (
    <div className="download-row">
      <button
        onClick={() => handleDownload(getMainDownloadUrl())}
        className="dl-btn"
        disabled={!getMainDownloadUrl()}
      >
        <SvgIcon icon={getMainDownloadIcon()} />
        <div className="dl-info">
          <span>{getMainDownloadLabel()}</span>
          <small>{getMainDownloadSubtitle()}</small>
        </div>
      </button>

      <div className="dl-others">
        {os === "linux" && (
          <button
            onClick={() => handleDownload(FLATPAKREF_URL)}
            className="dl-mini"
            title="Flatpak (Steam Deck)"
          >
            <SvgIcon icon={faBox} />
          </button>
        )}
        {os !== "linux" && !isSteamDeck && downloadLinks.linux && (
          <button
            onClick={() => handleDownload(downloadLinks.linux)}
            className="dl-mini"
            title="Linux (AppImage)"
          >
            <SvgIcon icon={faLinux} />
          </button>
        )}
        {os !== "linux" && !isSteamDeck && (
          <button
            onClick={() => handleDownload(FLATPAKREF_URL)}
            className="dl-mini"
            title="Flatpak (Steam Deck)"
          >
            <SvgIcon icon={faBox} />
          </button>
        )}
        {os !== "macos" && downloadLinks.macos && (
          <button
            onClick={() => handleDownload(downloadLinks.macos)}
            className="dl-mini"
            title="macOS"
          >
            <SvgIcon icon={faApple} />
          </button>
        )}
        {os !== "windows" && downloadLinks.windows && (
          <button
            onClick={() => handleDownload(downloadLinks.windows)}
            className="dl-mini"
            title="Windows"
          >
            <SvgIcon icon={faWindows} />
          </button>
        )}
      </div>
    </div>
  );
}
