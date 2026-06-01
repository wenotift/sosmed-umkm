import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Partner",
  description: "Program Partner SOSMED AI — peluang kolaborasi & reseller asisten WhatsApp AI untuk bisnis F&B. Segera hadir.",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Partner" />;
}
