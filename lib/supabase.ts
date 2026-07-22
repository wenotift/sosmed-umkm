import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public (browser-safe) Supabase credentials. NEXT_PUBLIC_* vars are inlined at
// build time, so these must be set in .env.local AND in Vercel before deploying.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// True only when both credentials are present. When false the app runs in
// "stub/demo mode" — the /daftar form validates and shows success without writing.
export const isSupabaseConfigured = Boolean(url && anonKey);

// Singleton client, or null while unconfigured (so importing this never throws).
// flowType "implicit": OAuth and email-confirmation redirects return the tokens
// directly in the URL (no PKCE code-verifier needed). This is the reliable
// choice for a client-only app — PKCE breaks when the redirect is opened in a
// different browser/storage than the one that started the flow (a common cause
// of "auth succeeds but bounces back to /login").
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        flowType: "implicit",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
