import type { ReactNode } from "react";

/**
 * Blog article content map (slug -> Article). All articles share one layout
 * (rendered by app/blog/[slug]/page.tsx). Content is sample/illustrative -
 * "2 Juni 2026" publish date (datePublished), "Tim Sosmed AI" byline;
 * sales-summary numbers keep their "sampel, bukan data nyata" caption. Blog
 * pages are indexable and listed in the sitemap.
 */

export type ArticleSection = {
  id: string;
  heading: string;
  toc: string;
  body: ReactNode;
};

export type RelatedCard = {
  slug: string;
  g: string;
  tag: string;
  title: string;
  excerpt: string;
};

/** A question + its plain-text answer, mirrored on-page (short-answer/section
 *  text). Emitted as FAQPage JSON-LD for AEO/GEO answer engines. */
export type FaqItem = {
  q: string;
  a: string;
};

export type Article = {
  title: string;
  category: string;
  readTime: string;
  datePublished: string; // ISO date, e.g. "2026-06-02"
  coverTitle: string;
  description: string;
  lede: ReactNode;
  tldr: string[];
  sections: ArticleSection[];
  related: RelatedCard[];
  /** Topical keywords for BlogPosting.keywords (SEO/GEO). Optional. */
  keywords?: string[];
  /** Q&A pairs (grounded in on-page text) → FAQPage schema (AEO). Optional. */
  faq?: FaqItem[];
};

/* ----- shared illustrative mockups (styled HTML/CSS, not images) ----- */

function Figure({ cap, children }: { cap: string; children: ReactNode }) {
  return (
    <figure className="figure">
      <div className="frame">{children}</div>
      <figcaption className="fig-cap">{cap}</figcaption>
    </figure>
  );
}

function WaChat({
  head = false,
  msgs,
}: {
  head?: boolean;
  msgs: { side: "in" | "out"; text: string }[];
}) {
  return (
    <div className="wa">
      {head && (
        <div className="wahead">
          <div className="waav">K</div>
          <div>
            <div className="waname">Kopi Kita</div>
            <div className="wastatus">● online</div>
          </div>
        </div>
      )}
      {msgs.map((m, i) => (
        <div className={`b ${m.side}`} key={i}>
          {m.text}
        </div>
      ))}
    </div>
  );
}

function MenuMockup() {
  return (
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
  );
}

function PointsMockup() {
  return (
    <div className="points">
      <div className="pv">284 poin</div>
      <div className="pl">16 poin lagi menuju voucher Rp 5.000</div>
      <div className="dots">
        <span className="pdot f"></span>
        <span className="pdot f"></span>
        <span className="pdot f"></span>
        <span className="pdot f"></span>
        <span className="pdot"></span>
      </div>
    </div>
  );
}

function SummMockup() {
  return (
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
  );
}

function ComingSoonBand() {
  return (
    <div className="cta-band">
      <h3>Segera Hadir</h3>
      <p>
        Sosmed AI sedang kami siapkan untuk pemilik warung, kafe, dan restoran
        kecil di Indonesia. Nantikan peluncurannya.
      </p>
    </div>
  );
}

function AiNativeNote() {
  return (
    <div className="callout">
      <b>Catatan penting:</b> Sosmed AI bukan chatbot skrip yang kaku. Sosmed AI
      dirancang AI-native di WhatsApp, sehingga pelanggan tetap mengobrol seperti
      biasa, sementara order, pelanggan, poin, dan laporan dirapikan di belakang
      layar.
    </div>
  );
}

type TodayArticleInput = {
  slug: string;
  /** ISO publish date, e.g. "2026-07-18". Required so each daily batch carries
   *  its real date - the hero and BlogPosting schema both derive from it. */
  datePublished: string;
  title: string;
  category: string;
  coverTitle: string;
  description: string;
  problem: string;
  answer: string;
  diagnosis: string;
  actions: string[];
  measure: string;
  keywords: string[];
  related: RelatedCard[];
};

/**
 * A consistent, answer-engine-friendly structure for the "owner reality"
 * series. The variable copy keeps each article focused on one real business
 * problem while the sections give readers a usable diagnosis → action loop.
 */
