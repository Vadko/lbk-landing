import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BodyClass } from "@/components/layout/BodyClass";
import { MaintenancePage } from "@/components/MaintenancePage";
import { type LocaleParams, resolveLocale } from "@/i18n/resolve-locale";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "maintenance" });

  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function Maintenance({ params }: LocaleParams) {
  await resolveLocale(params);
  return (
    <>
      <BodyClass name="is-maintenance" />
      <MaintenancePage />
    </>
  );
}
