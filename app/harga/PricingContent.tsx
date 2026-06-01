"use client";

import { Fragment, useState } from "react";

// TODO: set the business WhatsApp number — replace with
// https://wa.me/<NUMBER>?text=Halo%20Sosmed%20AI%2C%20saya%20mau%20tanya%20soal%20paket%20khusus.
// (same placeholder as the navbar "Chat Kami" link)
const WA_HREF = "#";

const PLANS = [
  {
    name: "Starter",
    price: 199000,
    for: "Untuk single-outlet F&B & UMKM kecil",
    featured: false,
    features: [
      "Bot Order Otomatis WhatsApp",
      "Menu Digital + QR Code",
      "Sistem Poin & Member",
      "Dashboard Order Real-Time",
      "Struk & Voucher Otomatis",
      "Hingga 1.500 pesan AI/bulan · 1 outlet",
      "WhatsApp Business API",
    ],
  },
  {
    name: "Growth",
    price: 299000,
    for: "Untuk bisnis F&B ramai yang serius scale up",
    featured: true,
    features: [
      "Semua fitur Starter",
      "Auto-reply terjadwal (out-of-hours)",
      "Segmentasi member",
      "Hingga 5.000 pesan AI/bulan · 1 outlet",
      "Priority support",
    ],
  },
  {
    name: "Multi-Outlet",
    price: 549000,
    for: "Untuk usaha F&B dengan 2–3 cabang",
    featured: false,
    features: [
      "Semua fitur Growth",
      "Hingga 3 outlet",
      "Dashboard gabungan multi-outlet",
      "Hingga 12.000 pesan AI/bulan",
      "Dedicated support",
    ],
  },
];

type Cell = "chk" | "dash" | "soon" | string;
const COMPARE: { group: string; rows: { label: string; v: [Cell, Cell, Cell] }[] }[] =
  [
    {
      group: "Fitur Inti",
      rows: [
        { label: "Bot Order Otomatis", v: ["chk", "chk", "chk"] },
        { label: "Menu Digital + QR", v: ["chk", "chk", "chk"] },
        { label: "Sistem Poin & Member", v: ["chk", "chk", "chk"] },
        { label: "Struk & Voucher Otomatis", v: ["chk", "chk", "chk"] },
        { label: "Kelola via WhatsApp", v: ["chk", "chk", "chk"] },
      ],
    },
    {
      group: "Kapasitas",
      rows: [
        { label: "Pesan AI per bulan", v: ["1.500", "5.000", "12.000"] },
        { label: "Jumlah outlet", v: ["1", "1", "3"] },
        { label: "Member", v: ["Unlimited", "Unlimited", "Unlimited"] },
      ],
    },
    {
      group: "Fitur Lanjutan",
      rows: [
        { label: "Auto-reply terjadwal", v: ["dash", "chk", "chk"] },
        { label: "Segmentasi member", v: ["dash", "chk", "chk"] },
        { label: "Dashboard multi-outlet", v: ["dash", "dash", "chk"] },
        { label: "Integrasi GoFood/GrabFood", v: ["soon", "soon", "soon"] },
      ],
    },
    {
      group: "Support",
      rows: [{ label: "Support", v: ["Email", "Priority", "Dedicated"] }],
    },
  ];

const FAQS = [
  {
    q: "Ada biaya setup atau biaya tersembunyi?",
    a: "Tidak. Harga yang Anda lihat sudah termasuk semua fitur di paketnya. Tanpa biaya setup, tanpa add-on tersembunyi.",
  },
  {
    q: "Bisa upgrade atau downgrade paket?",
    a: "Bisa kapan saja. Anda bebas pindah paket sesuai kebutuhan bisnis.",
  },
  {
    q: "Gimana cara bayarnya?",
    a: "Detail metode pembayaran akan tersedia saat peluncuran. Pendaftar awal akan dipandu langsung saat onboarding.",
  },
  {
    q: "Apakah ada kontrak jangka panjang?",
    a: "Tidak ada kontrak yang mengikat. Berlangganan bulanan, berhenti kapan saja.",
  },
];

// deterministic thousands separator (SSR-safe, no locale dependency)
const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function Cell({ value }: { value: Cell }) {
  if (value === "chk") return <span className="chk">✓</span>;
  if (value === "dash") return <span className="dash">–</span>;
  if (value === "soon") return <span className="soon-cell">Segera</span>;
  return <>{value}</>;
}

export default function PricingContent() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const period = annual ? "/tahun" : "/bulan";
  const priceOf = (monthly: number) => (annual ? monthly * 10 : monthly);

  return (
    <main className="pricing-page">
      {/* HERO */}
      <section className="pricing-hero">
        <div className="wrap">
          <h1>Harga untuk Bisnis F&amp;B Anda</h1>
          <p className="lead">
            Satu harga, semua fitur. Tanpa biaya tersembunyi, tanpa add-on.
            Bayar sendiri dalam hitungan order.
          </p>
          <p className="trust">
            Harga spesial founding user — dikunci selamanya untuk pendaftar
            pertama.
          </p>
        </div>
      </section>

      {/* BILLING TOGGLE + PLAN CARDS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
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

          <div className="price-grid">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`price${plan.featured ? " feat" : ""}`}
              >
                {plan.featured && <div className="pop">Paling Populer</div>}
                <h3>{plan.name}</h3>
                <div className="for">{plan.for}</div>
                <div className="amt">
                  Rp {fmt(priceOf(plan.price))}
                  <span>{period}</span>
                </div>
                <button className="btn btn-soon" disabled>
                  <span className="dot"></span> Segera Hadir
                </button>
                <div className="incl-label">Yang termasuk:</div>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CROSS-SELL BANNER */}
          <div className="xsell">
            <p className="xs-text">
              <b>Punya lebih dari 3 outlet atau franchise?</b> Hubungi kami
              untuk paket khusus.
            </p>
            <a
              className="btn btn-primary"
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat Kami
            </a>
          </div>
        </div>
      </section>

      {/* DETAILED COMPARISON TABLE */}
      <section style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Perbandingan Lengkap</div>
          <h2 className="sec-title">Bandingkan semua fitur tiap paket.</h2>
          <div className="compare-wrap">
            <div className="compare">
              <table className="ctable price-table">
                <thead>
                  <tr>
                    <th className="feat-col"></th>
                    <th>Starter</th>
                    <th className="us">Growth</th>
                    <th>Multi-Outlet</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((grp) => (
                    <Fragment key={grp.group}>
                      <tr className="group-row">
                        <td colSpan={4}>{grp.group}</td>
                      </tr>
                      {grp.rows.map((row) => (
                        <tr key={row.label}>
                          <td className="feat-col">{row.label}</td>
                          <td>
                            <Cell value={row.v[0]} />
                          </td>
                          <td className="us">
                            <Cell value={row.v[1]} />
                          </td>
                          <td>
                            <Cell value={row.v[2]} />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="price-note">
            Integrasi GoFood/GrabFood/ShopeeFood sedang dikembangkan dan tersedia
            menyusul untuk semua paket.
          </p>
        </div>
      </section>

      {/* PRICING FAQ */}
      <section>
        <div className="wrap">
          <div className="eyebrow">FAQ</div>
          <h2 className="sec-title">Pertanyaan soal harga.</h2>
          <div className="faq-wrap" style={{ marginTop: "14px" }}>
            {FAQS.map((item, i) => (
              <div
                key={item.q}
                className={`faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                  <span className="ic">+</span>
                </button>
                <div className="faq-a">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
