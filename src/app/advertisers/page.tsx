import type { Metadata } from "next";
import { AdvertisersPage } from "@/components/advertisers/AdvertisersPage";

export const metadata: Metadata = {
  title: "Реклама в LBK Launcher",
  description:
    "Розмістіть рекламу свого продукту в LBK Launcher та досягніть активної української gaming-аудиторії.",
};

export default function AdvertisersRoutePage() {
  return <AdvertisersPage />;
}
