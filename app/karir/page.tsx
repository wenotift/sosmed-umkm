import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = pageMetadata({
  title: "Karir",
  description: "Halaman Karir SOSMED AI — segera hadir.",
  path: "/karir",
  noindex: true,
});

export default function Page() {
  return <SoonPage title="Karir" />;
}
