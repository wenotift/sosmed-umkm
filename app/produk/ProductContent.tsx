"use client";

import Link from "next/link";
import { useEffect } from "react";
import WhatsAppChat, { type ChatStep } from "../WhatsAppChat";

// Chatbot-vs-AI-Native comparison: intent side-list icon (repeated).
function CmpProdDi() {
  return (
    <span className="cp-di">
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="2" />
        <circle cx="15" cy="15" r="2" />
        <path d="M9 11v2M11 9h2" />
      </svg>
    </span>
  );
}

// Comparison lane flows — static illustrative SVGs (viewBox + width:100% so they
// scale on mobile). Injected as-is for foreignObject fidelity; classes are cp-*
// prefixed and styled scoped under .cmpprod. Single-color connectors per lane
// (grey chatbot / green AI-native). Conceptual, not a claim of a shipped feature.
const CP_CHATBOT_SVG = `<svg class="cp-flow" viewBox="0 0 360 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Alur chatbot berbasis aturan">
<defs><marker id="cpCb" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M3 4 L7 9 L11 4" stroke="#C9C5D2" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<path d="M180 118 V160" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cpCb)"/>
<circle cx="180" cy="118" r="4" fill="#fff" stroke="#C9C5D2" stroke-width="2"/>
<path d="M180 230 V272" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cpCb)"/>
<path d="M180 364 V392" stroke="#D6D2DE" stroke-width="1.8" fill="none"/>
<circle cx="180" cy="392" r="4" fill="#fff" stroke="#C9C5D2" stroke-width="2"/>
<path d="M180 392 V414 Q180 432 158 432 H114 Q92 432 92 450 V450" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cpCb)"/>
<path d="M180 392 V414 Q180 432 202 432 H246 Q268 432 268 450 V450" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cpCb)"/>
<foreignObject x="200" y="20" width="146" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="cp-pill cp-red">Perlu disiapkan</span></div></foreignObject>
<foreignObject x="14" y="36" width="332" height="82"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node"><div class="cp-nrow"><span class="cp-nicon cp-ic-red"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></span><span class="cp-ntitle">Latih &amp; susun skrip</span><span class="cp-ntag">Manual</span></div></div></foreignObject>
<foreignObject x="14" y="160" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node"><div class="cp-nrow"><span class="cp-nicon cp-ic-grey"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span class="cp-ntitle">Pesan masuk</span></div></div></foreignObject>
<foreignObject x="14" y="272" width="332" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node"><div class="cp-nrow"><span class="cp-nicon cp-ic-grey"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span><span class="cp-ntitle">Cocokkan kata kunci</span><span class="cp-ntag">Aturan</span></div><div class="cp-nsub">Sesuai daftar skrip?</div></div></foreignObject>
<foreignObject x="28" y="418" width="128" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center"><span class="cp-blabel">Cocok</span></div></foreignObject>
<foreignObject x="196" y="418" width="144" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center"><span class="cp-blabel">Di luar skrip</span></div></foreignObject>
<foreignObject x="10" y="450" width="164" height="78"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node"><div class="cp-nrow"><span class="cp-nicon cp-ic-grey"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9l-5 5-3-3"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg></span><span class="cp-ntitle">Jawaban skrip</span></div></div></foreignObject>
<foreignObject x="186" y="450" width="164" height="78"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node cp-dead"><div class="cp-nrow"><span class="cp-nicon cp-ic-red"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span><span class="cp-ntitle">"Tidak mengerti"</span></div></div></foreignObject>
</svg>`;

