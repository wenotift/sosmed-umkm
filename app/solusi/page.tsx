import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Solusi",
  description: "Solusi SOSMED AI — asisten WhatsApp AI-native untuk berbagai jenis bisnis F&B Indonesia. Segera hadir.",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Solusi" />;
}
