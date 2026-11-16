import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { localizedAlternates } from "@/lib/localizedAlternates";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
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
    alternates: localizedAlternates("/setup", locale),
  };
}

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
