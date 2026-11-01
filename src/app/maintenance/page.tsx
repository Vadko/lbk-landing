import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BodyClass } from "@/components/layout/BodyClass";
import { MaintenancePage } from "@/components/MaintenancePage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("maintenance");

  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default function Maintenance() {
  return (
    <>
      <BodyClass name="is-maintenance" />
      <MaintenancePage />
    </>
  );
}
