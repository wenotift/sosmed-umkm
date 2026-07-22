"use client";

// Bilingual copy for the auth screens with a persisted IDN/ENG toggle.
// Indonesian is the default. The choice is stored in localStorage and read
// hydration-safely via useSyncExternalStore (server + first client render use
// "id", then we reconcile with the stored value on subscribe — no mismatch).

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";

export type Lang = "id" | "en";

const KEY = "sosmed-auth-lang";
let lang: Lang = "id";
let started = false;
const listeners = new Set<() => void>();

function notify() {
  for (const cb of listeners) cb();
}

function ensureInit() {
  if (started || typeof window === "undefined") return;
  started = true;
  try {
    const s = window.localStorage.getItem(KEY);
    if ((s === "id" || s === "en") && s !== lang) {
      lang = s;
      notify();
    }
  } catch {
    /* ignore */
  }
}

export function setLang(l: Lang) {
  if (l === lang) return;
  lang = l;
  try {
    window.localStorage.setItem(KEY, l);
  } catch {
    /* ignore */
  }
  notify();
}

function subscribe(cb: () => void) {
  ensureInit();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useLang(): Lang {
  return useSyncExternalStore(
    subscribe,
    () => lang,
    () => "id",
  );
}

/* ---- dictionary -----------------------------------------------------------*/
export interface Dict {
  logoSub: string;
  badge: string;
  h1a: string;
  h1pre: string;
  leadLogin: string;
  leadSignup: string;
  featsLogin: { h: string; p: string }[];
  featsSignup: { h: string; p: string }[];
  trust: { h: string; p: string }[];
  googleContinue: string;
  googleSignup: string;
  terms: string;
  privacy: string;
  pwRules: string[];
  pwHint: string;
  // login
  welcome: string;
  loginSub: string;
  email: string;
  emailPh: string;
  password: string;
  passwordPh: string;
  forgot: string;
  loginBtn: string;
  loginBtnLoading: string;
  orContinue: string;
  noAccount: string;
  signupLink: string;
  legalPre: string;
  legalMid: string;
  legalEnd: string;
  // login errors
  errEmailRequired: string;
  errEmailInvalid: string;
  errPasswordRequired: string;
  errRestricted: string;
  errNotFound: string;
  errWrongPassword: string;
  errEmailUnconfirmed: string;
  errInvalidCredentials: string;
  errNetwork: string;
  errGeneric: string;
  // signup
  createAccount: string;
  signupSub: string;
  orSignupEmail: string;
  fullName: string;
  fullNamePh: string;
  emailPhSignup: string;
  passwordPhSignup: string;
  agreePre: string;
  agreeMid: string;
  createBtn: string;
  createBtnLoading: string;
  haveAccount: string;
  loginLink: string;
  footItems: { b: string; s: string }[];
  confirmTitle: string;
  confirmPre: string;
  confirmPost: string;
  goToLogin: string;
  wrongEmail: string;
  startOver: string;
  errNameRequired: string;
  errAgreeRequired: string;
  errRestrictedSignup: string;
  errEmailTaken: string;
  // forgot
  backToLogin: string;
  resetTitle: string;
  resetSub: string;
  sendReset: string;
  sending: string;
  checkEmail: string;
  checkEmailPre: string;
  checkEmailPost: string;
  useDifferent: string;
  remembered: string;
  demoNote: string;
  resetPasswordLink: string;
  // reset
  setNewTitle: string;
  setNewSubPre: string;
  setNewSubPost: string;
  newPassword: string;
  newPasswordPh: string;
  confirmPassword: string;
  confirmPasswordPh: string;
  updateBtn: string;
  updating: string;
  pwUpdatedTitle: string;
  pwUpdatedBody: string;
  linkExpiredTitle: string;
  linkExpiredBody: string;
  requestNew: string;
  back: string;
  errCreateNewPw: string;
  errPwNoMatch: string;
  // footer
  footProceed: string;
  footProceedPost: string;
  copyright: string;
  support: string;
}

const en: Dict = {
  logoSub: "AI-Native Automation Agent",
  badge: "AI-Native WhatsApp Agent",
  h1a: "Your AI Agent,",
  h1pre: "on ",
  leadLogin: "Automate conversations. Engage customers. Close more deals — 24/7 with AI.",
  leadSignup:
    "Build your AI agent to automate conversations, engage customers, and grow your business 24/7 on WhatsApp.",
  featsLogin: [
    { h: "AI-Native WhatsApp Agent", p: "Built natively for WhatsApp to understand, respond, and act like a human." },
    { h: "Always On. Always Smart.", p: "Handle thousands of chats simultaneously and never miss a customer." },
    { h: "Automate. Personalize. Convert.", p: "From FAQ to sales, our agent helps you nurture, qualify, and convert—automatically." },
  ],
  featsSignup: [
    { h: "AI-Native for WhatsApp", p: "Built natively to understand, respond, and act like a human." },
    { h: "Automate. Personalize. Convert.", p: "From FAQ to sales, our agent helps you nurture, qualify, and convert automatically." },
    { h: "24/7 Engagement", p: "Never miss a message. Engage customers instantly, anytime." },
    { h: "Secure & Reliable", p: "Enterprise-grade security to protect your data and your customers." },
  ],
  trust: [
    { h: "Enterprise-grade security", p: "Your data is encrypted and always protected." },
    { h: "No credit card required", p: "Start your 14-day free trial in just a few clicks." },
    { h: "24/7 Support", p: "We're here to help you succeed." },
  ],
  googleContinue: "Continue with Google",
  googleSignup: "Sign up with Google",
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  pwRules: [
    "At least 8 characters",
    "One uppercase letter (A–Z)",
    "One lowercase letter (a–z)",
    "One number (0–9)",
    "One symbol (!@#$…)",
  ],
  pwHint: "Use 8+ characters with upper & lower case, a number & a symbol.",
  welcome: "Welcome back! 👋",
  loginSub: "Log in to your Sosmed AI account.",
  email: "Email",
  emailPh: "you@email.com",
  password: "Password",
  passwordPh: "Enter your password",
  forgot: "Forgot password?",
  loginBtn: "Log in",
  loginBtnLoading: "Logging in…",
  orContinue: "or continue with",
  noAccount: "Don't have an account?",
  signupLink: "Sign up",
  legalPre: "By logging in, you agree to our ",
  legalMid: " and ",
  legalEnd: ".",
  errEmailRequired: "Email is required.",
  errEmailInvalid: "Enter a valid email address.",
  errPasswordRequired: "Enter your password.",
  errRestricted: "Access is still restricted — the app is under development.",
  errNotFound: "No account found with this email. Sign up first.",
  errWrongPassword: "Incorrect password. Try again.",
  errEmailUnconfirmed: "Please confirm your email first — check your inbox.",
  errInvalidCredentials: "Incorrect email or password.",
  errNetwork: "Couldn't reach the server. Check your connection and try again.",
  errGeneric: "Something went wrong. Please try again.",
  createAccount: "Create your account",
  signupSub: "Start building your AI Agent in just a few minutes.",
  orSignupEmail: "or sign up with email",
  fullName: "Full name",
  fullNamePh: "Enter your full name",
  emailPhSignup: "Enter your email",
  passwordPhSignup: "Create a password",
  agreePre: "I agree to the ",
  agreeMid: " and ",
  createBtn: "Create account",
  createBtnLoading: "Creating account…",
  haveAccount: "Already have an account?",
  loginLink: "Log in",
  footItems: [
    { b: "Enterprise-grade", s: "security" },
    { b: "Your data is always", s: "protected" },
    { b: "24/7 support", s: "when you need us" },
  ],
  confirmTitle: "Confirm your email",
  confirmPre: "We sent a verification link to ",
  confirmPost: ". Click it to activate your account, then log in.",
  goToLogin: "Go to login",
  wrongEmail: "Wrong email?",
  startOver: "Start over",
  errNameRequired: "Full name is required.",
  errAgreeRequired: "Please accept the Terms to continue.",
  errRestrictedSignup: "Sign-ups are still limited — the app is under development.",
  errEmailTaken: "This email is already registered. Try logging in.",
  backToLogin: "Back to login",
  resetTitle: "Reset your password",
  resetSub: "Enter your account email and we'll send you a link to set a new password.",
  sendReset: "Send reset link",
  sending: "Sending…",
  checkEmail: "Check your email",
  checkEmailPre: "If an account exists for ",
  checkEmailPost: ", we've sent a link to reset your password.",
  useDifferent: "Use a different email",
  remembered: "Remembered it?",
  demoNote: "Demo mode — email not connected. Continue reset here: ",
  resetPasswordLink: "Reset password →",
  setNewTitle: "Set a new password",
  setNewSubPre: "Choose a new password for ",
  setNewSubPost: ".",
  newPassword: "New password",
  newPasswordPh: "Create a new password",
  confirmPassword: "Confirm password",
  confirmPasswordPh: "Re-enter your new password",
  updateBtn: "Update password",
  updating: "Updating…",
  pwUpdatedTitle: "Password updated",
  pwUpdatedBody: "Your password has been changed. You can now log in with your new password.",
  linkExpiredTitle: "Link expired",
  linkExpiredBody: "This reset link is invalid or has expired. Request a new one to continue.",
  requestNew: "Request a new link",
  back: "Back",
  errCreateNewPw: "Create a new password.",
  errPwNoMatch: "Passwords don't match.",
  footProceed: "By proceeding you acknowledge that you have read, understood and agree to our ",
  footProceedPost: ".",
  copyright: "© 2026 Sosmed AI",
  support: "Support",
};

const id: Dict = {
  logoSub: "Agen Otomasi AI-Native",
  badge: "Agen WhatsApp AI-Native",
  h1a: "Agen AI Kamu,",
  h1pre: "di ",
  leadLogin: "Otomatiskan percakapan. Libatkan pelanggan. Tutup lebih banyak transaksi — 24/7 dengan AI.",
  leadSignup:
    "Bangun agen AI kamu untuk mengotomatiskan percakapan, melibatkan pelanggan, dan menumbuhkan bisnis 24/7 di WhatsApp.",
  featsLogin: [
    { h: "Agen WhatsApp AI-Native", p: "Dibangun langsung untuk WhatsApp agar memahami, merespons, dan bertindak layaknya manusia." },
    { h: "Selalu Aktif. Selalu Cerdas.", p: "Tangani ribuan chat sekaligus tanpa melewatkan satu pelanggan pun." },
    { h: "Otomatis. Personal. Konversi.", p: "Dari FAQ hingga penjualan, agen kami membantu memelihara, mengualifikasi, dan mengonversi—secara otomatis." },
  ],
  featsSignup: [
    { h: "AI-Native untuk WhatsApp", p: "Dibangun langsung untuk memahami, merespons, dan bertindak layaknya manusia." },
    { h: "Otomatis. Personal. Konversi.", p: "Dari FAQ hingga penjualan, agen kami membantu memelihara, mengualifikasi, dan mengonversi secara otomatis." },
    { h: "Keterlibatan 24/7", p: "Tak pernah melewatkan pesan. Libatkan pelanggan seketika, kapan saja." },
    { h: "Aman & Andal", p: "Keamanan tingkat enterprise untuk melindungi data kamu dan pelangganmu." },
  ],
  trust: [
    { h: "Keamanan tingkat enterprise", p: "Data kamu dienkripsi dan selalu terlindungi." },
    { h: "Tanpa kartu kredit", p: "Mulai uji coba gratis 14 hari hanya dengan beberapa klik." },
    { h: "Dukungan 24/7", p: "Kami siap membantu kamu sukses." },
  ],
  googleContinue: "Lanjutkan dengan Google",
  googleSignup: "Daftar dengan Google",
  terms: "Ketentuan Layanan",
  privacy: "Kebijakan Privasi",
  pwRules: [
    "Minimal 8 karakter",
    "Satu huruf besar (A–Z)",
    "Satu huruf kecil (a–z)",
    "Satu angka (0–9)",
    "Satu simbol (!@#$…)",
  ],
  pwHint: "Gunakan 8+ karakter dengan huruf besar & kecil, angka & simbol.",
  welcome: "Selamat datang kembali! 👋",
  loginSub: "Masuk ke akun Sosmed AI kamu.",
  email: "Email",
  emailPh: "kamu@email.com",
  password: "Kata sandi",
  passwordPh: "Masukkan kata sandi",
  forgot: "Lupa kata sandi?",
  loginBtn: "Masuk",
  loginBtnLoading: "Masuk…",
  orContinue: "atau lanjutkan dengan",
  noAccount: "Belum punya akun?",
  signupLink: "Daftar",
  legalPre: "Dengan masuk, kamu menyetujui ",
  legalMid: " dan ",
  legalEnd: " kami.",
  errEmailRequired: "Email wajib diisi.",
  errEmailInvalid: "Masukkan alamat email yang valid.",
  errPasswordRequired: "Masukkan kata sandi kamu.",
  errRestricted: "Akses masih dibatasi — aplikasi sedang dalam pengembangan.",
  errNotFound: "Akun dengan email ini tidak ditemukan. Daftar dulu.",
  errWrongPassword: "Kata sandi salah. Coba lagi.",
  errEmailUnconfirmed: "Konfirmasi email kamu dulu — cek kotak masuk.",
  errInvalidCredentials: "Email atau kata sandi salah.",
  errNetwork: "Tidak dapat terhubung ke server. Periksa koneksi kamu dan coba lagi.",
  errGeneric: "Terjadi kesalahan. Silakan coba lagi.",
  createAccount: "Buat akun kamu",
  signupSub: "Mulai bangun Agen AI kamu hanya dalam beberapa menit.",
  orSignupEmail: "atau daftar dengan email",
  fullName: "Nama lengkap",
  fullNamePh: "Masukkan nama lengkap kamu",
  emailPhSignup: "Masukkan email kamu",
  passwordPhSignup: "Buat kata sandi",
  agreePre: "Saya menyetujui ",
  agreeMid: " dan ",
  createBtn: "Buat akun",
  createBtnLoading: "Membuat akun…",
  haveAccount: "Sudah punya akun?",
  loginLink: "Masuk",
  footItems: [
    { b: "Keamanan", s: "kelas enterprise" },
    { b: "Data kamu selalu", s: "terlindungi" },
    { b: "Dukungan 24/7", s: "kapan pun dibutuhkan" },
  ],
  confirmTitle: "Konfirmasi email kamu",
  confirmPre: "Kami mengirim tautan verifikasi ke ",
  confirmPost: ". Klik untuk mengaktifkan akun kamu, lalu masuk.",
  goToLogin: "Ke halaman masuk",
  wrongEmail: "Salah email?",
  startOver: "Mulai ulang",
  errNameRequired: "Nama lengkap wajib diisi.",
  errAgreeRequired: "Setujui Ketentuan untuk melanjutkan.",
  errRestrictedSignup: "Pendaftaran masih terbatas — aplikasi sedang dalam pengembangan.",
  errEmailTaken: "Email ini sudah terdaftar. Coba masuk.",
  backToLogin: "Kembali ke masuk",
  resetTitle: "Atur ulang kata sandi",
  resetSub: "Masukkan email akun kamu dan kami akan mengirim tautan untuk membuat kata sandi baru.",
  sendReset: "Kirim tautan reset",
  sending: "Mengirim…",
  checkEmail: "Cek email kamu",
  checkEmailPre: "Jika ada akun untuk ",
  checkEmailPost: ", kami telah mengirim tautan untuk mengatur ulang kata sandi kamu.",
  useDifferent: "Gunakan email lain",
  remembered: "Sudah ingat?",
  demoNote: "Mode demo — email belum tersambung. Lanjutkan reset di sini: ",
  resetPasswordLink: "Reset kata sandi →",
  setNewTitle: "Atur kata sandi baru",
  setNewSubPre: "Pilih kata sandi baru untuk ",
  setNewSubPost: ".",
  newPassword: "Kata sandi baru",
  newPasswordPh: "Buat kata sandi baru",
  confirmPassword: "Konfirmasi kata sandi",
  confirmPasswordPh: "Masukkan ulang kata sandi baru",
  updateBtn: "Perbarui kata sandi",
  updating: "Memperbarui…",
  pwUpdatedTitle: "Kata sandi diperbarui",
  pwUpdatedBody: "Kata sandi kamu telah diubah. Sekarang kamu bisa masuk dengan kata sandi baru.",
  linkExpiredTitle: "Tautan kedaluwarsa",
  linkExpiredBody: "Tautan reset ini tidak valid atau sudah kedaluwarsa. Minta yang baru untuk melanjutkan.",
  requestNew: "Minta tautan baru",
  back: "Kembali",
  errCreateNewPw: "Buat kata sandi baru.",
  errPwNoMatch: "Kata sandi tidak cocok.",
  footProceed: "Dengan melanjutkan, kamu menyatakan telah membaca, memahami, dan menyetujui ",
  footProceedPost: " kami.",
  copyright: "© 2026 Sosmed AI",
  support: "Bantuan",
};

const DICT: Record<Lang, Dict> = { id, en };

export function useT(): Dict {
  return DICT[useLang()];
}

/* ---- IDN / ENG toggle -----------------------------------------------------*/
export function LangToggle() {
  const lang = useLang();
  return (
    <div className="auth-lang" role="group" aria-label="Language">
      <button
        type="button"
        className={"auth-lang-btn" + (lang === "id" ? " on" : "")}
        aria-pressed={lang === "id"}
        onClick={() => setLang("id")}
      >
        IDN
      </button>
      <button
        type="button"
        className={"auth-lang-btn" + (lang === "en" ? " on" : "")}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        ENG
      </button>
    </div>
  );
}

/* ---- minimal top bar (logo only) -----------------------------------------*/
export function AuthNav() {
  return (
    <header className="auth-nav">
      <Link href="/" className="auth-nav-logo" aria-label="Sosmed AI — beranda">
        <Image
          src="/logo/sosmed-ai-logo-black-version.png"
          alt="Sosmed AI"
          width={132}
          height={33}
          priority
        />
      </Link>
    </header>
  );
}

/* ---- page footer — minimal, no divider (Cursor-style) --------------------*/
export function AuthFooter() {
  const t = useT();
  return (
    <footer className="auth-footer">
      <Link href="/syarat">{t.terms}</Link>
      <span className="auth-footer-dot" aria-hidden="true">·</span>
      <Link href="/privasi">{t.privacy}</Link>
      <span className="auth-footer-dot" aria-hidden="true">·</span>
      <Link href="/bantuan">{t.support}</Link>
      <span className="auth-footer-dot" aria-hidden="true">·</span>
      <span>{t.copyright}</span>
    </footer>
  );
}
