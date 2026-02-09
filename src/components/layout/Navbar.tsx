"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useMounted } from "@/hooks/useClientValue";
import { trackViewGamesCatalog } from "@/lib/analytics";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <svg
            width="40"
            height="20"
            viewBox="0 0 390 197"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M376.678 0C383.832 4.32245e-05 389.632 5.00959 389.632 11.1895V78.3281C389.632 84.3146 384.189 89.203 377.345 89.5029L376.678 89.5176H298.953C291.799 89.5174 286 84.5077 286 78.3281C286 72.1483 291.799 67.1379 298.953 67.1377H345.401L295.159 23.7383C290.1 19.3684 290.1 12.2829 295.159 7.91309C300.218 3.54326 308.421 3.54324 313.479 7.91309L363.724 51.3145V11.1895C363.724 5.00956 369.523 0 376.678 0Z"
              fill="var(--color-main)"
            />
            <path
              d="M376.975 107.482C384.129 107.482 389.929 112.492 389.929 118.672C389.929 124.852 384.129 129.862 376.975 129.862H330.525L380.769 173.264C385.827 177.634 385.827 184.718 380.769 189.088C375.71 193.458 367.508 193.458 362.449 189.088L312.204 145.686V185.811C312.204 191.99 306.404 197 299.25 197C292.096 197 286.297 191.99 286.297 185.811V118.672C286.297 112.492 292.096 107.483 299.25 107.482H376.975Z"
              fill="var(--color-accent)"
            />
            <path
              d="M6.88892 186.689C3.08427 186.689 0 183.604 0 179.8V19.9768C0 16.1721 3.08427 13.0878 6.88892 13.0878H25.8472C29.6519 13.0878 32.7361 16.1721 32.7361 19.9767V150.04C32.7361 153.844 35.8204 156.928 39.6251 156.928H105.208C109.012 156.928 112.096 160.013 112.096 163.817V179.8C112.096 183.604 109.012 186.689 105.208 186.689H6.88892Z"
              fill="var(--text-primary)"
            />
            <path
              d="M125.931 186.689C122.127 186.689 119.042 183.604 119.042 179.8V164.809C119.042 161.005 122.127 157.92 125.931 157.92H134.97C138.774 157.92 141.859 154.836 141.859 151.032V48.7449C141.859 44.9402 138.774 41.856 134.97 41.856H125.931C122.127 41.856 119.042 38.7717 119.042 34.967V19.9767C119.042 16.1721 122.127 13.0878 125.931 13.0878H208.323C218.904 13.0878 228.08 14.9065 235.851 18.5439C243.787 22.0159 249.904 27.0586 254.203 33.6719C258.667 40.12 260.899 47.8907 260.899 56.984V59.464C260.899 67.4001 259.411 73.9308 256.435 79.0561C253.459 84.0162 249.904 87.9015 245.771 90.7122C242.545 92.8628 239.429 94.5216 236.421 95.6888C235.209 96.1592 234.363 97.2993 234.363 98.5996C234.363 99.9461 235.269 101.114 236.537 101.567C239.566 102.651 242.81 104.324 246.267 106.584C250.566 109.23 254.203 113.115 257.179 118.24C260.32 123.366 261.891 130.062 261.891 138.328V140.808C261.891 150.398 259.659 158.664 255.195 165.609C250.731 172.387 244.531 177.595 236.595 181.233C228.824 184.87 219.731 186.689 209.315 186.689H125.931ZM174.595 150.04C174.595 153.844 177.679 156.928 181.484 156.928H205.347C212.456 156.928 218.16 155.192 222.459 151.72C226.923 148.248 229.155 143.288 229.155 136.84V134.36C229.155 127.912 227.006 122.952 222.707 119.48C218.408 116.008 212.622 114.272 205.347 114.272H181.484C177.679 114.272 174.595 117.357 174.595 121.161V150.04ZM174.595 77.6232C174.595 81.4279 177.679 84.5122 181.484 84.5122H204.851C211.63 84.5122 217.168 82.7761 221.467 79.3041C225.931 75.8321 228.163 71.0374 228.163 64.9201V62.44C228.163 56.1574 226.014 51.3627 221.715 48.056C217.416 44.584 211.795 42.848 204.851 42.848H181.484C177.679 42.848 174.595 45.9322 174.595 49.7369V77.6232Z"
              fill="var(--text-primary)"
            />
          </svg>
          <span className="highlight">Launcher</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="/#hero">Головна</Link>
          </li>
          <li>
            <Link href="/games" onClick={trackViewGamesCatalog}>
              Каталог
            </Link>
          </li>
          <li>
            <Link href="/#gallery">Галерея</Link>
          </li>
          <li>
            <Link href="/#showcase">Функції</Link>
          </li>
          <li>
            <Link href="/#collaboration">Співпраця</Link>
          </li>
        </ul>

        <div className="nav-socials">
          <a
            href="https://t.me/LittleBitUA"
            target="_blank"
            rel="noopener noreferrer"
            title="Telegram"
          >
            <i className="fa-brands fa-telegram" />
          </a>
          <a
            href="https://x.com/LittleBitUA"
            target="_blank"
            rel="noopener noreferrer"
            title="X"
          >
            <i className="fa-brands fa-x-twitter" />
          </a>
          <a
            href="https://www.youtube.com/@UA_LittleBit"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
          >
            <i className="fa-brands fa-youtube" />
          </a>
          <a
            href="https://www.tiktok.com/@littlebit_ua"
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
          >
            <i className="fa-brands fa-tiktok" />
          </a>

          {mounted && (
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title="Змінити тему"
            >
              <i className="fa-solid fa-sun" />
              <i className="fa-solid fa-moon" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