function createTodayArticle(input: TodayArticleInput): Article {
  return {
    title: input.title,
    category: input.category,
    readTime: "7 menit baca",
    datePublished: input.datePublished,
    coverTitle: input.coverTitle,
    description: input.description,
    lede: <>{input.problem}</>,
    keywords: input.keywords,
    faq: [
      { q: `Apa inti masalah "${input.coverTitle.replace(/[?.!]+$/, "")}"?`, a: input.answer },
      { q: "Apa langkah pertama yang sebaiknya dilakukan?", a: input.actions[0] },
      { q: "Bagaimana cara mengukur perbaikannya?", a: input.measure },
    ],
    tldr: [
      input.answer,
      `Mulai dari pola yang bisa dibuktikan: ${input.diagnosis}`,
      `Tindakan pertama: ${input.actions[0]}`,
      `Ukuran keberhasilan: ${input.measure}`,
      "Sosmed AI bukan chatbot skrip; pendekatannya AI-native di WhatsApp agar konteks chat dapat menjadi tindakan bisnis.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Jawaban singkat",
        toc: "Jawaban singkat",
        body: <p>{input.answer}</p>,
      },
      {
        id: "lihat-polanya",
        heading: "Lihat polanya sebelum menambah kerja",
        toc: "Lihat polanya",
        body: (
          <>
            <p>{input.diagnosis}</p>
            <p>
              Jangan langsung menyalahkan tim atau menambah promo. Ambil contoh
              order, chat, atau kejadian dari tujuh hari terakhir. Saat pola sudah
              terlihat, perbaikannya menjadi lebih kecil, lebih murah, dan lebih mudah diulang.
            </p>
          </>
        ),
      },
      {
        id: "langkah-praktis",
        heading: "Langkah praktis yang bisa dimulai minggu ini",
        toc: "Langkah praktis",
        body: (
          <ol>
            {input.actions.map((action) => <li key={action}>{action}</li>)}
          </ol>
        ),
      },
      {
        id: "ukur-dampak",
        heading: "Ukuran keberhasilan yang perlu dipantau",
        toc: "Ukur dampak",
        body: (
          <>
            <p>{input.measure}</p>
            <p>
              Bandingkan angka ini dengan minggu sebelumnya, bukan hanya dengan
              satu hari yang kebetulan ramai. Catat juga alasan perubahan agar
              keputusan berikutnya tidak kembali bergantung pada ingatan.
            </p>
          </>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Bagaimana Sosmed AI membantu",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI sedang dirancang untuk membantu pemilik F&amp;B kecil
              menghubungkan chat WhatsApp dengan order, pelanggan, poin, dan
              ringkasan bisnis. Tujuannya bukan membuat Anda menambah dashboard,
              tetapi mengurangi kerja manual dan membuat tindakan penting lebih terlihat.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: input.related,
  };
}

const TODAY_ARTICLES: Record<string, Article> = {
  "sop-serah-terima-shift-warung-kafe": {
    title: "Cara Membuat SOP Serah Terima Shift Warung dan Kafe agar Tidak Ada Tugas Terlewat",
    category: "Panduan",
    readTime: "8 menit baca",
    datePublished: "2026-07-21",
    coverTitle: "Serah Terima Shift Tanpa Informasi Hilang",
    description:
      "Panduan membuat SOP serah terima shift warung dan kafe dengan checklist pesanan, pembayaran, stok, pelanggan, dan tindak lanjut yang jelas.",
    lede: (
      <>
        SOP serah terima shift yang efektif bukan laporan panjang. Tim cukup
        memindahkan lima konteks yang masih aktif—pesanan, pembayaran, persediaan,
        pelanggan, dan pekerjaan lanjutan—ke satu catatan yang dibaca ulang oleh
        shift berikutnya sebelum staf lama pulang.
      </>
    ),
    keywords: [
      "SOP serah terima shift",
      "checklist shift restoran",
      "pergantian shift kasir",
      "operasional warung dan kafe",
      "handover karyawan F&B",
    ],
    faq: [
      {
        q: "Apa saja yang harus masuk dalam serah terima shift warung atau kafe?",
        a: "Catat lima hal yang masih membutuhkan konteks atau tindakan: pesanan aktif, pembayaran yang belum tuntas, persediaan kritis, pelanggan yang perlu ditindaklanjuti, dan pekerjaan lanjutan beserta penanggung jawabnya.",
      },
      {
        q: "Bagaimana membuat serah terima shift yang singkat tetapi lengkap?",
        a: "Gunakan satu template tetap, tulis hanya pengecualian dan pekerjaan aktif, tetapkan batas waktu pencatatan, lalu minta staf shift berikutnya membaca ulang prioritas sebelum menerima tanggung jawab.",
      },
      {
        q: "Bagaimana mengukur apakah SOP pergantian shift bekerja?",
        a: "Pantau tugas yang terlewat setelah pergantian shift, pertanyaan ulang ke staf lama, selisih pembayaran, stok kosong yang tidak diinformasikan, dan waktu yang dibutuhkan untuk menyelesaikan handover.",
      },
    ],
    tldr: [
      "Serahkan lima konteks aktif: pesanan, pembayaran, persediaan, pelanggan, dan pekerjaan lanjutan.",
      "Gunakan satu catatan aktif; jangan menyebarkan handover di chat pribadi, kertas, dan ingatan staf.",
      "Setiap pengecualian harus memiliki status, tindakan berikutnya, penanggung jawab, dan batas waktu.",
      "Shift penerima perlu membaca ulang prioritas agar tanggung jawab benar-benar berpindah.",
      "Ukur tugas terlewat dan pertanyaan ulang, bukan hanya apakah formulir sudah diisi.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Bagaimana membuat SOP serah terima shift warung dan kafe?",
        toc: "Jawaban singkat",
        body: (
          <>
            <p>
              Gunakan satu template tetap untuk mencatat lima konteks yang masih
              aktif: pesanan, pembayaran, persediaan, pelanggan, dan pekerjaan
              lanjutan. Tulis hanya hal yang berbeda dari kondisi normal dan perlu
              diketahui shift berikutnya.
            </p>
            <p>
              Handover selesai setelah staf penerima membaca ulang prioritas,
              memahami tindakan berikutnya, dan menerima tanggung jawab. Mengirim
              pesan ke grup saja belum berarti informasi sudah diterima.
            </p>
          </>
        ),
      },
      {
        id: "lima-konteks",
        heading: "Apa saja yang harus masuk dalam checklist pergantian shift?",
        toc: "Lima konteks wajib",
        body: (
          <ol>
            <li><b>Pesanan aktif:</b> kode order, janji waktu, perubahan terakhir, dan status dapur atau pickup.</li>
            <li><b>Pembayaran:</b> transaksi yang belum cocok, refund, void, kas bon, atau selisih yang masih diperiksa.</li>
            <li><b>Persediaan:</b> bahan kritis, menu yang harus disembunyikan, barang datang, dan penyimpanan yang perlu dicek.</li>
            <li><b>Pelanggan:</b> komplain terbuka, permintaan khusus, atau janji follow-up yang belum selesai.</li>
            <li><b>Pekerjaan lanjutan:</b> satu tindakan berikutnya, satu penanggung jawab, dan batas waktu yang jelas.</li>
          </ol>
        ),
      },
      {
        id: "format-ringkas",
        heading: "Bagaimana membuat serah terima shift yang singkat tetapi lengkap?",
        toc: "Format handover ringkas",
        body: (
          <>
            <p>
              Gunakan satu template tetap, tulis hanya pengecualian dan pekerjaan
              aktif, tetapkan batas waktu pencatatan, lalu minta staf shift berikutnya
              membaca ulang prioritas sebelum menerima tanggung jawab.
            </p>
            <div className="callout">
              <b>Format satu baris:</b> W-1127 · pickup 18.30 · 2 ayam geprek
              tidak pedas · QRIS terverifikasi · sedang dimasak · Rani memberi
              kabar jika lewat 18.20.
            </div>
            <p>
              Satu baris itu menjawab empat pertanyaan: apa yang terjadi, statusnya
              sekarang, apa tindakan berikutnya, dan siapa yang bertanggung jawab.
              Riwayat lengkap tetap dapat dibuka jika dibutuhkan, tetapi handover
              tidak perlu menyalin seluruh percakapan.
            </p>
          </>
        ),
      },
      {
        id: "alur-empat-langkah",
        heading: "Seperti apa alur pergantian shift yang tidak bergantung pada ingatan?",
        toc: "Alur empat langkah",
        body: (
          <ol>
            <li>Tetapkan waktu cut-off agar staf lama memperbarui semua status sebelum pergantian.</li>
            <li>Catat pengecualian di satu sumber yang dapat dilihat kasir, dapur, dan penanggung jawab shift.</li>
            <li>Staf penerima membaca ulang pesanan prioritas, masalah pembayaran, stok kritis, dan janji pelanggan.</li>
            <li>Setelah tanggung jawab diterima, semua pembaruan berikutnya masuk ke catatan yang sama.</li>
          </ol>
        ),
      },
      {
        id: "kesalahan-umum",
        heading: "Kesalahan apa yang membuat informasi tetap hilang?",
        toc: "Kesalahan umum",
        body: (
          <>
            <p>
              Masalah paling umum adalah mencatat tanpa menentukan pemilik tugas,
              memakai tiga tempat sekaligus, dan menganggap status “sudah dikabari”
              sebagai status operasional. Kalimat seperti “tolong dicek nanti” tidak
              menjelaskan apa yang perlu dicek, siapa yang mengecek, atau kapan selesai.
            </p>
            <p>
              Jika order dan pekerjaan sering tercecer sebelum pergantian shift,
              rapikan dulu sumber informasinya melalui panduan
              <a href="/blog/cara-mengurangi-chaos-operasional-warung-kafe"> mengurangi chaos operasional warung dan kafe</a>.
              Untuk transaksi yang belum jelas, gunakan alur
              <a href="/blog/mencocokkan-pembayaran-qris-dengan-order-whatsapp"> pencocokan QRIS dengan order WhatsApp</a>.
            </p>
          </>
        ),
      },
      {
        id: "ukur-handover",
        heading: "Bagaimana mengukur apakah SOP pergantian shift bekerja?",
        toc: "Ukur hasil handover",
        body: (
          <p>
            Pantau tugas yang terlewat setelah pergantian shift, pertanyaan ulang
            ke staf lama, selisih pembayaran, stok kosong yang tidak diinformasikan,
            dan waktu yang dibutuhkan untuk menyelesaikan handover. Formulir yang
            selalu terisi belum tentu berguna jika masalah yang sama tetap berulang.
          </p>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Bagaimana Sosmed AI membantu menjaga konteks antarshift?",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI sedang dirancang agar chat pelanggan, versi order aktif,
              status pembayaran, catatan pelanggan, dan tindakan lanjutan terlihat
              dalam satu konteks. Shift berikutnya dapat memahami apa yang masih
              terbuka tanpa menyisir percakapan panjang atau menghubungi staf yang pulang.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "cara-mengurangi-chaos-operasional-warung-kafe", g: "g6", tag: "Tips Bisnis", title: "Cara Mengurangi Chaos Operasional", excerpt: "Bangun satu alur kerja yang dapat dilihat seluruh tim." },
      { slug: "warung-tetap-jalan-saat-pemilik-libur", g: "g6", tag: "Tips Bisnis", title: "Warung Tetap Jalan Saat Pemilik Libur", excerpt: "Uji apakah sistem tetap bekerja tanpa pemilik." },
      { slug: "mencocokkan-pembayaran-qris-dengan-order-whatsapp", g: "g4", tag: "Panduan", title: "Mencocokkan QRIS dengan Order WhatsApp", excerpt: "Pastikan pembayaran dan order tidak tertukar antarshift." },
    ],
  },
  "cara-mengurangi-food-waste-warung-kafe": {
    title: "Bahan Sudah Dibeli, tapi Tidak Terjual? Cara Mengurangi Food Waste Warung dan Kafe",
    category: "Tips Bisnis",
    readTime: "8 menit baca",
    datePublished: "2026-07-21",
    coverTitle: "Kurangi Food Waste dari Pola Order",
    description:
      "Cara mengurangi food waste warung dan kafe dengan jurnal sisa bahan, klasifikasi penyebab, keputusan produksi, dan pengukuran biaya yang praktis.",
    lede: (
      <>
        Food waste tidak cukup diatasi dengan pesan “jangan membuang makanan”.
        Warung dan kafe perlu mencatat bahan apa yang terbuang, pada tahap mana,
        karena alasan apa, dan keputusan apa yang harus berubah pada pembelian,
        persiapan, porsi, atau penjualan berikutnya.
      </>
    ),
    keywords: [
      "cara mengurangi food waste",
      "food waste restoran",
      "bahan makanan terbuang",
      "jurnal waste dapur",
      "mengurangi pemborosan warung",
    ],
    faq: [
      {
        q: "Bagaimana cara mengurangi food waste di warung atau kafe?",
        a: "Mulai dengan jurnal sisa pangan selama tujuh hari: catat bahan atau menu, jumlah atau nilai perkiraan, tahap terbuang, penyebab, dan tindakan berikutnya; lalu perbaiki satu penyebab terbesar terlebih dahulu.",
      },
      {
        q: "Apa saja jenis food waste yang perlu dipisahkan?",
        a: "Pisahkan waste saat penyimpanan, persiapan, produksi berlebih, kesalahan order atau remake, dan sisa pelanggan karena setiap jenis membutuhkan keputusan perbaikan yang berbeda.",
      },
      {
        q: "Metrik food waste apa yang berguna untuk usaha F&B kecil?",
        a: "Pantau nilai bahan terbuang, waste per bahan atau menu, alasan waste, remake, dan jumlah produksi tidak terjual; bandingkan dengan jumlah porsi terjual agar perubahan volume usaha tidak menyesatkan.",
      },
    ],
    tldr: [
      "Catat sisa pangan berdasarkan bahan atau menu, tahap terbuang, penyebab, dan nilai perkiraannya.",
      "Pisahkan waste penyimpanan, persiapan, produksi berlebih, remake, dan sisa pelanggan.",
      "Hubungkan catatan waste dengan pola order; jangan menebak kebutuhan hanya dari hari terakhir.",
      "Perbaiki satu penyebab terbesar sebelum mengubah pembelian, porsi, dan menu sekaligus.",
      "Ukur nilai bahan terbuang per porsi terjual agar dampaknya terlihat pada profit.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Bagaimana cara mengurangi food waste di warung atau kafe?",
        toc: "Jawaban singkat",
        body: (
          <>
            <p>
              Mulai dengan jurnal sisa pangan selama tujuh hari: catat bahan atau
              menu, jumlah atau nilai perkiraan, tahap terbuang, penyebab, dan
              tindakan berikutnya. Setelah itu, perbaiki satu penyebab dengan dampak
              terbesar terlebih dahulu.
            </p>
            <p>
              Pendekatan ini membedakan sisa yang memang tidak dapat dimakan dari
              bahan layak yang rusak, produksi yang tidak terjual, remake, dan porsi
              yang kembali dari pelanggan. Setiap penyebab membutuhkan keputusan berbeda.
            </p>
          </>
        ),
      },
      {
        id: "mengapa-terlambat",
        heading: "Mengapa bahan terbuang sering baru terlihat saat profit menipis?",
        toc: "Waste yang tidak terlihat",
        body: (
          <>
            <p>
              Pembelian tercatat sebagai satu pengeluaran besar, sedangkan bahan
              terbuang muncul sedikit demi sedikit: sayur layu, saus berlebih,
              minuman salah racik, atau produk jadi yang tersisa. Tanpa alasan dan
              nilai perkiraan, semua kejadian itu hanya terlihat sebagai tempat sampah penuh.
            </p>
            <p>
              Badan Pangan Nasional menempatkan pencegahan dan pengurangan sisa
              pangan sebagai proses yang sistematis. Konteks dan materi resminya
              dapat dibaca melalui <a href="https://sbp.badanpangan.go.id/">Gerakan Stop Boros Pangan</a>.
              Untuk usaha kecil, bentuk paling praktis dari prinsip itu adalah
              mencatat pola sebelum memutuskan tindakan.
            </p>
          </>
        ),
      },
      {
        id: "lima-jenis",
        heading: "Apa saja jenis food waste yang perlu dipisahkan?",
        toc: "Lima jenis waste",
        body: (
          <ol>
            <li><b>Penyimpanan:</b> bahan rusak, layu, bocor, atau melewati batas aman sebelum dipakai.</li>
            <li><b>Persiapan:</b> trimming berlebih, salah takaran, tumpah, atau bahan salah olah.</li>
            <li><b>Produksi berlebih:</b> makanan atau minuman sudah dibuat tetapi tidak terjual.</li>
            <li><b>Kesalahan order:</b> remake karena item, ukuran, topping, atau catatan pelanggan keliru.</li>
            <li><b>Sisa pelanggan:</b> porsi tidak habis dan kembali dari meja atau pesanan.</li>
          </ol>
        ),
      },
      {
        id: "jurnal-tujuh-hari",
        heading: "Bagaimana membuat jurnal waste yang benar-benar dipakai tim?",
        toc: "Jurnal tujuh hari",
        body: (
          <>
            <p>
              Gunakan lima kolom: bahan atau menu, jumlah atau nilai perkiraan,
              tahap terbuang, kode penyebab, dan tindakan berikutnya. Hindari kolom
              komentar bebas yang panjang; tim perlu mencatat kejadian dalam beberapa detik.
            </p>
            <div className="callout">
              <b>Contoh:</b> susu segar · kira-kira Rp28.000 · penyimpanan · kedaluwarsa
              · kurangi pembelian hari Selasa dan cek stok sebelum menerima order pemasok.
            </div>
            <p>
              Di akhir tujuh hari, jumlahkan nilai per penyebab—bukan hanya per bahan.
              Sepuluh bahan berbeda yang terbuang karena produksi berlebih mungkin
              menunjukkan satu masalah yang sama: keputusan prep tidak mengikuti pola order.
            </p>
          </>
        ),
      },
      {
        id: "keputusan-per-penyebab",
        heading: "Keputusan apa yang tepat untuk setiap penyebab waste?",
        toc: "Keputusan per penyebab",
        body: (
          <ul>
            <li><b>Rusak di penyimpanan:</b> perbaiki rotasi, label tanggal, jumlah beli, atau frekuensi pemasok.</li>
            <li><b>Produksi berlebih:</b> kecilkan batch awal dan gunakan order aktual sebagai sinyal batch berikutnya.</li>
            <li><b>Remake:</b> pastikan satu versi order aktif sampai ke dapur; gunakan panduan <a href="/blog/pelanggan-sering-ubah-pesanan-di-whatsapp">menangani revisi pesanan WhatsApp</a>.</li>
            <li><b>Menu jarang terjual:</b> evaluasi posisinya, bahan yang dipakai bersama menu lain, dan kontribusi profit melalui <a href="/blog/mengetahui-menu-paling-laku-dan-menguntungkan">analisis menu laku dan menguntungkan</a>.</li>
            <li><b>Sisa pelanggan:</b> tinjau konsistensi porsi dan tanyakan secara netral bila pola yang sama berulang.</li>
          </ul>
        ),
      },
      {
        id: "ukur-waste",
        heading: "Metrik food waste apa yang berguna untuk usaha F&B kecil?",
        toc: "Metrik yang berguna",
        body: (
          <p>
            Pantau nilai bahan terbuang, waste per bahan atau menu, alasan waste,
            remake, dan jumlah produksi tidak terjual. Bandingkan dengan jumlah
            porsi terjual agar perubahan volume usaha tidak menyesatkan. Tujuannya
            bukan membuat tim takut mencatat, tetapi membuat penyebab yang berulang
            cukup jelas untuk diperbaiki.
          </p>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Bagaimana Sosmed AI menghubungkan pola order dengan keputusan waste?",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI sedang dirancang untuk menghubungkan percakapan WhatsApp,
              menu yang dipesan, perubahan order, status penyelesaian, dan ringkasan
              bisnis. Konteks itu dapat membantu pemilik melihat bahan atau menu mana
              yang perlu disiapkan lebih hati-hati tanpa menambah rekap chat manual.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "stok-habis-saat-order-ramai", g: "g6", tag: "Tips Bisnis", title: "Stok Habis Saat Order Ramai", excerpt: "Seimbangkan kesiapan stok dan risiko belanja berlebihan." },
      { slug: "mengetahui-menu-paling-laku-dan-menguntungkan", g: "g7", tag: "Panduan", title: "Menu Paling Laku dan Menguntungkan", excerpt: "Hubungkan popularitas menu dengan margin dan beban operasional." },
      { slug: "pelanggan-sering-ubah-pesanan-di-whatsapp", g: "g6", tag: "Tips Bisnis", title: "Pelanggan Sering Ubah Pesanan", excerpt: "Kurangi remake karena dapur memakai versi order yang salah." },
    ],
  },
  "mencocokkan-pembayaran-qris-dengan-order-whatsapp": {
    title: "Cara Mencocokkan Pembayaran QRIS dengan Order WhatsApp agar Tidak Salah Konfirmasi",
    category: "Panduan",
    readTime: "8 menit baca",
    datePublished: "2026-07-19",
    coverTitle: "Cocokkan QRIS dengan Order WhatsApp",
    description:
      "Panduan mencocokkan pembayaran QRIS dengan order WhatsApp memakai kode pesanan, nominal, waktu, dan status merchant agar konfirmasi tidak tertukar.",
    lede: (
      <>
        Pelanggan mengirim screenshot “sudah bayar”, dua order punya nominal sama,
        dan dapur menunggu kepastian. Agar tidak salah konfirmasi, setiap pembayaran
        QRIS perlu dicocokkan ke satu order WhatsApp melalui kode pesanan, nominal,
        waktu transaksi, dan status masuk di aplikasi merchant—bukan berdasarkan
        screenshot saja.
      </>
    ),
    keywords: [
      "mencocokkan pembayaran QRIS",
      "order WhatsApp dan QRIS",
      "rekonsiliasi pembayaran warung",
      "konfirmasi pembayaran pelanggan",
      "pencatatan transaksi F&B",
    ],
    faq: [
      {
        q: "Bagaimana cara mencocokkan pembayaran QRIS dengan order WhatsApp?",
        a: "Cocokkan empat penanda: kode pesanan, nominal yang diharapkan, waktu transaksi, dan status berhasil di aplikasi merchant. Screenshot pelanggan membantu penelusuran, tetapi bukan sumber verifikasi utama.",
      },
      {
        q: "Apakah screenshot QRIS cukup sebagai bukti pembayaran?",
        a: "Tidak. Jadikan notifikasi atau riwayat transaksi pada aplikasi merchant sebagai sumber verifikasi utama karena screenshot dapat terlambat, tertukar, atau berasal dari transaksi lain.",
      },
      {
        q: "Apa yang harus dilakukan jika nominal QRIS tidak cocok dengan order?",
        a: "Tahan status order sebagai menunggu verifikasi, cek kembali rincian pesanan dan riwayat merchant, lalu hubungi pelanggan dengan menyebut selisihnya secara jelas sebelum dapur memproses atau staf mengembalikan dana.",
      },
    ],
    tldr: [
      "Satu pembayaran harus terhubung ke satu kode pesanan, bukan hanya ke nama pelanggan.",
      "Verifikasi nominal, waktu, dan status berhasil dari sisi merchant sebelum mengubah order menjadi lunas.",
      "Screenshot pelanggan berguna untuk penelusuran, tetapi tidak menggantikan riwayat transaksi merchant.",
      "Pisahkan status menunggu pembayaran, perlu verifikasi, lunas, dan dikembalikan agar tim tidak menebak.",
      "Ukur pembayaran yang perlu dicari manual dan waktu dari pelanggan membayar sampai order terkonfirmasi.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Bagaimana cara mencocokkan pembayaran QRIS dengan order WhatsApp?",
        toc: "Jawaban singkat",
        body: (
          <>
            <p>
              Cocokkan empat penanda: kode pesanan, nominal yang diharapkan, waktu
              transaksi, dan status berhasil di aplikasi merchant. Screenshot
              pelanggan membantu penelusuran, tetapi bukan sumber verifikasi utama.
            </p>
            <p>
              Tujuannya bukan membuat administrasi baru. Tujuannya memberi tim satu
              jawaban yang sama: pembayaran mana milik order mana, apakah dananya
              benar-benar masuk, dan apakah dapur sudah boleh mulai bekerja.
            </p>
          </>
        ),
      },
      {
        id: "mengapa-tertukar",
        heading: "Mengapa pembayaran QRIS mudah tertukar saat order masuk lewat chat?",
        toc: "Mengapa bisa tertukar",
        body: (
          <>
            <p>
              WhatsApp menyimpan percakapan, sedangkan aplikasi merchant menyimpan
              transaksi. Kekacauan muncul ketika tim mencoba menyambungkan dua daftar
              itu hanya dari ingatan. Nama pengirim dapat berbeda dari nama pemesan,
              beberapa pelanggan bisa membayar nominal yang sama, dan chat konfirmasi
              dapat masuk ketika staf sedang melayani antrean lain.
            </p>
            <p>
              Bank Indonesia menjelaskan bahwa pelanggan dan merchant menerima
              notifikasi transaksi QRIS. Karena itu, sisi merchant tetap perlu dicek
              sebelum order dinyatakan lunas. Lihat penjelasan resmi pada halaman
              <a href="https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/ritel/kanal-layanan/qris/default.aspx">
                {" "}QRIS Bank Indonesia
              </a>.
            </p>
          </>
        ),
      },
      {
        id: "empat-penanda",
        heading: "Empat penanda apa yang harus selalu dicocokkan?",
        toc: "Empat penanda",
        body: (
          <>
            <ol>
              <li>
                <b>Kode pesanan.</b> Beri setiap order identitas singkat, misalnya
                W-1042, lalu gunakan kode yang sama di chat dan catatan operasional.
              </li>
              <li>
                <b>Nominal yang diharapkan.</b> Catat total setelah ongkir, diskon,
                atau tambahan menu selesai disepakati—bukan total sementara.
              </li>
              <li>
                <b>Waktu transaksi.</b> Gunakan waktu sebagai penyaring ketika ada
                dua pembayaran bernominal sama, bukan sebagai satu-satunya bukti.
              </li>
              <li>
                <b>Status di aplikasi merchant.</b> Pastikan transaksi terlihat
                berhasil dari sisi penerima sebelum order diberi status lunas.
              </li>
            </ol>
            <p>
              Jika pencatatan order masih sering terlewat, rapikan dulu alurnya lewat
              panduan <a href="/blog/otomatisasi-whatsapp-untuk-umkm-fnb">otomatisasi WhatsApp untuk UMKM F&amp;B</a>.
              Untuk rekap akhir hari, lanjutkan dengan daftar angka pada artikel
              <a href="/blog/laporan-penjualan-harian"> laporan penjualan harian</a>.
            </p>
          </>
        ),
      },
      {
        id: "alur-enam-langkah",
        heading: "Bagaimana alur konfirmasi yang aman tetapi tetap cepat?",
        toc: "Alur konfirmasi",
        body: (
          <ol>
            <li>Ringkas order dan minta pelanggan menyetujui item, jumlah, alamat atau waktu ambil.</li>
            <li>Buat kode pesanan dan simpan total akhir yang harus dibayar.</li>
            <li>Kirim instruksi pembayaran tanpa mengubah status order menjadi lunas.</li>
            <li>Saat pelanggan mengabari sudah bayar, cari transaksi dari nominal dan rentang waktunya.</li>
            <li>Pastikan status berhasil di aplikasi merchant, lalu hubungkan transaksi ke kode pesanan.</li>
            <li>Baru setelah itu ubah status menjadi lunas dan teruskan order ke antrean dapur.</li>
          </ol>
        ),
      },
      {
        id: "jika-tidak-cocok",
        heading: "Apa yang dilakukan jika bukti, nominal, atau status tidak cocok?",
        toc: "Jika tidak cocok",
        body: (
          <>
            <p>
              Tahan status order sebagai menunggu verifikasi, cek kembali rincian
              pesanan dan riwayat merchant, lalu hubungi pelanggan dengan menyebut
              selisihnya secara jelas sebelum dapur memproses atau staf mengembalikan dana.
            </p>
            <p>
              Jika nominal kurang, jelaskan total dan kekurangannya. Jika nominal
              lebih, sepakati apakah selisih dikembalikan atau dipakai untuk tambahan
              pesanan. Jika transaksi belum terlihat, jangan menuduh pelanggan;
              sampaikan bahwa tim masih memeriksa dan beri waktu pembaruan yang jelas.
            </p>
            <div className="callout">
              <b>Prinsip aman:</b> satu staf boleh menyelidiki, tetapi semua staf harus
              melihat status yang sama. Hindari order diproses diam-diam sementara
              catatan pembayaran masih “belum masuk”.
            </div>
          </>
        ),
      },
      {
        id: "screenshot-dan-metrik",
        heading: "Apakah screenshot cukup, dan metrik apa yang perlu dipantau?",
        toc: "Bukti dan metrik",
        body: (
          <>
            <p>
              Tidak. Jadikan notifikasi atau riwayat transaksi pada aplikasi merchant
              sebagai sumber verifikasi utama karena screenshot dapat terlambat,
              tertukar, atau berasal dari transaksi lain.
            </p>
            <p>
              Pantau jumlah pembayaran yang perlu dicari manual, waktu dari pelanggan
              membayar sampai order terkonfirmasi, order yang diproses sebelum lunas,
              selisih nominal, dan refund karena salah pencocokan. Metrik ini lebih
              berguna daripada sekadar menghitung berapa transaksi QRIS yang masuk.
            </p>
          </>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Bagaimana Sosmed AI dapat membantu merapikan alurnya?",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI sedang dirancang agar konteks percakapan, ringkasan order,
              status pembayaran, dan tindakan operasional dapat terlihat sebagai satu
              alur. Pelanggan tetap mengobrol natural di WhatsApp, sementara tim tidak
              perlu mencari-cari konteks di antara chat lama sebelum mengambil tindakan.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "otomatisasi-whatsapp-untuk-umkm-fnb", g: "g3", tag: "Panduan", title: "Otomatisasi WhatsApp untuk UMKM F&B", excerpt: "Hubungkan chat, order, pelanggan, dan laporan tanpa bot kaku." },
      { slug: "laporan-penjualan-harian", g: "g7", tag: "Panduan", title: "Laporan Penjualan Harian", excerpt: "Pantau angka yang membantu menjaga transaksi tetap sehat." },
      { slug: "cara-mengurangi-chaos-operasional-warung-kafe", g: "g6", tag: "Tips Bisnis", title: "Cara Mengurangi Chaos Operasional", excerpt: "Bangun satu alur kerja yang dapat dilihat seluruh tim." },
    ],
  },
  "pelanggan-sering-ubah-pesanan-di-whatsapp": {
    title: "Pelanggan Sering Ubah Pesanan di WhatsApp? Cegah Dapur Memasak Versi yang Salah",
    category: "Tips Bisnis",
    readTime: "8 menit baca",
    datePublished: "2026-07-19",
    coverTitle: "Jangan Masak Versi Pesanan yang Salah",
    description:
      "Cara menangani perubahan pesanan pelanggan lewat WhatsApp dengan satu versi order aktif, konfirmasi ulang, dan batas edit yang jelas untuk dapur.",
    lede: (
      <>
        “Ayamnya jangan pedas.” Lalu dua menit kemudian, “Tambah es teh dua, ya.”
        Perubahannya tampak kecil di chat, tetapi dapur bisa tetap memasak versi lama.
        Solusinya adalah menjaga satu versi pesanan aktif, mengonfirmasi setiap perubahan,
        dan memberi batas edit sesuai status dapur.
      </>
    ),
    keywords: [
      "pelanggan ubah pesanan WhatsApp",
      "cara revisi order pelanggan",
      "pesanan salah di dapur",
      "mengelola order lewat chat",
      "SOP perubahan pesanan F&B",
    ],
    faq: [
      {
        q: "Bagaimana menangani pelanggan yang mengubah pesanan lewat WhatsApp?",
        a: "Catat perubahan pada satu versi order aktif, bacakan ulang hanya bagian yang berubah beserta total dan waktu siap terbaru, lalu minta konfirmasi pelanggan sebelum perubahan diteruskan ke dapur.",
      },
      {
        q: "Kapan perubahan pesanan masih boleh diterima?",
        a: "Perubahan dapat langsung diterima sebelum dapur memproses; setelah diproses, staf perlu mengecek kelayakan, biaya, dan waktu tambahan; setelah siap, perlakukan permintaan baru sebagai tambahan order.",
      },
      {
        q: "Bagaimana mengukur apakah kesalahan versi pesanan berkurang?",
        a: "Pantau jumlah revisi per order, remake karena versi lama, selisih total setelah perubahan, waktu konfirmasi revisi, dan komplain akibat pesanan yang tidak sesuai.",
      },
    ],
    tldr: [
      "Chat adalah jejak percakapan, tetapi dapur membutuhkan satu versi order yang berlaku saat ini.",
      "Setiap revisi harus memperbarui item, total, estimasi, dan status dalam satu catatan aktif.",
      "Konfirmasi ulang bagian yang berubah—bukan menyalin seluruh percakapan panjang.",
      "Batas perubahan mengikuti status order: belum diproses, sedang diproses, atau sudah siap.",
      "Ukur remake dan komplain akibat versi lama agar masalah tidak dianggap sekadar kelalaian staf.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Bagaimana menangani pelanggan yang mengubah pesanan lewat WhatsApp?",
        toc: "Jawaban singkat",
        body: (
          <>
            <p>
              Catat perubahan pada satu versi order aktif, bacakan ulang hanya bagian
              yang berubah beserta total dan waktu siap terbaru, lalu minta konfirmasi
              pelanggan sebelum perubahan diteruskan ke dapur.
            </p>
            <p>
              Intinya, chat boleh panjang tetapi instruksi dapur tidak boleh memiliki
              dua kebenaran. Versi lama harus ditandai sudah diganti, bukan dibiarkan
              berdampingan dengan revisi terbaru.
            </p>
          </>
        ),
      },
      {
        id: "mengapa-versi-lama",
        heading: "Mengapa dapur masih memasak versi lama meski pelanggan sudah mengubahnya?",
        toc: "Mengapa versi lama dipakai",
        body: (
          <>
            <p>
              Perubahan sering berhenti di ponsel orang yang membalas chat. Kertas order
              pertama sudah masuk dapur, total pembayaran belum diperbarui, atau staf
              lain hanya membaca pesan awal. Jadi masalahnya bukan semata-mata kurang
              teliti; sumber informasi order memang terpecah.
            </p>
            <p>
              Risiko membesar saat jam ramai. Artikel
              <a href="/blog/jam-ramai-adalah-ujian-sebenarnya"> jam ramai adalah ujian sebenarnya</a>
              menjelaskan mengapa satu informasi yang tidak berpindah dapat berubah
              menjadi pelanggan yang menunggu tanpa kepastian.
            </p>
          </>
        ),
      },
      {
        id: "satu-versi-aktif",
        heading: "Apa yang dimaksud dengan satu versi pesanan aktif?",
        toc: "Satu versi aktif",
        body: (
          <>
            <p>
              Satu versi pesanan aktif adalah satu ringkasan terbaru yang menjadi acuan
              chat, kasir, dan dapur. Setiap revisi memperbarui ringkasan itu sekaligus
              menyimpan jejak apa yang berubah, siapa yang mengubah, dan kapan perubahan
              dikonfirmasi.
            </p>
            <ol>
              <li>Tandai item lama sebagai diganti atau dibatalkan; jangan hanya menambahkan catatan baru di bawahnya.</li>
              <li>Perbarui jumlah, catatan rasa, alamat, total, pembayaran, dan estimasi bila terdampak.</li>
              <li>Kirim ringkasan revisi kepada pelanggan dan orang yang mengendalikan antrean dapur.</li>
              <li>Gunakan status “menunggu konfirmasi” sampai pelanggan menyetujui perubahan penting.</li>
            </ol>
          </>
        ),
      },
      {
        id: "batas-perubahan",
        heading: "Kapan perubahan pesanan masih boleh diterima?",
        toc: "Batas perubahan",
        body: (
          <>
            <p>
              Perubahan dapat langsung diterima sebelum dapur memproses; setelah
              diproses, staf perlu mengecek kelayakan, biaya, dan waktu tambahan;
              setelah siap, perlakukan permintaan baru sebagai tambahan order.
            </p>
            <ul>
              <li><b>Belum diproses:</b> revisi order, hitung ulang total, lalu kirim versi terbaru ke antrean.</li>
              <li><b>Sedang diproses:</b> tanyakan dapur lebih dulu; jelaskan konsekuensi tanpa menyalahkan pelanggan.</li>
              <li><b>Sudah siap:</b> jangan menghapus biaya yang sudah terjadi secara otomatis; tawarkan tambahan atau solusi yang wajar.</li>
            </ul>
            <p>
              Batas ini perlu terlihat oleh tim seperti halnya status order “baru”,
              “diproses”, dan “siap”. Dasarnya dapat dibangun dari panduan
              <a href="/blog/cara-mengurangi-chaos-operasional-warung-kafe"> mengurangi chaos operasional warung dan kafe</a>.
            </p>
          </>
        ),
      },
      {
        id: "contoh-konfirmasi",
        heading: "Seperti apa chat konfirmasi revisi yang jelas dan tidak kaku?",
        toc: "Contoh konfirmasi",
        body: (
          <>
            <p>
              Gunakan bahasa natural dan sebutkan dampaknya. Contoh: “Siap, Kak Rani.
              Pesanan W-1048 diubah menjadi 2 ayam geprek tidak pedas dan tambah 2 es
              teh. Total terbaru Rp72.000, estimasi siap 12.35. Sudah sesuai, ya?”
            </p>
            <p>
              Jika dapur sudah mulai: “Ayam pertama sudah diproses, Kak. Kami cek dulu
              apakah level pedas masih bisa diubah. Saya kabari paling lambat dua menit.”
              Kalimat seperti ini memberi kepastian tanpa membuat percakapan terasa
              seperti menu chatbot.
            </p>
          </>
        ),
      },
      {
        id: "ukur-perbaikan",
        heading: "Bagaimana mengukur apakah kesalahan versi pesanan berkurang?",
        toc: "Ukur perbaikan",
        body: (
          <>
            <p>
              Pantau jumlah revisi per order, remake karena versi lama, selisih total
              setelah perubahan, waktu konfirmasi revisi, dan komplain akibat pesanan
              yang tidak sesuai.
            </p>
            <p>
              Review lima order yang paling banyak direvisi setiap minggu. Jika pola
              datang dari pertanyaan menu yang sama, perjelas menu digital. Jika pola
              muncul karena handoff tim, perbaiki titik serah—bukan meminta semua orang
              “lebih fokus” tanpa mengubah sistem.
            </p>
          </>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Bagaimana Sosmed AI dapat membantu menjaga konteks perubahan?",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI sedang dirancang untuk memahami konteks percakapan dan membantu
              merapikan perubahan menjadi order aktif yang dapat ditindaklanjuti. Arah
              produknya bukan membuat pelanggan mengikuti tombol-tombol kaku, melainkan
              menjaga agar bahasa chat yang natural tetap menghasilkan instruksi bisnis
              yang jelas di belakang layar.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "jam-ramai-adalah-ujian-sebenarnya", g: "g6", tag: "Tips Bisnis", title: "Jam Ramai Adalah Ujian Sebenarnya", excerpt: "Pastikan satu perubahan tidak hilang saat antrean memanjang." },
      { slug: "cara-mengurangi-chaos-operasional-warung-kafe", g: "g6", tag: "Tips Bisnis", title: "Cara Mengurangi Chaos Operasional", excerpt: "Rapikan sumber informasi dan handoff antartim." },
      { slug: "menangani-komplain-pelanggan-lewat-whatsapp", g: "g5", tag: "Panduan", title: "Menangani Komplain Lewat WhatsApp", excerpt: "Pulihkan kepercayaan jika pesanan telanjur tidak sesuai." },
    ],
  },
  "warung-ramai-belum-tentu-untung": createTodayArticle({
    datePublished: "2026-07-14",
    slug: "warung-ramai-belum-tentu-untung", category: "Tips Bisnis", coverTitle: "Ramai Belum Tentu Untung",
    title: "Warung Ramai Itu Belum Tentu Untung: 5 Tanda Anda Cuma Sibuk, Bukan Bertumbuh",
    description: "Lima tanda warung atau kafe ramai tetapi profit tidak bertumbuh, serta cara membaca kebocoran order, diskon, biaya, dan pelanggan.",
    problem: "Antrean panjang dan notifikasi order memang membuat lega. Namun banyak pemilik warung pulang lebih lelah tanpa merasa uang yang tersisa ikut bertambah. Masalahnya bukan selalu kurang laku—sering kali usaha hanya makin sibuk.",
    answer: "Usaha ramai tetapi tidak bertumbuh ketika tambahan order tidak menghasilkan tambahan margin, pelanggan kembali, atau sistem yang membuat kerja lebih ringan.",
    diagnosis: "Periksa lima sinyal: omzet naik tetapi kas tipis, diskon makin besar, order batal atau remake berulang, menu ramai bermargin rendah, dan pelanggan lama tidak kembali.",
    actions: ["Pilih satu minggu order dan hitung omzet, diskon, pembatalan, serta biaya bahan per menu utama.", "Tandai tiga kejadian yang paling banyak menghabiskan rupiah atau waktu.", "Perbaiki satu kebocoran terlebih dahulu dan ukur ulang pada minggu berikutnya."],
    measure: "Pantau margin kotor, jumlah order batal atau remake, nilai diskon, repeat-order rate, dan laba bersih mingguan.",
    keywords: ["warung ramai tidak untung", "cara meningkatkan profit warung", "kebocoran profit F&B", "omzet dan laba UMKM"],
    related: [{slug:"order-ramai-profit-tidak-naik",g:"g7",tag:"Tips Bisnis",title:"Order Ramai tapi Profit Tidak Naik?",excerpt:"Tujuh kebocoran yang paling sering tersembunyi."},{slug:"mengetahui-menu-paling-laku-dan-menguntungkan",g:"g7",tag:"Panduan",title:"Menu Paling Laku dan Menguntungkan",excerpt:"Baca kontribusi profit tiap menu."},{slug:"laporan-penjualan-harian",g:"g7",tag:"Panduan",title:"Laporan Penjualan Harian",excerpt:"Angka yang perlu dipantau setiap hari."}],
  }),
  "pemilik-warung-capek-bukan-karena-masak": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"pemilik-warung-capek-bukan-karena-masak",category:"Cerita",coverTitle:"Capek karena Mengingat Semua Hal",
    title:"Pemilik Warung Paling Capek Bukan Karena Masak, Tapi Karena Mengingat Semua Hal Ini",
    description:"Mengapa beban mental pemilik warung datang dari mengingat order, stok, chat, pelanggan, dan kas—serta cara membangun sistem yang lebih ringan.",
    problem:"Banyak pemilik warung bukan hanya memasak atau melayani. Mereka menjadi kasir, customer service, pencatat stok, pengingat promo, dan pembuat laporan dalam waktu yang sama. Yang menguras tenaga adalah terlalu banyak hal penting yang hanya hidup di kepala.",
    answer:"Beban pemilik berkurang ketika informasi yang berulang dipindahkan dari ingatan menjadi alur kerja yang terlihat, konsisten, dan bisa dijalankan tim.",
    diagnosis:"Buat daftar setiap hal yang hanya Anda ingat sendiri: pesanan khusus, stok kritis, pelanggan langganan, utang, jadwal belanja, dan rekap kas.",
    actions:["Selama tiga hari, catat setiap pertanyaan atau tugas yang hanya bisa dijawab oleh pemilik.","Kelompokkan tugas menjadi order, pelanggan, stok, dan kas; pilih satu format pencatatan yang dipakai semua orang.","Tetapkan satu ringkasan harian sehingga informasi penting tidak ditutup bersama chat lama."],
    measure:"Pantau jumlah interupsi ke pemilik, order yang perlu dikoreksi, waktu rekap malam, dan berapa tugas yang dapat diselesaikan tim tanpa menunggu jawaban Anda.",
    keywords:["pemilik warung capek", "sistem operasional warung", "otomatisasi UMKM F&B", "mengurangi kerja manual"],
    related:[{slug:"cara-mengurangi-chaos-operasional-warung-kafe",g:"g6",tag:"Tips Bisnis",title:"Mengurangi Chaos Operasional",excerpt:"Framework agar order tidak tercecer."},{slug:"otomatisasi-whatsapp-untuk-umkm-fnb",g:"g3",tag:"Panduan",title:"Otomatisasi WhatsApp untuk UMKM",excerpt:"Kurangi kerja manual tanpa menghilangkan layanan personal."},{slug:"warung-tetap-jalan-saat-pemilik-libur",g:"g6",tag:"Tips Bisnis",title:"Warung Tetap Jalan Saat Pemilik Libur",excerpt:"Uji apakah sistem Anda benar-benar bekerja."}],
  }),
  "warung-tetap-jalan-saat-pemilik-libur": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"warung-tetap-jalan-saat-pemilik-libur",category:"Tips Bisnis",coverTitle:"Apakah Warung Tetap Jalan?",
    title:"Kalau Pemilik Libur Sehari, Apakah Warung Tetap Jalan?",
    description:"Cara menguji apakah warung, kafe, atau restoran kecil memiliki sistem yang cukup kuat untuk tetap berjalan saat pemilik tidak hadir.",
    problem:"Banyak usaha terlihat berjalan, tetapi sebenarnya pemilik adalah lem yang menyatukan semua keputusan kecil. Saat pemilik tidak hadir, order terlambat, stok tidak jelas, dan tim saling menunggu. Ini bukan kegagalan tim—ini sinyal sistem belum tertulis.",
    answer:"Warung siap berjalan tanpa pemilik ketika tim memiliki sumber informasi, batas keputusan, dan ritme handoff yang jelas untuk order, stok, pelanggan, dan kas.",
    diagnosis:"Uji satu hari tanpa menjawab pertanyaan operasional. Catat pertanyaan yang muncul, keputusan yang tertunda, dan informasi yang sulit ditemukan tim.",
    actions:["Tulis checklist buka, jam ramai, dan tutup yang dapat dipakai tanpa bertanya.","Tentukan batas keputusan staf—misalnya penggantian menu, refund kecil, atau promo yang boleh diberikan.","Buat handoff ringkas: order aktif, stok kritis, pelanggan bermasalah, dan target hari itu."],
    measure:"Pantau jumlah panggilan ke pemilik, waktu tunggu pelanggan, order salah, selisih kas, dan kepuasan tim saat pemilik tidak ada.",
    keywords:["warung tetap jalan tanpa pemilik", "sistem operasional kafe", "delegasi UMKM", "SOP warung"],
    related:[{slug:"pemilik-warung-capek-bukan-karena-masak",g:"g6",tag:"Cerita",title:"Kenapa Pemilik Warung Sangat Capek",excerpt:"Kurangi beban mental dari hal yang harus diingat."},{slug:"cara-mengurangi-chaos-operasional-warung-kafe",g:"g6",tag:"Tips Bisnis",title:"Mengurangi Chaos Operasional",excerpt:"Rapikan alur sebelum order makin ramai."},{slug:"jam-ramai-adalah-ujian-sebenarnya",g:"g6",tag:"Tips Bisnis",title:"Jam Ramai Adalah Ujian",excerpt:"Uji sistem ketika tekanan sedang tinggi."}],
  }),
  "pelanggan-bilang-nanti-order-lagi": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"pelanggan-bilang-nanti-order-lagi",category:"Tips Bisnis",coverTitle:"Pelanggan Tidak Kembali",
    title:"Pelanggan Bilang ‘Nanti Order Lagi Ya’—Tapi Kok Tidak Pernah Kembali?",
    description:"Cara memahami alasan pelanggan tidak repeat order dan membangun pengalaman yang membuat mereka kembali tanpa spam atau diskon terus-menerus.",
    problem:"Kalimat ‘nanti order lagi ya’ terdengar baik, tetapi sering tidak berubah menjadi pembelian berikutnya. Bukan berarti pelanggan berbohong; mungkin mereka lupa, pengalaman tidak cukup mudah, atau usaha Anda tidak memberi alasan yang relevan untuk kembali.",
    answer:"Pelanggan kembali ketika usaha mengenali konteks mereka, membuat order ulang mudah, dan menindaklanjuti pada waktu yang relevan tanpa terasa memaksa.",
    diagnosis:"Bandingkan pelanggan yang kembali dengan yang tidak kembali: menu pertama, waktu tunggu, komplain, nilai order, dan jarak hari sejak pembelian terakhir.",
    actions:["Catat menu favorit dan preferensi pelanggan yang sering order.","Kirim follow-up hanya ketika ada alasan yang relevan, seperti menu favorit tersedia atau poin hampir mencapai reward.","Buat order ulang sesingkat mungkin; pelanggan tidak perlu menjelaskan pesanan yang sama dari awal."],
    measure:"Pantau repeat-order rate, median jarak antar-order, pelanggan aktif 30 hari, serta respons terhadap follow-up yang relevan.",
    keywords:["pelanggan tidak kembali", "cara meningkatkan repeat order", "retensi pelanggan F&B", "follow up WhatsApp pelanggan"],
    related:[{slug:"mengubah-chat-whatsapp-menjadi-pelanggan-setia",g:"g5",tag:"Tips Bisnis",title:"Mengubah Chat Menjadi Pelanggan Setia",excerpt:"Gunakan konteks chat untuk hubungan jangka panjang."},{slug:"program-loyalti-whatsapp-untuk-umkm",g:"g5",tag:"Panduan",title:"Program Loyalti WhatsApp",excerpt:"Poin dan reward tanpa kartu member."},{slug:"promo-terus-bukan-solusi",g:"g5",tag:"Tips Bisnis",title:"Promo Terus Bukan Solusi",excerpt:"Dorong pelanggan kembali tanpa diskon massal."}],
  }),
  "bongkar-chat-whatsapp-warung": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"bongkar-chat-whatsapp-warung",category:"Panduan",coverTitle:"Order Hilang karena Telat Balas",
    title:"Bongkar Chat WhatsApp Warung: Berapa Banyak Order yang Hilang Karena Telat Balas?",
    description:"Cara menemukan chat WhatsApp yang berpotensi menjadi order hilang, mengukur response time, dan merapikan antrean percakapan warung atau kafe.",
    problem:"Order lewat WhatsApp sering hilang dengan cara yang sunyi: pelanggan bertanya, tidak segera mendapat jawaban, lalu membeli di tempat lain. Karena tidak ada struk pembatalan, kerugiannya mudah tidak terlihat.",
    answer:"Order hilang karena telat balas dapat dikurangi dengan memisahkan chat baru, order aktif, pertanyaan selesai, dan chat yang perlu eskalasi—lalu mengukur waktu responsnya.",
    diagnosis:"Ambil 50 chat terakhir dan tandai waktu pesan pertama, balasan pertama, hasil akhir, dan alasan order tidak jadi bila diketahui.",
    actions:["Tetapkan target balasan awal untuk jam sepi dan jam ramai.","Gunakan format jelas untuk order baru, perubahan order, pembayaran, serta status siap ambil.","Review chat yang berhenti tanpa order setiap hari untuk mencari pertanyaan yang belum terjawab."],
    measure:"Pantau median response time, persentase chat menjadi order, chat tanpa balasan, order batal, dan nilai penjualan yang berhasil dipulihkan.",
    keywords:["order WhatsApp hilang", "telat balas chat pelanggan", "response time WhatsApp bisnis", "mengelola chat warung"],
    related:[{slug:"jam-ramai-adalah-ujian-sebenarnya",g:"g6",tag:"Tips Bisnis",title:"Jam Ramai Adalah Ujian",excerpt:"Pastikan order tidak tercecer saat tekanan naik."},{slug:"otomatisasi-whatsapp-untuk-umkm-fnb",g:"g3",tag:"Panduan",title:"Otomatisasi WhatsApp",excerpt:"Rapikan chat, order, pelanggan, dan laporan."},{slug:"cara-mengurangi-chaos-operasional-warung-kafe",g:"g6",tag:"Tips Bisnis",title:"Mengurangi Chaos Operasional",excerpt:"Kurangi risiko dari kerja manual berulang."}],
  }),
  "promo-terus-bukan-solusi": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"promo-terus-bukan-solusi",category:"Tips Bisnis",coverTitle:"Pelanggan Kembali Tanpa Diskon",
    title:"Promo Terus Bukan Solusi: Cara Membuat Pelanggan Kembali Tanpa Diskon Tiap Minggu",
    description:"Strategi retensi pelanggan F&B tanpa bergantung pada diskon massal: segmentasi sederhana, follow-up relevan, loyalti, dan pengalaman order yang lebih mudah.",
    problem:"Diskon bisa membuat order naik hari ini, tetapi jika menjadi satu-satunya alasan pelanggan kembali, margin makin tipis dan pelanggan belajar menunggu promo berikutnya. Usaha perlu alasan yang lebih sehat untuk diingat.",
    answer:"Pelanggan tidak selalu membutuhkan diskon; mereka lebih sering membutuhkan pengalaman yang mudah, relevan, dan terasa personal pada waktu yang tepat.",
    diagnosis:"Pisahkan pelanggan yang kembali saat diskon dari pelanggan yang kembali karena menu, kebiasaan, lokasi, layanan, atau program loyalti.",
    actions:["Pilih satu segmen, misalnya pelanggan yang tidak order 21–30 hari.","Kirim satu pesan yang relevan dengan riwayatnya, bukan blast ke semua kontak.","Gunakan reward kecil yang mendorong perilaku sehat seperti bundling atau order kedua, bukan potongan harga tanpa batas."],
    measure:"Pantau margin setelah promo, repeat-order rate tanpa diskon, biaya reward per pelanggan, dan nilai pelanggan selama 30–90 hari.",
    keywords:["promo tanpa diskon", "pelanggan kembali tanpa diskon", "strategi retensi F&B", "loyalti pelanggan UMKM"],
    related:[{slug:"pelanggan-bilang-nanti-order-lagi",g:"g5",tag:"Tips Bisnis",title:"Pelanggan Bilang Nanti Order Lagi",excerpt:"Pahami mengapa mereka tidak kembali."},{slug:"program-loyalti-whatsapp-untuk-umkm",g:"g5",tag:"Panduan",title:"Program Loyalti WhatsApp",excerpt:"Reward yang sehat untuk margin."},{slug:"mengubah-chat-whatsapp-menjadi-pelanggan-setia",g:"g5",tag:"Tips Bisnis",title:"Mengubah Chat Menjadi Pelanggan Setia",excerpt:"Bangun retensi dari percakapan sehari-hari."}],
  }),
  "jam-ramai-adalah-ujian-sebenarnya": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"jam-ramai-adalah-ujian-sebenarnya",category:"Tips Bisnis",coverTitle:"Jam Ramai Menguji Sistem",
    title:"Jam Ramai Adalah Ujian Sebenarnya: Ketika Satu Chat Terlewat Bisa Menghilangkan Pelanggan",
    description:"Cara menata antrean chat, order, dapur, dan pickup saat jam ramai agar satu pesan terlewat tidak berubah menjadi pelanggan hilang.",
    problem:"Jam ramai tidak menciptakan masalah baru; ia memperbesar masalah yang sebelumnya tersembunyi. Satu chat tertunda, satu catatan pesanan hilang, atau satu status yang tidak diperbarui dapat membuat pelanggan menunggu tanpa kepastian.",
    answer:"Jam ramai dapat dikelola jika semua orang melihat antrean yang sama, status order diperbarui dengan jelas, dan pelanggan mendapat kepastian tanpa harus terus bertanya.",
    diagnosis:"Amati satu jam paling ramai: kapan chat masuk, kapan order tercatat, kapan dapur mulai, kapan selesai, dan kapan pelanggan menerima kabar.",
    actions:["Buat status sederhana: baru, diproses, siap diambil, selesai.","Tetapkan satu orang yang menjaga antrean chat dan satu orang yang mengonfirmasi status dapur.","Kirim pembaruan proaktif ketika estimasi berubah, sebelum pelanggan menanyakan statusnya."],
    measure:"Pantau waktu dari chat ke pencatatan order, estimasi versus waktu siap, jumlah pertanyaan status, order salah, dan komplain jam ramai.",
    keywords:["mengelola jam ramai kafe", "order tercecer", "antrean pesanan WhatsApp", "operasional warung ramai"],
    related:[{slug:"bongkar-chat-whatsapp-warung",g:"g3",tag:"Panduan",title:"Bongkar Chat WhatsApp Warung",excerpt:"Temukan order yang hilang karena telat balas."},{slug:"mengelola-pesanan-jam-ramai",g:"g6",tag:"Tips Bisnis",title:"Mengelola Pesanan Jam Ramai",excerpt:"Tips menjaga order tetap rapi."},{slug:"warung-tetap-jalan-saat-pemilik-libur",g:"g6",tag:"Tips Bisnis",title:"Warung Tetap Jalan",excerpt:"Sistem yang jelas membantu tim bertindak."}],
  }),
  "menu-paling-laku-bisa-profit-tipis": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"menu-paling-laku-bisa-profit-tipis",category:"Panduan",coverTitle:"Menu Laku Bisa Profit Tipis",
    title:"Jangan Bangga Dulu Kalau Menu Anda Paling Laku—Bisa Jadi Itu yang Membuat Profit Tipis",
    description:"Mengapa menu paling laku belum tentu paling menguntungkan dan cara membaca food cost, margin kontribusi, bundling, serta profit per menu F&B.",
    problem:"Menu terlaris sering menjadi kebanggaan usaha. Namun jika bahan mahal, porsi tidak konsisten, atau harga tidak mengikuti biaya, menu itu dapat membuat dapur sibuk sambil memperkecil keuntungan.",
    answer:"Menu paling laku baru benar-benar sehat jika popularitasnya disertai margin kontribusi yang cukup setelah biaya bahan, kemasan, diskon, dan kerja operasional dihitung.",
    diagnosis:"Bandingkan jumlah terjual, harga jual, biaya bahan, biaya kemasan, diskon, dan waktu produksi untuk tiga sampai lima menu utama.",
    actions:["Kelompokkan menu menjadi laku-margin tinggi, laku-margin tipis, jarang-margin tinggi, dan jarang-margin tipis.","Perbaiki menu laku-margin tipis dengan porsi, harga, add-on, atau bundling sebelum menambah promo.","Uji satu perubahan selama satu minggu dan jangan mengubah semua menu sekaligus."],
    measure:"Pantau food cost, margin kontribusi per menu, total kontribusi profit, waktu produksi, tingkat waste, dan hasil bundling.",
    keywords:["menu paling laku profit tipis", "food cost warung", "margin menu F&B", "cara menghitung profit menu"],
    related:[{slug:"mengetahui-menu-paling-laku-dan-menguntungkan",g:"g7",tag:"Panduan",title:"Menu Paling Laku dan Menguntungkan",excerpt:"Bedakan popularitas dan kontribusi profit."},{slug:"warung-ramai-belum-tentu-untung",g:"g7",tag:"Tips Bisnis",title:"Warung Ramai Belum Tentu Untung",excerpt:"Kenali sinyal usaha yang cuma sibuk."},{slug:"order-ramai-profit-tidak-naik",g:"g7",tag:"Tips Bisnis",title:"Order Ramai Tapi Profit Tidak Naik",excerpt:"Temukan kebocoran yang perlu ditutup."}],
  }),
  "kebiasaan-pelanggan-pindah": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"kebiasaan-pelanggan-pindah",category:"Tips Bisnis",coverTitle:"Kenapa Pelanggan Pindah?",
    title:"Bukan Kekurangan Pelanggan: 7 Kebiasaan Kecil yang Diam-Diam Membuat Pelanggan Pindah",
    description:"Tujuh kebiasaan layanan yang membuat pelanggan F&B tidak kembali: respons lambat, status tidak jelas, order salah, komplain defensif, dan follow-up yang tidak relevan.",
    problem:"Pelanggan jarang berkata, ‘saya pindah karena pengalaman kecil yang berulang.’ Mereka hanya tidak kembali. Karena itu kebiasaan kecil seperti balasan lambat, pesanan salah, dan komplain yang tidak ditangani dapat terasa lebih mahal daripada satu ulasan buruk.",
    answer:"Pelanggan sering pindah bukan karena satu kesalahan besar, melainkan karena usaha tidak memulihkan pengalaman kecil yang membuat mereka merasa tidak dihargai.",
    diagnosis:"Baca ulang komplain, chat berhenti, refund, dan pesanan yang perlu dibuat ulang. Cari masalah yang muncul dua kali atau lebih dalam seminggu.",
    actions:["Tentukan standar respons, status order, dan cara mengakui kesalahan secara cepat.","Berikan pemulihan yang proporsional: perbaikan order, informasi jujur, atau reward kecil bila memang layak.","Hubungi kembali pelanggan yang mengalami masalah setelah isu benar-benar diselesaikan."],
    measure:"Pantau komplain per 100 order, waktu tunggu, remake, pelanggan yang kembali setelah komplain, dan repeat-order rate.",
    keywords:["pelanggan pindah ke kompetitor", "mengatasi komplain pelanggan", "retensi pelanggan kafe", "kesalahan layanan F&B"],
    related:[{slug:"pelanggan-bilang-nanti-order-lagi",g:"g5",tag:"Tips Bisnis",title:"Pelanggan Tidak Pernah Kembali",excerpt:"Baca sinyal retensi dari pengalaman pelanggan."},{slug:"jam-ramai-adalah-ujian-sebenarnya",g:"g6",tag:"Tips Bisnis",title:"Jam Ramai Adalah Ujian",excerpt:"Kurangi kesalahan ketika tekanan tinggi."},{slug:"cara-menjaga-pelanggan-lama-lewat-whatsapp",g:"g5",tag:"Tips Bisnis",title:"Menjaga Pelanggan Lama",excerpt:"Follow-up personal tanpa spam."}],
  }),
  "bot-kaku-vs-ai-whatsapp": createTodayArticle({
    datePublished: "2026-07-14",
    slug:"bot-kaku-vs-ai-whatsapp",category:"Produk",coverTitle:"Bot Kaku vs AI yang Paham Chat",
    title:"Chatbot Bikin Pelanggan Kesal? Ini Bedanya Bot Kaku dan AI yang Paham Cara Orang Indonesia Chat",
    description:"Perbedaan chatbot skrip dan AI-native di WhatsApp untuk warung dan kafe: bahasa natural, konteks order, preferensi pelanggan, loyalti, serta insight bisnis.",
    problem:"Pelanggan Indonesia jarang memesan seperti mengisi formulir. Mereka menulis ‘yang kemarin tapi less sugar, ambil jam setengah satu.’ Jika sistem hanya mengenal pilihan 1, 2, atau 3, percakapan yang seharusnya memudahkan justru berubah menjadi hambatan.",
    answer:"Chatbot skrip mengikuti menu dan keyword; AI-native dirancang memahami maksud serta konteks percakapan lalu menghubungkannya dengan order, preferensi, dan proses bisnis.",
    diagnosis:"Uji chat Anda dengan permintaan yang natural: perubahan pesanan, bahasa campuran, referensi ke order sebelumnya, dan pertanyaan yang tidak ada di menu bot.",
    actions:["Pilih alur skrip untuk pertanyaan yang benar-benar tetap seperti alamat atau jam buka.","Untuk order yang memiliki modifikasi dan pelanggan berulang, pastikan konteks seperti menu favorit dan catatan khusus dapat dipakai.","Tetapkan batas aksi dan eskalasi ke manusia untuk stok tidak pasti, refund, dan komplain berat."],
    measure:"Pantau chat yang selesai tanpa bantuan manusia, waktu sampai order jelas, koreksi order, kepuasan pelanggan, dan jumlah konteks yang perlu diulang pelanggan.",
    keywords:["chatbot WhatsApp vs AI", "AI native WhatsApp", "chatbot kaku", "AI WhatsApp untuk UMKM"],
    related:[{slug:"ai-native-whatsapp-vs-chatbot",g:"g3",tag:"Produk",title:"AI-Native di WhatsApp vs Chatbot",excerpt:"Perbandingan kemampuan dan batasannya."},{slug:"bongkar-chat-whatsapp-warung",g:"g3",tag:"Panduan",title:"Bongkar Chat WhatsApp Warung",excerpt:"Chat yang rapi membantu order tidak hilang."},{slug:"otomatisasi-whatsapp-untuk-umkm-fnb",g:"g3",tag:"Panduan",title:"Otomatisasi WhatsApp",excerpt:"Kurangi kerja manual dari percakapan pelanggan."}],
  }),
  "naikkan-harga-menu-tanpa-kehilangan-pelanggan": createTodayArticle({
    datePublished: "2026-07-18",
    slug:"naikkan-harga-menu-tanpa-kehilangan-pelanggan", category:"Panduan", coverTitle:"Naikkan Harga Menu dengan Tepat",
    title:"Cara Naikkan Harga Menu Tanpa Membuat Pelanggan Langsung Pergi",
    description:"Panduan menaikkan harga menu warung dan kafe dengan menghitung biaya, margin, komunikasi pelanggan, serta pengujian harga secara bertahap.",
    problem:"Saat harga bahan naik, banyak pemilik F&B menunda menaikkan harga karena takut pelanggan pergi. Akibatnya margin terus menipis. Menahan harga terlalu lama sering lebih berisiko daripada melakukan penyesuaian yang jelas dan terukur.",
    answer:"Naikkan harga menu berdasarkan biaya dan margin yang dihitung, lalu lakukan secara bertahap sambil menjaga kualitas, pilihan menu, dan komunikasi yang jujur kepada pelanggan.",
    diagnosis:"Bandingkan harga jual dengan biaya bahan, kemasan, komisi kanal, dan waktu produksi. Tandai menu yang margin kontribusinya paling tipis atau yang biaya bahannya paling cepat berubah.",
    actions:["Hitung ulang biaya per porsi untuk menu utama sebelum menentukan kenaikan harga.","Uji perubahan pada satu atau dua menu, bukan seluruh menu sekaligus.","Tawarkan ukuran, bundling, atau add-on yang memberi pilihan tanpa menurunkan kualitas utama."],
    measure:"Pantau margin kontribusi, jumlah item terjual, komplain harga, nilai rata-rata order, dan repeat-order rate sebelum serta sesudah perubahan.",
    keywords:["naikkan harga menu", "harga menu warung", "margin kafe", "biaya bahan F&B", "strategi harga UMKM"],
    related:[{slug:"menu-paling-laku-bisa-profit-tipis",g:"g7",tag:"Panduan",title:"Menu Laku Bisa Profit Tipis",excerpt:"Baca margin setiap menu sebelum mengambil keputusan."},{slug:"mengetahui-menu-paling-laku-dan-menguntungkan",g:"g7",tag:"Panduan",title:"Menu Paling Laku dan Menguntungkan",excerpt:"Bedakan popularitas dan kontribusi profit."},{slug:"warung-ramai-belum-tentu-untung",g:"g7",tag:"Tips Bisnis",title:"Warung Ramai Belum Tentu Untung",excerpt:"Tutup kebocoran agar kesibukan menjadi pertumbuhan."}],
  }),
  "stok-habis-saat-order-ramai": createTodayArticle({
    datePublished: "2026-07-18",
    slug:"stok-habis-saat-order-ramai", category:"Tips Bisnis", coverTitle:"Stok Tidak Habis Saat Ramai",
    title:"Stok Habis Saat Order Ramai? Cara Menjaga Menu Tetap Siap Tanpa Belanja Berlebihan",
    description:"Cara mengelola stok bahan UMKM F&B agar menu tidak habis saat ramai tanpa membuat modal tertahan terlalu besar di gudang.",
    problem:"Stok habis pada jam ramai membuat pelanggan kecewa dan staf panik. Sebaliknya, belanja berlebihan membuat modal tertahan dan bahan berisiko terbuang. Yang dibutuhkan bukan stok sebanyak mungkin, melainkan sinyal kapan harus membeli lagi.",
    answer:"Stok lebih aman ketika usaha mengetahui pemakaian rata-rata, stok minimum, waktu belanja ulang, dan menu mana yang harus diprioritaskan saat bahan menipis.",
    diagnosis:"Catat bahan yang paling sering habis, jam saat habis terjadi, menu penyebabnya, dan berapa order yang tidak bisa dilayani akibat stok kosong.",
    actions:["Tentukan stok minimum untuk lima bahan yang paling menentukan menu terlaris.","Hubungkan daftar bahan kritis dengan prediksi pemakaian dari order harian.","Siapkan alternatif menu atau substitusi yang sudah disetujui sebelum stok benar-benar habis."],
    measure:"Pantau kejadian stok kosong, order yang ditolak, waste bahan, nilai belanja mendadak, dan perputaran stok per minggu.",
    keywords:["stok habis saat ramai", "manajemen stok warung", "stok bahan kafe", "forecasting stok F&B", "menu habis"],
    related:[{slug:"jam-ramai-adalah-ujian-sebenarnya",g:"g6",tag:"Tips Bisnis",title:"Jam Ramai Adalah Ujian",excerpt:"Atur status dan antrean saat tekanan tinggi."},{slug:"laporan-penjualan-harian",g:"g7",tag:"Panduan",title:"Laporan Penjualan Harian",excerpt:"Gunakan angka harian untuk keputusan yang lebih tepat."},{slug:"menu-paling-laku-bisa-profit-tipis",g:"g7",tag:"Panduan",title:"Menu Laku Bisa Profit Tipis",excerpt:"Hubungkan permintaan menu dengan biaya dan stok."}],
  }),
  "menangani-komplain-pelanggan-lewat-whatsapp": createTodayArticle({
    datePublished: "2026-07-18",
    slug:"menangani-komplain-pelanggan-lewat-whatsapp", category:"Panduan", coverTitle:"Komplain Bisa Menjadi Kepercayaan",
    title:"Cara Menangani Komplain Pelanggan Lewat WhatsApp Tanpa Memperbesar Masalah",
    description:"Framework menangani komplain WhatsApp untuk warung dan kafe: dengarkan, verifikasi, selesaikan, dan follow-up agar pelanggan tidak hilang.",
    problem:"Komplain lewat WhatsApp terasa lebih menegangkan karena pelanggan dapat menulis kapan saja dan pesan mudah disalahartikan. Respons defensif atau terlalu lambat sering membuat masalah kecil berubah menjadi alasan pelanggan tidak kembali.",
    answer:"Tangani komplain dengan cepat, akui pengalaman pelanggan, verifikasi detail order, tawarkan solusi yang proporsional, lalu follow-up setelah masalah selesai.",
    diagnosis:"Kelompokkan komplain selama satu minggu: salah order, kualitas, keterlambatan, pembayaran, atau komunikasi. Cari penyebab proses yang sama, bukan hanya menyelesaikan satu chat.",
    actions:["Balas dengan pengakuan yang jelas sebelum menjelaskan atau menyalahkan proses.","Cek riwayat order dan bukti yang relevan agar solusi sesuai masalahnya.","Tutup percakapan dengan tindakan, waktu penyelesaian, dan follow-up singkat setelah pelanggan menerima solusi."],
    measure:"Pantau waktu respons komplain, waktu penyelesaian, remake atau refund, pelanggan yang kembali setelah komplain, dan jenis masalah yang berulang.",
    keywords:["menangani komplain WhatsApp", "komplain pelanggan kafe", "customer recovery F&B", "layanan pelanggan warung", "pelanggan kembali setelah komplain"],
    related:[{slug:"kebiasaan-pelanggan-pindah",g:"g5",tag:"Tips Bisnis",title:"Kebiasaan yang Membuat Pelanggan Pindah",excerpt:"Cegah masalah kecil berulang sebelum pelanggan pergi."},{slug:"pelanggan-bilang-nanti-order-lagi",g:"g5",tag:"Tips Bisnis",title:"Pelanggan Tidak Kembali",excerpt:"Bangun pengalaman yang membuat pelanggan ingin kembali."},{slug:"cara-menjaga-pelanggan-lama-lewat-whatsapp",g:"g5",tag:"Tips Bisnis",title:"Menjaga Pelanggan Lama",excerpt:"Follow-up yang relevan tanpa spam."}],
  }),
  "meningkatkan-nilai-order-tanpa-memaksa": createTodayArticle({
    datePublished: "2026-07-18",
    slug:"meningkatkan-nilai-order-tanpa-memaksa", category:"Panduan", coverTitle:"Naikkan Nilai Order dengan Relevan",
    title:"Cara Meningkatkan Nilai Order Pelanggan Tanpa Terasa Memaksa",
    description:"Cara meningkatkan average order value warung dan kafe melalui bundling, add-on relevan, dan rekomendasi yang membantu pelanggan, bukan hard selling.",
    problem:"Menawarkan tambahan sering terasa canggung bagi staf dan pelanggan. Namun jika rekomendasi benar-benar cocok dengan pesanan, pelanggan justru terbantu. Kuncinya bukan menjual lebih banyak pada semua orang, tetapi menawarkan pilihan yang relevan.",
    answer:"Nilai order naik secara sehat ketika bundling dan add-on relevan dengan pesanan utama, mudah dipahami, dan tetap memberi nilai bagi pelanggan.",
    diagnosis:"Lihat kombinasi menu yang sering dibeli bersama, item dengan margin sehat, serta titik pesanan ketika pelanggan paling terbuka menerima rekomendasi.",
    actions:["Pilih tiga pasangan menu yang memang sering dibeli bersama.","Tampilkan satu rekomendasi relevan setelah pesanan utama jelas, bukan daftar panjang pilihan.","Uji bundling dengan nilai yang mudah dimengerti dan bandingkan dengan pembelian satuan."],
    measure:"Pantau average order value, attach rate add-on, kontribusi margin bundle, tingkat penerimaan rekomendasi, dan kepuasan pelanggan.",
    keywords:["meningkatkan nilai order", "average order value F&B", "bundling menu warung", "upselling kafe", "add on menu"],
    related:[{slug:"menu-paling-laku-bisa-profit-tipis",g:"g7",tag:"Panduan",title:"Menu Laku Bisa Profit Tipis",excerpt:"Gunakan margin untuk memilih bundle yang sehat."},{slug:"meningkatkan-penjualan-profit-fnb-kecil",g:"g7",tag:"Panduan",title:"Meningkatkan Penjualan & Profit",excerpt:"Ubah data order menjadi keputusan bisnis."},{slug:"promo-terus-bukan-solusi",g:"g5",tag:"Tips Bisnis",title:"Promo Terus Bukan Solusi",excerpt:"Naikkan nilai tanpa membiasakan diskon massal."}],
  }),
};

