import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { StatusPage } from "@/components/StatusPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("statusPage.gone");

  return {
    title: t("title"),
    robots: { index: false, follow: true },
  };
}

export default async function GonePage() {
  const t = await getTranslations("statusPage.gone");

  return <StatusPage code="410" title={t("title")} text={t("text")} />;
}
