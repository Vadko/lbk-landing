"use client";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { useEffect, useState } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      title="Наверх"
    >
      <SvgIcon icon={faArrowUp} />
    </button>
  );
}
