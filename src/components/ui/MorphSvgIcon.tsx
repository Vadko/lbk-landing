"use client";

import { fitIcon } from "morphicons";
import {
  MorphIcon,
  type MorphOptions,
  type SpringPreset,
} from "morphicons/react";
import type { CSSProperties } from "react";

export interface FaIconDef {
  icon: [number, number, string[], string, string | string[]];
}

const fitted = new WeakMap<FaIconDef, string>();

export function fitFaIcon(icon: FaIconDef): string {
  const cached = fitted.get(icon);
  if (cached !== undefined) {
    return cached;
  }
  const [width, height, , , path] = icon.icon;
  const d = Array.isArray(path) ? path.join(" ") : path;
  const value = fitIcon(d, `0 0 ${width} ${height}`);
  fitted.set(icon, value);
  return value;
}

// Faster than the snappy preset (k=420): the same smoothness, half the travel
const MORPH_SPRING: MorphOptions = { stiffness: 800, damping: 42 };

const baseStyle: CSSProperties = {
  display: "inline-block",
  verticalAlign: "-0.125em",
};

interface MorphSvgIconProps {
  icon: FaIconDef;
  size?: number | string;
  className?: string;
  label?: string;
  spring?: SpringPreset | MorphOptions;
  style?: CSSProperties;
}

export function MorphSvgIcon({
  icon,
  size = "1em",
  className,
  label,
  spring = MORPH_SPRING,
  style,
}: MorphSvgIconProps) {
  return (
    <MorphIcon
      icon={fitFaIcon(icon)}
      size={size}
      spring={spring}
      reducedMotion="user"
      fill="currentColor"
      stroke="none"
      className={className}
      label={label}
      style={style ? { ...baseStyle, ...style } : baseStyle}
    />
  );
}
