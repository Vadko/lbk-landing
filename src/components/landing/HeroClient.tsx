"use client";

import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import { faLinux } from "@fortawesome/free-brands-svg-icons/faLinux";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faBox } from "@fortawesome/free-solid-svg-icons/faBox";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useClientValue } from "@/hooks/useClientValue";
import { useCountUp } from "@/hooks/useCountUp";
import { useGamesCount } from "@/hooks/useGames";
import {
  detectMacArch,
  detectOS,
  formatDate,
  getDownloadLinks,
  useGitHubRelease,
} from "@/hooks/useGitHubRelease";
import { useLandingStats } from "@/hooks/useLandingStats";
import { trackFileDownload, trackViewGamesCatalog } from "@/lib/analytics";

function AnimatedStat({ value }: { value: number }) {
  const { value: animatedValue, ref } = useCountUp({
    end: value,
    duration: 2000,
  });
  return <span ref={ref}>{animatedValue}</span>;
}

const TYPEWRITER_PHRASES = [
  "без зусиль!",
  "в один клац!",
  "це просто!",
  "це топ!",
];

export function HeroClient() {
  const { data: release, isLoading: isReleaseLoading } = useGitHubRelease();
  const { data: gamesCount } = useGamesCount();
  const { data: stats } = useLandingStats();
  const downloadLinks = getDownloadLinks(release);
  const os = useClientValue(detectOS, "windows");
  const macArch = useClientValue(detectMacArch, "arm64");
  const [typewriterText, setTypewriterText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typewriterText.length < currentPhrase.length) {
            setTypewriterText(
              currentPhrase.slice(0, typewriterText.length + 1)
            );
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (typewriterText.length > 0) {
            setTypewriterText(typewriterText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, phraseIndex]);

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

  const versionText = isReleaseLoading
    ? "Завантаження..."
    : downloadLinks.version && downloadLinks.publishedAt
      ? `Версія ${downloadLinks.version} від ${formatDate(downloadLinks.publishedAt)}`
      : "Версія ...";

  return (
    <div className="hero-content">
      <div className="badge">
        <div className="badge-icon">
          <SvgIcon icon={faRocket} />
        </div>
        <span>{versionText}</span>
      </div>

      <h1>
        Ігри українською —<br />
        <span className="text-gradient typewriter">{typewriterText}</span>
      </h1>

      <p>
        Грайте в улюблені ігри рідною мовою в один клік. <br />
        LBK Launcher — це безкоштовний інструмент з відкритим кодом, який
        автоматизує пошук, встановлення та оновлення українських перекладів для
        вашої ігрової бібліотеки.
      </p>

      <Link
        href="/games"
        className="btn-neon games-link"
        onClick={trackViewGamesCatalog}
      >
        <SvgIcon icon={faGamepad} />
        <span>Переглянути всі ігри</span>
        <SvgIcon icon={faArrowRight} />
      </Link>

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

      <Link href="/setup" className="instruction-link">
        <SvgIcon icon={faBook} />
        <span>Інструкція зі встановлення</span>
      </Link>

      <div className="stats-mini">
        <div>
          <SvgIcon icon={faGamepad} />
          <span>
            {gamesCount ? <AnimatedStat value={gamesCount} /> : "80"}+ Ігор
          </span>
        </div>
        {stats?.totalUniquePlayers && (
          <div>
            <SvgIcon icon={faUsers} />
            <span>
              <AnimatedStat value={stats.totalUniquePlayers} />+ Користувачів
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
