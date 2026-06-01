import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = pageMetadata({
  title: "Solusi",
  description: "Asisten WhatsApp AI-native untuk coffee shop, restoran, warung & F&B Indonesia. Bukan chatbot kata kunci — paham maksud pelanggan, jaga mereka balik lagi.",
  path: "/solusi",
  noindex: true,
});

export default function Page() {
  return <SoonPage title="Solusi" />;
}