const CP_AI_SVG = `<svg class="cp-flow" viewBox="0 0 360 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Alur Sosmed AI yang AI-Native">
<defs><marker id="cpAi" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M3 4 L7 9 L11 4" stroke="#5FC983" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<path d="M180 106 V148" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cpAi)"/>
<circle cx="180" cy="106" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M180 240 V282" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cpAi)"/>
<circle cx="180" cy="240" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M180 374 V416" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cpAi)"/>
<circle cx="180" cy="374" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M180 486 V528" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cpAi)"/>
<circle cx="180" cy="486" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<foreignObject x="200" y="20" width="146" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="cp-pill cp-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Tanpa dilatih</span></div></foreignObject>
<foreignObject x="14" y="36" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node cp-ok"><div class="cp-nrow"><span class="cp-nicon cp-ic-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span class="cp-ntitle">Pesan masuk</span></div></div></foreignObject>
<foreignObject x="14" y="148" width="332" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node cp-ok"><div class="cp-nrow"><span class="cp-nicon cp-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z"/></svg></span><span class="cp-ntitle">Pahami maksud</span></div><div class="cp-nsub">Paham slang &amp; singkatan, bukan kata kunci</div></div></foreignObject>
<foreignObject x="14" y="282" width="332" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node cp-ok"><div class="cp-nrow"><span class="cp-nicon cp-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 5V3M12 21v-2M5 12H3M21 12h-2M7 7L5.5 5.5M18.5 18.5L17 17M17 7l1.5-1.5M5.5 18.5L7 17"/></svg></span><span class="cp-ntitle">Menalar konteks</span></div><div class="cp-nsub">Termasuk pertanyaan acak - tetap nyambung</div></div></foreignObject>
<foreignObject x="14" y="416" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node cp-ok"><div class="cp-nrow"><span class="cp-nicon cp-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/><path d="M3 12h12"/></svg></span><span class="cp-ntitle">Tentukan tindakan</span><span class="cp-ntag">Order/menu/poin</span></div></div></foreignObject>
<foreignObject x="200" y="510" width="146" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="cp-pill cp-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Selesai</span></div></foreignObject>
<foreignObject x="14" y="528" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cp-node cp-ok"><div class="cp-nrow"><span class="cp-nicon cp-ic-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><span class="cp-ntitle">Respons yang tepat</span></div></div></foreignObject>
</svg>`;

/* Block 02 — owner manages the menu via chat (illustrative demo data) */
const MENU_STEPS: ChatStep[] = [
  { type: "show", msg: { kind: "out", text: "tambah menu Matcha Latte 25rb", time: "10:01" }, after: 900 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "✅ Matcha Latte (Rp 25rb) ditambahkan ke menu.", time: "10:01" }, after: 800 },
  { type: "show", msg: { kind: "out", text: "ubah harga americano jadi 16rb", time: "10:02" }, after: 900 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "✅ Americano: Rp 15rb → Rp 16rb.", time: "10:02" }, after: 800 },
  { type: "show", msg: { kind: "out", text: "hapus croissant, sudah tidak dijual", time: "10:03" }, after: 900 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "✅ Croissant dihapus dari menu.", time: "10:03" }, after: 800 },
  { type: "show", msg: { kind: "out", text: "banana cake habis", time: "10:04" }, after: 900 },
  { type: "typing", after: 1100 },
  { type: "show", msg: { kind: "in", text: "✅ Banana Cake ditandai habis hari ini. Pelanggan nggak bisa pesan sampai Anda aktifkan lagi.", time: "10:04" }, after: 800 },
  {
    type: "show",
    after: 3600,
    msg: {
      kind: "node",
      node: (
        <div className="sw-report">
          <div className="sw-rhead">📝 Menu sekarang</div>
          <div className="sw-rrow"><span>Es Kopi Susu Gula Aren</span><b>Rp 18rb</b></div>
          <div className="sw-rrow"><span>Americano</span><b><s>Rp 15rb</s> Rp 16rb</b></div>
          <div className="sw-rrow"><span>Matcha Latte ✨</span><b>Rp 25rb</b></div>
          <div className="sw-rrow"><span>Banana Cake</span><b className="muted"><span className="sw-badge">Habis</span></b></div>
        </div>
      ),
    },
  },
  { type: "reset" },
];

