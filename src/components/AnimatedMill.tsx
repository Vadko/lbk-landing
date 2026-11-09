"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { spinRotorOnHover } from "./spinRotorOnHover";

interface AnimatedMillProps {
  children: ReactNode;
}

// The SVG comes in as server-rendered children so its paths stay out of every page's JS
export function AnimatedMill({ children }: AnimatedMillProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const svg = wrapperRef.current?.querySelector("svg");
    if (!svg) {
      return;
    }

    return spinRotorOnHover(svg);
  }, []);

  return (
    <span ref={wrapperRef} className="contents">
      {children}
    </span>
  );
}
