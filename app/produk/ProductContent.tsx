"use client";

import Link from "next/link";
import { useEffect } from "react";
import WhatsAppChat, { type ChatStep } from "../WhatsAppChat";

// "Cara kerja model" how-it-works: decorative cube (repeated per sub-section).
function HiwCube() {
  return (
    <span className="hiw-cube">
      <svg viewBox="0 0 120 120" fill="none" stroke="#D8D4E0" strokeWidth="1.5">
        <path d="M60 30 L85 44 L85 72 L60 86 L35 72 L35 44 Z" />
        <path d="M60 30 L60 58 M60 58 L85 44 M60 58 L35 44" />
      </svg>
    </span>
  );
}

// How-it-works (LLM internals) flow SVGs — static illustrative graphics (viewBox
// + width:100% so they scale on mobile). Injected as-is for foreignObject
// fidelity; classes are hiw-* prefixed and styled scoped under .hiw. Conceptual,
// not a claim of a shipped feature. (Unused marker defs from the source dropped.)
const HIW_PIPELINE_SVG = `<svg class="hiw-flow" viewBox="0 0 440 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Alur pemrosesan model bahasa">
<path d="M70 78 V 410" stroke="#E4E0EA" stroke-width="1.4" fill="none"/>
<circle cx="70" cy="78" r="3" fill="#fff" stroke="#DCD8E4" stroke-width="2"/>
<path d="M70 150 H 96 Q112 150 112 150" stroke="#CFD8F4" stroke-width="1.4" fill="none"/>
<path d="M70 232 H 96 Q112 232 112 232" stroke="#E2D2F4" stroke-width="1.4" fill="none"/>
<path d="M70 314 H 96 Q112 314 112 314" stroke="#CFD8F4" stroke-width="1.4" fill="none"/>
<path d="M70 396 H 96 Q112 396 112 396" stroke="#AEDFC0" stroke-width="1.4" fill="none"/>
<circle cx="70" cy="150" r="2.6" fill="#CFD8F4"/><circle cx="70" cy="232" r="2.6" fill="#E2D2F4"/><circle cx="70" cy="314" r="2.6" fill="#CFD8F4"/><circle cx="70" cy="396" r="2.6" fill="#AEDFC0"/>
<foreignObject x="42" y="14" width="384" height="64"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-node hiw-bl"><div class="hiw-nrow"><span class="hiw-nicon hiw-ic-blue"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span class="hiw-ntitle">Pesan masuk di WhatsApp</span><span class="hiw-ntag">"es kopsu 2.."</span></div></div></foreignObject>
<foreignObject x="114" y="118" width="312" height="64"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-node hiw-pu"><div class="hiw-nrow"><span class="hiw-nicon hiw-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span><span class="hiw-ntitle">Tokenisasi</span><span class="hiw-ntag">Token</span></div><div class="hiw-nsub"><span class="hiw-toks"><span class="hiw-tok">es</span><span class="hiw-tok">kop</span><span class="hiw-tok">su</span><span class="hiw-tok">2</span><span class="hiw-tok">less</span><span class="hiw-tok">sugar</span></span></div></div></foreignObject>
<foreignObject x="114" y="200" width="312" height="64"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-node hiw-bl"><div class="hiw-nrow"><span class="hiw-nicon hiw-ic-blue"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg></span><span class="hiw-ntitle">Deteksi maksud</span><span class="hiw-ntag">Intent</span></div><div class="hiw-nsub">Maksud: <b>Order makanan/minuman</b></div></div></foreignObject>
<foreignObject x="114" y="282" width="312" height="64"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-node hiw-pu"><div class="hiw-nrow"><span class="hiw-nicon hiw-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a2 2 0 0 1 2-2h2M4 17v2a2 2 0 0 0 2 2h2M16 3h2a2 2 0 0 1 2 2v2M16 21h2a2 2 0 0 0 2-2v-2"/></svg></span><span class="hiw-ntitle">Ambil konteks</span><span class="hiw-ntag">Context window</span></div><div class="hiw-nsub">Menu, riwayat chat, jam buka</div></div></foreignObject>
<foreignObject x="114" y="364" width="312" height="64"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-node hiw-gr"><div class="hiw-nrow"><span class="hiw-nicon hiw-ic-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 5V3M12 21v-2M5 12H3M21 12h-2M7 7L5.5 5.5M18.5 18.5L17 17"/></svg></span><span class="hiw-ntitle">Menalar &amp; susun</span><span class="hiw-ntag">Reasoning</span></div><div class="hiw-nsub">2× Es Kopi Susu, less sugar <b>- konfirmasi</b></div></div></foreignObject>
</svg>`;

