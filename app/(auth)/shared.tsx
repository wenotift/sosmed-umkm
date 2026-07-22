"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { loginWithGoogle, usingSupabase, passwordChecks } from "@/lib/auth";

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
    <Line>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 21l2-5.5a8.5 8.5 0 0 1 16-4z" />
      <path d="M8.5 8.8c0-.3.2-.5.5-.5h.9c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.5c.5.9 1.2 1.6 2.1 2.1l.5-.5c.2-.2.4-.2.6-.1l1.4.6c.2.1.4.3.4.5v.9c0 .3-.2.5-.5.5A6.5 6.5 0 0 1 8.5 8.8z" />
    </Line>
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
  return (
    <div className="auth-logo">
      <Image
        className="auth-logo-img"
        src="/logo/sosmed-ai-logo-black-version.png"
        alt="Sosmed AI"
        width={137}
        height={34}
        priority
      />
      <span className="auth-logo-sub">AI Native WhatsApp Automation Agent</span>
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
              <div className="auth-wa-name">Sosi AI</div>
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
              Hai! 👋<span className="t">10:30</span>
            </div>
            <div className="auth-bub in">
              Ada yang bisa Sosi bantu hari ini?<span className="t">10:30</span>
            </div>
            <div className="auth-bub out">
              Saya ingin tahu tentang produk skincare<span className="t">10:31</span>
            </div>
            <div className="auth-bub in">
              Tentu! Ini beberapa rekomendasi untuk kamu.<span className="t">10:31</span>
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
const SIGNUP_FEATS = [
  { ic: Ic.wa, wa: true, h: "AI Native for WhatsApp", p: "Built natively to understand, respond, and act like a human." },
  { ic: Ic.bolt, h: "Automate. Personalize. Convert.", p: "From FAQ to sales, our agent helps you nurture, qualify, and convert automatically." },
  { ic: Ic.bars, h: "24/7 Engagement", p: "Never miss a message. Engage customers instantly, anytime." },
  { ic: Ic.shield, h: "Secure & Reliable", p: "Enterprise-grade security to protect your data and your customers." },
];
const LOGIN_FEATS = [
  { ic: Ic.wa, wa: true, h: "AI Native WhatsApp Agent", p: "Built natively for WhatsApp to understand, respond, and act like a human." },
  { ic: Ic.bolt, h: "Always On. Always Smart.", p: "Handle thousands of chats simultaneously and never miss a customer." },
  { ic: Ic.bars, h: "Automate. Personalize. Convert.", p: "From FAQ to sales, our agent helps you nurture, qualify, and convert—automatically." },
];

export function AuthAside({ variant }: { variant: "login" | "signup" }) {
  const feats = variant === "signup" ? SIGNUP_FEATS : LOGIN_FEATS;
  return (
    <aside className="auth-aside">
      <div className="auth-aside-inner">
        <AuthLogo />
        <div className="auth-hero-grid">
          <div>
            {variant === "login" && (
              <span className="auth-badge">AI Native WhatsApp Automation Agent</span>
            )}
            <h1 className="auth-h1" style={{ marginTop: variant === "login" ? 16 : 8 }}>
              Your AI Agent,
              <br />
              on <span className="g">WhatsApp</span>
            </h1>
            <p className="auth-lead" style={{ marginTop: 16 }}>
              {variant === "signup"
                ? "Build your AI agent to automate conversations, engage customers, and grow your business 24/7 on WhatsApp."
                : "Automate conversations. Engage customers. Close more deals — 24/7 with AI."}
            </p>
            <div className="auth-feats">
              {feats.map((f) => (
                <div className="auth-feat" key={f.h}>
                  <span className={"auth-feat-ic" + (f.wa ? " wa" : "")}>{f.ic}</span>
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

        {variant === "login" && (
          <div className="auth-trustcard">
            <div className="it">
              {Ic.shield}
              <div>
                <b>Enterprise-grade security</b>
                <span>Your data is encrypted and always protected.</span>
              </div>
            </div>
            <div className="it">
              {Ic.lock}
              <div>
                <b>No credit card required</b>
                <span>Start your 14-day free trial in just a few clicks.</span>
              </div>
            </div>
            <div className="it">
              {Ic.headset}
              <div>
                <b>24/7 Support</b>
                <span>We&apos;re here to help you succeed.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ---- shared bits used by the cards ---------------------------------------*/
/* ---- live password requirements checklist --------------------------------*/
export function PasswordChecklist({ value }: { value: string }) {
  return (
    <ul className="auth-pwlist">
      {passwordChecks(value).map((c) => (
        <li key={c.label} className={c.ok ? "ok" : ""}>
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
          {c.label}
        </li>
      ))}
    </ul>
  );
}

export function SsoButtons({ verb }: { verb: string }) {
  const router = useRouter();
  // With Supabase this redirects to Google OAuth; in local mode it provisions a
  // demo session and enters the app.
  const onGoogle = async () => {
    await loginWithGoogle();
    if (!usingSupabase) router.push("/dashboard");
  };
  return (
    <div className="auth-sso-row">
      <button type="button" className="auth-sso" onClick={onGoogle}>
        {GoogleIcon} {verb} with Google
      </button>
    </div>
  );
}
