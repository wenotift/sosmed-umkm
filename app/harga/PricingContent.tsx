"use client";

import { Fragment, useEffect, useRef, useState } from "react";

// TODO: set the business WhatsApp number — replace with
// https://wa.me/<NUMBER>?text=... (same placeholder as the navbar "Chat Kami" link)
const WA_HREF = "#";

// deterministic thousands separator (SSR-safe, no locale dependency)
const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ---- Inline icons (Lucide-style, monochrome line, currentColor) ---- */
const ICONS: Record<string, React.ReactNode> = {
  bot: (
    <>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </>
  ),
  phone: (
    <>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </>
  ),
  star: (
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>
  ),
  package: (
    <>
      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
      <path d="M12 22V12" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <path d="m7.5 4.27 9 5.15" />
    </>
  ),
  megaphone: (
    <>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  building: (
    <>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
};

function Ic({ n, className }: { n: string; className?: string }) {
  return (
    <svg
      className={className ? `ic-svg ${className}` : "ic-svg"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[n]}
    </svg>
  );
}

/* ---- §2 Four-pillar "Why" ---- */
const PILLARS = [
  {
    icon: "bot",
    name: "Order Bot AI",
    tagline: "AI yang ngerti orderan customer kamu.",
    body: 'Pelanggan chat di WhatsApp, AI handle dari sapaan sampai konfirmasi pembayaran. Invoice otomatis terkirim. Owner cuma terima notif "order baru" tanpa harus balas chat satu-satuan.',
    cocok: "Kafe yang tim-nya udah kewalahan handle chat customer.",
  },
  {
    icon: "phone",
    name: "Menu Digital + QR Meja",
    tagline: "Customer scan QR, pilih menu, order langsung lewat WhatsApp.",
    body: "Tambah menu baru, update harga, ganti foto - semua dari WhatsApp. No dashboard rumit, no laptop, no print menu baru tiap minggu.",
    cocok: "Kafe yang menu-nya sering berubah atau punya banyak variasi.",
  },
  {
    icon: "star",
    name: "Sistem Poin & Member",
    tagline:
      "Setiap order = poin masuk. Pelanggan punya alasan balik. Kamu punya database member tanpa kartu fisik.",
    body: "Member otomatis terdaftar dari WhatsApp number mereka. Segmentasi VIP / regular / dormant otomatis. Kirim promo khusus ke segment yang kamu mau (di tier Pro ke atas).",
    cocok: "Kafe yang mau bangun customer base loyal, bukan cuma transaksional.",
  },
  {
    icon: "chart",
    name: "Kelola Order dari WhatsApp",
    tagline:
      "Seluruh operasional bisnis dijalankan dari aplikasi yang udah kamu pakai tiap hari.",
    body: "Lihat order masuk, total revenue harian, top customer, top menu - semua dari chat WhatsApp ke bot Sosmed AI. Tanpa buka laptop, tanpa login dashboard, tanpa training.",
    cocok: "Owner yang ga punya waktu buat training tim atau belajar tools baru.",
  },
];

/* §2 line-art blueprint icons, keyed by PILLARS[].icon (ported from prototype) */
const SYS_ART: Record<string, React.ReactNode> = {
  bot: (
    <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="26" cy="26" r="16" stroke="#CBC3BA" strokeDasharray="3 3" />
      <rect x="19" y="21" width="14" height="11" rx="3" />
      <path d="M26 21v-3h-3M16 26h-1.5M37.5 26H36M30 24.5v2M22 24.5v2" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="12" width="28" height="28" rx="7" stroke="#CBC3BA" strokeDasharray="3 3" />
      <rect x="22" y="19" width="8" height="14" rx="2" />
      <path d="M25 36h2" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="26" cy="26" r="16" stroke="#CBC3BA" strokeDasharray="3 3" />
      <path d="m26 17 2.6 5.3 5.9.9-4.2 4.2 1 5.8L26 35.3 20.7 38l1-5.8-4.2-4.2 5.9-.9Z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="12" width="28" height="28" transform="rotate(12 26 26)" stroke="#CBC3BA" strokeDasharray="3 3" />
      <path d="M18 34 25 27l4 4 8-9M31 22h6v6" />
    </svg>
  ),
};

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

/* ---- §4 Tiers (ported from harga-prototype-v3) ---- */
type Pillar = { icon: string; name: string; items: string[] };
type Plan = {
  name: string;
  price: number;
  featured?: boolean;
  tagline: string;
  top: string[];
  pillars: Pillar[];
  support: string;
};

const PLANS: Plan[] = [
  {
    name: "Lite",
    price: 249000,
    tagline: "Untuk kafe yang baru mulai digitalisasi.",
    top: [
      "AI customer service via WhatsApp",
      "Menu digital + QR meja",
      "Sistem poin & member",
      "Sampai 150 order/bulan",
    ],
    pillars: [
      { icon: "bot", name: "Order Bot AI", items: ["Auto invoice & confirmation", "Kapasitas 150 order/bulan"] },
      { icon: "phone", name: "Menu Digital + QR", items: ["1 menu set / 1 outlet", "Update via WhatsApp", "Foto unlimited"] },
      { icon: "star", name: "Poin & Member", items: ["Member database tanpa batas", "Auto-tracking poin", "Segmentasi dasar"] },
      { icon: "chart", name: "Kelola via WA", items: ["Daily summary", "Top menu & customer", "1 owner access"] },
    ],
    support: "Email support (<24 jam)",
  },
  {
    name: "Pro",
    price: 399000,
    featured: true,
    tagline: "Untuk kafe yang sudah jalan dan mau scale.",
    top: [
      "Semua fitur Lite",
      "Auto-reply terjadwal",
      "Segmentasi advanced + broadcast",
      "Sampai 250 order/bulan",
    ],
    pillars: [
      { icon: "bot", name: "Order Bot AI", items: ["Auto-reply terjadwal", "Kapasitas 250 order/bulan"] },
      { icon: "phone", name: "Menu Digital + QR", items: ["Multi-variant menu", "Stock management", "Schedule menu"] },
      { icon: "star", name: "Poin & Member", items: ["Segmentasi advanced", "Targeted broadcast", "Birthday reminder"] },
      { icon: "chart", name: "Kelola via WA", items: ["Analytics detail", "2 staff access", "Custom alert"] },
    ],
    support: "Priority support (<2 jam)",
  },
  {
    name: "Max",
    price: 799000,
    tagline: "Untuk kafe ramai atau brand 2-outlet.",
    top: [
      "Semua fitur Pro",
      "1 WhatsApp number untuk 2 outlet",
      "Member shared antar outlet",
      "Sampai 500 order/bulan",
    ],
    pillars: [
      { icon: "bot", name: "Order Bot AI", items: ["Multi-outlet routing", "Kapasitas 500 order/bulan"] },
      { icon: "phone", name: "Menu Digital + QR", items: ["Menu beda per outlet", "Stock per outlet"] },
      { icon: "star", name: "Poin & Member", items: ["Member shared 2 outlet", "Cross-outlet redemption"] },
      { icon: "chart", name: "Kelola via WA", items: ["Multi-outlet dashboard", "5 staff access"] },
    ],
    support: "Dedicated support channel + onboarding",
  },
  {
    name: "Ultra",
    price: 1399000,
    tagline: "Untuk chain F&B 2-3 outlet yang serius scale.",
    top: [
      "Semua fitur Max",
      "3 outlet, unified ordering",
      "Centralized member database",
      "Sampai 1.000 order/bulan",
    ],
    pillars: [
      { icon: "bot", name: "Order Bot AI", items: ["3 outlet unified", "Volume diskon Rp 199/order", "Kapasitas 1.000 order/bulan"] },
      { icon: "phone", name: "Menu Digital + QR", items: ["Centralized menu control", "Version control"] },
      { icon: "star", name: "Poin & Member", items: ["Centralized CRM 3 outlet", "Cohort analysis"] },
      { icon: "chart", name: "Kelola via WA", items: ["Executive dashboard", "Quarterly review", "10 staff access"] },
    ],
    support: "Dedicated account manager + on-site training 3x/tahun",
  },
];

/* ---- §5 Comparison table (grouped, 5-col) ---- */
type Cell = "chk" | "dash" | string;
const C = "chk" as Cell;
const D = "dash" as Cell;
type Row = { label: string; head?: boolean; icon?: string; v: [Cell, Cell, Cell, Cell] };
const COMPARE: Row[] = [
  { label: "Outlets", v: ["1", "1", "2", "3"] },
  { label: "Order capacity", v: ["150", "250", "500", "1.000"] },
  { label: "Order Bot", head: true, icon: "bot", v: [C, C, C, C] },
  { label: "AI customer service", v: [C, C, C, C] },
  { label: "Auto-invoice", v: [C, C, C, C] },
  { label: "Auto-reply terjadwal", v: [D, C, C, C] },
  { label: "Multi-outlet routing", v: [D, D, C, C] },
  { label: "Menu Digital + QR", head: true, icon: "phone", v: [C, C, C, C] },
  { label: "Update via WhatsApp", v: [C, C, C, C] },
  { label: "Foto unlimited", v: [C, C, C, C] },
  { label: "Multi-variant menu", v: [D, C, C, C] },
  { label: "Schedule menu", v: [D, C, C, C] },
  { label: "Menu per outlet", v: [D, D, C, C] },
  { label: "Centralized control", v: [D, D, D, C] },
  { label: "Poin & Member", head: true, icon: "star", v: [C, C, C, C] },
  { label: "Member database", v: [C, C, C, C] },
  { label: "Auto-tracking poin", v: [C, C, C, C] },
  { label: "Segmentasi advanced", v: [D, C, C, C] },
  { label: "Targeted broadcast", v: [D, C, C, C] },
  { label: "Cross-outlet redemption", v: [D, D, "2 outlets", "3 outlets"] },
  { label: "Cohort analysis", v: [D, D, D, C] },
  { label: "Kelola via WhatsApp", head: true, icon: "chart", v: [C, C, C, C] },
  { label: "Daily summary", v: [C, C, C, C] },
  { label: "Top menu / customer", v: [C, C, C, C] },
  { label: "Custom alerts", v: [D, C, C, C] },
  { label: "Multi-outlet dashboard", v: [D, D, C, C] },
  { label: "Executive dashboard", v: [D, D, D, C] },
  { label: "Quarterly business review", v: [D, D, D, C] },
  { label: "Support", v: ["Email", "Priority", "Dedicated channel", "Account manager"] },
  { label: "On-site training", v: [D, D, "1 sesi", "3 sesi/tahun"] },
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
        <li><b>Lebih dari 4 outlet?</b> Lihat opsi Enterprise (coming soon).</li>
      </ul>
    ),
  },
  {
    q: 'Apa "1 order" tepatnya?',
    a: (
      <>
        <p>1 order = bot kirim <b>instruksi pembayaran</b> ke pelanggan (item + total + cara bayar).</p>
        <p className="faq-sub"><Ic n="check" className="pic ic-yes" /> Count sebagai order:</p>
        <ul className="faq-list">
          <li>Pelanggan udah pilih item, bot kasih total + instruksi bayar</li>
        </ul>
        <p className="faq-sub"><Ic n="x" className="pic ic-no" /> Tidak count:</p>
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
          <li><Ic n="bot" className="pic" /> Order Bot - AI customer service</li>
          <li><Ic n="phone" className="pic" /> Menu Digital + QR - sistem menu</li>
          <li><Ic n="star" className="pic" /> Poin & Member - sistem loyalty</li>
          <li><Ic n="chart" className="pic" /> Kelola via WhatsApp - sistem operasional</li>
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
    a: <p>Sedang dikembangkan. Akan tersedia untuk <b>Enterprise</b> dulu (Q4 2026), kemudian menyusul ke Ultra (2027).</p>,
  },
  {
    q: "Saya udah pakai Pawoon. Bisa migrasi?",
    a: (
      <p>
        Untuk kebutuhan <b>Enterprise</b>: kami bantu migrasi data. Untuk paket Lite/Pro/Max/Ultra: mulai fresh - biasanya butuh 1-2 minggu paralel sampai pelanggan terbiasa pesan via WhatsApp.
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
  if (value === "chk")
    return (
      <span className="yes">
        <Ic n="check" />
      </span>
    );
  if (value === "dash") return <span className="no">—</span>;
  return <>{value}</>;
}

function AddonTable({
  icon,
  title,
  intro,
  head,
  rows,
}: {
  icon: string;
  title: string;
  intro: string;
  head: [string, string];
  rows: [string, string][];
}) {
  return (
    <div className="addon-card">
      <h3 className="addon-h">
        <Ic n={icon} className="pic" /> {title}
      </h3>
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
  // Synced collapse/expand: one shared state expands all tier cards together.
  const [expanded, setExpanded] = useState(false);

  // Sticky comparison header: toggle a shadow only while the bar is pinned
  // (top has reached its 68px offset and the table hasn't scrolled past yet).
  const cmpHeadRef = useRef<HTMLTableSectionElement>(null);
  const [headPinned, setHeadPinned] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = cmpHeadRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setHeadPinned(r.top <= 69 && r.top > -el.offsetHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="pricing-page">
      {/* §1 HERO */}
      <section className="pricing-hero">
        <div className="wrap">
          <h1>Platform Lengkap untuk Semua Bisnis F&amp;B Indonesia</h1>
          <p className="lead">
            Order taking, menu digital, sistem poin, dan kelola operasional -{" "}
            <b>4 sistem dalam 1 langganan</b>. Mulai dari Rp 249K/bulan.
          </p>
          <div className="hero-cta">
            <button type="button" className="btn btn-soon" disabled>
              <span className="dot"></span> Segera hadir
            </button>
            <a className="btn btn-ghost" href="#tiers">
              Lihat Harga
            </a>
          </div>
        </div>
      </section>

      {/* §2 FOUR-PILLAR WHY */}
      <section style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Kenapa Sosmed AI</div>
          <h2 className="sec-title">Satu Langganan. Empat Sistem Terintegrasi.</h2>
          <p className="sec-lead">
            Kalau biasanya kamu pakai 4 tools terpisah, Sosmed AI gabungin semuanya
            jadi satu - running lewat WhatsApp yang udah kamu pakai tiap hari.
          </p>
          <div className="hs4-grid">
            <div className="hs4-hatch l" aria-hidden="true"></div>
            {PILLARS.map((p) => (
              <div className="hs4-cell" key={p.name}>
                <span className="hs4-art">
                  {SYS_ART[p.icon]}
                  <span className="hs4-plus">+</span>
                </span>
                <div className="hs4-text">
                  <h3>{p.name}</h3>
                  <p className="hs4-lead">{p.tagline}</p>
                  <p className="hs4-body">{p.body}</p>
                  <p className="hs4-fit">
                    <b>Cocok untuk:</b> {p.cocok}
                  </p>
                </div>
              </div>
            ))}
            <div className="hs4-hatch r" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* §3 VS SEPARATE TOOLS */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Hitung-hitungan</div>
          <h2 className="sec-title sec-title-1line">Berapa Hemat Pakai Sosmed AI?</h2>
          <p className="vst-cap">Kalau kamu beli tools terpisah:</p>
          <div className="vstools">
            <div className="compare-wrap vstools-box">
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
          <h2 className="sec-title sec-title-1line">Pilih Paket Sesuai Skala Bisnis</h2>
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

          <div className="price-grid four">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`price${plan.featured ? " feat" : ""}${expanded ? " open" : ""}`}
              >
                {plan.featured && <div className="pop">Paling Populer</div>}
                <h3>{plan.name}</h3>
                <div className="amt">
                  <span className="num">Rp {fmt(priceOf(plan.price, annual))}</span>
                  <span className="per">{period(annual)}</span>
                </div>
                <div className="save-line">
                  {annual ? `hemat Rp ${fmt(plan.price * 2)}` : ""}
                </div>
                <p className="for">{plan.tagline}</p>

                <ul className="feat">
                  {plan.top.map((t) => (
                    <li key={t}>
                      <Ic n="check" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <ul className="feat-extra">
                  {plan.pillars.map((pl) => (
                    <Fragment key={pl.name}>
                      <li className="pill-label">
                        <Ic n={pl.icon} />
                        <span>{pl.name}</span>
                      </li>
                      {pl.items.map((it) => (
                        <li key={it}>
                          <Ic n="check" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </Fragment>
                  ))}
                  <li className="pill-label">
                    <Ic n="check" />
                    <span>Support</span>
                  </li>
                  <li>
                    <Ic n="check" />
                    <span>{plan.support}</span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="expand-btn"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((v) => !v)}
                >
                  <span className="lbl">
                    {expanded ? "Sembunyikan fitur" : "Lihat semua fitur"}
                  </span>
                  <Ic n="chevron" />
                </button>

                <button className="cta" disabled>
                  Segera hadir
                </button>
              </div>
            ))}
          </div>

          <div className="ent-strip">
            <div className="ent-ic">
              <Ic n="building" />
            </div>
            <div className="ent-txt">
              <h3>Enterprise</h3>
              <p>
                Untuk chain 4+ outlet, franchise, atau kebutuhan khusus. Hubungi
                tim kami.
              </p>
            </div>
            <button type="button" className="btn btn-soon ent-btn" disabled>
              <span className="dot"></span> Segera hadir
            </button>
          </div>
        </div>
      </section>

      {/* §5 COMPARISON TABLE */}
      <section style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Perbandingan Lengkap</div>
          <h2 className="sec-title sec-title-1line">Bandingkan semua fitur tiap paket.</h2>
          <div className="cmp-scroll">
            <table className="ctable price-table cmp5">
              <thead ref={cmpHeadRef} className={headPinned ? "pinned" : undefined}>
                <tr>
                  <th className="feat-col th-billing">
                    <div className="th-billing-lbl">Pilih siklus pembayaran</div>
                    <div
                      className="bill-toggle cmp-toggle"
                      role="group"
                      aria-label="Siklus tagihan"
                    >
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
                        Tahunan
                      </button>
                    </div>
                  </th>
                  {PLANS.map((plan) => (
                    <th key={plan.name} className={plan.featured ? "us" : undefined}>
                      <div className="th-top">
                        <span className="th-name">{plan.name}</span>
                        {plan.featured && <span className="th-pop">Populer</span>}
                      </div>
                      <div className="th-price">
                        {annual ? (
                          <>
                            <b>Rp {fmt(plan.price * 10 / 1000)}K</b>/tahun
                            <br />
                            <span className="th-save">
                              hemat Rp {fmt((plan.price * 2) / 1000)}K
                            </span>
                          </>
                        ) : (
                          <>
                            <b>Rp {fmt(plan.price / 1000)}K</b>/bulan
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        className={`th-cta${plan.featured ? " dark" : ""}`}
                        disabled
                      >
                        Segera hadir
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className={row.head ? "pill-row" : undefined}>
                    <td className="feat-col">
                      {row.head ? (
                        <span className="cmp-head">
                          <Ic n={row.icon!} className="pic" /> {row.label}
                        </span>
                      ) : (
                        row.label
                      )}
                    </td>
                    {row.head
                      ? row.v.map((_, i) => (
                          <td key={i} className={i === 1 ? "us" : undefined}></td>
                        ))
                      : row.v.map((cell, i) => (
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
              icon="package"
              title="Order Top-Up (Rp 900/order)"
              intro="Kalau bulan ini kapasitas order kurang, tambah aja:"
              head={["Bucket", "Harga/bulan"]}
              rows={ORDER_ADDON}
            />
            <AddonTable
              icon="megaphone"
              title="Marketing Broadcast (Rp 800/pesan)"
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
                <span className="dot"></span> Segera hadir
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