/* Block 04 — owner manages orders via chat (illustrative demo data) */
const ORDER_STEPS: ChatStep[] = [
  {
    type: "show",
    after: 1700,
    msg: {
      kind: "node",
      node: (
        <div className="sw-report">
          <div className="sw-rhead">🔔 Order baru #1042 <span className="sw-badge">Baru</span></div>
          <div className="sw-rsub">Es Kopi Susu ×2 · less sugar · meja 3</div>
          <div className="sw-rrow"><span>Total · bukti transfer 📎</span><b>Rp 36.000</b></div>
        </div>
      ),
    },
  },
  { type: "show", msg: { kind: "out", text: "konfirmasi 1042", time: "10:05" }, after: 900 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "✅ Pembayaran #1042 dikonfirmasi. Pesanan masuk ke antrian dapur.", time: "10:05" }, after: 900 },
  { type: "show", msg: { kind: "out", text: "ada order pending?", time: "10:06" }, after: 900 },
  { type: "typing", after: 1000 },
  {
    type: "show",
    after: 1300,
    msg: {
      kind: "node",
      node: (
        <div className="sw-report">
          <div className="sw-rhead">⏳ Order Pending (2)</div>
          <div className="sw-rrow"><span>#1043 · Matcha Latte ×1</span><b className="muted">meja 2</b></div>
          <div className="sw-rrow"><span>#1044 · Americano ×1</span><b className="muted">takeaway</b></div>
        </div>
      ),
    },
  },
  { type: "show", msg: { kind: "out", text: "laporan harian", time: "10:06" }, after: 900 },
  { type: "typing", after: 1100 },
  {
    type: "show",
    after: 3600,
    msg: {
      kind: "node",
      node: (
        <div className="sw-report">
          <div className="sw-rhead">📊 Laporan Hari Ini (s/d 10:06)</div>
          <div className="sw-rrow"><span>Order</span><b>48</b></div>
          <div className="sw-rrow"><span>Penjualan</span><b>Rp 1,4jt</b></div>
          <div className="sw-rtop">Via bot 9 · walk-in 3 · Best seller: Es Kopi Susu</div>
        </div>
      ),
    },
  },
  { type: "reset" },
];

/* Block 01 — customer orders via chat (illustrative demo data) */
const ORDER_AUTO_STEPS: ChatStep[] = [
  { type: "show", msg: { kind: "out", text: "es kopi susu 2, less sugar yg gede ya kak", time: "21:14" }, after: 900 },
  { type: "typing", after: 1100 },
  { type: "show", msg: { kind: "in", text: "Siap kak! Es Kopi Susu 2 (Large, less sugar) — total Rp 40.000. Diambil atau diantar?", time: "21:14" }, after: 900 },
  { type: "show", msg: { kind: "out", text: "ambil aja", time: "21:15" }, after: 900 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "Oke! Bayar Rp 40.000 via QRIS di bawah, lalu kirim bukti ya 👇", time: "21:15" }, after: 700 },
  {
    type: "show",
    after: 1500,
    msg: {
      kind: "node",
      node: (
        <div className="sw-qris">
          <div className="sw-qbox">
            <svg className="qr-svg" viewBox="0 0 64 64" aria-hidden="true">
              <rect width="64" height="64" fill="#fff" />
              <path fill="currentColor" d="M6 6h16v16H6zM42 6h16v16H42zM6 42h16v16H6z" />
              <path fill="#fff" d="M9 9h10v10H9zM45 9h10v10H45zM9 45h10v10H9z" />
              <path fill="currentColor" d="M11.5 11.5h5v5h-5zM47.5 11.5h5v5h-5zM11.5 47.5h5v5h-5z" />
              <path fill="currentColor" d="M28 8h4v4h-4zM36 8h4v4h-4zM28 16h4v4h-4zM32 24h4v4h-4zM8 28h4v4H8zM16 28h4v4h-4zM24 28h4v4h-4zM28 32h4v4h-4zM40 28h4v4h-4zM48 32h4v4h-4zM56 28h4v4h-4zM28 40h4v4h-4zM36 44h4v4h-4zM44 40h4v4h-4zM52 44h4v4h-4zM28 48h4v4h-4zM32 56h4v4h-4zM40 52h4v4h-4zM48 56h4v4h-4zM56 48h4v4h-4zM40 36h4v4h-4zM40 60h4v4h-4z" />
            </svg>
          </div>
          <div className="sw-qcap">
            QRIS · Kopi Senja
            <br />
            <b>Rp 40.000</b>
          </div>
        </div>
      ),
    },
  },
  { type: "show", msg: { kind: "out", text: "udah transfer kak 🙏", time: "21:16" }, after: 900 },
  { type: "typing", after: 1100 },
  { type: "show", msg: { kind: "in", text: "Pembayaran terkonfirmasi ✅ Order #1042 disiapin ☕", time: "21:16" }, after: 3400 },
  { type: "reset" },
];

