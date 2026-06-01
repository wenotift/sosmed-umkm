import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Forum",
  description: "Forum SOSMED AI — tempat berbagi tips dan tanya jawab antar pengguna asisten WhatsApp AI. Segera hadir.",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Forum" />;
}
