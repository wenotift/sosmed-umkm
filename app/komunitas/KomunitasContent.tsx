"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { HERO_CHART } from "./heroChart";

const DISCORD_URL = "https://discord.com/invite/EEcxkJGHg";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5a18 18 0 0 1 4.3 1.3 16.7 16.7 0 0 0-14.9 0A18 18 0 0 1 8.9 3.5L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.7 8.9-.1 13.3.3 17.6a19.9 19.9 0 0 0 6 3l.8-1.1c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l.8 1.1a19.9 19.9 0 0 0 6-3c.5-5-.7-9.4-3.1-13.2ZM8.2 15c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Zm7.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Z" />
    </svg>
  );
}

/* ---- blueprint value cards (dashed construction shape + solid glyph) ---- */
const VALS: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="36" cy="36" r="22" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M44 30a8 8 0 1 1-8-8M30 42h12M30 48h8" />
      </svg>
    ),
    h: "Tips dari sesama owner",
    p: "Belajar dari pemilik kafe & resto lain — apa yang works, apa yang nggak, langsung dari lapangan.",
  },
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="16" y="16" width="40" height="40" rx="10" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M26 32h20M26 40h14M24 50l-4 4V26a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4Z" />
      </svg>
    ),
    h: "Support langsung",
    p: "Stuck pakai fitur? Tanya di komunitas — tim kami & member lain bantu jawab cepat.",
  },
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="36" cy="36" r="22" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="m36 24 4 8 9 1-6.5 6 1.5 9-8-4.5-8 4.5 1.5-9L23 33l9-1Z" />
      </svg>
    ),
    h: "Akses fitur lebih awal",
    p: "Member komunitas jadi yang pertama nyobain fitur baru & kasih masukan sebelum rilis.",
  },
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="16" y="16" width="40" height="40" transform="rotate(15 36 36)" stroke="#C9C3D6" strokeDasharray="3 3" />
        <circle cx="27" cy="30" r="6" />
        <circle cx="45" cy="30" r="6" />
        <path d="M17 50a10 10 0 0 1 20 0M35 50a10 10 0 0 1 20 0" />
      </svg>
    ),
    h: "Jaringan F&B Indonesia",
    p: "Kenalan sama owner-owner se-Indonesia. Kolaborasi, sharing supplier, sampai cari partner.",
  },
];

/* ---- "Segera hadir" event cards (accent line icons) ---- */
const EVENTS: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 20h28a4 4 0 0 1 4 4v4a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8v-4a4 4 0 0 1 4-4Z" />
        <path d="M46 24h3a4 4 0 0 1 0 8h-3M22 10v4M28 8v6M34 10v4M16 44h24" />
      </svg>
    ),
    h: "Meetup & Ngopi Bareng",
    p: "Kumpul offline sesama owner F&B di kotamu, tukar cerita sambil ngopi.",
  },
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="12" width="36" height="28" rx="3" />
        <path d="M20 46h16M28 40v6M18 22l6 4-6 4M30 30h8" />
      </svg>
    ),
    h: "Workshop AI untuk F&B",
    p: "Sesi belajar online — cara maksimalin AI buat order, menu, & loyalty.",
  },
  {
    art: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 10v8M28 38v8M10 28h8M38 28h8M16 16l5 5M40 40l-5-5M40 16l-5 5M16 40l5-5" />
        <circle cx="28" cy="28" r="8" />
      </svg>
    ),
    h: "Showcase Member",
    p: "Cerita sukses owner yang naik kelas pakai Sosmed AI, buat inspirasi bareng.",
  },
];

export default function KomunitasContent() {
  return (
    <>
      <Nav />
      <main className="komunitas-page">
        {/* HERO */}
        <section className="km-hero">
          <div
            className="km-hero-chart"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: HERO_CHART }}
          />
          <div className="km-hero-inner">
            <span className="km-eyebrow">Komunitas Sosmed AI</span>
            <h1>Tempat pemilik UMKM F&amp;B saling bantu naik kelas.</h1>
            <p>
              Gabung komunitas pemilik kafe, resto, dan warung yang lagi bangun bisnisnya
              bareng AI. Tukar tips, tanya-tanya, dan jadi yang pertama tahu fitur baru.
            </p>
            <div className="km-cta-row">
              <a
                className="km-cta km-cta-primary"
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiscordIcon /> Gabung Discord
              </a>
              <a className="km-cta km-cta-ghost" href="#what">
                Apa yang kamu dapat
              </a>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="km-intro">
          <div className="wrap">
            <h2>Bangun bisnis F&amp;B itu lebih gampang kalau gak sendirian.</h2>
            <p>
              Komunitas Sosmed AI baru mulai — dan itu justru waktu terbaik buat gabung.
              Jadi anggota awal, bantu bentuk arahnya, dan tumbuh bareng kami dari hari
              pertama.
            </p>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="km-section" id="what">
          <div className="wrap">
            <div className="km-head">
              <div className="km-eyebrow-2">Yang Kamu Dapat</div>
              <h2>Kenapa gabung komunitas.</h2>
            </div>
            <div className="km-vals">
              {VALS.map((v) => (
                <div className="km-val" key={v.h}>
                  <div className="km-val-art">
                    {v.art}
                    <span className="km-plus">+</span>
                  </div>
                  <div className="km-val-body">
                    <h3>{v.h}</h3>
                    <p>{v.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS — coming soon */}
        <section className="km-section km-events">
          <div className="wrap">
            <div className="km-head">
              <div className="km-eyebrow-2">Segera Hadir</div>
              <h2>Yang lagi kami siapkan.</h2>
            </div>
            <div className="km-ev-grid">
              {EVENTS.map((e) => (
                <div className="km-ev" key={e.h}>
                  <div className="km-ev-art">{e.art}</div>
                  <h3>{e.h}</h3>
                  <p>{e.p}</p>
                  <span className="km-tag">Segera hadir</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCORD JOIN */}
        <div className="wrap">
          <section className="km-join" id="join">
            <h2>Komunitasnya baru mulai. Jadi yang pertama.</h2>
            <p>
              Gabung Discord kami sekarang — masih kecil, masih hangat, dan kamu bisa ikut
              bentuk arahnya dari awal.
            </p>
            <a
              className="km-join-btn"
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon /> Gabung Discord
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
