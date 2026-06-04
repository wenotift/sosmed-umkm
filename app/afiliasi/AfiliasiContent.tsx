"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { HERO_CHART } from "./heroChart";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function waValid(raw: string): boolean {
  let d = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (d.startsWith("8")) d = "62" + d;
  return /^628\d{7,11}$/.test(d);
}

/* ---- blueprint composite art (dashed construction shape + solid glyph) ---- */
const STEPS: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="14" y="14" width="36" height="36" rx="8" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M32 24v16M24 32h16" />
      </svg>
    ),
    h: "Daftar gratis",
    p: "Isi form di bawah. Begitu disetujui, kamu dapat link referral unik kamu sendiri.",
  },
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="32" cy="32" r="20" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M26 38c4-2 8-6 10-12M24 30l-4 4 4 4M40 30l4 4-4 4" />
      </svg>
    ),
    h: "Bagikan link",
    p: "Sebar ke WhatsApp, IG, TikTok, atau langsung ke pemilik usaha yang kamu kenal.",
  },
  {
    art: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="14" y="14" width="36" height="36" transform="rotate(12 32 32)" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M32 22v20M26 26h9a4 4 0 0 1 0 8h-6a4 4 0 0 0 0 8h9" />
      </svg>
    ),
    h: "Dapat komisi",
    p: "Setiap usaha yang berlangganan lewat link kamu = komisi masuk. Sesimpel itu.",
  },
];

const PERKS: { art: React.ReactNode; h: string; p: string }[] = [
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="30" cy="30" r="18" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M30 20v20M25 24h7a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h7" />
      </svg>
    ),
    h: "Komisi menarik",
    p: "Dibayar untuk tiap usaha yang kamu bawa. Detail komisi & skema dijelaskan saat kamu daftar.",
  },
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="13" y="13" width="34" height="34" rx="9" stroke="#C9C3D6" strokeDasharray="3 3" />
        <circle cx="30" cy="26" r="6" />
        <path d="M19 44a11 11 0 0 1 22 0" />
      </svg>
    ),
    h: "Terbuka untuk semua",
    p: "Mahasiswa, freelancer, content creator, sales — latar belakang apa pun, di mana pun. Gak ada syarat ribet.",
  },
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="30" cy="30" r="18" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M22 30h16M30 22v16" strokeLinecap="round" />
        <rect x="24" y="24" width="12" height="12" rx="2" />
      </svg>
    ),
    h: "Materi promosi siap pakai",
    p: "Kami kasih banner, caption, & bahan yang tinggal kamu sebar. Gak perlu bikin dari nol.",
  },
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="13" y="13" width="34" height="34" transform="rotate(15 30 30)" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M20 36 28 28l5 5 8-9M37 24h5v5" />
      </svg>
    ),
    h: "Lacak performa",
    p: "Dashboard sederhana buat lihat berapa klik, signup, & komisi kamu — transparan.",
  },
];

const WHO = [
  "📱 Content creator",
  "🎓 Mahasiswa",
  "💼 Freelancer",
  "🤝 Sales & reseller",
  "☕ Pemilik F&B",
  "🌍 Siapa pun, di mana pun",
];

