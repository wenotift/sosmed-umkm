"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DOTS_TOP, DOTS_BOT } from "./heroDots";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function waValid(raw: string): boolean {
  let d = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (d.startsWith("8")) d = "62" + d;
  return /^628\d{7,11}$/.test(d);
}
const TYPE_PROMPT = "Does this message want to order?";

function Check({ sw = 2.5 }: { sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ---- partner types (2 big blueprint cards) ---- */
const TYPES = [
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="14" y="14" width="44" height="44" rx="10" stroke="#C9C3D6" strokeDasharray="3 3" />
        <circle cx="28" cy="30" r="6" />
        <circle cx="46" cy="30" r="6" />
        <path d="M18 48a10 10 0 0 1 20 0M36 48a10 10 0 0 1 18 0" />
      </svg>
    ),
    h3: "Reseller & Agency",
    who: "Agency · reseller POS · konsultan F&B",
    p: "Jual & kelola Sosmed AI untuk klien-klien kamu. Cocok buat yang sudah punya basis pelanggan UMKM.",
    items: [
      "Margin per klien yang berlangganan",
      "Dashboard kelola banyak outlet",
      "Training & dukungan onboarding",
    ],
  },
  {
    art: (
      <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="36" cy="36" r="22" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M36 18v36M18 36h36" strokeLinecap="round" />
        <circle cx="36" cy="36" r="9" />
      </svg>
    ),
    h3: "Institusi & Jaringan",
    who: "Asosiasi · franchise · supplier · komunitas",
    p: "Tawarkan Sosmed AI ke anggota atau jaringan kamu dengan penawaran khusus. Satu pintu, banyak bisnis.",
    items: [
      "Harga spesial untuk anggota",
      "Co-marketing & materi bersama",
      "Onboarding massal yang dibantu",
    ],
  },
];

/* ---- perks (blueprint 2x2) ---- */
const PERKS = [
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="30" cy="30" r="18" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M30 20v20M25 24h7a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h7" />
      </svg>
    ),
    h3: "Margin yang menarik",
    p: "Pendapatan berulang dari tiap bisnis yang kamu bawa & kelola. Detail skema dibahas saat onboarding.",
  },
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="13" y="13" width="34" height="34" rx="9" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M22 30l5 5 11-11" />
      </svg>
    ),
    h3: "Dukungan khusus",
    p: "Partner dapat jalur support prioritas, materi training, & bantuan onboarding klien.",
  },
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x="13" y="13" width="34" height="34" transform="rotate(15 30 30)" stroke="#C9C3D6" strokeDasharray="3 3" />
        <path d="M20 36 28 28l5 5 8-9M37 24h5v5" />
      </svg>
    ),
    h3: "Co-marketing",
    p: "Kampanye bareng, logo kamu di materi kami, & exposure ke audiens Sosmed AI.",
  },
  {
    art: (
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="30" cy="30" r="18" stroke="#C9C3D6" strokeDasharray="3 3" />
        <rect x="22" y="22" width="16" height="16" rx="3" />
        <path d="M30 18v4M30 38v4M18 30h4M38 30h4" />
      </svg>
    ),
    h3: "Tools kelola skala",
    p: "Dashboard untuk pantau & kelola banyak bisnis dalam satu tempat — dibuat untuk partner.",
  },
];

const STEPS = [
  {
    num: "01",
    h3: "Ajukan",
    p: "Isi form di bawah — ceritakan jenis partner & jaringan kamu.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M12 18v-6M9 15h6" />
      </svg>
    ),
  },
  {
    num: "02",
    h3: "Ngobrol",
    p: "Tim kami hubungi buat bahas skema yang pas & cocokin ekspektasi.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    ),
  },
  {
    num: "03",
    h3: "Mulai jalan",
    p: "Onboarding, materi, & dukungan disiapkan — kamu mulai bawa bisnis masuk.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
  },
];

