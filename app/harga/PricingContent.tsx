"use client";

import { Fragment, useState } from "react";

// TODO: set the business WhatsApp number — replace with
// https://wa.me/<NUMBER>?text=... (same placeholder as the navbar "Chat Kami" link)
const WA_HREF = "#";

// deterministic thousands separator (SSR-safe, no locale dependency)
const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ---- §2 Four-pillar "Why" ---- */
const PILLARS = [
  {
    emoji: "🤖",
    name: "Order Bot AI",
    tagline: "AI yang ngerti orderan customer kamu.",
    body: 'Pelanggan chat di WhatsApp, AI handle dari sapaan sampai konfirmasi pembayaran. Invoice otomatis terkirim. Owner cuma terima notif "order baru" tanpa harus balas chat satu-satuan.',
    cocok: "Kafe yang tim-nya udah kewalahan handle chat customer.",
  },
  {
    emoji: "📱",
    name: "Menu Digital + QR Meja",
    tagline: "Customer scan QR, pilih menu, order langsung lewat WhatsApp.",
    body: "Tambah menu baru, update harga, ganti foto - semua dari WhatsApp. No dashboard rumit, no laptop, no print menu baru tiap minggu.",
    cocok: "Kafe yang menu-nya sering berubah atau punya banyak variasi.",
  },
  {
    emoji: "⭐",
    name: "Sistem Poin & Member",
    tagline:
      "Setiap order = poin masuk. Pelanggan punya alasan balik. Kamu punya database member tanpa kartu fisik.",
    body: "Member otomatis terdaftar dari WhatsApp number mereka. Segmentasi VIP / regular / dormant otomatis. Kirim promo khusus ke segment yang kamu mau (di tier Pro ke atas).",
    cocok: "Kafe yang mau bangun customer base loyal, bukan cuma transaksional.",
  },
  {
    emoji: "📊",
    name: "Kelola Order dari WhatsApp",
    tagline:
      "Seluruh operasional bisnis dijalankan dari aplikasi yang udah kamu pakai tiap hari.",
    body: "Lihat order masuk, total revenue harian, top customer, top menu - semua dari chat WhatsApp ke bot Sosmed AI. Tanpa buka laptop, tanpa login dashboard, tanpa training.",
    cocok: "Owner yang ga punya waktu buat training tim atau belajar tools baru.",
  },
];

/* ---- §3 Vs separate tools ---- */
const VS_TOOLS = {
  rows: [
    { tool: "POS / Order management", usual: "Pawoon Pro / Mokapos Premium", price: "Rp 549K" },
    { tool: "WhatsApp BSP / chatbot", usual: "Wati / AiSensy", price: "Rp 600K" },
    { tool: "Loyalty / CRM", usual: "Skor / Tada / custom build", price: "Rp 250K" },
    { tool: "Menu QR tool", usual: "Skor QR / custom", price: "Rp 150K" },
  ],
  total: "Rp 1.549K/bulan",
  proChecks: [
    "4 sistem terintegrasi",
    "Single WhatsApp number untuk semuanya",
    "Member database & order data satu tempat",
    "No integrasi antar tools yang rusak terus",
  ],
};

/* ---- §4 Tiers ---- */
type Pillar = { emoji: string; name: string; items: string[] };
type Plan = {
  name: string;
  emoji: string;
  price: number | null;
  for: string;
  featured?: boolean;
  cta: string;
  ctaKind?: "soon" | "consult";
  audience?: string[];
  pillars: Pillar[];
  support?: string[];
  enterprise?: string[];
  priceNote?: string;
  footnote?: string;
};

