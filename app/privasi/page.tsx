import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Kebijakan Privasi",
    description:
      "Kebijakan Privasi Sosmed AI: bagaimana kami memproses data pribadi sesuai UU No. 27 Tahun 2022 (UU PDP) — tujuan, data, dasar pemrosesan, pihak ketiga, dan hak Anda.",
    path: "/privasi",
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: { absolute: "Kebijakan Privasi - Sosmed AI" },
};

export default function PrivasiPage() {
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

          <h1>Kebijakan Privasi</h1>
          <div className="updated">Terakhir diperbarui: 2 Juni 2026</div>

          <p className="lead">
            <strong>Pengendali Data &amp; Kontak.</strong> Kebijakan Privasi ini
            (&quot;Kebijakan&quot;) diterbitkan oleh PT Beneran Hype Terus
            (&quot;Sosmed AI&quot;, &quot;Kami&quot;), beralamat di Jakarta
            Selatan, DKI Jakarta, Indonesia. Untuk pertanyaan terkait privasi,
            hubungi Kami di support@sosmed.io. Kami berkomitmen menggunakan Data
            Pribadi hanya sebatas yang diperlukan untuk menyediakan dan
            meningkatkan Layanan, sesuai dengan Undang-Undang No. 27 Tahun 2022
            tentang Pelindungan Data Pribadi (&quot;UU PDP&quot;).
          </p>
          <p className="lead">
            <strong>Ruang Lingkup.</strong> Kebijakan ini menjelaskan bagaimana
            Kami memproses Data Pribadi Anda saat Anda mengunjungi situs Kami,
            mendaftar, menggunakan Layanan, menerima komunikasi dari Kami, atau
            melakukan pembayaran. Untuk setiap situasi, Kami menjelaskan data apa
            yang digunakan, tujuannya, dasar pemrosesannya, Pihak Ketiga yang
            Kami libatkan, serta hak-hak Anda. Dengan menggunakan Layanan, Anda
            menyetujui praktik yang diuraikan dalam Kebijakan ini.
          </p>

          <h2>1. Definisi</h2>
          <div className="def">
            <b>&quot;Data Pribadi&quot;</b> berarti data tentang orang
            perseorangan yang teridentifikasi atau dapat diidentifikasi secara
            tersendiri atau dikombinasikan dengan informasi lainnya, baik
            langsung maupun tidak langsung.
          </div>
          <div className="def">
            <b>&quot;Layanan&quot;</b> berarti seluruh produk dan layanan Sosmed
            AI, termasuk asisten bisnis berbasis AI yang berjalan di WhatsApp
            serta situs web Kami.
          </div>
          <div className="def">
            <b>&quot;Anda&quot;</b> berarti pengguna Layanan — baik pemilik usaha
            yang mendaftar maupun pelanggan akhir yang berinteraksi melalui
            Layanan.
          </div>
          <div className="def">
            <b>&quot;Pihak Ketiga&quot;</b> berarti pihak di luar Kami yang
            menyediakan layanan untuk mendukung penyelenggaraan Layanan Kami.
          </div>
          <div className="def">
            <b>&quot;Hukum yang Berlaku&quot;</b> berarti seluruh peraturan
            perundang-undangan Republik Indonesia yang berlaku, termasuk UU PDP.
          </div>

          <h2>2. Saat Anda Mengunjungi Situs Kami</h2>
          <p>
            <span className="lead-in">Ringkasan.</span> Kami menggunakan situs
            untuk memberi informasi tentang Sosmed AI dan meminimalkan Data
            Pribadi dalam proses ini. Situs di-hosting oleh Vercel, dan analitik
            pengunjung situs hanya diaktifkan sesuai persetujuan Anda.
          </p>
          <p>
            <span className="lead-in">Tujuan.</span> Memuat situs serta menjaga
            keamanan dan performanya. Dengan persetujuan Anda, Kami juga
            mengumpulkan data analitik (mis. kunjungan halaman) untuk memahami
            penggunaan situs dan meningkatkan konten.
          </p>
          <p>
            <span className="lead-in">Data yang dikumpulkan.</span> Informasi
            seperti alamat IP, jenis/versi peramban, dan situs perujuk. Cookie
            esensial hanya digunakan agar situs berfungsi; untuk analitik,
            identifier hanya digunakan jika Anda menyetujuinya.
          </p>
          <p>
            <span className="lead-in">Dasar pemrosesan.</span> Kepentingan sah
            Kami untuk menyediakan situs yang aman dan berfungsi; untuk analitik,
            persetujuan Anda sesuai UU PDP.
          </p>
          <p>
            <span className="lead-in">Pihak Ketiga.</span> <b>Vercel</b> (hosting
            situs dan analitik pengunjung) dan <b>Google Analytics</b> (memahami
            penggunaan situs secara agregat). Analitik ini hanya mengukur
            kunjungan dan penggunaan situs web secara umum, bukan Data Pribadi
            atau data order pelanggan yang diproses melalui Layanan WhatsApp
            (lihat bagian 4).
          </p>

          <h2>3. Saat Anda Mendaftar (Waitlist / Akun)</h2>
          <p>
            <span className="lead-in">Ringkasan.</span> Saat Anda mendaftar ke
            waitlist atau membuat akun, Kami mengumpulkan informasi yang
            diperlukan untuk membuat dan mengelola pendaftaran Anda.
          </p>
          <p>
            <span className="lead-in">Tujuan.</span> Membuat dan mengelola
            pendaftaran/akun Anda, serta menghubungi Anda terkait peluncuran
            Layanan.
          </p>
          <p>
            <span className="lead-in">Data yang dikumpulkan.</span> Umumnya nama
            usaha, nomor WhatsApp, dan/atau alamat surel. Saat pendaftaran, Kami
            juga dapat menerima data teknis seperti alamat IP untuk keamanan.
          </p>
          <p>
            <span className="lead-in">Dasar pemrosesan.</span> Pelaksanaan
            perjanjian (untuk menyediakan Layanan yang Anda minta) dan/atau
            persetujuan Anda saat mendaftar.
          </p>
          <p>
            <span className="lead-in">Pihak Ketiga.</span> <b>Supabase</b> —
            penyimpanan data akun/waitlist (server di Singapura,{" "}
            <code>ap-southeast-1</code>); <b>Resend</b> — pengiriman surel
            pendaftaran/notifikasi.
          </p>
          <p>
            <span className="lead-in">Penyimpanan.</span> Data pendaftaran
            disimpan selama Anda menjadi pengguna aktif. Data waitlist yang tidak
            menjadi akun dapat dihapus setelah 1 bulan.
          </p>

          <h2>4. Saat Anda Menggunakan Layanan (via WhatsApp)</h2>
          <p>
            <span className="lead-in">Ringkasan.</span> Saat Anda menggunakan
            Sosmed AI melalui WhatsApp — baik sebagai pemilik usaha maupun
            pelanggan dari usaha tersebut — Kami memproses data percakapan dan
            order untuk menjalankan fungsi Layanan.
          </p>
          <p>
            <span className="lead-in">Tujuan.</span> Menyediakan fitur inti
            Layanan (menerima &amp; memproses order, mengelola menu, sistem poin,
            laporan); memantau dan meningkatkan Layanan; dukungan pengguna; dan
            keamanan.
          </p>
          <p>
            <span className="lead-in">Data yang dikumpulkan.</span>
          </p>
          <ul>
            <li>
              <b>Data percakapan WhatsApp</b> — pesan, nomor WhatsApp, dan isi
              order yang Anda kirim atau terima melalui Layanan.
            </li>
            <li>
              <b>Data order &amp; usaha</b> — item menu, harga, status pesanan,
              serta data poin/member yang dimasukkan ke sistem.
            </li>
            <li>
              <b>Data penggunaan</b> — log aktivitas dan kesalahan untuk menjaga
              keandalan Layanan.
            </li>
          </ul>
          <p>
            <span className="lead-in">Dasar pemrosesan.</span> Sebagian besar
            pemrosesan diperlukan untuk pelaksanaan perjanjian Layanan dengan
            Anda; sebagian lain berdasarkan kepentingan sah Kami untuk menjaga
            fungsi, keamanan, dan kegunaan Layanan.
          </p>
          <p>
            <span className="lead-in">Pihak Ketiga.</span>
          </p>
          <ul>
            <li>
              <b>360dialog (Meta Business Partner)</b> — pengiriman dan
              penerimaan pesan melalui WhatsApp Business Platform.
            </li>
            <li>
              <b>Supabase</b> — penyimpanan data order, menu, member, dan
              percakapan.
            </li>
            <li>
              <b>Penyedia model AI</b> — OpenAI, Anthropic, Google Gemini, dan
              DeepSeek, untuk memahami maksud pesan dan menyusun balasan. Isi
              pesan dapat dikirim ke salah satu penyedia ini untuk diproses.
            </li>
          </ul>
          <p>
            <span className="lead-in">Penyimpanan.</span> Data yang Anda buat
            dalam Layanan disimpan hingga Anda menghapusnya atau meminta
            penghapusan akun. Setelah dihapus, data dapat tertinggal sementara di
            cadangan (backup) sebelum dimusnahkan sepenuhnya.
          </p>

          <h2>5. Saat Anda Menerima Komunikasi atau Menghubungi Kami</h2>
          <p>
            <span className="lead-in">Ringkasan.</span> Jika Anda berlangganan
            info atau menghubungi Kami, Kami menggunakan informasi yang Anda
            berikan untuk merespons dan mengirim pembaruan yang relevan. Anda
            dapat berhenti berlangganan kapan saja.
          </p>
          <p>
            <span className="lead-in">Data yang dikumpulkan.</span> Nama, nomor
            WhatsApp, alamat surel, dan isi pesan yang Anda kirim kepada Kami.
          </p>
          <p>
            <span className="lead-in">Dasar pemrosesan.</span> Persetujuan (untuk
            komunikasi pemasaran) atau pelaksanaan perjanjian (untuk komunikasi
            terkait Layanan dan dukungan).
          </p>
          <p>
            <span className="lead-in">Pihak Ketiga.</span> Kami tidak menggunakan
            alat CRM atau sistem dukungan Pihak Ketiga untuk komunikasi ini.
            Pesan Anda ditangani langsung melalui surel Kami di hello@sosmed.io.
          </p>

          <h2>6. Saat Anda Melakukan Pembayaran</h2>
          <p>
            <span className="lead-in">Ringkasan.</span> Untuk paket berbayar,
            Kami memproses informasi penagihan yang diperlukan. Kami tidak
            menyimpan detail kartu Anda — pembayaran ditangani oleh penyedia
            pembayaran yang aman.
          </p>
          <p>
            <span className="lead-in">Data yang dikumpulkan.</span> Informasi
            penagihan seperti nama, kontak, dan detail transaksi. Detail
            pembayaran sensitif dikumpulkan langsung oleh penyedia pembayaran;
            Kami hanya menerima referensi/token transaksi.
          </p>
          <p>
            <span className="lead-in">Dasar pemrosesan.</span> Pelaksanaan
            perjanjian (untuk memproses pembayaran) dan kewajiban hukum (untuk
            menyimpan catatan keuangan).
          </p>
          <p>
            <span className="lead-in">Pihak Ketiga.</span> <b>Xendit</b> —
            pemrosesan pembayaran lokal Indonesia (mis. QRIS dan transfer/virtual
            account).
          </p>
          <p>
            <span className="lead-in">Penyimpanan.</span> Kami tidak menyimpan
            nomor kartu lengkap. Catatan keuangan disimpan minimal selama periode
            yang diwajibkan peraturan perpajakan Indonesia.
          </p>

          <h2>7. Pengungkapan kepada Pihak Lain</h2>
          <p>
            Kami <b>tidak akan menjual atau menyewakan</b> Data Pribadi Anda
            kepada pihak mana pun. Kami hanya membagikan Data Pribadi kepada
            Pihak Ketiga yang mendukung penyelenggaraan Layanan (sebagaimana
            disebutkan di atas), atau apabila diwajibkan oleh Hukum yang Berlaku,
            perintah otoritas yang berwenang, atau putusan pengadilan.
          </p>

          <h2>8. Transfer ke Luar Negeri</h2>
          <p>
            Sebagian Layanan yang Kami gunakan memproses sebagian data Anda di
            luar Indonesia — termasuk penyedia model AI (OpenAI, Anthropic,
            Google Gemini, dan DeepSeek) serta infrastruktur cloud (Supabase di
            Singapura). Untuk setiap transfer data ke luar wilayah Indonesia,
            Kami menerapkan upaya perlindungan yang memadai sesuai dengan
            ketentuan UU PDP.
          </p>

          <h2>9. Hak Anda sebagai Subjek Data Pribadi</h2>
          <p>
            Berdasarkan UU PDP, Anda berhak untuk mengakses dan memperoleh
            salinan Data Pribadi Anda, memperbaiki data yang tidak akurat,
            menghapus Data Pribadi, menarik persetujuan, membatasi atau menolak
            pemrosesan tertentu, serta mengajukan keberatan. Untuk menggunakan
            hak-hak ini, cukup kirim surel ke support@sosmed.io dan Kami akan
            menindaklanjutinya dalam waktu yang wajar sesuai ketentuan yang
            berlaku.
          </p>

          <h2>10. Informasi Tambahan</h2>
          <p>
            <span className="lead-in">Keamanan data.</span> Kami menerapkan
            langkah teknis dan organisasi untuk melindungi Data Pribadi Anda,
            termasuk enkripsi saat transit (HTTPS) dan pembatasan akses ke Data
            Pribadi hanya kepada pihak yang berkepentingan.
          </p>
          <p>
            <span className="lead-in">Data anak.</span> Layanan Kami tidak
            ditujukan untuk anak di bawah umur. Kami tidak dengan sengaja
            mengumpulkan Data Pribadi anak; jika Kami mengetahui hal ini terjadi,
            Kami akan menghapusnya.
          </p>
          <p>
            <span className="lead-in">Perubahan Kebijakan.</span> Kami dapat
            memperbarui Kebijakan ini dari waktu ke waktu. Untuk perubahan
            signifikan, Kami akan memberi tahu melalui situs atau surel. Tanggal
            di atas menunjukkan revisi terbaru.
          </p>
          <p>
            <span className="lead-in">Bahasa.</span> Apabila Kebijakan ini
            disediakan dalam lebih dari satu bahasa dan terdapat ketidaksesuaian,
            maka teks Bahasa Indonesia yang berlaku.
          </p>

          <h2>11. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan ini atau cara Sosmed
            AI menangani Data Pribadi Anda, silakan hubungi Kami di
            support@sosmed.io. Terima kasih telah membaca — kepercayaan Anda
            penting bagi Kami.
          </p>

          <div className="footer-legal">
            <Link href="/">← Kembali ke beranda</Link> &nbsp;·&nbsp;{" "}
            <Link href="/syarat">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
