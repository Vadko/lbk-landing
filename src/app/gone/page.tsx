import type { Metadata } from "next";
import { StatusPage } from "@/components/StatusPage";

export const metadata: Metadata = {
  title: "Переклад видалено",
  robots: { index: false, follow: true },
};

export default function GonePage() {
  return (
    <StatusPage
      code="410"
      title="Переклад видалено"
      text="Ця сторінка перекладу більше не існує та була видалена назавжди."
    />
  );
}
