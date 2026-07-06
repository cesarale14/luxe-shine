import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileQuoteBar } from "@/components/layout/MobileQuoteBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { SITE, SEO } from "@/content/site";

// Display face — variable, so no fixed weight (enables the light 380–450 range, §4).
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

// Mono — system/report metadata only (§4).
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SEO.home.title,
  description: SEO.home.description,
  applicationName: SITE.brand,
  openGraph: {
    type: "website",
    siteName: SITE.brand,
    locale: "en_US",
    url: SITE.url,
    title: SEO.home.title,
    description: SEO.home.description,
    // TODO(launch): add a real OG/social share image (1200×630) once brand assets exist.
  },
  robots: { index: true, follow: true },
  // Canonical domain set via SITE.url (luxeshinesolutionsllc.com).
  // TODO(launch): add apple-touch icon + a real OG/social share image.
};

export const viewport: Viewport = {
  themeColor: "#10233F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
      </head>
      <body className="min-h-screen antialiased">
        <JsonLd data={localBusinessSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileQuoteBar />
        {/* Spacer so the sticky mobile quote bar never covers the footer legal line. */}
        <div className="h-16 md:hidden" aria-hidden="true" />
      </body>
    </html>
  );
}
