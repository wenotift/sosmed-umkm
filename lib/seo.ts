import type { Metadata } from "next";

export const SITE_URL = "https://umkm.sosmed.io";

// Shared OG/Twitter card title (brand line) — kept identical across routes so
// titles don't change; only the description differs per page.
const OG_TITLE = "Sosmed AI | WhatsApp Anda, AI Assistant Bisnis Anda";
const OG_IMAGE = {
  url: "/images/og-image-umkm-sosmed-ai.jpg",
  width: 1350,
  height: 900,
  alt: "Sosmed AI — asisten WhatsApp AI untuk bisnis F&B Indonesia",
};

/**
 * Build per-route metadata where the SAME description string is used for the
 * meta description, openGraph.description, and twitter.description. openGraph
 * and twitter are fully specified here (Next replaces, not deep-merges, a
 * child openGraph) so each route keeps the shared OG image + brand og:title.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const { title, description, path = "", noindex = false, ogType = "website" } =
    opts;
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: "id_ID",
      url,
      siteName: "Sosmed AI",
      title: OG_TITLE,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: OG_TITLE,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
