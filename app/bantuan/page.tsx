import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import BantuanContent from "./BantuanContent";
import { ALL_FAQS, toPlainText } from "./faqs";

export const metadata: Metadata = pageMetadata({
  title: "Pusat Bantuan",
  description:
    "Pusat bantuan Sosmed AI: jawaban soal harga & paket, order & quota, fitur & produk, dan akun & langganan. Cari cepat, atau hubungi tim kami via WhatsApp.",
  path: "/bantuan",
});

// /bantuan owns its own FAQPage (covers all 23 help FAQs). The global homepage
// FAQ was moved to app/page.tsx, so there is no double-FAQPage on this route.
const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: toPlainText(f.a) },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Bantuan", item: `${SITE_URL}/bantuan` },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BantuanContent />
    </>
  );
}
