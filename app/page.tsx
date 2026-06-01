"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const FLIP_PHRASES = [
  "Restoran",
  "Warung",
  "Coffee Shop",
  "Bakery Shop",
  "Pastry Shop",
  "F&B lainnya",
];

/* ---- line icons: 24x24, inherit each section's accent via currentColor ---- */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function IconCoffee() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 9h13v4.5a5.5 5.5 0 0 1-5.5 5.5h-2A5.5 5.5 0 0 1 4 13.5Z" />
      <path d="M17 10.5h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 3v2M11.5 3v2" />
    </svg>
  );
}

function IconShieldCheck() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </svg>
  );
}

function IconCreditCard() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9.5h18" />
      <path d="M7 14.5h3.5" />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 4v15a1 1 0 0 0 1 1h15" />
      <path d="m7.5 14 3.5-3.5 3 3L20 7" />
      <path d="M16 7h4v4" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M11 3c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
      <path d="M18.5 14c.2 1.3.9 2 2.2 2.2-1.3.2-2 .9-2.2 2.2-.2-1.3-.9-2-2.2-2.2 1.3-.2 2-.9 2.2-2.2Z" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      <path d="M8 9h8M8 12.5h5" />
    </svg>
  );
}

function IconBowl() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M2 10.5h20" />
      <path d="M4 10.5a8 8 0 0 0 16 0" />
      <path d="M9 6.8c-.4-.9.4-1.7 0-2.8M13 6.8c-.4-.9.4-1.7 0-2.8" />
    </svg>
  );
}

function IconCup() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 7h12l-1 12.6a2 2 0 0 1-2 1.4H9a2 2 0 0 1-2-1.4L6 7Z" />
      <path d="M5 7h14" />
      <path d="m13.5 2-2 5" />
    </svg>
  );
}

function IconBread() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 11a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5 2 2 0 0 1-2 2v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5a2 2 0 0 1-2-2Z" />
      <path d="M10 9.5 8.8 12M14 9.5 12.8 12" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <path d="M12 14.5v2.5" />
    </svg>
  );
}

