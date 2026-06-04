import type { MetadataRoute } from "next";
import { ARTICLE_SLUGS } from "./blog/articles";

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
    {
      url: `${BASE}/bantuan`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/karir`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/afiliasi`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/tentang`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/privasi`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/syarat`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/blog`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...ARTICLE_SLUGS.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
