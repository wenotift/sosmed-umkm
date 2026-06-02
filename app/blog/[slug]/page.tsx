import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollSpy from "./ScrollSpy";
import { ARTICLES, ARTICLE_SLUGS, blogCover, blogThumb } from "../articles";
import { articleJsonLd, articleBreadcrumbJsonLd } from "../schema";

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Artikel — Sosmed AI" };
  return {
    // Keep noindex: placeholder/sample content (no CMS).
    ...pageMetadata({
      title: article.title,
      description: article.description,
      path: `/blog/${slug}`,
      noindex: true,
      ogType: "article",
    }),
    title: { absolute: `${article.title} — Sosmed AI` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(slug, article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleBreadcrumbJsonLd(slug, article)),
        }}
      />
      <Nav />
      <main className="article-page">
        <div className="wrap">
          <Link className="back" href="/blog">
            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>{" "}
            Kembali ke Blog
          </Link>

          {/* HEADER */}
          <div className="ahead">
            <span className="cat">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="byline">
              <span className="av">S</span>
              <span style={{ textAlign: "left" }}>
                <b>Tim Sosmed AI</b>
                <span className="date">Hari ini · {article.readTime}</span>
              </span>
            </div>
          </div>

          {/* COVER — clean image, nothing layered on top */}
          <div className="cover">
            <Image
              src={blogCover(slug)}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 980px"
            />
          </div>

          {/* LAYOUT */}
          <div className="layout">
            <article className="prose">
              <p className="lede">{article.lede}</p>

              <div className="tldr">
                <div className="h">TL;DR — Ringkasan singkat</div>
                <ul>
                  {article.tldr.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {article.sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.heading}</h2>
                  {s.body}
                </section>
              ))}
            </article>

            {/* TOC RIGHT */}
            <nav className="toc">
              <div className="h">Daftar Isi</div>
              {article.sections.map((s) => (
                <a href={`#${s.id}`} key={s.id}>
                  {s.toc}
                </a>
              ))}
            </nav>
          </div>

          {/* RELATED */}
          <div className="related">
            <h3>Artikel terkait</h3>
            <div className="rgrid">
              {article.related.map((r) => (
                <Link className="rcard" href={`/blog/${r.slug}`} key={r.slug}>
                  <div
                    className="thumb"
                    style={{ backgroundImage: `url('${blogThumb(r.slug)}')` }}
                  ></div>
                  <h4>{r.title}</h4>
                  <p>{r.excerpt}</p>
                  <div className="rmeta">
                    <span className="r-cat">{r.tag}</span> Tim Sosmed AI · Hari
                    ini
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <ScrollSpy />
      </main>
      <Footer />
    </>
  );
}
