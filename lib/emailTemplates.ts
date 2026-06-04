// Email templates for /daftar — ported verbatim from the approved designs
// (email-confirmation-v2.html / email-owner-notification-v2.html). User-supplied
// values are HTML-escaped before interpolation.

const esc = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type Signup = {
  name: string;
  business_name: string;
  email: string;
  whatsapp: string; // normalized 628xxxxxxxxx
  source: string;
};

/* ---- EMAIL 1: confirmation (to the signup) ---- */
export function confirmationEmail(s: Signup): string {
  const name = esc(s.name);
  const business = esc(s.business_name);
  const email = esc(s.email);
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Konfirmasi Waitlist — Sosmed AI</title>
</head>
<body style="margin:0;padding:0;background:#F4F2F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2F8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border-radius:20px;overflow:hidden;border:1px solid #ECEAF1;box-shadow:0 6px 28px rgba(22,18,31,.05);">

          <!-- header: gradient block, white logo -->
          <tr>
            <td style="padding:26px 36px;background:#6B4EFF;background:linear-gradient(135deg,#7B5CFF 0%,#6B4EFF 50%,#5638E0 100%);">
              <img src="https://umkm.sosmed.io/logo/sosmed-ai-logo-white-version.png" height="30" alt="Sosmed AI" style="display:block;border:0;height:30px;width:auto;max-width:160px;">
            </td>
          </tr>

          <!-- hero -->
          <tr>
            <td style="padding:40px 36px 0;">
              <div style="display:inline-block;background:#F1ECFB;color:#6B4EFF;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:6px 12px;border-radius:999px;margin-bottom:20px;">Early Access</div>
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.25;font-weight:800;color:#16121F;letter-spacing:-.02em;">
                Kamu resmi masuk waitlist 🎉
              </h1>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#4A4458;">
                Halo <strong>${name}</strong> — terima kasih sudah daftar early access untuk <strong>${business}</strong>.
              </p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.65;color:#4A4458;">
                Kamu sekarang ada di antrian <strong>100 founding user pertama</strong>. Artinya harga launch kamu <strong style="color:#6B4EFF;">dikunci selamanya</strong> — bahkan setelah harga reguler naik 15–25%.
              </p>

              <!-- AI clarifier -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="padding:14px 18px;background:#FAF9FC;border:1px solid #F0EEF4;border-left:3px solid #6B4EFF;border-radius:10px;">
                    <p style="margin:0;font-size:13.5px;line-height:1.6;color:#4A4458;">
                      <strong style="color:#16121F;">Ini AI beneran di WhatsApp</strong> — bukan chatbot otomatis berbasis skrip. Sosmed AI paham maksud pelanggan dan bales natural, jadi customer kamu ngobrol kayak sama orang, bukan robot kaku.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- what you'll get: 4-pillar services strip -->
          <tr>
            <td style="padding:0 36px;">
              <p style="margin:0 0 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#9A93A8;">4 sistem dalam 1 langganan</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF9FC;border:1px solid #F0EEF4;border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;">

                    <!-- pillar row -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="34" style="vertical-align:top;">
                          <div style="width:30px;height:30px;background:#F1ECFB;border-radius:8px;text-align:center;line-height:30px;font-size:15px;">🤖</div>
                        </td>
                        <td style="vertical-align:top;padding-left:12px;">
                          <p style="margin:0 0 1px;font-size:14px;font-weight:700;color:#16121F;">Order Bot AI</p>
                          <p style="margin:0;font-size:13px;line-height:1.45;color:#6B6577;">AI handle order customer dari sapaan sampai konfirmasi bayar.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="34" style="vertical-align:top;">
                          <div style="width:30px;height:30px;background:#F1ECFB;border-radius:8px;text-align:center;line-height:30px;font-size:15px;">📱</div>
                        </td>
                        <td style="vertical-align:top;padding-left:12px;">
                          <p style="margin:0 0 1px;font-size:14px;font-weight:700;color:#16121F;">Menu Digital + QR Meja</p>
                          <p style="margin:0;font-size:13px;line-height:1.45;color:#6B6577;">Customer scan, pilih, order langsung lewat WhatsApp.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="34" style="vertical-align:top;">
                          <div style="width:30px;height:30px;background:#F1ECFB;border-radius:8px;text-align:center;line-height:30px;font-size:15px;">⭐</div>
                        </td>
                        <td style="vertical-align:top;padding-left:12px;">
                          <p style="margin:0 0 1px;font-size:14px;font-weight:700;color:#16121F;">Sistem Poin &amp; Member</p>
                          <p style="margin:0;font-size:13px;line-height:1.45;color:#6B6577;">Database member otomatis, pelanggan punya alasan balik.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="34" style="vertical-align:top;">
                          <div style="width:30px;height:30px;background:#F1ECFB;border-radius:8px;text-align:center;line-height:30px;font-size:15px;">📊</div>
                        </td>
                        <td style="vertical-align:top;padding-left:12px;">
                          <p style="margin:0 0 1px;font-size:14px;font-weight:700;color:#16121F;">Kelola via WhatsApp</p>
                          <p style="margin:0;font-size:13px;line-height:1.45;color:#6B6577;">Revenue, top menu, top customer — semua dari chat.</p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- what's next -->
          <tr>
            <td style="padding:28px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F6FF;border:1px solid #E9E3FB;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6B4EFF;">Apa selanjutnya?</p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#4A4458;">
                      Tim kami hubungi kamu via <strong>WhatsApp</strong> begitu akses siap. Gak perlu lakukan apa-apa — cukup tunggu kabar.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 36px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:12px;background:#16121F;">
                    <a href="https://umkm.sosmed.io/harga" style="display:inline-block;padding:14px 30px;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;">Lihat Paket &amp; Fitur →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:22px 36px 30px;border-top:1px solid #F2F0F7;background:#FCFBFE;">
              <p style="margin:0 0 4px;font-size:12px;line-height:1.5;color:#9A93A8;">
                Email ini dikirim ke ${email} karena kamu mendaftar di umkm.sosmed.io/daftar.
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#9A93A8;">
                Sosmed AI · Platform WhatsApp untuk bisnis F&amp;B Indonesia
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ---- NEWSLETTER: confirmation (to the subscriber) ---- */
export function newsletterEmail(emailAddr: string): string {
  const email = esc(emailAddr);
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Langganan Newsletter — Sosmed AI</title>
</head>
<body style="margin:0;padding:0;background:#F4F2F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2F8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background:#FFFFFF;border-radius:20px;overflow:hidden;border:1px solid #ECEAF1;box-shadow:0 6px 28px rgba(22,18,31,.05);">

          <!-- header: gradient block, white logo -->
          <tr>
            <td style="padding:26px 36px;background:#6B4EFF;background:linear-gradient(135deg,#7B5CFF 0%,#6B4EFF 50%,#5638E0 100%);">
              <img src="https://umkm.sosmed.io/logo/sosmed-ai-logo-white-version.png" height="30" alt="Sosmed AI" style="display:block;border:0;height:30px;width:auto;max-width:160px;">
            </td>
          </tr>

          <!-- body -->
          <tr>
            <td style="padding:40px 36px 8px;">
              <div style="display:inline-block;background:#F1ECFB;color:#6B4EFF;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:6px 12px;border-radius:999px;margin-bottom:20px;">Newsletter</div>
              <h1 style="margin:0 0 16px;font-size:25px;line-height:1.25;font-weight:800;color:#16121F;letter-spacing:-.02em;">
                Kamu resmi berlangganan ✦
              </h1>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#4A4458;">
                Makasih udah subscribe newsletter Sosmed AI. Mulai sekarang kamu bakal dapat update langsung ke inbox ini.
              </p>
              <p style="margin:0 0 26px;font-size:15px;line-height:1.65;color:#4A4458;">
                Yang bakal kamu terima:
              </p>

              <!-- what to expect -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF9FC;border:1px solid #F0EEF4;border-radius:14px;margin:0 0 28px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                      <tr>
                        <td width="26" style="vertical-align:top;font-size:15px;">📈</td>
                        <td style="vertical-align:top;padding-left:10px;font-size:14px;line-height:1.5;color:#4A4458;"><strong style="color:#16121F;">Tips growth F&amp;B</strong> — strategi praktis buat kafe &amp; resto Indonesia.</td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                      <tr>
                        <td width="26" style="vertical-align:top;font-size:15px;">🤖</td>
                        <td style="vertical-align:top;padding-left:10px;font-size:14px;line-height:1.5;color:#4A4458;"><strong style="color:#16121F;">Cara pakai AI</strong> — biar order &amp; operasional makin gampang via WhatsApp.</td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="26" style="vertical-align:top;font-size:15px;">✦</td>
                        <td style="vertical-align:top;padding-left:10px;font-size:14px;line-height:1.5;color:#4A4458;"><strong style="color:#16121F;">Update produk</strong> — fitur baru &amp; penawaran khusus subscriber.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:15px;line-height:1.65;color:#4A4458;">
                Sambil nunggu edisi pertama, mampir ke blog kami:
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;">
                <tr>
                  <td style="border-radius:12px;background:#16121F;">
                    <a href="https://umkm.sosmed.io/blog" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;">Baca Blog →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:22px 36px 30px;border-top:1px solid #F2F0F7;background:#FCFBFE;">
              <p style="margin:0 0 4px;font-size:12px;line-height:1.5;color:#9A93A8;">
                Email ini dikirim ke ${email} karena kamu berlangganan di blog umkm.sosmed.io.
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#9A93A8;">
                Sosmed AI · Platform WhatsApp untuk bisnis F&amp;B Indonesia
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ---- EMAIL 2: owner notification (to hi@sosmed.io, Reply-To = signup) ---- */
export function ownerNotificationEmail(s: Signup): string {
  const name = esc(s.name);
  const business = esc(s.business_name);
  const email = esc(s.email);
  const wa = esc(s.whatsapp);
  const source = esc(s.source);
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Signup baru — Sosmed AI waitlist</title>
</head>
<body style="margin:0;padding:0;background:#F4F2F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2F8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #ECEAF1;box-shadow:0 6px 28px rgba(22,18,31,.05);">

          <!-- header: gradient block, white logo + status -->
          <tr>
            <td style="padding:22px 28px;background:#6B4EFF;background:linear-gradient(135deg,#7B5CFF 0%,#6B4EFF 50%,#5638E0 100%);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="https://umkm.sosmed.io/logo/sosmed-ai-logo-white-version.png" height="24" alt="Sosmed AI" style="display:block;border:0;height:24px;width:auto;max-width:140px;">
                  </td>
                  <td style="vertical-align:middle;text-align:right;">
                    <span style="display:inline-block;background:rgba(255,255,255,.18);color:#FFFFFF;font-size:11px;font-weight:700;padding:5px 11px;border-radius:999px;">🔔 Waitlist baru</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- name -->
          <tr>
            <td style="padding:24px 28px 6px;">
              <h1 style="margin:0;font-size:21px;font-weight:800;color:#16121F;letter-spacing:-.01em;">${name}</h1>
            </td>
          </tr>

          <!-- data rows -->
          <tr>
            <td style="padding:8px 28px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #F4F2F8;font-size:13px;color:#9A93A8;width:120px;">Nama bisnis</td>
                  <td style="padding:13px 0;border-bottom:1px solid #F4F2F8;font-size:14px;color:#16121F;font-weight:600;text-align:right;">${business}</td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #F4F2F8;font-size:13px;color:#9A93A8;">Email</td>
                  <td style="padding:13px 0;border-bottom:1px solid #F4F2F8;font-size:14px;text-align:right;"><a href="mailto:${email}" style="color:#6B4EFF;text-decoration:none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #F4F2F8;font-size:13px;color:#9A93A8;">WhatsApp</td>
                  <td style="padding:13px 0;border-bottom:1px solid #F4F2F8;font-size:14px;text-align:right;"><a href="https://wa.me/${wa}" style="color:#6B4EFF;text-decoration:none;">+${wa}</a></td>
                </tr>
                <tr>
                  <td style="padding:13px 0;font-size:13px;color:#9A93A8;">Sumber</td>
                  <td style="padding:13px 0;font-size:14px;color:#16121F;text-align:right;">${source}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- action -->
          <tr>
            <td style="padding:0 28px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:10px;background:#6B4EFF;" align="center">
                    <a href="https://wa.me/${wa}" style="display:block;padding:13px;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;">Chat di WhatsApp →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 28px;border-top:1px solid #F2F0F7;background:#FCFBFE;">
              <p style="margin:0;font-size:11px;color:#9A93A8;">Notifikasi otomatis dari umkm.sosmed.io/daftar</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
