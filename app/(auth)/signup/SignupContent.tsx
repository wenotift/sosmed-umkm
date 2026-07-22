"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthAside, SsoButtons, Ic, PasswordChecklist } from "../shared";
import { LangToggle, useT, type Dict } from "../i18n";
import { register, AuthError, EMAIL_RE, passwordProblem, isEmailAllowed } from "@/lib/auth";

type Fields = { name: string; email: string; password: string };
type Errors = Partial<Record<keyof Fields | "agree" | "form", string>>;

function validate(f: Fields, agree: boolean, t: Dict): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = t.errNameRequired;
  if (!f.email.trim()) e.email = t.errEmailRequired;
  else if (!EMAIL_RE.test(f.email.trim())) e.email = t.errEmailInvalid;
  if (!f.password) e.password = t.passwordPhSignup;
  else {
    const p = passwordProblem(f.password);
    if (p) e.password = p;
  }
  if (!agree) e.agree = t.errAgreeRequired;
  return e;
}

export default function SignupContent() {
  const router = useRouter();
  const t = useT();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  const set = (k: keyof Fields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(fields, agree, t);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (!isEmailAllowed(fields.email)) {
      setErrors({ form: t.errRestrictedSignup });
      return;
    }
    setLoading(true);
    try {
      const { needsConfirmation } = await register(fields);
      if (needsConfirmation) {
        setLoading(false);
        setConfirmSent(true); // email verification required — show a check-inbox state
      } else {
        router.push("/onboarding"); // new account → run the setup wizard
      }
    } catch (err) {
      setLoading(false);
      const code = err instanceof AuthError ? err.code : "unknown";
      if (code === "email_taken") {
        setErrors({ email: t.errEmailTaken });
      } else if (code === "network") {
        setErrors({ form: t.errNetwork });
      } else {
        setErrors({ form: t.errGeneric });
      }
    }
  };

  if (confirmSent) {
    return (
      <>
        <AuthAside variant="signup" />
        <div className="auth-panel">
          <div className="auth-card">
            <div className="auth-success">
              <span className="auth-success-ic">{Ic.mail}</span>
              <h2>{t.confirmTitle}</h2>
              <p className="auth-card-sub">
                {t.confirmPre}
                <b>{fields.email.trim().toLowerCase()}</b>
                {t.confirmPost}
              </p>
            </div>
            <Link href="/login" className="auth-submit" style={{ marginTop: 20 }}>
              {t.goToLogin}
            </Link>
            <p className="auth-swap">
              {t.wrongEmail}{" "}
              <button
                type="button"
                onClick={() => setConfirmSent(false)}
                style={{ background: "none", border: "none", color: "var(--v)", fontWeight: 700, cursor: "pointer" }}
              >
                {t.startOver}
              </button>
            </p>
          </div>
          <LangToggle />
        </div>
      </>
    );
  }

  return (
    <>
      <AuthAside variant="signup" />
      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit} noValidate>
          <h2>{t.createAccount}</h2>
          <p className="auth-card-sub">{t.signupSub}</p>

          <SsoButtons mode="signup" />
          <div className="auth-div">{t.orSignupEmail}</div>

          <div className="auth-field">
            <label htmlFor="su-name">{t.fullName}</label>
            <div className={"auth-input" + (errors.name ? " invalid" : "")}>
              <span className="lead">{Ic.user}</span>
              <input
                id="su-name"
                value={fields.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder={t.fullNamePh}
                autoComplete="name"
              />
            </div>
            {errors.name && <div className="auth-err">{errors.name}</div>}
          </div>

          <div className="auth-field">
            <label htmlFor="su-email">{t.email}</label>
            <div className={"auth-input" + (errors.email ? " invalid" : "")}>
              <span className="lead">{Ic.mail}</span>
              <input
                id="su-email"
                type="email"
                inputMode="email"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder={t.emailPhSignup}
                autoComplete="email"
              />
            </div>
            {errors.email && <div className="auth-err">{errors.email}</div>}
          </div>

          <div className="auth-field">
            <label htmlFor="su-pass">{t.password}</label>
            <div className={"auth-input" + (errors.password ? " invalid" : "")}>
              <span className="lead">{Ic.lock}</span>
              <input
                id="su-pass"
                type={show ? "text" : "password"}
                value={fields.password}
                onChange={(e) => set("password", e.target.value)}
                onFocus={() => setPwFocus(true)}
                onBlur={() => setPwFocus(false)}
                placeholder={t.passwordPhSignup}
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
            {pwFocus || fields.password ? (
              <PasswordChecklist value={fields.password} />
            ) : errors.password ? (
              <div className="auth-err">{errors.password}</div>
            ) : (
              <div className="auth-hint">{t.pwHint}</div>
            )}
          </div>

          <label className={"auth-check" + (errors.agree ? " invalid" : "")}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                if (errors.agree) setErrors((x) => ({ ...x, agree: undefined }));
              }}
            />
            <span className="box">{Ic.check}</span>
            <span>
              {t.agreePre}
              <Link href="/syarat">{t.terms}</Link>
              {t.agreeMid}
              <Link href="/privasi">{t.privacy}</Link>
            </span>
          </label>
          {errors.agree && <div className="auth-err" style={{ marginTop: -12, marginBottom: 14 }}>{errors.agree}</div>}
          {errors.form && <div className="auth-err" style={{ marginBottom: 14 }}>{errors.form}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spin" /> : null}
            {loading ? t.createBtnLoading : t.createBtn}
          </button>

          <p className="auth-swap">
            {t.haveAccount} <Link href="/login">{t.loginLink}</Link>
          </p>
        </form>
        <LangToggle />
      </div>
    </>
  );
}
