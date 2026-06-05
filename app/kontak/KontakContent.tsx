"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Pre-filled email draft — ported verbatim from the prototype (encoding intact).
const EMAIL_HREF =
  "mailto:halo@sosmed.io?subject=Halo%20Sosmed%20AI&body=Halo%20tim%20Sosmed%20AI%2C%0A%0A(tulis%20pesan%20kamu%20di%20sini)%0A%0ANama%3A%20%0ANama%20bisnis%20(kalau%20ada)%3A%20%0A%0ATerima%20kasih.";
const DISCORD_URL = "https://discord.gg/EEcxkJGHg";

/* ---- social brand icons (verbatim from prototype) ---- */
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sosmed.io",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@sosmed.io",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.5c-1.3.1-2.5-.3-3.6-1v6.3c0 3.3-2.4 5.3-5.2 5.3a5 5 0 0 1-5-5.1c0-3 2.4-5 5.4-4.9v2.6c-.4-.1-.8-.2-1.2-.1-1.2.1-2 .9-2 2.3a2.3 2.3 0 0 0 4.6.2V3h3.5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sosmed-ai",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.6 2.5 4.6 5.8V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/sosmed_io",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.2 2h3.3l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.2 22H1.9l7.7-8.8L1.3 2H8l4.7 6.2L18.2 2zm-1.2 18h1.8L7.1 3.9H5.2L17 20z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: DISCORD_URL,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5a18 18 0 0 1 4.3 1.3 16.7 16.7 0 0 0-14.9 0A18 18 0 0 1 8.9 3.5L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.7 8.9-.1 13.3.3 17.6a19.9 19.9 0 0 0 6 3l.8-1.1c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l.8 1.1a19.9 19.9 0 0 0 6-3c.5-5-.7-9.4-3.1-13.2ZM8.2 15c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Zm7.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Z" />
      </svg>
    ),
  },
];

const QUICK = [
  { href: "/bantuan", label: "Pusat Bantuan", primary: true },
  { href: "/harga", label: "Harga & Paket", primary: false },
  { href: "/partner", label: "Jadi Partner", primary: false },
];

export default function KontakContent() {
  return (
    <>
      <Nav />
      <main className="kontak-page">
        {/* HERO */}
        <section className="k-hero">
          <span className="k-eyebrow">Kontak</span>
          <h1>Mari ngobrol.</h1>
          <p>
            Punya pertanyaan, ide kerja sama, atau sekadar mau kenalan? Kami senang
            dengar dari kamu.
          </p>
        </section>

        <div className="wrap">
          {/* CONTACT METHODS — one blueprint container */}
          <div className="k-methods">
            {/* Email */}
            <a className="k-method live" href={EMAIL_HREF}>
              <div className="k-method-art">
                <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
                  <circle cx="30" cy="30" r="18" stroke="#C9C3D6" strokeDasharray="3 3" />
                  <rect x="18" y="23" width="24" height="16" rx="2" />
                  <path d="m18 25 12 8 12-8" />
                </svg>
                <span className="k-plus">+</span>
              </div>
              <h3>Email</h3>
              <p>Cara paling cepat buat hubungi kami. Kami balas secepatnya.</p>
              <span className="k-val">halo@sosmed.io</span>
            </a>

            {/* Discord */}
            <a
              className="k-method live"
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="k-method-art">
                <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
                  <rect x="13" y="13" width="34" height="34" rx="9" stroke="#C9C3D6" strokeDasharray="3 3" />
                  <path d="M37 22a16 16 0 0 0-14 0M23 38a16 16 0 0 0 14 0M22 25c-1.5 4-1.5 7 0 11M38 25c1.5 4 1.5 7 0 11" strokeLinecap="round" />
                  <circle cx="25" cy="31" r="2" />
                  <circle cx="35" cy="31" r="2" />
                </svg>
                <span className="k-plus">+</span>
              </div>
              <h3>Discord</h3>
              <p>Gabung komunitas — tanya, sharing, dan ngobrol bareng owner lain.</p>
              <span className="k-val">Gabung server →</span>
            </a>

            {/* WhatsApp — placeholder (no link) */}
            <div className="k-method soon">
              <div className="k-method-art">
                <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
                  <circle cx="30" cy="30" r="18" stroke="#C9C3D6" strokeDasharray="3 3" />
                  <path d="M38 33c0 4-4 7-8 7a13 13 0 0 1-3-.7L21 41l1.6-5a13 13 0 0 1-.6-3c0-4 3-8 8-8a8 8 0 0 1 8 8Z" />
                </svg>
                <span className="k-plus">+</span>
              </div>
              <h3>
                WhatsApp <span className="k-soon-tag">Segera</span>
              </h3>
              <p>Chat AI-native kami lagi disiapkan — tunggu ya, ini bakal jadi yang utama.</p>
              <span className="k-val">Segera hadir</span>
            </div>
          </div>

          {/* SOCIALS */}
          <section className="k-section">
            <div className="k-section-head">
              <h2>Ikuti kami</h2>
              <p>Update produk, tips F&amp;B, dan info peluncuran ada di sini.</p>
            </div>
            <div className="k-socials">
              {SOCIALS.map((s) => (
                <a
                  className="k-social"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  key={s.label}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </section>

          {/* QUICK LINKS — dark gradient */}
          <section className="k-quick">
            <h2>Mungkin yang kamu cari</h2>
            <p>Jawaban cepat tanpa perlu menghubungi kami.</p>
            <div className="k-quick-row">
              {QUICK.map((q) => (
                <Link
                  className={`k-ql${q.primary ? " primary" : ""}`}
                  href={q.href}
                  key={q.href}
                >
                  {q.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
