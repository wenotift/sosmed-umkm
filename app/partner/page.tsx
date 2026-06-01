import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = pageMetadata({
  title: "Partner",
  description: "Jadi partner Sosmed AI — bantu UMKM F&B Indonesia naik kelas dengan asisten bisnis WhatsApp yang AI-native, bukan sekadar chatbot. Segera hadir.",
  path: "/partner",
  noindex: true,
});

export default function Page() {
  return <SoonPage title="Partner" />;
}
