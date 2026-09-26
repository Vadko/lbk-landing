"use client";

import { faWindows } from "@fortawesome/free-brands-svg-icons/faWindows";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faRotate } from "@fortawesome/free-solid-svg-icons/faRotate";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useReducer, useRef } from "react";
import { ActionIcon } from "@/components/ui/ActionIcon";
import { CopyButton } from "@/components/ui/CopyButton";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { useActionPhase } from "@/hooks/useActionPhase";

interface OpenInLauncherProps {
  gameName: string;
  gameSlug: string;
  team: string;
  teamSlug: string;
  bannerUrl?: string | null;
  logoUrl?: string | null;
}

const ATTEMPT_TIMEOUT_MS = 2500;

// blur або приховання вкладки — єдина ознака, що lbk:// підхопив лаунчер
function attemptOpen(
  link: HTMLAnchorElement | null,
  signal?: AbortSignal
): Promise<boolean> {
  return new Promise((resolve) => {
    const scope = new AbortController();
    const finish = (opened: boolean) => {
      scope.abort();
      resolve(opened);
    };
    const options = { signal: scope.signal };
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          finish(true);
        }
      },
      options
    );
    window.addEventListener("blur", () => finish(true), options);
    signal?.addEventListener("abort", () => finish(false), options);
    const timer = setTimeout(() => finish(false), ATTEMPT_TIMEOUT_MS);
    scope.signal.addEventListener("abort", () => clearTimeout(timer));
    link?.click();
  });
}

type LauncherState = "attempting" | "failed" | "opened";

interface State {
  status: LauncherState;
  countdown: number;
}

type Action = { type: "OPENED" } | { type: "FAILED" } | { type: "TICK" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPENED":
      return { ...state, status: "opened" };
    case "FAILED":
      return { ...state, status: "failed" };
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
  });
  const retry = useActionPhase();

  const linkRef = useRef<HTMLAnchorElement>(null);
  const launcherUrl = `lbk://games/${gameSlug}/${encodeURIComponent(team)}`;
  const gamePageUrl = `/games/${gameSlug}/${teamSlug}`;

  // перша спроба автоматична, тому йде повз фазу кнопки
  useEffect(() => {
    const controller = new AbortController();
    void attemptOpen(linkRef.current, controller.signal).then((opened) => {
      if (!controller.signal.aborted) {
        dispatch({ type: opened ? "OPENED" : "FAILED" });
      }
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (state.status !== "attempting") {
      return;
    }

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status]);

  const handleRetry = () => {
    if (retry.phase === "pending") {
      return;
    }
    // блок «не встановлено» лишається змонтованим: фазу несе іконка кнопки
    void retry
      .run(() => attemptOpen(linkRef.current), {
        isSuccess: (opened) => opened,
      })
      .then((opened) => {
        if (opened) {
          dispatch({ type: "OPENED" });
        }
      });
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
            <SvgIcon icon={faCheckCircle} />
            <p>Лаунчер відкрито!</p>
            <Link href={gamePageUrl} className="open-launcher-game-link">
              Перейти на сторінку гри
              <SvgIcon icon={faArrowRight} />
            </Link>
          </div>
        )}

        {state.status === "failed" && (
          <div className="open-launcher-status open-launcher-failed">
            <SvgIcon icon={faDownload} />
            <h2>LBK Launcher не встановлено</h2>
            <p>Щоб грати в {gameName} українською, вам потрібен LBK Launcher</p>

            <div className="open-launcher-actions">
              <Link href="/" className="btn btn-gradient btn--big">
                <SvgIcon icon={faWindows} />
                <div className="dl-info">
                  <span>Завантажити лаунчер</span>
                  <small>Windows / macOS / Linux</small>
                </div>
              </Link>

              <button
                onClick={handleRetry}
                className="btn glass-bg"
                type="button"
                aria-busy={retry.phase === "pending"}
              >
                <ActionIcon phase={retry.phase} icon={faRotate} />
                Спробувати знову
              </button>
            </div>

            <Link href={gamePageUrl} className="open-launcher-game-link">
              Детальніше про переклад <SvgIcon icon={faArrowRight} />
            </Link>
          </div>
        )}

        <CopyButton
          text={`https://lbklauncher.com/open/${gameSlug}/${teamSlug}`}
          title="Копіювати посилання"
          label="Копіювати посилання"
          icon={faShareNodes}
          className="btn glass-bg"
        />
      </div>
    </div>
  );
}
