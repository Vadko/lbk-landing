import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("setup.meta");
  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      t("keywordInstall"),
      t("keywordGuide"),
      "LBK Launcher Windows",
      "LBK Launcher macOS",
      "LBK Launcher Linux",
      "LBK Launcher Steam Deck",
      t("keywordUkrainizer"),
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: "https://lbklauncher.com/setup",
    },
  };
}

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
