"use client";

import { useState } from "react";
import {
  TRANSLATE_TYPE_BADGE_CONFIGS,
  type TranslateTypeBadgeType,
} from "./translateTypeBadgeConfig";
import "./translateTypeBadge.css";

interface TranslateTypeBadgeProps {
  type: TranslateTypeBadgeType;
  className?: string;
}

export function TranslateTypeBadge({
  type,
  className = "",
}: TranslateTypeBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = TRANSLATE_TYPE_BADGE_CONFIGS[type];

  if (!config) {
    return null;
  }

  return (
    <div
      className={`translate-type-badge-wrapper ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <span className="translate-type-badge">{config.icon}</span>
      {showTooltip && (
        <div className="translate-type-badge__tooltip" role="tooltip">
          {config.tooltip}
        </div>
      )}
    </div>
  );
}