const HIW_CONTEXT_SVG = `<svg class="hiw-flow" viewBox="0 0 460 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Konteks yang dipakai model">
<path d="M120 60 C 168 76, 198 140, 215 178" stroke="#CFD8F4" stroke-width="1.3" fill="none"/>
<path d="M340 60 C 292 76, 262 140, 245 178" stroke="#E2D2F4" stroke-width="1.3" fill="none"/>
<path d="M120 156 C 162 168, 196 184, 214 196" stroke="#AEDFC0" stroke-width="1.3" fill="none"/>
<path d="M340 156 C 298 168, 264 184, 246 196" stroke="#CFD8F4" stroke-width="1.3" fill="none"/>
<path d="M230 244 C 230 280, 150 270, 130 312" stroke="#E2D2F4" stroke-width="1.3" fill="none"/>
<path d="M230 244 C 230 280, 310 270, 330 312" stroke="#AEDFC0" stroke-width="1.3" fill="none"/>
<circle cx="215" cy="178" r="2.4" fill="#CFD8F4"/><circle cx="245" cy="178" r="2.4" fill="#E2D2F4"/>
<circle cx="214" cy="196" r="2.4" fill="#AEDFC0"/><circle cx="246" cy="196" r="2.4" fill="#CFD8F4"/>
<foreignObject x="20" y="44" width="190" height="30"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-hublab"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Isi percakapan</div></foreignObject>
<foreignObject x="270" y="44" width="180" height="30"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-hublab"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3" y2="6.01"/><line x1="3" y1="12" x2="3" y2="12.01"/><line x1="3" y1="18" x2="3" y2="18.01"/></svg> Menu &amp; harga</div></foreignObject>
<foreignObject x="20" y="140" width="190" height="30"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-hublab"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg> Riwayat pesanan</div></foreignObject>
<foreignObject x="270" y="140" width="180" height="30"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-hublab"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> Jam buka &amp; promo</div></foreignObject>
<foreignObject x="198" y="180" width="64" height="64"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-hubmark"><span class="hiw-mk"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z" fill="#7018D8"/></svg></span></div></foreignObject>
<foreignObject x="44" y="312" width="160" height="62"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-hubcard"><div class="hiw-t"><span class="hiw-ci hiw-ic-blue"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span> Percakapan</div><div class="hiw-s">Sesi chat berjalan</div></div></foreignObject>
<foreignObject x="256" y="312" width="160" height="62"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-hubcard"><div class="hiw-t"><span class="hiw-ci hiw-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a2 2 0 0 1 2-2h2M4 17v2a2 2 0 0 0 2 2h2M16 3h2a2 2 0 0 1 2 2v2M16 21h2a2 2 0 0 0 2-2v-2"/></svg></span> Menu aktif</div><div class="hiw-s">Item &amp; harga terkini</div></div></foreignObject>
</svg>`;

