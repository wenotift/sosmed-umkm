// Unified auth for Sosmed AI, with two interchangeable backends:
//
//  • Supabase Auth  — used when NEXT_PUBLIC_SUPABASE_* are set. Real accounts,
//    email verification, password-reset emails, and Google OAuth.
//  • Local fallback — browser-only (localStorage + SHA-256) so the app fully
//    works in demo/preview environments where Supabase isn't configured.
//
// The public API is backend-agnostic; components never branch on the backend
// except for a couple of UX differences (email-confirmation, OAuth redirect),
// exposed via `usingSupabase`.

import { supabase, isSupabaseConfigured } from "./supabase";
import { SITE_URL } from "./seo";

export const usingSupabase = isSupabaseConfigured;

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
  | "invalid_credentials"
  | "email_unconfirmed"
  | "invalid_token"
  | "network"
  | "unknown";

export class AuthError extends Error {
  code: AuthErrorCode;
  constructor(code: AuthErrorCode) {
    super(code);
    this.code = code;
  }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function passwordProblem(pw: string): string | null {
  if (pw.length < 8) return "Use at least 8 characters.";
  if (!/[a-zA-Z]/.test(pw) || !/\d/.test(pw)) return "Mix letters and numbers.";
  return null;
}

function norm(email: string): string {
  return email.trim().toLowerCase();
}
function appOrigin(): string {
  return typeof window !== "undefined" ? window.location.origin : SITE_URL;
}

// ===========================================================================
// Session cache + pub/sub (drives useSyncExternalStore in the dashboard guard)
// ===========================================================================
let cached: Session | null = null;
let initialized = false;
let initStarted = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}
function setCached(s: Session | null) {
  cached = s;
  initialized = true;
  notify();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSupabaseSession(session: any): Session | null {
  const u = session?.user;
  if (!u) return null;
  const meta = u.user_metadata ?? {};
  return {
    id: u.id,
    email: u.email ?? "",
    name: meta.full_name || meta.name || (u.email ? u.email.split("@")[0] : "User"),
    provider: u.app_metadata?.provider === "google" ? "google" : "email",
    loginAt: Date.now(),
  };
}

function ensureInit() {
  if (initStarted || typeof window === "undefined") return;
  initStarted = true;
  if (supabase) {
    supabase.auth
      .getSession()
      .then(({ data }) => setCached(mapSupabaseSession(data.session)))
      .catch(() => setCached(null));
    supabase.auth.onAuthStateChange((_event, session) => {
      setCached(mapSupabaseSession(session));
    });
  } else {
    setCached(readLocalSession());
  }
}

export function subscribeSession(cb: () => void): () => void {
  ensureInit();
  listeners.add(cb);
  return () => listeners.delete(cb);
}
// undefined = not resolved yet (renders a loading gate, no hydration mismatch)
export function sessionSnapshot(): Session | null | undefined {
  return initialized ? cached : undefined;
}

// ===========================================================================
// Local backend (fallback)
// ===========================================================================
const USERS_KEY = "sosmed-auth-users-v1";
const SESSION_KEY = "sosmed-auth-session-v1";
const RESET_KEY = "sosmed-auth-resets-v1";

interface LocalAccount {
  id: string;
  name: string;
  email: string;
  passHash: string;
  provider: "email" | "google";
  createdAt: number;
}

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
function writeLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
function uid(prefix: string): string {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function localUsers(): LocalAccount[] {
  return read<LocalAccount[]>(USERS_KEY, []);
}
function readLocalSession(): Session | null {
  return read<Session | null>(SESSION_KEY, null);
}
function toSession(acc: LocalAccount): Session {
  return { id: acc.id, name: acc.name, email: acc.email, provider: acc.provider, loginAt: Date.now() };
}

async function localRegister(name: string, email: string, password: string): Promise<Session> {
  const users = localUsers();
  if (users.some((u) => u.email === email)) throw new AuthError("email_taken");
  const acc: LocalAccount = {
    id: uid("u"),
    name: name.trim(),
    email,
    passHash: await sha256(password),
    provider: "email",
    createdAt: Date.now(),
  };
  writeLS(USERS_KEY, [...users, acc]);
  const s = toSession(acc);
  writeLS(SESSION_KEY, s);
  return s;
}
async function localLogin(email: string, password: string): Promise<Session> {
  const acc = localUsers().find((u) => u.email === email);
  if (!acc) throw new AuthError("not_found");
  if (acc.passHash !== (await sha256(password))) throw new AuthError("wrong_password");
  const s = toSession(acc);
  writeLS(SESSION_KEY, s);
  return s;
}
function localGoogle(): Session {
  const email = "demo.google@sosmed.io";
  const users = localUsers();
  let acc = users.find((u) => u.email === email);
  if (!acc) {
    acc = { id: uid("u"), name: "Pengguna Google", email, passHash: "", provider: "google", createdAt: Date.now() };
    writeLS(USERS_KEY, [...users, acc]);
  }
  const s = toSession(acc);
  writeLS(SESSION_KEY, s);
  return s;
}

interface ResetRecord {
  email: string;
  exp: number;
}
type ResetMap = Record<string, ResetRecord>;

function localCreateResetToken(email: string): string | null {
  if (!localUsers().some((u) => u.email === email)) return null;
  const token = uid("rst").replace("rst_", "");
  const map = read<ResetMap>(RESET_KEY, {});
  map[token] = { email, exp: Date.now() + 60 * 60 * 1000 };
  writeLS(RESET_KEY, map);
  return token;
}
export function emailForResetToken(token: string): string | null {
  const rec = read<ResetMap>(RESET_KEY, {})[token];
  if (!rec || rec.exp < Date.now()) return null;
  return rec.email;
}
async function localCompleteReset(token: string, newPassword: string): Promise<void> {
  const map = read<ResetMap>(RESET_KEY, {});
  const rec = map[token];
  if (!rec || rec.exp < Date.now()) throw new AuthError("invalid_token");
  const users = localUsers();
  const idx = users.findIndex((u) => u.email === rec.email);
  if (idx < 0) throw new AuthError("invalid_token");
  users[idx] = { ...users[idx], passHash: await sha256(newPassword), provider: "email" };
  writeLS(USERS_KEY, users);
  delete map[token];
  writeLS(RESET_KEY, map);
}

// ===========================================================================
// Unified public API
// ===========================================================================
export async function register(input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ needsConfirmation: boolean }> {
  const email = norm(input.email);
  if (supabase) {
    let data, error;
    try {
      ({ data, error } = await supabase.auth.signUp({
        email,
        password: input.password,
        options: {
          data: { full_name: input.name.trim() },
          emailRedirectTo: `${appOrigin()}/dashboard`,
        },
      }));
    } catch {
      throw new AuthError("network"); // couldn't reach Supabase
    }
    if (error) {
      if (/already|registered|exists/i.test(error.message)) throw new AuthError("email_taken");
      if (/fetch|network/i.test(error.message)) throw new AuthError("network");
      throw new AuthError("unknown");
    }
    // No session means email confirmation is required before first login.
    return { needsConfirmation: !data!.session };
  }
  const s = await localRegister(input.name, email, input.password);
  setCached(s);
  return { needsConfirmation: false };
}

export async function login(input: { email: string; password: string }): Promise<void> {
  const email = norm(input.email);
  if (supabase) {
    let error;
    try {
      ({ error } = await supabase.auth.signInWithPassword({ email, password: input.password }));
    } catch {
      throw new AuthError("network");
    }
    if (error) {
      if (/confirm/i.test(error.message)) throw new AuthError("email_unconfirmed");
      if (/fetch|network/i.test(error.message)) throw new AuthError("network");
      throw new AuthError("invalid_credentials");
    }
    return;
  }
  const s = await localLogin(email, input.password);
  setCached(s);
}

export async function loginWithGoogle(): Promise<void> {
  if (supabase) {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${appOrigin()}/dashboard` },
    });
    return; // browser redirects to Google
  }
  setCached(localGoogle());
}

export async function requestReset(email: string): Promise<{ devToken: string | null }> {
  const e = norm(email);
  if (supabase) {
    try {
      await supabase.auth.resetPasswordForEmail(e, { redirectTo: `${appOrigin()}/reset-password` });
    } catch {
      throw new AuthError("network");
    }
    return { devToken: null };
  }
  return { devToken: localCreateResetToken(e) };
}

export async function completeReset(opts: { token?: string; password: string }): Promise<void> {
  if (supabase) {
    // The reset email link establishes a recovery session; update the password.
    let error;
    try {
      ({ error } = await supabase.auth.updateUser({ password: opts.password }));
    } catch {
      throw new AuthError("network");
    }
    if (error) throw new AuthError("invalid_token");
    return;
  }
  await localCompleteReset(opts.token ?? "", opts.password);
}

export async function logout(): Promise<void> {
  if (supabase) {
    await supabase.auth.signOut();
    return; // onAuthStateChange clears the cache
  }
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
  setCached(null);
}
