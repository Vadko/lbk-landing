"use client";

import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinux } from "@fortawesome/free-brands-svg-icons/faLinux";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons/faFileArrowDown";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
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
  if (os === "steamdeck") return "steamdeck";
  if (os === "macos") return "macos";
  if (os === "linux") return "linux";
  return "windows";
};

const emptySubscribe = () => () => {};

export default function SetupPage() {
  const detectedPlatform = useSyncExternalStore(
    emptySubscribe,
    getOSPlatform,
    () => "windows" as Platform,
  );
  const [activePlatform, setActivePlatform] =
    useState<Platform>(detectedPlatform);
  const { data: releaseData, isLoading } = useGitHubRelease();
  const downloadLinks = getDownloadLinks(releaseData);

  return (
    <section className="setup-page">
      <div className="container">
        <div className="setup-header">
          <Link href="/" className="back-link">
            <SvgIcon icon={faArrowLeft} />
            На головну
          </Link>
          <h1>Встановлення LBK Launcher</h1>
          <p>
            Покрокова інструкція для встановлення лаунчера на вашу платформу
          </p>
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
            Загальна інформація
          </h2>
          <ul>
            <li>Автоматичні оновлення працюють на всіх платформах</li>
            <li>Після першого запуску лаунчер працює офлайн</li>
            <li>Дані локалізацій синхронізуються автоматично</li>
          </ul>
        </div>

        {/* Download CTA */}
        <div className="setup-download-cta">
          <Link href="/" className="dl-btn">
            <SvgIcon icon={faDownload} />
            <div className="dl-info">
              <span>Завантажити LBK Launcher</span>
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
  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faWindows} />
        Встановлення на Windows
      </h2>

      <div className="setup-section">
        <h3>Варіанти завантаження</h3>
        <ul className="setup-files">
          <li>
            {setupUrl ? (
              <a href={setupUrl} className="setup-link">
                <code>LBK-Launcher-win-Setup.exe</code>
              </a>
            ) : (
              <code>LBK-Launcher-win-Setup.exe</code>
            )}{" "}
            — інсталятор{version ? ` (v${version})` : ""}
          </li>
          <li>
            {portableUrl ? (
              <a href={portableUrl} className="setup-link">
                <code>LBK-Launcher-win-Portable.exe</code>
              </a>
            ) : (
              <code>LBK-Launcher-win-Portable.exe</code>
            )}{" "}
            — портативна версія (без встановлення)
          </li>
        </ul>
      </div>

      <div className="setup-section">
        <h3>Кроки встановлення</h3>
        <ol className="setup-steps">
          <li>Завантажте файл інсталятора або портативну версію</li>
          <li>Запустіть завантажений файл</li>
          <li>Дотримуйтеся інструкцій на екрані</li>
        </ol>
      </div>

      <div className="setup-section setup-troubleshoot">
        <h3>
          <SvgIcon icon={faTriangleExclamation} />
          Вирішення проблем
        </h3>

        <div className="setup-issue">
          <h4>Браузер попереджає про небезпечний файл</h4>
          <p>
            Оберіть &quot;Зберегти&quot; або &quot;Завантажити в будь-якому
            випадку&quot;. Попередження з&apos;являється через відсутність
            цифрового підпису (проєкт open-source).
          </p>
        </div>

        <div className="setup-issue">
          <h4>Windows SmartScreen блокує запуск</h4>
          <ol>
            <li>
              Натисніть &quot;Докладніше&quot; у вікні
              попередження
            </li>
            <li>
              Оберіть &quot;Усе одно запустити&quot;
            </li>
          </ol>
          <p>Або через властивості файлу:</p>
          <ol>
            <li>Клацніть правою кнопкою на файлі → &quot;Властивості&quot;</li>
            <li>
              Поставте галочку &quot;Розблокувати&quot; внизу
            </li>
            <li>Натисніть &quot;OK&quot; та спробуйте знову</li>
          </ol>
        </div>

        <div className="setup-issue">
          <h4>Smart App Control блокує (Windows 11)</h4>
          <ol>
            <li>Відкрийте &quot;Безпека Windows&quot;</li>
            <li>Перейдіть до &quot;Керування програмами та браузером&quot;</li>
            <li>Натисніть &quot;Параметри Smart App Control&quot;</li>
            <li>Оберіть &quot;Вимкнути&quot;</li>
          </ol>
        </div>
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
  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faApple} />
        Встановлення на macOS
      </h2>

      <div className="setup-section">
        <h3>Варіанти завантаження</h3>
        <ul className="setup-files">
          <li>
            {armUrl ? (
              <a href={armUrl} className="setup-link">
                <code>LBK-Launcher-{version ?? "*"}-arm64.dmg</code>
              </a>
            ) : (
              <code>LBK-Launcher-*-arm64.dmg</code>
            )}{" "}
            — для Apple Silicon
          </li>
          <li>
            {x64Url ? (
              <a href={x64Url} className="setup-link">
                <code>LBK-Launcher-{version ?? "*"}-x64.dmg</code>
              </a>
            ) : (
              <code>LBK-Launcher-*-x64.dmg</code>
            )}{" "}
            — для Intel
          </li>
        </ul>
      </div>

      <div className="setup-section">
        <h3>Кроки встановлення</h3>
        <ol className="setup-steps">
          <li>Завантажте відповідний DMG файл (Apple Silicon або Intel)</li>
          <li>Відкрийте DMG файл</li>
          <li>Перетягніть програму до папки Applications</li>
        </ol>
      </div>
    </div>
  );
}

