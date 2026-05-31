import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sosmed.io/sitemap.xml",
    host: "https://sosmed.io",
  };
}
