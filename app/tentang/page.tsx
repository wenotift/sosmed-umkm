import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import TentangContent from "./TentangContent";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Tentang Kami",
    description:
      "Tentang Sosmed AI: asisten bisnis berbasis AI yang berjalan langsung di WhatsApp untuk UMKM F&B Indonesia — kenapa kami membangunnya, fitur, prinsip, dan cara kerjanya.",
    path: "/tentang",
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: { absolute: "Tentang Kami - Sosmed AI" },
};

/* ---- FAQPage — mirrors the 5 visible /tentang FAQs verbatim (AEO/AIO) ---- */
const qa = (q: string, a: string) => ({
  "@type": "Question",
  name: q,
  acceptedAnswer: { "@type": "Answer", text: a },
});

const tentangFaqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    qa(
      "Apakah saya perlu menginstal aplikasi?",
      "Tidak. Sosmed AI berjalan langsung di WhatsApp yang sudah Anda pakai. Tidak ada aplikasi tambahan atau dashboard yang harus dipelajari.",
    ),
    qa(
      "Apakah pelanggan saya perlu aplikasi khusus?",
      "Tidak. Pelanggan cukup chat ke nomor WhatsApp usaha Anda seperti biasa.",
    ),
    qa(
      "Apakah Sosmed AI sudah bisa dipakai sekarang?",
      "Sosmed AI sedang dalam tahap peluncuran awal. Anda bisa bergabung ke waitlist untuk menjadi yang pertama mencoba.",
    ),
    qa(
      "Berapa biayanya?",
      "Rincian paket dan harga tersedia di halaman Harga.",
    ),
    qa(
      "Bagaimana dengan keamanan data?",
      "Data usaha dan pelanggan Anda diproses sesuai ketentuan UU PDP. Selengkapnya di Kebijakan Privasi kami.",
    ),
  ],
};

export default function TentangPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tentangFaqPageLd) }}
      />
      <TentangContent />
    </>
  );
}
