import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { affiliateEmail } from "@/lib/emailTemplates";

export const runtime = "nodejs";

const FROM = "Sosmed AI <halo@sosmed.io>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Normalize an Indonesian mobile number to 628xxxxxxxxx (or null if invalid).
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

  // ---- server-side validation ----
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const promote = String(body.promote ?? "").trim();
  const waRaw = String(body.whatsapp ?? "").trim();

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Nama wajib diisi.";
  if (!email) fields.email = "Email wajib diisi.";
  else if (!EMAIL_RE.test(email)) fields.email = "Format email tidak valid.";

  // WhatsApp is optional; if provided it must be a valid ID mobile number.
  let whatsapp = "";
  if (waRaw) {
    const norm = normalizeWa(waRaw);
    if (!norm) fields.whatsapp = "Nomor WhatsApp tidak valid.";
    else whatsapp = norm;
  }

  if (Object.keys(fields).length) {
    return NextResponse.json({ error: "validation", fields }, { status: 400 });
  }

  if (!isSupabaseConfigured || !supabase) {
    console.error("[afiliasi] Supabase not configured on server");
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  // ---- INSERT FIRST (no .select(); insert-only RLS) ----
  const { error } = await supabase
    .from("affiliates")
    .insert({ name, email, whatsapp, promote, source: "afiliasi" });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    console.error("[afiliasi] insert failed:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  // ---- insert OK: send one confirmation (applicant only); never fail over email ----
  try {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const sent = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Pendaftaran afiliasi Sosmed AI diterima ✦",
      html: affiliateEmail({ name, email }),
    });
    if (sent.error) console.error("[afiliasi] resend returned error", sent.error);
    else console.log(`[afiliasi] email sent — id=${sent.data?.id} to ${email}`);
  } catch (e) {
    console.error("[afiliasi] email send failed (signup still saved):", e);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
