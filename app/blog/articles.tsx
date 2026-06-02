import type { ReactNode } from "react";

/**
 * Blog article content map (slug -> Article). All articles share one layout
 * (rendered by app/blog/[slug]/page.tsx). Content is placeholder/sample —
 * "Hari ini" dates, "Tim Sosmed AI" byline; sales-summary numbers keep their
 * "sampel, bukan data nyata" caption. Every blog page is noindex and excluded
 * from the sitemap.
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
    coverTitle: "Mulai jualan online cukup dari WhatsApp",
    description:
      "Panduan langkah demi langkah memindahkan order, menu, pembayaran, dan pelanggan setia warung & kafe ke WhatsApp — tanpa aplikasi rumit dan tanpa biaya besar di awal.",
    lede: (
      <>
        Banyak pemilik warung dan kafe merasa &quot;jualan online&quot; itu
        ribet — harus bikin aplikasi, belajar marketplace, atau bayar mahal.
        Padahal, Anda bisa mulai dari alat yang sudah Anda kuasai setiap hari:
        WhatsApp. Berikut panduan langkah demi langkah.
      </>
    ),
    tldr: [
      "Tidak perlu aplikasi mahal — mulai jualan online cukup dari WhatsApp yang sudah Anda pakai.",
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
                Cantumkan harga dengan jelas — pelanggan tidak suka harus
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
              sinilah alat bantu seperti Sosmed AI membantu — order dari chat
              tercatat otomatis tanpa Anda salin satu per satu.
            </p>
            <Figure cap="Ilustrasi: alur konfirmasi order dan pembayaran.">
              <WaChat
                msgs={[
                  {
                    side: "out",
                    text: "Pesanan kakak: 2x Es Kopi Susu — total Rp 36.000. Lanjut ya?",
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
                Sistem poin atau stempel digital — beli sekian kali, dapat
                gratis atau diskon.
              </li>
              <li>Sapaan personal dan ucapan terima kasih setelah order.</li>
              <li>
                Info promo ke pelanggan yang pernah memesan, secukupnya — jangan
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
            <Figure cap="Contoh ilustrasi laporan — angka hanya sampel, bukan data nyata.">
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
              supaya Anda bisa fokus melayani pelanggan — bukan sibuk mengurus
              administrasi.
            </p>
            <p>
              Sosmed AI dibangun untuk membantu langkah itu, semua langsung dari
              WhatsApp — agar Anda bisa fokus melayani pelanggan, bukan sibuk
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
    coverTitle: "Bikin pelanggan kembali lagi, lagi, dan lagi",
    description:
      "Mendapat pelanggan baru itu mahal. Membuat pelanggan lama kembali jauh lebih murah — dan lebih menguntungkan. Berikut lima cara sederhana.",
    lede: (
      <>
        Mendapat pelanggan baru itu mahal. Membuat pelanggan lama kembali jauh
        lebih murah — dan lebih menguntungkan. Berikut lima cara sederhana.
      </>
    ),
    tldr: [
      "Pelanggan setia lebih murah daripada terus mencari pelanggan baru.",
      "Sapa pelanggan secara personal — orang suka diingat.",
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
            Pelanggan setia tidak hanya kembali — mereka belanja lebih sering,
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
              Beri alasan konkret untuk kembali. Sistem poin sederhana — beli
              sekian kali, dapat gratis atau diskon — sangat efektif dan tidak
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
            Konsistensi membangun kepercayaan — pelanggan tahu persis apa yang
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
            berlebihan sampai mengganggu — cukup sesekali agar usaha Anda tetap
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
      "Pelanggan sudah punya WhatsApp — nol friksi, tanpa unduh apa pun.",
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
            mengunduh, mendaftar, dan belajar antarmuka baru — hambatan yang
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
            atau alamat. Bolak-balik tanya-jawab terjadi secara alami — sesuatu
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
      "Cantumkan harga dengan jelas — jangan bikin pelanggan bertanya dulu.",
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
            Selalu cantumkan harga. Pelanggan tidak suka harus bertanya — dan
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
      "Buat mudah diikuti — tanpa kartu fisik yang gampang hilang.",
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
            Hadiah harus terasa sepadan dengan usaha mengumpulkannya — misalnya
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
            Pelanggan sering lupa mereka punya poin. Pengingat singkat —
            &quot;16 poin lagi menuju voucher&quot; — mendorong mereka kembali.
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
      "Kenali menu terlaris — dan yang paling lambat.",
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
            <Figure cap="Contoh ilustrasi laporan — angka hanya sampel, bukan data nyata.">
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
};

export const ARTICLE_SLUGS = Object.keys(ARTICLES);
