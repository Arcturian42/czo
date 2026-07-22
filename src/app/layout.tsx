import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SITE_URL } from "@/lib/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileActions } from "@/components/layout/sticky-mobile-actions";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.brandName} — Réparation et formation en électronique à ${siteConfig.city}`,
    template: `%s · ${siteConfig.brandName}`,
  },
  description: siteConfig.shortPitch,
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.brandName,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#17151b",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        {/* Progressive enhancement : marque le document comme « JS actif »
            avant le premier rendu, pour activer les animations sans FOUC. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window){document.documentElement.classList.add('js')}",
          }}
        />
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileActions />
      </body>
    </html>
  );
}