const PLANS: Plan[] = [
  {
    name: "Lite",
    emoji: "📦",
    price: 249000,
    for: "Untuk kafe yang baru mulai digitalisasi.",
    cta: "Mulai Trial Gratis 7 Hari",
    pillars: [
      {
        emoji: "🤖",
        name: "Order Bot AI",
        items: [
          "AI customer service via WhatsApp",
          "Auto invoice & confirmation",
          "Kapasitas: sampai 150 order/bulan*",
        ],
      },
      {
        emoji: "📱",
        name: "Menu Digital + QR Meja",
        items: [
          "1 menu set untuk 1 outlet",
          "Update kapan aja via WhatsApp",
          "Upload foto menu unlimited",
        ],
      },
      {
        emoji: "⭐",
        name: "Sistem Poin & Member",
        items: [
          "Member database tanpa batasan",
          "Auto-tracking poin per transaksi",
          "Segmentasi dasar (VIP / regular)",
        ],
      },
      {
        emoji: "📊",
        name: "Kelola via WhatsApp",
        items: [
          "Daily summary di WhatsApp",
          "Top menu & top customer report",
          "1 owner access",
        ],
      },
    ],
    support: ["Email support (response <24 jam)"],
    footnote: '*150 order/bulan ≈ 5 order/hari rata-rata. Lebih jelas tentang "1 order" di FAQ.'.replace(
      "≈",
      "~",
    ),
  },
  {
    name: "Pro",
    emoji: "⭐",
    price: 399000,
    for: "Untuk kafe yang sudah jalan dan mau scale.",
    featured: true,
    cta: "Pilih Pro",
    pillars: [
      {
        emoji: "🤖",
        name: "Order Bot AI (Enhanced)",
        items: [
          "Semua fitur Lite, ditambah:",
          "Auto-reply terjadwal (otomatis kirim promo jam tertentu)",
          "Kapasitas: sampai 250 order/bulan",
        ],
      },
      {
        emoji: "📱",
        name: "Menu Digital + QR Meja",
        items: [
          "Multi-variant menu (size, topping, custom)",
          "Stock management (out-of-stock auto-hide)",
          "Schedule menu (breakfast / lunch / dinner)",
        ],
      },
      {
        emoji: "⭐",
        name: "Sistem Poin & Member (Advanced)",
        items: [
          "Semua fitur Lite, ditambah:",
          "Segmentasi advanced (VIP, regular, dormant, baru)",
          "Targeted broadcast per segment",
          "Birthday reminder otomatis",
        ],
      },
      {
        emoji: "📊",
        name: "Kelola via WhatsApp (Pro)",
        items: [
          "Semua fitur Lite, ditambah:",
          "Analytics lebih detail (peak hours, conversion rate)",
          "2 owner/staff access",
          "Custom alert (low inventory, no order in X hours)",
        ],
      },
    ],
    support: ["Priority support (response <2 jam)"],
  },
  {
    name: "Max",
    emoji: "🚀",
    price: 799000,
    for: "Untuk kafe ramai atau brand 2-outlet.",
    cta: "Pilih Max",
    pillars: [
      {
        emoji: "🤖",
        name: "Order Bot AI (Multi-outlet)",
        items: [
          "Semua fitur Pro, ditambah:",
          "1 WhatsApp number untuk 2 outlets (auto-route ke outlet terdekat)",
          "Kapasitas: sampai 500 order/bulan total",
        ],
      },
      {
        emoji: "📱",
        name: "Menu Digital + QR Meja (Multi-outlet)",
        items: [
          "Menu beda per outlet (kalau perlu)",
          "Stock per outlet",
          "Cross-outlet menu sharing (kalau pakai resep sama)",
        ],
      },
      {
        emoji: "⭐",
        name: "Sistem Poin & Member (Cross-outlet)",
        items: [
          "Member shared antar 2 outlets",
          "Poin earned di outlet A bisa redeem di outlet B",
          "Cross-outlet performance comparison",
        ],
      },
      {
        emoji: "📊",
        name: "Kelola via WhatsApp (Multi-outlet Dashboard)",
        items: [
          "Lihat performa per outlet",
          "Konsolidasi revenue 2 outlets",
          "5 owner/staff access",
          "Bandingkan top menu antar outlet",
        ],
      },
    ],
    support: [
      "Dedicated support channel (WhatsApp group dengan tim Sosmed AI)",
      "Onboarding khusus untuk tim kamu (1 sesi included)",
    ],
  },
  {
    name: "Ultra",
    emoji: "💎",
    price: 1399000,
    for: "Untuk chain F&B 2-3 outlets yang serius scale.",
    cta: "Pilih Ultra",
    pillars: [
      {
        emoji: "🤖",
        name: "Order Bot AI (Chain-grade)",
        items: [
          "Semua fitur Max, ditambah:",
          "3 outlets, unified ordering",
          "Kapasitas: sampai 1.000 order/bulan total",
          "Volume diskon: Rp 199 lebih hemat per order vs Max",
        ],
      },
      {
        emoji: "📱",
        name: "Menu Digital + QR Meja (Enterprise menu management)",
        items: [
          "Centralized menu control across 3 outlets",
          "Version control (rollback menu kalau salah update)",
          "Schedule menu by outlet (breakfast Jakarta, lunch Bandung)",
        ],
      },
      {
        emoji: "⭐",
        name: "Sistem Poin & Member (Chain CRM)",
        items: [
          "Centralized member database 3 outlets",
          "Cross-outlet point redemption",
          "Cohort analysis (which members buy across outlets)",
          "Multi-outlet birthday & anniversary campaigns",
        ],
      },
      {
        emoji: "📊",
        name: "Kelola via WhatsApp (Executive level)",
        items: [
          "Executive dashboard: outlet-level + aggregated",
          "Quarterly business review dengan tim Sosmed AI",
          "10 owner/staff access",
          "Custom KPI tracking",
        ],
      },
    ],
    support: [
      "Dedicated account manager",
      "On-site training (sampai 3 sesi per tahun)",
      "Quarterly business review",
    ],
  },
  {
    name: "Custom",
    emoji: "🏢",
    price: null,
    for: "Untuk chain 4+ outlets, franchise, white-label.",
    cta: "Konsultasi 30 Menit",
    ctaKind: "consult",
    priceNote: "Harga mulai dari Rp 2.5M/bulan (tergantung scope).",
    audience: [
      "4+ outlets atau lagi expand cepat",
      "Volume order tinggi (>1.500/bulan total)",
      "Butuh integrasi POS legacy (Moka, Olsera, Pawoon, custom)",
      "Butuh sync dengan GoFood / GrabFood",
      "Butuh white-label / branded experience",
    ],
    pillars: [
      {
        emoji: "🤖",
        name: "Custom Order Bot",
        items: ["Unlimited outlets", "Custom message volume", "Bulk pricing untuk marketing broadcast"],
      },
      {
        emoji: "📱",
        name: "Enterprise Menu Management",
        items: ["Custom API", "POS integration (sync 2-arah)", "Custom workflows"],
      },
      {
        emoji: "⭐",
        name: "Chain CRM Platform",
        items: [
          "Full white-label option",
          "Custom segment definitions",
          "Integration dengan ERP / accounting",
        ],
      },
      {
        emoji: "📊",
        name: "Executive Reporting",
        items: ["Custom dashboard", "API access untuk BI tools", "Data export terjadwal"],
      },
    ],
    enterprise: [
      "SLA 99.9% uptime",
      "Data residency Indonesia",
      "Dedicated team",
      "Custom integrations",
      "Unlimited training",
    ],
  },
];

