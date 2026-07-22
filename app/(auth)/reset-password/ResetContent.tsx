"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { AuthAside, Ic } from "../shared";
import {
  emailForResetToken,
  completeReset,
  passwordProblem,
  usingSupabase,
  subscribeSession,
  sessionSnapshot,
} from "@/lib/auth";

const noopSubscribe = () => () => {};

export default function ResetContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  // Resolve the account email two ways (both hooks run unconditionally):
  //  • local  — from the reset token in the URL (localStorage lookup)
  //  • supabase — from the recovery session the email link established
  // Server snapshot is `undefined` → a loading gate, so there's no mismatch.
  const tokenEmail = useSyncExternalStore<string | null | undefined>(
    noopSubscribe,
    () => (token ? emailForResetToken(token) : null),
    () => undefined,
  );
  const session = useSyncExternalStore(subscribeSession, sessionSnapshot, () => undefined);
  const email = usingSupabase
    ? session === undefined
      ? undefined
      : session
        ? session.email
        : null
    : tokenEmail;
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ pw?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const invalid = email === null || failed;

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    const p = passwordProblem(pw);
    if (!pw) e.pw = "Create a new password.";
    else if (p) e.pw = p;
    if (confirm !== pw) e.confirm = "Passwords don't match.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await completeReset({ token, password: pw });
      setDone(true);
    } catch {
      setLoading(false);
      setFailed(true); // token/recovery session invalid
    }
  };

  return (
    <>
      <AuthAside variant="login" />
      <div className="auth-panel">
        <div className="auth-card">
          {email === undefined ? (
            <div className="auth-success">
              <span className="auth-loading" />
            </div>
          ) : done ? (
            <div className="auth-success">
              <span className="auth-success-ic">{Ic.check}</span>
              <h2>Password updated</h2>
              <p className="auth-card-sub">
                Your password has been changed. You can now log in with your new password.
              </p>
              <button
                className="auth-submit"
                style={{ marginTop: 18 }}
                onClick={() => router.push("/login")}
              >
                Go to login
              </button>
            </div>
          ) : invalid ? (
            <>
              <Link href="/forgot-password" className="auth-back">
                {Ic.arrowLeft} Back
              </Link>
              <h2>Link expired</h2>
              <p className="auth-card-sub">
                This reset link is invalid or has expired. Request a new one to continue.
              </p>
              <Link href="/forgot-password" className="auth-submit" style={{ marginTop: 20 }}>
                Request a new link
              </Link>
            </>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h2>Set a new password</h2>
              <p className="auth-card-sub">
                Choose a new password for <b>{email}</b>.
              </p>

              <div className="auth-field" style={{ marginTop: 24 }}>
                <label htmlFor="rp-pass">New password</label>
                <div className={"auth-input" + (errors.pw ? " invalid" : "")}>
                  <span className="lead">{Ic.lock}</span>
                  <input
                    id="rp-pass"
                    type={show ? "text" : "password"}
                    value={pw}
                    onChange={(e) => {
                      setPw(e.target.value);
                      if (errors.pw) setErrors((x) => ({ ...x, pw: undefined }));
                    }}
                    placeholder="Create a new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? Ic.eyeOff : Ic.eye}
                  </button>
                </div>
                {errors.pw ? (
                  <div className="auth-err">{errors.pw}</div>
                ) : (
                  <div className="auth-hint">Use 8+ characters with a mix of letters &amp; numbers.</div>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="rp-confirm">Confirm password</label>
                <div className={"auth-input" + (errors.confirm ? " invalid" : "")}>
                  <span className="lead">{Ic.lock}</span>
                  <input
                    id="rp-confirm"
                    type={show ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      if (errors.confirm) setErrors((x) => ({ ...x, confirm: undefined }));
                    }}
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                  />
                </div>
                {errors.confirm && <div className="auth-err">{errors.confirm}</div>}
              </div>

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? <span className="spin" /> : null}
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
