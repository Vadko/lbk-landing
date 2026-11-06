import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { StatusPage } from "@/components/StatusPage";
import { type LocaleParams, resolveLocale } from "@/i18n/resolve-locale";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "statusPage.gone" });

  return {
    title: t("title"),
    robots: { index: false, follow: true },
  };
}

export default async function GonePage({ params }: LocaleParams) {
  await resolveLocale(params);
  const t = await getTranslations("statusPage.gone");

  return <StatusPage code="410" title={t("title")} text={t("text")} />;
}
