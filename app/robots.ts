import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Allow all crawlers to FETCH the page (no Disallow): social unfurl bots
  // (WhatsApp, LinkedInBot, Twitterbot, facebookexternalhit) need this for
  // link previews, and Googlebot must fetch to read the noindex meta tag
  // (set in app/layout.tsx) that keeps us out of search pre-launch.
  // AI answer-engine crawlers are named explicitly so they're cleared to
  // read the site the moment we flip to index:true at launch.
  const aiBots = [
    "GPTBot", // OpenAI training/answers
    "OAI-SearchBot", // ChatGPT Search
    "ChatGPT-User", // ChatGPT live browsing
    "PerplexityBot", // Perplexity
    "Perplexity-User",
    "ClaudeBot", // Anthropic
    "Claude-Web",
    "Google-Extended", // Gemini / Vertex
    "Bingbot", // Bing + Copilot
    "Applebot-Extended", // Apple Intelligence
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: "https://umkm.sosmed.io/sitemap.xml",
    host: "https://umkm.sosmed.io",
  };
}
