import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://umkm.sosmed.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sosmed AI | Asisten WhatsApp AI untuk Coffee Shop & Restoran",
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
    "Asisten WhatsApp AI untuk coffee shop dan restoran Indonesia: order otomatis, sistem poin, member, semua lewat WhatsApp.",
  offers: { "@type": "Offer", price: "249000", priceCurrency: "IDR" },
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

// Mirrors the visible FAQ on the homepage verbatim (AEO/AIO — keep identical).
const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa itu Sosmed AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Asisten WhatsApp berbasis AI khusus untuk bisnis F&B kecil seperti kafe, restoran, dan warung. Bot kami terima order otomatis, balas pelanggan 24 jam, dan kelola sistem poin member, semua lewat WhatsApp yang sudah Anda pakai.",
      },
    },
    {
      "@type": "Question",
      name: "Saya nggak ngerti teknologi, bisa pakai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bisa banget. Nggak perlu install aplikasi atau belajar sistem ribet. Tim kami bantu setting dalam 30 menit. Kalau bisa pakai WhatsApp, Anda bisa pakai Sosmed AI.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah nomor WhatsApp bisnis saya aman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sangat aman. Kami membangun di atas WhatsApp Business API, bukan tools bajakan yang minta scan QR. Jadi lebih stabil dan sesuai ketentuan WhatsApp, nomor Anda lebih terjaga, dan bisa kirim promo dengan lebih tenang.",
      },
    },
    {
      "@type": "Question",
      name: "Gimana sistem poinnya bekerja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Setiap belanja Rp 1.000 dapat 1 poin. Kumpulin 100 poin, dapat voucher Rp 5.000. Pelanggan daftar member langsung lewat WhatsApp, cukup ketik nama. Poin dihitung otomatis, voucher dikirim otomatis.",
      },
    },
    {
      "@type": "Question",
      name: "Pelanggan saya kebanyakan bayar tunai, bisa dapat poin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Untuk awal, poin otomatis untuk order via WhatsApp. Fitur QR di kasir untuk pelanggan walk-in sedang kami siapkan dan tersedia menyusul.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa harganya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mulai Rp 249 ribu/bulan untuk paket Lite, semua fitur sudah termasuk. Pendaftar awal dapat harga founding user yang dikunci selamanya.",
      },
    },
    {
      "@type": "Question",
      name: "Kapan bisa mulai pakai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kami sedang finalisasi dan akan segera membuka akses untuk batch pertama. Pantau halaman ini dan media sosial kami untuk info peluncuran.",
      },
    },
    {
      "@type": "Question",
      name: "Bisa integrasi dengan GoFood/GrabFood/ShopeeFood?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sedang kami kembangkan sebagai add-on. Info rilisnya akan diumumkan menyusul.",
      },
    },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
        />
        {children}
      </body>
    </html>
  );
}
