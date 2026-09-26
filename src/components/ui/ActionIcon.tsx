"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { useEffect, useState } from "react";
import type { ActionPhase } from "@/hooks/useActionPhase";
import { type FaIconDef, MorphSvgIcon } from "./MorphSvgIcon";

const PENDING_DELAY_MS = 150;
const SPIN_DELAY_MS = 260;

interface ActionIconProps {
  phase: ActionPhase;
  icon?: FaIconDef;
  size?: number;
  className?: string;
  doneClassName?: string;
  errorClassName?: string;
  pendingClassName?: string;
  label?: string;
  optical?: boolean;
}

export function ActionIcon({
  phase,
  icon,
  size = 16,
  className,
  doneClassName = "action-icon--done",
  errorClassName = "action-icon--error",
  pendingClassName = "action-icon--pending",
  label,
  optical = true,
}: ActionIconProps) {
  const [showPending, setShowPending] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (phase !== "pending") {
      return;
    }
    const pendingTimer = setTimeout(() => {
      setShowPending(true);
    }, PENDING_DELAY_MS);
    const spinTimer = setTimeout(() => {
      setSpinning(true);
    }, PENDING_DELAY_MS + SPIN_DELAY_MS);
    return () => {
      clearTimeout(pendingTimer);
      clearTimeout(spinTimer);
      setShowPending(false);
      setSpinning(false);
    };
  }, [phase]);

  let glyph = icon;
  let tone = "";
  if (phase === "pending" && showPending) {
    glyph = faCircleNotch;
    tone = pendingClassName;
  }
  if (phase === "done") {
    glyph = faCheck;
    tone = doneClassName;
  }
  if (phase === "error") {
    glyph = faXmark;
    tone = errorClassName;
  }

  const boxClass = [
    "action-icon",
    optical ? "action-icon--optical" : "",
    tone,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={boxClass} style={{ width: size, height: size }}>
      {glyph ? (
        <MorphSvgIcon
          icon={glyph}
          size={size}
          label={label}
          className={spinning ? "action-icon__glyph--spin" : undefined}
        />
      ) : null}
    </span>
  );
}
