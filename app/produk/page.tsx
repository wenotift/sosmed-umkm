import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductContent from "./ProductContent";

export const metadata: Metadata = pageMetadata({
  title: "Produk",
  description:
    "AI-native, bukan sekadar chatbot. SOSMED AI paham pesanan, rinci tagihan otomatis, kirim QRIS, kelola poin & laporan — semua dalam satu WhatsApp.",
  path: "/produk",
});

export default function ProdukPage() {
  return (
    <>
      <Nav />
      <ProductContent />
      <Footer />
    </>
  );
}
