"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { loginWithGoogle, usingSupabase, passwordChecks } from "@/lib/auth";
import { useT } from "./i18n";

/* ---- brand + UI icons -----------------------------------------------------*/
export const GoogleIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23.06 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.19a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.18-2 3.45-4.96 3.45-8.38z" />
    <path fill="#34A853" d="M12 24c3.11 0 5.72-1.03 7.63-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.91 1.1-3 0-5.55-2.03-6.46-4.76H1.69v2.98A11.5 11.5 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.54 14.66A6.9 6.9 0 0 1 5.18 12c0-.92.16-1.82.36-2.66V6.36H1.69A11.5 11.5 0 0 0 .5 12c0 1.86.44 3.62 1.19 5.18l3.85-2.52z" />
    <path fill="#EA4335" d="M12 4.75c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.71 1.24 15.1 0 12 0 7.5 0 3.6 2.58 1.69 6.36l3.85 2.98C6.45 6.6 9 4.75 12 4.75z" />
  </svg>
);

function Line({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export const Ic = {
  wa: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.42 1.3-1.97 1.38-.5.08-1.14.11-1.84-.12-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.86-4.23-5.01-4.43-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.83 2.04.9 2.18.07.15.12.32.02.51-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.72-.17 1.4z" />
    </svg>
  ),
  bolt: <Line><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></Line>,
  bars: <Line><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9M13 17V7M8 17v-4" /></Line>,
  shield: <Line><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" /></Line>,
  user: <Line><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Line>,
  mail: <Line><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Line>,
  lock: <Line><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Line>,
  eye: <Line><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></Line>,
  eyeOff: <Line><path d="M2 12s3.5-7 10-7c1.7 0 3.2.5 4.5 1.2M22 12s-3.5 7-10 7c-1.7 0-3.2-.5-4.5-1.2" /><path d="m4 4 16 16" /><path d="M9.5 9.5a3 3 0 0 0 4.2 4.2" /></Line>,
  check: <Line><path d="M20 6 9 17l-5-5" /></Line>,
  headset: <Line><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="14" width="4" height="6" rx="1.5" /><rect x="18" y="14" width="4" height="6" rx="1.5" /><path d="M20 20a4 4 0 0 1-4 3h-2" /></Line>,
  people: <Line><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" /></Line>,
  arrow: <Line><path d="M5 12h14M13 6l6 6-6 6" /></Line>,
  arrowLeft: <Line><path d="M19 12H5M11 18l-6-6 6-6" /></Line>,
  x: <Line><path d="M18 6 6 18M6 6l12 12" /></Line>,
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="4" />
      <path d="M12 8V4M9 4h6" />
      <circle cx="9" cy="14" r="1.3" fill="#fff" stroke="none" />
      <circle cx="15" cy="14" r="1.3" fill="#fff" stroke="none" />
      <path d="M2 13v2M22 13v2" />
    </svg>
  ),
};

/* ---- logo lockup ----------------------------------------------------------*/
export function AuthLogo() {
  const t = useT();
  return (
    <div className="auth-logo">
      <Link href="/" className="auth-logo-link" aria-label="Sosmed AI — beranda">
        <Image
          className="auth-logo-img"
          src="/logo/sosmed-ai-logo-black-version.png"
          alt="Sosmed AI"
          width={137}
          height={34}
          priority
        />
      </Link>
      <span className="auth-logo-sub">{t.logoSub}</span>
    </div>
  );
}

