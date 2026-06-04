"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---- blueprint art (dashed construction shape + solid glyph), per item ---- */
const STATS: { art: React.ReactNode; n: string; l: string }[] = [
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="36" cy="36" r="22" stroke="#C9C3D6" strokeDasharray="3 3" />
        <rect x="26" y="28" width="20" height="16" rx="3" />
        <path d="M36 28v-5h-4M22 36h-2M52 36h-2M42 34v3M30 34v3" />
      </svg>
    ),
    n: "AI-Native",
    l: "Dibangun di atas AI, bukan ditempel",
  },
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="16" y="16" width="40" height="40" rx="10" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M36 24a12 12 0 0 0-10.5 17.8L23 49l7.4-2.4A12 12 0 1 0 36 24Z" />
      </svg>
    ),
    n: "WhatsApp-First",
    l: "Di aplikasi yang dipakai tiap hari",
  },
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="36" cy="36" r="22" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M30 24c-4 2-7 6-7 11a13 13 0 1 0 13-13c-2.5 0-3 1-3 3v6a3 3 0 1 1-3-3" />
      </svg>
    ),
    n: "100% F&B",
    l: "Fokus ke kafe & resto Indonesia",
  },
];

const VALUES: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M30 34a9 9 0 0 1 16-5 9 9 0 0 1 16 5c0 9-16 19-16 19S30 43 30 34Z" stroke="#C9C3D6" strokeDasharray="3 3" />
        <rect x="30" y="40" width="34" height="34" transform="rotate(45 47 57)" />
      </svg>
    ),
    h: "Bangun dengan hati.",
    p: "Bikin produk yang bukan cuma jalan, tapi terasa dirancang dengan teliti untuk orang yang pakai.",
  },
  {
    art: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M48 44 30 74h36L48 44Z" stroke="#C9C3D6" strokeDasharray="3 3" />
        <circle cx="48" cy="40" r="18" />
      </svg>
    ),
    h: "Konteks, bukan kontrol.",
    p: "Tiap orang bisa ambil keputusan dan gerak cepat tanpa hierarki kaku. Kasih konteks, lalu percaya.",
  },
  {
    art: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M48 24 56 44 76 48 56 52 48 72 40 52 20 48 40 44Z" stroke="#C9C3D6" strokeDasharray="3 3" />
        <circle cx="48" cy="48" r="17" />
      </svg>
    ),
    h: "Tantang ide, bukan orang.",
    p: "Fokus selalu ke menantang ide terbaik — bukan ke individu di baliknya. Debat sehat bikin produk lebih bagus.",
  },
  {
    art: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x="32" y="32" width="32" height="32" transform="rotate(20 48 48)" stroke="#C9C3D6" strokeDasharray="3 3" />
        <rect x="32" y="32" width="32" height="32" transform="rotate(-12 48 48)" stroke="#C9C3D6" strokeDasharray="3 3" />
        <rect x="34" y="34" width="28" height="28" />
      </svg>
    ),
    h: "Pikir besar, gerak cepat.",
    p: "Dorong ide berani yang melampaui batas — lalu pecah jadi langkah kecil dan kirim cepat. Ambisi ketemu eksekusi.",
  },
];

const DEPTS: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="32" cy="32" r="20" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M40 22 52 32 40 42M24 22 12 32 24 42" />
      </svg>
    ),
    h: "Engineering",
    p: "Bangun platform AI WhatsApp yang dipakai ribuan UMKM.",
  },
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="32" cy="32" r="20" stroke="#C9C3D6" strokeDasharray="3 3" />
        <rect x="22" y="24" width="20" height="16" rx="3" />
        <path d="M32 24v-5h-4M18 32h-2M48 32h-2M38 30v3M26 30v3" />
      </svg>
    ),
    h: "AI & Produk",
    p: "Rancang AI yang ngerti maksud pelanggan F&B Indonesia.",
  },
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="14" y="14" width="36" height="36" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M16 44 28 32l8 8 12-14" />
        <path d="M40 26h8v8" />
      </svg>
    ),
    h: "Growth & Marketing",
    p: "Bawa Sosmed AI ke jutaan kafe & resto di seluruh Indonesia.",
  },
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M48 36a16 16 0 1 1-6-14" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M22 34c0 6 10 12 10 12s10-6 10-12a6 6 0 0 0-10-3 6 6 0 0 0-10 3Z" />
      </svg>
    ),
    h: "Customer Success",
    p: "Pastikan tiap UMKM sukses pakai Sosmed AI dari hari pertama.",
  },
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="16" y="16" width="32" height="32" transform="rotate(15 32 32)" stroke="#C9C3D6" strokeDasharray="3 3" />
        <circle cx="32" cy="32" r="6" />
        <path d="M32 18v6M32 40v6M18 32h6M40 32h6M23 23l4 4M41 41l-4-4M41 23l-4 4M23 41l4-4" />
      </svg>
    ),
    h: "Operations",
    p: "Jaga roda bisnis berputar mulus seiring kami scale.",
  },
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="32" cy="32" r="20" stroke="#C9C3D6" strokeDasharray="3 3" />
        <circle cx="22" cy="26" r="6" />
        <circle cx="42" cy="26" r="6" />
        <path d="M14 44a8 8 0 0 1 16 0M34 44a8 8 0 0 1 16 0" />
      </svg>
    ),
    h: "Affiliates",
    p: "Bangun jaringan partner & reseller yang ikut menumbuhkan Sosmed AI.",
  },
];

