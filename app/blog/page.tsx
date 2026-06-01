import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Halaman Blog SOSMED AI — segera hadir.",
  path: "/blog",
  noindex: true,
});

export default function Page() {
  return <SoonPage title="Blog" />;
}
