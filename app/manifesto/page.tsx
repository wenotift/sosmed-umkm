import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ManifestoContent from "./ManifestoContent";

export const metadata: Metadata = pageMetadata({
  title: "Manifesto",
  description:
    "Manifesto Sosmed AI: bisnis warung lebih canggih dari korporat. Kenapa UMKM F&B Indonesia berhak atas alat sekelas perusahaan besar — operating system bisnis langsung di WhatsApp, ditenagai AI.",
  path: "/manifesto",
});

export default function Page() {
  return <ManifestoContent />;
}
