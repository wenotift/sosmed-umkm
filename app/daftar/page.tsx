import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DaftarContent from "./DaftarContent";

export const metadata: Metadata = pageMetadata({
  title: "Daftar Early Access",
  description:
    "Daftar early access Sosmed AI. Jadi salah satu dari 100 founding user dan kunci harga launch selamanya. Kami hubungi via WhatsApp.",
  path: "/daftar",
});

export default function DaftarPage() {
  return (
    <>
      <Nav />
      <DaftarContent />
      <Footer />
    </>
  );
}
