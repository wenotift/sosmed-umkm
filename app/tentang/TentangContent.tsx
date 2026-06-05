"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DOTS_TOP, DOTS_BOT } from "./heroDots";

const HERO_PROMPT = "es kopi susu 2, less sugar ya kak";
const DEMO_RAW = "es kopsu 2 less sugar ya kak";

/* ---- comparison rows ---- */
const CMP: { lbl: string; old: string; neu: string }[] = [
  { lbl: "Cara pakai", old: "Install aplikasi baru & belajar dashboard", neu: "Langsung di WhatsApp, tanpa aplikasi baru" },
  { lbl: "Terima order", old: "Dicatat manual, mudah terlewat", neu: "Tercatat otomatis dari chat pelanggan" },
  { lbl: "Kelola menu", old: "Kirim ulang foto & harga tiap ditanya", neu: "Menu digital, cukup atur sekali" },
  { lbl: "Pelanggan setia", old: "Kartu stempel fisik yang sering hilang", neu: "Sistem poin & member otomatis" },
  { lbl: "Laporan penjualan", old: "Hitung manual di akhir hari", neu: "Ringkasan penjualan otomatis" },
];

/* ---- features (6, composite dashed + white-glyph icons) ---- */
const FEATURES: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="17" stroke="#C9C3D6" strokeWidth={1.2} strokeDasharray="3 3" />
        <rect x="20" y="22" width="16" height="13" rx="3" fill="#fff" stroke="#16121F" strokeWidth={1.4} />
        <path d="M28 22v-3h-3" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" />
        <circle cx="24" cy="28" r="1.4" fill="#16121F" />
        <circle cx="32" cy="28" r="1.4" fill="#16121F" />
      </svg>
    ),
    h: "Order Otomatis",
    p: "Pelanggan pesan lewat chat, langsung tercatat rapi. Tidak ada lagi order yang terlewat saat ramai.",
  },
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none">
        <rect x="13" y="13" width="30" height="30" rx="8" stroke="#C9C3D6" strokeWidth={1.2} strokeDasharray="3 3" />
        <rect x="20" y="18" width="16" height="20" rx="2.5" fill="#fff" stroke="#16121F" strokeWidth={1.4} />
        <path d="M24 24h8M24 28h6" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
    h: "Menu Digital",
    p: "Atur menu dan harga sekali. Pelanggan selalu melihat versi terbaru tanpa Anda kirim ulang.",
  },
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="17" stroke="#C9C3D6" strokeWidth={1.2} strokeDasharray="3 3" />
        <path d="m28 19 2.6 5.3 5.9.9-4.2 4.2 1 5.8L28 34.5 22.7 37l1-5.8-4.2-4.2 5.9-.9Z" fill="#fff" stroke="#16121F" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    ),
    h: "Sistem Poin & Member",
    p: "Bangun pelanggan setia tanpa kartu fisik atau aplikasi terpisah — semua tercatat otomatis.",
  },
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none">
        <rect x="14" y="14" width="28" height="28" transform="rotate(14 28 28)" stroke="#C9C3D6" strokeWidth={1.2} strokeDasharray="3 3" />
        <rect x="17" y="18" width="22" height="20" rx="2.5" fill="#fff" stroke="#16121F" strokeWidth={1.4} />
        <path d="M22 33l4-5 4 3 5-7" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    h: "Laporan Penjualan",
    p: "Pantau penjualan, menu terlaris, dan pelanggan setia cukup lewat chat — tanpa hitung manual.",
  },
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="17" stroke="#C9C3D6" strokeWidth={1.2} strokeDasharray="3 3" />
        <rect x="21" y="17" width="14" height="22" rx="3.5" fill="#fff" stroke="#16121F" strokeWidth={1.4} />
        <path d="M26 35h4" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
    h: "Tanpa Aplikasi Baru",
    p: "Semua berjalan di WhatsApp yang sudah Anda dan pelanggan pakai setiap hari. Nol kurva belajar.",
  },
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="17" stroke="#C9C3D6" strokeWidth={1.2} strokeDasharray="3 3" />
        <path d="M28 17l9 3.5v6.5c0 6.5-4.5 9.8-9 11.5-4.5-1.7-9-5-9-11.5V20.5Z" fill="#fff" stroke="#16121F" strokeWidth={1.4} strokeLinejoin="round" />
        <path d="M24 28l3 3 5-5.5" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    h: "Aman & Sesuai UU PDP",
    p: "Data usaha dan pelanggan Anda diproses sesuai ketentuan Undang-Undang Pelindungan Data Pribadi.",
  },
];

/* ---- AI-native demo tokens ---- */
const TOKENS: { k: string; v: string }[] = [
  { k: "item:", v: "Es Kopi Susu" },
  { k: "qty:", v: "2" },
  { k: "gula:", v: "less" },
  { k: "total:", v: "Rp 36.000" },
];

