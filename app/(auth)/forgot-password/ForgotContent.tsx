"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthAside, Ic } from "../shared";
import { LangToggle, useT } from "../i18n";
import { requestReset, EMAIL_RE } from "@/lib/auth";

export default function ForgotContent() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devToken, setDevToken] = useState<string | null>(null);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = email.trim();
    if (!e || !EMAIL_RE.test(e)) {
      setError(t.errEmailInvalid);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // Neutral confirmation (don't reveal whether the email exists).
      const { devToken } = await requestReset(e);
      setDevToken(devToken);
      setSent(true);
    } catch {
      setError(t.errNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthAside variant="login" />
      <div className="auth-panel">
        <div className="auth-card">
          <Link href="/login" className="auth-back">
            {Ic.arrowLeft} {t.backToLogin}
          </Link>

          {sent ? (
            <>
              <div className="auth-success">
                <span className="auth-success-ic">{Ic.mail}</span>
                <h2>{t.checkEmail}</h2>
                <p className="auth-card-sub">
                  {t.checkEmailPre}
                  <b>{email.trim().toLowerCase()}</b>
                  {t.checkEmailPost}
                </p>
              </div>

              {devToken && (
                <div className="auth-note" style={{ marginTop: 18 }}>
                  {t.demoNote}
                  <Link href={`/reset-password?token=${devToken}`} style={{ fontWeight: 700 }}>
                    {t.resetPasswordLink}
                  </Link>
                </div>
              )}

              <button
                type="button"
                className="auth-submit"
                style={{ marginTop: 14 }}
                onClick={() => {
                  setSent(false);
                  setDevToken(null);
                }}
              >
                {t.useDifferent}
              </button>
              <p className="auth-swap">
                {t.remembered} <Link href="/login">{t.loginLink}</Link>
              </p>
            </>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h2>{t.resetTitle}</h2>
              <p className="auth-card-sub">{t.resetSub}</p>

              <div className="auth-field" style={{ marginTop: 24 }}>
                <label htmlFor="fp-email">{t.email}</label>
                <div className={"auth-input" + (error ? " invalid" : "")}>
                  <span className="lead">{Ic.mail}</span>
                  <input
                    id="fp-email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>
                {error && <div className="auth-err">{error}</div>}
              </div>

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? <span className="spin" /> : null}
                {loading ? "Sending…" : "Send reset link"}
              </button>

              <p className="auth-swap">
                Remembered it? <Link href="/login">Log in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
