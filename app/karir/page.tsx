import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Karir",
  description: "Karier di SOSMED AI — bergabung membangun asisten WhatsApp AI-native untuk UMKM Indonesia. Segera hadir.",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Karir" />;
}
