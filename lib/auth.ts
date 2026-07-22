// Client-side auth for the Sosmed AI proto.
//
// This is a self-contained, browser-only implementation: accounts, sessions and
// password-reset tokens live in localStorage, and passwords are SHA-256 hashed
// (never stored in plain text). It makes registration, login, logout, password
// reset and route protection genuinely work today without a backend.
//
// It is intentionally swappable: every function below maps 1:1 to a Supabase
// Auth call (signUp / signInWithPassword / resetPasswordForEmail / getSession /
// signOut), so moving to a real backend is a focused change, not a rewrite.
// Do NOT treat localStorage auth as production-secure — it's a demo.

const USERS_KEY = "sosmed-auth-users-v1";
const SESSION_KEY = "sosmed-auth-session-v1";
const RESET_KEY = "sosmed-auth-resets-v1";

export interface Account {
  id: string;
  name: string;
  email: string;
  passHash: string;
  provider: "email" | "google";
  createdAt: number;
}

export interface Session {
  id: string;
  name: string;
  email: string;
  provider: "email" | "google";
  loginAt: number;
}

export type AuthErrorCode =
  | "email_taken"
  | "not_found"
  | "wrong_password"
  | "invalid_token";

export class AuthError extends Error {
  code: AuthErrorCode;
  constructor(code: AuthErrorCode) {
    super(code);
    this.code = code;
  }
}

// ---- helpers ---------------------------------------------------------------
async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full/blocked — non-fatal */
  }
}
function uid(prefix: string): string {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function norm(email: string): string {
  return email.trim().toLowerCase();
}

// ---- accounts / session ----------------------------------------------------
export function getUsers(): Account[] {
  return read<Account[]>(USERS_KEY, []);
}
export function getSession(): Session | null {
  return read<Session | null>(SESSION_KEY, null);
}
export function logout() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
export function accountExists(email: string): boolean {
  const e = norm(email);
  return getUsers().some((u) => u.email === e);
}

// ---- reactive session read (for useSyncExternalStore) ----------------------
// Cached so the snapshot is referentially stable while the stored value is
// unchanged (React requires this to avoid an infinite render loop).
let _rawCache: string | null = null;
let _sessionCache: Session | null = null;
export function sessionSnapshot(): Session | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(SESSION_KEY);
  } catch {
    raw = null;
  }
  if (raw !== _rawCache) {
    _rawCache = raw;
    _sessionCache = raw ? (JSON.parse(raw) as Session) : null;
  }
  return _sessionCache;
}
export function subscribeSession(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function startSession(acc: Account): Session {
  const s: Session = {
    id: acc.id,
    name: acc.name,
    email: acc.email,
    provider: acc.provider,
    loginAt: Date.now(),
  };
  write(SESSION_KEY, s);
  return s;
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
}): Promise<Session> {
  const email = norm(input.email);
  const users = getUsers();
  if (users.some((u) => u.email === email)) throw new AuthError("email_taken");
  const acc: Account = {
    id: uid("u"),
    name: input.name.trim(),
    email,
    passHash: await sha256(input.password),
    provider: "email",
    createdAt: Date.now(),
  };
  write(USERS_KEY, [...users, acc]);
  return startSession(acc);
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<Session> {
  const email = norm(input.email);
  const acc = getUsers().find((u) => u.email === email);
  if (!acc) throw new AuthError("not_found");
  if (acc.passHash !== (await sha256(input.password)))
    throw new AuthError("wrong_password");
  return startSession(acc);
}

// OAuth stand-in: signs in (or provisions) a demo Google account so the SSO
// button leads to a real, protected session for the proto.
export function loginWithGoogleDemo(): Session {
  const email = "demo.google@sosmed.io";
  const users = getUsers();
  let acc = users.find((u) => u.email === email);
  if (!acc) {
    acc = {
      id: uid("u"),
      name: "Pengguna Google",
      email,
      passHash: "",
      provider: "google",
      createdAt: Date.now(),
    };
    write(USERS_KEY, [...users, acc]);
  }
  return startSession(acc);
}

// ---- password reset --------------------------------------------------------
interface ResetRecord {
  email: string;
  exp: number;
}
type ResetMap = Record<string, ResetRecord>;

// Returns a reset token when the account exists (in production this token is
// emailed via resetPasswordForEmail); returns null when no account matches.
export function createResetToken(email: string): string | null {
  const e = norm(email);
  if (!accountExists(e)) return null;
  const token = uid("rst").replace("rst_", "");
  const map = read<ResetMap>(RESET_KEY, {});
  map[token] = { email: e, exp: Date.now() + 60 * 60 * 1000 }; // 1 hour
  write(RESET_KEY, map);
  return token;
}

export function emailForResetToken(token: string): string | null {
  const rec = read<ResetMap>(RESET_KEY, {})[token];
  if (!rec || rec.exp < Date.now()) return null;
  return rec.email;
}

export async function completeReset(
  token: string,
  newPassword: string,
): Promise<void> {
  const map = read<ResetMap>(RESET_KEY, {});
  const rec = map[token];
  if (!rec || rec.exp < Date.now()) throw new AuthError("invalid_token");
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === rec.email);
  if (idx < 0) throw new AuthError("invalid_token");
  users[idx] = { ...users[idx], passHash: await sha256(newPassword), provider: "email" };
  write(USERS_KEY, users);
  delete map[token];
  write(RESET_KEY, map);
}

// Shared password rule (mirrors the signup hint).
export function passwordProblem(pw: string): string | null {
  if (pw.length < 8) return "Use at least 8 characters.";
  if (!/[a-zA-Z]/.test(pw) || !/\d/.test(pw)) return "Mix letters and numbers.";
  return null;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
