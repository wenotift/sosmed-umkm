"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthAside, SsoButtons, Ic } from "../shared";
import { LangToggle, useT } from "../i18n";
import { login, AuthError, EMAIL_RE, isEmailAllowed } from "@/lib/auth";

type Errors = { email?: string; password?: string };

export default function LoginContent() {
  const router = useRouter();
  const t = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!email.trim()) e.email = t.errEmailRequired;
    else if (!EMAIL_RE.test(email.trim())) e.email = t.errEmailInvalid;
    if (!password) e.password = t.errPasswordRequired;
    setErrors(e);
    if (Object.keys(e).length) return;
    if (!isEmailAllowed(email)) {
      setErrors({ email: t.errRestricted });
      return;
    }
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      const code = err instanceof AuthError ? err.code : "unknown";
      if (code === "not_found") {
        setErrors({ email: t.errNotFound });
      } else if (code === "wrong_password") {
        setErrors({ password: t.errWrongPassword });
      } else if (code === "email_unconfirmed") {
        setErrors({ email: t.errEmailUnconfirmed });
      } else if (code === "invalid_credentials") {
        setErrors({ password: t.errInvalidCredentials });
      } else if (code === "network") {
        setErrors({ password: t.errNetwork });
      } else {
        setErrors({ password: t.errGeneric });
      }
    }
  };

  return (
    <>
      <AuthAside variant="login" />
      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit} noValidate>
          <h2>{t.welcome}</h2>
          <p className="auth-card-sub">{t.loginSub}</p>

          <div style={{ marginTop: 24 }} />

          <div className="auth-field">
            <label htmlFor="li-email">{t.email}</label>
            <div className={"auth-input" + (errors.email ? " invalid" : "")}>
              <span className="lead">{Ic.mail}</span>
              <input
                id="li-email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((x) => ({ ...x, email: undefined }));
                }}
                placeholder={t.emailPh}
                autoComplete="email"
              />
            </div>
            {errors.email && <div className="auth-err">{errors.email}</div>}
          </div>

          <div className="auth-field">
            <label htmlFor="li-pass">{t.password}</label>
            <div className={"auth-input" + (errors.password ? " invalid" : "")}>
              <span className="lead">{Ic.lock}</span>
              <input
                id="li-pass"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((x) => ({ ...x, password: undefined }));
                }}
                placeholder={t.passwordPh}
                autoComplete="current-password"
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
            {errors.password && <div className="auth-err">{errors.password}</div>}
          </div>

          <div className="auth-forgot">
            <Link href="/forgot-password">{t.forgot}</Link>
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spin" /> : null}
            {loading ? t.loginBtnLoading : t.loginBtn}
            {!loading && Ic.arrow}
          </button>

          <div className="auth-div">{t.orContinue}</div>
          <SsoButtons mode="login" />

          <p className="auth-swap">
            {t.noAccount} <Link href="/signup">{t.signupLink}</Link>
          </p>

          <div className="auth-foot-legal">
            {Ic.lock}
            <span>
              {t.legalPre}
              <Link href="/syarat">{t.terms}</Link>
              {t.legalMid}
              <Link href="/privasi">{t.privacy}</Link>
              {t.legalEnd}
            </span>
          </div>
        </form>
        <LangToggle />
      </div>
    </>
  );
}
