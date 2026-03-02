"use client";

import { useState } from "react";
import { AIBadgeIcon } from "./icons/AIBadgeIcon";
import { AIEditedBadgeIcon } from "./icons/AIEditedBadgeIcon";

interface TranslateTypeBadgeProps {
  type: "edited" | "non-edited";
  className?: string;
}

export function TranslateTypeBadge({
  type,
  className = "",
}: TranslateTypeBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  if (!type) {
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
      <span className="translate-type-badge">
        {type === "edited" ? <AIEditedBadgeIcon /> : <AIBadgeIcon />}
      </span>
      {showTooltip && (
        <div className="translate-type-badge__tooltip" role="tooltip">
          {type === "edited" ? "ШІ + редактура людиною" : "Переклад ШІ"}
        </div>
      )}
    </div>
  );
}
