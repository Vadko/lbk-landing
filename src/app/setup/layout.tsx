import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Встановлення LBK Launcher — інструкція для Windows, macOS, Linux",
  description:
    "Покрокова інструкція з встановлення LBK Launcher на Windows, macOS, Linux та Steam Deck. Вирішення проблем з SmartScreen та Gatekeeper.",
  keywords: [
    "встановлення LBK Launcher",
    "інструкція встановлення",
    "LBK Launcher Windows",
    "LBK Launcher macOS",
    "LBK Launcher Linux",
    "LBK Launcher Steam Deck",
    "українізатор ігор встановлення",
  ],
  openGraph: {
    title: "Встановлення LBK Launcher | Інструкція",
    description:
      "Покрокова інструкція з встановлення LBK Launcher на вашу платформу.",
  },
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
