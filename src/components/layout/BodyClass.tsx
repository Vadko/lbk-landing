"use client";

import { useEffect } from "react";

interface BodyClassProps {
  name: string;
}

// Replaces body:has(): Activity keeps visited pages in the DOM hidden, where :has() still matches them
export function BodyClass({ name }: BodyClassProps) {
  useEffect(() => {
    document.body.classList.add(name);
    return () => {
      document.body.classList.remove(name);
    };
  }, [name]);

  // Sets the class as soon as a full load parses it; text/plain on the client, where the effect does it
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `document.body.classList.add(${JSON.stringify(name)})`,
      }}
    />
  );
}
