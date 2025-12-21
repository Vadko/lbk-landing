import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Встановлення LB Launcher — інструкція для Windows, macOS, Linux",
  description:
    "Покрокова інструкція з встановлення LB Launcher на Windows, macOS, Linux та Steam Deck. Вирішення проблем з SmartScreen та Gatekeeper.",
  keywords: [
    "встановлення LB Launcher",
    "інструкція встановлення",
    "LB Launcher Windows",
    "LB Launcher macOS",
    "LB Launcher Linux",
    "LB Launcher Steam Deck",
    "українізатор ігор встановлення",
  ],
  openGraph: {
    title: "Встановлення LB Launcher | Інструкція",
    description:
      "Покрокова інструкція з встановлення LB Launcher на вашу платформу.",
  },
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
