"use client";

import { useEffect } from "react";

export function IframeResizeMessenger() {
  useEffect(() => {
    const postHeight = () => {
      window.parent.postMessage(
        { type: "resize", height: document.documentElement.scrollHeight },
        "*"
      );
    };

    postHeight();

    const resizeObserver = new ResizeObserver(postHeight);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", postHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", postHeight);
    };
  }, []);

  return null;
}
