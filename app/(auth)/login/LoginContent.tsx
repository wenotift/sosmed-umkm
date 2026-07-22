"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthAside, SsoButtons, Ic } from "../shared";
import { login, AuthError, EMAIL_RE } from "@/lib/auth";

type Errors = { email?: string; password?: string };

export default function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";
    if (!password) e.password = "Enter your password.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      const code = err instanceof AuthError ? err.code : "unknown";
      if (code === "not_found") {
        setErrors({ email: "No account found with this email. Sign up first." });
      } else if (code === "wrong_password") {
        setErrors({ password: "Incorrect password. Try again." });
      } else if (code === "email_unconfirmed") {
        setErrors({ email: "Please confirm your email first — check your inbox." });
      } else if (code === "invalid_credentials") {
        setErrors({ password: "Incorrect email or password." });
      } else if (code === "network") {
        setErrors({ password: "Couldn't reach the server. Check your connection and try again." });
      } else {
        setErrors({ password: "Something went wrong. Please try again." });
      }
    }
  };

  return (
    <>
      <AuthAside variant="login" />
      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit} noValidate>
          <h2>Welcome back! 👋</h2>
          <p className="auth-card-sub">Log in to your Sosmed AI account.</p>

          <div style={{ marginTop: 24 }} />

          <div className="auth-field">
            <label htmlFor="li-email">Email</label>
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
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
            {errors.email && <div className="auth-err">{errors.email}</div>}
          </div>

          <div className="auth-field">
            <label htmlFor="li-pass">Password</label>
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
                placeholder="Enter your password"
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
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spin" /> : null}
            {loading ? "Logging in…" : "Log in"}
            {!loading && Ic.arrow}
          </button>

          <div className="auth-div">or continue with</div>
          <SsoButtons verb="Continue" />

          <p className="auth-swap">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>

          <div className="auth-foot-legal">
            {Ic.lock}
            <span>
              By logging in, you agree to our <Link href="/syarat">Terms of Service</Link> and{" "}
              <Link href="/privasi">Privacy Policy</Link>.
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