/* ---- §5 Comparison table (grouped, 5-col) ---- */
type Cell = "chk" | "dash" | string;
const C = "chk" as Cell;
const D = "dash" as Cell;
type Row = { label: string; head?: boolean; v: [Cell, Cell, Cell, Cell, Cell] };
const COMPARE: Row[] = [
  { label: "Harga/bulan", v: ["Rp 249K", "Rp 399K", "Rp 799K", "Rp 1.399K", "Hubungi"] },
  { label: "Outlets", v: ["1", "1", "2", "3", "4+"] },
  { label: "Order capacity", v: ["150", "250", "500", "1.000", "Custom"] },
  { label: "🤖 Order Bot", head: true, v: [C, C, C, C, C] },
  { label: "AI customer service", v: [C, C, C, C, C] },
  { label: "Auto-invoice", v: [C, C, C, C, C] },
  { label: "Auto-reply terjadwal", v: [D, C, C, C, C] },
  { label: "Multi-outlet routing", v: [D, D, C, C, C] },
  { label: "📱 Menu Digital + QR", head: true, v: [C, C, C, C, C] },
  { label: "Update via WhatsApp", v: [C, C, C, C, C] },
  { label: "Foto unlimited", v: [C, C, C, C, C] },
  { label: "Multi-variant menu", v: [D, C, C, C, C] },
  { label: "Schedule menu", v: [D, C, C, C, C] },
  { label: "Menu per outlet", v: [D, D, C, C, C] },
  { label: "Centralized control", v: [D, D, D, C, C] },
  { label: "⭐ Poin & Member", head: true, v: [C, C, C, C, C] },
  { label: "Member database", v: [C, C, C, C, C] },
  { label: "Auto-tracking poin", v: [C, C, C, C, C] },
  { label: "Segmentasi advanced", v: [D, C, C, C, C] },
  { label: "Targeted broadcast", v: [D, C, C, C, C] },
  { label: "Cross-outlet redemption", v: [D, D, "2 outlets", "3 outlets", "All outlets"] },
  { label: "Cohort analysis", v: [D, D, D, C, C] },
  { label: "📊 Kelola via WhatsApp", head: true, v: [C, C, C, C, C] },
  { label: "Daily summary", v: [C, C, C, C, C] },
  { label: "Top menu / customer", v: [C, C, C, C, C] },
  { label: "Custom alerts", v: [D, C, C, C, C] },
  { label: "Multi-outlet dashboard", v: [D, D, C, C, C] },
  { label: "Executive dashboard", v: [D, D, D, C, C] },
  { label: "Quarterly business review", v: [D, D, D, C, C] },
  { label: "Support", v: ["Email", "Priority", "Dedicated channel", "Account manager", "Dedicated team"] },
  { label: "On-site training", v: [D, D, "1 sesi", "3 sesi/tahun", "Unlimited"] },
  { label: "GoFood/GrabFood sync", v: [D, D, D, D, C] },
  { label: "Custom integrations", v: [D, D, D, D, C] },
  { label: "SLA 99.9%", v: [D, D, D, D, C] },
];