function LinuxInstructions({ appImageUrl }: { appImageUrl: string | null }) {
  const flatpakrefUrl =
    "https://flatpak.lbklauncher.com/com.lbk.launcher.flatpakref";

  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faLinux} />
        Встановлення на Linux
      </h2>

      <div className="setup-section">
        <h3>Варіанти завантаження</h3>
        <ul className="setup-files">
          <li>
            <strong>Flatpak</strong> — рекомендовано для Steam Deck та
            дистрибутивів з підтримкою Flatpak
          </li>
          <li>
            {appImageUrl ? (
              <a href={appImageUrl} className="setup-link">
                <code>LBK-Launcher-linux.AppImage</code>
              </a>
            ) : (
              <code>LBK-Launcher-linux.AppImage</code>
            )}{" "}
            — універсальний формат
          </li>
          <li>
            <code>LBK-Launcher-linux.rpm</code> — для Fedora/RHEL
          </li>
        </ul>
      </div>

      <div className="setup-section">
        <h3>
          <SvgIcon icon={faStar} /> Встановлення Flatpak (рекомендовано)
        </h3>
        <p>
          Найпростіший спосіб встановити лаунчер. Відкрийте{" "}
          <a href={flatpakrefUrl} className="setup-link">
            посилання на flatpakref
          </a>{" "}
          — система запропонує встановити застосунок автоматично.
        </p>
        <p>Або через термінал:</p>
        <div className="setup-code">
          <code>flatpak install --user {flatpakrefUrl}</code>
          <button
            className="copy-btn"
            onClick={() =>
              navigator.clipboard.writeText(
                `flatpak install --user ${flatpakrefUrl}`,
              )
            }
          >
            <SvgIcon icon={faCopy} />
          </button>
        </div>
      </div>

      <div className="setup-section">
        <h3>Встановлення AppImage</h3>
        <ol className="setup-steps">
          <li>Завантажте AppImage файл</li>
          <li>
            Зробіть файл виконуваним (ПКМ → Властивості → Права → Дозволити
            виконання)
          </li>
          <li>Двічі клацніть для запуску або виконайте в терміналі</li>
        </ol>
      </div>

      <div className="setup-section">
        <h3>Встановлення RPM</h3>
        <ol className="setup-steps">
          <li>Завантажте RPM файл</li>
          <li>Встановіть через пакетний менеджер:</li>
        </ol>
        <div className="setup-code">
          <code>sudo rpm -i LBK-Launcher-linux.rpm</code>
          <button
            className="copy-btn"
            onClick={() =>
              navigator.clipboard.writeText(
                "sudo rpm -i LBK-Launcher-linux.rpm",
              )
            }
          >
            <SvgIcon icon={faCopy} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SteamDeckInstructions() {
  const flatpakrefUrl =
    "https://flatpak.lbklauncher.com/com.lbk.launcher.flatpakref";

  return (
    <div className="setup-platform">
      <h2>
        <SvgIcon icon={faSteam} />
        Встановлення на Steam Deck
      </h2>

      {/* Recommended: Flatpak */}
      <div className="setup-section">
        <h3>
          <SvgIcon icon={faStar} /> Спосіб 1: Flatpak (рекомендовано)
        </h3>
        <p>
          Найпростіший спосіб — встановити через Flatpak. Відкрийте{" "}
          <a href={flatpakrefUrl} className="setup-link">
            це посилання
          </a>{" "}
          у браузері на Steam Deck, і система запропонує встановити застосунок
          автоматично.
        </p>
        <ol className="setup-steps">
          <li>
            <strong>Перейдіть у режим робочого столу:</strong> Затисніть кнопку
            живлення → &quot;Перейти на робочий стіл&quot;
          </li>
          <li>
            <strong>Відкрийте Firefox:</strong> Використовуйте Firefox (не
            Chrome), оскільки він краще інтегрований з системою
          </li>
          <li>
            <strong>Відкрийте посилання:</strong> У Firefox перейдіть за{" "}
            <a href={flatpakrefUrl} className="setup-link">
              посиланням на flatpakref
            </a>
            . Система автоматично відкриє Discover і запропонує встановити LBK
            Launcher.
          </li>
          <li>
            <strong>Встановіть:</strong> Натисніть &quot;Install&quot; у
            Discover
          </li>
        </ol>
        <p>
          <strong>Примітка:</strong> Якщо браузер пропонує просто скачати файл
          замість відкриття Discover, встановіть через термінал (Konsole):
        </p>
        <div className="setup-code">
          <code>flatpak install --user {flatpakrefUrl}</code>
          <button
            className="copy-btn"
            onClick={() =>
              navigator.clipboard.writeText(
                `flatpak install --user ${flatpakrefUrl}`,
              )
            }
          >
            <SvgIcon icon={faCopy} />
          </button>
        </div>
      </div>

      {/* Alternative: AppImage */}
      <div className="setup-section">
        <h3>Спосіб 2: AppImage</h3>
        <ol className="setup-steps">
          <li>
            <strong>Перейдіть у режим робочого столу:</strong> Затисніть кнопку
            живлення → &quot;Перейти на робочий стіл&quot;
          </li>
          <li>
            <strong>Завантажте:</strong> Відкрийте браузер та завантажте файл{" "}
            <code>LBK-Launcher-linux.AppImage</code>
          </li>
          <li>
            <strong>Надайте права:</strong>
            <ul>
              <li>Відкрийте файловий менеджер Dolphin</li>
              <li>Перейдіть до папки завантажень</li>
              <li>ПКМ на AppImage → Властивості → Права</li>
              <li>
                Увімкніть &quot;Виконання: Дозволити виконання як програми&quot;
              </li>
            </ul>
          </li>
          <li>
            <strong>Додайте до Steam (опціонально):</strong>
            <ul>
              <li>Запустіть Steam</li>
              <li>
                Оберіть &quot;Додати гру&quot; → &quot;Додати гру не зі
                Steam&quot;
              </li>
              <li>Перейдіть до завантажень та оберіть AppImage</li>
              <li>Підтвердіть додавання</li>
            </ul>
            <p>
              За бажанням можна завантажити медіа для оформлення бібліотеки:{" "}
              <a href="https://github.com/Vadko/lbk-launcher/releases/download/v2.5.0/Steam.media.zip">
                Steam media.zip
              </a>
            </p>
          </li>
        </ol>
      </div>

      <div className="setup-section">
        <div className="setup-tip">
          <SvgIcon icon={faGamepad} />
          <span>
            Лаунчер автоматично підтримує навігацію геймпадом при натисканні
            будь-якої кнопки контролера.
          </span>
        </div>
      </div>
    </div>
  );
}

