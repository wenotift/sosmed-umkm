import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = pageMetadata({
  title: "Komunitas",
  description: "Halaman Komunitas SOSMED AI — segera hadir.",
  path: "/komunitas",
  noindex: true,
});

export default function Page() {
  return <SoonPage title="Komunitas" />;
}
