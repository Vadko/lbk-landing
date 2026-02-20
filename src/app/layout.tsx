import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-outfit",
});

const translateCount = 500;
export const metadata: Metadata = {
  metadataBase: new URL("https://lbklauncher.com"),
  title: {
    default:
      "LBK Launcher — Ігри українською: автоматичний українізатор та каталог перекладів",
    template: "%s | LBK Launcher",
  },
  description: `Завантажуйте LBK Launcher для швидкого встановлення українських локалізацій. Понад ${translateCount} українізаторів, автоматичне оновлення та підтримка Steam Deck. Грайте в улюблені ігри рідною мовою без зайвих зусиль.`,
  keywords: [
    "українізатор",
    "українізатор ігор",
    "українська локалізація",
    "грати українською",
    "ігри українською",
    "український переклад ігор",
    "LBK Launcher",
    "локалізація ігор",
    "переклад ігор українською",
    "українізація ігор",
    "ігри на українській",
    "українська мова в іграх",
  ],
  authors: [{ name: "LB Team & GGL Studio" }],
  creator: "LB Team & GGL Studio",
  publisher: "LB Team & GGL Studio",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://lbklauncher.com",
    siteName: "LBK Launcher — Ігри українською",
    title: "LBK Launcher — Ігри українською",
    description: `Завантажуйте LBK Launcher для швидкого встановлення українських локалізацій. Понад ${translateCount} українізаторів, автоматичне оновлення та підтримка Steam Deck. Грайте в улюблені ігри рідною мовою без зайвих зусиль.`,
    images: [
      {
        url: "/assets/og-image.webp",
        width: 1200,
        height: 630,
        alt: "LBK Launcher — Ігри українською",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LBK Launcher — Ігри українською мовою",
    description: `Завантажуйте LBK Launcher для швидкого встановлення українських локалізацій. Понад ${translateCount} українізаторів, автоматичне оновлення та підтримка Steam Deck. Грайте в улюблені ігри рідною мовою без зайвих зусиль.`,
    images: ["/assets/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lbklauncher.com/",
  },
  icons: {
    icon: "/assets/favicon.ico",
    apple: "/assets/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning className={outfit.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LBK Launcher",
              description: `Завантажуйте LBK Launcher для швидкого встановлення українських локалізацій. Понад ${translateCount} українізаторів, автоматичне оновлення та підтримка Steam Deck. Грайте в улюблені ігри рідною мовою без зайвих зусиль.`,
              url: "https://lbklauncher.com",
              downloadUrl:
                "https://github.com/Vadko/lbk-launcher/releases/latest",
              operatingSystem: "Windows, macOS, Linux",
              applicationCategory: "GameApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "UAH",
              },
              author: {
                "@type": "Organization",
                name: "LB Team & GGL Studio",
                url: "https://t.me/LittleBitUA",
              },
              inLanguage: "uk",
            }),
          }}
        />
      </head>
      <body className="antialiased main-bg">
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
            <ScrollToTop />
          </QueryProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-41MBF0G83S" />
    </html>
  );
}
