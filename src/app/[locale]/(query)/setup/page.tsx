"use client";

import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinux } from "@fortawesome/free-brands-svg-icons/faLinux";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons/faFileArrowDown";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import Link from "next/link";
import { type Messages, useTranslations } from "next-intl";
import { type ReactNode, useState, useSyncExternalStore } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { SvgIcon } from "@/components/ui/SvgIcon";
import {
  detectOS,
  getDownloadLinks,
  useGitHubRelease,
} from "@/hooks/useGitHubRelease";

type Platform = "windows" | "macos" | "linux" | "steamdeck";

const PLATFORMS: { id: Platform; label: string; icon: typeof faWindows }[] = [
  { id: "windows", label: "Windows", icon: faWindows },
  { id: "macos", label: "macOS", icon: faApple },
  { id: "linux", label: "Linux", icon: faLinux },
  { id: "steamdeck", label: "Steam Deck", icon: faSteam },
];

const getOSPlatform = (): Platform => {
  const os = detectOS();
  if (os === "steamdeck") {
    return "steamdeck";
  }
  if (os === "macos") {
    return "macos";
  }
  if (os === "linux") {
    return "linux";
  }
  return "windows";
};

const emptySubscribe = () => () => {};

const strong = (chunks: ReactNode) => <strong>{chunks}</strong>;

export default function SetupPage() {
  const detectedPlatform = useSyncExternalStore(
    emptySubscribe,
    getOSPlatform,
    () => "windows" as Platform
  );
  const [activePlatform, setActivePlatform] =
    useState<Platform>(detectedPlatform);
  const { data: releaseData, isLoading } = useGitHubRelease();
  const downloadLinks = getDownloadLinks(releaseData);
  const t = useTranslations("setup");

  return (
    <section className="setup-page">
      <div className="container-narrow">
        <div className="setup-header">
          <Link href="/" className="back-link--plain">
            <SvgIcon icon={faArrowLeft} />
            {t("backHome")}
          </Link>
          <h1 className="page-title page-title--hero">{t("title")}</h1>
          <p>{t("subtitle")}</p>
        </div>

        {/* Platform Tabs */}
        <div className="setup-tabs">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              className={`setup-tab ${activePlatform === platform.id ? "active" : ""}`}
              onClick={() => setActivePlatform(platform.id)}
            >
              <SvgIcon icon={platform.icon} />
              <span>{platform.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="setup-content">
          {activePlatform === "windows" && (
            <WindowsInstructions
              setupUrl={downloadLinks.windows}
              portableUrl={downloadLinks.windowsPortable}
              version={downloadLinks.version}
            />
          )}
          {activePlatform === "macos" && (
            <MacOSInstructions
              armUrl={downloadLinks.macosArm}
              x64Url={downloadLinks.macosX64}
              version={downloadLinks.version}
            />
          )}
          {activePlatform === "linux" && (
            <LinuxInstructions appImageUrl={downloadLinks.linux} />
          )}
          {activePlatform === "steamdeck" && <SteamDeckInstructions />}
        </div>

        {/* Release Files */}
        <ReleaseFilesBlock links={downloadLinks} isLoading={isLoading} />

        {/* General Notes */}
        <div className="setup-notes">
          <h2>
            <SvgIcon icon={faCircleInfo} />
            {t("notes.title")}
          </h2>
          <ul>
            <li>{t("notes.autoUpdates")}</li>
            <li>{t("notes.offline")}</li>
            <li>{t("notes.sync")}</li>
          </ul>
        </div>

        {/* Download CTA */}
        <div className="setup-download-cta">
          <Link href="/" className="btn btn-gradient btn--big">
            <SvgIcon icon={faDownload} />
            <div className="dl-info">
              <span>{t("downloadCta")}</span>
              <small>Windows / macOS / Linux</small>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function WindowsInstructions({
  setupUrl,
  portableUrl,
  version,
}: {
  setupUrl: string | null;
  portableUrl: string | null;
  version: string | null;
}) {
  const t = useTranslations("setup");

  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faWindows} />
        {t("windows.title")}
      </h2>

      <div className="setup-section">
        <h3>{t("downloadOptions")}</h3>
        <ul className="setup-files">
          <li>
            {setupUrl ? (
              <a href={setupUrl} className="setup-link">
                <code>LBK-Launcher-win-Setup.exe</code>
              </a>
            ) : (
              <code>LBK-Launcher-win-Setup.exe</code>
            )}{" "}
            {t("windows.setupFile")}
            {version ? ` (v${version})` : ""}
          </li>
          <li>
            {portableUrl ? (
              <a href={portableUrl} className="setup-link">
                <code>LBK-Launcher-win-Portable.exe</code>
              </a>
            ) : (
              <code>LBK-Launcher-win-Portable.exe</code>
            )}{" "}
            {t("windows.portableFile")}
          </li>
        </ul>
      </div>

      <div className="setup-section">
        <h3>{t("installSteps")}</h3>
        <ol className="setup-steps">
          <li>{t("windows.stepDownload")}</li>
          <li>{t("windows.stepRun")}</li>
          <li>{t("windows.stepFollow")}</li>
        </ol>
      </div>
    </div>
  );
}

function MacOSInstructions({
  armUrl,
  x64Url,
  version,
}: {
  armUrl: string | null;
  x64Url: string | null;
  version: string | null;
}) {
  const t = useTranslations("setup");

  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faApple} />
        {t("macos.title")}
      </h2>

      <div className="setup-section">
        <h3>{t("downloadOptions")}</h3>
        <ul className="setup-files">
          <li>
            {armUrl ? (
              <a href={armUrl} className="setup-link">
                <code>LBK-Launcher-{version ?? "*"}-arm64.dmg</code>
              </a>
            ) : (
              <code>LBK-Launcher-*-arm64.dmg</code>
            )}{" "}
            {t("macos.armFile")}
          </li>
          <li>
            {x64Url ? (
              <a href={x64Url} className="setup-link">
                <code>LBK-Launcher-{version ?? "*"}-x64.dmg</code>
              </a>
            ) : (
              <code>LBK-Launcher-*-x64.dmg</code>
            )}{" "}
            {t("macos.intelFile")}
          </li>
        </ul>
      </div>

      <div className="setup-section">
        <h3>{t("installSteps")}</h3>
        <ol className="setup-steps">
          <li>{t("macos.stepDownload")}</li>
          <li>{t("macos.stepOpen")}</li>
          <li>{t("macos.stepDrag")}</li>
        </ol>
      </div>
    </div>
  );
}

