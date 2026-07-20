import type { Metadata } from "next";
import { DonatersPage } from "@/components/donaters/DonatersPage";

export const metadata: Metadata = {
  title: "Топ донатерів",
  description:
    "Підтримайте проєкт — і ваше ім'я буде тут. Кожна гривня наближає нові українські локалізації.",
};

export default function DonatersRoutePage() {
  return <DonatersPage />;
}
