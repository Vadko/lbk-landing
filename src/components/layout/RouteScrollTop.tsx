"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteScrollTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Only scroll to top for page navigations, not hash changes
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}
