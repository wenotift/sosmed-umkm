import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KarierContent from "./KarierContent";

export const metadata: Metadata = pageMetadata({
  title: "Karier",
  description:
    "Karier di Sosmed AI — bantu UMKM F&B Indonesia naik kelas. Tim AI-native, WhatsApp-first. Belum ada lowongan aktif; gabung talent pool kami.",
  path: "/karir",
});

export default function Page() {
  return <KarierContent />;
}
