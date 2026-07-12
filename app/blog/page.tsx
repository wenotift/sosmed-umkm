import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogIndexJsonLd, blogBreadcrumbJsonLd } from "./schema";
import { ARTICLES, blogThumb, formatArticleDate } from "./articles";
import BlogGrid from "./BlogGrid";
import NewsletterForm from "./NewsletterForm";

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
    slug: "mengubah-chat-whatsapp-menjadi-pelanggan-setia",
    g: "g5",
    tag: "Tips Bisnis",
    title: "Cara Mengubah Chat WhatsApp Menjadi Pelanggan Setia untuk Bisnis F&B",
    excerpt: "Bangun memori pelanggan, follow-up relevan, dan repeat order melalui pendekatan AI-native di WhatsApp.",
  },
  {
    slug: "order-ramai-profit-tidak-naik",
    g: "g7",
    tag: "Tips Bisnis",
    title: "Order Ramai tapi Profit Tidak Naik? Ini 7 Kebocoran di Warung dan Kafe",
    excerpt: "Temukan diskon, waste, salah order, dan kebocoran lain yang membuat omzet tidak menjadi profit.",
  },
  {
    slug: "program-loyalti-whatsapp-untuk-umkm",
    g: "g5",
    tag: "Panduan",
    title: "Program Loyalti WhatsApp untuk UMKM: Poin, Reward, dan Repeat Order",
    excerpt: "Bangun loyalti tanpa kartu member dan tanpa pencatatan poin secara manual.",
  },
  {
    slug: "mengetahui-menu-paling-laku-dan-menguntungkan",
    g: "g7",
    tag: "Panduan",
    title: "Cara Mengetahui Menu Paling Laku dan Paling Menguntungkan dari WhatsApp",
    excerpt: "Bedakan menu populer, margin tinggi, dan menu yang memberi kontribusi profit terbesar.",
  },
  {
    slug: "ai-native-whatsapp-vs-chatbot",
    g: "g3",
    tag: "Produk",
    title: "AI-Native di WhatsApp vs Chatbot: Mana yang Cocok untuk UMKM F&B?",
    excerpt: "Pahami mengapa Sosmed AI bukan chatbot skrip dan bagaimana konteks percakapan membantu bisnis.",
  },
  {
    slug: "otomatisasi-whatsapp-untuk-umkm-fnb",
    g: "g3",
    tag: "Panduan",
    title: "Otomatisasi WhatsApp untuk UMKM F&B: Kerja Manual Berkurang, Order Tetap Rapi",
    excerpt:
      "Cara memakai WhatsApp sebagai pusat order dengan pendekatan AI-native, bukan chatbot skrip yang kaku.",
  },
  {
    slug: "cara-mengurangi-chaos-operasional-warung-kafe",
    g: "g6",
    tag: "Tips Bisnis",
    title: "Cara Mengurangi Chaos Operasional Warung & Kafe Saat Order Mulai Ramai",
    excerpt:
      "Framework sederhana agar pesanan tidak tercecer dengan bantuan AI-native di WhatsApp, bukan bot kaku.",
  },
  {
    slug: "cara-menjaga-pelanggan-lama-lewat-whatsapp",
    g: "g5",
    tag: "Tips Bisnis",
    title: "Cara Menjaga Pelanggan Lama Lewat WhatsApp Tanpa Spam",
    excerpt:
      "Retensi pelanggan yang personal dan relevan lewat AI-native di WhatsApp, bukan chatbot massal.",
  },
  {
    slug: "meningkatkan-penjualan-profit-fnb-kecil",
    g: "g7",
    tag: "Panduan",
    title: "Meningkatkan Penjualan & Profit F&B Kecil dengan Data Order Harian",
    excerpt:
      "Bukan chatbot laporan biasa: ubah chat WhatsApp menjadi insight bisnis dengan pendekatan AI-native.",
  },
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
                <span className="cat">Panduan</span> ·{" "}
                {formatArticleDate(ARTICLES["mulai-jualan-online-warung-kafe"].datePublished)}
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
              date: formatArticleDate(ARTICLES[post.slug].datePublished),
            }))}
          />

          {/* NEWSLETTER — live (POST /api/newsletter) */}
          <NewsletterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
