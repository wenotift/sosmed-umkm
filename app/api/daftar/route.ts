import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { confirmationEmail, ownerNotificationEmail } from "@/lib/emailTemplates";

export const runtime = "nodejs";

// Lead notifications go here (hardcoded per request).
const OWNER_EMAIL = "hi@sosmed.io";
const FROM = "Sosmed AI <halo@sosmed.io>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Normalize an Indonesian mobile number to canonical 628xxxxxxxxx (or null if invalid).
function normalizeWa(raw: string): string | null {
  let d = String(raw).replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (d.startsWith("8")) d = "62" + d;
  if (!/^628\d{7,11}$/.test(d)) return null;
  return d;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // ---- server-side re-validation (never trust the client) ----
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const business_name = String(body.business ?? body.business_name ?? "").trim();
  const whatsapp = normalizeWa(String(body.whatsapp ?? ""));

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Nama wajib diisi.";
  if (!email) fields.email = "Email wajib diisi.";
  else if (!EMAIL_RE.test(email)) fields.email = "Format email tidak valid.";
  if (!business_name) fields.business = "Nama bisnis wajib diisi.";
  if (!whatsapp) fields.whatsapp = "Nomor WhatsApp tidak valid.";
  if (Object.keys(fields).length) {
    return NextResponse.json({ error: "validation", fields }, { status: 400 });
  }

  if (!isSupabaseConfigured || !supabase) {
    console.error("[daftar] Supabase not configured on server");
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const row = { name, email, business_name, whatsapp: whatsapp as string, source: "daftar" };

  // ---- INSERT FIRST (no .select() so it works under insert-only RLS) ----
  const { error } = await supabase.from("waitlist").insert(row);
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    console.error("[daftar] insert failed:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  // ---- insert OK: send both emails; NEVER fail the signup over email ----
  try {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const confirm = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Kamu masuk waitlist Sosmed AI 🎉",
      html: confirmationEmail(row),
    });

    const owner = await resend.emails.send({
      from: FROM,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `🔔 Waitlist baru: ${name} (${business_name})`,
      html: ownerNotificationEmail(row),
    });

    if (confirm.error || owner.error) {
      console.error("[daftar] resend returned error", {
        confirm: confirm.error,
        owner: owner.error,
      });
    } else {
      console.log(
        `[daftar] emails sent — confirmation id=${confirm.data?.id} owner id=${owner.data?.id} (to ${OWNER_EMAIL}, reply-to ${email})`,
      );
    }
  } catch (e) {
    console.error("[daftar] email send failed (signup still saved):", e);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
