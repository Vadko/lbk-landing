import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { MaintenancePage } from "@/components/MaintenancePage";

export const metadata: Metadata = {
  title: "Технічні роботи",
  robots: { index: false, follow: false },
};

export default function Maintenance() {
  return (
    <>
      <BodyClass name="is-maintenance" />
      <MaintenancePage />
    </>
  );
}
