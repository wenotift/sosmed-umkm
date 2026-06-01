import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductContent from "./ProductContent";

export const metadata: Metadata = {
  title: "Produk",
  description:
    "SOSMED AI — asisten WhatsApp AI-native untuk UMKM Indonesia: order otomatis dengan rincian & QRIS, menu digital + QR meja, sistem poin & member, dan kelola bisnis langsung dari WhatsApp.",
};

export default function ProdukPage() {
  return (
    <>
      <Nav />
      <ProductContent />
      <Footer />
    </>
  );
}
