"use client";

import { type ReactNode, useRef } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
  };

  const handleMouseLeave = () => {
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
  };

  return (
    <div
      ref={cardRef}
      className={`hover-card glass-bg glass-bg--no-hover ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
