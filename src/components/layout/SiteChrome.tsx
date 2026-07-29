"use client";

import { useSearchParams } from "next/navigation";
import { FanConBrochureBanner } from "@/components/layout/FanConBrochureBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isPageOnly = searchParams.get("page") === "only";

  if (isPageOnly) {
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10 header-padding">{children}</main>
      <FanConBrochureBanner />
      <Footer />
    </>
  );
}
