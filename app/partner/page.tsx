import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PartnerContent from "./PartnerContent";

export const metadata: Metadata = pageMetadata({
  title: "Program Partner",
  description:
    "Jadi partner Sosmed AI — untuk agency, reseller, asosiasi, dan jaringan yang mau bawa AI WhatsApp ke banyak bisnis F&B Indonesia sekaligus. Margin kompetitif, dukungan khusus, co-marketing. Ajukan kemitraan.",
  path: "/partner",
});

export default function Page() {
  return <PartnerContent />;
}
