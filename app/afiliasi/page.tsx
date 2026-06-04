import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AfiliasiContent from "./AfiliasiContent";

export const metadata: Metadata = pageMetadata({
  title: "Program Afiliasi",
  description:
    "Program afiliasi Sosmed AI: promosikan platform WhatsApp AI untuk UMKM F&B Indonesia dan dapat komisi. Gratis gabung, terbuka untuk siapa saja. Daftar sekarang.",
  path: "/afiliasi",
});

export default function Page() {
  return <AfiliasiContent />;
}
