import type { Metadata } from "next";
import { notFound } from "next/navigation";
// import { AdvertisersPage } from "@/components/advertisers/AdvertisersPage";

export const metadata: Metadata = {
  title: "Реклама в LBK Launcher",
  description:
    "Розмістіть рекламу свого продукту в LBK Launcher та досягніть активної української gaming-аудиторії.",
};

export default function AdvertisersRoutePage() {
  // TODO: Uncomment when advertisers page is ready
  notFound();
  // return <AdvertisersPage />;
}