/* ---- phone / WhatsApp illustration ----------------------------------------*/
export function AuthIllustration() {
  return (
    <div className="auth-illus" aria-hidden="true">
      <span className="auth-orbit" />
      <div className="auth-phone">
        <span className="auth-phone-island" />
        <div className="auth-phone-screen">
          <div className="auth-status">
            <span>9:41</span>
            <span className="auth-status-ic">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="#fff" aria-hidden="true">
                <rect x="0" y="7" width="3" height="4" rx="1" />
                <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
                <rect x="9" y="2" width="3" height="9" rx="1" />
                <rect x="13" y="0" width="3" height="11" rx="1" opacity="0.4" />
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="#fff" strokeWidth="1.4" aria-hidden="true">
                <path d="M1 4.2A9 9 0 0 1 14 4.2M3.4 6.6a5.5 5.5 0 0 1 8.2 0M6 9a2 2 0 0 1 3 0" strokeLinecap="round" />
              </svg>
              <svg width="22" height="11" viewBox="0 0 24 12" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="20" height="10" rx="2.5" stroke="#fff" strokeOpacity="0.6" />
                <rect x="3" y="3" width="14" height="6" rx="1" fill="#fff" />
                <rect x="22" y="4" width="1.6" height="4" rx="0.8" fill="#fff" fillOpacity="0.6" />
              </svg>
            </span>
          </div>
          <div className="auth-wa-top">
            <span className="auth-wa-back">‹</span>
            <span className="auth-wa-av">{Ic.robot}</span>
            <span className="auth-wa-meta">
              <div className="auth-wa-name">Kopi Senja</div>
              <div className="auth-wa-status">online</div>
            </span>
            <span className="auth-wa-actions">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="m23 7-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
              </svg>
            </span>
          </div>
          <div className="auth-wa-body">
            <div className="auth-bub in">
              Hai! 👋 Selamat datang di Kopi Senja ☕<span className="t">10:30</span>
            </div>
            <div className="auth-bub in">
              Ada yang mau dipesan hari ini?<span className="t">10:30</span>
            </div>
            <div className="auth-bub out">
              Menu best seller apa aja?<span className="t">10:31</span>
            </div>
            <div className="auth-bub in">
              Kopi Susu Gula Aren &amp; Croissant paling laris! 🥐<span className="t">10:31</span>
            </div>
            <div className="auth-typing">
              <i /><i /><i />
            </div>
          </div>
          <div className="auth-wa-input">
            <span className="auth-wa-inbox">Ketik pesan…</span>
            <span className="auth-wa-send">
              <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M2 21 23 12 2 3v7l15 2-15 2v7z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <span className="auth-float wa">{Ic.wa}</span>
      <span className="auth-float ppl">{Ic.people}</span>
      <span className="auth-robot">{Ic.robot}</span>
    </div>
  );
}

/* ---- marketing aside (left) ----------------------------------------------*/
const FEAT_ICONS = [Ic.wa, Ic.bolt, Ic.bars, Ic.shield];

export function AuthAside({ variant }: { variant: "login" | "signup" }) {
  const t = useT();
  const feats = variant === "signup" ? t.featsSignup : t.featsLogin;
  return (
    <aside className="auth-aside">
      <div className="auth-aside-inner">
        <div className="auth-hero-grid">
          <div>
            {variant === "login" && (
              <span className="auth-badge">{Ic.wa} {t.badge}</span>
            )}
            <h1 className="auth-h1" style={{ marginTop: variant === "login" ? 16 : 8 }}>
              {t.h1a}
              <br />
              {t.h1pre}<span className="g">WhatsApp</span>
            </h1>
            <p className="auth-lead" style={{ marginTop: 16 }}>
              {variant === "signup" ? t.leadSignup : t.leadLogin}
            </p>
            <div className="auth-feats">
              {feats.map((f, i) => (
                <div className="auth-feat" key={f.h}>
                  <span className={"auth-feat-ic" + (i === 0 ? " wa" : "")}>{FEAT_ICONS[i]}</span>
                  <div>
                    <h3>{f.h}</h3>
                    <p>{f.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AuthIllustration />
        </div>
      </div>
    </aside>
  );
}

/* ---- shared bits used by the cards ---------------------------------------*/
/* ---- live password requirements checklist --------------------------------*/
export function PasswordChecklist({ value }: { value: string }) {
  const t = useT();
  return (
    <ul className="auth-pwlist">
      {passwordChecks(value).map((c, i) => (
        <li key={i} className={c.ok ? "ok" : ""}>
          <span className="auth-pw-ic">
            {c.ok ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            )}
          </span>
          {t.pwRules[i]}
        </li>
      ))}
    </ul>
  );
}

export function SsoButtons({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const t = useT();
  // With Supabase this redirects to Google OAuth; in local mode it provisions a
  // demo session and enters the app.
  const onGoogle = async () => {
    await loginWithGoogle();
    if (!usingSupabase) router.push("/dashboard");
  };
  return (
    <div className="auth-sso-row">
      <button type="button" className="auth-sso" onClick={onGoogle}>
        {GoogleIcon} {mode === "signup" ? t.googleSignup : t.googleContinue}
      </button>
    </div>
  );
}
