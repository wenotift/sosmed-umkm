import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Allow all crawlers to FETCH the page (no Disallow): social unfurl bots
  // (WhatsApp, LinkedInBot, Twitterbot, facebookexternalhit) need this to
  // build link previews, and Googlebot must fetch the page to read the
  // noindex meta tag (set in app/layout.tsx) that keeps us out of search.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://umkm.sosmed.io",
  };
}