function LinuxInstructions({ appImageUrl }: { appImageUrl: string | null }) {
  const t = useTranslations("setup");
  const flatpakrefUrl =
    "https://flatpak.lbklauncher.com/com.lbk.launcher.flatpakref";
  const flatpakLink = (chunks: ReactNode) => (
    <a href={flatpakrefUrl} className="setup-link">
      {chunks}
    </a>
  );

  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faLinux} />
        {t("linux.title")}
      </h2>

      <div className="setup-section">
        <h3>{t("downloadOptions")}</h3>
        <ul className="setup-files">
          <li>{t.rich("linux.flatpakFile", { b: strong })}</li>
          <li>
            {appImageUrl ? (
              <a href={appImageUrl} className="setup-link">
                <code>LBK-Launcher-linux.AppImage</code>
              </a>
            ) : (
              <code>LBK-Launcher-linux.AppImage</code>
            )}{" "}
            {t("linux.appImageFile")}
          </li>
          <li>
            <code>LBK-Launcher-linux.rpm</code> {t("linux.rpmFile")}
          </li>
        </ul>
      </div>

      <div className="setup-section">
        <h3>
          <SvgIcon icon={faStar} /> {t("linux.flatpakTitle")}
        </h3>
        <p>{t.rich("linux.flatpakIntro", { link: flatpakLink })}</p>
        <p>{t("linux.viaTerminal")}</p>
        <div className="setup-code">
          <code>flatpak install --user {flatpakrefUrl}</code>
          <CopyButton
            text={`flatpak install --user ${flatpakrefUrl}`}
            title={t("copyCommand")}
          />
        </div>
      </div>

      <div className="setup-section">
        <h3>{t("linux.appImageTitle")}</h3>
        <ol className="setup-steps">
          <li>{t("linux.appImageDownload")}</li>
          <li>{t("linux.appImageExecutable")}</li>
          <li>{t("linux.appImageRun")}</li>
        </ol>
      </div>

      <div className="setup-section">
        <h3>{t("linux.rpmTitle")}</h3>
        <ol className="setup-steps">
          <li>{t("linux.rpmDownload")}</li>
          <li>{t("linux.rpmInstall")}</li>
        </ol>
        <div className="setup-code">
          <code>sudo rpm -i LBK-Launcher-linux.rpm</code>
          <CopyButton
            text="sudo rpm -i LBK-Launcher-linux.rpm"
            title={t("copyCommand")}
          />
        </div>
      </div>
    </div>
  );
}

