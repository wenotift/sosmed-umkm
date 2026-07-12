import { SITE_URL } from "@/lib/seo";
import { ARTICLES, ARTICLE_SLUGS, blogCover, type Article } from "./articles";

/**
 * JSON-LD builders for the blog. Single source of truth: everything here is
 * derived from the ARTICLES content map (app/blog/articles.tsx) - the same
 * data the pages render - so structured data never diverges from on-page text.
 *
 * Dates come from the content map's `datePublished` field (ISO). dateModified
 * mirrors datePublished until articles are revised.
 */

const OG_IMAGE = `${SITE_URL}/images/og-image-umkm-sosmed-ai.jpg`;

// Absolute URL for an article's own cover, falling back to the site OG image.
function coverUrl(slug: string): string {
  const cover = blogCover(slug);
  return cover ? `${SITE_URL}${cover}` : OG_IMAGE;
}

// Publisher (the company) - mirrors the Organization in app/layout.tsx.
const PUBLISHER = {
  "@type": "Organization",
  name: "Sosmed AI",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
};

// Author - matches the visible "Tim Sosmed AI" byline (a team, not a person).
const AUTHOR = { "@type": "Organization", name: "Tim Sosmed AI" };

/** "7 menit baca" → ISO 8601 duration "PT7M" (schema.org timeRequired). */
function readTimeToDuration(readTime: string): string | undefined {
  const m = readTime.match(/\d+/);
  return m ? `PT${m[0]}M` : undefined;
}

/** BlogPosting for a single article. */
export function articleJsonLd(slug: string, article: Article) {
  const url = `${SITE_URL}/blog/${slug}`;
  const timeRequired = readTimeToDuration(article.readTime);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    inLanguage: "id-ID",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: coverUrl(slug),
    articleSection: article.category,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    ...(timeRequired ? { timeRequired } : {}),
    ...(article.keywords?.length ? { keywords: article.keywords.join(", ") } : {}),
    isAccessibleForFree: true,
    // Voice/answer-engine hint: read the lede + TL;DR summary aloud.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".lede", ".tldr"],
    },
    author: AUTHOR,
    publisher: PUBLISHER,
  };
}

/** FAQPage built from an article's `faq` pairs (answers mirror on-page text).
 *  Returns null when the article has no FAQ so callers can skip the script. */
export function articleFaqJsonLd(article: Article) {
  if (!article.faq?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "id-ID",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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

/** Blog listing schema for the /blog index - lists every article. */
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
        datePublished: a.datePublished,
        dateModified: a.datePublished,
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
