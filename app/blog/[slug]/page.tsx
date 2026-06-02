import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollSpy from "./ScrollSpy";

export const metadata: Metadata = {
  // Keep noindex: single hardcoded sample article (placeholder content, no CMS).
  ...pageMetadata({
    title: "Mulai Jualan Online untuk Warung & Kafe: Panduan Lengkap",
    description:
      "Panduan langkah demi langkah memindahkan order, menu, pembayaran, dan pelanggan setia warung & kafe ke WhatsApp — tanpa aplikasi rumit dan tanpa biaya besar di awal.",
    path: "/blog/mulai-jualan-online-warung-kafe",
    noindex: true,
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: {
    absolute:
      "Mulai Jualan Online untuk Warung & Kafe: Panduan Lengkap — Sosmed AI",
  },
};

const RELATED = [
  {
    g: "g2",
    tag: "Tips Bisnis",
    title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
    excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
  },
  {
    g: "g3",
    tag: "Panduan",
    title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
    excerpt: "Kenapa pelanggan lebih nyaman pesan lewat chat.",
  },
  {
    g: "g5",
    tag: "Panduan",
    title: "Sistem Poin Sederhana untuk Usaha F&B Kecil",
    excerpt: "Program loyalitas yang ringan dijalankan dan disukai pelanggan.",
  },
];

export default function ArticlePage() {
  return (
    <>
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
            <span className="cat">Panduan</span>
            <h1>Mulai Jualan Online untuk Warung &amp; Kafe: Panduan Lengkap</h1>
            <div className="byline">
              <span className="av">S</span>
              <span style={{ textAlign: "left" }}>
                <b>Tim Sosmed AI</b>
                <span className="date">Hari ini · 8 menit baca</span>
              </span>
            </div>
          </div>

          {/* COVER */}
          <div className="cover">
            <span className="wm">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <div className="ct">Mulai jualan online cukup dari WhatsApp</div>
          </div>

          {/* LAYOUT */}
          <div className="layout">
            <article className="prose">
              <p className="lede">
                Banyak pemilik warung dan kafe merasa &quot;jualan online&quot;
                itu ribet — harus bikin aplikasi, belajar marketplace, atau
                bayar mahal. Padahal, Anda bisa mulai dari alat yang sudah Anda
                kuasai setiap hari: WhatsApp. Berikut panduan langkah demi
                langkah.
              </p>

              <div className="tldr">
                <div className="h">TL;DR — Ringkasan singkat</div>
                <ul>
                  <li>
                    Tidak perlu aplikasi mahal — mulai jualan online cukup dari
                    WhatsApp yang sudah Anda pakai.
                  </li>
                  <li>
                    Susun menu digital yang jelas (kategori + harga) supaya
                    pelanggan gampang pesan.
                  </li>
                  <li>
                    Tentukan alur order &amp; pembayaran yang konsisten agar
                    tidak ada pesanan terlewat.
                  </li>
                  <li>
                    Bangun pelanggan setia lewat sistem poin sederhana dan
                    layanan yang personal.
                  </li>
                  <li>
                    Pantau penjualan harian untuk mengambil keputusan yang lebih
                    baik.
                  </li>
                </ul>
              </div>

              <h2 id="kenapa">Kenapa jualan online penting</h2>
              <p>
                Pelanggan hari ini terbiasa memesan lewat ponsel. Kalau usaha
                Anda hanya melayani yang datang langsung, Anda kehilangan banyak
                pelanggan yang sebenarnya ingin pesan tapi malas keluar rumah
                atau sedang sibuk. Jualan online bukan soal menggantikan toko
                fisik, tapi menambah pintu masuk baru untuk order.
              </p>
              <p>
                Kabar baiknya: Anda tidak perlu langsung pakai sistem mahal.
                Mulai dari yang sederhana dulu, lalu kembangkan seiring usaha
                tumbuh.
              </p>

              <h2 id="whatsapp">Mulai dari yang sudah Anda punya: WhatsApp</h2>
              <p>
                WhatsApp adalah titik awal terbaik karena pelanggan Anda sudah
                memakainya. Tidak ada aplikasi baru yang harus mereka unduh, dan
                tidak ada biaya tambahan untuk mulai.
              </p>
              <ul>
                <li>
                  Gunakan <b>WhatsApp Business</b> (gratis) agar bisa pasang
                  profil usaha, jam buka, dan katalog sederhana.
                </li>
                <li>
                  Pasang nomor WhatsApp di mana saja pelanggan bisa melihatnya:
                  papan nama, struk, media sosial, dan stiker di meja.
                </li>
                <li>
                  Balas cepat. Kecepatan balasan sering menentukan apakah order
                  jadi atau batal.
                </li>
              </ul>
              <div className="callout">
                <b>Tips:</b> Simpan balasan yang sering dipakai (sapaan, daftar
                menu, info pembayaran) sebagai pesan cepat, agar Anda tidak
                mengetik ulang setiap kali.
              </div>

              <figure className="figure">
                <div className="frame">
                  <div className="wa">
                    <div className="wahead">
                      <div className="waav">K</div>
                      <div>
                        <div className="waname">Kopi Kita</div>
                        <div className="wastatus">● online</div>
                      </div>
                    </div>
                    <div className="b in">Halo kak, masih buka? Mau pesan 🙏</div>
                    <div className="b out">
                      Halo! Buka sampai jam 22.00 😊 Mau pesan apa kak?
                    </div>
                    <div className="b in">Es kopi susu 2 ya</div>
                  </div>
                </div>
                <figcaption className="fig-cap">
                  Ilustrasi: percakapan order sederhana lewat WhatsApp Business.
                </figcaption>
              </figure>

              <h2 id="menu">Susun menu digital yang jelas</h2>
              <p>
                Menu yang membingungkan membuat pelanggan ragu dan akhirnya
                tidak jadi pesan. Buat menu yang gampang dibaca lewat layar
                ponsel:
              </p>
              <ul>
                <li>
                  Kelompokkan per kategori (minuman, makanan, tambahan) agar
                  mudah dipindai.
                </li>
                <li>
                  Cantumkan harga dengan jelas — pelanggan tidak suka harus
                  bertanya dulu.
                </li>
                <li>
                  Perbarui ketika ada perubahan, supaya tidak ada salah paham
                  soal harga atau ketersediaan.
                </li>
              </ul>

              <figure className="figure">
                <div className="frame">
                  <div className="wa">
                    <div className="menu">
                      <div className="mh">Kopi</div>
                      <div className="mi">
                        <span>Es Kopi Susu</span>
                        <b>Rp 18.000</b>
                      </div>
                      <div className="mi">
                        <span>Americano</span>
                        <b>Rp 16.000</b>
                      </div>
                      <div className="mh">Non-Kopi</div>
                      <div className="mi">
                        <span>Matcha Latte</span>
                        <b>Rp 25.000</b>
                      </div>
                      <div className="mi" style={{ border: "none" }}>
                        <span>Cokelat</span>
                        <b>Rp 20.000</b>
                      </div>
                    </div>
                  </div>
                </div>
                <figcaption className="fig-cap">
                  Ilustrasi: menu digital dikelompokkan per kategori dengan harga
                  yang jelas.
                </figcaption>
              </figure>

              <h2 id="order">Atur cara terima order &amp; pembayaran</h2>
              <p>
                Tentukan alur yang sederhana dan konsisten, supaya tidak ada
                order yang terlewat saat ramai:
              </p>
              <ul>
                <li>
                  Konfirmasi setiap pesanan dengan ringkasan + total harga
                  sebelum diproses.
                </li>
                <li>
                  Tawarkan pembayaran lokal yang mudah seperti QRIS atau
                  transfer, lalu minta bukti.
                </li>
                <li>
                  Catat setiap order di satu tempat agar tidak tercecer di banyak
                  chat.
                </li>
              </ul>
              <p>
                Saat order makin banyak, mencatat manual mulai terasa berat. Di
                sinilah alat bantu seperti Sosmed AI membantu — order dari chat
                tercatat otomatis tanpa Anda salin satu per satu.
              </p>

              <figure className="figure">
                <div className="frame">
                  <div className="wa">
                    <div className="b out">
                      Pesanan kakak: 2x Es Kopi Susu — total Rp 36.000. Lanjut
                      ya?
                    </div>
                    <div className="b in">Iya kak</div>
                    <div className="b out">
                      Bayar via QRIS / transfer ya, kirim bukti setelah bayar 🙏
                    </div>
                    <div className="b in">Sudah transfer 👍</div>
                    <div className="b out">
                      Pembayaran diterima ✅ Pesanan disiapkan.
                    </div>
                  </div>
                </div>
                <figcaption className="fig-cap">
                  Ilustrasi: alur konfirmasi order dan pembayaran.
                </figcaption>
              </figure>

              <h2 id="loyal">Bangun pelanggan setia</h2>
              <p>
                Mendapat pelanggan baru lebih mahal daripada membuat pelanggan
                lama kembali. Beberapa cara sederhana:
              </p>
              <ul>
                <li>
                  Sistem poin atau stempel digital — beli sekian kali, dapat
                  gratis atau diskon.
                </li>
                <li>Sapaan personal dan ucapan terima kasih setelah order.</li>
                <li>
                  Info promo ke pelanggan yang pernah memesan, secukupnya —
                  jangan sampai mengganggu.
                </li>
              </ul>

              <figure className="figure">
                <div className="frame">
                  <div className="points">
                    <div className="pv">284 poin</div>
                    <div className="pl">
                      16 poin lagi menuju voucher Rp 5.000
                    </div>
                    <div className="dots">
                      <span className="pdot f"></span>
                      <span className="pdot f"></span>
                      <span className="pdot f"></span>
                      <span className="pdot f"></span>
                      <span className="pdot"></span>
                    </div>
                  </div>
                </div>
                <figcaption className="fig-cap">
                  Ilustrasi: sistem poin digital untuk pelanggan setia.
                </figcaption>
              </figure>

              <h2 id="laporan">Pantau penjualan Anda</h2>
              <p>
                Anda tidak bisa memperbaiki yang tidak Anda ukur. Pantau hal-hal
                sederhana setiap hari: jumlah order, menu terlaris, dan jam
                paling ramai. Dari sini Anda bisa memutuskan kapan menambah
                stok, menu mana yang perlu didorong, dan kapan butuh tambahan
                tenaga.
              </p>

              <figure className="figure">
                <div className="frame">
                  <div className="summ">
                    <div className="st">Ringkasan Hari Ini</div>
                    <div className="row">
                      <div className="stat">
                        <div className="k">Total Order</div>
                        <div className="v">48</div>
                      </div>
                      <div className="stat">
                        <div className="k">Pendapatan</div>
                        <div className="v">Rp 1,4jt</div>
                      </div>
                    </div>
                    <div className="mh">Menu Terlaris</div>
                    <div className="ti">
                      <span>Es Kopi Susu</span>
                      <b>22</b>
                    </div>
                    <div className="ti">
                      <span>Americano</span>
                      <b>14</b>
                    </div>
                    <div className="ti">
                      <span>Croissant</span>
                      <b>9</b>
                    </div>
                  </div>
                </div>
                <figcaption className="fig-cap">
                  Contoh ilustrasi laporan — angka hanya sampel, bukan data
                  nyata.
                </figcaption>
              </figure>

              <h2 id="langkah">Langkah selanjutnya</h2>
              <p>
                Mulai dari yang kecil: rapikan WhatsApp Business, susun menu
                digital, dan tentukan alur order. Setelah itu berjalan, baru
                pikirkan alat yang mengotomatiskan pencatatan, poin, dan laporan
                supaya Anda bisa fokus melayani pelanggan — bukan sibuk mengurus
                administrasi.
              </p>
              <p>
                Sosmed AI dibangun untuk membantu langkah itu, semua langsung
                dari WhatsApp — agar Anda bisa fokus melayani pelanggan, bukan
                sibuk mengurus administrasi.
              </p>
            </article>

            {/* TOC RIGHT */}
            <nav className="toc">
              <div className="h">Daftar Isi</div>
              <a href="#kenapa">Kenapa jualan online penting</a>
              <a href="#whatsapp">Mulai dari WhatsApp</a>
              <a href="#menu">Susun menu digital</a>
              <a href="#order">Terima order &amp; pembayaran</a>
              <a href="#loyal">Bangun pelanggan setia</a>
              <a href="#laporan">Pantau penjualan</a>
              <a href="#langkah">Langkah selanjutnya</a>
            </nav>
          </div>

          {/* RELATED */}
          <div className="related">
            <h3>Artikel terkait</h3>
            <div className="rgrid">
              {RELATED.map((r) => (
                <Link className="rcard" href="/blog" key={r.title}>
                  <div className={`thumb ${r.g}`}>
                    <span className="t-badge">{r.tag}</span>
                  </div>
                  <h4>{r.title}</h4>
                  <p>{r.excerpt}</p>
                  <div className="rmeta">Tim Sosmed AI · Hari ini</div>
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
