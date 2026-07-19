// Deterministic, locale-independent formatting helpers so server and client
// render identical strings (no hydration mismatch, no Intl locale drift).

// The demo is anchored to a fixed "now" so the seeded data always reads as
// fresh and the today/week/month calculations stay consistent regardless of the
// real clock. Sat 19 Jul 2026, 14:30 (matches the project's currentDate).
export const NOW = Date.UTC(2026, 6, 19, 7, 30) + 7 * 3600 * 1000; // WIB (UTC+7)

// 1284 -> "1.284"
export function groupThousands(n: number): string {
  const neg = n < 0;
  const s = Math.round(Math.abs(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return neg ? "-" + s : s;
}

// 36000 -> "Rp 36.000"
export function rupiah(n: number): string {
  return "Rp " + groupThousands(n);
}

// Compact rupiah for tight KPI tiles: 38600000 -> "Rp 38,6 jt", 1400000 -> "Rp 1,4 jt".
export function rupiahShort(n: number): string {
  if (Math.abs(n) >= 1_000_000) {
    const jt = n / 1_000_000;
    const s = jt.toFixed(jt >= 10 ? 0 : 1).replace(".", ",");
    return "Rp " + s.replace(/,0$/, "") + " jt";
  }
  if (Math.abs(n) >= 1_000) {
    const rb = n / 1_000;
    const s = rb.toFixed(rb >= 100 ? 0 : 0).replace(".", ",");
    return "Rp " + s + "rb";
  }
  return rupiah(n);
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];
const MONTHS_LONG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// Use WIB (UTC+7) consistently so the displayed date/hour matches the anchor.
function wib(ts: number): Date {
  return new Date(ts + 7 * 3600 * 1000);
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

// epoch -> "19 Jul"
export function shortDate(ts: number): string {
  const d = wib(ts);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

// epoch -> "19 Juli 2026"
export function longDate(ts: number): string {
  const d = wib(ts);
  return `${d.getUTCDate()} ${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// epoch -> "14:05"
export function clock(ts: number): string {
  const d = wib(ts);
  return `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`;
}

// epoch -> "Sab, 19 Jul · 14:05"
export function dateTime(ts: number): string {
  const d = wib(ts);
  return `${DAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} · ${clock(ts)}`;
}

// Human "waktu lalu" relative to NOW: "baru saja", "5 mnt lalu", "2 jam lalu", "3 hari lalu".
export function timeAgo(ts: number, from: number = NOW): string {
  const diff = Math.max(0, from - ts);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} hari lalu`;
  const mo = Math.floor(d / 30);
  return `${mo} bln lalu`;
}

// Start-of-day (WIB) epoch for a timestamp.
export function startOfDay(ts: number): number {
  const d = wib(ts);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - 7 * 3600 * 1000;
}

export const DAY_MS = 86_400_000;

// WIB hour-of-day (0-23) for a timestamp.
export function hourOf(ts: number): number {
  return wib(ts).getUTCHours();
}

// WIB weekday label for a timestamp.
export function weekdayShort(ts: number): string {
  return DAYS[wib(ts).getUTCDay()];
}

// Signed percent as "↑ 18%" / "↓ 4%" / "0%".
export function deltaLabel(pct: number): string {
  if (!isFinite(pct) || pct === 0) return "0%";
  const arrow = pct > 0 ? "↑" : "↓";
  return `${arrow} ${Math.abs(Math.round(pct))}%`;
}
