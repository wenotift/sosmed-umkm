"use client";

import Link from "next/link";
import { useEffect } from "react";

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
            Bukan bot template yang menunggu kata kunci. SOSMED AI memahami
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
                Pelanggan numpuk di kasir, order chat kelewat. SOSMED AI bikin
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
              <div className="phone">
                <div className="notch"></div>
                <div className="demo-tag">
                  <span className="rec"></span> DEMO
                </div>
                <div className="screen">
                  <div className="wa-bar">
                    <span className="wa-back">‹</span>
                    <div className="wa-av">KS</div>
                    <div className="wa-meta">
                      <div className="wa-name">Kopi Senja</div>
                      <div className="wa-sub">online · dibalas otomatis</div>
                    </div>
                    <div className="wa-ico">📞 ⋮</div>
                  </div>
                  <div className="wa-chat" data-demo="1">
                    <div className="b out">
                      2 es kopi susu less sugar yg gede, 1 croissant ya kak
                      <span className="t">21:14 ✓✓</span>
                    </div>
                    <div className="b in">
                      Siap kak! Ini rincian pesanannya 👇
                      <span className="t">21:14</span>
                    </div>
                    <div className="b bill">
                      <div className="bh">🧾 Pesanan</div>
                      <div className="bl">
                        <span>2× Es Kopi Susu (L)</span>
                        <span>36.000</span>
                      </div>
                      <div className="bl">
                        <span>1× Butter Croissant</span>
                        <span>22.000</span>
                      </div>
                      <div className="bt">
                        <span>Total</span>
                        <b>Rp 58.000</b>
                      </div>
                    </div>
                    <div className="b in">
                      Diambil atau diantar? Kalau sudah pas, bayar via QRIS di
                      bawah lalu kirim bukti ya 👇<span className="t">21:15</span>
                    </div>
                    <div className="b qris">
                      <div className="qbox"></div>
                      <div className="qcap">
                        QRIS · Kopi Senja
                        <br />
                        <b>Rp 58.000</b>
                      </div>
                    </div>
                    <div className="b out">
                      udah transfer kak 🙏<span className="t">21:16 ✓✓</span>
                    </div>
                    <div className="b in">
                      Pembayaran terkonfirmasi ✅ Order #1042 disiapin ☕
                      <span className="t">21:16</span>
                    </div>
                  </div>
                  <div className="wa-input">
                    <div className="field">Ketik pesan…</div>
                    <div className="send">➤</div>
                  </div>
                </div>
              </div>
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
              <div className="phone">
                <div className="notch"></div>
                <div className="screen">
                  <div className="menu-screen">
                    <div className="menu-hero">
                      <div className="nm">Kopi Senja</div>
                      <div className="ds">☕ Coffee Shop · Buka sampai 23:00</div>
                    </div>
                    <div className="menu-cat">Kopi</div>
                    <div className="mi">
                      <div className="ph">☕</div>
                      <div className="info">
                        <div className="nm">Es Kopi Susu Gula Aren</div>
                        <div className="dc">Best seller</div>
                      </div>
                      <div className="pr">18rb</div>
                      <div className="add">+</div>
                    </div>
                    <div className="mi">
                      <div className="ph">☕</div>
                      <div className="info">
                        <div className="nm">Americano</div>
                        <div className="dc">Panas / Es</div>
                      </div>
                      <div className="pr">15rb</div>
                      <div className="add">+</div>
                    </div>
                    <div className="mi">
                      <div className="ph">🍵</div>
                      <div className="info">
                        <div className="nm">Matcha Latte</div>
                        <div className="dc">Premium grade</div>
                      </div>
                      <div className="pr">25rb</div>
                      <div className="add">+</div>
                    </div>
                    <div className="menu-cat">Pastry</div>
                    <div className="mi">
                      <div className="ph">🥐</div>
                      <div className="info">
                        <div className="nm">Butter Croissant</div>
                        <div className="dc">Fresh daily</div>
                      </div>
                      <div className="pr">22rb</div>
                      <div className="add">+</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="qr-float pv pd3">
                <div className="qr"></div>
                <div className="cap">Scan di meja</div>
              </div>
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
              <div className="phone">
                <div className="notch"></div>
                <div className="demo-tag">
                  <span className="rec"></span> DEMO
                </div>
                <div className="screen">
                  <div className="wa-bar">
                    <span className="wa-back">‹</span>
                    <div className="wa-av">KS</div>
                    <div className="wa-meta">
                      <div className="wa-name">Kopi Senja</div>
                      <div className="wa-sub">online</div>
                    </div>
                    <div className="wa-ico">📞 ⋮</div>
                  </div>
                  <div className="wa-chat" data-demo="2">
                    <div className="b in">
                      Mau daftar member kak? Tiap pembayaran dapat poin, bisa
                      ditukar minuman gratis ☕ Ketik nama aja 🙂
                      <span className="t">10:02</span>
                    </div>
                    <div className="b out">
                      Dimas<span className="t">10:02 ✓✓</span>
                    </div>
                    <div className="b pts">
                      ✅ Sip Dimas, terdaftar! Pembayaran tadi dikonfirmasi — +40
                      poin masuk.
                    </div>
                    <div className="b out">
                      cek poin dong<span className="t">10:05 ✓✓</span>
                    </div>
                    <div className="b in">
                      Saldo poin kamu 284 🎉 16 poin lagi buat voucher Rp 5.000!
                      <span className="t">10:05</span>
                    </div>
                  </div>
                  <div className="wa-input">
                    <div className="field">Ketik pesan…</div>
                    <div className="send">➤</div>
                  </div>
                </div>
              </div>
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
              <div className="phone">
                <div className="notch"></div>
                <div className="demo-tag">
                  <span className="rec"></span> SISI OWNER
                </div>
                <div className="screen">
                  <div className="wa-bar">
                    <span className="wa-back">‹</span>
                    <div className="wa-av">AI</div>
                    <div className="wa-meta">
                      <div className="wa-name">SOSMED AI · Asisten</div>
                      <div className="wa-sub">kelola bisnis lewat chat</div>
                    </div>
                    <div className="wa-ico">📞 ⋮</div>
                  </div>
                  <div className="wa-chat" data-demo="3">
                    <div className="b out">
                      laporan hari ini dong<span className="t">09:13 ✓✓</span>
                    </div>
                    <div className="rep" data-rep="">
                      <div className="h">📊 Laporan Hari Ini</div>
                      <div className="ln">
                        <span>Order</span>
                        <b>48</b>
                      </div>
                      <div className="ln">
                        <span>Penjualan</span>
                        <b>Rp 1,4 jt</b>
                      </div>
                      <div className="ln">
                        <span>Best seller</span>
                        <b>Es Kopi Susu</b>
                      </div>
                      <div className="ln" style={{ border: "none" }}>
                        <span>Member baru</span>
                        <b>6</b>
                      </div>
                    </div>
                    <div className="b out">
                      rekap bulan ini, PDF ya<span className="t">09:14 ✓✓</span>
                    </div>
                    <div className="b file">
                      <span className="fic">📄</span>
                      <div className="finfo">
                        <b>Laporan-Mei-2026.pdf</b>
                        <span>Rekap bulanan · 248 KB</span>
                      </div>
                    </div>
                  </div>
                  <div className="wa-input">
                    <div className="field">Ketik pesan…</div>
                    <div className="send">➤</div>
                  </div>
                </div>
              </div>
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
