"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthAside, Ic } from "../shared";
import { requestReset, EMAIL_RE } from "@/lib/auth";

export default function ForgotContent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devToken, setDevToken] = useState<string | null>(null);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = email.trim();
    if (!e || !EMAIL_RE.test(e)) {
      setError("Enter a valid email address.");
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
      setError("Couldn't reach the server. Check your connection and try again.");
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
            {Ic.arrowLeft} Back to login
          </Link>

          {sent ? (
            <>
              <div className="auth-success">
                <span className="auth-success-ic">{Ic.mail}</span>
                <h2>Check your email</h2>
                <p className="auth-card-sub">
                  If an account exists for <b>{email.trim().toLowerCase()}</b>, we&apos;ve sent a
                  link to reset your password.
                </p>
              </div>

              {devToken && (
                <div className="auth-note" style={{ marginTop: 18 }}>
                  Mode demo — email belum tersambung. Lanjutkan reset di sini:{" "}
                  <Link href={`/reset-password?token=${devToken}`} style={{ fontWeight: 700 }}>
                    Reset password →
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
                Use a different email
              </button>
              <p className="auth-swap">
                Remembered it? <Link href="/login">Log in</Link>
              </p>
            </>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h2>Reset your password</h2>
              <p className="auth-card-sub">
                Enter your account email and we&apos;ll send you a link to set a new password.
              </p>

              <div className="auth-field" style={{ marginTop: 24 }}>
                <label htmlFor="fp-email">Email</label>
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
