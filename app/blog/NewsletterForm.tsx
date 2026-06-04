"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "loading" | "success";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState<string | null>(null); // inline duplicate/error

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    const v = email.trim();
    if (!v || !EMAIL_RE.test(v)) {
      setMsg("Masukkan alamat email yang valid.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 409) {
        setStatus("idle");
        setMsg("Kamu sudah berlangganan.");
        return;
      }
      setStatus("idle");
      setMsg("Gagal berlangganan. Coba lagi sebentar lagi ya.");
    } catch {
      setStatus("idle");
      setMsg("Gagal terhubung. Cek koneksi kamu dan coba lagi.");
    }
  };

  return (
    <div className="news">
      <div>
        <span className="pill">
          <span className="dot"></span> Newsletter
        </span>
        <h2>Tips usaha F&amp;B, langsung ke inbox</h2>
        <p>
          Dapatkan ide dan panduan praktis untuk mengelola dan menumbuhkan usaha
          Anda. Tanpa spam.
        </p>

        {status === "success" ? (
          <div className="news-success" role="status" aria-live="polite">
            <span className="ns-check" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="ns-success-txt">
              <strong>Berhasil!</strong>
              <span>Cek inbox kamu untuk konfirmasi.</span>
            </div>
          </div>
        ) : (
          <>
            <form className="form" onSubmit={submit} noValidate>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (msg) setMsg(null);
                }}
                disabled={status === "loading"}
                aria-label="Email"
                aria-invalid={msg ? true : undefined}
              />
              <button type="submit" className="btn" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <span className="ns-spin" aria-hidden="true"></span> Mengirim...
                  </>
                ) : (
                  "Langganan"
                )}
              </button>
            </form>
            {msg && <p className="news-msg">{msg}</p>}
          </>
        )}
      </div>
      <div className="side">
        Sosmed AI membantu pemilik warung, kafe, dan restoran kecil mengelola
        order, menu, poin, dan laporan - semua langsung dari WhatsApp.
      </div>
    </div>
  );
}
