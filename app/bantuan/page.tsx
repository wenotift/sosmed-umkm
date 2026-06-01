import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Bantuan",
  description: "Pusat Bantuan SOSMED AI — panduan setup, FAQ, dan dukungan untuk asisten WhatsApp AI bisnis Anda. Segera hadir.",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Bantuan" />;
}
