import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { type LocaleParams, resolveLocale } from "@/i18n/resolve-locale";
import { localizedAlternates } from "@/lib/localizedAlternates";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "setup.meta" });
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
