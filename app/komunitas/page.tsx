import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KomunitasContent from "./KomunitasContent";

export const metadata: Metadata = pageMetadata({
  title: "Komunitas",
  description:
    "Komunitas Sosmed AI — tempat pemilik kafe, resto, dan warung saling bantu naik kelas bareng AI. Tukar tips, support, akses fitur lebih awal. Gabung Discord kami.",
  path: "/komunitas",
});

export default function Page() {
  return <KomunitasContent />;
}
