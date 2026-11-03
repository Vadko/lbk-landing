import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StatusPage } from "@/components/StatusPage";
import { routing } from "@/i18n/routing";
import { outfit } from "./fonts";

export default async function GlobalNotFound() {
  const t = await getTranslations("statusPage.notFound");

  return (
    <html
      lang={routing.defaultLocale}
      suppressHydrationWarning
      className={outfit.variable}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased main-bg" suppressHydrationWarning>
        <NextIntlClientProvider>
          <Navbar />
          <main className="relative z-10 header-padding">
            <StatusPage code="404" title={t("title")} text={t("text")} />
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
