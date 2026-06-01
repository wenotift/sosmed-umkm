import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingContent from "./PricingContent";

export const metadata: Metadata = pageMetadata({
  title: "Harga",
  description:
    "Harga transparan SOSMED AI untuk bisnis F&B: satu paket, semua fitur AI-native, tanpa biaya tersembunyi. Mulai Rp 199 ribu/bulan. Lihat paketnya.",
  path: "/harga",
});

export default function HargaPage() {
  return (
    <>
      <Nav />
      <PricingContent />
      <Footer />
    </>
  );
}
