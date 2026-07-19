import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogIndexJsonLd, blogBreadcrumbJsonLd } from "./schema";
import { ARTICLES, ARTICLE_SLUGS, blogThumb, formatArticleDate } from "./articles";
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

// WhatsApp-chat watermark used on each card thumbnail. Sample/illustrative
// posts (no CMS yet); each card's publish date is derived per-slug from
// ARTICLES[...].datePublished. Byline is always "Tim Sosmed AI".
const POSTS = [
  {
    slug: "mencocokkan-pembayaran-qris-dengan-order-whatsapp",
    g: "g4",
    tag: "Panduan",
    title: "Cara Mencocokkan Pembayaran QRIS dengan Order WhatsApp agar Tidak Salah Konfirmasi",
    excerpt: "Hubungkan kode pesanan, nominal, waktu, dan status merchant sebelum order dinyatakan lunas.",
  },
  {
    slug: "pelanggan-sering-ubah-pesanan-di-whatsapp",
    g: "g6",
    tag: "Tips Bisnis",
    title: "Pelanggan Sering Ubah Pesanan di WhatsApp? Cegah Dapur Memasak Versi yang Salah",
    excerpt: "Jaga satu versi order aktif agar revisi pelanggan sampai ke kasir dan dapur.",
  },
  {
    slug: "naikkan-harga-menu-tanpa-kehilangan-pelanggan",
    g: "g7",
    tag: "Panduan",
    title: "Cara Naikkan Harga Menu Tanpa Membuat Pelanggan Langsung Pergi",
    excerpt: "Hitung biaya, margin, dan pilihan pelanggan sebelum menyesuaikan harga menu.",
  },
  {
    slug: "stok-habis-saat-order-ramai",
    g: "g6",
    tag: "Tips Bisnis",
    title: "Stok Habis Saat Order Ramai? Cara Menjaga Menu Tetap Siap Tanpa Belanja Berlebihan",
    excerpt: "Gunakan stok minimum dan pola order agar menu tidak habis saat pelanggan sedang ramai.",
  },
  {
    slug: "menangani-komplain-pelanggan-lewat-whatsapp",
    g: "g5",
    tag: "Panduan",
    title: "Cara Menangani Komplain Pelanggan Lewat WhatsApp Tanpa Memperbesar Masalah",
    excerpt: "Pulihkan kepercayaan pelanggan dengan respons, solusi, dan follow-up yang tepat.",
  },
  {
    slug: "meningkatkan-nilai-order-tanpa-memaksa",
    g: "g7",
    tag: "Panduan",
    title: "Cara Meningkatkan Nilai Order Pelanggan Tanpa Terasa Memaksa",
    excerpt: "Gunakan bundle dan add-on relevan untuk menaikkan nilai order tanpa hard selling.",
  },
  {
    slug: "warung-ramai-belum-tentu-untung",
    g: "g7",
    tag: "Tips Bisnis",
    title: "Warung Ramai Itu Belum Tentu Untung: 5 Tanda Anda Cuma Sibuk, Bukan Bertumbuh",
    excerpt: "Kenali lima sinyal ketika order naik tetapi margin, pelanggan, dan sistem bisnis tidak ikut bertumbuh.",
  },
  {
    slug: "pemilik-warung-capek-bukan-karena-masak",
    g: "g6",
    tag: "Cerita",
    title: "Pemilik Warung Paling Capek Bukan Karena Masak, Tapi Karena Mengingat Semua Hal Ini",
    excerpt: "Kurangi beban mental dari order, stok, pelanggan, dan kas yang selama ini hanya tersimpan di kepala.",
  },
  {
    slug: "warung-tetap-jalan-saat-pemilik-libur",
    g: "g6",
    tag: "Tips Bisnis",
    title: "Kalau Pemilik Libur Sehari, Apakah Warung Tetap Jalan?",
    excerpt: "Uji apakah tim dan sistem usaha bisa tetap melayani pelanggan saat pemilik tidak hadir.",
  },
  {
    slug: "pelanggan-bilang-nanti-order-lagi",
    g: "g5",
    tag: "Tips Bisnis",
    title: "Pelanggan Bilang ‘Nanti Order Lagi Ya’—Tapi Kok Tidak Pernah Kembali?",
    excerpt: "Pahami alasan pelanggan tidak repeat order dan cara membuat pengalaman berikutnya terasa lebih mudah.",
  },
  {
    slug: "bongkar-chat-whatsapp-warung",
    g: "g3",
    tag: "Panduan",
    title: "Bongkar Chat WhatsApp Warung: Berapa Banyak Order yang Hilang Karena Telat Balas?",
    excerpt: "Temukan chat yang berpotensi menjadi order hilang dan rapikan waktu respons saat pelanggan membutuhkan jawaban.",
  },
  {
    slug: "promo-terus-bukan-solusi",
    g: "g5",
    tag: "Tips Bisnis",
    title: "Promo Terus Bukan Solusi: Cara Membuat Pelanggan Kembali Tanpa Diskon Tiap Minggu",
    excerpt: "Bangun repeat order lewat pengalaman dan follow-up relevan, bukan diskon massal yang menggerus margin.",
  },
  {
    slug: "jam-ramai-adalah-ujian-sebenarnya",
    g: "g6",
    tag: "Tips Bisnis",
    title: "Jam Ramai Adalah Ujian Sebenarnya: Ketika Satu Chat Terlewat Bisa Menghilangkan Pelanggan",
    excerpt: "Tata antrean chat, dapur, dan pickup agar pelanggan tidak menunggu tanpa kepastian.",
  },
  {
    slug: "menu-paling-laku-bisa-profit-tipis",
    g: "g7",
    tag: "Panduan",
    title: "Jangan Bangga Dulu Kalau Menu Anda Paling Laku—Bisa Jadi Itu yang Membuat Profit Tipis",
    excerpt: "Bedakan menu populer dari menu yang benar-benar memberi kontribusi profit.",
  },
  {
    slug: "kebiasaan-pelanggan-pindah",
    g: "g5",
    tag: "Tips Bisnis",
    title: "Bukan Kekurangan Pelanggan: 7 Kebiasaan Kecil yang Diam-Diam Membuat Pelanggan Pindah",
    excerpt: "Tangani masalah kecil yang berulang sebelum pelanggan memilih tempat lain.",
  },
  {
    slug: "bot-kaku-vs-ai-whatsapp",
    g: "g3",
    tag: "Produk",
    title: "Chatbot Bikin Pelanggan Kesal? Ini Bedanya Bot Kaku dan AI yang Paham Cara Orang Indonesia Chat",
    excerpt: "Kenapa Sosmed AI bukan chatbot skrip dan bagaimana konteks percakapan bisa membantu order serta pelanggan.",
  },
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
    slug: "mulai-jualan-online-warung-kafe",
    g: "g4",
    tag: "Panduan",
    title: "Mulai Jualan Online untuk Warung & Kafe: Panduan Lengkap",
    excerpt:
      "Langkah demi langkah memindahkan order, menu, pembayaran, dan pelanggan setia ke WhatsApp - tanpa aplikasi rumit dan tanpa biaya besar di awal.",
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

// Hero/featured = newest article by publish date (ties → definition order),
// so the hero auto-updates when a newer-dated post is added.
const FEATURED_SLUG = ARTICLE_SLUGS.reduce((latest, slug) =>
  ARTICLES[slug].datePublished > ARTICLES[latest].datePublished ? slug : latest,
);
const FEATURED = ARTICLES[FEATURED_SLUG];

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
            href={`/blog/${FEATURED_SLUG}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="thumb big"
              style={{
                backgroundImage: `url('${blogThumb(FEATURED_SLUG)}')`,
              }}
            ></div>
            <div>
              <div className="fmeta">
                <span className="cat">{FEATURED.category}</span> ·{" "}
                {formatArticleDate(FEATURED.datePublished)}
              </div>
              <h2>{FEATURED.title}</h2>
              <p className="ex">{FEATURED.description}</p>
              <div className="byline">
                <span className="av">S</span> <b>Tim Sosmed AI</b>
              </div>
            </div>
          </Link>

          {/* TABS + GRID (client-side category filter) */}
          <BlogGrid
            posts={POSTS.filter((post) => post.slug !== FEATURED_SLUG).map(
              (post) => ({
                ...post,
                thumb: blogThumb(post.slug),
                date: formatArticleDate(ARTICLES[post.slug].datePublished),
              }),
            )}
          />

          {/* NEWSLETTER — live (POST /api/newsletter) */}
          <NewsletterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
