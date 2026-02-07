"use client";

import { useEffect } from "react";
import { trackViewGameDetails, trackViewHomepage } from "@/lib/analytics";

interface PageViewTrackerProps {
  event: "view_homepage" | "view_game_details";
  gameName?: string;
}

export function PageViewTracker({ event, gameName }: PageViewTrackerProps) {
  useEffect(() => {
    switch (event) {
      case "view_homepage":
        trackViewHomepage();
        break;
      case "view_game_details":
        if (gameName) trackViewGameDetails(gameName);
        break;
    }
  }, [event, gameName]);

  return null;
}