type Fields = { name: string; email: string; whatsapp: string; promote: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "loading" | "success";

export default function AfiliasiContent() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", whatsapp: "", promote: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const set = (k: keyof Fields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (formError) setFormError(null);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setFormError(null);
    const e: Errors = {};
    if (!fields.name.trim()) e.name = "Nama wajib diisi.";
    if (!fields.email.trim()) e.email = "Email wajib diisi.";
    else if (!EMAIL_RE.test(fields.email.trim())) e.email = "Format email tidak valid.";
    if (fields.whatsapp.trim() && !waValid(fields.whatsapp)) e.whatsapp = "Nomor WhatsApp tidak valid.";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/afiliasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          whatsapp: fields.whatsapp.trim(),
          promote: fields.promote.trim(),
        }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 409) {
        setStatus("idle");
        setErrors((p) => ({ ...p, email: "Email ini sudah terdaftar." }));
        return;
      }
      if (res.status === 400) {
        const data = await res.json().catch(() => null);
        if (data?.fields) {
          setStatus("idle");
          setErrors((p) => ({ ...p, ...data.fields }));
          return;
        }
      }
      setStatus("idle");
      setFormError("Gagal mengirim. Coba lagi sebentar lagi ya.");
    } catch {
      setStatus("idle");
      setFormError("Gagal terhubung. Cek koneksi kamu dan coba lagi.");
    }
  };

  return (
    <>
      <Nav />
      <main className="afiliasi-page">
        {/* HERO */}
        <section className="af-hero">
          <div
            className="af-hero-chart"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: HERO_CHART }}
          />
          <div className="af-hero-inner">
            <span className="af-eyebrow">Program Afiliasi</span>
            <h1>Promosikan Sosmed AI. Dapat komisi.</h1>
            <p>
              Bantu UMKM F&amp;B Indonesia naik kelas — dan dibayar untuk itu. Terbuka
              untuk siapa saja, dari latar belakang apa pun, di mana pun kamu berada.
            </p>
            <a className="af-cta" href="#daftar">
              Daftar jadi affiliate →
            </a>
            <div className="af-hero-pills">
              <span className="af-pill">✦ Gratis gabung</span>
              <span className="af-pill">✦ Komisi menarik</span>
              <span className="af-pill">✦ Terbuka untuk semua</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="af-intro">
          <div className="wrap">
            <h2>Punya audiens? Atau cuma kenal banyak pemilik usaha?</h2>
            <p>
              Gak perlu jadi influencer atau ahli marketing. Kalau kamu kenal pemilik kafe,
              resto, atau warung — atau punya followers yang mungkin tertarik — kamu bisa
              mulai dapat komisi dengan merekomendasikan Sosmed AI.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="af-section">
          <div className="wrap">
            <div className="af-head">
              <div className="af-eyebrow-2">Cara Kerja</div>
              <h2>Tiga langkah, mulai hari ini.</h2>
            </div>
            <div className="af-steps">
              {STEPS.map((s, i) => (
                <div className="af-step" key={s.h}>
                  <div className="af-step-num">{i + 1}</div>
                  <div className="af-step-art">
                    {s.art}
                    <span className="af-plus">+</span>
                  </div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY JOIN */}
        <section className="af-section">
          <div className="wrap">
            <div className="af-head">
              <div className="af-eyebrow-2">Kenapa Gabung</div>
              <h2>Yang kamu dapat.</h2>
            </div>
            <div className="af-perks">
              {PERKS.map((pk) => (
                <div className="af-perk" key={pk.h}>
                  <div className="af-perk-art">
                    {pk.art}
                    <span className="af-plus">+</span>
                  </div>
                  <div className="af-perk-body">
                    <h3>{pk.h}</h3>
                    <p>{pk.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO CAN JOIN */}
        <section className="af-section af-who">
          <div className="wrap">
            <div className="af-head">
              <div className="af-eyebrow-2">Untuk Siapa</div>
              <h2>Siapa aja boleh gabung.</h2>
              <p>
                Kamu gak harus punya bisnis F&amp;B atau jadi ahli marketing. Yang penting
                kamu mau merekomendasikan.
              </p>
            </div>
            <div className="af-who-tags">
              {WHO.map((t) => (
                <span className="af-who-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* REGISTER */}
        <section className="af-register" id="daftar">
          <div className="af-wrap-narrow">
            <div className={`af-form-card${status === "success" ? " done" : ""}`}>
              {status === "success" ? (
                <div className="af-ok" role="status" aria-live="polite">
                  <div className="af-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h2>Pendaftaran terkirim! ✦</h2>
                  <p>
                    Cek inbox kamu untuk konfirmasi. Kami akan kirim detail program & link
                    referral kamu segera.
                  </p>
                </div>
              ) : (
                <form className="af-form-body" onSubmit={submit} noValidate>
                  <h2>Daftar jadi affiliate</h2>
                  <p className="af-sub">
                    Isi data di bawah. Kami review dan kirim detail program + link referral
                    kamu via email.
                  </p>

                  <div className="af-field">
                    <label htmlFor="af-name">Nama lengkap</label>
                    <input
                      id="af-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Nama kamu"
                      value={fields.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={errors.name ? "af-invalid" : undefined}
                      disabled={status === "loading"}
                    />
                    {errors.name && <span className="af-err">{errors.name}</span>}
                  </div>

                  <div className="af-field">
                    <label htmlFor="af-email">Email</label>
                    <input
                      id="af-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="email@kamu.com"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={errors.email ? "af-invalid" : undefined}
                      disabled={status === "loading"}
                    />
                    {errors.email && <span className="af-err">{errors.email}</span>}
                  </div>

                  <div className="af-field">
                    <label htmlFor="af-wa">Nomor WhatsApp</label>
                    <input
                      id="af-wa"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="08xxxxxxxxxx"
                      value={fields.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                      className={errors.whatsapp ? "af-invalid" : undefined}
                      disabled={status === "loading"}
                    />
                    {errors.whatsapp && <span className="af-err">{errors.whatsapp}</span>}
                  </div>

                  <div className="af-field">
                    <label htmlFor="af-promote">Gimana kamu rencananya promosiin?</label>
                    <textarea
                      id="af-promote"
                      placeholder="Mis. lewat Instagram (5rb followers), grup WhatsApp komunitas UMKM, atau kenal langsung pemilik kafe…"
                      value={fields.promote}
                      onChange={(e) => set("promote", e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>

                  {formError && <div className="af-formerr">{formError}</div>}

                  <button type="submit" className="af-submit" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <span className="af-spin" aria-hidden="true"></span> Mengirim...
                      </>
                    ) : (
                      "Kirim pendaftaran"
                    )}
                  </button>
                  <p className="af-form-note">
                    Dengan mendaftar, kamu setuju kami hubungi via email/WhatsApp soal
                    program afiliasi.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