type Fields = { name: string; org: string; email: string; whatsapp: string; type: string; about: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "loading" | "success";

export default function PartnerContent() {
  const typedRef = useRef<HTMLSpanElement>(null);

  // Hero AI-card typing loop (prefers-reduced-motion: static).
  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = TYPE_PROMPT;
      return;
    }
    const timers: number[] = [];
    let i = 0;
    const type = () => {
      if (i <= TYPE_PROMPT.length) {
        el.textContent = TYPE_PROMPT.slice(0, i);
        i++;
        timers.push(window.setTimeout(type, 55));
      } else {
        timers.push(window.setTimeout(() => {
          i = 0;
          type();
        }, 3200));
      }
    };
    timers.push(window.setTimeout(type, 800));
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const [fields, setFields] = useState<Fields>({ name: "", org: "", email: "", whatsapp: "", type: "", about: "" });
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
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          org: fields.org.trim(),
          email: fields.email.trim(),
          whatsapp: fields.whatsapp.trim(),
          partner_type: fields.type,
          about: fields.about.trim(),
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
      <main className="partner-page">
        {/* HERO */}
        <section className="pt-hero">
          <div className="pt-chart" aria-hidden="true">
            <div className="pt-dots top" dangerouslySetInnerHTML={{ __html: DOTS_TOP }} />
            <div className="pt-card">
              <div className="pt-card-inner">
                <div className="pt-card-head">
                  <span className="pt-card-ic">
                    <svg viewBox="0 0 24 24" fill="#16121F">
                      <circle cx="6" cy="7" r="1.6" />
                      <circle cx="11" cy="7" r="1.6" />
                      <circle cx="8.5" cy="11" r="1.6" />
                      <circle cx="6" cy="15" r="1.6" />
                      <circle cx="11" cy="15" r="1.6" />
                    </svg>
                  </span>
                  <h4>Analyze customer intent</h4>
                </div>
                <div className="pt-divider"></div>
                <div className="pt-prompt">
                  <span ref={typedRef} className="pt-typed"></span>
                  <span className="pt-caret"></span>
                </div>
              </div>
            </div>
            <div className="pt-card result">
              <div className="pt-card-inner">
                <div className="pt-card-head">
                  <span className="pt-card-check">
                    <Check sw={3} />
                  </span>
                  <h4>Order processed &amp; logged</h4>
                </div>
              </div>
            </div>
            <div className="pt-dots bot" dangerouslySetInnerHTML={{ __html: DOTS_BOT }} />
          </div>
          <div className="pt-hero-inner">
            <span className="pt-eyebrow">Program Partner</span>
            <h1>
              Tumbuh bareng
              <br />
              Sosmed AI.
            </h1>
            <p>
              Buat agency, reseller, asosiasi, dan jaringan yang mau bawa AI WhatsApp ke
              banyak bisnis F&amp;B sekaligus. Satu kemitraan, dampak berlipat.
            </p>
            <a className="pt-cta" href="#daftar">
              Ajukan kemitraan →
            </a>
            <div className="pt-hero-pills">
              <span className="pt-pill">✦ Margin kompetitif</span>
              <span className="pt-pill">✦ Dukungan khusus partner</span>
              <span className="pt-pill">✦ Co-marketing</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="pt-intro">
          <div className="wrap">
            <h2>Punya jaringan bisnis F&amp;B? Mari tumbuh bareng.</h2>
            <p>
              Kalau kamu mengelola, melayani, atau menjangkau banyak pemilik usaha F&amp;B —
              agency, reseller POS, asosiasi, franchise, atau supplier — program partner kami
              dirancang buat kamu. Beda dengan affiliate yang merujuk satu per satu, partner
              membawa dampak dalam skala.
            </p>
          </div>
        </section>

        {/* PARTNER TYPES */}
        <section className="pt-section">
          <div className="wrap">
            <div className="pt-head">
              <div className="pt-eyebrow2">Jenis Partner</div>
              <h2>Dua cara bermitra.</h2>
            </div>
            <div className="pt-types">
              {TYPES.map((t) => (
                <div className="pt-type" key={t.h3}>
                  <div className="pt-type-art">
                    {t.art}
                    <span className="pt-plus">+</span>
                  </div>
                  <h3>{t.h3}</h3>
                  <div className="pt-who">{t.who}</div>
                  <p>{t.p}</p>
                  <ul>
                    {t.items.map((it) => (
                      <li key={it}>
                        <Check />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PARTNER */}
        <section className="pt-section">
          <div className="wrap">
            <div className="pt-head">
              <div className="pt-eyebrow2">Kenapa Bermitra</div>
              <h2>Yang partner dapat.</h2>
            </div>
            <div className="pt-perks">
              {PERKS.map((pk) => (
                <div className="pt-perk" key={pk.h3}>
                  <div className="pt-perk-art">
                    {pk.art}
                    <span className="pt-plus">+</span>
                  </div>
                  <div className="pt-perk-body">
                    <h3>{pk.h3}</h3>
                    <p>{pk.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="pt-section">
          <div className="wrap">
            <div className="pt-head">
              <div className="pt-eyebrow2">Cara Kerja</div>
              <h2>Mulai bermitra dalam 3 langkah.</h2>
            </div>
            <div className="pt-ck">
              <div className="pt-ck-hatch l" aria-hidden="true"></div>
              {STEPS.map((s) => (
                <div className="pt-ck-cell" key={s.num}>
                  <span className="pt-ck-num">{s.num}</span>
                  <div className="pt-ck-head">
                    <span className="pt-ck-ic">{s.icon}</span>
                    <h3>{s.h3}</h3>
                  </div>
                  <p>{s.p}</p>
                </div>
              ))}
              <div className="pt-ck-hatch r" aria-hidden="true"></div>
            </div>
          </div>
        </section>

        {/* APPLY FORM */}
        <section className="pt-apply" id="daftar">
          <div className="pt-wrap-narrow">
            <div className={`pt-form-card${status === "success" ? " done" : ""}`}>
              {status === "success" ? (
                <div className="pt-ok" role="status" aria-live="polite">
                  <div className="pt-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h2>Pengajuan terkirim! ✦</h2>
                  <p>
                    Cek inbox kamu untuk konfirmasi. Tim kami akan hubungi buat bahas langkah
                    berikutnya.
                  </p>
                </div>
              ) : (
                <form className="pt-form-body" onSubmit={submit} noValidate>
                  <h2>Ajukan kemitraan</h2>
                  <p className="pt-sub">
                    Isi data di bawah. Kami review &amp; hubungi kamu buat bahas langkah
                    berikutnya.
                  </p>
                  <div className="pt-row2">
                    <div className="pt-field">
                      <label htmlFor="p-name">Nama lengkap</label>
                      <input id="p-name" type="text" autoComplete="name" placeholder="Nama kamu" value={fields.name} onChange={(e) => set("name", e.target.value)} className={errors.name ? "pt-invalid" : undefined} disabled={status === "loading"} />
                      {errors.name && <span className="pt-err">{errors.name}</span>}
                    </div>
                    <div className="pt-field">
                      <label htmlFor="p-org">Nama bisnis / organisasi</label>
                      <input id="p-org" type="text" autoComplete="organization" placeholder="Agency / asosiasi / dll" value={fields.org} onChange={(e) => set("org", e.target.value)} disabled={status === "loading"} />
                    </div>
                  </div>
                  <div className="pt-row2">
                    <div className="pt-field">
                      <label htmlFor="p-email">Email</label>
                      <input id="p-email" type="email" inputMode="email" autoComplete="email" placeholder="email@kamu.com" value={fields.email} onChange={(e) => set("email", e.target.value)} className={errors.email ? "pt-invalid" : undefined} disabled={status === "loading"} />
                      {errors.email && <span className="pt-err">{errors.email}</span>}
                    </div>
                    <div className="pt-field">
                      <label htmlFor="p-wa">Nomor WhatsApp</label>
                      <input id="p-wa" type="tel" inputMode="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" value={fields.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className={errors.whatsapp ? "pt-invalid" : undefined} disabled={status === "loading"} />
                      {errors.whatsapp && <span className="pt-err">{errors.whatsapp}</span>}
                    </div>
                  </div>
                  <div className="pt-field">
                    <label htmlFor="p-type">Jenis partner</label>
                    <select id="p-type" value={fields.type} onChange={(e) => set("type", e.target.value)} disabled={status === "loading"}>
                      <option value="" disabled>
                        Pilih jenis kemitraan…
                      </option>
                      <option value="reseller">Reseller / Agency</option>
                      <option value="institutional">Institusi / Jaringan (asosiasi, franchise, supplier)</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                  <div className="pt-field">
                    <label htmlFor="p-about">Ceritakan jaringan / klien kamu</label>
                    <textarea id="p-about" placeholder="Mis. agency dengan ~30 klien F&B, atau asosiasi kafe dengan 200 anggota di Bandung…" value={fields.about} onChange={(e) => set("about", e.target.value)} disabled={status === "loading"} />
                  </div>
                  {formError && <div className="pt-formerr">{formError}</div>}
                  <button type="submit" className="pt-submit" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <span className="pt-spin" aria-hidden="true"></span> Mengirim...
                      </>
                    ) : (
                      "Kirim pengajuan"
                    )}
                  </button>
                  <p className="pt-form-note">
                    Dengan mengajukan, kamu setuju kami hubungi via email/WhatsApp soal
                    kemitraan.
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
