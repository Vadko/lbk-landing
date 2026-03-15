"use client";

import { useEffect, useRef } from "react";

export function BannerParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const y = Math.min(window.scrollY, 0);
      const scale = 1 + (-y / 150) * 0.5;
      el.style.transform = `scale(${scale})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transformOrigin: "center top",
        position: "absolute",
        inset: 0,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
