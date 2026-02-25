"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackViewGamesCatalog } from "@/lib/analytics";
import { NavbarLogo } from "../icons/NavbarLogo";

const navbarLinks = [
  {
    href: "/#hero",
    label: "Головна",
    track: null,
  },
  {
    href: "/games",
    label: "Каталог",
    track: "trackViewGamesCatalog",
  },
  {
    href: "/#gallery",
    label: "Галерея",
    track: null,
  },
  {
    href: "/#showcase",
    label: "Функції",
    track: null,
  },
  {
    href: "/collaboration",
    label: "Співпраця",
    track: null,
  },
];

const navbarSocials = [
  {
    name: "Telegram",
    href: "https://t.me/LittleBitUA",
    iconClass: "fa-brands fa-telegram",
    title: "Telegram",
  },
  {
    name: "X",
    href: "https://x.com/LittleBitUA",
    iconClass: "fa-brands fa-x-twitter",
    title: "X",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@UA_LittleBit",
    iconClass: "fa-brands fa-youtube",
    title: "YouTube",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@littlebit_ua",
    iconClass: "fa-brands fa-tiktok",
    title: "TikTok",
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 769) {
        setIsMobileMenuOpen(false);
      }
      if (navbarRef.current) {
        document.body.style.setProperty(
          "--navbar-height",
          `${navbarRef.current.offsetHeight}px`
        );
      }
    };

    window.addEventListener("resize", handleResize);
    if (navbarRef.current) {
      document.body.style.setProperty(
        "--navbar-height",
        `${navbarRef.current.offsetHeight}px`
      );
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isMobileMenuOpen);
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <div className="container nav-container">
          <Link href="/" className="logo">
            <NavbarLogo />
            <span className="highlight">Launcher</span>
          </Link>

          <ul className="nav-links">
            {navbarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={
                    link.track === "trackViewGamesCatalog"
                      ? trackViewGamesCatalog
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-socials">
            {navbarSocials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.title}
              >
                <i className={social.iconClass} />
              </a>
            ))}
          </div>

          <button
            type="button"
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="mobile-menu-toggle__icon" aria-hidden="true">
              <i className="fa-solid fa-bars" />
            </span>
            <span className="mobile-menu-toggle__close" aria-hidden="true">
              <i className="fa-solid fa-xmark" />
              <span />
            </span>
          </button>
        </div>
      </nav>
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? "is-open" : ""}`}
      >
        <button
          type="button"
          className="mobile-nav-overlay__backdrop"
          onClick={closeMobileMenu}
          aria-label="Close mobile menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        />
        <div
          id="mobile-navigation-menu"
          className={`mobile-nav-menu ${isMobileMenuOpen ? "is-open" : ""}`}
        >
          <ul className="mobile-nav-menu__links">
            {navbarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={
                    link.track === "trackViewGamesCatalog"
                      ? () => {
                          trackViewGamesCatalog();
                          closeMobileMenu();
                        }
                      : closeMobileMenu
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-nav-menu__socials">
            {/* <button
              type="button"
              className="mobile-nav-menu__social mobile-nav-menu__social--plain"
              aria-label="Language switch"
            >
              <i className="fa-solid fa-globe" />
            </button> */}
            {navbarSocials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-menu__social"
                title={social.title}
                onClick={closeMobileMenu}
              >
                <i className={social.iconClass} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
