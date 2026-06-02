import { SITE_URL } from "@/lib/seo";
import { ARTICLES, ARTICLE_SLUGS, type Article } from "./articles";

/**
 * JSON-LD builders for the blog. Single source of truth: everything here is
 * derived from the ARTICLES content map (app/blog/articles.tsx) — the same
 * data the pages render — so structured data never diverges from on-page text.
 *
 * NOTE on dates: the content map has no real publish date (the visible byline
 * "Hari ini" is placeholder). Per the SEO guardrail we do NOT invent a date,
 * so `datePublished`/`dateModified` are intentionally OMITTED until a real
 * date field exists. BlogPosting remains valid without them.
 */

const OG_IMAGE = `${SITE_URL}/images/og-image-umkm-sosmed-ai.jpg`;

// Publisher (the company) — mirrors the Organization in app/layout.tsx.
const PUBLISHER = {
  "@type": "Organization",
  name: "Sosmed AI",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
};

// Author — matches the visible "Tim Sosmed AI" byline (a team, not a person).
const AUTHOR = { "@type": "Organization", name: "Tim Sosmed AI" };

/** BlogPosting for a single article. */
export function articleJsonLd(slug: string, article: Article) {
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    inLanguage: "id-ID",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: OG_IMAGE,
    articleSection: article.category,
    author: AUTHOR,
    publisher: PUBLISHER,
    // datePublished/dateModified intentionally omitted — no real date yet.
  };
}

/** Beranda → Blog → Article breadcrumb. */
export function articleBreadcrumbJsonLd(slug: string, article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };
}

/** Blog listing schema for the /blog index — lists every article. */
export function blogIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Sosmed AI",
    description:
      "Tips, panduan, dan cerita praktis untuk membantu pemilik warung, kafe, dan restoran kecil mengelola usaha lebih rapi dan tumbuh lebih cepat.",
    url: `${SITE_URL}/blog`,
    inLanguage: "id-ID",
    publisher: PUBLISHER,
    blogPost: ARTICLE_SLUGS.map((slug) => {
      const a = ARTICLES[slug];
      return {
        "@type": "BlogPosting",
        headline: a.title,
        description: a.description,
        url: `${SITE_URL}/blog/${slug}`,
        articleSection: a.category,
        author: AUTHOR,
      };
    }),
  };
}

/** Beranda → Blog breadcrumb for the index. */
export function blogBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };
}
