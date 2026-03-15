"use client";

import { useEffect, useState } from "react";

const PHRASES = ["без зусиль!", "в один клац!", "це просто!", "це топ!"];

export function TypewriterText() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
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
  }, [text, isDeleting, phraseIndex]);

  return <span className="text-gradient typewriter">{text}</span>;
}
