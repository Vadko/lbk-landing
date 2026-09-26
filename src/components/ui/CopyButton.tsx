"use client";

import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { useActionPhase } from "@/hooks/useActionPhase";
import { ActionIcon } from "./ActionIcon";
import type { FaIconDef } from "./MorphSvgIcon";

interface CopyButtonProps {
  text: string;
  title: string;
  label?: string;
  className?: string;
  icon?: FaIconDef;
  size?: number;
  onCopied?: () => void;
}

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(area);
  if (!copied) {
    throw new Error("clipboard unavailable");
  }
}

export function CopyButton({
  text,
  title,
  label,
  className = "copy-btn",
  icon = faCopy,
  size = 16,
  onCopied,
}: CopyButtonProps) {
  const { phase, attempt } = useActionPhase({ minPendingMs: 0 });

  const handleClick = () => {
    void attempt(
      async () => {
        await writeToClipboard(text);
        onCopied?.();
      },
      { label: "CopyButton" }
    );
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      title={title}
      aria-label={label ? undefined : title}
      disabled={phase === "pending"}
    >
      <ActionIcon
        phase={phase}
        icon={icon}
        size={size}
        label={label ? undefined : title}
        optical={Boolean(label)}
      />
      {label}
    </button>
  );
}
