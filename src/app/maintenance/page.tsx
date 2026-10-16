import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isMaintenanceMode } from "@/lib/maintenance";

// A static page would send the 503 with a year-long s-maxage that a CDN could keep after maintenance ends.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Технічні роботи",
  robots: { index: false, follow: false },
};

// Only the proxy's 503 rewrite target; the root layout renders the stub itself.
export default function Maintenance() {
  if (!isMaintenanceMode) {
    notFound();
  }

  return null;
}
