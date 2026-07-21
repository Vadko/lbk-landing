"use client";

import { type ReactNode, useCallback, useMemo, useRef } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Перевірка чи це touch-пристрій (один раз при монтуванні)
  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) {
        return;
      }
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const posX = (x / rect.width) * 100;
      const posY = (y / rect.height) * 100;
      cardRef.current.style.setProperty("--mouse-x", `${posX}%`);
      cardRef.current.style.setProperty("--mouse-y", `${posY}%`);
    },
    [isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) {
      return;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", "50%");
      cardRef.current.style.setProperty("--mouse-y", "50%");
    }
  }, [isTouchDevice]);

  return (
    <div
      ref={cardRef}
      className={`hover-card ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
