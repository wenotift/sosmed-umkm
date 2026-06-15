import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://umkm.sosmed.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sosmed AI | Asisten WhatsApp AI untuk Bisnis F&B Indonesia",
    template: "%s | Sosmed AI",
  },
  description:
    "Sosmed AI: asisten bisnis AI-native di WhatsApp untuk UMKM F&B Indonesia — bukan sekadar chatbot. Order otomatis, sistem poin, menu digital, kelola dari chat.",
  keywords: [
    "bot WhatsApp coffee shop",
    "order otomatis WhatsApp",
    "sistem poin loyalty F&B",
    "WhatsApp Business API Indonesia",
    "AI customer service restoran",
    "loyalty program kafe",
    "member card digital WhatsApp",
    "asisten bisnis WhatsApp",
    "AI native WhatsApp Indonesia",
    "sistem order kafe",
  ],
  authors: [{ name: "Sosmed AI" }],
  creator: "Sosmed AI",
  publisher: "Sosmed AI",
  applicationName: "Sosmed AI",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Sosmed AI",
    title: "Sosmed AI | WhatsApp Anda, AI Assistant Bisnis Anda",
    description:
      "Sosmed AI: asisten bisnis AI-native di WhatsApp untuk UMKM F&B Indonesia — bukan sekadar chatbot. Order otomatis, sistem poin, menu digital, kelola dari chat.",
    images: [
      {
        url: "/images/og-image-umkm-sosmed-ai.jpg",
        width: 1350,
        height: 900,
        alt: "Sosmed AI — asisten WhatsApp AI untuk bisnis F&B Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sosmed AI | WhatsApp Anda, AI Assistant Bisnis Anda",
    description:
      "Sosmed AI: asisten bisnis AI-native di WhatsApp untuk UMKM F&B Indonesia — bukan sekadar chatbot. Order otomatis, sistem poin, menu digital, kelola dari chat.",
    images: ["/images/og-image-umkm-sosmed-ai.jpg"],
  },
  // Publicly indexable at launch; follow links. robots.txt allows crawling
  // and social unfurl bots (WhatsApp, LinkedInBot, Twitterbot,
  // facebookexternalhit) can fetch previews. (The 7 "Segera Hadir"
  // placeholder routes keep their own per-page noindex via lib/seo.ts
  // until they have real content.)
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ===== Structured data (GEO/AIO/AEO) =====
const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sosmed AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "WhatsApp / Web",
  description:
    "Asisten WhatsApp AI untuk bisnis F&B Indonesia: order otomatis, sistem poin, member, semua lewat WhatsApp.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "IDR",
    lowPrice: "249000",
    highPrice: "1399000",
    offerCount: 4,
  },
  publisher: {
    "@type": "Organization",
    name: "Sosmed AI",
    url: SITE_URL,
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sosmed AI",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    "Platform AI yang mengubah WhatsApp jadi asisten bisnis otomatis untuk UMKM F&B Indonesia.",
  sameAs: [
    "https://www.instagram.com/sosmed.io",
    "https://www.tiktok.com/@sosmed.io",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
