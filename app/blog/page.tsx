import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogIndexJsonLd, blogBreadcrumbJsonLd } from "./schema";

export const metadata: Metadata = {
  // Keep noindex: posts below are placeholder/sample content for now.
  ...pageMetadata({
    title: "Blog",
    description:
      "Blog Sosmed AI — tips, panduan, dan cerita praktis untuk membantu pemilik warung, kafe, dan restoran kecil mengelola usaha lebih rapi dan tumbuh lebih cepat.",
    path: "/blog",
    noindex: true,
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: { absolute: "Blog — Sosmed AI" },
};

// WhatsApp-chat watermark used on each card thumbnail.
function ChatWatermark() {
  return (
    <span className="wm">
      <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </span>
  );
}

// Placeholder/sample posts (no CMS yet). Dates are "Hari ini", byline "Tim Sosmed AI".
const POSTS = [
  {
    slug: "5-cara-pelanggan-jadi-langganan",
    g: "g2",
    tag: "Tips Bisnis",
    title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
    excerpt:
      "Ide sederhana membangun pelanggan setia tanpa modal besar — dari sapaan personal sampai sistem poin.",
  },
  {
    slug: "order-whatsapp-lebih-cepat",
    g: "g3",
    tag: "Panduan",
    title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
    excerpt:
      "Kenapa pelanggan lebih nyaman pesan lewat chat, dan bagaimana itu menguntungkan usaha Anda.",
  },
  {
    slug: "menu-digital-mudah-dipesan",
    g: "g4",
    tag: "Tips Bisnis",
    title: "Cara Atur Menu Digital yang Bikin Pelanggan Gampang Pesan",
    excerpt:
      "Menyusun menu yang jelas dan rapi sehingga pelanggan langsung tahu mau pesan apa.",
  },
  {
    slug: "sistem-poin-sederhana",
    g: "g5",
    tag: "Panduan",
    title: "Sistem Poin Sederhana untuk Usaha F&B Kecil",
    excerpt:
      "Cara kerja program loyalitas yang ringan dijalankan dan disukai pelanggan.",
  },
  {
    slug: "mengelola-pesanan-jam-ramai",
    g: "g6",
    tag: "Tips Bisnis",
    title: "Mengelola Pesanan Saat Jam Ramai Tanpa Keteteran",
    excerpt:
      "Tips menjaga pesanan tetap rapi dan tidak ada yang terlewat saat sedang sibuk-sibuknya.",
  },
  {
    slug: "laporan-penjualan-harian",
    g: "g7",
    tag: "Panduan",
    title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
    excerpt:
      "Angka-angka penting yang sebaiknya Anda pantau setiap hari untuk usaha yang lebih sehat.",
  },
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogBreadcrumbJsonLd()),
        }}
      />
      <Nav />
      <main className="blog-page">
        <div className="wrap">
          <Link className="back" href="/">
            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>{" "}
            Kembali
          </Link>

          {/* HEADER */}
          <div className="phead">
            <span className="eyebrow">Blog</span>
            <h1>
              Tips &amp; cerita untuk
              <br />
              usaha F&amp;B Anda
            </h1>
            <p>
              Panduan praktis, ide, dan cerita untuk membantu pemilik warung,
              kafe, dan restoran kecil mengelola usaha lebih rapi dan tumbuh
              lebih cepat.
            </p>
          </div>

          {/* FEATURED */}
          <Link
            className="featured"
            href="/blog/mulai-jualan-online-warung-kafe"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="thumb big g1">
              <span className="t-badge">Panduan</span>
              <div className="t-title">
                Mulai Jualan Online untuk Warung &amp; Kafe: Panduan Lengkap
              </div>
            </div>
            <div>
              <div className="fmeta">
                <span className="cat">Panduan</span> · Hari ini
              </div>
              <h2>Mulai Jualan Online untuk Warung &amp; Kafe: Panduan Lengkap</h2>
              <p className="ex">
                Langkah demi langkah memindahkan order, menu, dan pelanggan
                setia Anda ke WhatsApp — tanpa aplikasi rumit dan tanpa biaya
                besar di awal.
              </p>
              <div className="byline">
                <span className="av">S</span> <b>Tim Sosmed AI</b>
              </div>
            </div>
          </Link>

          {/* TABS (visual only) */}
          <div className="tabs">
            <div className="t active">Semua</div>
            <div className="t">Tips Bisnis</div>
            <div className="t">Panduan</div>
            <div className="t">Produk</div>
            <div className="t">Cerita</div>
          </div>

          {/* GRID */}
          <div className="grid">
            {POSTS.map((post) => (
              <Link
                className="card"
                href={`/blog/${post.slug}`}
                key={post.slug}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={`thumb ${post.g}`}>
                  <span className="t-badge">{post.tag}</span>
                  <ChatWatermark />
                </div>
                <div className="cbody">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="divider"></div>
                  <div className="byline">
                    <span className="av">S</span> <b>Tim Sosmed AI</b>
                  </div>
                  <div className="meta-row">
                    <span>Hari ini</span>
                    <span className="sep"></span>
                    <span className="tag">{post.tag}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* NEWSLETTER (visual only — no live endpoint) */}
          <div className="news">
            <div>
              <span className="pill">
                <span className="dot"></span> Newsletter
              </span>
              <h2>Tips usaha F&amp;B, langsung ke inbox</h2>
              <p>
                Dapatkan ide dan panduan praktis untuk mengelola dan menumbuhkan
                usaha Anda. Tanpa spam.
              </p>
              <div className="form">
                <input type="email" placeholder="Masukkan email Anda" />
                <button type="button" className="btn">
                  Langganan
                </button>
              </div>
            </div>
            <div className="side">
              Sosmed AI membantu pemilik warung, kafe, dan restoran kecil
              mengelola order, menu, poin, dan laporan — semua langsung dari
              WhatsApp.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
