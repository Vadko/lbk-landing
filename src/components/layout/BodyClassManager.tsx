"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function BodyClassManager() {
  const pathname = usePathname();

  useEffect(() => {
    const isGamePage = /^\/games\/.+/.test(pathname);

    if (isGamePage) {
      document.body.classList.remove("main-bg");
    } else {
      document.body.classList.add("main-bg");
    }
  }, [pathname]);

  return null;
}
