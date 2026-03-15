"use client";

import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faTiktok } from "@fortawesome/free-brands-svg-icons/faTiktok";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { trackViewGamesCatalog } from "@/lib/analytics";
import { NavbarLogo } from "../icons/NavbarLogo";

const navbarLinks = [
  {
    href: "/",
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
    icon: faTelegram,
    title: "Telegram",
  },
  {
    name: "X",
    href: "https://x.com/LittleBitUA",
    icon: faXTwitter,
    title: "X",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@UA_LittleBit",
    icon: faYoutube,
    title: "YouTube",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@littlebit_ua",
    icon: faTiktok,
    title: "TikTok",
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 769) {
        setIsMobileMenuOpen(false);
      }
      if (navbarRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${navbarRef.current.offsetHeight}px`
        );
      }
    };

    window.addEventListener("resize", handleResize);
    if (navbarRef.current) {
      document.documentElement.style.setProperty(
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
                  onClick={(e) => {
                    if (link.track === "trackViewGamesCatalog") {
                      trackViewGamesCatalog();
                    }
                    if (link.href === "/" && pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      window.history.replaceState(null, "", "/");
                    }
                  }}
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
                <SvgIcon icon={social.icon} />
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
              <SvgIcon icon={faBars} />
            </span>
            <span className="mobile-menu-toggle__close" aria-hidden="true">
              <SvgIcon icon={faXmark} />
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
                  onClick={(e) => {
                    if (link.track === "trackViewGamesCatalog") {
                      trackViewGamesCatalog();
                    }
                    if (link.href === "/" && pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      window.history.replaceState(null, "", "/");
                    }
                    closeMobileMenu();
                  }}
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
                <SvgIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