/* ---- §6 Add-ons ---- */
const ORDER_ADDON: [string, string][] = [
  ["+100 orders", "Rp 90.000"],
  ["+250 orders", "Rp 225.000"],
  ["+500 orders", "Rp 450.000"],
  ["+1.000 orders", "Rp 900.000"],
  ["+2.500 orders", "Rp 2.250.000"],
  ["5.000+ orders", "Hubungi Sales"],
];
const BROADCAST_ADDON: [string, string][] = [
  ["Per-pesan", "Rp 800/msg"],
  ["100 broadcasts", "Rp 80.000"],
  ["500 broadcasts", "Rp 400.000"],
  ["1.000 broadcasts", "Rp 800.000"],
  ["5.000 broadcasts", "Rp 4.000.000"],
  ["10.000+ broadcasts", "Hubungi Sales"],
];

/* ---- §7 FAQ ---- */
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Tier mana yang cocok buat saya?",
    a: (
      <ul className="faq-list">
        <li><b>Lite</b> (Rp 249K): Kafe baru, warung kecil. ~5 order/hari atau kurang.</li>
        <li><b>Pro</b> (Rp 399K): Kafe yang udah jalan, mau scale efisiensi. ~6-10 order/hari.</li>
        <li><b>Max</b> (Rp 799K): Busy outlet ATAU baru buka outlet kedua. ~10-20 order/hari.</li>
        <li><b>Ultra</b> (Rp 1.399K): Chain 2-3 outlets yang serius. ~20+ order/hari total.</li>
        <li><b>Custom</b>: 4+ outlets, franchise, atau butuh integrasi khusus (GoFood, POS legacy).</li>
      </ul>
    ),
  },
  {
    q: 'Apa "1 order" tepatnya?',
    a: (
      <>
        <p>1 order = bot kirim <b>instruksi pembayaran</b> ke pelanggan (item + total + cara bayar).</p>
        <p className="faq-sub">✅ Count sebagai order:</p>
        <ul className="faq-list">
          <li>Pelanggan udah pilih item, bot kasih total + instruksi bayar</li>
        </ul>
        <p className="faq-sub">❌ Tidak count:</p>
        <ul className="faq-list">
          <li>Pelanggan cuma tanya menu, jam buka, lokasi (= customer chat, unlimited)</li>
          <li>Order dibatalkan via dashboard</li>
        </ul>
        <p>Owner bisa cancel ghost orders sampai 10% per bulan untuk return ke quota.</p>
      </>
    ),
  },
  {
    q: "Apakah customer chat juga count sebagai order?",
    a: (
      <>
        <p><b>Tidak.</b> Customer chat (FAQ, tanya menu, info promo, dll) <b>unlimited</b> di semua tier (under fair use).</p>
        <p>Quota cuma kepake saat pelanggan benar-benar order dan bot kirim invoice. Bisa chat seharian ga jadi-jadi = ga ada quota terpakai.</p>
      </>
    ),
  },
  {
    q: "Apa Sosmed AI cuma chatbot?",
    a: (
      <>
        <p><b>Tidak.</b> Sosmed AI adalah <b>platform lengkap</b> dengan 4 sistem terintegrasi:</p>
        <ul className="faq-list">
          <li>🤖 Order Bot - AI customer service</li>
          <li>📱 Menu Digital + QR - sistem menu</li>
          <li>⭐ Poin & Member - sistem loyalty</li>
          <li>📊 Kelola via WhatsApp - sistem operasional</li>
        </ul>
        <p>Semua harga Lite/Pro/Max/Ultra udah termasuk <b>keempat sistem</b>, dengan tingkat kemampuan beda per tier.</p>
      </>
    ),
  },
  {
    q: "Beda Sosmed AI sama Pawoon / Mokapos?",
    a: (
      <>
        <p>Pawoon / Mokapos = POS tradisional dengan dashboard di laptop / tablet. Sosmed AI = platform yang running lewat WhatsApp.</p>
        <p className="faq-sub">Yang beda:</p>
        <ul className="faq-list">
          <li>Sosmed AI: customer pesan langsung dari WhatsApp (no app, no scan QR mandatory)</li>
          <li>Pawoon: customer harus dilayani staff di kasir</li>
          <li>Sosmed AI: owner kelola dari WhatsApp</li>
          <li>Pawoon: owner kelola dari laptop/tablet</li>
        </ul>
        <p className="faq-sub">Yang sama:</p>
        <ul className="faq-list">
          <li>Order management</li>
          <li>Menu digital</li>
          <li>Loyalty system</li>
          <li>Reporting</li>
        </ul>
        <p>Sosmed AI cocok untuk cafe yang mau <b>otomasi WhatsApp commerce</b>, bukan menggantikan POS fisik.</p>
      </>
    ),
  },
  {
    q: "Apakah marketing broadcast wajib?",
    a: (
      <>
        <p>Tidak. Marketing broadcast adalah <b>add-on optional</b>. Kamu bisa pakai Sosmed AI tanpa pernah kirim broadcast.</p>
        <p>Tapi data kami: customer yang dapat promo terjadwal balik 30-40% lebih sering. Itu sebabnya kami sediakan add-on ini affordable (Rp 800/msg).</p>
      </>
    ),
  },
  {
    q: "Bisa cancel kapan aja?",
    a: <p>Bisa, tanpa penalty. Cancel sekarang, akses tetap aktif sampai akhir periode bayar.</p>,
  },
  {
    q: "Founding user pricing masih ada?",
    a: (
      <p>
        Untuk 100 pelanggan pertama, harga Lite/Pro/Max/Ultra <b>dikunci selamanya</b> di harga launch ini. Setelah 100 founding user terisi, harga regular berlaku (estimasi naik 15-25%).
      </p>
    ),
  },
  {
    q: "GoFood/GrabFood sync kapan?",
    a: <p>Sedang dikembangkan. Akan tersedia di tier <b>Custom</b> dulu (Q4 2026), kemudian menyusul ke Ultra (2027).</p>,
  },
  {
    q: "Saya udah pakai Pawoon. Bisa migrasi?",
    a: (
      <p>
        Untuk <b>Custom tier</b>: iya, kami bantu migrasi data. Untuk tier lain (Lite/Pro/Max/Ultra): mulai fresh - biasanya butuh 1-2 minggu paralel sampai pelanggan terbiasa pesan via WhatsApp.
      </p>
    ),
  },
  {
    q: "Berapa hemat dibanding tools terpisah?",
    a: (
      <>
        <p>Kalau kamu beli tools terpisah (POS + WhatsApp BSP + loyalty CRM + menu QR), total bisa Rp 1.5M/bulan.</p>
        <p>Sosmed AI Pro Rp 399K = <b>74% lebih hemat</b> untuk fungsi serupa.</p>
      </>
    ),
  },
];

