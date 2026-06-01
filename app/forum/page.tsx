import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = pageMetadata({
  title: "Forum",
  description: "Halaman Forum SOSMED AI — segera hadir.",
  path: "/forum",
  noindex: true,
});

export default function Page() {
  return <SoonPage title="Forum" />;
}
