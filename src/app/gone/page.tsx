import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { StatusPage } from "@/components/StatusPage";

export const metadata: Metadata = {
  title: "Переклад видалено",
  robots: { index: false, follow: true },
};

export default async function GonePage() {
  // /gone is only meant to be reached via the proxy's 410 rewrite, which sets
  // this marker header. A direct visit has no marker → treat it as a normal 404
  // so the page isn't browsable on its own.
  const headerList = await headers();
  if (headerList.get("x-lbk-gone") !== "1") {
    notFound();
  }

  return (
    <StatusPage
      code="410"
      title="Переклад видалено"
      text="Ця сторінка перекладу більше не існує та була видалена назавжди."
    />
  );
}
