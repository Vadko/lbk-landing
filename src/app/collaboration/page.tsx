import type { Metadata } from "next";
import { CollaborationPage } from "@/components/collaboration/CollaborationPage";

export const metadata: Metadata = {
  title: "Співпраця з LBK Launcher",
  description:
    "Сторінка для партнерів LBK Launcher: переваги платформи, процес підключення перекладів і контакт для співпраці.",
};

export default function CollaborationRoutePage() {
  return <CollaborationPage />;
}