type DownloadLinks = ReturnType<typeof getDownloadLinks>;

function ReleaseFilesBlock({
  links,
  isLoading,
}: {
  links: DownloadLinks;
  isLoading: boolean;
}) {
  const v = links.version ?? "...";

  const files: {
    name: string;
    url: string | null;
    platform: string;
    icon: typeof faWindows;
    desc: string;
  }[] = [
    {
      name: "LBK-Launcher-win-Setup.exe",
      url: links.windows,
      platform: "Windows",
      icon: faWindows,
      desc: "Інсталятор — рекомендовано для більшості користувачів",
    },
    {
      name: "LBK-Launcher-win-Portable.exe",
      url: links.windowsPortable,
      platform: "Windows",
      icon: faWindows,
      desc: "Портативна версія — без встановлення, запускається з будь-якого місця",
    },
    {
      name: `LBK-Launcher-${v}-arm64.dmg`,
      url: links.macosArm,
      platform: "macOS",
      icon: faApple,
      desc: "Apple Silicon",
    },
    {
      name: `LBK-Launcher-${v}-x64.dmg`,
      url: links.macosX64,
      platform: "macOS",
      icon: faApple,
      desc: "Intel Mac",
    },
    {
      name: "LBK-Launcher-linux.AppImage",
      url: links.linux,
      platform: "Linux",
      icon: faLinux,
      desc: "Універсальний формат — працює на більшості дистрибутивів",
    },
    {
      name: "LBK-Launcher-linux.rpm",
      url: links.linuxRpm,
      platform: "Linux",
      icon: faLinux,
      desc: "RPM пакет для Fedora / RHEL",
    },
  ];

  return (
    <div className="setup-release-files">
      <div className="setup-release-files-header">
        <h2>
          <SvgIcon icon={faFileArrowDown} />
          Файли релізу{links.version ? ` v${links.version}` : ""}
        </h2>
        <a
          href="https://github.com/Vadko/lbk-launcher/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="setup-github-link"
        >
          <SvgIcon icon={faGithub} />
          Всі релізи на GitHub
        </a>
      </div>
      {isLoading ? (
        <p className="setup-loading">Завантаження...</p>
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
              <p className="release-file-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