export default function KarierContent() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!v || !EMAIL_RE.test(v)) {
      setErr("Masukkan alamat email yang valid.");
      return;
    }
    setErr(null);
    // STUB: no backend yet. Logs only; success state shows in place.
    // eslint-disable-next-line no-console
    console.log("[karir] talent-pool signup (stub):", v);
    setDone(true);
  };

  return (
    <>
      <Nav />
      <main className="karir-page">
        {/* HERO */}
        <section className="kr-hero">
          <span className="kr-eyebrow">Karier di Sosmed AI</span>
          <h1>Bantu UMKM Indonesia naik kelas.</h1>
          <p>
            Kami membangun platform AI WhatsApp untuk jutaan bisnis F&amp;B Indonesia.
            Cari tantangan berikutnya? Mari bangun bareng.
          </p>
          <a className="kr-cta" href="#talent">
            Gabung talent pool →
          </a>
        </section>

        {/* MISSION + STATS */}
        <section className="kr-mission">
          <div className="wrap">
            <h2>Misi kami: bikin teknologi kelas dunia yang kepake UMKM Indonesia.</h2>
            <p>
              Sosmed AI lahir dari satu keyakinan — pemilik kafe dan warung berhak punya
              tools sebagus brand besar, tanpa ribet. Kami AI-native, WhatsApp-first, dan
              dibangun khusus untuk pasar Indonesia.
            </p>
            <div className="kr-stats">
              {STATS.map((s) => (
                <div className="kr-stat" key={s.n}>
                  <div className="kr-stat-art">
                    {s.art}
                    <span className="kr-plus">+</span>
                  </div>
                  <div className="kr-n">{s.n}</div>
                  <div className="kr-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="kr-section">
          <div className="wrap">
            <div className="kr-head">
              <div className="kr-eyebrow-2">Nilai Kami</div>
              <h2>Cara kami bekerja.</h2>
              <p>
                Empat prinsip yang memandu setiap keputusan kami — dari fitur yang kami
                kirim sampai cara kami bersikap tiap hari.
              </p>
            </div>
            <div className="kr-values">
              {VALUES.map((v) => (
                <div className="kr-value" key={v.h}>
                  <div className="kr-value-art">
                    {v.art}
                    <span className="kr-plus">+</span>
                  </div>
                  <div className="kr-value-body">
                    <h3>{v.h}</h3>
                    <p>{v.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POSITIONS */}
        <section className="kr-section kr-positions">
          <div className="wrap">
            <div className="kr-head">
              <div className="kr-eyebrow-2">Tim</div>
              <h2>Posisi terbuka.</h2>
              <p>
                Belum ada lowongan aktif saat ini — tapi kami terus berkembang. Tim yang
                akan kami buka:
              </p>
            </div>
            <div className="kr-depts">
              {DEPTS.map((d) => (
                <div className="kr-dept" key={d.h}>
                  <div className="kr-dept-art">
                    {d.art}
                    <span className="kr-plus">+</span>
                  </div>
                  <div className="kr-dept-body">
                    <h3>{d.h}</h3>
                    <p>{d.p}</p>
                    <span className="kr-tag">Segera dibuka</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TALENT POOL */}
        <div className="wrap">
          <section className={`kr-pool${done ? " done" : ""}`} id="talent">
            <h2>Posisi yang pas, di waktu yang pas.</h2>
            <p>
              Belum nemu role kamu? Tinggalkan email — kami kabari begitu posisi yang cocok
              terbuka.
            </p>
            {done ? (
              <div className="kr-ok" role="status" aria-live="polite">
                ✓ Makasih! Kami kabari kamu begitu ada posisi yang pas.
              </div>
            ) : (
              <form className="kr-pool-form" onSubmit={submit} noValidate>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email kamu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (err) setErr(null);
                  }}
                  aria-label="Email"
                />
                <button type="submit">Beritahu saya</button>
              </form>
            )}
            {err && !done && <p className="kr-err">{err}</p>}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