/* ----- the articles ----- */

export const ARTICLES: Record<string, Article> = {
  ...TODAY_ARTICLES,
  "mengubah-chat-whatsapp-menjadi-pelanggan-setia": {
    title: "Cara Mengubah Chat WhatsApp Menjadi Pelanggan Setia untuk Bisnis F&B",
    category: "Tips Bisnis",
    readTime: "7 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Ubah Chat WhatsApp Menjadi Pelanggan Setia",
    keywords: [
      "chat WhatsApp jadi pelanggan setia",
      "retensi pelanggan F&B",
      "loyalitas pelanggan WhatsApp",
      "repeat order UMKM",
      "memori pelanggan",
    ],
    faq: [
      {
        q: "Bagaimana chat WhatsApp bisa menghasilkan pelanggan setia?",
        a: "Ubah setiap chat menjadi konteks yang bisa dipakai kembali—mengenali pesanan favorit, catatan rasa, dan waktu pembelian—sehingga pelanggan tidak perlu mengulang dan lebih mudah kembali.",
      },
      {
        q: "Data pelanggan apa saja yang perlu dicatat dari WhatsApp?",
        a: "Empat lapisan: identitas (nama, nomor, kanal order), preferensi (menu favorit, level gula/pedas, alergi), perilaku (frekuensi, jam, nilai order), dan riwayat layanan (komplain serta cara penyelesaiannya).",
      },
      {
        q: "Bagaimana follow-up agar tidak menjadi spam?",
        a: "Gunakan pemicu yang punya alasan jelas—hampir mencapai reward, menu favorit tersedia lagi, atau sudah melewati pola jarak order—batasi frekuensi, dan sediakan cara mudah untuk berhenti.",
      },
    ],
    description:
      "Cara mengubah percakapan WhatsApp menjadi hubungan pelanggan yang berkelanjutan melalui data preferensi, follow-up relevan, dan pengalaman yang konsisten.",
    lede: (
      <>
        Pelanggan setia jarang terbentuk karena satu promo besar. Mereka kembali
        karena merasa dikenali, pesanannya mudah, dan pengalaman berikutnya sama
        baiknya. Chat WhatsApp sebenarnya menyimpan sinyal itu, tetapi nilainya
        hilang jika percakapan selesai tanpa menjadi ingatan bisnis.
      </>
    ),
    tldr: [
      "Chat perlu diubah menjadi memori pelanggan: identitas, preferensi, riwayat order, dan waktu kunjungan.",
      "Follow-up terbaik dipicu oleh konteks, bukan dikirim massal ke semua kontak.",
      "Kecepatan order ulang dan konsistensi layanan lebih penting daripada sering memberi diskon.",
      "Ukur repeat order, jarak antar-order, dan nilai pelanggan—bukan hanya jumlah chat.",
      "Pendekatan AI-native memahami konteks percakapan; chatbot skrip hanya mengikuti alur yang sudah ditentukan.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Bagaimana chat WhatsApp bisa menghasilkan pelanggan setia?",
        toc: "Jawaban singkat",
        body: (
          <p>
            Caranya adalah mengubah setiap chat menjadi konteks yang bisa dipakai
            kembali. Ketika usaha mengenali pesanan favorit, catatan rasa, waktu
            pembelian, dan masalah sebelumnya, pelanggan tidak perlu mengulang
            semuanya. Kemudahan inilah yang perlahan membentuk kebiasaan kembali.
          </p>
        ),
      },
      {
        id: "empat-lapisan",
        heading: "Empat lapisan memori pelanggan yang perlu dibangun",
        toc: "Memori pelanggan",
        body: (
          <>
            <p>Jangan mulai dari broadcast. Mulailah dari data yang membuat layanan berikutnya lebih baik:</p>
            <ul>
              <li><b>Identitas:</b> nama, nomor, dan kanal order.</li>
              <li><b>Preferensi:</b> menu favorit, level pedas, gula, alergi, serta metode pengambilan.</li>
              <li><b>Perilaku:</b> frekuensi order, jam pembelian, nilai transaksi, dan respons terhadap penawaran.</li>
              <li><b>Riwayat layanan:</b> komplain, penggantian order, dan cara masalah diselesaikan.</li>
            </ul>
            <p>Data secukupnya lebih berguna daripada profil panjang yang tidak pernah dipakai.</p>
          </>
        ),
      },
      {
        id: "follow-up",
        heading: "Follow-up relevan tanpa berubah menjadi spam",
        toc: "Follow-up relevan",
        body: (
          <>
            <p>
              Gunakan pemicu yang punya alasan jelas: pelanggan hampir mencapai
              reward, menu favorit tersedia lagi, atau sudah melewati pola jarak
              order biasanya. Batasi frekuensi dan berikan jalan mudah untuk berhenti.
            </p>
            <p>
              Pesan “kopi susu less sugar favorit Kak Rina tersedia lagi” jauh
              lebih bernilai daripada promo umum yang dikirim setiap hari.
            </p>
          </>
        ),
      },
      {
        id: "metrik",
        heading: "Metrik yang menunjukkan hubungan pelanggan benar-benar tumbuh",
        toc: "Metrik retensi",
        body: (
          <ul>
            <li><b>Repeat-order rate:</b> proporsi pelanggan yang kembali dalam periode tertentu.</li>
            <li><b>Jarak antar-order:</b> apakah pelanggan kembali lebih cepat atau makin menjauh.</li>
            <li><b>Nilai pelanggan:</b> total kontribusi selama beberapa bulan, bukan satu struk.</li>
            <li><b>Recovery rate:</b> berapa pelanggan yang kembali setelah komplain diselesaikan.</li>
          </ul>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Peran Sosmed AI dalam menjaga konteks pelanggan",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI dirancang agar percakapan, order, preferensi, dan loyalitas
              dapat tersambung langsung di WhatsApp. Pemilik usaha mendapat konteks
              yang berguna tanpa menyalin chat ke catatan lain setiap hari.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "program-loyalti-whatsapp-untuk-umkm", g: "g5", tag: "Panduan", title: "Program Loyalti WhatsApp untuk UMKM", excerpt: "Poin, reward, dan repeat order tanpa kartu member." },
      { slug: "cara-menjaga-pelanggan-lama-lewat-whatsapp", g: "g5", tag: "Tips Bisnis", title: "Menjaga Pelanggan Lama Lewat WhatsApp", excerpt: "Retensi yang personal dan relevan tanpa spam." },
      { slug: "ai-native-whatsapp-vs-chatbot", g: "g3", tag: "Produk", title: "AI-Native di WhatsApp vs Chatbot", excerpt: "Memahami perbedaan pengalaman dan kemampuan keduanya." },
    ],
  },

  "order-ramai-profit-tidak-naik": {
    title: "Order Ramai tapi Profit Tidak Naik? Ini 7 Kebocoran di Warung dan Kafe",
    category: "Tips Bisnis",
    readTime: "8 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Order Ramai, Kenapa Profit Tidak Naik?",
    keywords: [
      "order ramai profit tidak naik",
      "kebocoran profit warung",
      "margin F&B",
      "profit kafe",
      "hitung untung per menu",
    ],
    faq: [
      {
        q: "Mengapa order ramai belum tentu membuat profit naik?",
        a: "Karena setiap order membawa pendapatan sekaligus biaya. Profit tidak naik ketika tambahan pendapatan habis untuk bahan, promo, komisi, pemborosan, remake, dan pelanggan yang hanya membeli sekali.",
      },
      {
        q: "Apa saja kebocoran profit yang paling sering terjadi?",
        a: "Tujuh kebocoran utama: diskon tanpa batas, order batal, waste, salah order, biaya kanal, menu ramai bermargin tipis, dan pelanggan yang tidak kembali.",
      },
      {
        q: "Kebocoran mana yang harus diperbaiki lebih dulu?",
        a: "Kalikan kerugian per kejadian dengan frekuensinya; masalah yang sering dan mahal menjadi prioritas pertama, bukan sekadar insiden terbesar.",
      },
    ],
    description:
      "Kenali tujuh kebocoran yang membuat order ramai tidak berubah menjadi profit: diskon, pembatalan, waste, salah order, komisi, menu margin rendah, dan pelanggan yang tidak kembali.",
    lede: (
      <>
        Antrean panjang dan notifikasi order bisa terlihat seperti pertumbuhan.
        Namun omzet bukan uang yang benar-benar tersisa. Jika biaya, kesalahan,
        dan diskon naik bersama volume, usaha bisa makin sibuk tanpa makin sehat.
      </>
    ),
    tldr: [
      "Profit perlu dilihat per order dan per menu, bukan hanya dari omzet harian.",
      "Tujuh kebocoran utama adalah diskon, pembatalan, waste, salah order, biaya kanal, menu margin rendah, dan retensi buruk.",
      "Catat penyebab kebocoran agar tindakan perbaikannya tepat.",
      "Prioritaskan kebocoran berdasarkan nilai rupiah dan frekuensi.",
      "Data chat dan order yang rapi membantu menemukan pola tanpa rekap manual.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Mengapa order ramai belum tentu membuat profit naik?",
        toc: "Jawaban singkat",
        body: (
          <p>
            Karena setiap order membawa pendapatan sekaligus biaya. Profit tidak
            naik ketika tambahan pendapatan habis untuk bahan, promo, komisi,
            pemborosan, remake, dan pelanggan yang hanya membeli sekali.
          </p>
        ),
      },
      {
        id: "tujuh-kebocoran",
        heading: "Tujuh kebocoran yang paling sering tidak terlihat",
        toc: "7 kebocoran profit",
        body: (
          <ol>
            <li><b>Diskon tanpa batas:</b> penjualan naik, tetapi margin hilang.</li>
            <li><b>Order batal:</b> waktu dan bahan sudah disiapkan tanpa pendapatan.</li>
            <li><b>Waste:</b> bahan kedaluwarsa, porsi berlebih, dan produk tidak terjual.</li>
            <li><b>Salah order:</b> remake, refund, dan kepercayaan pelanggan turun.</li>
            <li><b>Biaya kanal:</b> komisi dan promo platform tidak masuk perhitungan harga.</li>
            <li><b>Menu ramai bermargin tipis:</b> dapur sibuk untuk kontribusi kecil.</li>
            <li><b>Pelanggan tidak kembali:</b> biaya mendapatkan order terus berulang dari nol.</li>
          </ol>
        ),
      },
      {
        id: "prioritas",
        heading: "Cara menentukan kebocoran mana yang diperbaiki lebih dulu",
        toc: "Menentukan prioritas",
        body: (
          <>
            <p>
              Nilai setiap masalah dengan dua angka: kerugian per kejadian dan
              frekuensi kejadian. Kalikan keduanya untuk mendapat estimasi dampak.
              Masalah yang sering dan mahal menjadi prioritas pertama.
            </p>
            <p>
              Contoh: remake Rp25.000 sebanyak 20 kali lebih mendesak daripada
              satu pembatalan Rp100.000. Perbaiki pola, bukan hanya insiden terbesar.
            </p>
          </>
        ),
      },
      {
        id: "ritme-review",
        heading: "Ritme review sederhana agar profit tidak bocor lagi",
        toc: "Ritme review",
        body: (
          <ul>
            <li>Harian: order batal, remake, diskon, dan waste.</li>
            <li>Mingguan: margin per menu, biaya kanal, dan jam paling produktif.</li>
            <li>Bulanan: repeat order, perubahan harga bahan, dan kontribusi tiap kanal.</li>
          </ul>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Dari chat menjadi sinyal kebocoran bisnis",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Ketika order dari WhatsApp tercatat secara konsisten, pola pembatalan,
              diskon, menu, dan pelanggan bisa dibaca tanpa rekap manual. Sosmed AI
              dirancang untuk merapikan konteks tersebut menjadi ringkasan yang berguna.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "mengetahui-menu-paling-laku-dan-menguntungkan", g: "g7", tag: "Panduan", title: "Menu Paling Laku dan Paling Menguntungkan", excerpt: "Bedakan popularitas, margin, dan kontribusi menu." },
      { slug: "meningkatkan-penjualan-profit-fnb-kecil", g: "g7", tag: "Panduan", title: "Meningkatkan Penjualan & Profit F&B", excerpt: "Gunakan data order harian untuk keputusan yang lebih sehat." },
      { slug: "laporan-penjualan-harian", g: "g7", tag: "Panduan", title: "Laporan Penjualan Harian", excerpt: "Angka penting yang perlu dipantau setiap hari." },
    ],
  },

  "program-loyalti-whatsapp-untuk-umkm": {
    title: "Program Loyalti WhatsApp untuk UMKM: Poin, Reward, dan Repeat Order",
    category: "Panduan",
    readTime: "7 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Program Loyalti Langsung di WhatsApp",
    keywords: [
      "program loyalti WhatsApp",
      "poin pelanggan UMKM",
      "reward F&B",
      "repeat order",
      "loyalitas tanpa kartu member",
    ],
    faq: [
      {
        q: "Seperti apa program loyalti WhatsApp yang efektif?",
        a: "Aturannya singkat, progres terlihat, reward dapat dicapai, dan pencatatan otomatis. Pelanggan cukup memakai nomor WhatsApp—tanpa kartu member atau aplikasi tambahan.",
      },
      {
        q: "Bagaimana menghitung biaya reward agar tetap sehat?",
        a: "Gunakan biaya produksi reward, bukan harga jualnya, dan pastikan tambahan margin dari pembelian yang dibutuhkan untuk mencapai reward lebih besar daripada biaya reward serta biaya operasional program.",
      },
      {
        q: "Kapan poin sebaiknya diberikan?",
        a: "Poin masuk setelah order selesai dan pembayaran terkonfirmasi, dan refund mengembalikan poin yang sudah diberikan.",
      },
    ],
    description:
      "Panduan merancang program loyalti WhatsApp untuk UMKM dengan poin dan reward yang mudah dipahami, sehat untuk margin, dan mendorong repeat order.",
    lede: (
      <>
        Program loyalti gagal bukan karena pelanggan tidak suka hadiah. Biasanya
        sistemnya terlalu rumit, reward terasa terlalu jauh, atau pencatatannya
        menambah kerja kasir. Program terbaik terasa sederhana bagi pelanggan dan pemilik.
      </>
    ),
    tldr: [
      "Tetapkan satu perilaku utama: membuat pelanggan kembali lebih cepat atau lebih sering.",
      "Reward harus terasa bernilai bagi pelanggan tetapi biayanya tetap terkendali.",
      "Progres perlu terlihat dan mudah dicek langsung di WhatsApp.",
      "Jangan memberi poin untuk transaksi yang dibatalkan atau direfund.",
      "Ukur redemption, repeat rate, jarak antar-order, dan biaya reward.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Seperti apa program loyalti WhatsApp yang efektif?",
        toc: "Jawaban singkat",
        body: (
          <p>
            Program yang efektif memiliki aturan singkat, progres yang terlihat,
            reward yang dapat dicapai, dan pencatatan otomatis. Pelanggan cukup
            memakai nomor WhatsApp—tanpa kartu member atau aplikasi tambahan.
          </p>
        ),
      },
      {
        id: "desain-program",
        heading: "Rancang dari perilaku yang ingin diubah",
        toc: "Desain program",
        body: (
          <>
            <p>
              Tentukan tujuan sebelum menentukan poin. Jika pelanggan biasanya
              kembali setiap 20 hari, program dapat dirancang untuk mendekatkan
              kunjungan berikutnya. Jika nilai transaksi kecil, reward dapat mendorong bundling.
            </p>
            <ul>
              <li><b>Stempel:</b> cocok untuk menu dan harga yang relatif seragam.</li>
              <li><b>Poin berbasis nilai:</b> cocok untuk variasi nilai transaksi.</li>
              <li><b>Tier:</b> cocok setelah basis pelanggan aktif sudah cukup besar.</li>
            </ul>
          </>
        ),
      },
      {
        id: "ekonomi-reward",
        heading: "Hitung biaya reward sebelum program diluncurkan",
        toc: "Ekonomi reward",
        body: (
          <p>
            Gunakan biaya produksi reward, bukan harga jualnya. Pastikan tambahan
            margin dari pembelian yang dibutuhkan untuk mencapai reward lebih besar
            daripada biaya reward dan biaya operasional program. Hindari reward
            yang mendorong kunjungan tetapi membuat setiap kunjungan merugi.
          </p>
        ),
      },
      {
        id: "anti-ribet",
        heading: "Aturan minimum agar pelanggan dan staf tidak bingung",
        toc: "Aturan minimum",
        body: (
          <ul>
            <li>Satu nomor WhatsApp mewakili satu akun pelanggan.</li>
            <li>Poin masuk setelah order selesai dan pembayaran terkonfirmasi.</li>
            <li>Refund mengembalikan poin yang sudah diberikan.</li>
            <li>Masa berlaku dan pengecualian disampaikan dengan bahasa sederhana.</li>
            <li>Pelanggan dapat mengecek progres kapan saja melalui chat.</li>
          </ul>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Loyalti yang berjalan di percakapan pelanggan",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI dirancang menghubungkan order, identitas pelanggan, poin,
              dan reward di WhatsApp. Tujuannya agar loyalti tidak menjadi spreadsheet
              baru yang harus dijaga manual setiap selesai transaksi.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "mengubah-chat-whatsapp-menjadi-pelanggan-setia", g: "g5", tag: "Tips Bisnis", title: "Mengubah Chat Menjadi Pelanggan Setia", excerpt: "Bangun memori pelanggan dari percakapan sehari-hari." },
      { slug: "sistem-poin-sederhana", g: "g5", tag: "Panduan", title: "Sistem Poin Sederhana untuk F&B", excerpt: "Dasar program poin yang ringan dijalankan." },
      { slug: "cara-menjaga-pelanggan-lama-lewat-whatsapp", g: "g5", tag: "Tips Bisnis", title: "Menjaga Pelanggan Lama Tanpa Spam", excerpt: "Follow-up yang personal, relevan, dan terukur." },
    ],
  },

  "mengetahui-menu-paling-laku-dan-menguntungkan": {
    title: "Cara Mengetahui Menu Paling Laku dan Paling Menguntungkan dari WhatsApp",
    category: "Panduan",
    readTime: "8 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Menu Laku Belum Tentu Paling Untung",
    keywords: [
      "menu paling laku",
      "menu paling menguntungkan",
      "margin menu F&B",
      "analisis menu WhatsApp",
      "menu engineering UMKM",
    ],
    faq: [
      {
        q: "Bagaimana menentukan menu yang benar-benar menguntungkan?",
        a: "Hitung margin kontribusi per item—harga jual dikurangi biaya bahan, kemasan, dan biaya transaksi—lalu kalikan dengan jumlah terjual, dan bandingkan dengan popularitas serta beban operasional menu.",
      },
      {
        q: "Apa bedanya menu populer dan menu menguntungkan?",
        a: "Menu paling sering dipesan belum tentu paling menguntungkan; bisa jadi penjualannya tinggi tetapi bahannya mahal, pengerjaannya lama, atau sering terkena diskon.",
      },
      {
        q: "Bagaimana cara mengelompokkan menu?",
        a: "Menjadi empat kelompok: bintang (laku & margin tinggi), kuda kerja (laku tetapi margin tipis), teka-teki (margin tinggi tetapi jarang dipesan), dan beban (tidak laku & margin rendah).",
      },
    ],
    description:
      "Cara membaca data order WhatsApp untuk membedakan menu populer, menu bermargin tinggi, dan menu dengan kontribusi profit terbesar.",
    lede: (
      <>
        Menu paling sering dipesan belum tentu paling menguntungkan. Bisa jadi
        penjualannya tinggi tetapi bahan mahal, pengerjaannya lama, atau sering
        terkena diskon. Keputusan menu yang sehat membutuhkan lebih dari angka terjual.
      </>
    ),
    tldr: [
      "Pisahkan popularitas, margin per item, dan total kontribusi profit.",
      "Hitung biaya bahan dan kemasan secara konsisten untuk setiap porsi.",
      "Kelompokkan menu menjadi bintang, kuda kerja, teka-teki, dan beban.",
      "Gunakan bundling untuk memasangkan menu populer dengan menu bermargin sehat.",
      "Masukkan waktu produksi dan tingkat kesalahan sebagai biaya operasional tersembunyi.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Bagaimana menentukan menu yang benar-benar menguntungkan?",
        toc: "Jawaban singkat",
        body: (
          <p>
            Hitung margin kontribusi per item—harga jual dikurangi biaya bahan,
            kemasan, dan biaya transaksi—lalu kalikan dengan jumlah terjual.
            Bandingkan hasilnya dengan popularitas serta beban operasional menu.
          </p>
        ),
      },
      {
        id: "empat-kelompok",
        heading: "Kelompokkan menu berdasarkan popularitas dan margin",
        toc: "4 kelompok menu",
        body: (
          <ul>
            <li><b>Bintang:</b> laku dan margin tinggi—jaga kualitas serta ketersediaannya.</li>
            <li><b>Kuda kerja:</b> laku tetapi margin tipis—perbaiki porsi, harga, atau bundling.</li>
            <li><b>Teka-teki:</b> margin tinggi tetapi jarang dipesan—perbaiki nama, foto, dan posisi.</li>
            <li><b>Beban:</b> tidak laku dan margin rendah—evaluasi untuk diubah atau dihentikan.</li>
          </ul>
        ),
      },
      {
        id: "biaya-tersembunyi",
        heading: "Jangan abaikan biaya yang tidak terlihat di resep",
        toc: "Biaya tersembunyi",
        body: (
          <p>
            Menu dengan bahan murah dapat tetap membebani usaha jika membutuhkan
            waktu lama, alat khusus, banyak langkah, atau sering dibuat ulang.
            Tambahkan waktu produksi, waste, komisi kanal, dan tingkat komplain
            ketika membandingkan profitabilitas nyata.
          </p>
        ),
      },
      {
        id: "tindakan",
        heading: "Tindakan berbeda untuk setiap kelompok menu",
        toc: "Tindakan menu",
        body: (
          <>
            <p>
              Dorong menu bintang di urutan awal menu digital. Pasangkan kuda kerja
              dengan add-on bermargin tinggi. Uji ulang nama dan presentasi menu
              teka-teki. Untuk menu beban, lakukan eksperimen terbatas sebelum menghapusnya.
            </p>
            <p>Ubah satu variabel dalam satu waktu agar hasil pengujian dapat dibaca.</p>
          </>
        ),
      },
      {
        id: "peran-sosmed-ai",
        heading: "Mengubah order WhatsApp menjadi keputusan menu",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI dirancang membantu mengubah percakapan order menjadi data
              item, jumlah, pelanggan, dan tren. Pemilik dapat melihat pola menu
              tanpa menghitung ulang setiap chat secara manual.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "order-ramai-profit-tidak-naik", g: "g7", tag: "Tips Bisnis", title: "Order Ramai tapi Profit Tidak Naik?", excerpt: "Temukan tujuh kebocoran profit yang sering tersembunyi." },
      { slug: "meningkatkan-penjualan-profit-fnb-kecil", g: "g7", tag: "Panduan", title: "Meningkatkan Penjualan & Profit F&B", excerpt: "Gunakan data harian untuk keputusan bisnis." },
      { slug: "menu-digital-mudah-dipesan", g: "g4", tag: "Tips Bisnis", title: "Menu Digital yang Mudah Dipesan", excerpt: "Susun menu agar pelanggan cepat menentukan pilihan." },
    ],
  },

  "ai-native-whatsapp-vs-chatbot": {
    title: "AI-Native di WhatsApp vs Chatbot: Mana yang Cocok untuk UMKM F&B?",
    category: "Produk",
    readTime: "8 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "AI-Native di WhatsApp vs Chatbot",
    keywords: [
      "AI-native WhatsApp",
      "chatbot vs AI",
      "otomatisasi WhatsApp UMKM",
      "AI F&B Indonesia",
      "chatbot skrip",
    ],
    faq: [
      {
        q: "Apa perbedaan AI-native di WhatsApp dan chatbot?",
        a: "Chatbot berbasis skrip mencocokkan input dengan menu, keyword, atau pohon keputusan; sistem AI-native menafsirkan maksud, mempertahankan konteks percakapan, dan memakainya untuk membantu order, pelanggan, loyalitas, serta laporan.",
      },
      {
        q: "Kapan bisnis membutuhkan pendekatan AI-native?",
        a: "Ketika variasi bahasa pelanggan tinggi, order memiliki banyak modifikasi, pelanggan sering kembali, dan data chat perlu menggerakkan proses lain. Jika kebutuhan hanya beberapa pertanyaan statis, solusi lebih sederhana bisa cukup.",
      },
      {
        q: "Apakah AI-native berarti AI bertindak tanpa batas?",
        a: "Tidak. Harga, stok, dan promo harus berasal dari data usaha yang disetujui, perubahan order perlu dikonfirmasi, kasus berat dapat dialihkan ke manusia, dan riwayat tindakan dapat diperiksa pemilik.",
      },
    ],
    description:
      "Perbedaan chatbot berbasis skrip dan sistem AI-native di WhatsApp untuk order, konteks pelanggan, loyalitas, serta insight bisnis UMKM F&B.",
    lede: (
      <>
        Tidak semua otomatisasi percakapan bekerja dengan cara yang sama. Chatbot
        mengikuti jalur yang sudah ditentukan. Sistem AI-native dirancang memahami
        maksud percakapan, menjaga konteks, dan menghubungkannya dengan pekerjaan bisnis.
      </>
    ),
    tldr: [
      "Chatbot cocok untuk pertanyaan sempit dengan pilihan yang stabil dan terstruktur.",
      "AI-native lebih cocok ketika pelanggan menggunakan bahasa bebas dan sering mengubah detail order.",
      "Perbedaan utamanya terletak pada konteks, fleksibilitas, dan koneksi ke proses bisnis.",
      "AI tetap membutuhkan aturan, batas tindakan, validasi, dan jalur eskalasi ke manusia.",
      "Sosmed AI bukan chatbot; produk dirancang AI-native langsung di WhatsApp.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Apa perbedaan AI-native di WhatsApp dan chatbot?",
        toc: "Jawaban singkat",
        body: (
          <p>
            Chatbot berbasis skrip mencocokkan input dengan menu, keyword, atau
            pohon keputusan. Sistem AI-native menafsirkan maksud, mempertahankan
            konteks percakapan, dan memakai konteks tersebut untuk membantu order,
            pelanggan, loyalitas, serta laporan.
          </p>
        ),
      },
      {
        id: "perbandingan",
        heading: "Perbandingan dalam situasi nyata warung dan kafe",
        toc: "Perbandingan nyata",
        body: (
          <>
            <p>
              Pelanggan jarang berbicara seperti formulir. Mereka bisa menulis:
              “yang kemarin tapi less sugar, ambil jam setengah satu.” Chatbot
              membutuhkan opsi dan kata kunci yang tepat. AI-native dapat memakai
              riwayat serta konteks untuk memahami menu, modifikasi, dan waktu pengambilan.
            </p>
            <p>
              Namun untuk pertanyaan tetap seperti jam buka atau alamat, chatbot
              sederhana bisa memadai. Teknologi harus dipilih berdasarkan kompleksitas pekerjaan.
            </p>
          </>
        ),
      },
      {
        id: "bukan-bebas",
        heading: "AI-native bukan berarti AI boleh bertindak tanpa batas",
        toc: "Batas dan kontrol",
        body: (
          <ul>
            <li>Harga, stok, promo, dan kebijakan harus berasal dari data usaha yang disetujui.</li>
            <li>Perubahan order perlu dikonfirmasi sebelum diteruskan.</li>
            <li>Kasus ambigu, komplain berat, dan refund harus dapat dialihkan ke manusia.</li>
            <li>Riwayat tindakan perlu dapat diperiksa oleh pemilik usaha.</li>
          </ul>
        ),
      },
      {
        id: "cara-memilih",
        heading: "Kapan bisnis membutuhkan pendekatan AI-native?",
        toc: "Kapan memilih AI-native",
        body: (
          <p>
            Pertimbangkan AI-native jika variasi bahasa pelanggan tinggi, order
            memiliki banyak modifikasi, pelanggan sering kembali, dan data chat
            perlu menggerakkan proses lain. Jika kebutuhan hanya tiga pertanyaan
            statis, solusi yang lebih sederhana mungkin sudah cukup.
          </p>
        ),
      },
      {
        id: "sosmed-ai",
        heading: "Mengapa Sosmed AI dibangun AI-native di WhatsApp",
        toc: "Mengapa AI-native",
        body: (
          <>
            <p>
              Usaha F&amp;B kecil membutuhkan percakapan yang fleksibel tanpa
              menambah beban administrasi. Karena itu Sosmed AI dirancang dari awal
              agar chat natural dapat terhubung ke order, pelanggan, poin, dan insight.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      { slug: "otomatisasi-whatsapp-untuk-umkm-fnb", g: "g3", tag: "Panduan", title: "Otomatisasi WhatsApp untuk UMKM F&B", excerpt: "Kurangi kerja manual dan rapikan order." },
      { slug: "mengubah-chat-whatsapp-menjadi-pelanggan-setia", g: "g5", tag: "Tips Bisnis", title: "Mengubah Chat Menjadi Pelanggan Setia", excerpt: "Gunakan konteks percakapan untuk membangun retensi." },
      { slug: "yang-sedang-kami-bangun", g: "g3", tag: "Produk", title: "Bukan Sekadar Chatbot: Sosmed AI", excerpt: "Apa yang sedang kami bangun untuk UMKM F&B." },
    ],
  },

  "mulai-jualan-online-warung-kafe": {
    title: "Mulai Jualan Online untuk Warung & Kafe: Panduan Lengkap",
    category: "Panduan",
    readTime: "8 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Mulai jualan online cukup dari WhatsApp",
    description:
      "Panduan langkah demi langkah memindahkan order, menu, pembayaran, dan pelanggan setia warung & kafe ke WhatsApp - tanpa aplikasi rumit dan tanpa biaya besar di awal.",
    lede: (
      <>
        Banyak pemilik warung dan kafe merasa &quot;jualan online&quot; itu
        ribet - harus bikin aplikasi, belajar marketplace, atau bayar mahal.
        Padahal, Anda bisa mulai dari alat yang sudah Anda kuasai setiap hari:
        WhatsApp. Berikut panduan langkah demi langkah.
      </>
    ),
    tldr: [
      "Tidak perlu aplikasi mahal - mulai jualan online cukup dari WhatsApp yang sudah Anda pakai.",
      "Susun menu digital yang jelas (kategori + harga) supaya pelanggan gampang pesan.",
      "Tentukan alur order & pembayaran yang konsisten agar tidak ada pesanan terlewat.",
      "Bangun pelanggan setia lewat sistem poin sederhana dan layanan yang personal.",
      "Pantau penjualan harian untuk mengambil keputusan yang lebih baik.",
    ],
    sections: [
      {
        id: "kenapa",
        heading: "Kenapa jualan online penting",
        toc: "Kenapa jualan online penting",
        body: (
          <>
            <p>
              Pelanggan hari ini terbiasa memesan lewat ponsel. Kalau usaha Anda
              hanya melayani yang datang langsung, Anda kehilangan banyak
              pelanggan yang sebenarnya ingin pesan tapi malas keluar rumah atau
              sedang sibuk. Jualan online bukan soal menggantikan toko fisik,
              tapi menambah pintu masuk baru untuk order.
            </p>
            <p>
              Kabar baiknya: Anda tidak perlu langsung pakai sistem mahal. Mulai
              dari yang sederhana dulu, lalu kembangkan seiring usaha tumbuh.
            </p>
          </>
        ),
      },
      {
        id: "whatsapp",
        heading: "Mulai dari yang sudah Anda punya: WhatsApp",
        toc: "Mulai dari WhatsApp",
        body: (
          <>
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
            <Figure cap="Ilustrasi: percakapan order sederhana lewat WhatsApp Business.">
              <WaChat
                head
                msgs={[
                  { side: "in", text: "Halo kak, masih buka? Mau pesan 🙏" },
                  {
                    side: "out",
                    text: "Halo! Buka sampai jam 22.00 😊 Mau pesan apa kak?",
                  },
                  { side: "in", text: "Es kopi susu 2 ya" },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "menu",
        heading: "Susun menu digital yang jelas",
        toc: "Susun menu digital",
        body: (
          <>
            <p>
              Menu yang membingungkan membuat pelanggan ragu dan akhirnya tidak
              jadi pesan. Buat menu yang gampang dibaca lewat layar ponsel:
            </p>
            <ul>
              <li>
                Kelompokkan per kategori (minuman, makanan, tambahan) agar mudah
                dipindai.
              </li>
              <li>
                Cantumkan harga dengan jelas - pelanggan tidak suka harus
                bertanya dulu.
              </li>
              <li>
                Perbarui ketika ada perubahan, supaya tidak ada salah paham soal
                harga atau ketersediaan.
              </li>
            </ul>
            <Figure cap="Ilustrasi: menu digital dikelompokkan per kategori dengan harga yang jelas.">
              <MenuMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "order",
        heading: "Atur cara terima order & pembayaran",
        toc: "Terima order & pembayaran",
        body: (
          <>
            <p>
              Tentukan alur yang sederhana dan konsisten, supaya tidak ada order
              yang terlewat saat ramai:
            </p>
            <ul>
              <li>
                Konfirmasi setiap pesanan dengan ringkasan + total harga sebelum
                diproses.
              </li>
              <li>
                Tawarkan pembayaran lokal yang mudah seperti QRIS atau transfer,
                lalu minta bukti.
              </li>
              <li>
                Catat setiap order di satu tempat agar tidak tercecer di banyak
                chat.
              </li>
            </ul>
            <p>
              Saat order makin banyak, mencatat manual mulai terasa berat. Di
              sinilah alat bantu seperti Sosmed AI membantu - order dari chat
              tercatat otomatis tanpa Anda salin satu per satu.
            </p>
            <Figure cap="Ilustrasi: alur konfirmasi order dan pembayaran.">
              <WaChat
                msgs={[
                  {
                    side: "out",
                    text: "Pesanan kakak: 2x Es Kopi Susu - total Rp 36.000. Lanjut ya?",
                  },
                  { side: "in", text: "Iya kak" },
                  {
                    side: "out",
                    text: "Bayar via QRIS / transfer ya, kirim bukti setelah bayar 🙏",
                  },
                  { side: "in", text: "Sudah transfer 👍" },
                  { side: "out", text: "Pembayaran diterima ✅ Pesanan disiapkan." },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "loyal",
        heading: "Bangun pelanggan setia",
        toc: "Bangun pelanggan setia",
        body: (
          <>
            <p>
              Mendapat pelanggan baru lebih mahal daripada membuat pelanggan
              lama kembali. Beberapa cara sederhana:
            </p>
            <ul>
              <li>
                Sistem poin atau stempel digital - beli sekian kali, dapat
                gratis atau diskon.
              </li>
              <li>Sapaan personal dan ucapan terima kasih setelah order.</li>
              <li>
                Info promo ke pelanggan yang pernah memesan, secukupnya - jangan
                sampai mengganggu.
              </li>
            </ul>
            <Figure cap="Ilustrasi: sistem poin digital untuk pelanggan setia.">
              <PointsMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "laporan",
        heading: "Pantau penjualan Anda",
        toc: "Pantau penjualan",
        body: (
          <>
            <p>
              Anda tidak bisa memperbaiki yang tidak Anda ukur. Pantau hal-hal
              sederhana setiap hari: jumlah order, menu terlaris, dan jam paling
              ramai. Dari sini Anda bisa memutuskan kapan menambah stok, menu
              mana yang perlu didorong, dan kapan butuh tambahan tenaga.
            </p>
            <Figure cap="Contoh ilustrasi laporan - angka hanya sampel, bukan data nyata.">
              <SummMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "langkah",
        heading: "Langkah selanjutnya",
        toc: "Langkah selanjutnya",
        body: (
          <>
            <p>
              Mulai dari yang kecil: rapikan WhatsApp Business, susun menu
              digital, dan tentukan alur order. Setelah itu berjalan, baru
              pikirkan alat yang mengotomatiskan pencatatan, poin, dan laporan
              supaya Anda bisa fokus melayani pelanggan - bukan sibuk mengurus
              administrasi.
            </p>
            <p>
              Sosmed AI dibangun untuk membantu langkah itu, semua langsung dari
              WhatsApp - agar Anda bisa fokus melayani pelanggan, bukan sibuk
              mengurus administrasi.
            </p>
          </>
        ),
      },
    ],
    related: [
      {
        slug: "5-cara-pelanggan-jadi-langganan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
        excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
      },
      {
        slug: "order-whatsapp-lebih-cepat",
        g: "g3",
        tag: "Panduan",
        title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
        excerpt: "Kenapa pelanggan lebih nyaman pesan lewat chat.",
      },
      {
        slug: "sistem-poin-sederhana",
        g: "g5",
        tag: "Panduan",
        title: "Sistem Poin Sederhana untuk Usaha F&B Kecil",
        excerpt:
          "Program loyalitas yang ringan dijalankan dan disukai pelanggan.",
      },
    ],
  },

  "otomatisasi-whatsapp-untuk-umkm-fnb": {
    title: "Otomatisasi WhatsApp untuk UMKM F&B: Kerja Manual Berkurang, Order Tetap Rapi",
    category: "Panduan",
    readTime: "6 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Otomatisasi WhatsApp untuk UMKM F&B",
    keywords: [
      "otomatisasi WhatsApp UMKM",
      "otomasi F&B",
      "order WhatsApp otomatis",
      "WhatsApp bisnis F&B",
      "kurangi kerja manual",
    ],
    faq: [
      {
        q: "Apa itu otomatisasi WhatsApp untuk UMKM F&B?",
        a: "Cara membuat chat pelanggan tidak berhenti sebagai percakapan: order, permintaan menu, status pembayaran, poin, dan ringkasan penjualan dibantu dicatat serta ditata otomatis, sehingga pemilik tidak perlu menyalin semuanya satu per satu.",
      },
      {
        q: "Apa yang sebaiknya diotomatisasi lebih dulu?",
        a: "Pekerjaan yang sering terjadi dan jelas polanya: pencatatan order, menu digital, poin dan pelanggan setia, serta laporan harian.",
      },
      {
        q: "Apakah otomatisasi menghilangkan sentuhan manusia?",
        a: "Tidak. Otomasi yang baik bekerja di belakang layar—memastikan order tercatat dan pelanggan tetap dibalas—sementara pelayanan tetap terasa manusiawi.",
      },
    ],
    description:
      "Panduan otomasi WhatsApp untuk warung, kafe, dan restoran kecil: kurangi pencatatan manual, rapikan order, jaga pelanggan, dan baca penjualan harian dari satu alur.",
    lede: (
      <>
        Banyak pemilik warung, kafe, dan restoran kecil tidak kekurangan kerja
        keras. Yang sering kurang adalah sistem yang membuat kerja keras itu
        tidak bocor ke mana-mana. Otomatisasi WhatsApp bukan berarti usaha Anda
        jadi dingin dan robotik. Justru sebaliknya: pekerjaan manual berulang
        dirapikan, supaya Anda punya lebih banyak waktu melayani pelanggan.
      </>
    ),
    tldr: [
      "Otomatisasi WhatsApp paling berguna ketika menghapus kerja berulang: mencatat order, menghitung total, mengingatkan poin, dan membuat laporan.",
      "Untuk UMKM F&B, WhatsApp cocok karena pelanggan sudah terbiasa memesan lewat chat.",
      "Kunci otomasi bukan mengganti manusia, tapi membuat alur order lebih konsisten.",
      "Sosmed AI bukan chatbot skrip; pendekatannya AI-native di WhatsApp.",
      "Data dari chat bisa berubah menjadi insight: menu terlaris, jam ramai, pelanggan yang sering kembali, dan potensi promo.",
      "Sosmed AI sedang disiapkan untuk membantu alur ini langsung dari WhatsApp.",
    ],
    sections: [
      {
        id: "jawaban-singkat",
        heading: "Jawaban singkat: apa itu otomatisasi WhatsApp untuk UMKM F&B?",
        toc: "Jawaban singkat",
        body: (
          <p>
            Otomatisasi WhatsApp untuk UMKM F&amp;B adalah cara membuat chat
            pelanggan tidak berhenti sebagai percakapan saja. Pesan order,
            permintaan menu, status pembayaran, poin pelanggan, dan ringkasan
            penjualan dapat dibantu dicatat dan ditata secara otomatis, sehingga
            pemilik usaha tidak perlu menyalin semuanya satu per satu.
          </p>
        ),
      },
      {
        id: "masalah-manual",
        heading: "Masalah sebenarnya bukan chat, tapi kerja manual setelah chat",
        toc: "Masalah kerja manual",
        body: (
          <>
            <p>
              WhatsApp sudah terasa natural: pelanggan bertanya, pesan, mengubah
              pesanan, lalu konfirmasi. Masalahnya muncul setelah itu. Order
              harus dicatat, total harus dihitung, stok harus diingat, pelanggan
              tetap harus dikenali, dan laporan harian tetap harus dibuat.
            </p>
            <p>
              Selama order masih sedikit, semua bisa diingat. Saat order mulai
              naik, cara manual berubah jadi risiko: pesanan tercecer, balasan
              lambat, pelanggan menunggu, dan pemilik sulit tahu menu mana yang
              benar-benar menghasilkan.
            </p>
            <Figure cap="Ilustrasi: order dari WhatsApp berubah menjadi alur yang lebih rapi.">
              <WaChat
                head
                msgs={[
                  { side: "in", text: "Kak, pesan 2 kopi susu aren ya" },
                  {
                    side: "out",
                    text: "Siap kak. Tercatat: 2 kopi susu aren. Total Rp 36.000 ✅",
                  },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "yang-bisa-diotomatisasi",
        heading: "Apa saja yang sebaiknya diotomatisasi lebih dulu?",
        toc: "Yang diotomatisasi",
        body: (
          <>
            <p>
              Mulai dari pekerjaan yang sering terjadi, jelas polanya, dan
              mudah bikin capek jika dikerjakan manual:
            </p>
            <ul>
              <li>
                <b>Pencatatan order:</b> item, jumlah, catatan khusus, total,
                dan status pesanan.
              </li>
              <li>
                <b>Menu digital:</b> pelanggan bisa melihat pilihan yang rapi,
                bukan bertanya harga satu per satu.
              </li>
              <li>
                <b>Poin dan pelanggan setia:</b> pelanggan lama dikenali dan
                diingatkan secara relevan.
              </li>
              <li>
                <b>Laporan harian:</b> order, pendapatan, menu terlaris, dan jam
                ramai diringkas tanpa rekap manual.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "tetap-manusiawi",
        heading: "Otomatis bukan berarti kehilangan sentuhan manusia",
        toc: "Tetap manusiawi",
        body: (
          <p>
            Pelanggan tetap ingin merasa dilayani manusia. Karena itu otomasi
            yang baik tidak perlu terdengar kaku. Tugasnya membantu hal-hal di
            belakang layar: memastikan order tercatat, pelanggan tidak lupa
            dibalas, dan informasi penting tidak hilang di tengah chat.
          </p>
        ),
      },
      {
        id: "dampak-ke-penjualan",
        heading: "Bagaimana otomatisasi membantu penjualan dan profit?",
        toc: "Dampak ke profit",
        body: (
          <>
            <p>
              Penjualan naik bukan hanya karena lebih banyak promosi. Sering
              kali kenaikan datang dari kebocoran kecil yang ditutup: order yang
              dulu terlewat jadi tercatat, pelanggan lama diingatkan dengan
              tepat, dan menu yang margin-nya bagus lebih mudah didorong.
            </p>
            <p>
              Profit juga terbantu karena data harian memberi sinyal: kapan stok
              perlu ditambah, menu mana yang sebaiknya dipaketkan, dan jam sepi
              mana yang cocok diberi penawaran.
            </p>
          </>
        ),
      },
      {
        id: "sosmed-ai",
        heading: "Di mana peran Sosmed AI?",
        toc: "Peran Sosmed AI",
        body: (
          <>
            <p>
              Sosmed AI dirancang untuk membantu pemilik usaha F&amp;B kecil
              menjalankan alur ini langsung dari WhatsApp: order, menu digital,
              pelanggan setia, dan laporan sederhana. Tujuannya bukan menambah
              dashboard baru yang harus dijaga, tetapi mengurangi pekerjaan
              manual yang selama ini membuat pemilik cepat lelah.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      {
        slug: "cara-mengurangi-chaos-operasional-warung-kafe",
        g: "g6",
        tag: "Tips Bisnis",
        title: "Cara Mengurangi Chaos Operasional Warung & Kafe Saat Order Mulai Ramai",
        excerpt: "Framework sederhana agar pesanan tidak tercecer saat ramai.",
      },
      {
        slug: "cara-menjaga-pelanggan-lama-lewat-whatsapp",
        g: "g5",
        tag: "Tips Bisnis",
        title: "Cara Menjaga Pelanggan Lama Lewat WhatsApp Tanpa Spam",
        excerpt: "Retensi pelanggan yang personal, relevan, dan terukur.",
      },
      {
        slug: "meningkatkan-penjualan-profit-fnb-kecil",
        g: "g7",
        tag: "Panduan",
        title: "Meningkatkan Penjualan & Profit F&B Kecil dengan Data Order Harian",
        excerpt: "Gunakan data sederhana untuk menu, bundling, stok, dan margin.",
      },
    ],
  },

  "cara-mengurangi-chaos-operasional-warung-kafe": {
    title: "Cara Mengurangi Chaos Operasional Warung & Kafe Saat Order Mulai Ramai",
    category: "Tips Bisnis",
    readTime: "6 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Kurangi chaos saat order mulai ramai",
    keywords: [
      "chaos operasional warung",
      "kelola order jam ramai",
      "status pesanan F&B",
      "operasional kafe",
      "stok kritis",
    ],
    faq: [
      {
        q: "Kenapa jam ramai sering berubah menjadi chaos?",
        a: "Karena order, status, stok, dan tugas tim tidak berada di satu alur yang jelas, sehingga banyak keputusan kecil yang berulang harus diambil justru saat paling sibuk.",
      },
      {
        q: "Status order apa saja yang perlu dibuat?",
        a: "Lima status sederhana: baru, diproses, siap, selesai, dan batal—agar tim tahu prioritas berikutnya tanpa menebak.",
      },
      {
        q: "Apakah WhatsApp tetap bisa dipakai menerima order saat ramai?",
        a: "Bisa, asalkan chat bukan satu-satunya tempat pencatatan. WhatsApp menjadi pintu masuk, tetapi order perlu berubah menjadi daftar yang bisa dilihat dan dipercaya tim.",
      },
    ],
    description:
      "Cara mengurangi chaos operasional warung dan kafe kecil: rapikan order, status pesanan, stok, dan pembagian kerja agar jam ramai tidak berubah jadi kekacauan.",
    lede: (
      <>
        Jam ramai seharusnya menjadi waktu terbaik untuk menghasilkan uang.
        Tetapi bagi banyak usaha kecil, jam ramai justru jadi sumber chaos:
        order masuk dari banyak arah, stok menipis tanpa terasa, pelanggan
        bertanya status, dan tim mulai saling menebak. Kuncinya bukan bekerja
        lebih cepat saja, tetapi membuat sistem yang mengurangi keputusan kecil
        yang berulang.
      </>
    ),
    tldr: [
      "Chaos biasanya muncul karena order, status, stok, dan tugas tim tidak berada di satu alur yang jelas.",
      "Setiap order perlu punya status: baru, diproses, siap, selesai, atau dibatalkan.",
      "Jam ramai harus disiapkan sebelum ramai: menu prioritas, stok kritis, dan peran tim.",
      "WhatsApp bisa tetap menjadi pintu order, asalkan chat tidak menjadi satu-satunya tempat pencatatan.",
      "Pendekatan yang dibutuhkan bukan chatbot skrip, tetapi AI-native di WhatsApp yang paham konteks chat.",
      "Sosmed AI disiapkan untuk membantu order dari chat menjadi lebih terstruktur.",
    ],
    sections: [
      {
        id: "akar-chaos",
        heading: "Akar chaos: terlalu banyak hal hidup di kepala pemilik",
        toc: "Akar chaos",
        body: (
          <p>
            Banyak usaha kecil berjalan karena pemiliknya sangat hafal semuanya:
            menu, harga, pelanggan langganan, stok, dan urutan order. Ini kuat
            saat usaha masih kecil, tetapi rapuh saat volume naik. Begitu
            pemilik sedang melayani pelanggan, chat baru masuk, stok habis, dan
            karyawan bertanya, sistem yang hanya hidup di kepala mulai kewalahan.
          </p>
        ),
      },
      {
        id: "status-order",
        heading: "Buat status order yang sederhana",
        toc: "Status order",
        body: (
          <>
            <p>
              Setiap pesanan sebaiknya tidak hanya “ada di chat”. Beri status
              yang mudah dimengerti:
            </p>
            <ul>
              <li><b>Baru:</b> pesanan masuk dan perlu dikonfirmasi.</li>
              <li><b>Diproses:</b> pesanan sedang dibuat.</li>
              <li><b>Siap:</b> pesanan siap diambil atau dikirim.</li>
              <li><b>Selesai:</b> pesanan sudah diterima pelanggan.</li>
              <li><b>Batal:</b> pesanan tidak jadi diproses.</li>
            </ul>
            <Figure cap="Ilustrasi: status order membantu tim tahu prioritas berikutnya.">
              <WaChat
                head
                msgs={[
                  { side: "in", text: "Order saya sudah siap belum kak?" },
                  {
                    side: "out",
                    text: "Sudah masuk proses ya kak. Estimasi siap 8 menit lagi.",
                  },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "satu-sumber",
        heading: "Satu sumber kebenaran untuk order",
        toc: "Satu sumber order",
        body: (
          <p>
            Kesalahan sering terjadi ketika satu order ada di chat, satu di
            kertas, satu di ingatan kasir, dan satu lagi di grup internal. Pilih
            satu sumber kebenaran. WhatsApp boleh menjadi pintu masuk, tetapi
            order perlu berubah menjadi daftar yang bisa dilihat dan dipercaya
            oleh tim.
          </p>
        ),
      },
      {
        id: "stok-kritis",
        heading: "Tentukan stok kritis sebelum jam ramai",
        toc: "Stok kritis",
        body: (
          <p>
            Chaos sering bukan karena order terlalu banyak, tetapi karena bahan
            kunci habis tanpa peringatan. Tandai bahan yang paling menentukan:
            kopi, ayam, telur, nasi, cup, kemasan, atau topping tertentu. Jika
            stok mendekati batas kritis, tim harus tahu sebelum pelanggan sudah
            terlanjur pesan.
          </p>
        ),
      },
      {
        id: "peran-tim",
        heading: "Bagi peran tim berdasarkan alur, bukan orang yang paling panik",
        toc: "Peran tim",
        body: (
          <p>
            Saat ramai, semua orang cenderung membantu apa pun yang terlihat
            paling mendesak. Ini terasa aktif, tetapi bisa membuat pekerjaan
            tumpang tindih. Lebih baik tentukan peran: siapa konfirmasi order,
            siapa menyiapkan minuman, siapa packing, siapa menyerahkan pesanan,
            dan siapa memantau stok.
          </p>
        ),
      },
      {
        id: "otomasi",
        heading: "Otomatiskan bagian yang paling sering mengulang",
        toc: "Otomasi",
        body: (
          <>
            <p>
              Kalau tim terus mengetik balasan yang sama, menghitung total yang
              sama, dan menyalin order yang sama, tenaga habis untuk pekerjaan
              yang tidak menambah rasa makanan atau kualitas layanan. Di sinilah
              otomasi membantu menjaga energi tim untuk hal yang lebih penting.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      {
        slug: "otomatisasi-whatsapp-untuk-umkm-fnb",
        g: "g3",
        tag: "Panduan",
        title: "Otomatisasi WhatsApp untuk UMKM F&B",
        excerpt: "Kurangi pencatatan manual dan rapikan order dari chat.",
      },
      {
        slug: "mengelola-pesanan-jam-ramai",
        g: "g6",
        tag: "Tips Bisnis",
        title: "Mengelola Pesanan Saat Jam Ramai Tanpa Keteteran",
        excerpt: "Tips menjaga pesanan tetap rapi saat sedang sibuk.",
      },
      {
        slug: "laporan-penjualan-harian",
        g: "g7",
        tag: "Panduan",
        title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
        excerpt: "Angka penting yang sebaiknya dipantau setiap hari.",
      },
    ],
  },

  "cara-menjaga-pelanggan-lama-lewat-whatsapp": {
    title: "Cara Menjaga Pelanggan Lama Lewat WhatsApp Tanpa Spam",
    category: "Tips Bisnis",
    readTime: "6 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Jaga pelanggan lama tanpa spam",
    keywords: [
      "menjaga pelanggan lama",
      "retensi pelanggan WhatsApp",
      "follow-up tanpa spam",
      "loyalitas F&B",
      "personalisasi WhatsApp",
    ],
    faq: [
      {
        q: "Apa itu retensi pelanggan untuk usaha F&B kecil?",
        a: "Kemampuan usaha membuat pelanggan yang sudah pernah membeli agar kembali membeli lagi—bisa sesederhana mengingat pesanan favorit, memberi poin, atau mengirim pengingat yang relevan.",
      },
      {
        q: "Apa beda follow-up yang membantu dan spam?",
        a: "Follow-up yang baik punya konteks dan relevan bagi pelanggan tertentu; spam hanya mengirim pesan yang sama ke semua kontak tanpa melihat kebiasaan mereka.",
      },
      {
        q: "Kapan waktu terbaik mengirim follow-up?",
        a: "Sesuaikan dengan konteks: pengingat makan siang menjelang siang, kopi di sore hari, dan pesan 'kami kangen' setelah pelanggan benar-benar lama tidak kembali.",
      },
    ],
    description:
      "Strategi menjaga pelanggan lama untuk warung, kafe, dan restoran kecil lewat WhatsApp: personalisasi, poin, pengingat relevan, dan follow-up yang tidak terasa spam.",
    lede: (
      <>
        Banyak usaha kecil terlalu fokus mencari pelanggan baru, padahal
        pelanggan lama sering menjadi sumber profit yang lebih sehat. Mereka
        sudah percaya, sudah tahu rasa, dan lebih mudah kembali jika diingatkan
        dengan cara yang tepat. Tantangannya: jangan sampai WhatsApp berubah
        menjadi spam.
      </>
    ),
    tldr: [
      "Menjaga pelanggan lama biasanya lebih murah daripada terus mencari pelanggan baru.",
      "WhatsApp cocok untuk retensi karena terasa personal, tetapi harus relevan dan tidak terlalu sering.",
      "Data order membantu tahu siapa pelanggan yang layak di-follow up, bukan menebak-nebak.",
      "Program poin sederhana memberi alasan konkret untuk kembali.",
      "Sosmed AI bukan chatbot massal; ia dirancang AI-native di WhatsApp agar follow-up tetap kontekstual.",
      "Sosmed AI disiapkan untuk membantu pelanggan dikenali dan dirawat langsung dari WhatsApp.",
    ],
    sections: [
      {
        id: "retensi",
        heading: "Apa itu retensi pelanggan untuk usaha F&B kecil?",
        toc: "Apa itu retensi",
        body: (
          <p>
            Retensi pelanggan adalah kemampuan usaha membuat pelanggan yang
            sudah pernah membeli agar kembali membeli lagi. Untuk warung dan
            kafe, retensi bisa sesederhana mengingat pesanan favorit, memberi
            poin, mengirim pengingat yang relevan, atau menawarkan menu baru
            kepada orang yang kemungkinan besar tertarik.
          </p>
        ),
      },
      {
        id: "bukan-spam",
        heading: "Bedakan follow-up yang membantu dan spam",
        toc: "Bukan spam",
        body: (
          <>
            <p>
              Follow-up yang baik punya konteks. Spam hanya mengirim pesan yang
              sama ke semua orang. Contohnya:
            </p>
            <ul>
              <li>
                <b>Membantu:</b> “Kak, poin kakak tinggal 12 lagi menuju voucher.
                Mau pakai untuk order berikutnya?”
              </li>
              <li>
                <b>Mengganggu:</b> mengirim promo harian ke semua kontak tanpa
                melihat kebiasaan mereka.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "data-order",
        heading: "Gunakan data order untuk personalisasi sederhana",
        toc: "Data order",
        body: (
          <>
            <p>
              Personalisasi tidak harus rumit. Mulai dari tiga hal: nama
              pelanggan, pesanan terakhir, dan frekuensi beli. Dari sana Anda
              bisa tahu siapa yang sering kembali, siapa yang mulai jarang
              muncul, dan menu apa yang paling cocok ditawarkan.
            </p>
            <Figure cap="Ilustrasi: pelanggan dikenali dari riwayat order dan poin.">
              <PointsMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "poin",
        heading: "Beri alasan untuk kembali lewat poin",
        toc: "Sistem poin",
        body: (
          <p>
            Sistem poin bekerja karena membuat manfaat kembali menjadi konkret.
            Pelanggan tidak hanya “ingat” usaha Anda, tetapi punya alasan kecil
            untuk memilih Anda lagi. Yang penting, aturan harus sederhana dan
            saldo poin mudah dicek.
          </p>
        ),
      },
      {
        id: "waktu",
        heading: "Pilih waktu yang masuk akal",
        toc: "Waktu follow-up",
        body: (
          <p>
            Pesan yang sama bisa terasa membantu atau mengganggu tergantung
            waktunya. Pengingat makan siang cocok menjelang siang, kopi cocok di
            sore hari, dan pesan “kami kangen” sebaiknya dikirim setelah
            pelanggan benar-benar lama tidak kembali.
          </p>
        ),
      },
      {
        id: "otomasi-retensi",
        heading: "Bagaimana otomasi membantu tanpa membuat pelanggan merasa dibotkan?",
        toc: "Otomasi retensi",
        body: (
          <>
            <p>
              Otomasi yang baik membantu memilih siapa yang perlu dihubungi,
              kapan waktunya, dan konteks apa yang relevan. Nada bicara tetap
              harus ramah dan manusiawi. Tujuannya bukan membanjiri pelanggan,
              tetapi memastikan pelanggan baik tidak terlupakan.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      {
        slug: "5-cara-pelanggan-jadi-langganan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
        excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
      },
      {
        slug: "sistem-poin-sederhana",
        g: "g5",
        tag: "Panduan",
        title: "Sistem Poin Sederhana untuk Usaha F&B Kecil",
        excerpt: "Program loyalitas yang ringan dijalankan.",
      },
      {
        slug: "otomatisasi-whatsapp-untuk-umkm-fnb",
        g: "g3",
        tag: "Panduan",
        title: "Otomatisasi WhatsApp untuk UMKM F&B",
        excerpt: "Kurangi pencatatan manual dan rapikan order dari chat.",
      },
    ],
  },

  "meningkatkan-penjualan-profit-fnb-kecil": {
    title: "Meningkatkan Penjualan & Profit F&B Kecil dengan Data Order Harian",
    category: "Panduan",
    readTime: "7 menit baca",
    datePublished: "2026-07-11",
    coverTitle: "Penjualan naik, profit lebih sehat",
    keywords: [
      "meningkatkan penjualan F&B",
      "profit warung kafe",
      "data order harian",
      "bundling menu",
      "promo sehat",
    ],
    faq: [
      {
        q: "Apakah penjualan naik selalu berarti profit naik?",
        a: "Tidak. Jika menu yang laku margin-nya tipis, stok sering terbuang, atau promo terlalu boros, omzet bisa terlihat ramai tetapi profit tetap tipis.",
      },
      {
        q: "Angka harian apa yang paling penting dipantau?",
        a: "Lima angka: total order, pendapatan, menu terlaris, jam ramai, dan pelanggan yang kembali membeli lebih dari sekali.",
      },
      {
        q: "Bagaimana bundling bisa menaikkan profit?",
        a: "Bundling yang baik menggabungkan menu populer yang menarik perhatian dengan item bermargin lebih sehat, bukan sekadar membuat paket murah.",
      },
    ],
    description:
      "Cara meningkatkan penjualan dan profit usaha F&B kecil menggunakan data order harian: menu terlaris, margin, bundling, jam ramai, stok, dan pelanggan lama.",
    lede: (
      <>
        Penjualan yang naik belum tentu membuat usaha lebih sehat. Jika menu
        yang laku margin-nya tipis, stok sering terbuang, atau promo terlalu
        boros, omzet bisa terlihat ramai tapi profit tetap tipis. Data order
        harian membantu pemilik usaha melihat bukan hanya “berapa banyak yang
        terjual”, tetapi “apa yang benar-benar membuat usaha tumbuh”.
      </>
    ),
    tldr: [
      "Naikkan profit dengan memahami menu terlaris, margin, jam ramai, stok, dan pelanggan yang sering kembali.",
      "Data harian sederhana lebih berguna daripada laporan rumit yang jarang dibuka.",
      "Bundling efektif jika menggabungkan menu populer dengan item margin sehat.",
      "Promo sebaiknya diarahkan ke jam sepi atau pelanggan yang tepat, bukan dibakar ke semua orang.",
      "Sosmed AI bukan chatbot; ia AI-native di WhatsApp agar data chat bisa berubah menjadi keputusan bisnis.",
      "Sosmed AI disiapkan agar data dari order WhatsApp bisa menjadi ringkasan bisnis yang mudah dipakai.",
    ],
    sections: [
      {
        id: "penjualan-vs-profit",
        heading: "Penjualan naik tidak selalu berarti profit naik",
        toc: "Sales vs profit",
        body: (
          <p>
            Banyak pemilik usaha bangga ketika order naik, dan itu wajar. Tapi
            angka order hanya satu bagian cerita. Anda juga perlu tahu menu mana
            yang paling menguntungkan, bahan mana yang sering terbuang, dan promo
            mana yang membuat ramai tetapi tidak sehat secara margin.
          </p>
        ),
      },
      {
        id: "angka-penting",
        heading: "Lima angka harian yang paling penting",
        toc: "Angka penting",
        body: (
          <>
            <p>
              Untuk usaha kecil, tidak perlu mulai dari dashboard rumit. Mulai
              dari lima angka:
            </p>
            <ul>
              <li><b>Total order:</b> berapa transaksi yang terjadi hari ini.</li>
              <li><b>Pendapatan:</b> total uang masuk dari order.</li>
              <li><b>Menu terlaris:</b> item yang paling sering dibeli.</li>
              <li><b>Jam ramai:</b> kapan permintaan paling tinggi.</li>
              <li><b>Pelanggan kembali:</b> siapa yang membeli lebih dari sekali.</li>
            </ul>
            <Figure cap="Contoh ilustrasi laporan - angka hanya sampel, bukan data nyata.">
              <SummMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "bundling",
        heading: "Gunakan bundling untuk menaikkan nilai order",
        toc: "Bundling",
        body: (
          <p>
            Bundling bukan sekadar “paket murah”. Paket yang baik menggabungkan
            menu yang mudah menarik perhatian dengan item yang margin-nya lebih
            sehat. Misalnya menu kopi populer dipasangkan dengan snack yang
            mudah disiapkan dan memberi tambahan profit.
          </p>
        ),
      },
      {
        id: "promo",
        heading: "Promo harus punya tujuan yang jelas",
        toc: "Promo sehat",
        body: (
          <p>
            Promo terbaik bukan selalu diskon terbesar. Kadang promo kecil di
            jam sepi lebih berguna daripada diskon besar saat jam ramai yang
            sebenarnya sudah penuh order. Data membantu memilih kapan promo
            dibutuhkan dan siapa yang paling relevan menerimanya.
          </p>
        ),
      },
      {
        id: "stok",
        heading: "Data order membantu stok lebih presisi",
        toc: "Stok",
        body: (
          <p>
            Stok terlalu sedikit membuat penjualan hilang. Stok terlalu banyak
            membuat bahan terbuang. Dengan melihat pola order harian, pemilik
            bisa memperkirakan bahan yang perlu ditambah, dikurangi, atau
            dipromosikan sebelum mendekati masa habis.
          </p>
        ),
      },
      {
        id: "dari-whatsapp",
        heading: "Ubah chat order menjadi insight bisnis",
        toc: "Insight dari chat",
        body: (
          <>
            <p>
              Jika sebagian besar order masuk lewat WhatsApp, maka insight
              bisnis juga sebaiknya lahir dari sana. Ketika order tercatat
              otomatis, Anda tidak perlu menunggu rekap manual untuk tahu menu
              apa yang naik, pelanggan mana yang kembali, dan keputusan apa yang
              perlu dibuat besok.
            </p>
            <AiNativeNote />
            <ComingSoonBand />
          </>
        ),
      },
    ],
    related: [
      {
        slug: "laporan-penjualan-harian",
        g: "g7",
        tag: "Panduan",
        title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
        excerpt: "Angka penting yang sebaiknya dipantau setiap hari.",
      },
      {
        slug: "menu-digital-mudah-dipesan",
        g: "g4",
        tag: "Tips Bisnis",
        title: "Cara Atur Menu Digital yang Bikin Pelanggan Gampang Pesan",
        excerpt: "Menyusun menu yang jelas agar pelanggan langsung pesan.",
      },
      {
        slug: "otomatisasi-whatsapp-untuk-umkm-fnb",
        g: "g3",
        tag: "Panduan",
        title: "Otomatisasi WhatsApp untuk UMKM F&B",
        excerpt: "Kurangi pencatatan manual dan rapikan order dari chat.",
      },
    ],
  },

  "5-cara-pelanggan-jadi-langganan": {
    title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
    category: "Tips Bisnis",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Bikin pelanggan kembali lagi, lagi, dan lagi",
    description:
      "Mendapat pelanggan baru itu mahal. Membuat pelanggan lama kembali jauh lebih murah - dan lebih menguntungkan. Berikut lima cara sederhana.",
    lede: (
      <>
        Mendapat pelanggan baru itu mahal. Membuat pelanggan lama kembali jauh
        lebih murah - dan lebih menguntungkan. Berikut lima cara sederhana.
      </>
    ),
    tldr: [
      "Pelanggan setia lebih murah daripada terus mencari pelanggan baru.",
      "Sapa pelanggan secara personal - orang suka diingat.",
      "Beri alasan untuk kembali lewat sistem poin atau promo kecil.",
      "Jaga konsistensi rasa dan layanan.",
      "Dengarkan dan tanggapi masukan pelanggan.",
    ],
    sections: [
      {
        id: "kenapa",
        heading: "Kenapa pelanggan setia penting",
        toc: "Kenapa setia penting",
        body: (
          <p>
            Pelanggan setia tidak hanya kembali - mereka belanja lebih sering,
            lebih percaya, dan sering merekomendasikan usaha Anda ke teman.
            Membangun mereka jauh lebih murah daripada terus beriklan untuk
            pelanggan baru.
          </p>
        ),
      },
      {
        id: "sapa",
        heading: "1. Sapa pelanggan secara personal",
        toc: "1. Sapa personal",
        body: (
          <>
            <p>
              Ingat nama atau pesanan favorit pelanggan tetap. Sapaan kecil
              seperti &quot;Es kopi susu seperti biasa, kak?&quot; membuat orang
              merasa dihargai dan ingin kembali.
            </p>
            <Figure cap="Ilustrasi: sapaan personal lewat WhatsApp.">
              <WaChat
                head
                msgs={[
                  {
                    side: "out",
                    text: "Halo kak Dimas! Es kopi susu less sugar seperti biasa? 😊",
                  },
                  { side: "in", text: "Iya kak, yang itu 🙏" },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "poin",
        heading: "2. Beri sistem poin atau stempel",
        toc: "2. Sistem poin",
        body: (
          <>
            <p>
              Beri alasan konkret untuk kembali. Sistem poin sederhana - beli
              sekian kali, dapat gratis atau diskon - sangat efektif dan tidak
              butuh kartu fisik.
            </p>
            <Figure cap="Ilustrasi: sistem poin digital.">
              <PointsMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "konsisten",
        heading: "3. Jaga konsistensi",
        toc: "3. Konsistensi",
        body: (
          <p>
            Rasa dan layanan yang berubah-ubah membuat pelanggan ragu.
            Konsistensi membangun kepercayaan - pelanggan tahu persis apa yang
            akan mereka dapat setiap kali datang.
          </p>
        ),
      },
      {
        id: "terhubung",
        heading: "4. Tetap terhubung lewat WhatsApp",
        toc: "4. Tetap terhubung",
        body: (
          <p>
            Kabari pelanggan soal menu baru atau promo, secukupnya. Jangan
            berlebihan sampai mengganggu - cukup sesekali agar usaha Anda tetap
            diingat.
          </p>
        ),
      },
      {
        id: "masukan",
        heading: "5. Dengarkan masukan",
        toc: "5. Dengarkan",
        body: (
          <p>
            Tanya pelanggan apa yang bisa diperbaiki, dan tindak lanjuti.
            Pelanggan yang merasa didengar cenderung menjadi pendukung setia
            usaha Anda.
          </p>
        ),
      },
    ],
    related: [
      {
        slug: "sistem-poin-sederhana",
        g: "g5",
        tag: "Panduan",
        title: "Sistem Poin Sederhana untuk Usaha F&B Kecil",
        excerpt:
          "Program loyalitas yang ringan dijalankan dan disukai pelanggan.",
      },
      {
        slug: "order-whatsapp-lebih-cepat",
        g: "g3",
        tag: "Panduan",
        title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
        excerpt: "Kenapa pelanggan lebih nyaman pesan lewat chat.",
      },
      {
        slug: "mengelola-pesanan-jam-ramai",
        g: "g2",
        tag: "Tips Bisnis",
        title: "Mengelola Pesanan Saat Jam Ramai Tanpa Keteteran",
        excerpt: "Tips menjaga pesanan tetap rapi saat sedang sibuk.",
      },
    ],
  },

  "order-whatsapp-lebih-cepat": {
    title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
    category: "Panduan",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "WhatsApp: tempat pelanggan Anda sudah berada",
    description:
      "Banyak yang mengira butuh aplikasi khusus untuk menerima order. Padahal, untuk kebanyakan warung dan kafe, WhatsApp justru lebih cepat dan lebih disukai pelanggan.",
    lede: (
      <>
        Banyak yang mengira butuh aplikasi khusus untuk menerima order. Padahal,
        untuk kebanyakan warung dan kafe, WhatsApp justru lebih cepat dan lebih
        disukai pelanggan.
      </>
    ),
    tldr: [
      "Pelanggan sudah punya WhatsApp - nol friksi, tanpa unduh apa pun.",
      "Tidak ada hambatan registrasi atau login.",
      "Percakapan natural memudahkan tanya-jawab.",
      "Jauh lebih murah daripada membangun aplikasi sendiri.",
      "Pesan langsung dibaca dan dibalas.",
    ],
    sections: [
      {
        id: "aplikasi",
        heading: "Masalah dengan aplikasi sendiri",
        toc: "Masalah aplikasi",
        body: (
          <p>
            Aplikasi sendiri terdengar canggih, tapi menuntut pelanggan
            mengunduh, mendaftar, dan belajar antarmuka baru - hambatan yang
            membuat banyak orang batal memesan.
          </p>
        ),
      },
      {
        id: "friksi",
        heading: "Nol friksi: semua sudah di WhatsApp",
        toc: "Nol friksi",
        body: (
          <>
            <p>
              Pelanggan Anda membuka WhatsApp puluhan kali sehari. Memesan lewat
              chat tidak menambah satu langkah pun ke kebiasaan mereka.
            </p>
            <Figure cap="Ilustrasi: order langsung lewat chat, tanpa aplikasi.">
              <WaChat
                head
                msgs={[
                  { side: "in", text: "Mau pesan 2 es kopi susu ya kak" },
                  {
                    side: "out",
                    text: "Siap kak! Total Rp 36.000. Diambil atau diantar?",
                  },
                  { side: "in", text: "Ambil aja" },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "percakapan",
        heading: "Percakapan natural mengurangi salah paham",
        toc: "Percakapan natural",
        body: (
          <p>
            Di chat, pelanggan bisa langsung bertanya soal menu, custom pesanan,
            atau alamat. Bolak-balik tanya-jawab terjadi secara alami - sesuatu
            yang sering kaku di aplikasi.
          </p>
        ),
      },
      {
        id: "biaya",
        heading: "Lebih murah dan cepat dijalankan",
        toc: "Lebih murah",
        body: (
          <p>
            Membangun dan merawat aplikasi butuh biaya besar dan waktu. WhatsApp
            Business gratis dan bisa Anda mulai hari ini juga.
          </p>
        ),
      },
      {
        id: "kapan",
        heading: "Kapan aplikasi tetap masuk akal",
        toc: "Kapan aplikasi cocok",
        body: (
          <p>
            Untuk jaringan besar dengan ribuan transaksi harian, aplikasi
            mungkin sepadan. Tapi untuk warung dan kafe kecil hingga menengah,
            WhatsApp hampir selalu lebih praktis untuk memulai.
          </p>
        ),
      },
    ],
    related: [
      {
        slug: "menu-digital-mudah-dipesan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "Cara Atur Menu Digital yang Bikin Pelanggan Gampang Pesan",
        excerpt: "Menyusun menu yang jelas agar pelanggan langsung pesan.",
      },
      {
        slug: "5-cara-pelanggan-jadi-langganan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
        excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
      },
      {
        slug: "mengelola-pesanan-jam-ramai",
        g: "g2",
        tag: "Tips Bisnis",
        title: "Mengelola Pesanan Saat Jam Ramai Tanpa Keteteran",
        excerpt: "Tips menjaga pesanan tetap rapi saat sedang sibuk.",
      },
    ],
  },

  "menu-digital-mudah-dipesan": {
    title: "Cara Atur Menu Digital yang Bikin Pelanggan Gampang Pesan",
    category: "Tips Bisnis",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Menu yang jelas = lebih banyak order",
    description:
      "Menu yang membingungkan membuat pelanggan ragu dan akhirnya tidak jadi pesan. Menu digital yang rapi melakukan sebaliknya.",
    lede: (
      <>
        Menu yang membingungkan membuat pelanggan ragu dan akhirnya tidak jadi
        pesan. Menu digital yang rapi melakukan sebaliknya.
      </>
    ),
    tldr: [
      "Kelompokkan menu per kategori agar mudah dipindai.",
      "Cantumkan harga dengan jelas - jangan bikin pelanggan bertanya dulu.",
      "Gunakan nama menu yang mudah dimengerti.",
      "Soroti menu andalan untuk membantu pelanggan memilih.",
      "Selalu perbarui ketika ada perubahan.",
    ],
    sections: [
      {
        id: "kenapa",
        heading: "Kenapa menu yang jelas penting",
        toc: "Kenapa penting",
        body: (
          <>
            <p>
              Saat pelanggan harus menebak-nebak isi atau harga menu, banyak
              yang menyerah sebelum memesan. Menu yang jelas menghapus keraguan
              itu.
            </p>
            <Figure cap="Ilustrasi: menu digital yang rapi per kategori.">
              <MenuMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "kategori",
        heading: "Kelompokkan per kategori",
        toc: "Per kategori",
        body: (
          <p>
            Pisahkan menu menjadi kelompok seperti minuman, makanan, dan
            tambahan. Pelanggan bisa langsung menuju yang mereka cari tanpa
            membaca seluruh daftar.
          </p>
        ),
      },
      {
        id: "harga",
        heading: "Harga harus terlihat",
        toc: "Harga jelas",
        body: (
          <p>
            Selalu cantumkan harga. Pelanggan tidak suka harus bertanya - dan
            banyak yang malas, lalu batal memesan.
          </p>
        ),
      },
      {
        id: "andalan",
        heading: "Soroti menu andalan",
        toc: "Menu andalan",
        body: (
          <p>
            Tandai beberapa menu favorit atau terlaris. Ini membantu pelanggan
            baru yang bingung memilih, dan mendorong penjualan menu unggulan
            Anda.
          </p>
        ),
      },
      {
        id: "perbarui",
        heading: "Jaga tetap terbarui",
        toc: "Tetap terbarui",
        body: (
          <p>
            Menu yang sudah tidak akurat (harga lama, item habis) merusak
            kepercayaan. Perbarui begitu ada perubahan.
          </p>
        ),
      },
    ],
    related: [
      {
        slug: "order-whatsapp-lebih-cepat",
        g: "g3",
        tag: "Panduan",
        title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
        excerpt: "Kenapa pelanggan lebih nyaman pesan lewat chat.",
      },
      {
        slug: "5-cara-pelanggan-jadi-langganan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
        excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
      },
      {
        slug: "laporan-penjualan-harian",
        g: "g3",
        tag: "Panduan",
        title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
        excerpt: "Angka penting yang sebaiknya dipantau setiap hari.",
      },
    ],
  },

  "sistem-poin-sederhana": {
    title: "Sistem Poin Sederhana untuk Usaha F&B Kecil",
    category: "Panduan",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Loyalitas tak harus rumit",
    description:
      "Program loyalitas tidak harus ribet. Sistem poin sederhana sudah cukup untuk membuat pelanggan kembali lagi.",
    lede: (
      <>
        Program loyalitas tidak harus ribet. Sistem poin sederhana sudah cukup
        untuk membuat pelanggan kembali lagi.
      </>
    ),
    tldr: [
      "Mulai dari aturan yang sangat sederhana.",
      "Tetapkan hadiah yang jelas dan terasa berharga.",
      "Buat mudah diikuti - tanpa kartu fisik yang gampang hilang.",
      "Ingatkan pelanggan soal saldo poin mereka.",
      "Pantau dan sesuaikan seiring waktu.",
    ],
    sections: [
      {
        id: "kenapa",
        heading: "Kenapa sistem poin efektif",
        toc: "Kenapa efektif",
        body: (
          <>
            <p>
              Poin memberi pelanggan alasan konkret untuk memilih Anda lagi
              daripada kompetitor. Sedikit dorongan sering cukup untuk membentuk
              kebiasaan.
            </p>
            <Figure cap="Ilustrasi: saldo poin pelanggan.">
              <PointsMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "aturan",
        heading: "Tentukan aturan yang sederhana",
        toc: "Aturan sederhana",
        body: (
          <p>
            Mulai dari yang mudah dipahami, misalnya satu poin per pembelian.
            Aturan yang rumit membuat pelanggan (dan Anda) bingung.
          </p>
        ),
      },
      {
        id: "hadiah",
        heading: "Pilih hadiah yang menarik",
        toc: "Hadiah menarik",
        body: (
          <p>
            Hadiah harus terasa sepadan dengan usaha mengumpulkannya - misalnya
            minuman gratis atau diskon yang berarti. Hadiah yang terlalu kecil
            tidak memotivasi.
          </p>
        ),
      },
      {
        id: "digital",
        heading: "Hindari kartu fisik",
        toc: "Tanpa kartu fisik",
        body: (
          <p>
            Kartu stempel kertas gampang hilang dan merepotkan. Sistem digital
            yang tercatat otomatis jauh lebih praktis bagi pelanggan dan Anda.
          </p>
        ),
      },
      {
        id: "ingatkan",
        heading: "Ingatkan pelanggan",
        toc: "Ingatkan",
        body: (
          <p>
            Pelanggan sering lupa mereka punya poin. Pengingat singkat -
            &quot;16 poin lagi menuju voucher&quot; - mendorong mereka kembali.
          </p>
        ),
      },
    ],
    related: [
      {
        slug: "5-cara-pelanggan-jadi-langganan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
        excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
      },
      {
        slug: "order-whatsapp-lebih-cepat",
        g: "g3",
        tag: "Panduan",
        title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
        excerpt: "Kenapa pelanggan lebih nyaman pesan lewat chat.",
      },
      {
        slug: "laporan-penjualan-harian",
        g: "g3",
        tag: "Panduan",
        title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
        excerpt: "Angka penting yang sebaiknya dipantau setiap hari.",
      },
    ],
  },

  "mengelola-pesanan-jam-ramai": {
    title: "Mengelola Pesanan Saat Jam Ramai Tanpa Keteteran",
    category: "Tips Bisnis",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Tetap rapi saat paling sibuk",
    description:
      "Jam ramai adalah saat paling menguntungkan sekaligus paling bikin stres. Dengan sistem yang tepat, Anda bisa tetap rapi.",
    lede: (
      <>
        Jam ramai adalah saat paling menguntungkan sekaligus paling bikin stres.
        Dengan sistem yang tepat, Anda bisa tetap rapi.
      </>
    ),
    tldr: [
      "Catat semua order di satu tempat agar tidak tercecer.",
      "Konfirmasi setiap pesanan supaya tak ada yang terlewat.",
      "Bagi tugas dengan jelas saat ramai.",
      "Siapkan bahan sebelum jam sibuk tiba.",
      "Otomatiskan hal-hal yang berulang.",
    ],
    sections: [
      {
        id: "kenapa",
        heading: "Kenapa jam ramai bikin keteteran",
        toc: "Kenapa keteteran",
        body: (
          <p>
            Saat order datang bertubi-tubi dari chat, telepon, dan pelanggan
            langsung, mudah ada yang terlewat atau tertukar. Itu artinya
            kehilangan uang dan pelanggan kecewa.
          </p>
        ),
      },
      {
        id: "catat",
        heading: "Catat order di satu tempat",
        toc: "Satu tempat",
        body: (
          <>
            <p>
              Hindari mencatat order di banyak tempat berbeda. Satu daftar
              terpusat membuat Anda selalu tahu apa yang harus disiapkan
              berikutnya.
            </p>
            <Figure cap="Ilustrasi: order tercatat rapi dari chat.">
              <WaChat
                head
                msgs={[
                  { side: "in", text: "2 es kopi susu, 1 croissant" },
                  {
                    side: "out",
                    text: "Tercatat ya kak ✅ Order #1042. Siap dalam 10 menit.",
                  },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "konfirmasi",
        heading: "Konfirmasi setiap pesanan",
        toc: "Konfirmasi",
        body: (
          <p>
            Balas setiap order dengan ringkasan dan total. Ini mencegah salah
            paham dan memastikan tidak ada pesanan yang terlewat.
          </p>
        ),
      },
      {
        id: "persiapan",
        heading: "Siapkan sebelum ramai",
        toc: "Persiapan",
        body: (
          <p>
            Siapkan bahan, kemasan, dan stok sebelum jam sibuk. Semakin sedikit
            yang dikerjakan saat ramai, semakin lancar prosesnya.
          </p>
        ),
      },
      {
        id: "otomatis",
        heading: "Otomatiskan yang berulang",
        toc: "Otomatiskan",
        body: (
          <p>
            Tugas berulang seperti mencatat order dan menghitung total bisa
            diotomatiskan, sehingga tenaga Anda fokus pada menyiapkan pesanan dan
            melayani pelanggan.
          </p>
        ),
      },
    ],
    related: [
      {
        slug: "laporan-penjualan-harian",
        g: "g3",
        tag: "Panduan",
        title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
        excerpt: "Angka penting yang sebaiknya dipantau setiap hari.",
      },
      {
        slug: "5-cara-pelanggan-jadi-langganan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
        excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
      },
      {
        slug: "order-whatsapp-lebih-cepat",
        g: "g3",
        tag: "Panduan",
        title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
        excerpt: "Kenapa pelanggan lebih nyaman pesan lewat chat.",
      },
    ],
  },

  "laporan-penjualan-harian": {
    title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
    category: "Panduan",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Angka sederhana, keputusan lebih baik",
    description:
      "Anda tidak bisa memperbaiki yang tidak Anda ukur. Untungnya, beberapa angka sederhana sudah cukup untuk mengambil keputusan yang lebih baik.",
    lede: (
      <>
        Anda tidak bisa memperbaiki yang tidak Anda ukur. Untungnya, beberapa
        angka sederhana sudah cukup untuk mengambil keputusan yang lebih baik.
      </>
    ),
    tldr: [
      "Pantau total order dan pendapatan setiap hari.",
      "Kenali menu terlaris - dan yang paling lambat.",
      "Perhatikan jam paling ramai.",
      "Bandingkan performa dari hari ke hari.",
      "Gunakan data untuk keputusan stok dan promo.",
    ],
    sections: [
      {
        id: "kenapa",
        heading: "Kenapa laporan harian penting",
        toc: "Kenapa penting",
        body: (
          <>
            <p>
              Tanpa angka, keputusan hanya berdasar tebakan. Laporan sederhana
              membantu Anda melihat apa yang berhasil dan apa yang perlu
              diperbaiki.
            </p>
            <Figure cap="Contoh ilustrasi laporan - angka hanya sampel, bukan data nyata.">
              <SummMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "total",
        heading: "Total order & pendapatan",
        toc: "Total & pendapatan",
        body: (
          <p>
            Dua angka paling dasar: berapa banyak order dan berapa pendapatan
            hari itu. Pantau treninya dari hari ke hari, bukan hanya angka satu
            hari.
          </p>
        ),
      },
      {
        id: "menu",
        heading: "Menu terlaris & paling lambat",
        toc: "Menu terlaris",
        body: (
          <p>
            Ketahui menu mana yang paling laku dan mana yang jarang dipesan. Ini
            membantu keputusan stok, promo, dan apakah suatu menu layak
            dipertahankan.
          </p>
        ),
      },
      {
        id: "jam",
        heading: "Jam paling ramai",
        toc: "Jam ramai",
        body: (
          <p>
            Mengenali jam sibuk membantu Anda mengatur stok dan tenaga di waktu
            yang tepat, serta merencanakan promo di jam yang sepi.
          </p>
        ),
      },
      {
        id: "bandingkan",
        heading: "Bandingkan dari waktu ke waktu",
        toc: "Bandingkan",
        body: (
          <p>
            Bandingkan minggu ini dengan minggu lalu untuk melihat apakah usaha
            Anda tumbuh. Tren lebih berguna daripada angka harian yang berdiri
            sendiri.
          </p>
        ),
      },
    ],
    related: [
      {
        slug: "menu-digital-mudah-dipesan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "Cara Atur Menu Digital yang Bikin Pelanggan Gampang Pesan",
        excerpt: "Menyusun menu yang jelas agar pelanggan langsung pesan.",
      },
      {
        slug: "mengelola-pesanan-jam-ramai",
        g: "g2",
        tag: "Tips Bisnis",
        title: "Mengelola Pesanan Saat Jam Ramai Tanpa Keteteran",
        excerpt: "Tips menjaga pesanan tetap rapi saat sedang sibuk.",
      },
      {
        slug: "5-cara-pelanggan-jadi-langganan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "5 Cara Bikin Pelanggan Warung Kopi Jadi Langganan",
        excerpt: "Ide sederhana membangun pelanggan setia tanpa modal besar.",
      },
    ],
  },

  "yang-sedang-kami-bangun": {
    title: "Bukan Sekadar Chatbot: Apa Itu Sosmed AI",
    category: "Produk",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Apa yang sedang kami bangun di Sosmed AI",
    description:
      "Apa bedanya chatbot biasa dengan AI-native? Penjelasan sederhana soal cara kerja Sosmed AI dan apa yang sedang kami bangun untuk usaha F&B kecil.",
    lede: (
      <>
        Sosmed AI masih dalam tahap pengembangan dan belum diluncurkan. Halaman
        ini menjelaskan apa yang sedang kami bangun dan bagaimana rencananya
        bekerja, supaya Anda tahu persis apa yang akan Anda dapat.
      </>
    ),
    tldr: [
      "Sosmed AI sedang dalam pengembangan - belum tersedia untuk umum.",
      "Semuanya dirancang berjalan langsung dari WhatsApp.",
      "Fokus pertama: order tercatat otomatis, menu digital, poin, dan laporan.",
      "Tujuannya: pemilik usaha fokus melayani, bukan sibuk mengurus administrasi.",
      "Fitur akan dirilis bertahap, dan kami akan terbuka soal apa yang sudah siap.",
    ],
    sections: [
      {
        id: "whatsapp",
        heading: "Kenapa lewat WhatsApp",
        toc: "Kenapa WhatsApp",
        body: (
          <p>
            Rencananya semua berjalan di tempat yang sudah dipakai pelanggan
            Anda setiap hari: WhatsApp. Tidak ada aplikasi baru yang harus
            diunduh siapa pun. Kami percaya alat terbaik adalah yang tidak
            menambah beban belajar.
          </p>
        ),
      },
      {
        id: "order",
        heading: "Order yang tercatat otomatis",
        toc: "Order otomatis",
        body: (
          <>
            <p>
              Salah satu hal pertama yang kami bangun adalah pencatatan order
              otomatis dari chat, sehingga pesanan tidak lagi tercecer atau
              salah hitung saat ramai.
            </p>
            <Figure cap="Ilustrasi rencana: order tercatat otomatis dari chat.">
              <WaChat
                head
                msgs={[
                  { side: "in", text: "2 es kopi susu, 1 croissant" },
                  { side: "out", text: "Tercatat ya kak ✅ Total Rp 56.000." },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "menu",
        heading: "Menu digital dan pembayaran",
        toc: "Menu & bayar",
        body: (
          <>
            <p>
              Kami juga merancang menu digital yang rapi dan alur pembayaran
              lokal seperti QRIS, agar pelanggan mudah memesan dan membayar
              tanpa keluar dari chat.
            </p>
            <Figure cap="Ilustrasi rencana: menu digital.">
              <MenuMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "poin",
        heading: "Poin dan pelanggan setia",
        toc: "Poin",
        body: (
          <>
            <p>
              Sistem poin sederhana sedang kami siapkan untuk membantu usaha
              membangun pelanggan setia, tanpa kartu fisik dan tanpa ribet.
            </p>
            <Figure cap="Ilustrasi rencana: sistem poin.">
              <PointsMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "laporan",
        heading: "Laporan sederhana",
        toc: "Laporan",
        body: (
          <>
            <p>
              Kami ingin pemilik usaha bisa melihat ringkasan penjualan harian
              dengan mudah, agar keputusan dibuat berdasarkan angka, bukan
              tebakan.
            </p>
            <Figure cap="Contoh ilustrasi laporan - angka hanya sampel, bukan data nyata.">
              <SummMockup />
            </Figure>
          </>
        ),
      },
      {
        id: "ainative",
        heading: "Bukan Chatbot tapi AI-Native",
        toc: "Bukan Chatbot tapi AI-Native",
        body: (
          <>
            <p>
              <b>Apa itu chatbot biasa?</b> Chatbot umumnya bekerja dengan
              aturan dan skrip. Anda atau tim Anda harus menyusun daftar
              pertanyaan beserta jawabannya, atau pohon pilihan seperti
              &quot;ketik 1 untuk menu, 2 untuk jam buka&quot;. Bot lalu
              mencocokkan pesan pelanggan dengan skrip itu. Selama pertanyaan
              sesuai skrip, ia menjawab. Begitu pelanggan menulis dengan cara
              lain - salah ketik, singkatan, atau hal yang tak terduga - bot
              bingung dan gagal. Karena itu chatbot perlu dilatih dan dirawat
              terus-menerus, dan tetap terasa kaku.
            </p>
            <p>
              <b>Apa itu AI-native?</b> AI-native berbeda sejak fondasinya.
              Alih-alih daftar aturan, ia dibangun di atas model bahasa besar
              (large language model) - model AI yang sudah belajar dari teks
              dalam jumlah sangat besar, sehingga paham bahasa manusia secara
              umum: maksud, konteks, bahkan gaya santai dan campuran bahasa.
              Anda tidak perlu melatihnya dari nol. Ia dirancang bisa menangkap
              pesan seperti &quot;es kopsu 2 ya bang, yg less sugar&quot; tanpa
              Anda ajari, karena ia memahami maksud, bukan sekadar mencocokkan
              kata kunci.
            </p>
            <p>
              <b>Bagaimana ia belajar?</b> Lewat machine learning - cara kerja
              AI yang menemukan pola dari banyak contoh, bukan dari aturan yang
              ditulis manusia satu per satu. Mirip orang yang makin paham
              setelah melihat banyak contoh: model menyesuaikan diri berdasarkan
              data yang dilihatnya. Untuk Sosmed AI, rencananya ini berarti ia
              mengenali pola pesanan dan kebiasaan pelanggan Anda dari waktu ke
              waktu - misalnya menu yang sering dipesan atau jam paling ramai -
              dan menjadi makin membantu seiring dipakai.
            </p>
            <p>
              Hasil yang kami tuju sederhana: Anda tinggal pakai, bukan sibuk
              mengajari.
            </p>
            <div className="cta-band">
              <h3>Segera Hadir</h3>
              <p>
                Sosmed AI sedang kami siapkan untuk pemilik warung, kafe, dan
                restoran kecil di Indonesia. Nantikan peluncurannya.
              </p>
            </div>
          </>
        ),
      },
    ],
    related: [
      {
        slug: "menu-digital-mudah-dipesan",
        g: "g2",
        tag: "Tips Bisnis",
        title: "Cara Atur Menu Digital yang Bikin Pelanggan Gampang Pesan",
        excerpt: "Menyusun menu yang jelas agar pelanggan langsung pesan.",
      },
      {
        slug: "sistem-poin-sederhana",
        g: "g5",
        tag: "Panduan",
        title: "Sistem Poin Sederhana untuk Usaha F&B Kecil",
        excerpt: "Program loyalitas yang ringan dijalankan.",
      },
      {
        slug: "laporan-penjualan-harian",
        g: "g3",
        tag: "Panduan",
        title: "Laporan Penjualan Harian: Apa yang Perlu Dipantau",
        excerpt: "Angka penting yang sebaiknya dipantau setiap hari.",
      },
    ],
  },

  "masalah-umkm-fnb-indonesia": {
    title: "Cerita di Balik Sosmed AI",
    category: "Cerita",
    readTime: "4 menit baca",
    datePublished: "2026-06-02",
    coverTitle: "Cerita di balik Sosmed AI",
    description:
      "Cerita di balik Sosmed AI: apa yang kami lihat di warung dan kafe kecil Indonesia, dan kenapa kami membangun alat yang bekerja langsung dari WhatsApp.",
    lede: (
      <>
        Sebelum menulis satu baris kode pun, kami menghabiskan waktu
        memperhatikan bagaimana warung dan kafe kecil di Indonesia menjalankan
        usahanya sehari-hari. Inilah yang kami lihat.
      </>
    ),
    tldr: [
      "Banyak usaha F&B kecil mengelola order lewat WhatsApp secara manual.",
      "Saat ramai, order mudah tercecer di antara banyak chat.",
      "Waktu pemilik banyak habis untuk mencatat dan menghitung.",
      "Solusi yang ada sering terlalu rumit atau mahal untuk usaha kecil.",
      "Kami ingin alat yang sesederhana mengobrol di WhatsApp.",
    ],
    sections: [
      {
        id: "lihat",
        heading: "Apa yang kami lihat",
        toc: "Apa yang kami lihat",
        body: (
          <p>
            Hampir setiap warung dan kafe kecil yang kami temui sudah menerima
            order lewat WhatsApp. Tapi semuanya dikerjakan manual: membaca chat
            satu per satu, menyalin pesanan ke buku atau kepala, lalu menghitung
            total. Cara ini berhasil saat sepi, tapi mulai goyah saat ramai.
          </p>
        ),
      },
      {
        id: "chat",
        heading: "Indonesia hidup di chat, bukan dashboard",
        toc: "Indonesia hidup di chat",
        body: (
          <>
            <p>
              Satu hal yang menonjol: di Indonesia, usaha kecil menjalankan
              bisnisnya lewat chat WhatsApp - bukan halaman login, bukan
              dashboard rumit seperti perusahaan besar. Mereka tim kecil, kadang
              hanya pemilik dan satu dua orang, yang ingin lebih produktif tapi
              tetap bisa tumbuh. Alat yang menuntut mereka pindah ke aplikasi
              baru justru menambah beban, bukan mengurangi.
            </p>
            <p>
              Angkanya memperkuat apa yang kami lihat. Indonesia adalah salah
              satu pasar WhatsApp terbesar di dunia, dengan puluhan juta
              pengguna aktif - termasuk di antara negara dengan unduhan WhatsApp
              Business terbanyak setelah India. Bagi mayoritas warga yang
              terhubung internet, WhatsApp sudah jadi bagian keseharian.
            </p>
            <p>
              Perilaku belanja pun mengikuti. Di banyak pasar seperti Indonesia,
              WhatsApp sudah menjadi cara yang disukai pelanggan untuk
              berhubungan dengan usaha - entah karena praktis, gratis dibanding
              SMS atau telepon, atau memang sudah jadi kebiasaan. Pelanggan
              tidak ingin mengunduh aplikasi baru hanya untuk memesan kopi;
              mereka ingin mengetik seperti biasa.
            </p>
            <p>
              Ada satu lapisan lagi yang khas Indonesia: bahasa. Pelanggan
              mengetik campur-campur - Bahasa Indonesia, bahasa daerah, sedikit
              Inggris, penuh singkatan dan gaya santai. Cara mengobrol seperti
              ini sulit ditangani sistem yang kaku, tapi justru di sinilah AI
              yang paham bahasa sehari-hari bisa membantu.
            </p>
            <p className="src-note">
              Catatan: angka di atas merujuk pada laporan publik tentang
              penggunaan WhatsApp di Indonesia (mis. data industri 2025-2026).
              Kami sengaja tidak mengutip angka pasti karena tiap sumber sedikit
              berbeda - yang konsisten adalah polanya: WhatsApp sangat dominan
              untuk komunikasi pelanggan di Indonesia.
            </p>
          </>
        ),
      },
      {
        id: "tercecer",
        heading: "Order yang tercecer di chat",
        toc: "Order tercecer",
        body: (
          <>
            <p>
              Saat jam ramai, pesan masuk bertubi-tubi. Mudah sekali ada order
              yang terlewat, tertukar, atau lupa dibalas. Setiap order yang
              hilang adalah uang yang hilang dan pelanggan yang kecewa.
            </p>
            <Figure cap="Ilustrasi: order yang mudah tercecer saat chat menumpuk.">
              <WaChat
                head
                msgs={[
                  { side: "in", text: "Mau pesan 2 kopi" },
                  { side: "in", text: "Eh tambah 1 croissant ya" },
                  { side: "in", text: "Halo kak? Jadi nggak?" },
                ]}
              />
            </Figure>
          </>
        ),
      },
      {
        id: "waktu",
        heading: "Waktu habis untuk administrasi",
        toc: "Waktu administrasi",
        body: (
          <p>
            Pemilik usaha yang seharusnya fokus pada rasa dan pelayanan malah
            menghabiskan banyak waktu untuk mencatat, menghitung, dan merekap.
            Pekerjaan administratif ini menumpuk dan melelahkan, padahal bukan
            inti dari usaha mereka.
          </p>
        ),
      },
      {
        id: "solusi",
        heading: "Kenapa solusi yang ada belum pas",
        toc: "Solusi yang ada",
        body: (
          <p>
            Ada banyak aplikasi kasir dan sistem order di luar sana, tapi sering
            terasa terlalu rumit, mahal, atau menuntut pelanggan mengunduh
            aplikasi baru. Untuk usaha kecil yang sibuk, hambatan sekecil itu
            sudah cukup membuat sebuah alat tidak terpakai.
          </p>
        ),
      },
      {
        id: "ubah",
        heading: "Apa yang ingin kami ubah",
        toc: "Apa yang kami ubah",
        body: (
          <p>
            Dari sinilah Sosmed AI berangkat: kami ingin alat yang sesederhana
            mengobrol di WhatsApp, tapi diam-diam merapikan order, menu, poin,
            dan laporan di belakang layar. Kami masih membangunnya, dan kami
            ingin melakukannya bersama orang-orang yang usahanya kami coba bantu.
          </p>
        ),
      },
      {
        id: "beda",
        heading: "Apa yang membuat pendekatan kami berbeda",
        toc: "Apa yang membuat kami berbeda",
        body: (
          <>
            <p>
              Banyak alat mencoba menyelesaikan masalah yang sama. Yang kami
              yakini berbeda adalah cara kami mendekatinya:
            </p>
            <ul>
              <li>
                <b>AI-native, bukan chatbot skrip.</b> Chatbot biasa harus Anda
                latih dengan daftar pertanyaan dan jawaban, lalu tetap kaku -
                kalau pelanggan bertanya di luar skrip, ia gagal. Sosmed AI
                dirancang memahami bahasa sehari-hari pelanggan sejak awal,
                termasuk campuran Bahasa Indonesia, bahasa daerah, dan
                singkatan, serta menalar maksud percakapan, bukan sekadar
                mencocokkan kata kunci.
              </li>
              <li>
                <b>Hidup di WhatsApp, bukan aplikasi terpisah.</b> Pelanggan
                tidak perlu mengunduh apa pun, dan Anda tidak perlu pindah ke
                dashboard. Pekerjaan administratif berjalan diam-diam di
                belakang chat yang sudah Anda pakai setiap hari.
              </li>
              <li>
                <b>Dibuat untuk usaha kecil Indonesia, bukan korporasi.</b> Ini
                bukan sistem perusahaan besar yang dikecilkan. Kami memikirkan
                tim kecil, bahasa lokal, dan pembayaran lokal seperti QRIS sejak
                baris pertama.
              </li>
              <li>
                <b>Satu alur, bukan tumpukan aplikasi.</b> Order, menu, poin,
                dan laporan dirancang menyatu dalam satu alur - bukan empat alat
                berbeda yang harus Anda sambungkan dan kelola sendiri.
              </li>
              <li>
                <b>Sederhana itu disengaja.</b> Bagian yang rumit kami sembunyikan
                di belakang layar, supaya yang Anda rasakan cuma satu: mengobrol
                seperti biasa, sisanya beres.
              </li>
            </ul>
            <p className="src-note">
              Ini prinsip yang memandu kami membangun Sosmed AI. Produknya masih
              dalam pengembangan, jadi sebagian sudah berbentuk dan sebagian
              masih kami kerjakan - dan kami akan terus jujur soal mana yang
              mana.
            </p>
          </>
        ),
      },
    ],
    related: [
      {
        slug: "order-whatsapp-lebih-cepat",
        g: "g3",
        tag: "Panduan",
        title: "Kenapa Order via WhatsApp Lebih Cepat dari Aplikasi",
        excerpt: "Kenapa pelanggan lebih nyaman pesan lewat chat.",
      },
      {
        slug: "mengelola-pesanan-jam-ramai",
        g: "g2",
        tag: "Tips Bisnis",
        title: "Mengelola Pesanan Saat Jam Ramai Tanpa Keteteran",
        excerpt: "Tips menjaga pesanan tetap rapi saat sibuk.",
      },
      {
        slug: "yang-sedang-kami-bangun",
        g: "g5",
        tag: "Produk",
        title: "Yang Sedang Kami Bangun di Sosmed AI",
        excerpt: "Apa yang sedang kami kerjakan dan rencananya bekerja.",
      },
    ],
  },
};

export const ARTICLE_SLUGS = Object.keys(ARTICLES);

export function formatArticleDate(datePublished: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${datePublished}T00:00:00.000Z`));
}

/**
 * Blog photos live in /public/blog as blog-{stem}-cover.jpg (16:9 article
 * banners) and blog-{stem}-cover-thumb.jpg (4:3 card thumbnails). The file
 * stems differ from the article slugs, so map slug -> stem here (single
 * source of truth). Titles are always real HTML text over the photo.
 */
const BLOG_IMAGE_STEM: Record<string, string> = {
  "sop-serah-terima-shift-warung-kafe": "sop-serah-terima-shift",
  "cara-mengurangi-food-waste-warung-kafe": "kurangi-food-waste",
  "mencocokkan-pembayaran-qris-dengan-order-whatsapp": "qris-order-whatsapp",
  "pelanggan-sering-ubah-pesanan-di-whatsapp": "revisi-order-whatsapp",
  "naikkan-harga-menu-tanpa-kehilangan-pelanggan": "naikkan-harga-menu",
  "stok-habis-saat-order-ramai": "stok-habis-order-ramai",
  "menangani-komplain-pelanggan-lewat-whatsapp": "komplain-whatsapp-pelanggan",
  "meningkatkan-nilai-order-tanpa-memaksa": "naikkan-nilai-order",
  "warung-ramai-belum-tentu-untung": "ramai-bukan-untung",
  "pemilik-warung-capek-bukan-karena-masak": "pemilik-warung-capek",
  "warung-tetap-jalan-saat-pemilik-libur": "warung-tetap-jalan",
  "pelanggan-bilang-nanti-order-lagi": "pelanggan-tidak-kembali",
  "bongkar-chat-whatsapp-warung": "order-hilang-chat",
  "promo-terus-bukan-solusi": "promo-bukan-solusi",
  "jam-ramai-adalah-ujian-sebenarnya": "jam-ramai-ujian",
  "menu-paling-laku-bisa-profit-tipis": "menu-laku-profit-tipis",
  "kebiasaan-pelanggan-pindah": "pelanggan-pindah",
  "bot-kaku-vs-ai-whatsapp": "bot-kaku-ai-native",
  "mulai-jualan-online-warung-kafe": "mulai-jualan-online",
  "otomatisasi-whatsapp-untuk-umkm-fnb": "otomatisasi-whatsapp",
  "cara-mengurangi-chaos-operasional-warung-kafe": "chaos-operasional",
  "cara-menjaga-pelanggan-lama-lewat-whatsapp": "retensi-pelanggan",
  "meningkatkan-penjualan-profit-fnb-kecil": "penjualan-profit",
  "mengubah-chat-whatsapp-menjadi-pelanggan-setia": "pelanggan-setia-whatsapp",
  "order-ramai-profit-tidak-naik": "kebocoran-profit-fnb",
  "program-loyalti-whatsapp-untuk-umkm": "loyalti-whatsapp",
  "mengetahui-menu-paling-laku-dan-menguntungkan": "menu-laku-menguntungkan",
  "ai-native-whatsapp-vs-chatbot": "ai-native-vs-chatbot",
  "5-cara-pelanggan-jadi-langganan": "5-cara-langganan",
  "order-whatsapp-lebih-cepat": "order-whatsapp",
  "menu-digital-mudah-dipesan": "menu-digital",
  "sistem-poin-sederhana": "sistem-poin",
  "mengelola-pesanan-jam-ramai": "jam-ramai",
  "laporan-penjualan-harian": "laporan-harian",
  "yang-sedang-kami-bangun": "produk-sosmed-ai",
  "masalah-umkm-fnb-indonesia": "cerita-sosmed-ai",
};

export function blogCover(slug: string): string {
  const stem = BLOG_IMAGE_STEM[slug];
  return stem ? `/blog/blog-${stem}-cover.jpg` : "";
}

export function blogThumb(slug: string): string {
  const stem = BLOG_IMAGE_STEM[slug];
  return stem ? `/blog/blog-${stem}-cover-thumb.jpg` : "";
}