/* Block 03 — member registration & points via chat (illustrative demo data) */
const MEMBER_STEPS: ChatStep[] = [
  { type: "typing", after: 1200 },
  { type: "show", msg: { kind: "in", text: "Mau daftar member kak? Tiap pembayaran dapat poin, bisa ditukar minuman gratis ☕ Ketik nama aja 🙂", time: "10:02" }, after: 900 },
  { type: "show", msg: { kind: "out", text: "Dimas", time: "10:02" }, after: 900 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "✅ Sip Dimas, terdaftar! Pembayaran tadi dikonfirmasi — +40 poin masuk.", time: "10:02" }, after: 900 },
  { type: "show", msg: { kind: "out", text: "cek poin dong", time: "10:05" }, after: 900 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "Saldo poin kamu 284 🎉 16 poin lagi buat voucher Rp 5.000!", time: "10:05" }, after: 3400 },
  { type: "reset" },
];

export default function ProductContent() {
  useEffect(() => {
    const timers: number[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ----- scroll reveal -----
    const revealEls = Array.from(
      document.querySelectorAll(".product-page .pv")
    ) as HTMLElement[];
    let revealIO: IntersectionObserver | null = null;
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) (e.target as HTMLElement).classList.add("in");
          });
        },
        { threshold: 0.18 }
      );
      revealEls.forEach((el) => revealIO!.observe(el));
    }

    // ----- chat demos: play once when scrolled into view (ported from the design) -----
    function playDemo(chat: any) {
      const items = Array.from(chat.children) as HTMLElement[];
      items.forEach((b) => {
        b.classList.remove("show");
        b.style.display = "none";
      });
      let d = 300;
      items.forEach((b) => {
        const incoming =
          b.classList.contains("in") ||
          b.classList.contains("pts") ||
          b.classList.contains("qris") ||
          b.classList.contains("bill") ||
          b.hasAttribute("data-rep");
        const tt = incoming ? 700 : 380;
        timers.push(
          window.setTimeout(() => {
            if (incoming) {
              const t = document.createElement("div");
              t.className = "ptyping";
              t.innerHTML = "<i></i><i></i><i></i>";
              chat.appendChild(t);
              requestAnimationFrame(() => t.classList.add("show"));
              chat._t = t;
              chat.scrollTop = chat.scrollHeight;
            }
          }, d)
        );
        timers.push(
          window.setTimeout(() => {
            if (chat._t) {
              chat._t.remove();
              chat._t = null;
            }
            b.style.display = "";
            void b.offsetWidth;
            b.classList.add("show");
            chat.scrollTop = chat.scrollHeight;
          }, d + tt)
        );
        d += tt + 650;
      });
    }

    const demos = Array.from(
      document.querySelectorAll(".product-page [data-demo]")
    ) as any[];
    let demoIO: IntersectionObserver | null = null;
    if (reduce) {
      demos.forEach((chat) =>
        Array.from(chat.children).forEach((b: any) => b.classList.add("show"))
      );
    } else {
      // pre-hide demo bubbles so nothing flashes before its block scrolls in
      demos.forEach((chat) =>
        Array.from(chat.children).forEach((b: any) => {
          b.style.display = "none";
        })
      );
      demoIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const t = e.target as any;
            if (e.isIntersecting && !t._done) {
              t._done = true;
              playDemo(t);
            }
          });
        },
        { threshold: 0.4 }
      );
      demos.forEach((c) => demoIO!.observe(c));
    }

    return () => {
      revealIO?.disconnect();
      demoIO?.disconnect();
      timers.forEach((t) => clearTimeout(t));
      demos.forEach((chat: any) => {
        chat.querySelectorAll?.(".ptyping").forEach((t: HTMLElement) =>
          t.remove()
        );
        chat._t = null;
        chat._done = false;
      });
    };
  }, []);

  return (
    <main className="product-page">
      {/* HERO */}
      <section className="phero">
        <div className="wrap">
          <h1 className="pv pd1">
            Beyond Chatbots.
            <br />
            <span className="grad">AI-Native.</span>
          </h1>
          <p className="psub pv pd2">
            Bukan bot template yang menunggu kata kunci. Sosmed AI memahami
            maksud pelanggan, mengambil keputusan dari data bisnis Anda, dan
            merespons selayaknya staf terbaik Anda — 24 jam, di dalam WhatsApp.
          </p>
          <div className="phero-cta pv pd3">
            <button className="btn btn-soon" disabled>
              <span className="dot"></span> Segera Hadir
            </button>
            <Link className="btn btn-ghost" href="/harga">
              Lihat Harga →
            </Link>
          </div>
        </div>
      </section>

      {/* INTELLIGENCE */}
      <section className="intel">
        <div className="wrap">
          <div className="intel-grid">
            <div className="intel-card pv pd1">
              <div className="step">01 · Memahami</div>
              <h3>Menangkap maksud</h3>
              <p>
                Membaca niat di balik pesan — typo, singkatan, bahasa campur —
                bukan sekadar mencocokkan kata kunci.
              </p>
              <div className="ic-visual">
                <div className="parse-in">
                  &quot;2 es kopi susu yg gede less sugar&quot;
                </div>
                <div className="parse-arrow">↓</div>
                <div className="parse-tags">
                  <span className="ptag">
                    Item: <b>Es Kopi Susu</b>
                  </span>
                  <span className="ptag">
                    Qty: <b>2</b>
                  </span>
                  <span className="ptag">
                    Size: <b>L</b>
                  </span>
                  <span className="ptag">
                    Sugar: <b>less</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="intel-card pv pd2">
              <div className="step">02 · Memutuskan</div>
              <h3>Memvalidasi dari data</h3>
              <p>
                Setiap harga, stok, dan ketersediaan diambil dari sistem Anda.
                AI menafsirkan; data yang menentukan.
              </p>
              <div className="ic-visual">
                <div className="dcheck">
                  <span className="dc-ic">✓</span>
                  <span>Es Kopi Susu (L)</span>
                  <span className="dc-val">Rp 18.000</span>
                </div>
                <div className="dcheck">
                  <span className="dc-ic">✓</span>
                  <span>Stok tersedia</span>
                  <span className="dc-val">Ready</span>
                </div>
                <div className="dtotal">
                  <span>Total (×2)</span>
                  <b>Rp 36.000</b>
                </div>
              </div>
            </div>
            <div className="intel-card pv pd3">
              <div className="step">03 · Merespons</div>
              <h3>Membalas selayaknya manusia</h3>
              <p>
                Bahasa Indonesia yang luwes dengan tone yang menyesuaikan konteks
                — terasa seperti staf, bukan mesin.
              </p>
              <div className="ic-visual ic-chat">
                <div className="mini-bubble">
                  Siap kak! 2 Es Kopi Susu (L, less sugar) dicatat ya 😊 Total Rp
                  36.000
                </div>
                <div className="mini-meta">
                  <span className="md"></span> Dibalas dalam 2 detik
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHATBOT-VS-AI-NATIVE FLOW COMPARISON — illustrative concept (scoped .cmpprod) */}
      <section className="cmpprod">
        <div className="wrap">
          <div className="cp-head">
            <span className="cp-eyebrow">Cara kerjanya</span>
            <h2>Chatbot automation vs AI-Native</h2>
            <p>
              Keduanya hidup di WhatsApp, tapi cara kerjanya beda jauh. Begini
              bedanya, langkah demi langkah.
            </p>
          </div>

          <div className="cp-canvas">
            <div className="cp-lanes">
              <div className="cp-lane">
                <div className="cp-lane-title">
                  <span className="cp-chip">Chatbot automation</span>
                  <span className="cp-tag cp-grey">Berbasis aturan</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: CP_CHATBOT_SVG }} />
                <p className="cp-lane-note">
                  Harus dilatih, dirawat terus, dan tetap mentok di luar skrip.
                </p>
              </div>

              <div className="cp-lane">
                <div className="cp-lane-title">
                  <span className="cp-chip">Sosmed AI</span>
                  <span className="cp-tag cp-green">AI-Native</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: CP_AI_SVG }} />
                <p className="cp-lane-note">
                  Tanpa dilatih - paham, menalar, dan makin pintar seiring
                  dipakai.
                </p>
              </div>

              <div className="cp-ilist">
                <div className="cp-ili cp-faint"><CmpProdDi /> Tanya jam buka</div>
                <div className="cp-ili cp-faint2"><CmpProdDi /> Cek promo hari ini</div>
                <div className="cp-ili cp-active"><CmpProdDi /> Order makanan &amp; minuman</div>
                <div className="cp-ili"><CmpProdDi /> Tanya menu &amp; harga</div>
                <div className="cp-ili cp-faint2"><CmpProdDi /> Konfirmasi pembayaran</div>
                <div className="cp-ili cp-faint"><CmpProdDi /> Minta alamat &amp; ongkir</div>
              </div>
            </div>
          </div>

          <p className="cp-cap">
            Ilustrasi konsep cara kerja AI-Native. Sosmed AI masih dalam
            pengembangan; sebagian kemampuan masih kami kerjakan.
          </p>
        </div>
      </section>

      {/* FEATURE 1 — Order Otomatis */}
      <section className="feat">
        <div className="wrap">
          <div className="frow">
            <div className="ftext pv">
              <div className="fbhead">
                <div className="row">
                  <span className="num">[01]</span>
                  <span className="label">Order</span>
                  <span className="meta">/ fitur 1 dari 4</span>
                </div>
                <div className="rule"></div>
              </div>
              <h3>Order Otomatis</h3>
              <div className="fopen">
                Pelanggan numpuk di kasir, order chat kelewat. Sosmed AI bikin
                pelanggan order sendiri lewat WhatsApp — kapan saja, tanpa antre,
                tanpa aplikasi.
              </div>
              <div className="cflow">
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who cust">Pelanggan</span>
                  <p>
                    Chat pesanannya — <em>"2 es kopi susu yg gede, 1 croissant"</em>
                  </p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who bot">AI Bot</span>
                  <p>
                    Kirim rincian pesanan (tiap item, jumlah, harga) + total,
                    lalu QRIS
                  </p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who cust">Pelanggan</span>
                  <p>Scan QRIS, bayar, lalu kirim bukti pembayaran</p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who owner">Owner</span>
                  <p>Tap "Konfirmasi" — order masuk &amp; status update otomatis</p>
                </div>
              </div>
              <div className="fchips">
                <span>Order via Chat</span>
                <span>Rincian Otomatis</span>
                <span>QRIS Langsung</span>
              </div>
              <div className="segera-row">
                <span className="tag">Rincian</span>
                <p>
                  Pesanan banyak item otomatis dirinci — tiap item, jumlah, dan
                  harga ditampilkan jelas sebelum bayar, jadi pelanggan tahu
                  persis yang dibayar.
                </p>
              </div>
              <div className="segera-row">
                <span className="tag">Catatan</span>
                <p>
                  Tahap ini pembayaran dikonfirmasi manual: pelanggan kirim bukti
                  bayar, owner tinggal tap "Konfirmasi" — poin &amp; status order
                  langsung update.
                </p>
              </div>
            </div>
            <div className="device-wrap pv pd2">
              <WhatsAppChat steps={ORDER_AUTO_STEPS} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — Menu Digital + QR */}
      <section className="feat">
        <div className="wrap">
          <div className="frow flip">
            <div className="ftext pv">
              <div className="fbhead">
                <div className="row">
                  <span className="num">[02]</span>
                  <span className="label">Menu &amp; QR</span>
                  <span className="meta">/ fitur 2 dari 4</span>
                </div>
                <div className="rule"></div>
              </div>
              <h3>Menu Digital + QR Meja</h3>
              <div className="fopen">
                Tambah menu, ubah harga, ganti foto tanpa dashboard rumit.
                Pelanggan scan, pilih, lalu order lanjut di WhatsApp.
              </div>
              <div className="cflow">
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who cust">Pelanggan</span>
                  <p>Scan QR di meja — menu visual langsung terbuka</p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who cust">Pelanggan</span>
                  <p>Pilih menu, atur jumlah, lalu tekan submit</p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who bot">AI Bot</span>
                  <p>
                    Order otomatis lanjut ke WhatsApp — bot konfirmasi &amp;
                    kirim QRIS
                  </p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who cust">Pelanggan</span>
                  <p>Bayar, pesanan langsung diproses</p>
                </div>
              </div>
              <div className="fchips">
                <span>Menu Visual</span>
                <span>Order Lanjut ke WA</span>
                <span>Tanpa Aplikasi</span>
              </div>
              <div className="segera-row">
                <span className="tag">Catatan</span>
                <p>
                  Satu QR untuk semua meja, atau QR berbeda per meja agar order
                  otomatis tahu nomor mejanya. Item bisa diatur "habis" atau
                  "tersedia" kapan saja.
                </p>
              </div>
            </div>
            <div className="device-wrap pv pd2">
              <WhatsAppChat steps={MENU_STEPS} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3 — Poin & Member */}
      <section className="feat">
        <div className="wrap">
          <div className="frow">
            <div className="ftext pv">
              <div className="fbhead">
                <div className="row">
                  <span className="num">[03]</span>
                  <span className="label">Loyalty</span>
                  <span className="meta">/ fitur 3 dari 4</span>
                </div>
                <div className="rule"></div>
              </div>
              <h3>Sistem Poin &amp; Member</h3>
              <div className="fopen">
                Tiap pembayaran sukses, poin langsung masuk — pelanggan punya
                alasan balik lagi, Anda punya database member tanpa kartu fisik.
              </div>
              <div className="cflow">
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who bot">AI Bot</span>
                  <p>
                    Tawarkan daftar member — <em>"ketik nama aja"</em>
                  </p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who cust">Pelanggan</span>
                  <p>Ketik nama untuk daftar</p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who owner">Owner</span>
                  <p>Konfirmasi pembayaran sekali tap</p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who bot">AI Bot</span>
                  <p>
                    Poin otomatis masuk + kirim info saldo &amp; reward ke
                    pelanggan
                  </p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who cust">Pelanggan</span>
                  <p>Cek poin kapan saja — cukup chat</p>
                </div>
              </div>
              <div className="fchips">
                <span>1 Poin / Rp 1.000</span>
                <span>Daftar Ketik Nama</span>
                <span>Cek Poin via Chat</span>
              </div>
              <div className="segera-row">
                <span className="tag">Catatan</span>
                <p>
                  Anda atur sendiri nilai poin dan rewardnya (mis. 1 poin per Rp
                  1.000, 100 poin = voucher Rp 5.000). Data member tersimpan
                  otomatis untuk broadcast promo nanti.
                </p>
              </div>
            </div>
            <div className="device-wrap pv pd2">
              <WhatsAppChat steps={MEMBER_STEPS} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 4 — Kelola dari WhatsApp */}
      <section className="feat">
        <div className="wrap">
          <div className="frow flip">
            <div className="ftext pv">
              <div className="fbhead">
                <div className="row">
                  <span className="num">[04]</span>
                  <span className="label">Kelola</span>
                  <span className="meta">/ fitur 4 dari 4</span>
                </div>
                <div className="rule"></div>
              </div>
              <h3>Kelola Order dari WhatsApp</h3>
              <div className="fopen">
                Seluruh operasional bisnis dijalankan dari aplikasi yang sudah
                Anda pakai tiap hari. Tanpa dashboard, tanpa buka laptop.
              </div>
              <div className="cflow">
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who bot">AI Bot</span>
                  <p>Order baru masuk — notifikasi langsung ke WhatsApp Anda</p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who owner">Owner</span>
                  <p>
                    Chat bot — <em>"laporan hari ini dong"</em>
                  </p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who bot">AI Bot</span>
                  <p>Balas ringkasan penjualan real-time</p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who owner">Owner</span>
                  <p>
                    Minta rekap — <em>"rekap bulan ini, PDF ya"</em>
                  </p>
                </div>
                <div className="cstep">
                  <span className="dot"></span>
                  <span className="who bot">AI Bot</span>
                  <p>Generate &amp; kirim laporan PDF bulanan lengkap</p>
                </div>
              </div>
              <div className="fchips">
                <span>Tanpa Dashboard</span>
                <span>Laporan via Chat</span>
                <span>PDF Bulanan</span>
              </div>
              <div className="segera-row">
                <span className="tag">Catatan</span>
                <p>
                  Laporan harian, mingguan, dan bulanan tersedia via chat kapan
                  saja. Dashboard web tetap ada untuk lihat detail lebih dalam
                  saat dibutuhkan.
                </p>
              </div>
            </div>
            <div className="device-wrap pv pd2">
              <WhatsAppChat steps={ORDER_STEPS} />
            </div>
          </div>
        </div>
      </section>

      {/* WHY AI-NATIVE BAND */}
      <div className="band pv">
        <div className="in">
          <h2>
            Kenapa <span className="grad">AI-native</span> itu penting?
          </h2>
          <p>
            Bot template berhenti di tempat skripnya berakhir. Asisten AI-native
            menangani hal yang tak pernah Anda antisipasi — dan makin tajam
            memahami pelanggan Anda seiring waktu. Itulah selisih antara alat dan
            rekan kerja.
          </p>
          <button className="btn btn-light" disabled>
            <span className="dot"></span> Segera Hadir
          </button>
        </div>
      </div>

      {/* CLOSING */}
      <section className="closing">
        <div className="wrap">
          <h2 className="pv">
            Bekerja seperti asisten.
            <br />
            <span className="grad">Beroperasi dengan AI.</span>
          </h2>
          <p className="pv pd1">Asisten bisnis WhatsApp untuk UMKM Indonesia.</p>
          <div className="closing-cta pv pd2">
            <button className="btn btn-soon" disabled>
              <span className="dot"></span> Segera Hadir
            </button>
            {/* TODO: set business WhatsApp — replace href with the wa.me link */}
            <a className="btn btn-ghost" href="#">
              Chat Kami →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
