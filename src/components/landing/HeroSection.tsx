"use client";

import confetti from "canvas-confetti";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useClientValue } from "@/hooks/useClientValue";
import { useGamesCount } from "@/hooks/useGames";
import {
  detectOS,
  formatDate,
  getDownloadLinks,
  useGitHubRelease,
} from "@/hooks/useGitHubRelease";
import { useLandingStats } from "@/hooks/useLandingStats";
import { trackFileDownload, trackViewGamesCatalog } from "@/lib/analytics";

const TYPEWRITER_PHRASES = [
  "без зусиль!",
  "в один клац!",
  "це просто!",
  "це топ!",
];

export function HeroSection() {
  const { data: release, isLoading: isReleaseLoading } = useGitHubRelease();
  const { data: gamesCount } = useGamesCount();
  const { data: stats } = useLandingStats();
  const downloadLinks = getDownloadLinks(release);
  const os = useClientValue(detectOS, "windows");
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
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00C2FF", "#BD00FF", "#ffffff"],
    });
  }, []);

  const handleDownload = (url: string | null) => {
    if (url) {
      trackFileDownload(url);
      fireConfetti();
      // For flatpakref, navigate directly so the OS/Discover can handle it
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
    if (os === "macos") return downloadLinks.macos;
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
    if (os === "macos") return ".dmg";
    if (os === "linux") return "AppImage";
    return "x64 Installer";
  };

  const getMainDownloadIcon = () => {
    if (isSteamDeck) return "fa-steam";
    if (os === "macos") return "fa-apple";
    if (os === "linux") return "fa-linux";
    return "fa-windows";
  };

  const versionText = isReleaseLoading
    ? "Завантаження..."
    : downloadLinks.version && downloadLinks.publishedAt
      ? `Версія ${downloadLinks.version} від ${formatDate(downloadLinks.publishedAt)}`
      : "Версія ...";

  return (
    <section id="hero" className="hero">
      <div className="container hero-wrapper">
        <div className="hero-content">
          <div className="badge">
            <div className="badge-icon">
              <i className="fa-solid fa-rocket" />
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
            автоматизує пошук, встановлення та оновлення українських перекладів
            для вашої ігрової бібліотеки.
          </p>

          {/* Games button above download */}
          <Link
            href="/games"
            className="btn-neon games-link"
            onClick={trackViewGamesCatalog}
          >
            <i className="fa-solid fa-gamepad" />
            <span>Переглянути всі ігри</span>
            <i className="fa-solid fa-arrow-right" />
          </Link>

          <div className="download-row">
            <button
              onClick={() => handleDownload(getMainDownloadUrl())}
              className="dl-btn"
              disabled={!getMainDownloadUrl()}
            >
              <i className={`fa-brands ${getMainDownloadIcon()}`} />
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
                  <i className="fa-solid fa-box" />
                </button>
              )}
              {os !== "linux" && !isSteamDeck && downloadLinks.linux && (
                <button
                  onClick={() => handleDownload(downloadLinks.linux)}
                  className="dl-mini"
                  title="Linux (AppImage)"
                >
                  <i className="fa-brands fa-linux" />
                </button>
              )}
              {os !== "linux" && !isSteamDeck && (
                <button
                  onClick={() => handleDownload(FLATPAKREF_URL)}
                  className="dl-mini"
                  title="Flatpak (Steam Deck)"
                >
                  <i className="fa-solid fa-box" />
                </button>
              )}
              {os !== "macos" && downloadLinks.macos && (
                <button
                  onClick={() => handleDownload(downloadLinks.macos)}
                  className="dl-mini"
                  title="macOS"
                >
                  <i className="fa-brands fa-apple" />
                </button>
              )}
              {os !== "windows" && downloadLinks.windows && (
                <button
                  onClick={() => handleDownload(downloadLinks.windows)}
                  className="dl-mini"
                  title="Windows"
                >
                  <i className="fa-brands fa-windows" />
                </button>
              )}
            </div>
          </div>

          <Link href="/setup" className="instruction-link">
            <i className="fa-solid fa-book" />
            <span>Інструкція зі встановлення</span>
          </Link>

          <div className="stats-mini">
            <div>
              <i className="fa-solid fa-gamepad" />
              <span>{gamesCount ?? "80"}+ Ігор</span>
            </div>
            {stats?.totalUniquePlayers && (
              <div>
                <i className="fa-solid fa-users" />
                <span>
                  {stats.totalUniquePlayers.toLocaleString("uk-UA")}+
                  Користувачів
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <figure className="hero-figure main-figure">
            <Image
              src="/assets/2.webp"
              alt="LBK Launcher сторінка гри"
              width={600}
              height={400}
              className="hero-img main-shot"
              priority
            />
            <figcaption className="hero-caption">Сторінка гри</figcaption>
          </figure>
          <figure className="hero-figure back-figure">
            <Image
              src="/assets/1.webp"
              alt="LBK Launcher головний екран"
              width={540}
              height={360}
              className="hero-img back-shot"
            />
            <figcaption className="hero-caption">Головний екран</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
