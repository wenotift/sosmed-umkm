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
  title: { absolute: "Syarat & Ketentuan - Sosmed AI" },
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

          <p className="lead">
            <strong>Tentang Ketentuan Ini.</strong> Syarat &amp; Ketentuan
            (&quot;Ketentuan&quot;) ini mengatur seluruh penggunaan platform dan
            layanan (&quot;Layanan&quot;) Sosmed AI yang disediakan oleh PT
            Beneran Hype Terus (&quot;Sosmed AI&quot;, &quot;Kami&quot;),
            beralamat di Jakarta Selatan, DKI Jakarta, Indonesia. Dengan
            mendaftar atau menggunakan Layanan, Anda menyetujui Ketentuan ini.
            Jika Anda tidak menyetujuinya, mohon untuk tidak menggunakan Layanan.
          </p>
          <p className="lead">
            <strong>Tentang Layanan.</strong> Sosmed AI adalah asisten bisnis
            berbasis AI yang berjalan di WhatsApp untuk membantu pelaku usaha
            F&amp;B mengelola order, menu, sistem poin, dan laporan. Layanan saat
            ini dalam tahap peluncuran awal, sehingga sebagian fitur dapat
            berubah, ditambahkan, atau disesuaikan dari waktu ke waktu.
          </p>

          <h2>1. Ruang Lingkup &amp; Para Pihak</h2>
          <p>
            <span className="sub">1.1 Ketentuan ini.</span> Ketentuan ini
            mengatur seluruh penggunaan Layanan. Dengan mendaftar atau
            menggunakan Layanan, Anda menyetujui Ketentuan ini.
          </p>
          <p>
            <span className="sub">1.2 Penyedia.</span> Layanan dijalankan oleh PT
            Beneran Hype Terus, beralamat di Jakarta Selatan, DKI Jakarta,
            Indonesia. Layanan ditujukan untuk pelaku usaha (pemilik bisnis
            F&amp;B), bukan untuk konsumen perorangan.
          </p>
          <p>
            <span className="sub">1.3 Pengguna.</span> &quot;Anda&quot; merujuk
            pada pelaku usaha yang mendaftar dan menggunakan Layanan. Anda
            menyatakan berusia minimal 18 tahun dan berwenang mewakili usaha yang
            Anda daftarkan.
          </p>

          <h2>2. Layanan yang Disediakan</h2>
          <p>
            <span className="sub">2.1 Layanan inti.</span> Sosmed AI adalah
            asisten bisnis berbasis AI yang berjalan di WhatsApp untuk membantu
            pelaku usaha F&amp;B mengelola order, menu, sistem poin, dan laporan.
            Fitur lengkap dijelaskan di situs Kami.
          </p>
          <p>
            <span className="sub">2.2 Tahap peluncuran awal.</span> Layanan saat
            ini dalam tahap peluncuran awal, sehingga sebagian fitur dapat
            berubah, ditambahkan, atau disesuaikan dari waktu ke waktu. Kami
            menyediakan versi Layanan yang berfungsi pada saat tertentu.
          </p>
          <p>
            <span className="sub">2.3 Perubahan layanan.</span> Kami dapat
            melakukan perubahan yang wajar pada Layanan (mis. untuk meningkatkan
            performa atau mematuhi hukum) tanpa menghilangkan fungsi inti.
            Perubahan material akan diberitahukan secara wajar.
          </p>
          <p>
            <span className="sub">2.4 Komponen pihak ketiga.</span> Layanan Kami
            bergantung pada penyedia pihak ketiga (mis. WhatsApp Business
            Platform melalui 360dialog, infrastruktur cloud, penyedia model AI,
            dan penyedia pembayaran). Ketersediaan layanan eksternal tersebut
            berada di luar kendali Kami. Kami berhak menyesuaikan atau mengganti
            daftar penyedia AI yang digunakan.
          </p>
          <p>
            <span className="sub">2.5 Tanpa jaminan hasil.</span> Kecuali
            disepakati secara tegas, Kami tidak menjamin keluaran atau hasil
            tertentu dari penggunaan Layanan. Kualitas balasan AI bergantung pada
            masukan dan data yang Anda berikan.
          </p>

          <h2>3. Akun &amp; Tanggung Jawab Anda</h2>
          <p>
            <span className="sub">3.1 Tanggung jawab.</span> Anda setuju
            menggunakan Layanan hanya untuk tujuan usaha yang sah dan sesuai
            hukum yang berlaku. Anda wajib menjaga kerahasiaan akses akun dan
            nomor WhatsApp yang terhubung, serta bertanggung jawab atas seluruh
            aktivitas melalui akun Anda.
          </p>
          <p>
            <span className="sub">3.2 Data &amp; konten.</span> Anda bertanggung
            jawab atas informasi usaha yang Anda berikan (mis. menu, harga) dan
            memastikan keakuratannya. Anda juga bertanggung jawab atas hubungan
            dan transaksi dengan pelanggan akhir Anda, termasuk pemenuhan pesanan
            dan penyelesaian keluhan.
          </p>
          <p>
            <span className="sub">3.3 Penggunaan yang dilarang.</span> Anda tidak
            boleh:
          </p>
          <ul>
            <li>
              menggunakan Layanan untuk aktivitas yang melanggar hukum atau hak
              pihak lain;
            </li>
            <li>
              mengirim spam, penipuan, atau konten menyesatkan kepada pelanggan;
            </li>
            <li>
              menjual barang/jasa yang dilarang hukum atau kebijakan
              WhatsApp/Meta;
            </li>
            <li>
              merekayasa balik (reverse-engineer), mengganggu, atau
              menyalahgunakan sistem Kami.
            </li>
          </ul>
          <p>
            Pelanggaran dapat mengakibatkan penangguhan atau penghentian akun
            setelah pemberitahuan yang wajar bila memungkinkan.
          </p>

          <h2>4. Kekayaan Intelektual &amp; Data</h2>
          <p>
            <span className="sub">4.1 Hak atas Layanan.</span> Seluruh hak
            kekayaan intelektual atas Layanan (termasuk perangkat lunak, model,
            dan dokumentasi) tetap menjadi milik eksklusif PT Beneran Hype Terus.
            Kami hanya memberi Anda hak terbatas, non-eksklusif, dan tidak dapat
            dialihkan untuk menggunakan Layanan selama masa kontrak.
          </p>
          <p>
            <span className="sub">4.2 Data Anda.</span> Anda tetap memiliki
            seluruh hak atas data dan konten yang Anda masukkan (&quot;Data
            Pelanggan&quot;). Anda memberi Kami izin untuk memproses data
            tersebut sebatas yang diperlukan untuk menyediakan Layanan.
            Pemrosesan data pribadi tunduk pada{" "}
            <Link href="/privasi">Kebijakan Privasi</Link> Kami, yang menjadi
            bagian tak terpisahkan dari Ketentuan ini. Anda bertanggung jawab
            memastikan Anda memiliki dasar yang sah untuk membagikan data
            pelanggan Anda kepada Kami.
          </p>

          <h2>5. Harga &amp; Pembayaran</h2>
          <p>
            <span className="sub">5.1 Biaya.</span> Rincian paket dan harga
            tersedia di halaman <Link href="/harga">Harga</Link>. Dengan
            berlangganan paket berbayar, Anda setuju membayar biaya yang berlaku
            sesuai siklus penagihan yang dipilih.
          </p>
          <p>
            <span className="sub">5.2 Penagihan &amp; penangguhan.</span>{" "}
            Pembayaran diproses melalui penyedia pembayaran (Xendit). Jika
            pembayaran tidak dilakukan tepat waktu, Kami berhak menangguhkan
            akses Layanan setelah pemberitahuan dan tenggang waktu yang wajar,
            hingga tunggakan dilunasi.
          </p>
          <p>
            <span className="sub">5.3 Perubahan harga.</span> Harga dapat
            berubah, dan perubahan akan diberitahukan sebelumnya. Kecuali
            diwajibkan oleh hukum, biaya yang sudah dibayarkan tidak dapat
            dikembalikan untuk periode berjalan.
          </p>

          <h2>6. Ketersediaan &amp; Pemeliharaan</h2>
          <p>
            <span className="sub">6.1 Ketersediaan.</span> Kami berupaya menjaga
            Layanan tetap tersedia, namun tidak menjamin Layanan bebas gangguan
            atau bebas kesalahan, terutama selama tahap peluncuran awal.
          </p>
          <p>
            <span className="sub">6.2 Pemeliharaan.</span> Kami dapat melakukan
            pemeliharaan, pembaruan, atau perubahan fitur dari waktu ke waktu,
            dan akan memberitahukan pembatasan penggunaan yang signifikan secara
            wajar.
          </p>

          <h2>7. Batasan Tanggung Jawab</h2>
          <p>
            <span className="sub">7.1 Batasan.</span> Sepanjang diizinkan oleh
            hukum, Sosmed AI tidak bertanggung jawab atas kerugian tidak
            langsung, insidental, atau konsekuensial yang timbul dari penggunaan
            Layanan, termasuk kehilangan keuntungan atau data. Layanan disediakan
            &quot;sebagaimana adanya&quot; selama tahap peluncuran awal.
          </p>
          <p>
            <span className="sub">7.2 Ganti rugi.</span> Anda setuju membebaskan
            Kami dari tuntutan pihak ketiga yang timbul dari penggunaan Layanan
            oleh Anda secara melanggar hukum atau pelanggaran Ketentuan ini.{" "}
            <em className="flag">
              (Klausul batasan tanggung jawab sebaiknya ditinjau oleh penasihat
              hukum.)
            </em>
          </p>

          <h2>8. Masa Berlaku &amp; Pengakhiran</h2>
          <p>
            <span className="sub">8.1 Masa berlaku.</span> Kontrak dimulai saat
            Anda menerima Ketentuan ini dan mendaftar. Anda dapat berhenti
            menggunakan Layanan kapan saja.
          </p>
          <p>
            <span className="sub">8.2 Pengakhiran karena pelanggaran.</span> Kami
            dapat menangguhkan atau menghentikan akses Anda jika Anda melanggar
            Ketentuan ini atau menggunakan Layanan secara melanggar hukum.
          </p>
          <p>
            <span className="sub">8.3 Akibat pengakhiran.</span> Setelah
            pengakhiran, akun Anda dinonaktifkan dan Data Pelanggan ditangani
            sesuai <Link href="/privasi">Kebijakan Privasi</Link>. Ketentuan yang
            menurut sifatnya tetap berlaku (mis. kekayaan intelektual, batasan
            tanggung jawab, hukum yang berlaku) akan terus berlaku.
          </p>

          <h2>9. Perubahan Ketentuan</h2>
          <p>
            Kami dapat memperbarui Ketentuan ini dari waktu ke waktu. Untuk
            perubahan signifikan, Kami akan memberi tahu melalui situs atau
            surel. Tanggal &quot;Terakhir diperbarui&quot; di atas menunjukkan
            revisi terbaru. Melanjutkan penggunaan Layanan setelah perubahan
            berarti Anda menerima Ketentuan yang diperbarui.
          </p>

          <h2>10. Hukum yang Berlaku &amp; Yurisdiksi</h2>
          <p>
            <span className="sub">10.1 Hukum yang berlaku.</span> Ketentuan ini
            diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
          </p>
          <p>
            <span className="sub">10.2 Yurisdiksi.</span> Setiap sengketa yang
            timbul dari Ketentuan ini akan diselesaikan sesuai hukum yang berlaku
            di Indonesia.{" "}
            <em className="flag">
              (Forum/yurisdiksi penyelesaian sengketa sebaiknya dikonfirmasi oleh
              penasihat hukum.)
            </em>
          </p>

          <h2>11. Ketentuan Penutup</h2>
          <p>
            <span className="sub">11.1 Keterpisahan.</span> Jika salah satu
            ketentuan dinyatakan tidak berlaku, ketentuan lainnya tetap berlaku.
          </p>
          <p>
            <span className="sub">11.2 Keseluruhan perjanjian.</span> Ketentuan
            ini merupakan keseluruhan perjanjian antara Anda dan Kami terkait
            Layanan, dan menggantikan kesepakatan sebelumnya terkait hal yang
            sama.
          </p>
          <p>
            <span className="sub">11.3 Kontak.</span> Untuk pertanyaan terkait
            Ketentuan ini, hubungi Kami di hello@sosmed.io. Untuk pertanyaan
            terkait data dan privasi, hubungi support@sosmed.io.
          </p>

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
