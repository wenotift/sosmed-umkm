# Authentication setup

The app ships with a **dual-backend** auth system (`lib/auth.ts`):

- **Local fallback** (default when Supabase env vars are missing): accounts,
  sessions and reset tokens live in the browser (localStorage + SHA-256). Great
  for previews/demos; **not** production-secure.
- **Supabase Auth** (used automatically once the env vars below are set): real
  accounts, email verification, password-reset emails, and Google OAuth.

No code changes are needed to switch — it's driven by `isSupabaseConfigured`.

## 1. Environment variables

Create `.env.local` (and set the same in Vercel → Project → Settings → Environment
Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
```

Find both in Supabase → Project Settings → API.

## 2. Enable email auth + confirmation

Supabase dashboard → **Authentication → Providers → Email**: enabled by default.

- **Confirm email = ON** → after signup the user gets a verification email and
  the UI shows a "Confirm your email" screen (this is what powers item #3).
- **Confirm email = OFF** → signup logs the user straight into `/dashboard`.

## 3. Redirect URLs

Authentication → **URL Configuration**:

- **Site URL**: `https://umkm.sosmed.io` (and `http://localhost:3000` for local dev)
- **Redirect URLs** — add:
  - `https://umkm.sosmed.io/dashboard`
  - `https://umkm.sosmed.io/reset-password`
  - `http://localhost:3000/dashboard`
  - `http://localhost:3000/reset-password`

The code sends users to `/dashboard` after signup/OAuth and to `/reset-password`
from the reset email (`resetPasswordForEmail(..., { redirectTo })`).

## 4. Password reset emails (item #2)

Works out of the box via Supabase's built-in mailer. For production volume/branding,
configure a custom SMTP (Authentication → Emails → SMTP Settings) — you already use
Resend for the waitlist, so the same sender/domain can be reused. Customize the
"Reset Password" template if desired.

## 5. Google OAuth (item #4)

1. Google Cloud Console → create OAuth 2.0 credentials (Web application).
2. Authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. Supabase → Authentication → Providers → **Google** → paste Client ID + Secret, enable.

The "Continue/Sign up with Google" button calls `signInWithOAuth({ provider: "google" })`.

## How the pieces map

| UI | `lib/auth.ts` | Supabase call |
|----|---------------|----------------|
| Signup | `register()` | `auth.signUp` |
| Login | `login()` | `auth.signInWithPassword` |
| Google button | `loginWithGoogle()` | `auth.signInWithOAuth` |
| Forgot password | `requestReset()` | `auth.resetPasswordForEmail` |
| Reset password | `completeReset()` | `auth.updateUser({ password })` |
| Logout | `logout()` | `auth.signOut` |
| Route guard / session | `sessionSnapshot()` + `subscribeSession()` | `auth.getSession` + `onAuthStateChange` |

## Note on the dashboard data

The `/dashboard` UI is currently a self-contained demo store (localStorage,
seeded "Kopi Senja" data). Auth gates access to it, but each signed-in user still
sees the same demo tenant until the dashboard is wired to real per-user data
(the natural next step after auth).
