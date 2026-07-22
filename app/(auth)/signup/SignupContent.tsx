"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthAside, SsoButtons, Ic } from "../shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = { name: string; email: string; password: string };
type Errors = Partial<Record<keyof Fields | "agree", string>>;

function validate(f: Fields, agree: boolean): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Full name is required.";
  if (!f.email.trim()) e.email = "Work email is required.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.password) e.password = "Create a password.";
  else if (f.password.length < 8) e.password = "Use at least 8 characters.";
  else if (!/[a-zA-Z]/.test(f.password) || !/\d/.test(f.password))
    e.password = "Mix letters and numbers.";
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

  const set = (k: keyof Fields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(fields, agree);
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    // No auth backend yet — proceed to the dashboard for the proto.
    setTimeout(() => router.push("/dashboard"), 550);
  };

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
            <label htmlFor="su-email">Work email</label>
            <div className={"auth-input" + (errors.email ? " invalid" : "")}>
              <span className="lead">{Ic.mail}</span>
              <input
                id="su-email"
                type="email"
                inputMode="email"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="Enter your work email"
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