export default function Home() {
  // ===== hero flipping word =====
  const [flipIdx, setFlipIdx] = useState(0);
  const [flipPrev, setFlipPrev] = useState<number | null>(null);

  useEffect(() => {
    // respect reduced-motion: don't rotate, just show the first phrase statically
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setFlipIdx((cur) => {
        setFlipPrev(cur);
        return (cur + 1) % FLIP_PHRASES.length;
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    // AbortController lets us remove every addEventListener at once on cleanup,
    // so React Strict Mode's double-mount doesn't double-fire or leak listeners.
    const ac = new AbortController();
    const { signal } = ac;

    // ===== Animated chat demos (height-stable) =====
    function playChat(chat: any) {
      if (!chat) return;
      const bubbles = Array.from(
        chat.querySelectorAll(".bubble, .ui-pill")
      ) as HTMLElement[];
      const loopMs = parseInt(chat.dataset.loop || "6000", 10);
      if (chat._timers) chat._timers.forEach((t: number) => clearTimeout(t));
      chat._timers = [];

      // reset: all bubbles pending (out of flow), container stays fixed height
      bubbles.forEach((b) => {
        b.classList.remove("seen");
        b.classList.add("pending");
      });
      const oldTyping = chat.querySelector(".typing");
      if (oldTyping) oldTyping.remove();
      chat.scrollTop = 0;

      let delay = 350;
      bubbles.forEach((b) => {
        const isIn =
          b.classList.contains("b-in") ||
          b.classList.contains("b-points") ||
          b.classList.contains("ui-pill");
        const typeTime = isIn ? 800 : 400;
        // typing indicator
        const t1 = window.setTimeout(() => {
          const typing = document.createElement("div");
          typing.className = "typing" + (isIn ? "" : " out");
          typing.innerHTML = "<span></span><span></span><span></span>";
          chat.appendChild(typing);
          requestAnimationFrame(() => typing.classList.add("show"));
          chat.scrollTop = chat.scrollHeight;
          chat._activeTyping = typing;
        }, delay);
        chat._timers.push(t1);
        // reveal bubble (move into flow + fade in), remove typing, scroll within container
        const t2 = window.setTimeout(() => {
          if (chat._activeTyping) {
            chat._activeTyping.remove();
            chat._activeTyping = null;
          }
          b.classList.remove("pending");
          // force reflow so the transition fires
          void b.offsetWidth;
          b.classList.add("seen");
          chat.scrollTop = chat.scrollHeight;
        }, delay + typeTime);
        chat._timers.push(t2);
        delay += typeTime + 700;
      });

      // show replay + schedule loop
      const replay = chat.parentElement.querySelector("[data-replay]");
      const tEnd = window.setTimeout(() => {
        if (replay) replay.classList.add("show");
      }, delay);
      chat._timers.push(tEnd);
      const tLoop = window.setTimeout(() => {
        if (replay) replay.classList.remove("show");
        playChat(chat);
      }, delay + loopMs);
      chat._timers.push(tLoop);
    }

    // init: mark all bubbles pending immediately so containers render at fixed height with nothing showing
    document.querySelectorAll("[data-chat]").forEach((chat) => {
      chat
        .querySelectorAll(".bubble, .ui-pill")
        .forEach((b) => b.classList.add("pending"));
    });

    // start on scroll into view
    const chatObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const target = e.target as any;
          if (e.isIntersecting && !target._started) {
            target._started = true;
            playChat(target);
          }
        });
      },
      { threshold: 0.35 }
    );
    document
      .querySelectorAll("[data-chat]")
      .forEach((c) => chatObserver.observe(c));

    // replay buttons
    document.querySelectorAll("[data-replay]").forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const chat = btn.parentElement!.querySelector("[data-chat]");
          btn.classList.remove("show");
          playChat(chat);
        },
        { signal }
      );
    });

    // ===== FAQ accordion =====
    document.querySelectorAll(".faq-q").forEach((q) => {
      q.addEventListener(
        "click",
        () => {
          const item = q.parentElement as HTMLElement;
          const open = item.classList.contains("open");
          document.querySelectorAll(".faq-item").forEach((i) => {
            i.classList.remove("open");
            (i.querySelector(".faq-a") as HTMLElement).style.maxHeight = "";
          });
          if (!open) {
            item.classList.add("open");
            const a = item.querySelector(".faq-a") as HTMLElement;
            a.style.maxHeight = a.scrollHeight + "px";
          }
        },
        { signal }
      );
    });

    // ===== cleanup: stop observers, clear timers, drop listeners (Strict Mode safe) =====
    return () => {
      chatObserver.disconnect();
      ac.abort();
      document.querySelectorAll("[data-chat]").forEach((chat) => {
        const c = chat as any;
        if (c._timers) c._timers.forEach((t: number) => clearTimeout(t));
        c._timers = [];
        c._started = false;
        c._activeTyping = null;
        const typing = chat.querySelector(".typing");
        if (typing) typing.remove();
      });
    };
  }, []);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <h1 className="reveal d1 hero-headline">
            <span className="hl-line">WhatsApp Anda,</span>
            <span className="hl-line">AI Assistant bisnis</span>
            <span className="hl-line hl-flip-line">
              untuk{" "}
              <span className="flip" aria-live="polite">
                <span className="flip-sizer" aria-hidden="true">
                  Bakery Shop
                </span>
                {flipPrev !== null && (
                  <span
                    key={`flip-out-${flipIdx}`}
                    className="flip-word out"
                    aria-hidden="true"
                  >
                    {FLIP_PHRASES[flipPrev]}
                  </span>
                )}
                <span key={`flip-in-${flipIdx}`} className="flip-word in">
                  {FLIP_PHRASES[flipIdx]}
                </span>
              </span>
            </span>
          </h1>
          <p className="sub reveal d3">
            Terima order otomatis 24 jam dan bikin pelanggan balik lagi dengan
            sistem poin — semua jalan sendiri lewat WhatsApp. Anda kelola
            semuanya dari chat juga: tanpa dashboard, tanpa aplikasi, tanpa
            login. Dibuat khusus untuk kafe dan restoran kecil Indonesia.
          </p>
          <div className="hero-cta reveal d4">
            <button className="btn btn-soon" disabled>
              <span className="dot"></span> Segera Hadir
            </button>
            <a className="btn btn-ghost" href="#cara-kerja">
              Lihat Cara Kerja ↓
            </a>
          </div>
          <p className="hero-note reveal d4">
            Akses awal segera dibuka · <b>Gratis untuk founding user</b> · Setup
            30 menit
          </p>

          <div className="chips reveal d5">
            <span className="chip">
              <b>•</b> Order Otomatis
            </span>
            <span className="chip">
              <b>•</b> Balas 24 Jam
            </span>
            <span className="chip">
              <b>•</b> Sistem Poin
            </span>
            <span className="chip">
              <b>•</b> Member Digital
            </span>
            <span className="chip">
              <b>•</b> Menu QR
            </span>
            <span className="chip">
              <b>•</b> WhatsApp Resmi Meta
            </span>
          </div>

          {/* HERO VISUAL */}
          <div className="hero-visual reveal d5">
            <div className="hv-grid">
              {/* whatsapp chat */}
              <div className="phone">
                <div className="demo-tag">
                  <span className="rec"></span> DEMO LANGSUNG
                </div>
                <div className="wa-top">
                  <div className="wa-av">KS</div>
                  <div>
                    <div className="wa-name">Kopi Senja</div>
                    <div className="wa-status">● online · dibalas otomatis</div>
                  </div>
                </div>
                <div className="wa-body chat-anim" data-chat data-loop="6000">
                  <div className="bubble b-out">
                    Halo kak, masih buka? Mau es kopi susu 2 ya, less sugar 🙏
                    <span className="b-meta">21:14 ✓✓</span>
                  </div>
                  <div className="bubble b-in">
                    Halo kak! Masih buka sampai jam 11 malam 🙌 Es Kopi Susu Gula
                    Aren 2 (less sugar), totalnya Rp 36.000. Diambil atau diantar
                    ya kak?<span className="b-meta">21:14</span>
                  </div>
                  <div className="bubble b-out">
                    Diambil aja ya<span className="b-meta">21:15 ✓✓</span>
                  </div>
                  <div className="bubble b-in">
                    Siap kak! Order #1042 lagi disiapin ya ☕ Struk sudah dikirim.
                    <span className="b-meta">21:15</span>
                  </div>
                  <div className="bubble b-points">
                    🎉 Kakak dapat +36 poin! Total 284 poin — 16 lagi buat
                    voucher Rp 5.000.
                  </div>
                </div>
                <button className="replay-btn" data-replay>
                  ↻ Putar ulang
                </button>
              </div>
              {/* dashboard */}
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">Order Masuk Hari Ini</div>
                  <div className="panel-tag">● Live</div>
                </div>
                <div className="order-row">
                  <div>
                    <div className="oi">#1042 · Es Kopi Susu ×2</div>
                    <div className="od">less sugar · ambil sendiri</div>
                  </div>
                  <div className="stat stat-new">Baru</div>
                </div>
                <div className="order-row">
                  <div>
                    <div className="oi">#1041 · Americano ×1</div>
                    <div className="od">panas · meja 4</div>
                  </div>
                  <div className="stat stat-done">Selesai</div>
                </div>
                <div className="order-row">
                  <div>
                    <div className="oi">#1040 · Croissant ×2</div>
                    <div className="od">takeaway</div>
                  </div>
                  <div className="stat stat-done">Selesai</div>
                </div>
                <div className="mini-stats">
                  <div className="mini">
                    <div className="n">48</div>
                    <div className="l">Order hari ini</div>
                  </div>
                  <div className="mini">
                    <div className="n">Rp 1,4jt</div>
                    <div className="l">Penjualan</div>
                  </div>
                  <div className="mini">
                    <div className="n">126</div>
                    <div className="l">Member aktif</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust">
        <div className="wrap">
          <p>Dibangun khusus untuk cara kerja F&amp;B Indonesia</p>
          <div className="trust-row">
            <div className="trust-pill">
              <span className="e"><IconShieldCheck /></span> WhatsApp Resmi Meta
            </div>
            <div className="trust-pill">
              <span className="e"><IconBolt /></span> Setup 30 Menit
            </div>
            <div className="trust-pill">
              <span className="e">🇮🇩</span> Bahasa Indonesia Native
            </div>
            <div className="trust-pill">
              <span className="e"><IconLock /></span> Aman &amp; Patuh UU PDP
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="wrap">
          <div className="eyebrow">Kenyataan Sehari-hari di Kafe</div>
          <h2 className="sec-title">
            Berapa banyak order hilang karena chat nggak sempat dibales?
          </h2>
          <div className="prob-grid">
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Chat masuk pas lagi rame.</b> Pelanggan nanya menu, nunggu
                lama, nggak dibales, pindah ke kafe sebelah.
              </p>
            </div>
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Tutup, owner tidur.</b> Order tengah malam atau pagi buta
                hilang begitu aja.
              </p>
            </div>
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Capek bales pertanyaan yang sama.</b> &quot;Buka jam
                berapa?&quot;, &quot;ada apa aja?&quot;, &quot;berapa
                totalnya?&quot; — berjam-jam tiap hari.
              </p>
            </div>
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Pelanggan dateng sekali, terus lupa.</b> Padahal 60–70% omzet
                kafe dari pelanggan langganan.
              </p>
            </div>
          </div>
          <p className="prob-foot">
            Rata-rata coffee shop kehilangan <b>Rp 2–4 juta per bulan</b> hanya
            dari order yang nggak kebales. SOSMED AI menutup celah itu.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur">
        <div className="wrap">
          <div className="eyebrow">Yang Anda Dapatkan</div>
          <h2 className="sec-title">
            Satu sistem. Semua yang kafe Anda butuhkan.
          </h2>
          <p className="sec-lead">
            Bukan sekadar chatbot. SOSMED AI adalah sistem lengkap — order, menu,
            member, dan poin — yang jalan otomatis di WhatsApp yang sudah Anda
            pakai tiap hari.
          </p>

          {/* f1 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">01 · Bot Order Otomatis</div>
              <h3>Balas pelanggan 24 jam, tanpa pegang HP terus.</h3>
              <p>
                AI balas tanya menu, jam buka, dan terima order langsung dari
                chat — bahasa Indonesia santai, ngerti pesanan kayak &quot;es
                kopi susu less sugar, gelas gede&quot;. Yang ribet baru
                dialihkan ke barista Anda.
              </p>
              <div className="f-chips">
                <span>24 Jam</span>
                <span>Bahasa Santai</span>
                <span>Ngerti Varian Menu</span>
              </div>
            </div>
            <div className="f-visual chat-anim" data-chat data-loop="5000">
              <div className="bubble b-out" style={{ maxWidth: "90%" }}>
                Ada menu apa aja kak?
              </div>
              <div className="bubble b-in" style={{ maxWidth: "90%" }}>
                Hari ini ada: Es Kopi Susu, Americano, Cappuccino, Matcha Latte,
                sama Croissant &amp; Pain au Chocolat 🥐 Mau pesan yang mana kak?
              </div>
              <div
                className="ui-pill"
                style={{ alignSelf: "flex-start", color: "var(--green)" }}
              >
                ⚡ Dibalas dalam 2 detik
              </div>
              <button className="replay-btn" data-replay>
                ↻ Putar ulang
              </button>
            </div>
          </div>

          {/* f2 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">02 · Menu Digital + QR Meja</div>
              <h3>Ganti menu JPG yang ribet di-update.</h3>
              <p>
                Menu online yang bisa Anda ubah dalam 30 detik. Cetak QR untuk di
                meja — pelanggan scan, lihat menu, pesan dari tempat duduk. Ganti
                harga sekali, langsung berubah di mana-mana.
              </p>
              <div className="f-chips">
                <span>Update Instan</span>
                <span>QR di Meja</span>
                <span>Order dari Tempat Duduk</span>
              </div>
            </div>
            <div className="f-visual">
              <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                <div className="qr"></div>
                <div style={{ flex: 1 }}>
                  <div className="menu-item">
                    <span>Es Kopi Susu Gula Aren</span>
                    <span className="p">Rp 18rb</span>
                  </div>
                  <div className="menu-item">
                    <span>Americano</span>
                    <span className="p">Rp 15rb</span>
                  </div>
                  <div className="menu-item">
                    <span>Matcha Latte</span>
                    <span className="p">Rp 25rb</span>
                  </div>
                  <div className="menu-item">
                    <span>Croissant</span>
                    <span className="p">Rp 22rb</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* f3 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">03 · Sistem Poin &amp; Member</div>
              <h3>Bikin pelanggan balik lagi — otomatis.</h3>
              <p>
                Setiap belanja Rp 1.000 dapat 1 poin. Kumpulin 100 poin, tukar
                voucher Rp 5.000. Pelanggan daftar member langsung lewat WhatsApp
                — cukup ketik nama, nggak perlu download aplikasi atau kartu
                fisik.
              </p>
              <div className="f-chips">
                <span>1 Poin / Rp 1.000</span>
                <span>Voucher Otomatis</span>
                <span>Daftar via WhatsApp</span>
              </div>
            </div>
            <div className="f-visual chat-anim" data-chat data-loop="5000">
              <div className="bubble b-in" style={{ maxWidth: "92%" }}>
                Mau daftar member kak? Tiap order dapat poin, bisa ditukar
                minuman gratis ☕ Ketik nama aja buat daftar 🙂
              </div>
              <div className="bubble b-out" style={{ maxWidth: "60%" }}>
                Dimas
              </div>
              <div className="bubble b-points" style={{ maxWidth: "92%" }}>
                ✅ Sip Dimas, udah terdaftar! Order tadi langsung dapat +36 poin.
              </div>
              <button className="replay-btn" data-replay>
                ↻ Putar ulang
              </button>
            </div>
          </div>

          {/* f4 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">04 · Kelola Order dari WhatsApp</div>
              <h3>Lihat &amp; kelola order tanpa buka dashboard.</h3>
              <p>
                Order baru langsung masuk ke WhatsApp Anda dengan notifikasi.
                Chat bot Anda buat lihat order hari ini, tandai pesanan selesai,
                atau cek penjualan — semua dari chat, nggak perlu buka aplikasi
                atau laptop.
              </p>
              <div className="f-chips">
                <span>Notif Real-Time</span>
                <span>Kelola via Chat</span>
                <span>Tanpa Login</span>
              </div>
            </div>
            <div className="f-visual">
              <div className="order-row" style={{ margin: "0 0 9px" }}>
                <div>
                  <div className="oi">#1042 · Es Kopi Susu ×2</div>
                  <div className="od">less sugar</div>
                </div>
                <div className="stat stat-new">Baru</div>
              </div>
              <div className="order-row" style={{ margin: "0 0 9px" }}>
                <div>
                  <div className="oi">#1041 · Americano ×1</div>
                  <div className="od">meja 4</div>
                </div>
                <div className="stat stat-done">Selesai</div>
              </div>
              <div className="mini-stats" style={{ marginTop: "4px" }}>
                <div className="mini">
                  <div className="n">48</div>
                  <div className="l">Order</div>
                </div>
                <div className="mini">
                  <div className="n">Rp 1,4jt</div>
                  <div className="l">Penjualan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="wrap">
          <div className="eyebrow">Kenapa SOSMED AI</div>
          <h2 className="sec-title">
            Bukan yang termurah. Yang paling pas untuk coffee shop.
          </h2>
          <div className="why-grid" style={{ marginTop: "14px" }}>
            <div className="why-card">
              <div className="ic"><IconCoffee /></div>
              <h3>Khusus F&amp;B</h3>
              <p>
                Bukan tools generik untuk semua usaha. Tiap fitur dirancang untuk
                cara kerja kafe: varian menu (es/panas, less sugar), QR meja,
                poin untuk pelanggan langganan.
              </p>
            </div>
            <div className="why-card">
              <div className="ic"><IconShieldCheck /></div>
              <h3>WhatsApp Resmi Meta</h3>
              <p>
                Kami pakai WhatsApp Business API resmi Meta — nomor Anda aman dari
                banned, bisa kirim promo dengan aman. Bukan tools bajakan yang
                minta scan QR.
              </p>
            </div>
            <div className="why-card">
              <div className="ic"><IconCreditCard /></div>
              <h3>Satu Harga, Semua Fitur</h3>
              <p>
                Nggak ada biaya tersembunyi, nggak ada add-on yang bikin tagihan
                membengkak. Anda tahu persis bayar berapa tiap bulan.
              </p>
            </div>
            <div className="why-card">
              <div className="ic"><IconGrowth /></div>
              <h3>Bayar Sendiri</h3>
              <p>
                Mulai Rp 199 ribu/bulan — sekitar Rp 6.600/hari, kurang dari satu
                cup kopi. Satu order tambahan sehari aja sudah balik modal
                berkali lipat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NO DASHBOARD / ALL IN WHATSAPP */}
      <section id="tanpa-dashboard" className="nodash">
        <div className="wrap">
          <div className="eyebrow">Tanpa Aplikasi, Tanpa Login</div>
          <h2 className="sec-title">
            Semua di WhatsApp. Sisi customer dan sisi Anda.
          </h2>
          <p className="sec-lead">
            Pemilik kafe nggak perlu buka dashboard, nggak perlu install
            aplikasi, nggak perlu hapal sistem baru. Anda kelola seluruh bisnis
            dengan chat — di WhatsApp yang sudah Anda pakai tiap hari.
          </p>

          <div className="nodash-intro">
            <div className="nodash-text">
              <h3>Anda sudah jago pakai WhatsApp. Itu aja cukup.</h3>
              <p>
                Kebanyakan tools bisnis maksa Anda belajar dashboard rumit, buka
                laptop, login tiap hari. SOSMED AI kebalikannya — Anda cukup chat
                bot Anda sendiri untuk lihat order, ubah menu, cek penjualan,
                atau tandai pesanan selesai.
              </p>
              <p>
                Customer pesan lewat WhatsApp. Anda kelola juga lewat WhatsApp.
                Satu aplikasi, dua sisi, nol ribet.
              </p>
              <div className="kill">
                <div className="kill-row">
                  <span className="x">✕</span> <s>Buka dashboard di laptop</s>{" "}
                  &nbsp;→&nbsp; <span className="now">Chat bot Anda</span>
                </div>
                <div className="kill-row">
                  <span className="x">✕</span> <s>Install aplikasi baru</s>{" "}
                  &nbsp;→&nbsp; <span className="now">Pakai WhatsApp biasa</span>
                </div>
                <div className="kill-row">
                  <span className="x">✕</span> <s>Login &amp; hapal password</s>{" "}
                  &nbsp;→&nbsp; <span className="now">Langsung dari chat</span>
                </div>
                <div className="kill-row">
                  <span className="x">✕</span> <s>Belajar sistem baru</s>{" "}
                  &nbsp;→&nbsp; <span className="now">Anda sudah bisa</span>
                </div>
              </div>
            </div>

            {/* owner-side whatsapp demo */}
            <div className="owner-phone">
              <div className="demo-tag">
                <span className="rec"></span> SISI OWNER
              </div>
              <div className="wa-top">
                <div className="wa-av">AI</div>
                <div>
                  <div className="wa-name">SOSMED AI · Asisten Anda</div>
                  <div className="wa-status">● kelola bisnis lewat chat</div>
                </div>
              </div>
              <div
                className="wa-body chat-anim"
                data-chat
                data-loop="5500"
                style={{ height: "360px" }}
              >
                <div className="bubble b-out">
                  order hari ini berapa?
                  <span className="b-meta">09:12 ✓✓</span>
                </div>
                <div className="bubble b-in">
                  Pagi! Sampai sekarang 12 order masuk, total Rp 348.000 ☕ Ada 2
                  order baru yang belum dikonfirmasi.
                  <span className="b-meta">09:12</span>
                </div>
                <div className="bubble b-out">
                  laporan harian dong<span className="b-meta">09:13 ✓✓</span>
                </div>
                <div className="bubble b-in">
                  📊 Laporan Hari Ini (s/d 09:13)
                  <br />• Order: 12 (Rp 348.000)
                  <br />• Best seller: Es Kopi Susu (7)
                  <br />• Jam tersibuk: 08:00–09:00
                  <br />• Member baru: 3
                  <br />• Order via bot: 9 · walk-in: 3
                  <span className="b-meta">09:13</span>
                </div>
                <div className="bubble b-out">
                  matiin es kopi susu, stok habis
                  <span className="b-meta">09:14 ✓✓</span>
                </div>
                <div className="bubble b-in">
                  Siap! &quot;Es Kopi Susu Gula Aren&quot; sudah saya nonaktifkan
                  👍 Customer nggak bisa pesan sampai diaktifkan lagi.
                  <span className="b-meta">09:14</span>
                </div>
                <div className="bubble b-out">
                  laporan bulan ini gimana?
                  <span className="b-meta">09:15 ✓✓</span>
                </div>
                <div className="bubble b-in">
                  📈 Laporan Mei 2026
                  <br />• Total order: 1.284 (Rp 38,6 jt)
                  <br />• Naik 18% dari April 📈
                  <br />• Member aktif: 312 (+47)
                  <br />• Repeat rate: 64%
                  <br />• Top menu: Es Kopi Susu, Americano, Croissant
                  <br />
                  Mau saya kirim versi PDF lengkap?
                  <span className="b-meta">09:15</span>
                </div>
              </div>
              <button className="replay-btn" data-replay>
                ↻ Putar ulang
              </button>
            </div>
          </div>

          {/* two sides */}
          <div className="sides">
            <div className="side-card side-cust">
              <div className="side-head">
                <div className="side-ic"><IconMessage /></div>
                <div>
                  <h3>Sisi Customer</h3>
                  <div className="side-sub">Pesan &amp; cek lewat WhatsApp</div>
                </div>
              </div>
              <ul className="side-list">
                <li>
                  <span className="cmd">&quot;menu&quot;</span> Lihat menu &amp;
                  harga terkini
                </li>
                <li>
                  <span className="cmd">&quot;pesan…&quot;</span> Order langsung
                  dari chat
                </li>
                <li>
                  <span className="cmd">&quot;cek poin&quot;</span> Lihat saldo
                  poin &amp; voucher
                </li>
                <li>
                  <span className="cmd">&quot;daftar&quot;</span> Jadi member
                  cukup ketik nama
                </li>
                <li>
                  <span className="cmd">&quot;jam buka?&quot;</span> Info jam
                  &amp; lokasi otomatis
                </li>
              </ul>
            </div>
            <div className="side-card side-own">
              <div className="side-head">
                <div className="side-ic"><IconCoffee /></div>
                <div>
                  <h3>Sisi Owner</h3>
                  <div className="side-sub">Kelola bisnis lewat WhatsApp</div>
                </div>
              </div>
              <ul className="side-list">
                <li>
                  <span className="cmd">&quot;order hari ini&quot;</span> Lihat
                  order &amp; penjualan
                </li>
                <li>
                  <span className="cmd">&quot;laporan harian&quot;</span>{" "}
                  Ringkasan penjualan hari ini
                </li>
                <li>
                  <span className="cmd">&quot;laporan bulanan&quot;</span>{" "}
                  Performa bulan + tren &amp; PDF
                </li>
                <li>
                  <span className="cmd">&quot;matiin [menu]&quot;</span>{" "}
                  Nonaktifkan menu yang habis
                </li>
                <li>
                  <span className="cmd">&quot;#1042 selesai&quot;</span> Tandai
                  pesanan selesai
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              maxWidth: "760px",
              margin: "28px auto 0",
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              padding: "22px 24px",
              boxShadow: "var(--shadow)",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: "42px",
                height: "42px",
                borderRadius: "11px",
                background: "var(--accent-soft)",
                color: "var(--accent)",
                display: "grid",
                placeItems: "center",
                fontSize: "20px",
              }}
            >
              🖥️
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 700,
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                Butuh lebih lengkap? Dashboard tetap tersedia.
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--ink-soft)",
                  margin: 0,
                }}
              >
                WhatsApp cukup untuk operasional harian. Tapi kalau Anda mau
                laporan penjualan mendetail, kelola puluhan menu sekaligus, atau
                lihat analitik member — dashboard web lengkap siap kapan pun Anda
                butuh. WhatsApp-first, dashboard kalau perlu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI TECH / INTELLIGENCE */}
      <section id="teknologi" className="tech">
        <div className="wrap">
          <div className="eyebrow">Teknologi di Balik Layar</div>
          <h2 className="sec-title">
            AI yang ngerti Indonesia — bukan sekadar tempelan.
          </h2>
          <p className="sec-lead">
            SOSMED AI ditenagai mesin AI multi-model yang dirancang khusus untuk
            bahasa dan perilaku konsumen Indonesia. Cepat, hemat, dan terdengar
            manusiawi.
          </p>

          <div className="tech-grid">
            <div className="tech-feats">
              <div className="tech-feat">
                <div className="ic"><IconSpark /></div>
                <div>
                  <h3>Native Bahasa Indonesia, bukan terjemahan</h3>
                  <p>
                    Dilatih untuk ngerti cara orang Indonesia chat — dari
                    &quot;gas kak&quot;, &quot;es batunya banyakin&quot;, sampai
                    gaya Jaksel. Bot membalas dengan tone yang pas, bukan kaku
                    ala robot translate.
                  </p>
                </div>
              </div>
              <div className="tech-feat">
                <div className="ic"><IconBolt /></div>
                <div>
                  <h3>Multi-model routing yang cerdas</h3>
                  <p>
                    Setiap pesan diarahkan ke model AI yang paling tepat — yang
                    ringan untuk tanya menu, yang canggih untuk percakapan rumit.
                    Hasilnya: balasan cepat, biaya efisien, kualitas tinggi.
                  </p>
                </div>
              </div>
              <div className="tech-feat">
                <div className="ic"><IconTarget /></div>
                <div>
                  <h3>Ngerti konteks F&amp;B</h3>
                  <p>
                    Paham varian menu, modifier (es/panas, less sugar, extra
                    shot), dan istilah kafe. Memvalidasi pesanan dengan menu asli
                    Anda — nggak pernah ngarang item yang nggak ada.
                  </p>
                </div>
              </div>
              <div className="tech-feat">
                <div className="ic"><IconShieldCheck /></div>
                <div>
                  <h3>Aman, terkendali, dan akurat</h3>
                  <p>
                    Harga dan total selalu dihitung dari data Anda, bukan dari
                    AI. Yang di luar jangkauan otomatis dialihkan ke Anda. Tidak
                    ada halusinasi soal harga atau stok.
                  </p>
                </div>
              </div>
            </div>

            {/* AI routing visual */}
            <div className="ai-viz">
              <div className="ai-viz-top">
                <span className="pulse"></span> Mesin AI · memproses pesan
              </div>
              <div className="ai-msg">
                &quot;halo kak, es kopi susu 2 ya, less sugar, sama croissant 1
                🙏&quot;
              </div>
              <div className="ai-flow">
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#C9A6FB" }}></span>{" "}
                    Deteksi maksud
                  </span>
                  <span className="tag tag-route">Order + Menu</span>
                </div>
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#5FD98A" }}></span>{" "}
                    Cek menu &amp; varian
                  </span>
                  <span className="tag tag-fast">Tervalidasi</span>
                </div>
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#C9A6FB" }}></span>{" "}
                    Hitung total dari data
                  </span>
                  <span className="tag tag-route">Rp 58.000</span>
                </div>
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#5FD98A" }}></span>{" "}
                    Balas + kasih poin
                  </span>
                  <span className="tag tag-fast">1,8 detik</span>
                </div>
              </div>
              <div className="ai-foot">
                Diproses dengan model AI yang dipilih otomatis per tugas
              </div>
            </div>
          </div>

          <div className="models">
            <div className="model-chip">
              <span className="md"></span> Routing Multi-Model
            </div>
            <div className="model-chip">
              <span className="md"></span> Caching Cerdas
            </div>
            <div className="model-chip">
              <span className="md"></span> Validasi Anti-Halusinasi
            </div>
            <div className="model-chip">
              <span className="md"></span> Optimasi Biaya Otomatis
            </div>
          </div>
        </div>
      </section>

      {/* AI-NATIVE DIFFERENCE */}
      <section id="beda" className="native">
        <div className="wrap">
          <div className="eyebrow">Apa Bedanya</div>
          <h2 className="sec-title">Kami bukan chatbot. Kami AI-native.</h2>
          <p className="sec-lead">
            Kebanyakan &quot;bot WhatsApp&quot; cuma menu balasan otomatis dengan
            template kaku. SOSMED AI dibangun di atas kecerdasan buatan sungguhan
            — ngerti maksud, konteks, dan bahasa, bukan sekadar mencocokkan kata
            kunci.
          </p>

          <div className="vs-grid">
            <div className="vs-card vs-old">
              <span className="vs-label">Chatbot Biasa</span>
              <h3>Bot template &amp; keyword</h3>
              <ul className="vs-list">
                <li>
                  <span className="vs-ic">✕</span> Balas hanya kalau kata
                  kuncinya pas — salah ketik sedikit, bingung.
                </li>
                <li>
                  <span className="vs-ic">✕</span> &quot;Tekan 1 untuk menu,
                  tekan 2 untuk pesan&quot; — kaku seperti mesin.
                </li>
                <li>
                  <span className="vs-ic">✕</span> Nggak ngerti &quot;es-nya
                  dikit aja ya, gula setengah&quot; — di luar skrip langsung
                  gagal.
                </li>
                <li>
                  <span className="vs-ic">✕</span> Jawaban sama untuk semua
                  orang, terasa robotik.
                </li>
                <li>
                  <span className="vs-ic">✕</span> Perlu disetting manual tiap
                  skenario, ribet diubah.
                </li>
              </ul>
            </div>
            <div className="vs-card vs-new">
              <span className="vs-label">✦ SOSMED AI</span>
              <h3>AI-native, ngerti maksud</h3>
              <ul className="vs-list">
                <li>
                  <span className="vs-ic">✓</span> Paham maksud walau diketik
                  berantakan, typo, atau campur bahasa.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Ngobrol natural seperti
                  barista beneran — santai, ramah, manusiawi.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Ngerti &quot;es-nya dikit,
                  gula setengah, gelas gede&quot; tanpa perlu disetting.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Tone menyesuaikan konteks —
                  dari sapaan ramah sampai konfirmasi order.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Belajar dari menu &amp; data
                  Anda otomatis — nggak perlu skrip manual.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="banding" style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Perbandingan</div>
          <h2 className="sec-title">SOSMED AI vs. solusi lain.</h2>
          <p className="sec-lead">
            Kenapa coffee shop memilih SOSMED AI dibanding chatbot generik, tools
            impor, atau hire admin manual.
          </p>

          <div className="compare-wrap">
            <div className="compare">
              <table className="ctable">
                <thead>
                  <tr>
                    <th className="feat-col">Fitur</th>
                    <th className="us">SOSMED AI</th>
                    <th>Chatbot Generik</th>
                    <th>Tools Impor</th>
                    <th>Admin Manual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="feat-col">AI-native (ngerti maksud)</td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Template</span>
                    </td>
                    <td>
                      <span className="partial">~ Sebagian</span>
                    </td>
                    <td>
                      <span className="partial">~ Manusia</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">
                      Khusus F&amp;B (varian menu, QR meja)
                    </td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Generik</span>
                    </td>
                    <td>
                      <span className="no">✕ Generik</span>
                    </td>
                    <td>
                      <span className="partial">~ Tergantung</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Bahasa Indonesia native</td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="partial">~ Terbatas</span>
                    </td>
                    <td>
                      <span className="no">✕ Translate</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Sistem poin &amp; member</td>
                    <td className="us">
                      <span className="yes">✓ Built-in</span>
                    </td>
                    <td>
                      <span className="no">✕ Tidak</span>
                    </td>
                    <td>
                      <span className="partial">~ Add-on</span>
                    </td>
                    <td>
                      <span className="no">✕ Manual</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">
                      WhatsApp Business API resmi Meta
                    </td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="partial">~ Sering bajakan</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Pribadi</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Kerja 24 jam tanpa lelah</td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Jam kerja</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Harga untuk UMKM F&amp;B</td>
                    <td className="us">
                      <span className="yes">✓ Rp 199rb</span>
                    </td>
                    <td>
                      <span className="partial">~ Variatif</span>
                    </td>
                    <td>
                      <span className="no">✕ Mahal</span>
                    </td>
                    <td>
                      <span className="no">✕ Rp 2jt+</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Setup &amp; pakai sederhana</td>
                    <td className="us">
                      <span className="yes">✓ 30 menit</span>
                    </td>
                    <td>
                      <span className="partial">~ Ribet</span>
                    </td>
                    <td>
                      <span className="no">✕ Teknis</span>
                    </td>
                    <td>
                      <span className="yes">✓ Mudah</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="price-note" style={{ marginTop: "20px" }}>
            Perbandingan berdasarkan karakteristik umum tiap kategori solusi.
            Tidak menyebut merek tertentu.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja">
        <div className="wrap">
          <div className="eyebrow">Cara Kerja</div>
          <h2 className="sec-title">
            Dari daftar sampai terima order otomatis — 30 menit.
          </h2>
          <div className="steps" style={{ marginTop: "14px" }}>
            <div className="step">
              <div className="num">1</div>
              <h3>Hubungkan WhatsApp</h3>
              <p>
                Sambungkan nomor WhatsApp kafe Anda lewat WhatsApp Business API
                resmi Meta. Tim kami bantu prosesnya.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Isi Menu Anda</h3>
              <p>
                Masukkan menu (atau foto menu yang ada — kami bantu input). Atur
                jam buka, alamat, dan aturan poin.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Bot Mulai Jalan</h3>
              <p>
                Bot langsung aktif — terima order, kasih poin, kirim struk. Anda
                tinggal lihat order masuk sambil bikin kopi.
              </p>
            </div>
          </div>
          <p className="how-foot">
            Setup di tempat. Tanpa install apa-apa. Tanpa skill teknis.
            <br />
            Kalau bisa pakai WhatsApp, Anda bisa pakai SOSMED AI.
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section id="untuk-fnb" style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Cocok Untuk</div>
          <h2 className="sec-title">Dibuat khusus untuk bisnis F&amp;B.</h2>
          <div className="uc-grid" style={{ marginTop: "14px" }}>
            <div className="uc">
              <div className="emo"><IconCoffee /></div>
              <h3>Coffee Shop &amp; Kafe</h3>
              <p>
                Terima order pas rame, kasih poin tiap cup, bikin pelanggan jadi
                langganan. Single outlet sampai 2–3 cabang.
              </p>
            </div>
            <div className="uc">
              <div className="emo"><IconBowl /></div>
              <h3>Restoran &amp; Warung</h3>
              <p>
                Kelola order delivery &amp; takeaway dari satu dashboard. Menu
                digital yang gampang di-update.
              </p>
            </div>
            <div className="uc">
              <div className="emo"><IconCup /></div>
              <h3>Kedai Minuman &amp; Dessert</h3>
              <p>
                Sistem poin yang bikin pelanggan balik. Member digital tanpa
                kartu fisik. Boba, jus, es krim.
              </p>
            </div>
            <div className="uc">
              <div className="emo"><IconBread /></div>
              <h3>Bakery &amp; Pastry</h3>
              <p>
                Terima pre-order kue &amp; roti via WhatsApp, kelola pesanan
                custom, kirim struk &amp; reminder otomatis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="harga" className="pricing">
        <div className="wrap">
          <div className="eyebrow">Harga</div>
          <h2 className="sec-title">Pilih paket yang pas untuk kafe Anda.</h2>
          <p className="sec-lead">
            Harga spesial founding user — dikunci selamanya untuk pendaftar
            pertama.
          </p>
          <div className="price-grid">
            <div className="price">
              <h3>Starter</h3>
              <div className="for">
                Untuk single-outlet coffee shop &amp; warung
              </div>
              <div className="amt">
                Rp 199rb<span>/bulan</span>
              </div>
              <ul>
                <li>Bot Order Otomatis WhatsApp</li>
                <li>Menu Digital + QR Code</li>
                <li>Sistem Poin &amp; Member</li>
                <li>Dashboard Order Real-Time</li>
                <li>Struk &amp; Voucher Otomatis</li>
                <li>Hingga 1.500 pesan AI/bulan · 1 outlet</li>
                <li>WhatsApp Business API resmi</li>
              </ul>
              <button className="btn btn-soon" disabled>
                <span className="dot"></span> Segera Hadir
              </button>
            </div>
            <div className="price feat">
              <div className="pop">Paling Populer</div>
              <h3>Growth</h3>
              <div className="for">
                Untuk kafe yang ramai &amp; serius scale up
              </div>
              <div className="amt">
                Rp 299rb<span>/bulan</span>
              </div>
              <ul>
                <li>Semua fitur Starter</li>
                <li>Auto-reply terjadwal (out-of-hours)</li>
                <li>Segmentasi member</li>
                <li>Hingga 5.000 pesan AI/bulan · 1 outlet</li>
                <li>Priority support</li>
              </ul>
              <button className="btn btn-soon" disabled>
                <span className="dot"></span> Segera Hadir
              </button>
            </div>
            <div className="price">
              <h3>Multi-Outlet</h3>
              <div className="for">Untuk usaha dengan 2–3 cabang</div>
              <div className="amt">
                Rp 549rb<span>/bulan</span>
              </div>
              <ul>
                <li>Semua fitur Growth</li>
                <li>Hingga 3 outlet</li>
                <li>Dashboard gabungan multi-outlet</li>
                <li>Hingga 12.000 pesan AI/bulan</li>
                <li>Dedicated support</li>
              </ul>
              <button className="btn btn-soon" disabled>
                <span className="dot"></span> Segera Hadir
              </button>
            </div>
          </div>
          <p className="price-note">
            Semua fitur dalam paket sudah termasuk — tanpa biaya add-on
            tersembunyi.
            <br />
            Add-on lanjutan (AI Konten, integrasi GoFood/GrabFood) tersedia
            menyusul.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="eyebrow">FAQ</div>
          <h2 className="sec-title">Yang sering ditanyain pemilik kafe.</h2>
          <div className="faq-wrap" style={{ marginTop: "14px" }}>
            <div className="faq-item">
              <button className="faq-q">
                Apa itu SOSMED AI?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Asisten WhatsApp berbasis AI khusus untuk coffee shop dan
                  restoran kecil. Bot kami terima order otomatis, balas pelanggan
                  24 jam, dan kelola sistem poin member — semua lewat WhatsApp
                  yang sudah Anda pakai.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Saya nggak ngerti teknologi, bisa pakai?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Bisa banget. Nggak perlu install aplikasi atau belajar sistem
                  ribet. Tim kami bantu setting dalam 30 menit. Kalau bisa pakai
                  WhatsApp, Anda bisa pakai SOSMED AI.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Apakah nomor WhatsApp kafe saya aman?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Sangat aman. Kami pakai WhatsApp Business API resmi dari Meta —
                  bukan tools bajakan yang minta scan QR. Nomor Anda nggak
                  berisiko kena banned, dan bisa kirim promo dengan aman.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Gimana sistem poinnya bekerja?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Setiap belanja Rp 1.000 dapat 1 poin. Kumpulin 100 poin, dapat
                  voucher Rp 5.000. Pelanggan daftar member langsung lewat
                  WhatsApp, cukup ketik nama. Poin dihitung otomatis, voucher
                  dikirim otomatis.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Pelanggan saya kebanyakan bayar tunai, bisa dapat poin?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Untuk awal, poin otomatis untuk order via WhatsApp. Fitur QR di
                  kasir untuk pelanggan walk-in sedang kami siapkan dan tersedia
                  menyusul.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Berapa harganya?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Mulai Rp 199 ribu/bulan untuk Starter, semua fitur sudah
                  termasuk. Pendaftar awal dapat harga founding user yang dikunci
                  selamanya.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Kapan bisa mulai pakai?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Kami sedang finalisasi dan akan segera membuka akses untuk
                  batch pertama. Pantau halaman ini dan media sosial kami untuk
                  info peluncuran.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Bisa integrasi dengan GoFood/GrabFood/ShopeeFood?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Sedang kami kembangkan sebagai add-on. Info rilisnya akan
                  diumumkan menyusul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="wrap">
          <div className="final-card">
            <h2>Jadi coffee shop pertama yang pakai SOSMED AI.</h2>
            <p>
              SOSMED AI sedang dalam tahap akhir. Asisten WhatsApp AI yang akan
              mengubah cara kafe dan restoran Indonesia terima order dan jaga
              pelanggan.
            </p>
            <div className="final-cta">
              <button className="btn btn-soon" disabled>
                <span className="dot"></span> Segera Hadir
              </button>
              <a
                className="btn btn-ig"
                href="https://www.instagram.com/sosmed.io"
                target="_blank"
                rel="noopener"
              >
                Ikuti Kami di Instagram
              </a>
            </div>
            <p className="final-note">
              Akses awal terbatas · Peluncuran segera diumumkan · Tanpa spam
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