const HIW_RESPONSE_SVG = `<svg class="hiw-flow" viewBox="0 0 460 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Memilih respons terbaik">
<path d="M44 60 V 290" stroke="#E4E0EA" stroke-width="1.4" fill="none"/>
<circle cx="44" cy="60" r="3" fill="#fff" stroke="#DCD8E4" stroke-width="2"/>
<path d="M44 70 H 70 Q86 70 86 70" stroke="#AEDFC0" stroke-width="1.4" fill="none"/>
<path d="M44 184 H 70 Q86 184 86 184" stroke="#DCD8E4" stroke-width="1.4" fill="none"/>
<path d="M44 274 H 70 Q86 274 86 274" stroke="#DCD8E4" stroke-width="1.4" fill="none"/>
<circle cx="44" cy="70" r="2.6" fill="#AEDFC0"/><circle cx="44" cy="184" r="2.6" fill="#DCD8E4"/><circle cx="44" cy="274" r="2.6" fill="#DCD8E4"/>
<foreignObject x="88" y="20" width="356" height="100"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-crow hiw-win"><div class="hiw-ct"><span class="hiw-cl">Dipilih</span><span class="hiw-cw">paling tepat</span></div><div class="hiw-cq">"Siap kak! 2 Es Kopi Susu less sugar ya, total Rp 36.000. Diambil atau diantar?"</div><div class="hiw-bar"><i style="width:92%"></i></div></div></foreignObject>
<foreignObject x="88" y="146" width="356" height="76"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-crow"><div class="hiw-ct"><span class="hiw-cl">Kandidat</span><span class="hiw-cw">kurang lengkap</span></div><div class="hiw-cq">"Oke, 2 es kopi susu ya."</div><div class="hiw-bar"><i style="width:56%"></i></div></div></foreignObject>
<foreignObject x="88" y="236" width="356" height="76"><div xmlns="http://www.w3.org/1999/xhtml" class="hiw-crow"><div class="hiw-ct"><span class="hiw-cl">Kandidat</span><span class="hiw-cw">terlalu kaku</span></div><div class="hiw-cq">"Pesanan diterima. Mohon lakukan pembayaran."</div><div class="hiw-bar"><i style="width:34%"></i></div></div></foreignObject>
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

/* ---- Animated "intelligence" cards (replaces the static 3-card mockups) ---- */
function Ic2Check({ sw = 3.5 }: { sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function Ic2Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

// Prompt typed by all 3 cards — keeps the page's existing es-kopi-susu example.
const IC2_PROMPT = "2 es kopi susu yg gede less sugar";

const IC2_CARDS: {
  n: number;
  eyebrow: React.ReactNode;
  h3: string;
  p: string;
  pill: string;
  outClass: string;
  result: React.ReactNode;
}[] = [
  {
    n: 1,
    eyebrow: (
      <>
        01 · <b>Memahami</b>
      </>
    ),
    h3: "Menangkap maksud",
    p: "Membaca niat di balik pesan — typo, singkatan, bahasa campur — bukan sekadar mencocokkan kata kunci.",
    pill: "Maksud terdeteksi",
    outClass: "ic2-out ic2-fields",
    result: (
      <>
        <div className="ic2-field"><span className="ic2-k">Item</span><span className="ic2-v">Es Kopi Susu</span></div>
        <div className="ic2-field"><span className="ic2-k">Qty</span><span className="ic2-v">2</span></div>
        <div className="ic2-field"><span className="ic2-k">Size</span><span className="ic2-v">L</span></div>
        <div className="ic2-field"><span className="ic2-k">Sugar</span><span className="ic2-v">less</span></div>
      </>
    ),
  },
  {
    n: 2,
    eyebrow: (
      <>
        02 · <b>Memutuskan</b>
      </>
    ),
    h3: "Memvalidasi dari data",
    p: "Setiap harga, stok, dan ketersediaan diambil dari sistem Anda. AI menafsirkan; data yang menentukan.",
    pill: "Tervalidasi dari data",
    outClass: "ic2-out",
    result: (
      <>
        <div className="ic2-vrow"><span className="ic2-tick"><Ic2Check /></span><span className="ic2-vt">Es Kopi Susu (L)</span><span className="ic2-vp">Rp 18.000</span></div>
        <div className="ic2-vrow"><span className="ic2-tick"><Ic2Check /></span><span className="ic2-vt">Stok tersedia</span><span className="ic2-vp">Ready</span></div>
        <div className="ic2-vtotal"><span className="ic2-vl">Total (×2)</span><span className="ic2-vv">Rp 36.000</span></div>
      </>
    ),
  },
  {
    n: 3,
    eyebrow: (
      <>
        03 · <b>Merespons</b>
      </>
    ),
    h3: "Membalas selayaknya manusia",
    p: "Bahasa Indonesia yang luwes dengan tone yang menyesuaikan konteks — terasa seperti staf, bukan mesin.",
    pill: "Siap dikirim",
    outClass: "ic2-out",
    result: (
      <>
        <div className="ic2-reply">Siap kak! 2 Es Kopi Susu (L, less sugar) dicatat ya 😊 Total Rp 36.000</div>
        <div className="ic2-meta"><Ic2Check sw={2} /> Dibalas dalam 2 detik</div>
      </>
    ),
  },
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

  // Animated intelligence cards: type the prompt -> reveal pill + result -> hold -> loop.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".product-page .ic2-inner")
    );
    const timers: number[] = [];
    cards.forEach((card) => {
      const id = Number(card.getAttribute("data-card")) || 1;
      const typedEl = card.querySelector<HTMLElement>(".ic2-typed");
      const caret = card.querySelector<HTMLElement>(".ic2-caret");
      const out = card.querySelector<HTMLElement>(".ic2-out");
      if (!typedEl || !caret || !out) return;
      if (reduce) {
        typedEl.textContent = IC2_PROMPT;
        out.classList.add("ic2-reveal");
        return;
      }
      const cycle = () => {
        typedEl.textContent = "";
        out.classList.remove("ic2-reveal");
        caret.classList.remove("ic2-hide");
        let i = 0;
        const type = () => {
          if (i <= IC2_PROMPT.length) {
            typedEl.textContent = IC2_PROMPT.slice(0, i);
            i++;
            timers.push(window.setTimeout(type, 55));
          } else {
            caret.classList.add("ic2-hide");
            out.classList.add("ic2-reveal");
            timers.push(window.setTimeout(cycle, 3600));
          }
        };
        type();
      };
      timers.push(window.setTimeout(cycle, 500 + (id - 1) * 400));
    });
    return () => timers.forEach((t) => clearTimeout(t));
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

      {/* INTELLIGENCE — animated gradient-border AI cards in one blueprint container */}
      <section className="intel">
        <div className="wrap">
          <div className="ic2-cards">
            {IC2_CARDS.map((c) => (
              <div className="ic2-pc" key={c.n}>
                <div className="ic2-eyebrow">{c.eyebrow}</div>
                <h3>{c.h3}</h3>
                <p>{c.p}</p>
                <div className="ic2-card">
                  <div className="ic2-inner" data-card={c.n}>
                    <div className="ic2-msg">
                      <span className="ic2-typed"></span>
                      <span className="ic2-caret"></span>
                    </div>
                    <div className="ic2-arrow">
                      <Ic2Arrow />
                    </div>
                    <div className={c.outClass}>
                      <span className="ic2-pill">
                        <Ic2Check /> {c.pill}
                      </span>
                      {c.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW-IT-WORKS (LLM internals) — illustrative concept (scoped .hiw) */}
      <section className="hiw">
        <div className="wrap">
          <div className="hiw-intro">
            <h2>
              Ini bukan automation chatbot,
              <br className="hiw-bp" />
              tapi AI-Native di WhatsApp Anda.
            </h2>
            <p>
              Paham bahasa sehari-hari pelanggan. Menalar sendiri. Tetap
              nyambung walau pertanyaannya di luar dugaan.
            </p>
          </div>

          <div className="hiw-boxgroup">
            <div className="hiw-sec">
              <div className="hiw-pleft">
                <h3>Yang terjadi sebelum membalas.</h3>
                <p>
                  Setiap pesan diproses model bahasa dalam beberapa langkah -
                  tokenisasi, deteksi maksud, pengambilan konteks, lalu
                  penalaran - sebelum jawaban dikirim ke WhatsApp.
                </p>
              </div>
              <div className="hiw-canvas">
                <div className="hiw-c2">
                  <div dangerouslySetInnerHTML={{ __html: HIW_PIPELINE_SVG }} />
                  <div className="hiw-dcard">
                    <div className="hiw-dh">
                      <span className="hiw-dm">
                        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </span>{" "}
                      Pesan dibaca
                    </div>
                    <div className="hiw-drow"><span className="hiw-k">Maksud</span><span className="hiw-v"><span className="hiw-vchip hiw-vp">Order</span></span></div>
                    <div className="hiw-drow"><span className="hiw-k">Item</span><span className="hiw-v">Es Kopi Susu</span></div>
                    <div className="hiw-drow"><span className="hiw-k">Jumlah</span><span className="hiw-v">2</span></div>
                    <div className="hiw-drow"><span className="hiw-k">Catatan</span><span className="hiw-v">less sugar</span></div>
                    <div className="hiw-drow"><span className="hiw-k">Keyakinan</span><span className="hiw-v"><span className="hiw-vchip">tinggi</span></span></div>
                  </div>
                </div>
                <HiwCube />
              </div>
            </div>

            <div className="hiw-sec">
              <div className="hiw-pleft">
                <h3>Konteks yang dipakai model.</h3>
                <p>
                  Bukan menebak dari satu kata. Model mempertimbangkan isi
                  percakapan, menu, dan riwayat pesanan - lalu memilih model
                  terbaik untuk menjawab.
                </p>
              </div>
              <div className="hiw-canvas">
                <div className="hiw-c2">
                  <div dangerouslySetInnerHTML={{ __html: HIW_CONTEXT_SVG }} />
                  <div>
                    <div className="hiw-panel-h">Multi-model routing</div>
                    <div className="hiw-models">
                      <div className="hiw-mrow hiw-active"><span className="hiw-md">AI</span> Model terbaik dipilih</div>
                      <div className="hiw-mrow hiw-faint"><span className="hiw-md">A</span> Penyedia model 1</div>
                      <div className="hiw-mrow hiw-faint"><span className="hiw-md">B</span> Penyedia model 2</div>
                      <div className="hiw-mrow hiw-faint"><span className="hiw-md">C</span> Penyedia model 3</div>
                    </div>
                  </div>
                </div>
                <HiwCube />
              </div>
            </div>

            <div className="hiw-sec">
              <div className="hiw-pleft">
                <h3>Memilih respons terbaik.</h3>
                <p>
                  Model menimbang beberapa kemungkinan jawaban berdasarkan
                  maksud, konteks, dan kesopanan - lalu memilih yang paling tepat
                  untuk dikirim.
                </p>
              </div>
              <div className="hiw-canvas">
                <div className="hiw-c2">
                  <div dangerouslySetInnerHTML={{ __html: HIW_RESPONSE_SVG }} />
                  <div>
                    <div className="hiw-panel-h">Yang ditimbang</div>
                    <div className="hiw-factors">
                      <div className="hiw-frow hiw-hl"><span className="hiw-fi"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z" /></svg></span> Maksud pelanggan</div>
                      <div className="hiw-frow"><span className="hiw-fi"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5a2 2 0 0 1 2-2h2M16 3h2a2 2 0 0 1 2 2v2M4 17v2a2 2 0 0 0 2 2h2M16 21h2a2 2 0 0 0 2-2v-2" /></svg></span> Konteks percakapan</div>
                      <div className="hiw-frow"><span className="hiw-fi"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M8 10h8M8 14h5" /><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></span> Nada &amp; kesopanan</div>
                      <div className="hiw-frow"><span className="hiw-fi"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span> Akurasi info</div>
                    </div>
                  </div>
                </div>
                <HiwCube />
              </div>
            </div>
          </div>

          <p className="hiw-cap">
            Ilustrasi konsep cara kerja model bahasa. Sosmed AI masih dalam
            pengembangan; contoh, nilai, dan keyakinan di sini hanya sampel,
            bukan data nyata.
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