const AI_CELLS: { h: string; p: string }[] = [
  { h: "Paham bahasa sehari-hari", p: '"es kopsu 2 less sugar ya kak" tetap dimengerti — tanpa pelanggan harus belajar format khusus.' },
  { h: "Bukan bot kaku", p: 'Percakapan terasa natural, bukan menu bertingkat "ketik 1, ketik 2" yang bikin pelanggan malas.' },
  { h: "Model terbaik tiap tugas", p: "Kami merutekan ke model AI terdepan sesuai kebutuhan, demi balasan yang cepat dan relevan." },
];

/* ---- how it works (3 blueprint steps, icons only) ---- */
const STEPS: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke="#C9C3D6" strokeWidth={1.1} strokeDasharray="2.5 2.5" />
        <path d="M16 14h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-4" fill="#fff" stroke="#16121F" strokeWidth={1.4} />
        <path d="M12 18h6M15 15v6" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
    h: "Daftar & Hubungkan",
    p: "Daftar dan hubungkan nomor WhatsApp bisnis Anda. Tidak perlu instal apa pun.",
  },
  {
    art: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="9" y="9" width="22" height="22" rx="6" stroke="#C9C3D6" strokeWidth={1.1} strokeDasharray="2.5 2.5" />
        <rect x="14" y="13" width="12" height="14" rx="2" fill="#fff" stroke="#16121F" strokeWidth={1.4} />
        <path d="M17 17h6M17 20h4" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
    h: "Atur Menu",
    p: "Masukkan menu dan harga. Cukup sekali — pelanggan langsung bisa pesan.",
  },
  {
    art: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke="#C9C3D6" strokeWidth={1.1} strokeDasharray="2.5 2.5" />
        <path d="M13 16h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7l-4 3v-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" fill="#fff" stroke="#16121F" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    ),
    h: "Mulai Terima Order",
    p: "Pelanggan pesan lewat chat, Sosmed AI bantu kelola order, poin, dan laporan otomatis.",
  },
];

/* ---- principles (4 blueprint cells, icons, no numerals) ---- */
const PRINCIPLES: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="9" y="9" width="22" height="22" rx="6" stroke="#C9C3D6" strokeWidth={1.1} strokeDasharray="2.5 2.5" />
        <path d="M14 24l4-8 3 5 2-3 3 6" fill="none" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    h: "Teknologi harus menyederhanakan",
    p: "Alat yang baik menghilangkan pekerjaan, bukan menambah satu sistem baru yang harus dipelajari. Kalau butuh pelatihan berhari-hari, itu bukan untuk pemilik warung.",
  },
  {
    art: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke="#C9C3D6" strokeWidth={1.1} strokeDasharray="2.5 2.5" />
        <path d="M20 13c4 4 4 10 0 14-4-4-4-10 0-14ZM13 20h14" fill="none" stroke="#16121F" strokeWidth={1.4} />
        <circle cx="20" cy="20" r="7" stroke="#16121F" strokeWidth={1.4} />
      </svg>
    ),
    h: "Temui pelaku usaha di tempat mereka",
    p: "Pemilik usaha F&B sudah hidup di WhatsApp. Kami membangun di sana — bukan memaksa mereka pindah ke aplikasi atau dashboard baru.",
  },
  {
    art: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="9" y="9" width="22" height="22" rx="6" stroke="#C9C3D6" strokeWidth={1.1} strokeDasharray="2.5 2.5" />
        <circle cx="20" cy="19" r="6" fill="#fff" stroke="#16121F" strokeWidth={1.4} />
        <path d="M20 22v5M17 27h6" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
    h: "Mulai dari masalah nyata",
    p: "Kami membangun untuk keseharian warung dan kafe — order menumpuk saat ramai, pelanggan kabur, laporan ribet — bukan untuk fitur yang sekadar terlihat keren.",
  },
  {
    art: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke="#C9C3D6" strokeWidth={1.1} strokeDasharray="2.5 2.5" />
        <path d="M20 13l6 2.5v4.5c0 4-2.7 6.3-6 7.5-3.3-1.2-6-3.5-6-7.5V15.5Z" fill="#fff" stroke="#16121F" strokeWidth={1.4} strokeLinejoin="round" />
        <path d="M17 20l2 2 4-4" stroke="#16121F" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    h: "Jujur & transparan",
    p: "Kami terbuka soal apa yang produk kami bisa dan belum bisa lakukan, bagaimana data Anda diproses, dan berapa biayanya. Tanpa janji berlebihan.",
  },
];