const period = (annual: boolean) => (annual ? "/tahun" : "/bulan");
const priceOf = (monthly: number, annual: boolean) => (annual ? monthly * 10 : monthly);

function ComparisonCell({ value }: { value: Cell }) {
  if (value === "chk") return <span className="chk">✓</span>;
  if (value === "dash") return <span className="dash">–</span>;
  return <>{value}</>;
}

function AddonTable({
  title,
  intro,
  head,
  rows,
}: {
  title: string;
  intro: string;
  head: [string, string];
  rows: [string, string][];
}) {
  return (
    <div className="addon-card">
      <h3 className="addon-h">{title}</h3>
      <p className="addon-intro">{intro}</p>
      <div className="addon-wrap">
        <table className="ctable addon-table">
          <thead>
            <tr>
              <th>{head[0]}</th>
              <th>{head[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b]) => (
              <tr key={a}>
                <td>{a}</td>
                <td className={b === "Hubungi Sales" ? "addon-call" : undefined}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricingContent() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="pricing-page">
      {/* §1 HERO */}
      <section className="pricing-hero">
        <div className="wrap">
          <h1>
            Platform Lengkap untuk Kafe Indonesia.
            <br />
            Semua Lewat WhatsApp.
          </h1>
          <p className="lead">
            Order taking, menu digital, sistem poin, dan kelola operasional -{" "}
            <b>4 sistem dalam 1 langganan</b>. Mulai dari Rp 249K/bulan.
          </p>
          <div className="hero-cta">
            <button type="button" className="btn btn-soon" disabled>
              <span className="dot"></span> Coba Gratis 7 Hari
            </button>
            <a className="btn btn-ghost" href="#tiers">
              Lihat Harga
            </a>
          </div>
          <p className="trust">Trial 7 hari · No credit card · Cancel kapan aja</p>
        </div>
      </section>

      {/* §2 FOUR-PILLAR WHY */}
      <section style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Why Sosmed AI</div>
          <h2 className="sec-title">Satu Langganan. Empat Sistem Terintegrasi.</h2>
          <p className="sec-lead">
            Kalau biasanya kamu pakai 4 tools terpisah, Sosmed AI gabungin semuanya
            jadi satu - running lewat WhatsApp yang udah kamu pakai tiap hari.
          </p>
          <div className="pillars">
            {PILLARS.map((p) => (
              <div className="pillar-card" key={p.name}>
                <div className="pc-emoji">{p.emoji}</div>
                <h3>{p.name}</h3>
                <p className="pc-tag">{p.tagline}</p>
                <p className="pc-body">{p.body}</p>
                <p className="pc-cocok">
                  <b>Cocok untuk:</b> {p.cocok}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 VS SEPARATE TOOLS */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Hitung-hitungan</div>
          <h2 className="sec-title">Berapa Hemat Pakai Sosmed AI?</h2>
          <div className="vstools">
            <div className="vstools-tbl">
              <p className="vst-cap">Kalau kamu beli tools terpisah:</p>
              <div className="compare-wrap">
                <table className="ctable">
                  <thead>
                    <tr>
                      <th className="feat-col">Tool</th>
                      <th>Yang biasanya kamu pakai</th>
                      <th>Harga/bulan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VS_TOOLS.rows.map((r) => (
                      <tr key={r.tool}>
                        <td className="feat-col">{r.tool}</td>
                        <td>{r.usual}</td>
                        <td>{r.price}</td>
                      </tr>
                    ))}
                    <tr className="vst-total">
                      <td className="feat-col">
                        <b>Total</b>
                      </td>
                      <td></td>
                      <td>
                        <b>{VS_TOOLS.total}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="vstools-pro">
              <h3>Sosmed AI Pro:</h3>
              <ul>
                {VS_TOOLS.proChecks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="vst-price">
                Harga: <b>Rp 399.000/bulan</b> - <span className="vst-save">kamu hemat 74%</span>
              </div>
              <a className="btn btn-ghost" href="#tiers">
                Pilih Pro Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* §4 TOGGLE + TIER CARDS */}
      <section id="tiers">
        <div className="wrap">
          <div className="eyebrow">Paket</div>
          <h2 className="sec-title">Pilih Paket Sesuai Skala Bisnis</h2>
          <div className="bill-wrap">
            <div className="bill-toggle" role="group" aria-label="Siklus tagihan">
              <button
                type="button"
                className={!annual ? "active" : undefined}
                aria-pressed={!annual}
                onClick={() => setAnnual(false)}
              >
                Bulanan
              </button>
              <button
                type="button"
                className={annual ? "active" : undefined}
                aria-pressed={annual}
                onClick={() => setAnnual(true)}
              >
                Tahunan <span className="save">Hemat 2 bulan</span>
              </button>
            </div>
          </div>

          <div className="price-grid five">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`price${plan.featured ? " feat" : ""}`}>
                {plan.featured && <div className="pop">Paling Populer</div>}
                <h3>
                  {plan.emoji} {plan.name}
                </h3>
                <div className="for">{plan.for}</div>
                <div className="amt">
                  {plan.price !== null ? (
                    <>
                      Rp {fmt(priceOf(plan.price, annual))}
                      <span>{period(annual)}</span>
                    </>
                  ) : (
                    <span className="amt-call">Hubungi Sales</span>
                  )}
                </div>
                {annual && plan.price !== null && (
                  <div className="save-line">hemat Rp {fmt(plan.price * 2)}</div>
                )}
                {plan.priceNote && <div className="cust-note">{plan.priceNote}</div>}

                {plan.ctaKind === "consult" ? (
                  <a className="btn btn-primary cta" href={WA_HREF} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </a>
                ) : (
                  <button className="btn btn-soon cta" disabled>
                    <span className="dot"></span> {plan.cta}
                  </button>
                )}

                {plan.audience && (
                  <div className="pillar">
                    <div className="pil-h">Buat kamu yang punya:</div>
                    <ul>
                      {plan.audience.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.pillars.map((pl) => (
                  <div className="pillar" key={pl.name}>
                    <div className="pil-h">
                      {pl.emoji} {pl.name}
                    </div>
                    <ul>
                      {pl.items.map((it) => (
                        <li key={it} className={it.endsWith(":") ? "li-sub" : undefined}>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {plan.support && (
                  <div className="pillar">
                    <div className="pil-h">Support</div>
                    <ul>
                      {plan.support.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.enterprise && (
                  <div className="pillar">
                    <div className="pil-h">Plus enterprise-grade</div>
                    <ul>
                      {plan.enterprise.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.footnote && <p className="foot-note">{plan.footnote}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §5 COMPARISON TABLE */}
      <section style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Perbandingan Lengkap</div>
          <h2 className="sec-title">Bandingkan semua fitur tiap paket.</h2>
          <div className="compare-wrap">
            <table className="ctable price-table cmp5">
              <thead>
                <tr>
                  <th className="feat-col"></th>
                  <th>Lite</th>
                  <th className="us">Pro ⭐</th>
                  <th>Max</th>
                  <th>Ultra</th>
                  <th>Custom</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className={row.head ? "pill-row" : undefined}>
                    <td className="feat-col">{row.label}</td>
                    {row.v.map((cell, i) => (
                      <td key={i} className={i === 1 ? "us" : undefined}>
                        <ComparisonCell value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* §6 ADD-ONS */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Add-ons</div>
          <h2 className="sec-title">Tambah kapasitas sesuai kebutuhan.</h2>
          <p className="sec-lead">Pricing flat per-unit. Bayar sesuai kebutuhan.</p>
          <div className="addons">
            <AddonTable
              title="📦 Order Top-Up (Rp 900/order)"
              intro="Kalau bulan ini kapasitas order kurang, tambah aja:"
              head={["Bucket", "Harga/bulan"]}
              rows={ORDER_ADDON}
            />
            <AddonTable
              title="📣 Marketing Broadcast (Rp 800/pesan)"
              intro="Kirim promo & retention campaign ke member kamu:"
              head={["Pack", "Harga/bulan"]}
              rows={BROADCAST_ADDON}
            />
          </div>
        </div>
      </section>

      {/* §7 FAQ */}
      <section style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">FAQ</div>
          <h2 className="sec-title">Pertanyaan soal harga.</h2>
          <div className="faq-wrap" style={{ marginTop: "14px" }}>
            {FAQS.map((item, i) => (
              <div key={item.q} className={`faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                  <span className="ic">+</span>
                </button>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §8 CTA FOOTER */}
      <section>
        <div className="wrap">
          <div className="price-cta">
            <h2>Belum yakin tier mana yang cocok?</h2>
            <p>
              Konsultasi gratis 15 menit dengan tim kami. Kami bantu hitung tier yang
              paling pas berdasarkan volume order kamu sekarang + 3 sistem lain yang
              kamu butuh.
            </p>
            <div className="pcta-btns">
              <a className="btn btn-primary" href={WA_HREF} target="_blank" rel="noopener noreferrer">
                Booking Konsultasi
              </a>
              <button type="button" className="btn btn-soon" disabled>
                <span className="dot"></span> Coba Trial Gratis
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
