// FAQ content for /bantuan — ported verbatim from bantuan-prototype.html.
// `a` may contain <strong> + HTML entities; rendered via dangerouslySetInnerHTML.
// Shared by BantuanContent (UI + search) and page.tsx (FAQPage JSON-LD).

export type Faq = { q: string; a: string };
export type FaqCategory = {
  id: string; // anchor target, e.g. "cat-harga"
  label: string;
  blurb: string; // short text on the category card
  icon: string; // key into ICONS
  items: Faq[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "cat-harga",
    label: "Harga & Paket",
    blurb: "Tier, add-on, dan founding user.",
    icon: "price",
    items: [
      {
        q: "Tier mana yang cocok buat saya?",
        a: "<strong>Lite</strong> (Rp 249K): kafe baru, ~5 order/hari. <strong>Pro</strong> (Rp 399K): kafe yang udah jalan, ~6–10/hari. <strong>Max</strong> (Rp 799K): busy outlet / 2 outlet, ~10–20/hari. <strong>Ultra</strong> (Rp 1.399K): chain 2–3 outlet, ~20+/hari.",
      },
      {
        q: "Apa yang terjadi kalau saya lebihi quota order?",
        a: "Beli Order Pack tambahan (mulai Rp 90K untuk 100 order). Kalau tiap bulan selalu lebih, upgrade ke tier berikutnya — biasanya lebih hemat.",
      },
      {
        q: "Founding user pricing masih ada?",
        a: "Untuk 100 pelanggan pertama, harga Lite/Pro/Max/Ultra <strong>dikunci selamanya</strong> di harga launch. Setelah 100 founding user terisi, harga reguler berlaku (estimasi naik 15–25%).",
      },
      {
        q: "Berapa hemat dibanding tools terpisah?",
        a: "Tools terpisah (POS + WhatsApp BSP + loyalty CRM + menu QR) bisa total ~Rp 1.5M/bulan. Sosmed AI Pro Rp 399K = sekitar <strong>74% lebih hemat</strong> untuk fungsi serupa.",
      },
    ],
  },
  {
    id: "cat-order",
    label: "Order & Quota",
    blurb: "Cara hitung order & kapasitas.",
    icon: "bag",
    items: [
      {
        q: 'Apa "1 order" tepatnya?',
        a: "1 order = bot kirim <strong>instruksi pembayaran</strong> ke pelanggan (item + total + cara bayar). Pelanggan yang cuma tanya menu/jam buka/lokasi <strong>tidak</strong> dihitung order.",
      },
      {
        q: "Apakah customer chat juga dihitung order?",
        a: "<strong>Tidak.</strong> Customer chat (FAQ, tanya menu, info promo) <strong>unlimited</strong> di semua tier (fair use). Quota cuma kepake saat pelanggan benar-benar order dan bot kirim invoice. Bisa chat seharian gak jadi order = gak ada quota terpakai.",
      },
      {
        q: "Sosmed AI hitung pakai order atau message?",
        a: '<strong>Pakai order</strong>, bukan message — karena owner UMKM lebih familiar dengan "berapa orderan per hari" daripada "berapa pesan". Tiap order biasanya pakai sekitar 2 utility message (Meta WhatsApp Business API), dan itu udah include di harga paket.',
      },
      {
        q: "Berapa kapasitas order tiap tier?",
        a: "<strong>Lite</strong> sampai 150 order/bulan (~5/hari) · <strong>Pro</strong> 250 (~8/hari) · <strong>Max</strong> 500 total untuk 2 outlet (~17/hari) · <strong>Ultra</strong> 1.000 total untuk 3 outlet (~33/hari). Customer chat tetap unlimited di semua tier.",
      },
      {
        q: "Gimana kalau kapasitas order kurang bulan ini?",
        a: "Top up <strong>Order Pack</strong> tambahan, aktif 30 hari, flat Rp 900/order: +100 (Rp 90K), +250 (Rp 225K), +500 (Rp 450K), +1.000 (Rp 900K), +2.500 (Rp 2.25jt). Kalau tiap bulan selalu lebih, upgrade tier biasanya lebih hemat.",
      },
      {
        q: "Perlu integrasi payment gateway untuk pakai Sosmed AI?",
        a: "<strong>Tidak perlu.</strong> Bisa pakai cash atau transfer manual — quota tetap berjalan sama. Kami tracking dari instruksi bot, bukan dari konfirmasi bank. Bot kasih opsi bayar (QRIS / transfer / cash di tempat) dan kamu terima notif order baru.",
      },
      {
        q: "Order dihitung per outlet atau digabung?",
        a: "Untuk Max (2 outlet) &amp; Ultra (3 outlet), kapasitas order dihitung <strong>total gabungan</strong> semua outlet — jadi fleksibel kalau satu outlet lagi ramai dan yang lain sepi.",
      },
    ],
  },
  {
    id: "cat-fitur",
    label: "Fitur & Produk",
    blurb: "4 sistem & perbandingan tool.",
    icon: "layers",
    items: [
      {
        q: "Apa Sosmed AI cuma chatbot?",
        a: "<strong>Tidak.</strong> Sosmed AI platform lengkap dengan 4 sistem terintegrasi: Order Bot AI, Menu Digital + QR, Sistem Poin &amp; Member, dan Kelola via WhatsApp — semua sudah termasuk di tiap tier, dengan tingkat kemampuan beda per tier.",
      },
      {
        q: "Ini AI beneran atau chatbot skrip biasa?",
        a: "<strong>AI beneran.</strong> Bukan chatbot otomatis berbasis skrip yang cuma cocokkan kata kunci. Sosmed AI paham maksud pelanggan dan bales natural — customer kamu ngobrol kayak sama orang, bukan robot kaku.",
      },
      {
        q: "Apa itu Order Bot AI?",
        a: 'Pelanggan chat di WhatsApp, AI handle dari sapaan sampai konfirmasi pembayaran. Invoice otomatis terkirim, owner cuma terima notif "order baru" tanpa balas chat satu-satuan. Di Pro ke atas ada auto-reply terjadwal; di Max/Ultra ada multi-outlet routing.',
      },
      {
        q: "Gimana cara kerja Menu Digital + QR?",
        a: "Customer scan QR di meja, pilih menu, order langsung lewat WhatsApp. Tambah menu, update harga, ganti foto — semua dari WhatsApp, no laptop. Pro ke atas dapat multi-variant (size/topping), stock management (out-of-stock auto-hide), dan schedule menu (breakfast/lunch/dinner).",
      },
      {
        q: "Sistem Poin &amp; Member-nya gimana?",
        a: "Tiap order = poin masuk otomatis. Member kedaftar dari nomor WhatsApp mereka, tanpa kartu fisik. Segmentasi VIP/regular/dormant; di Pro ke atas bisa targeted broadcast per segment + birthday reminder. Max/Ultra: member &amp; poin bisa dipakai lintas outlet (cross-outlet redemption).",
      },
      {
        q: 'Maksudnya "kelola via WhatsApp" apa?',
        a: "Lihat order masuk, revenue harian, top customer, top menu — semua dari chat WhatsApp ke bot Sosmed AI. Tanpa buka laptop, tanpa login dashboard, tanpa training. Pro: analytics lebih detail + custom alert; Ultra: executive dashboard per-outlet + aggregated.",
      },
      {
        q: "Beda Sosmed AI sama Pawoon / Mokapos?",
        a: "Pawoon/Mokapos = POS tradisional dengan dashboard di laptop/tablet, customer dilayani staff di kasir. Sosmed AI running lewat WhatsApp — customer pesan sendiri dari WhatsApp, owner kelola dari WhatsApp. Bukan pengganti POS, tapi layer WhatsApp commerce yang jalan berdampingan.",
      },
      {
        q: "Apakah marketing broadcast wajib?",
        a: "Tidak — marketing broadcast adalah add-on optional. Tapi pelanggan yang dapat promo terjadwal biasanya 30–40% lebih sering balik order.",
      },
      {
        q: "Bisa dipakai buat lebih dari satu outlet?",
        a: "<strong>Max</strong> support 2 outlet (1 WhatsApp number, auto-route ke outlet terdekat, member shared). <strong>Ultra</strong> support 3 outlet dengan centralized menu control &amp; CRM. Untuk 4+ outlet atau franchise, lihat opsi Enterprise (coming soon).",
      },
    ],
  },
  {
    id: "cat-akun",
    label: "Akun & Langganan",
    blurb: "Cancel, migrasi, founding price.",
    icon: "user",
    items: [
      {
        q: "Bisa cancel kapan aja?",
        a: "Bisa, tanpa penalty. Cancel sekarang, akses tetap aktif sampai akhir periode bayar.",
      },
      {
        q: "Saya udah pakai Pawoon. Bisa pindah?",
        a: "Sosmed AI <strong>bukan pengganti POS kamu</strong> — kami jalan berdampingan. Pawoon/Moka tetap kamu pakai buat kasir &amp; operasional; Sosmed AI handle sisi WhatsApp (order, menu, poin, chat customer). Jadi gak perlu migrasi atau pindah data — tinggal nyalain Sosmed AI di WhatsApp kamu.",
      },
      {
        q: "GoFood/GrabFood sync kapan?",
        a: "Sedang dikembangkan. Akan tersedia untuk Enterprise dulu (Q4 2026), kemudian menyusul ke Ultra (2027).",
      },
    ],
  },
];

// Plain text (tags stripped + basic entities decoded) — for search + JSON-LD answers.
export const toPlainText = (html: string): string =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export const ALL_FAQS: Faq[] = FAQ_CATEGORIES.flatMap((c) => c.items);
