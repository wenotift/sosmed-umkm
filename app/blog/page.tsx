import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog SOSMED AI — tips, panduan, dan cerita seputar asisten WhatsApp AI untuk bisnis F&B Indonesia. Segera hadir.",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Blog" />;
}
