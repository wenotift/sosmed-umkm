import type { MetadataRoute } from "next";

const BASE = "https://umkm.sosmed.io";

// Real content pages (the "Segera Hadir" placeholder routes are noindex and
// intentionally excluded). These become indexable the moment robots flips to
// index:true at launch.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/produk`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/harga`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
