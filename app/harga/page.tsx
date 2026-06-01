import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Harga",
  description:
    "Harga transparan SOSMED AI untuk bisnis F&B Indonesia — satu harga, semua fitur, tanpa biaya tersembunyi. Mulai Rp 199.000/bulan, harga spesial founding user.",
};

export default function HargaPage() {
  return (
    <>
      <Nav />
      <PricingContent />
      <Footer />
    </>
  );
}
