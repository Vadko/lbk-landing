"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useReducer, useRef } from "react";

interface OpenInLauncherProps {
  gameName: string;
  gameSlug: string;
  team: string;
  teamSlug: string;
  bannerUrl?: string | null;
  logoUrl?: string | null;
}

type LauncherState = "attempting" | "failed" | "opened";

interface State {
  status: LauncherState;
  countdown: number;
  retryCount: number;
}

type Action =
  | { type: "OPENED" }
  | { type: "FAILED" }
  | { type: "RETRY" }
  | { type: "TICK" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPENED":
      return { ...state, status: "opened" };
    case "FAILED":
      return { ...state, status: "failed" };
    case "RETRY":
      return {
        status: "attempting",
        countdown: 3,
        retryCount: state.retryCount + 1,
      };
    case "TICK":
      return {
        ...state,
        countdown: Math.max(0, state.countdown - 1),
      };
    default:
      return state;
  }
}

export function OpenInLauncher({
  gameName,
  gameSlug,
  team,
  teamSlug,
  bannerUrl,
  logoUrl,
}: OpenInLauncherProps) {
  const [state, dispatch] = useReducer(reducer, {
    status: "attempting",
    countdown: 3,
    retryCount: 0,
  });

  const linkRef = useRef<HTMLAnchorElement>(null);
  const launcherUrl = `lbk://games/${gameSlug}/${encodeURIComponent(team)}`;
  const gamePageUrl = `/games/${gameSlug}/${teamSlug}`;

  useEffect(() => {
    if (state.status !== "attempting") return;

    // Click hidden link to trigger protocol
    linkRef.current?.click();

    // If we're still here after timeout, launcher probably didn't open
    const checkTimeout = setTimeout(() => {
      dispatch({ type: "FAILED" });
    }, 2500);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        dispatch({ type: "OPENED" });
        clearTimeout(checkTimeout);
      }
    };

    const handleBlur = () => {
      dispatch({ type: "OPENED" });
      clearTimeout(checkTimeout);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      clearTimeout(checkTimeout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [state.status, state.retryCount]);

  useEffect(() => {
    if (state.status !== "attempting") return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, state.retryCount]);

  const handleRetry = () => {
    dispatch({ type: "RETRY" });
  };

  const copyShareLink = async () => {
    const shareUrl = `https://lbklauncher.com/open/${gameSlug}/${teamSlug}`;
    await navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="open-launcher-page">
      {bannerUrl && (
        <div
          className="open-launcher-bg"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        />
      )}

      {/* Hidden link for triggering protocol */}
      <a ref={linkRef} href={launcherUrl} style={{ display: "none" }} />

      <div className="open-launcher-content">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={gameName}
            width={200}
            height={80}
            className="open-launcher-logo"
          />
        )}

        <h1 className="open-launcher-title">{gameName}</h1>
        <p className="open-launcher-team">Переклад від {team}</p>

        {state.status === "attempting" && (
          <div className="open-launcher-status">
            <div className="open-launcher-spinner" />
            <p>Відкриваємо LBK Launcher...</p>
            <span className="open-launcher-countdown">{state.countdown}</span>
          </div>
        )}

        {state.status === "opened" && (
          <div className="open-launcher-status open-launcher-success">
            <i className="fa-solid fa-check-circle" />
            <p>Лаунчер відкрито!</p>
            <Link href={gamePageUrl} className="open-launcher-link">
              Перейти на сторінку гри
            </Link>
          </div>
        )}

        {state.status === "failed" && (
          <div className="open-launcher-status open-launcher-failed">
            <i className="fa-solid fa-download" />
            <h2>LBK Launcher не встановлено</h2>
            <p>Щоб грати в {gameName} українською, вам потрібен LBK Launcher</p>

            <div className="open-launcher-actions">
              <Link href="/#hero" className="dl-btn open-launcher-download">
                <i className="fa-brands fa-windows" />
                <div className="dl-info">
                  <span>Завантажити лаунчер</span>
                  <small>Windows / macOS / Linux</small>
                </div>
              </Link>

              <button
                onClick={handleRetry}
                className="open-launcher-retry"
                type="button"
              >
                <i className="fa-solid fa-rotate" />
                Спробувати знову
              </button>
            </div>

            <Link href={gamePageUrl} className="open-launcher-game-link">
              Детальніше про переклад <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        )}

        <button
          onClick={copyShareLink}
          className="open-launcher-share"
          type="button"
        >
          <i className="fa-solid fa-share-nodes" />
          Копіювати посилання
        </button>
      </div>
    </div>
  );
}
