import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Syarat & Ketentuan",
    description:
      "Syarat & Ketentuan penggunaan layanan Sosmed AI untuk pelaku usaha F&B: ruang lingkup, akun & tanggung jawab, harga & pembayaran, batasan tanggung jawab, dan hukum yang berlaku.",
    path: "/syarat",
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: { absolute: "Syarat & Ketentuan — Sosmed AI" },
};

export default function SyaratPage() {
  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="legal-wrap">
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

          <h1>Syarat &amp; Ketentuan</h1>
          <div className="updated">Terakhir diperbarui: 2 Juni 2026</div>

          {/* 1 */}
          <h2>
            <span className="n">1.</span>Ruang Lingkup &amp; Para Pihak
          </h2>
          <div className="clause">
            <span className="id">1.1</span>
            <span className="lead">Ketentuan ini.</span> Syarat &amp; Ketentuan
            (&quot;Ketentuan&quot;) ini mengatur seluruh penggunaan platform dan
            layanan terkait (&quot;Layanan&quot;) Sosmed AI. Dengan mendaftar
            atau menggunakan Layanan, Anda menyetujui Ketentuan ini. Jika Anda
            tidak menyetujuinya, mohon untuk tidak menggunakan Layanan.
          </div>
          <div className="clause">
            <span className="id">1.2</span>
            <span className="lead">Penyedia.</span> Layanan dijalankan oleh PT
            Beneran Hype Terus (&quot;Sosmed AI&quot;, &quot;kami&quot;),
            beralamat di Jakarta Selatan, DKI Jakarta, Indonesia. Layanan
            ditujukan untuk pelaku usaha (pemilik bisnis F&amp;B), bukan untuk
            konsumen perorangan.
          </div>
          <div className="clause">
            <span className="id">1.3</span>
            <span className="lead">Pengguna.</span> &quot;Anda&quot; merujuk pada
            pelaku usaha yang mendaftar dan menggunakan Layanan. Anda menyatakan
            berusia minimal 18 tahun dan berwenang mewakili usaha yang Anda
            daftarkan.
          </div>

          {/* 2 */}
          <h2>
            <span className="n">2.</span>Layanan yang Disediakan
          </h2>
          <div className="clause">
            <span className="id">2.1</span>
            <span className="lead">Layanan inti.</span> Sosmed AI adalah asisten
            bisnis berbasis AI yang berjalan di WhatsApp untuk membantu pelaku
            usaha F&amp;B mengelola order, menu, sistem poin, dan laporan. Fitur
            lengkap dijelaskan di situs kami.
          </div>
          <div className="clause">
            <span className="id">2.2</span>
            <span className="lead">Tahap peluncuran awal.</span> Layanan saat ini
            dalam tahap peluncuran awal, sehingga sebagian fitur dapat berubah,
            ditambahkan, atau disesuaikan dari waktu ke waktu. Kami akan
            menyediakan versi Layanan yang berfungsi pada saat tertentu.
          </div>
          <div className="clause">
            <span className="id">2.3</span>
            <span className="lead">Perubahan layanan.</span> Kami dapat melakukan
            perubahan yang wajar pada Layanan (mis. untuk meningkatkan performa
            atau mematuhi hukum) tanpa menghilangkan fungsi inti. Perubahan
            material akan diberitahukan secara wajar.
          </div>
          <div className="clause">
            <span className="id">2.4</span>
            <span className="lead">Komponen pihak ketiga.</span> Layanan kami
            bergantung pada penyedia pihak ketiga (mis. WhatsApp Business
            Platform melalui 360dialog, infrastruktur cloud, penyedia model AI,
            dan penyedia pembayaran). Ketersediaan layanan eksternal tersebut
            berada di luar kendali kami. Kami berhak menyesuaikan atau mengganti
            daftar penyedia AI yang digunakan.
          </div>
          <div className="clause">
            <span className="id">2.5</span>
            <span className="lead">Tanpa jaminan hasil.</span> Kecuali disepakati
            secara tegas, kami tidak menjamin keluaran atau hasil tertentu dari
            penggunaan Layanan. Kualitas balasan AI bergantung pada masukan dan
            data yang Anda berikan.
          </div>

          {/* 3 */}
          <h2>
            <span className="n">3.</span>Akun &amp; Tanggung Jawab Anda
          </h2>
          <div className="clause">
            <span className="id">3.1</span>
            <span className="lead">Tanggung jawab.</span> Anda setuju menggunakan
            Layanan hanya untuk tujuan usaha yang sah dan sesuai hukum yang
            berlaku. Anda wajib menjaga kerahasiaan akses akun dan nomor WhatsApp
            yang terhubung, serta bertanggung jawab atas seluruh aktivitas
            melalui akun Anda.
          </div>
          <div className="clause">
            <span className="id">3.2</span>
            <span className="lead">Data &amp; konten.</span> Anda bertanggung
            jawab atas informasi usaha yang Anda berikan (mis. menu, harga) dan
            memastikan keakuratannya. Anda juga bertanggung jawab atas hubungan
            dan transaksi dengan pelanggan akhir Anda, termasuk pemenuhan pesanan
            dan penyelesaian keluhan.
          </div>
          <div className="clause">
            <span className="id">3.3</span>
            <span className="lead">Penggunaan yang dilarang.</span> Anda tidak
            boleh:
            <ul>
              <li>
                menggunakan Layanan untuk aktivitas yang melanggar hukum atau hak
                pihak lain;
              </li>
              <li>
                mengirim spam, penipuan, atau konten menyesatkan kepada
                pelanggan;
              </li>
              <li>
                menjual barang/jasa yang dilarang hukum atau kebijakan
                WhatsApp/Meta;
              </li>
              <li>
                merekayasa balik (reverse-engineer), mengganggu, atau
                menyalahgunakan sistem kami.
              </li>
            </ul>
            Pelanggaran dapat mengakibatkan penangguhan atau penghentian akun
            setelah pemberitahuan yang wajar bila memungkinkan.
          </div>

          {/* 4 */}
          <h2>
            <span className="n">4.</span>Kekayaan Intelektual &amp; Data
          </h2>
          <div className="clause">
            <span className="id">4.1</span>
            <span className="lead">Hak atas Layanan.</span> Seluruh hak kekayaan
            intelektual atas Layanan (termasuk perangkat lunak, model, dan
            dokumentasi) tetap menjadi milik eksklusif PT Beneran Hype Terus.
            Kami hanya memberi Anda hak terbatas, non-eksklusif, dan tidak dapat
            dialihkan untuk menggunakan Layanan selama masa kontrak.
          </div>
          <div className="clause">
            <span className="id">4.2</span>
            <span className="lead">Data Anda.</span> Anda tetap memiliki seluruh
            hak atas data dan konten yang Anda masukkan (&quot;Data
            Pelanggan&quot;). Anda memberi kami izin untuk memproses data
            tersebut sebatas yang diperlukan untuk menyediakan Layanan.
            Pemrosesan data pribadi tunduk pada{" "}
            <Link href="/privasi">Kebijakan Privasi</Link> kami, yang menjadi
            bagian tak terpisahkan dari Ketentuan ini. Anda bertanggung jawab
            memastikan Anda memiliki dasar yang sah untuk membagikan data
            pelanggan Anda kepada kami.
          </div>

          {/* 5 */}
          <h2>
            <span className="n">5.</span>Harga &amp; Pembayaran
          </h2>
          <div className="clause">
            <span className="id">5.1</span>
            <span className="lead">Biaya.</span> Rincian paket dan harga tersedia
            di halaman <Link href="/harga">Harga</Link>. Dengan berlangganan
            paket berbayar, Anda setuju membayar biaya yang berlaku sesuai siklus
            penagihan yang dipilih.
          </div>
          <div className="clause">
            <span className="id">5.2</span>
            <span className="lead">Penagihan &amp; penangguhan.</span> Pembayaran
            diproses melalui penyedia pembayaran (Xendit). Jika pembayaran tidak
            dilakukan tepat waktu, kami berhak menangguhkan akses Layanan setelah
            pemberitahuan dan tenggang waktu yang wajar, hingga tunggakan
            dilunasi.
          </div>
          <div className="clause">
            <span className="id">5.3</span>
            <span className="lead">Perubahan harga.</span> Harga dapat berubah,
            dan perubahan akan diberitahukan sebelumnya. Kecuali diwajibkan oleh
            hukum, biaya yang sudah dibayarkan tidak dapat dikembalikan untuk
            periode berjalan.
          </div>

          {/* 6 */}
          <h2>
            <span className="n">6.</span>Ketersediaan &amp; Pemeliharaan
          </h2>
          <div className="clause">
            <span className="id">6.1</span>
            <span className="lead">Ketersediaan.</span> Kami berupaya menjaga
            Layanan tetap tersedia, namun tidak menjamin Layanan bebas gangguan
            atau bebas kesalahan, terutama selama tahap peluncuran awal.
          </div>
          <div className="clause">
            <span className="id">6.2</span>
            <span className="lead">Pemeliharaan.</span> Kami dapat melakukan
            pemeliharaan, pembaruan, atau perubahan fitur dari waktu ke waktu,
            dan akan memberitahukan pembatasan penggunaan yang signifikan secara
            wajar.
          </div>

          {/* 7 */}
          <h2>
            <span className="n">7.</span>Batasan Tanggung Jawab
          </h2>
          <div className="clause">
            <span className="id">7.1</span>
            <span className="lead">Batasan.</span> Sepanjang diizinkan oleh
            hukum, Sosmed AI tidak bertanggung jawab atas kerugian tidak
            langsung, insidental, atau konsekuensial yang timbul dari penggunaan
            Layanan, termasuk kehilangan keuntungan atau data. Layanan disediakan
            &quot;sebagaimana adanya&quot; selama tahap peluncuran awal.
          </div>
          <div className="clause">
            <span className="id">7.2</span>
            <span className="lead">Ganti rugi.</span> Anda setuju membebaskan
            kami dari tuntutan pihak ketiga yang timbul dari penggunaan Layanan
            oleh Anda secara melanggar hukum atau pelanggaran Ketentuan ini.{" "}
            <em className="flag">
              (Klausul batasan tanggung jawab sebaiknya ditinjau oleh penasihat
              hukum.)
            </em>
          </div>

          {/* 8 */}
          <h2>
            <span className="n">8.</span>Masa Berlaku &amp; Pengakhiran
          </h2>
          <div className="clause">
            <span className="id">8.1</span>
            <span className="lead">Masa berlaku.</span> Kontrak dimulai saat Anda
            menerima Ketentuan ini dan mendaftar. Anda dapat berhenti menggunakan
            Layanan kapan saja.
          </div>
          <div className="clause">
            <span className="id">8.2</span>
            <span className="lead">Pengakhiran karena pelanggaran.</span> Kami
            dapat menangguhkan atau menghentikan akses Anda jika Anda melanggar
            Ketentuan ini atau menggunakan Layanan secara melanggar hukum.
          </div>
          <div className="clause">
            <span className="id">8.3</span>
            <span className="lead">Akibat pengakhiran.</span> Setelah
            pengakhiran, akun Anda dinonaktifkan dan Data Pelanggan ditangani
            sesuai <Link href="/privasi">Kebijakan Privasi</Link>. Ketentuan yang
            menurut sifatnya tetap berlaku (mis. kekayaan intelektual, batasan
            tanggung jawab, hukum yang berlaku) akan terus berlaku.
          </div>

          {/* 9 */}
          <h2>
            <span className="n">9.</span>Perubahan Ketentuan
          </h2>
          <div className="clause">
            <span className="id">9.1</span>
            <span className="lead">Pembaruan.</span> Kami dapat memperbarui
            Ketentuan ini dari waktu ke waktu. Untuk perubahan signifikan, kami
            akan memberi tahu melalui situs atau email. Tanggal &quot;Terakhir
            diperbarui&quot; di atas menunjukkan revisi terbaru. Melanjutkan
            penggunaan Layanan setelah perubahan berarti Anda menerima Ketentuan
            yang diperbarui.
          </div>

          {/* 10 */}
          <h2>
            <span className="n">10.</span>Hukum yang Berlaku &amp; Yurisdiksi
          </h2>
          <div className="clause">
            <span className="id">10.1</span>
            <span className="lead">Hukum yang berlaku.</span> Ketentuan ini
            diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
          </div>
          <div className="clause">
            <span className="id">10.2</span>
            <span className="lead">Yurisdiksi.</span> Setiap sengketa yang timbul
            dari Ketentuan ini akan diselesaikan sesuai hukum yang berlaku di
            Indonesia.{" "}
            <em className="flag">
              (Forum/yurisdiksi penyelesaian sengketa sebaiknya dikonfirmasi oleh
              penasihat hukum.)
            </em>
          </div>

          {/* 11 */}
          <h2>
            <span className="n">11.</span>Ketentuan Penutup
          </h2>
          <div className="clause">
            <span className="id">11.1</span>
            <span className="lead">Keterpisahan.</span> Jika salah satu ketentuan
            dinyatakan tidak berlaku, ketentuan lainnya tetap berlaku.
          </div>
          <div className="clause">
            <span className="id">11.2</span>
            <span className="lead">Keseluruhan perjanjian.</span> Ketentuan ini
            merupakan keseluruhan perjanjian antara Anda dan kami terkait
            Layanan, dan menggantikan kesepakatan sebelumnya terkait hal yang
            sama.
          </div>
          <div className="clause">
            <span className="id">11.3</span>
            <span className="lead">Kontak.</span> Untuk pertanyaan terkait
            Ketentuan ini, hubungi kami di hello@sosmed.io. Untuk pertanyaan
            terkait data dan privasi, hubungi support@sosmed.io.
          </div>

          <div className="footer-legal">
            <Link href="/">← Kembali ke beranda</Link> &nbsp;·&nbsp;{" "}
            <Link href="/privasi">Kebijakan Privasi</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
