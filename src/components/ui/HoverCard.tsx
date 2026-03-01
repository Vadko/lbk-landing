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
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  const startAnimation = useCallback(() => {
    // Не запускаємо анімацію на touch-пристроях
    if (isTouchDevice) return;

    const animate = () => {
      if (!cardRef.current) return;
      angleRef.current += 0.5;
      if (angleRef.current >= 360) angleRef.current = 0;
      cardRef.current.style.setProperty(
        "--gradient-angle",
        String(angleRef.current)
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, [isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    startAnimation();
  }, [startAnimation, isTouchDevice]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;
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
    if (isTouchDevice) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", "50%");
      cardRef.current.style.setProperty("--mouse-y", "50%");
      angleRef.current = 0;
      cardRef.current.style.setProperty("--gradient-angle", "0");
    }
  }, [isTouchDevice]);

  return (
    <div
      ref={cardRef}
      className={`hover-card ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
