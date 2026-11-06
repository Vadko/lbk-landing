"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { localeSwitchHref } from "@/i18n/locale-path";
import { type Locale, routing } from "@/i18n/routing";
import { stepLocale } from "@/i18n/step-locale";

interface LanguageSwitcherProps {
  placement: "down" | "up";
  onChange?: () => void;
}

export function LanguageSwitcher({
  placement,
  onChange,
}: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const listId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const switchTo = (next: Locale) => {
    setIsOpen(false);
    onChange?.();
    if (next === locale) {
      return;
    }
    const { search, hash } = window.location;
    router.replace(localeSwitchHref(pathname, next, `${search}${hash}`));
  };

  const focusOption = (option: Locale) => {
    rootRef.current
      ?.querySelector<HTMLButtonElement>(`[data-locale="${option}"]`)
      ?.focus();
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    option: Locale
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(stepLocale(option, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(stepLocale(option, -1));
    }
  };

  return (
    <div className="language-switcher" ref={rootRef}>
      <button
        type="button"
        ref={buttonRef}
        className="language-switcher__button glass-bg"
        aria-label={t("label")}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SvgIcon icon={faGlobe} />
        <span>{locale.toUpperCase()}</span>
        <SvgIcon icon={faChevronDown} className="language-switcher__chevron" />
      </button>
      {isOpen && (
        <ul
          id={listId}
          className={`language-switcher__list language-switcher__list--${placement} glass-bg`}
        >
          {routing.locales.map((option) => (
            <li key={option}>
              <button
                type="button"
                className="language-switcher__option"
                data-locale={option}
                aria-current={option === locale ? "true" : undefined}
                aria-label={t(`names.${option}`)}
                title={t(`names.${option}`)}
                onClick={() => switchTo(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, option)}
              >
                {option.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
