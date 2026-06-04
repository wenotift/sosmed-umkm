"use client";

import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/* ---- validation helpers ---- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Normalize an Indonesian mobile number to canonical 628xxxxxxxxx.
// Accepts 08xx, +628xx, 628xx, 8xx (with spaces/dashes). Returns null if invalid.
function normalizeWa(raw: string): string | null {
  let d = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (d.startsWith("8")) d = "62" + d;
  // Indonesian mobile: 62 + 8 + 8–11 more digits (10–13 total)
  if (!/^628\d{7,11}$/.test(d)) return null;
  return d;
}

type Fields = { name: string; email: string; business: string; whatsapp: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "loading" | "success";

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Nama wajib diisi.";
  if (!f.email.trim()) e.email = "Email wajib diisi.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Format email tidak valid.";
  if (!f.business.trim()) e.business = "Nama bisnis wajib diisi.";
  if (!f.whatsapp.trim()) e.whatsapp = "Nomor WhatsApp wajib diisi.";
  else if (!normalizeWa(f.whatsapp))
    e.whatsapp = "Nomor WhatsApp tidak valid (contoh: 0812xxxxxxxx).";
  return e;
}

const FIELDS: {
  key: keyof Fields;
  label: string;
  type: string;
  placeholder: string;
  hint?: string;
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
}[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Nama lengkap kamu", autoComplete: "name" },
  { key: "email", label: "Email", type: "email", placeholder: "kamu@email.com", inputMode: "email", autoComplete: "email" },
  { key: "business", label: "Nama bisnis", type: "text", placeholder: "Nama kafe / warung / resto", autoComplete: "organization" },
  {
    key: "whatsapp",
    label: "WhatsApp",
    type: "tel",
    placeholder: "0812xxxxxxxx",
    hint: "Nomor aktif — kami hubungi lewat WhatsApp.",
    inputMode: "tel",
    autoComplete: "tel",
  },
];

export default function DaftarContent() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", business: "", whatsapp: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (formError) setFormError(null);
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setFormError(null);

    const eMap = validate(fields);
    if (Object.keys(eMap).length) {
      setErrors(eMap);
      return;
    }

    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim().toLowerCase(),
      business_name: fields.business.trim(),
      whatsapp: normalizeWa(fields.whatsapp) as string,
      source: "daftar",
    };

    setStatus("loading");

    // STUB / DEMO MODE: no Supabase keys yet -> log the payload and show success
    // so the full flow is testable. When NEXT_PUBLIC_SUPABASE_* are set later,
    // the real insert below runs instead — no code change needed.
    if (!isSupabaseConfigured || !supabase) {
      // eslint-disable-next-line no-console
      console.log("[daftar] demo mode — would insert into waitlist:", payload);
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      return;
    }

    // Insert-only: do NOT chain .select() (no SELECT policy under insert-only RLS).
    const { error } = await supabase.from("waitlist").insert(payload);

    if (error) {
      if (error.code === "23505") {
        setStatus("idle");
        setErrors((prev) => ({ ...prev, email: "Email ini sudah terdaftar." }));
        return;
      }
      setStatus("idle");
      setFormError("Gagal mengirim. Coba lagi sebentar lagi ya.");
      return;
    }

    setStatus("success");
  };

  return (
    <main className="daftar-page">
      <section className="daftar-hero">
        <div className="wrap">
          <div className="badge">
            <span className="dot"></span> Early Access
          </div>
          <h1>Daftar Early Access</h1>
          <p className="lead">
            Jadi salah satu dari <b>100 founding user</b> Sosmed AI — harga launch
            dikunci <b>selamanya</b>. Isi datanya, kami hubungi via WhatsApp begitu
            akses dibuka.
          </p>
        </div>
      </section>

      <section className="daftar-formsec">
        <div className="wrap">
          <div className="daftar-card">
            {status === "success" ? (
              <div className="daftar-success" role="status" aria-live="polite">
                <div className="ds-ic" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2>Kamu masuk waitlist!</h2>
                <p>Kami hubungi via WhatsApp begitu early access dibuka. Sampai ketemu! 👋</p>
                {!isSupabaseConfigured && (
                  <p className="ds-demo">
                    Mode demo — Supabase belum terhubung, jadi data ini belum
                    tersimpan (cek console untuk payload-nya).
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="daftar-card-head">
                  <h2>Amankan tempatmu</h2>
                  <p>Cuma butuh 30 detik. Semua field wajib diisi.</p>
                </div>

                <form className="daftar-form" onSubmit={onSubmit} noValidate>
                  {FIELDS.map((f) => (
                    <div className="df-field" key={f.key}>
                      <label htmlFor={`df-${f.key}`}>{f.label}</label>
                      <input
                        id={`df-${f.key}`}
                        name={f.key}
                        type={f.type}
                        inputMode={f.inputMode}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        value={fields[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        className={errors[f.key] ? "df-invalid" : undefined}
                        aria-invalid={errors[f.key] ? true : undefined}
                        aria-describedby={
                          errors[f.key]
                            ? `df-${f.key}-err`
                            : f.hint
                              ? `df-${f.key}-hint`
                              : undefined
                        }
                        disabled={status === "loading"}
                      />
                      {errors[f.key] ? (
                        <span className="df-err" id={`df-${f.key}-err`}>
                          {errors[f.key]}
                        </span>
                      ) : f.hint ? (
                        <span className="df-hint" id={`df-${f.key}-hint`}>
                          {f.hint}
                        </span>
                      ) : null}
                    </div>
                  ))}

                  {formError && <div className="df-formerr">{formError}</div>}

                  <button type="submit" className="df-submit" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <span className="df-spin" aria-hidden="true"></span> Mengirim...
                      </>
                    ) : (
                      "Daftar Sekarang"
                    )}
                  </button>

                  <p className="df-fineprint">
                    Dengan mendaftar, kamu setuju dihubungi soal early access. Tanpa spam.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
