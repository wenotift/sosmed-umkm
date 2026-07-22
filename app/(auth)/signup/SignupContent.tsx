"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthAside, SsoButtons, Ic } from "../shared";
import { register, AuthError, EMAIL_RE, passwordProblem } from "@/lib/auth";

type Fields = { name: string; email: string; password: string };
type Errors = Partial<Record<keyof Fields | "agree" | "form", string>>;

function validate(f: Fields, agree: boolean): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Full name is required.";
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.password) e.password = "Create a password.";
  else {
    const p = passwordProblem(f.password);
    if (p) e.password = p;
  }
  if (!agree) e.agree = "Please accept the Terms to continue.";
  return e;
}

export default function SignupContent() {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  const set = (k: keyof Fields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(fields, agree);
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      const { needsConfirmation } = await register(fields);
      if (needsConfirmation) {
        setLoading(false);
        setConfirmSent(true); // email verification required — show a check-inbox state
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      const code = err instanceof AuthError ? err.code : "unknown";
      if (code === "email_taken") {
        setErrors({ email: "This email is already registered. Try logging in." });
      } else if (code === "network") {
        setErrors({ form: "Couldn't reach the server. Check your connection and try again." });
      } else {
        setErrors({ form: "Something went wrong. Please try again." });
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
              <h2>Confirm your email</h2>
              <p className="auth-card-sub">
                We sent a verification link to <b>{fields.email.trim().toLowerCase()}</b>. Click it
                to activate your account, then log in.
              </p>
            </div>
            <Link href="/login" className="auth-submit" style={{ marginTop: 20 }}>
              Go to login
            </Link>
            <p className="auth-swap">
              Wrong email?{" "}
              <button
                type="button"
                onClick={() => setConfirmSent(false)}
                style={{ background: "none", border: "none", color: "var(--v)", fontWeight: 700, cursor: "pointer" }}
              >
                Start over
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthAside variant="signup" />
      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit} noValidate>
          <h2>Create your account</h2>
          <p className="auth-card-sub">Start building your AI Agent in just a few minutes.</p>

          <SsoButtons verb="Sign up" />
          <div className="auth-div">or sign up with email</div>

          <div className="auth-field">
            <label htmlFor="su-name">Full name</label>
            <div className={"auth-input" + (errors.name ? " invalid" : "")}>
              <span className="lead">{Ic.user}</span>
              <input
                id="su-name"
                value={fields.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>
            {errors.name && <div className="auth-err">{errors.name}</div>}
          </div>

          <div className="auth-field">
            <label htmlFor="su-email">Email</label>
            <div className={"auth-input" + (errors.email ? " invalid" : "")}>
              <span className="lead">{Ic.mail}</span>
              <input
                id="su-email"
                type="email"
                inputMode="email"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            {errors.email && <div className="auth-err">{errors.email}</div>}
          </div>

          <div className="auth-field">
            <label htmlFor="su-pass">Password</label>
            <div className={"auth-input" + (errors.password ? " invalid" : "")}>
              <span className="lead">{Ic.lock}</span>
              <input
                id="su-pass"
                type={show ? "text" : "password"}
                value={fields.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Create a password"
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
            {errors.password ? (
              <div className="auth-err">{errors.password}</div>
            ) : (
              <div className="auth-hint">Use 8+ characters with a mix of letters, numbers &amp; symbols.</div>
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
              I agree to the <Link href="/syarat">Terms of Service</Link> and{" "}
              <Link href="/privasi">Privacy Policy</Link>
            </span>
          </label>
          {errors.agree && <div className="auth-err" style={{ marginTop: -12, marginBottom: 14 }}>{errors.agree}</div>}
          {errors.form && <div className="auth-err" style={{ marginBottom: 14 }}>{errors.form}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spin" /> : null}
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="auth-swap">
            Already have an account? <Link href="/login">Log in</Link>
          </p>

          <div className="auth-foot">
            <div className="it">{Ic.shield}<div><b>Enterprise-grade</b><span>security</span></div></div>
            <div className="it">{Ic.lock}<div><b>Your data is always</b><span>protected</span></div></div>
            <div className="it">{Ic.headset}<div><b>24/7 support</b><span>when you need us</span></div></div>
          </div>
        </form>
      </div>
    </>
  );
}
