import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = pageMetadata({
  title: "Bantuan",
  description: "Halaman Bantuan Sosmed AI — segera hadir.",
  path: "/bantuan",
  noindex: true,
});

export default function Page() {
  return <SoonPage title="Bantuan" />;
}
