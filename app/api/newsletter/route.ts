import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { newsletterEmail } from "@/lib/emailTemplates";

export const runtime = "nodejs";

const FROM = "Sosmed AI <halo@sosmed.io>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // ---- server-side validate (email only) ----
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "validation", fields: { email: "Format email tidak valid." } },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured || !supabase) {
    console.error("[newsletter] Supabase not configured on server");
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  // ---- INSERT FIRST (no .select(); insert-only RLS) ----
  const { error } = await supabase.from("newsletter").insert({ email, source: "blog" });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    console.error("[newsletter] insert failed:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  // ---- insert OK: send one confirmation email; never fail the subscribe over email ----
  try {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const sent = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Kamu berlangganan newsletter Sosmed AI ✦",
      html: newsletterEmail(email),
    });
    if (sent.error) console.error("[newsletter] resend returned error", sent.error);
    else console.log(`[newsletter] email sent — id=${sent.data?.id} to ${email}`);
  } catch (e) {
    console.error("[newsletter] email send failed (subscribe still saved):", e);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
