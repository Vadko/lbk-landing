"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface GameBannerProps {
  bannerUrl: string | null;
  logoUrl: string | null;
  name: string;
}

export function GameBanner({ bannerUrl, logoUrl, name }: GameBannerProps) {
  const bannerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bannerInnerRef.current;
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
    <div className="game-banner">
      {bannerUrl ? (
        <div
          ref={bannerInnerRef}
          style={{
            transformOrigin: "center top",
            position: "absolute",
            inset: 0,
            willChange: "transform",
          }}
        >
          <Image
            src={bannerUrl}
            alt={`${name} — український переклад`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="game-banner-placeholder" />
      )}
      <div className="game-banner-overlay" />

      {logoUrl && (
        <Image
          src={logoUrl}
          alt={name}
          width={400}
          height={200}
          className="game-banner-logo"
          style={{
            objectFit: "contain",
            width: "auto",
            height: "auto",
          }}
        />
      )}
    </div>
  );
}
