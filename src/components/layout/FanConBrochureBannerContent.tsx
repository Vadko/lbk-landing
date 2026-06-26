"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";

const DISMISS_KEY = "lbk-fancon-2026-banner-dismissed";
const DISMISS_HOURS = 72;

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const setCookie = (name: string, value: string, hours: number) => {
  const maxAge = hours * 60 * 60;
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
};

export function FanConBrochureBannerContent() {
  const [isVisible, setIsVisible] = useState(
    () => getCookie(DISMISS_KEY) !== "true"
  );

  const handleClose = () => {
    setCookie(DISMISS_KEY, "true", DISMISS_HOURS);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="fancon-banner" role="status" aria-live="polite">
      <button
        type="button"
        className="fancon-banner-close"
        onClick={handleClose}
        aria-label="Закрити повідомлення"
      >
        <SvgIcon icon={faXmark} />
      </button>
      <p className="fancon-banner-title">LBK FanCon 2026</p>
      <p className="fancon-banner-text">
        Дивіться матеріали події: брошуру та презентацію.
      </p>
      <div className="fancon-banner-links">
        <a
          href="https://drive.google.com/file/d/1Y6i0XHijJ0YQ6izp7e6u6KtNyECbdre7/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити брошуру
        </a>
        <a
          href="https://docs.google.com/presentation/d/1tQ8gvxOuZeoRNVg2nC6G9Y4_anrBWZA_CO7IxqG9qX0/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити презентацію
        </a>
      </div>
    </aside>
  );
}
