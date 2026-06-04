import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingContent from "./PricingContent";

export const metadata: Metadata = pageMetadata({
  // Title template ("%s | Sosmed AI") appends the brand → resolves to
  // "Harga: 4 Paket mulai Rp 249K/bulan | Sosmed AI".
  title: "Harga: 4 Paket mulai Rp 249K/bulan",
  description:
    "Harga Sosmed AI untuk bisnis F&B Indonesia: 4 sistem terintegrasi dalam 1 langganan, 4 paket mulai Rp 249K/bulan — Lite Rp 249K, Pro Rp 399K, Max Rp 799K, Ultra Rp 1.399K (plus opsi Enterprise). Hemat 2 bulan dengan bayar tahunan.",
  path: "/harga",
  ogTitle: "Harga Sosmed AI — 4 Paket F&B dari Rp 249K/bulan",
});

/* ---- pricing offers (AggregateOffer over the 4 tiers; Enterprise omitted — no fixed price) ---- */
const tierOffer = (name: string, price: string) => ({
  "@type": "Offer",
  name: `Paket ${name}`,
  price,
  priceCurrency: "IDR",
  availability: "https://schema.org/PreOrder",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "IDR",
    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
  },
});

const hargaProductLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Sosmed AI",
  brand: { "@type": "Brand", name: "Sosmed AI" },
  url: `${SITE_URL}/harga`,
  description:
    "Platform WhatsApp AI untuk bisnis F&B Indonesia: Order Bot AI, menu digital + QR, poin & member, dan kelola via WhatsApp — 4 sistem dalam 1 langganan. Tersedia 4 paket (Lite, Pro, Max, Ultra); kebutuhan di atas 4 outlet dilayani lewat opsi Enterprise.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "IDR",
    lowPrice: "249000",
    highPrice: "1399000",
    offerCount: 4,
    offers: [
      tierOffer("Lite", "249000"),
      tierOffer("Pro", "399000"),
      tierOffer("Max", "799000"),
      tierOffer("Ultra", "1399000"),
    ],
  },
};

/* ---- FAQPage — mirrors the 11 visible /harga FAQs verbatim (AEO/AIO) ---- */
const qa = (q: string, a: string) => ({
  "@type": "Question",
  name: q,
  acceptedAnswer: { "@type": "Answer", text: a },
});

const hargaFaqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    qa(
      "Tier mana yang cocok buat saya?",
      "Lite (Rp 249K): kafe baru atau warung kecil, sekitar 5 order/hari atau kurang. Pro (Rp 399K): kafe yang udah jalan dan mau scale efisiensi, sekitar 6-10 order/hari. Max (Rp 799K): outlet ramai atau baru buka outlet kedua, sekitar 10-20 order/hari. Ultra (Rp 1.399K): chain 2-3 outlet yang serius, sekitar 20+ order/hari total. Lebih dari 4 outlet? Lihat opsi Enterprise (coming soon).",
    ),
    qa(
      'Apa "1 order" tepatnya?',
      "1 order = bot kirim instruksi pembayaran ke pelanggan (item + total + cara bayar). Count sebagai order: pelanggan udah pilih item, bot kasih total + instruksi bayar. Tidak count: pelanggan cuma tanya menu, jam buka, lokasi (itu customer chat, unlimited), atau order dibatalkan via dashboard. Owner bisa cancel ghost order sampai 10% per bulan untuk dikembalikan ke kuota.",
    ),
    qa(
      "Apakah customer chat juga count sebagai order?",
      "Tidak. Customer chat (FAQ, tanya menu, info promo, dll) unlimited di semua tier (under fair use). Kuota cuma kepake saat pelanggan benar-benar order dan bot kirim invoice. Bisa chat seharian tanpa jadi order = tidak ada kuota terpakai.",
    ),
    qa(
      "Apa Sosmed AI cuma chatbot?",
      "Tidak. Sosmed AI adalah platform lengkap dengan 4 sistem terintegrasi: Order Bot (AI customer service), Menu Digital + QR (sistem menu), Poin & Member (sistem loyalty), dan Kelola via WhatsApp (sistem operasional). Semua harga Lite/Pro/Max/Ultra udah termasuk keempat sistem, dengan tingkat kemampuan beda per tier.",
    ),
    qa(
      "Beda Sosmed AI sama Pawoon / Mokapos?",
      "Pawoon/Mokapos adalah POS tradisional dengan dashboard di laptop/tablet; Sosmed AI adalah platform yang running lewat WhatsApp. Yang beda: di Sosmed AI customer pesan langsung dari WhatsApp (tanpa app, tanpa wajib scan QR) dan owner kelola dari WhatsApp; di Pawoon customer dilayani staff di kasir dan owner kelola dari laptop/tablet. Yang sama: order management, menu digital, loyalty system, dan reporting. Sosmed AI cocok untuk cafe yang mau otomasi WhatsApp commerce, bukan menggantikan POS fisik.",
    ),
    qa(
      "Apakah marketing broadcast wajib?",
      "Tidak. Marketing broadcast adalah add-on optional; kamu bisa pakai Sosmed AI tanpa pernah kirim broadcast. Tapi data kami: customer yang dapat promo terjadwal balik 30-40% lebih sering, makanya add-on ini kami sediakan affordable (Rp 800/pesan).",
    ),
    qa(
      "Bisa cancel kapan aja?",
      "Bisa, tanpa penalty. Cancel sekarang, akses tetap aktif sampai akhir periode bayar.",
    ),
    qa(
      "Founding user pricing masih ada?",
      "Untuk 100 pelanggan pertama, harga Lite/Pro/Max/Ultra dikunci selamanya di harga launch ini. Setelah 100 founding user terisi, harga regular berlaku (estimasi naik 15-25%).",
    ),
    qa(
      "GoFood/GrabFood sync kapan?",
      "Sedang dikembangkan. Akan tersedia untuk Enterprise dulu (Q4 2026), kemudian menyusul ke Ultra (2027).",
    ),
    qa(
      "Saya udah pakai Pawoon. Bisa migrasi?",
      "Untuk kebutuhan Enterprise: kami bantu migrasi data. Untuk paket Lite/Pro/Max/Ultra: mulai fresh - biasanya butuh 1-2 minggu paralel sampai pelanggan terbiasa pesan via WhatsApp.",
    ),
    qa(
      "Berapa hemat dibanding tools terpisah?",
      "Kalau kamu beli tools terpisah (POS + WhatsApp BSP + loyalty CRM + menu QR), total bisa Rp 1,5 juta/bulan. Sosmed AI Pro Rp 399K = 74% lebih hemat untuk fungsi serupa.",
    ),
  ],
};

/* ---- Breadcrumb (Beranda › Harga) ---- */
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Harga", item: `${SITE_URL}/harga` },
  ],
};

export default function HargaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hargaProductLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hargaFaqPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />
      <PricingContent />
      <Footer />
    </>
  );
}
