import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Tentang Kami",
    description:
      "Tentang Sosmed AI: asisten bisnis berbasis AI yang berjalan langsung di WhatsApp untuk UMKM F&B Indonesia — kenapa kami membangunnya, fitur, prinsip, dan cara kerjanya.",
    path: "/tentang",
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: { absolute: "Tentang Kami - Sosmed AI" },
};

export default function TentangPage() {
  return (
    <>
      <Nav />
      <main className="tentang-page">
        {/* HERO */}
        <div className="hero">
          <div className="topbar">
            <Link className="back" href="/">
              <svg
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>{" "}
              Kembali
            </Link>
          </div>
          <span className="pill">
            <span className="dot"></span> Tentang Sosmed AI
          </span>
          <h1>
            Operating system bisnis untuk UMKM F&amp;B,{" "}
            <span className="hl">langsung di WhatsApp.</span>
          </h1>
          <p>
            Pemilik warung dan kafe di Indonesia sudah jago pakai WhatsApp.
            Menurut kami, itu sudah cukup — maka kami membangun asisten bisnis
            berbasis AI yang bekerja di tempat yang sudah mereka kuasai.
          </p>
          <div className="btns">
            {/* TODO: wire to real waitlist URL when available (no live waitlist target exists yet) */}
            <a href="#" className="btn">
              Gabung Waitlist
            </a>
            <Link href="/produk" className="btn ghost">
              Lihat Produk
            </Link>
          </div>
        </div>

        {/* STORY */}
        <div className="story">
          <p>
            Pemilik warung dan kafe sudah menjalankan bisnis lewat WhatsApp —
            tapi kebanyakan tools memaksa mereka belajar dashboard rumit dan
            instal aplikasi baru. <strong>Sosmed AI menghapus semua itu:</strong>{" "}
            asisten bisnis berbasis AI yang bekerja langsung di WhatsApp.
          </p>
        </div>

        {/* COMPARISON */}
        <section className="section">
          <div className="head">
            <span className="pill">
              <span className="dot"></span> Kenapa Sosmed AI
            </span>
            <h2>Cara baru yang terasa familiar</h2>
            <p>
              Kebanyakan tools memaksa Anda belajar sistem baru. Sosmed AI
              bekerja di tempat yang sudah Anda dan pelanggan kuasai.
            </p>
          </div>
          <div className="cmp">
            <div className="cmp-row cmp-head">
              <div></div>
              <div>Cara Biasa</div>
              <div className="c-sosmed">Sosmed AI</div>
            </div>
            <div className="cmp-row hl">
              <div className="cmp-label">Cara pakai</div>
              <div className="cmp-old">
                Install aplikasi baru &amp; belajar dashboard
              </div>
              <div className="cmp-new">
                Langsung di WhatsApp, tanpa aplikasi baru
              </div>
            </div>
            <div className="cmp-row">
              <div className="cmp-label">Terima order</div>
              <div className="cmp-old">Dicatat manual, mudah terlewat</div>
              <div className="cmp-new">Tercatat otomatis dari chat pelanggan</div>
            </div>
            <div className="cmp-row">
              <div className="cmp-label">Kelola menu</div>
              <div className="cmp-old">
                Kirim ulang foto &amp; harga tiap ditanya
              </div>
              <div className="cmp-new">Menu digital, cukup atur sekali</div>
            </div>
            <div className="cmp-row">
              <div className="cmp-label">Pelanggan setia</div>
              <div className="cmp-old">
                Kartu stempel fisik yang sering hilang
              </div>
              <div className="cmp-new">Sistem poin &amp; member otomatis</div>
            </div>
            <div className="cmp-row">
              <div className="cmp-label">Laporan penjualan</div>
              <div className="cmp-old">Hitung manual di akhir hari</div>
              <div className="cmp-new">Ringkasan penjualan otomatis</div>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="section" style={{ paddingTop: "8px" }}>
          <div className="head">
            <span className="pill">
              <span className="dot"></span> Fitur
            </span>
            <h2>Yang kami bangun</h2>
            <p>Semua yang Anda butuhkan untuk mengelola usaha, di satu chat.</p>
          </div>
          <div className="grid">
            <div className="fcard">
              <div className="ic">
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Order Otomatis</h3>
              <p>
                Pelanggan pesan lewat chat, langsung tercatat rapi. Tidak ada
                lagi order yang terlewat saat ramai.
              </p>
            </div>
            <div className="fcard">
              <div className="ic">
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h18M9 21V9" />
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
              </div>
              <h3>Menu Digital</h3>
              <p>
                Atur menu dan harga sekali. Pelanggan selalu melihat versi
                terbaru tanpa Anda kirim ulang.
              </p>
            </div>
            <div className="fcard">
              <div className="ic">
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21l2.3-7.4-6-4.6h7.6z" />
                </svg>
              </div>
              <h3>Sistem Poin &amp; Member</h3>
              <p>
                Bangun pelanggan setia tanpa kartu fisik atau aplikasi terpisah
                — semua tercatat otomatis.
              </p>
            </div>
            <div className="fcard">
              <div className="ic">
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 3 3 5-6" />
                </svg>
              </div>
              <h3>Laporan Penjualan</h3>
              <p>
                Pantau penjualan, menu terlaris, dan pelanggan setia cukup lewat
                chat — tanpa hitung manual.
              </p>
            </div>
            <div className="fcard">
              <div className="ic">
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                  <path d="M8 12l2.5 2.5L16 9" />
                </svg>
              </div>
              <h3>Tanpa Aplikasi Baru</h3>
              <p>
                Semua berjalan di WhatsApp yang sudah Anda dan pelanggan pakai
                setiap hari. Nol kurva belajar.
              </p>
            </div>
            <div className="fcard">
              <div className="ic">
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <h3>Aman &amp; Sesuai UU PDP</h3>
              <p>
                Data usaha dan pelanggan Anda diproses sesuai ketentuan
                Undang-Undang Pelindungan Data Pribadi.
              </p>
            </div>
          </div>
        </section>

        {/* AI NATIVE (dark) */}
        <section className="section" style={{ paddingTop: "8px" }}>
          <div className="ai">
            <div className="inner">
              <span className="pill">
                <span className="dot"></span> AI-native
              </span>
              <h2>Ditenagai AI yang mengerti bahasa pelanggan Anda</h2>
              <p>
                Pelanggan tidak mengetik perintah kaku. Mereka chat seperti
                biasa — lengkap dengan singkatan, typo, dan gaya ngobrol khas
                WhatsApp. Sosmed AI dibangun untuk memahami itu.
              </p>
              <div className="ai-grid">
                <div className="ai-card">
                  <h4>Paham bahasa sehari-hari</h4>
                  <p>
                    &quot;es kopsu 2 less sugar ya kak&quot; tetap dimengerti —
                    tanpa pelanggan harus belajar format khusus.
                  </p>
                </div>
                <div className="ai-card">
                  <h4>Bukan bot kaku</h4>
                  <p>
                    Percakapan terasa natural, bukan menu bertingkat &quot;ketik
                    1, ketik 2&quot; yang bikin pelanggan malas.
                  </p>
                </div>
                <div className="ai-card">
                  <h4>Model terbaik tiap tugas</h4>
                  <p>
                    Kami merutekan ke model AI terdepan sesuai kebutuhan, demi
                    balasan yang cepat dan relevan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="section" style={{ paddingTop: "8px" }}>
          <div className="head">
            <span className="pill">
              <span className="dot"></span> Cara kerja
            </span>
            <h2>Mulai dalam 3 langkah</h2>
            <p>Semudah chatting di WhatsApp.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="vis">
                <div className="wa">
                  <div className="b in">Mau daftar member kak? Ketik nama aja 🙂</div>
                  <div className="b out">Dimas</div>
                  <div className="b in">
                    ✅ Sip Dimas, WhatsApp kamu udah terhubung!
                  </div>
                </div>
              </div>
              <h3>
                <span className="num">1.</span> Daftar &amp; Hubungkan
              </h3>
              <p>
                Daftar dan hubungkan nomor WhatsApp bisnis Anda. Tidak perlu
                instal apa pun.
              </p>
            </div>
            <div className="step">
              <div className="vis">
                <div className="wa">
                  <div className="menu">
                    <div className="mi">
                      <span>Es Kopi Susu</span>
                      <b>Rp 18.000</b>
                    </div>
                    <div className="mi">
                      <span>Americano</span>
                      <b>Rp 16.000</b>
                    </div>
                    <div className="mi">
                      <span>Croissant</span>
                      <b>Rp 22.000</b>
                    </div>
                    <div className="mi" style={{ border: "none" }}>
                      <span>Matcha Latte</span>
                      <b>Rp 25.000</b>
                    </div>
                  </div>
                </div>
              </div>
              <h3>
                <span className="num">2.</span> Atur Menu
              </h3>
              <p>
                Masukkan menu dan harga. Cukup sekali — pelanggan langsung bisa
                pesan.
              </p>
            </div>
            <div className="step">
              <div className="vis">
                <div className="wa">
                  <div className="b in">es kopi susu 2, less sugar ya kak</div>
                  <div className="b out">
                    Siap kak! Total Rp 36.000. Diambil atau diantar?
                  </div>
                  <div
                    className="rep"
                    style={{
                      borderTop: "1px solid #f0f0f0",
                      marginTop: "4px",
                      paddingTop: "8px",
                    }}
                  >
                    <span>Order hari ini</span>
                    <b>tercatat otomatis ✓</b>
                  </div>
                </div>
              </div>
              <h3>
                <span className="num">3.</span> Mulai Terima Order
              </h3>
              <p>
                Pelanggan pesan lewat chat, Sosmed AI bantu kelola order, poin,
                dan laporan otomatis.
              </p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="section" style={{ paddingTop: "8px" }}>
          <div className="head">
            <span className="pill">
              <span className="dot"></span> Prinsip kami
            </span>
            <h2>Apa yang kami percaya</h2>
            <p>Prinsip sederhana yang memandu cara kami membangun Sosmed AI.</p>
          </div>
          <div className="values">
            <div className="val">
              <div className="vn">01</div>
              <h3>Teknologi harus menyederhanakan</h3>
              <p>
                Alat yang baik menghilangkan pekerjaan, bukan menambah satu
                sistem baru yang harus dipelajari. Kalau butuh pelatihan
                berhari-hari, itu bukan untuk pemilik warung.
              </p>
            </div>
            <div className="val">
              <div className="vn">02</div>
              <h3>Temui pelaku usaha di tempat mereka</h3>
              <p>
                Pemilik usaha F&amp;B sudah hidup di WhatsApp. Kami membangun di
                sana — bukan memaksa mereka pindah ke aplikasi atau dashboard
                baru.
              </p>
            </div>
            <div className="val">
              <div className="vn">03</div>
              <h3>Mulai dari masalah nyata</h3>
              <p>
                Kami membangun untuk keseharian warung dan kafe — order menumpuk
                saat ramai, pelanggan kabur, laporan ribet — bukan untuk fitur
                yang sekadar terlihat keren.
              </p>
            </div>
            <div className="val">
              <div className="vn">04</div>
              <h3>Jujur &amp; transparan</h3>
              <p>
                Kami terbuka soal apa yang produk kami bisa dan belum bisa
                lakukan, bagaimana data Anda diproses, dan berapa biayanya. Tanpa
                janji berlebihan.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" style={{ paddingTop: "8px" }}>
          <div className="head">
            <span className="pill">
              <span className="dot"></span> FAQ
            </span>
            <h2>Pertanyaan umum</h2>
          </div>
          <div className="faq">
            <div className="qa">
              <h4>Apakah saya perlu menginstal aplikasi?</h4>
              <p>
                Tidak. Sosmed AI berjalan langsung di WhatsApp yang sudah Anda
                pakai. Tidak ada aplikasi tambahan atau dashboard yang harus
                dipelajari.
              </p>
            </div>
            <div className="qa">
              <h4>Apakah pelanggan saya perlu aplikasi khusus?</h4>
              <p>
                Tidak. Pelanggan cukup chat ke nomor WhatsApp usaha Anda seperti
                biasa.
              </p>
            </div>
            <div className="qa">
              <h4>Apakah Sosmed AI sudah bisa dipakai sekarang?</h4>
              <p>
                Sosmed AI sedang dalam tahap peluncuran awal. Anda bisa bergabung
                ke waitlist untuk menjadi yang pertama mencoba.
              </p>
            </div>
            <div className="qa">
              <h4>Berapa biayanya?</h4>
              <p>
                Rincian paket dan harga tersedia di halaman{" "}
                <Link href="/harga">Harga</Link>.
              </p>
            </div>
            <div className="qa">
              <h4>Bagaimana dengan keamanan data?</h4>
              <p>
                Data usaha dan pelanggan Anda diproses sesuai ketentuan UU PDP.
                Selengkapnya di <Link href="/privasi">Kebijakan Privasi</Link>{" "}
                kami.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="finalcta">
          <div className="band">
            <h2>Siap mencoba Sosmed AI?</h2>
            <p>
              Gabung ke waitlist dan jadi yang pertama mengelola usaha Anda cukup
              dari WhatsApp.
            </p>
            {/* TODO: wire to real waitlist URL when available (no live waitlist target exists yet) */}
            <a href="#" className="btn">
              Gabung Waitlist
            </a>
            <span className="note">Sedang dalam tahap peluncuran awal.</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
