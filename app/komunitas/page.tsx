import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Komunitas",
  description: "Komunitas SOSMED AI — kumpulan pemilik bisnis F&B Indonesia yang pakai asisten WhatsApp AI. Segera hadir.",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Komunitas" />;
}