function SteamDeckInstructions() {
  const t = useTranslations("setup.steamDeck");
  const tSetup = useTranslations("setup");
  const flatpakrefUrl =
    "https://flatpak.lbklauncher.com/com.lbk.launcher.flatpakref";
  const flatpakLink = (chunks: ReactNode) => (
    <a href={flatpakrefUrl} className="setup-link">
      {chunks}
    </a>
  );

  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faSteam} />
        {t("title")}
      </h2>

      {/* Recommended: Flatpak */}
      <div className="setup-section">
        <h3>
          <SvgIcon icon={faStar} /> {t("flatpakTitle")}
        </h3>
        <p>{t.rich("flatpakIntro", { link: flatpakLink })}</p>
        <ol className="setup-steps">
          <li>{t.rich("desktopMode", { b: strong })}</li>
          <li>{t.rich("openFirefox", { b: strong })}</li>
          <li>{t.rich("openLink", { b: strong, link: flatpakLink })}</li>
          <li>{t.rich("install", { b: strong })}</li>
        </ol>
        <p>{t.rich("note", { b: strong })}</p>
        <div className="setup-code">
          <code>flatpak install --user {flatpakrefUrl}</code>
          <CopyButton
            text={`flatpak install --user ${flatpakrefUrl}`}
            title={tSetup("copyCommand")}
          />
        </div>
      </div>

      {/* Alternative: AppImage */}
      <div className="setup-section">
        <h3>{t("appImageTitle")}</h3>
        <ol className="setup-steps">
          <li>{t.rich("desktopMode", { b: strong })}</li>
          <li>
            {t.rich("appImageDownload", {
              b: strong,
              code: (chunks) => <code>{chunks}</code>,
            })}
          </li>
          <li>
            <strong>{t("permissions")}</strong>
            <ul>
              <li>{t("openDolphin")}</li>
              <li>{t("openDownloads")}</li>
              <li>{t("openProperties")}</li>
              <li>{t("allowExecution")}</li>
            </ul>
          </li>
          <li>
            <strong>{t("addToSteam")}</strong>
            <ul>
              <li>{t("launchSteam")}</li>
              <li>{t("addNonSteamGame")}</li>
              <li>{t("pickAppImage")}</li>
              <li>{t("confirmAdd")}</li>
            </ul>
            <p>
              {t.rich("libraryMedia", {
                link: (chunks) => (
                  <a href="https://github.com/Vadko/lbk-launcher/releases/download/v2.5.0/Steam.media.zip">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </li>
        </ol>
      </div>

      <div className="setup-section">
        <div className="setup-tip">
          <SvgIcon icon={faGamepad} />
          <span>{t("gamepadTip")}</span>
        </div>
      </div>
    </div>
  );
}

type DownloadLinks = ReturnType<typeof getDownloadLinks>;

type ReleaseFileDescription = keyof Messages["setup"]["releaseFiles"]["files"];

function ReleaseFilesBlock({
  links,
  isLoading,
}: {
  links: DownloadLinks;
  isLoading: boolean;
}) {
  const t = useTranslations("setup.releaseFiles");
  const v = links.version ?? "...";

  const files: {
    name: string;
    url: string | null;
    platform: string;
    icon: typeof faWindows;
    desc: ReleaseFileDescription;
  }[] = [
    {
      name: "LBK-Launcher-win-Setup.exe",
      url: links.windows,
      platform: "Windows",
      icon: faWindows,
      desc: "windowsSetup",
    },
    {
      name: "LBK-Launcher-win-Portable.exe",
      url: links.windowsPortable,
      platform: "Windows",
      icon: faWindows,
      desc: "windowsPortable",
    },
    {
      name: `LBK-Launcher-${v}-arm64.dmg`,
      url: links.macosArm,
      platform: "macOS",
      icon: faApple,
      desc: "macosArm",
    },
    {
      name: `LBK-Launcher-${v}-x64.dmg`,
      url: links.macosX64,
      platform: "macOS",
      icon: faApple,
      desc: "macosX64",
    },
    {
      name: "LBK-Launcher-linux.AppImage",
      url: links.linux,
      platform: "Linux",
      icon: faLinux,
      desc: "linuxAppImage",
    },
    {
      name: "LBK-Launcher-linux.rpm",
      url: links.linuxRpm,
      platform: "Linux",
      icon: faLinux,
      desc: "linuxRpm",
    },
  ];

  return (
    <div className="setup-release-files">
      <div className="setup-release-files-header">
        <h2>
          <SvgIcon icon={faFileArrowDown} />
          {t("title")}
          {links.version ? ` v${links.version}` : ""}
        </h2>
        <a
          href="https://github.com/Vadko/lbk-launcher/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="setup-github-link"
        >
          <SvgIcon icon={faGithub} />
          {t("allReleases")}
        </a>
      </div>
      {isLoading ? (
        <p className="setup-loading">{t("loading")}</p>
      ) : (
        <div className="release-files-grid">
          {files.map((f) => (
            <div key={f.name} className="release-file-card">
              <div className="release-file-header">
                <SvgIcon icon={f.icon} />
                <span className="release-file-platform">{f.platform}</span>
              </div>
              {f.url ? (
                <a href={f.url} className="release-file-name">
                  <code>{f.name}</code>
                  <SvgIcon icon={faDownload} />
                </a>
              ) : (
                <span className="release-file-name no-link">
                  <code>{f.name}</code>
                </span>
              )}
              <p className="release-file-desc">{t(`files.${f.desc}`)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
