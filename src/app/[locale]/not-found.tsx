import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { StatusPage } from "@/components/StatusPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("statusPage.notFound");
  return { title: t("title") };
}

export default async function NotFound() {
  const t = await getTranslations("statusPage.notFound");

  return <StatusPage code="404" title={t("title")} text={t("text")} />;
}
