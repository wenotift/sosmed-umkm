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

/* ----- the 7 articles ----- */

export const ARTICLES: Record<string, Article> = {
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

/**
 * Blog photos live in /public/blog as blog-{stem}-cover.jpg (16:9 article
 * banners) and blog-{stem}-cover-thumb.jpg (4:3 card thumbnails). The file
 * stems differ from the article slugs, so map slug -> stem here (single
 * source of truth). Titles are always real HTML text over the photo.
 */
const BLOG_IMAGE_STEM: Record<string, string> = {
  "mulai-jualan-online-warung-kafe": "mulai-jualan-online",
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
