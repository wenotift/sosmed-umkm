import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KontakContent from "./KontakContent";

export const metadata: Metadata = pageMetadata({
  title: "Kontak",
  description:
    "Hubungi Sosmed AI — email, Discord, dan media sosial. Punya pertanyaan, ide kerja sama, atau butuh bantuan? Kami senang dengar dari kamu.",
  path: "/kontak",
});

export default function Page() {
  return <KontakContent />;
}
