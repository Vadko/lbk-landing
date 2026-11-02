import { notFound } from "next/navigation";
import { type LocaleParams, resolveLocale } from "@/i18n/resolve-locale";

export const instant = false;

export default async function CatchAllPage({ params }: LocaleParams) {
  await resolveLocale(params);
  notFound();
}
