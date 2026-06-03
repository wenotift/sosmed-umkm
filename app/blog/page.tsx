import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogIndexJsonLd, blogBreadcrumbJsonLd } from "./schema";
import { blogThumb } from "./articles";
import BlogGrid from "./BlogGrid";

export const metadata: Metadata = {
  // Indexable (live): inherits the site robots index:true, follow:true.
  ...pageMetadata({
    title: "Blog",
    description:
      "Blog Sosmed AI - tips, panduan, dan cerita praktis untuk membantu pemilik warung, kafe, dan restoran kecil mengelola usaha lebih rapi dan tumbuh lebih cepat.",
    path: "/blog",
    // Per-page card title (not the homepage brand line). Index keeps the
    // generic site OG image, but with a clean (hyphen) alt.
    ogTitle: "Blog - Sosmed AI",
    imageAlt: "Sosmed AI - asisten WhatsApp AI untuk bisnis F&B Indonesia",
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: { absolute: "Blog - Sosmed AI" },
};

// WhatsApp-chat watermark used on each card thumbnail.
// Sample/illustrative posts (no CMS yet). Publish date "2 Juni 2026", byline "Tim Sosmed AI".
const POSTS = [
  {
    slug: "5-cara-pelanggan-jadi-langganan",
    g: "g2",
    tag: "Tips Bisnis",
    title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
    excerpt:
      "Ide sederhana membangun pelanggan setia tanpa modal besar - dari sapaan personal sampai sistem poin.",
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
  {
    slug: "yang-sedang-kami-bangun",
    g: "g3",
    tag: "Produk",
    title: "Bukan Sekadar Chatbot: Apa Itu Sosmed AI",
    excerpt:
      "Apa bedanya chatbot biasa dengan AI-native, dan apa yang sedang kami bangun untuk usaha F&B kecil.",
  },
  {
    slug: "masalah-umkm-fnb-indonesia",
    g: "g2",
    tag: "Cerita",
    title: "Cerita di Balik Sosmed AI",
    excerpt:
      "Apa yang kami lihat di warung dan kafe kecil Indonesia, dan kenapa kami membangunnya di WhatsApp.",
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
            <div
              className="thumb big"
              style={{
                backgroundImage: `url('${blogThumb("mulai-jualan-online-warung-kafe")}')`,
              }}
            ></div>
            <div>
              <div className="fmeta">
                <span className="cat">Panduan</span> · 2 Juni 2026
              </div>
              <h2>Mulai Jualan Online untuk Warung &amp; Kafe: Panduan Lengkap</h2>
              <p className="ex">
                Langkah demi langkah memindahkan order, menu, dan pelanggan
                setia Anda ke WhatsApp - tanpa aplikasi rumit dan tanpa biaya
                besar di awal.
              </p>
              <div className="byline">
                <span className="av">S</span> <b>Tim Sosmed AI</b>
              </div>
            </div>
          </Link>

          {/* TABS + GRID (client-side category filter) */}
          <BlogGrid
            posts={POSTS.map((post) => ({
              ...post,
              thumb: blogThumb(post.slug),
            }))}
          />

          {/* NEWSLETTER (visual only - no live endpoint) */}
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
              mengelola order, menu, poin, dan laporan - semua langsung dari
              WhatsApp.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
