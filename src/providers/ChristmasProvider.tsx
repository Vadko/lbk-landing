"use client";

import { createContext, useContext, useState, ReactNode, useSyncExternalStore } from "react";

interface ChristmasContextType {
  enabled: boolean;
  toggle: () => void;
}

const ChristmasContext = createContext<ChristmasContextType | undefined>(undefined);

const getSnapshot = () => {
  const saved = localStorage.getItem("christmas-effects");
  return saved === null ? true : saved === "true";
};

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export function ChristmasProvider({ children }: { children: ReactNode }) {
  const initialEnabled = useSyncExternalStore(subscribe, getSnapshot, () => true);
  const [enabled, setEnabled] = useState(initialEnabled);

  const toggle = () => {
    setEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("christmas-effects", String(newValue));
      return newValue;
    });
  };

  return (
    <ChristmasContext.Provider value={{ enabled, toggle }}>
      {children}
    </ChristmasContext.Provider>
  );
}

export function useChristmas() {
  const context = useContext(ChristmasContext);
  if (!context) {
    throw new Error("useChristmas must be used within ChristmasProvider");
  }
  return context;
}