/* ---- FAQ (also exported shape mirrored in page.tsx JSON-LD) ---- */
const FAQ: { q: string; a: React.ReactNode }[] = [
  { q: "Apakah saya perlu menginstal aplikasi?", a: "Tidak. Sosmed AI berjalan langsung di WhatsApp yang sudah Anda pakai. Tidak ada aplikasi tambahan atau dashboard yang harus dipelajari." },
  { q: "Apakah pelanggan saya perlu aplikasi khusus?", a: "Tidak. Pelanggan cukup chat ke nomor WhatsApp usaha Anda seperti biasa." },
  { q: "Apakah Sosmed AI sudah bisa dipakai sekarang?", a: "Sosmed AI sedang dalam tahap peluncuran awal. Anda bisa bergabung ke waitlist untuk menjadi yang pertama mencoba." },
  { q: "Berapa biayanya?", a: (<>Rincian paket dan harga tersedia di halaman <Link href="/harga">Harga</Link>.</>) },
  { q: "Bagaimana dengan keamanan data?", a: (<>Data usaha dan pelanggan Anda diproses sesuai ketentuan UU PDP. Selengkapnya di <Link href="/privasi">Kebijakan Privasi</Link> kami.</>) },
];

function Chev() {
  return (
    <svg className="tg-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function TentangContent() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const rawRef = useRef<HTMLSpanElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  // Hero prompt typing loop.
  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = HERO_PROMPT;
      return;
    }
    const timers: number[] = [];
    let i = 0;
    const t = () => {
      if (i <= HERO_PROMPT.length) {
        el.textContent = HERO_PROMPT.slice(0, i);
        i++;
        timers.push(window.setTimeout(t, 55));
      } else {
        timers.push(window.setTimeout(() => { i = 0; t(); }, 3400));
      }
    };
    timers.push(window.setTimeout(t, 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  // AI-native demo: type raw → reveal tokens, loop, triggered on scroll-in.
  useEffect(() => {
    const demo = demoRef.current;
    const raw = rawRef.current;
    if (!demo || !raw) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      raw.textContent = DEMO_RAW;
      demo.classList.add("go");
      return;
    }
    const timers: number[] = [];
    let started = false;
    const cycle = () => {
      raw.textContent = "";
      demo.classList.remove("go");
      let j = 0;
      const t = () => {
        if (j <= DEMO_RAW.length) {
          raw.textContent = DEMO_RAW.slice(0, j);
          j++;
          timers.push(window.setTimeout(t, 55));
        } else {
          demo.classList.add("go");
          timers.push(window.setTimeout(cycle, 3600));
        }
      };
      t();
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            cycle();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(demo);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <Nav />
      <main className="tentang-page">
        {/* HERO */}
        <section className="tg-hero">
          <div className="tg-hero-chart" aria-hidden="true">
            <div className="tg-dots top" dangerouslySetInnerHTML={{ __html: DOTS_TOP }} />
            <div className="tg-ai-card">
              <div className="tg-ai-card-inner">
                <div className="tg-ai-card-head">
                  <span className="tg-ai-card-ic">
                    <svg viewBox="0 0 24 24" fill="#16121F">
                      <circle cx="6" cy="7" r="1.6" />
                      <circle cx="11" cy="7" r="1.6" />
                      <circle cx="8.5" cy="11" r="1.6" />
                      <circle cx="6" cy="15" r="1.6" />
                      <circle cx="11" cy="15" r="1.6" />
                    </svg>
                  </span>
                  <h4>Pahami pesan pelanggan</h4>
                </div>
                <div className="tg-divider"></div>
                <div className="tg-prompt">
                  <span ref={typedRef}></span>
                  <span className="tg-caret"></span>
                </div>
              </div>
            </div>
            <div className="tg-ai-card result">
              <div className="tg-ai-card-inner">
                <div className="tg-ai-card-head">
                  <span className="tg-ai-card-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <h4>Order tercatat otomatis</h4>
                </div>
              </div>
            </div>
            <div className="tg-dots bot" dangerouslySetInnerHTML={{ __html: DOTS_BOT }} />
          </div>
          <div className="tg-hero-inner">
            <span className="tg-eyebrow">Tentang Sosmed AI</span>
            <h1>Operating system bisnis untuk UMKM F&amp;B, langsung di WhatsApp.</h1>
            <p>
              Pemilik warung dan kafe di Indonesia sudah jago pakai WhatsApp. Menurut kami,
              itu sudah cukup — maka kami membangun asisten bisnis berbasis AI yang bekerja di
              tempat yang sudah mereka kuasai.
            </p>
            <div className="tg-cta-row">
              <Link className="tg-cta tg-cta-primary" href="/daftar">Gabung Waitlist</Link>
              <Link className="tg-cta tg-cta-ghost" href="/produk">Lihat Produk</Link>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="tg-intro">
          <div className="wrap">
            <p>
              Pemilik warung dan kafe sudah menjalankan bisnis lewat WhatsApp — tapi
              kebanyakan tools memaksa mereka belajar dashboard rumit dan instal aplikasi baru.{" "}
              <b>Sosmed AI menghapus semua itu:</b> asisten bisnis berbasis AI yang bekerja
              langsung di WhatsApp.
            </p>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="tg-section">
          <div className="wrap">
            <div className="tg-head">
              <div className="tg-eyebrow-2">Kenapa Sosmed AI</div>
              <h2>Cara baru yang terasa familiar</h2>
              <p>
                Kebanyakan tools memaksa Anda belajar sistem baru. Sosmed AI bekerja di tempat
                yang sudah Anda dan pelanggan kuasai.
              </p>
            </div>
            <div className="tg-cmp">
              <div className="tg-cmp-row tg-cmp-head">
                <div className="tg-lbl"></div>
                <div className="tg-old">Cara Biasa</div>
                <div className="tg-new">Sosmed AI</div>
              </div>
              {CMP.map((r) => (
                <div className="tg-cmp-row" key={r.lbl}>
                  <div className="tg-lbl">{r.lbl}</div>
                  <div className="tg-old">{r.old}</div>
                  <div className="tg-new">{r.neu}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="tg-section alt">
          <div className="wrap">
            <div className="tg-head">
              <div className="tg-eyebrow-2">Fitur</div>
              <h2>Yang kami bangun</h2>
              <p>Semua yang Anda butuhkan untuk mengelola usaha, di satu chat.</p>
            </div>
            <div className="tg-bp c3">
              {FEATURES.map((f) => (
                <div className="tg-cell" key={f.h}>
                  <div className="tg-cell-art">
                    {f.art}
                    <span className="tg-plus">+</span>
                  </div>
                  <h3>{f.h}</h3>
                  <p>{f.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI-NATIVE */}
        <section className="tg-ai">
          <div className="wrap">
            <div className="tg-ai-row">
              <div className="tg-ai-head">
                <div className="tg-eyebrow-2">AI-native</div>
                <h2>Ditenagai AI yang mengerti bahasa pelanggan Anda</h2>
                <p>
                  Pelanggan tidak mengetik perintah kaku. Mereka chat seperti biasa — lengkap
                  dengan singkatan, typo, dan gaya ngobrol khas WhatsApp. Sosmed AI dibangun
                  untuk memahami itu.
                </p>
              </div>
              <div className="tg-ai-demo" ref={demoRef} aria-hidden="true">
                <div className="tg-ai-demo-in">
                  <div className="tg-raw">
                    <span ref={rawRef}></span>
                    <span className="tg-caret2"></span>
                  </div>
                  <div className="tg-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                  <div className="tg-tokens">
                    {TOKENS.map((t) => (
                      <span className="tg-tok" key={t.k}>
                        <span className="k">{t.k}</span> <span className="v">{t.v}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="tg-ai-grid">
              {AI_CELLS.map((c) => (
                <div className="tg-ai-cell" key={c.h}>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="tg-section alt">
          <div className="wrap">
            <div className="tg-head">
              <div className="tg-eyebrow-2">Cara kerja</div>
              <h2>Mulai dalam 3 langkah</h2>
              <p>Semudah chatting di WhatsApp.</p>
            </div>
            <div className="tg-steps">
              {STEPS.map((s) => (
                <div className="tg-step" key={s.h}>
                  <div className="tg-step-top">
                    <span className="tg-step-ic">{s.art}</span>
                  </div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="tg-section">
          <div className="wrap">
            <div className="tg-head">
              <div className="tg-eyebrow-2">Prinsip kami</div>
              <h2>Apa yang kami percaya</h2>
              <p>Prinsip sederhana yang memandu cara kami membangun Sosmed AI.</p>
            </div>
            <div className="tg-bp c2">
              {PRINCIPLES.map((pr) => (
                <div className="tg-cell" key={pr.h}>
                  <div className="tg-step-top">
                    <span className="tg-step-ic">{pr.art}</span>
                  </div>
                  <h3>{pr.h}</h3>
                  <p>{pr.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="tg-section alt">
          <div className="wrap">
            <div className="tg-head">
              <div className="tg-eyebrow-2">FAQ</div>
              <h2>Pertanyaan umum</h2>
            </div>
            <div className="tg-faq">
              {FAQ.map((item) => (
                <details className="tg-qa" key={item.q}>
                  <summary>
                    {item.q}
                    <Chev />
                  </summary>
                  <div className="tg-ans">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <div className="wrap">
          <section className="tg-closing">
            <h2>Siap mencoba Sosmed AI?</h2>
            <p>Gabung ke waitlist dan jadi yang pertama mengelola usaha Anda cukup dari WhatsApp.</p>
            <Link className="tg-closing-btn" href="/daftar">Gabung Waitlist</Link>
            <span className="tg-note">Sedang dalam tahap peluncuran awal.</span>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
