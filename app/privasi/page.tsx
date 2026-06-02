import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Kebijakan Privasi",
    description:
      "Kebijakan Privasi Sosmed AI: bagaimana kami memproses data pribadi sesuai UU No. 27 Tahun 2022 (UU PDP) — tujuan, data, dasar pemrosesan, prosesor, dan hak Anda.",
    path: "/privasi",
  }),
  // Render the exact title from the reference (bypass the "%s | Sosmed AI" template).
  title: { absolute: "Kebijakan Privasi — Sosmed AI" },
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

          <div className="intro">
            <strong>Pengendali Data &amp; Kontak:</strong> Kebijakan Privasi ini
            diterbitkan oleh PT Beneran Hype Terus (&quot;Sosmed AI&quot;,
            &quot;kami&quot;), beralamat di Jakarta Selatan, DKI Jakarta,
            Indonesia. Untuk pertanyaan terkait privasi, Anda dapat menghubungi
            kami di support@sosmed.io. Kami menghargai privasi Anda dan
            berkomitmen menggunakan data hanya sebatas yang diperlukan untuk
            menyediakan dan meningkatkan layanan, sesuai dengan Undang-Undang
            No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (&quot;UU
            PDP&quot;).
          </div>
          <div className="intro">
            <strong>Ruang Lingkup:</strong> Kebijakan ini menjelaskan bagaimana
            kami memproses data pribadi dalam berbagai situasi: saat Anda
            mengunjungi situs kami, mendaftar, menggunakan layanan, menerima
            komunikasi dari kami, atau melakukan pembayaran. Untuk setiap
            situasi, kami menjelaskan data apa yang digunakan, untuk tujuan apa,
            dasar pemrosesannya, pihak penyedia layanan (prosesor) yang kami
            libatkan, serta hak-hak Anda sebagai pemilik data pribadi
            berdasarkan UU PDP.
          </div>

          {/* 1 */}
          <h2>
            <span className="n">(1)</span>Saat Anda Mengunjungi Situs Kami
          </h2>
          <div className="blk">
            <span className="lbl">Ringkasan</span>
            <p>
              Kami menggunakan situs untuk memberi informasi tentang Sosmed AI.
              Kami meminimalkan data pribadi dalam proses ini. Situs di-hosting
              oleh Vercel, dan analitik pengunjung situs hanya diaktifkan sesuai
              persetujuan Anda.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Tujuan</span>
            <p>
              Memuat situs untuk Anda serta menjaga keamanan dan performanya.
              Dengan persetujuan Anda, kami juga mengumpulkan data analitik (mis.
              kunjungan halaman) untuk memahami penggunaan situs dan
              meningkatkan konten.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Data yang Dikumpulkan</span>
            <p>
              Saat Anda berkunjung, kami (atau alat analitik kami) dapat
              mengumpulkan informasi seperti alamat IP, jenis/versi peramban,
              dan situs perujuk. Cookie esensial hanya digunakan agar situs
              berfungsi. Untuk analitik, identifier hanya digunakan jika Anda
              menyetujuinya.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Dasar Pemrosesan</span>
            <p>
              Pengiriman situs didasarkan pada kepentingan sah kami untuk
              menyediakan situs yang aman dan berfungsi. Untuk analitik, kami
              mengandalkan persetujuan Anda (Pasal 20 UU PDP).
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Prosesor</span>
            <ul>
              <li>
                <b>Vercel</b> — hosting situs dan analitik pengunjung situs
                (Vercel Analytics).
              </li>
              <li>
                <b>Google Analytics</b> — memahami penggunaan situs secara
                agregat.
              </li>
            </ul>
            <p style={{ marginTop: "8px" }}>
              Analitik ini hanya mengukur kunjungan dan penggunaan{" "}
              <b>situs web</b> secara umum (mis. halaman yang dibuka), bukan data
              pribadi atau data order pelanggan yang diproses melalui layanan
              WhatsApp (lihat bagian 3).
            </p>
          </div>

          {/* 2 */}
          <h2>
            <span className="n">(2)</span>Saat Anda Mendaftar (Waitlist / Akun)
          </h2>
          <div className="blk">
            <span className="lbl">Ringkasan</span>
            <p>
              Saat Anda mendaftar ke waitlist atau membuat akun, kami
              mengumpulkan informasi yang diperlukan untuk membuat dan mengelola
              pendaftaran Anda.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Tujuan</span>
            <p>
              Membuat dan mengelola pendaftaran/akun Anda, serta menghubungi
              Anda terkait peluncuran layanan.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Data yang Dikumpulkan</span>
            <p>
              Umumnya nama usaha, nomor WhatsApp, dan/atau alamat email. Saat
              pendaftaran, kami juga dapat menerima data teknis seperti alamat
              IP untuk keamanan.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Dasar Pemrosesan</span>
            <p>
              Pelaksanaan perjanjian (untuk menyediakan layanan yang Anda minta)
              dan/atau persetujuan Anda saat mendaftar.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Prosesor</span>
            <ul>
              <li>
                <b>Supabase</b> — penyimpanan data akun/waitlist (server di
                Singapura, <code>ap-southeast-1</code>).
              </li>
              <li>
                <b>Resend</b> — pengiriman email pendaftaran/notifikasi.
              </li>
            </ul>
          </div>
          <div className="blk">
            <span className="lbl">Penyimpanan</span>
            <p>
              Data pendaftaran disimpan selama Anda menjadi pengguna aktif. Data
              waitlist yang tidak menjadi akun dapat dihapus setelah 1 bulan.
            </p>
          </div>

          {/* 3 */}
          <h2>
            <span className="n">(3)</span>Saat Anda Menggunakan Layanan (via
            WhatsApp)
          </h2>
          <div className="blk">
            <span className="lbl">Ringkasan</span>
            <p>
              Saat Anda menggunakan Sosmed AI melalui WhatsApp — baik sebagai
              pemilik usaha maupun sebagai pelanggan dari usaha tersebut — kami
              memproses data percakapan dan order untuk menjalankan fungsi
              layanan.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Tujuan</span>
            <p>
              (A) Menyediakan fitur inti layanan (menerima &amp; memproses
              order, mengelola menu, sistem poin, laporan); (B) memantau dan
              meningkatkan layanan; (C) dukungan pengguna; dan (D) keamanan.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Data yang Dikumpulkan</span>
            <ul>
              <li>
                <b>Data percakapan WhatsApp</b> — pesan, nomor WhatsApp, dan isi
                order yang Anda kirim atau terima melalui layanan.
              </li>
              <li>
                <b>Data order &amp; usaha</b> — item menu, harga, status
                pesanan, dan data poin/member yang dimasukkan ke dalam sistem.
              </li>
              <li>
                <b>Data penggunaan</b> — log aktivitas dan kesalahan untuk
                menjaga keandalan layanan.
              </li>
            </ul>
          </div>
          <div className="blk">
            <span className="lbl">Dasar Pemrosesan</span>
            <p>
              Sebagian besar pemrosesan diperlukan untuk pelaksanaan perjanjian
              layanan dengan Anda; sebagian lain berdasarkan kepentingan sah
              kami untuk menjaga fungsi, keamanan, dan kegunaan produk.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Prosesor</span>
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
                <b>Penyedia model AI (LLM)</b> — OpenAI, Anthropic, Google
                Gemini, dan DeepSeek, untuk memahami maksud pesan dan menyusun
                balasan. Isi pesan dapat dikirim ke salah satu penyedia ini
                untuk diproses.
              </li>
            </ul>
          </div>
          <div className="blk">
            <span className="lbl">Penyimpanan</span>
            <p>
              Data yang Anda buat dalam layanan disimpan hingga Anda
              menghapusnya atau meminta penghapusan akun. Setelah dihapus, data
              dapat tertinggal sementara di cadangan (backup) sebelum dimusnahkan
              sepenuhnya.
            </p>
          </div>

          {/* 4 */}
          <h2>
            <span className="n">(4)</span>Saat Anda Menerima Komunikasi atau
            Menghubungi Kami
          </h2>
          <div className="blk">
            <span className="lbl">Ringkasan</span>
            <p>
              Jika Anda berlangganan info atau menghubungi kami, kami
              menggunakan informasi yang Anda berikan untuk merespons dan
              mengirim pembaruan yang relevan. Anda dapat berhenti berlangganan
              kapan saja.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Tujuan</span>
            <p>
              Memberikan informasi dan layanan yang Anda minta, serta mengirim
              pembaruan produk yang relevan.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Data yang Dikumpulkan</span>
            <p>
              Nama, nomor WhatsApp, alamat email, dan isi pesan yang Anda kirim
              kepada kami.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Dasar Pemrosesan</span>
            <p>
              Persetujuan (untuk komunikasi pemasaran) atau pelaksanaan
              perjanjian (untuk komunikasi terkait layanan dan dukungan).
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Prosesor</span>
            <p>
              Kami tidak menggunakan alat CRM atau sistem dukungan pihak ketiga
              untuk komunikasi ini. Pesan Anda ditangani langsung melalui email
              kami di hello@sosmed.io.
            </p>
          </div>

          {/* 5 */}
          <h2>
            <span className="n">(5)</span>Saat Anda Melakukan Pembayaran
          </h2>
          <div className="blk">
            <span className="lbl">Ringkasan</span>
            <p>
              Untuk paket berbayar, kami memproses informasi penagihan yang
              diperlukan. Kami tidak menyimpan detail kartu Anda — pembayaran
              ditangani oleh penyedia pembayaran yang aman.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Tujuan</span>
            <p>
              Menagih biaya layanan dan mengelola penagihan, serta menyimpan
              riwayat transaksi untuk keperluan akuntansi dan pajak.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Data yang Dikumpulkan</span>
            <p>
              Informasi penagihan seperti nama, kontak, dan detail transaksi.
              Detail pembayaran sensitif dikumpulkan langsung oleh penyedia
              pembayaran; kami hanya menerima referensi/token transaksi.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Dasar Pemrosesan</span>
            <p>
              Pelaksanaan perjanjian (untuk memproses pembayaran) dan kewajiban
              hukum (untuk menyimpan catatan keuangan).
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Prosesor</span>
            <ul>
              <li>
                <b>Xendit</b> — pemrosesan pembayaran lokal Indonesia (mis. QRIS
                dan transfer/virtual account).
              </li>
            </ul>
          </div>
          <div className="blk">
            <span className="lbl">Penyimpanan</span>
            <p>
              Kami tidak menyimpan nomor kartu lengkap. Catatan keuangan
              disimpan minimal selama periode yang diwajibkan peraturan
              perpajakan Indonesia.
            </p>
          </div>

          {/* 6 */}
          <h2>
            <span className="n">(6)</span>Transfer ke Luar Negeri
          </h2>
          <div className="blk">
            <p>
              Sebagian layanan yang kami gunakan memproses sebagian data Anda di
              luar Indonesia — termasuk penyedia model AI (OpenAI, Anthropic,
              Google Gemini, dan DeepSeek) serta infrastruktur cloud (Supabase
              di Singapura). Untuk setiap transfer data ke luar wilayah
              Indonesia, kami menerapkan upaya perlindungan yang memadai sesuai
              dengan ketentuan UU PDP.
            </p>
          </div>

          {/* 7 */}
          <h2>
            <span className="n">(7)</span>Hak Anda sebagai Pemilik Data Pribadi
          </h2>
          <div className="blk">
            <p>
              Berdasarkan UU PDP, Anda berhak untuk: mengakses dan memperoleh
              salinan data pribadi Anda; memperbaiki data yang tidak akurat;
              menghapus data pribadi; menarik persetujuan; membatasi atau
              menolak pemrosesan tertentu; serta mengajukan keberatan. Untuk
              menggunakan hak-hak ini, cukup kirim email ke support@sosmed.io
              dan kami akan menindaklanjutinya. Kami akan merespons permintaan
              Anda dalam waktu yang wajar sesuai ketentuan yang berlaku.
            </p>
          </div>

          {/* 8 */}
          <h2>
            <span className="n">(8)</span>Informasi Tambahan
          </h2>
          <div className="blk">
            <span className="lbl">Keamanan Data</span>
            <p>
              Kami menerapkan langkah teknis dan organisasi untuk melindungi
              data pribadi Anda, termasuk enkripsi saat transit (HTTPS) dan
              pembatasan akses ke data pribadi hanya kepada pihak yang
              berkepentingan.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Penerima Lain</span>
            <p>
              Kami tidak membagikan data Anda kepada pihak di luar perusahaan
              kecuali kepada prosesor kami, atau jika diwajibkan oleh hukum.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Data Anak</span>
            <p>
              Layanan kami tidak ditujukan untuk anak di bawah umur. Kami tidak
              dengan sengaja mengumpulkan data pribadi anak. Jika kami mengetahui
              hal ini terjadi, kami akan menghapusnya.
            </p>
          </div>
          <div className="blk">
            <span className="lbl">Perubahan Kebijakan</span>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
              Untuk perubahan signifikan, kami akan memberi tahu melalui situs
              atau email. Tanggal &quot;Terakhir diperbarui&quot; di atas
              menunjukkan revisi terbaru.
            </p>
          </div>

          {/* 9 */}
          <h2>
            <span className="n">(9)</span>Hubungi Kami
          </h2>
          <div className="blk">
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau
              cara Sosmed AI menangani data Anda, silakan hubungi kami di
              support@sosmed.io. Terima kasih telah membaca — kepercayaan Anda
              penting bagi kami.
            </p>
          </div>

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
