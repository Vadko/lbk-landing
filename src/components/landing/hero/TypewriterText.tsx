"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const PHRASES = ["effortless", "oneClick", "simple", "top"] as const;

export function TypewriterText() {
  const t = useTranslations("landingHero.phrases");
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = t(PHRASES[phraseIndex]);
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < currentPhrase.length) {
            setText(currentPhrase.slice(0, text.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (text.length > 0) {
            setText(text.slice(0, -1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [t, text, isDeleting, phraseIndex]);

  return <span className="text-gradient typewriter">{text}</span>;
}
