import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StatusPage } from "@/components/StatusPage";
import { outfit } from "./fonts";

// The locale comes from a request header, so every 404 renders per request instead of from one prerendered uk page
export const instant = false;

export default async function GlobalNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("statusPage.notFound");

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={outfit.variable}
      data-scroll-behavior="smooth"
    >
      <head>
        <title>{`${t("title")} | LBK Launcher`}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
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
