// Deterministic seed for the demo tenant "Kopi Senja".
// A seeded PRNG makes the dataset rich but 100% reproducible, so the numbers on
// the page are stable across reloads and SSR/client renders match.

import { NOW, DAY_MS, startOfDay } from "./format";
import type {
  Business,
  DashboardState,
  Member,
  MenuItem,
  Order,
  OrderChannel,
  OrderItem,
  OrderStatus,
} from "./types";

export const STORAGE_KEY = "sosmed-dash-v1";
export const STATE_VERSION = 2;

// --- mulberry32: tiny deterministic PRNG -----------------------------------
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rnd: () => number, arr: T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}
function int(rnd: () => number, min: number, max: number): number {
  return min + Math.floor(rnd() * (max - min + 1));
}

// --- static menu ------------------------------------------------------------
const MENU: MenuItem[] = [
  { id: "m1", name: "Es Kopi Susu Gula Aren", category: "Kopi", price: 18000, cost: 7000, emoji: "🧋", available: true },
  { id: "m2", name: "Americano", category: "Kopi", price: 16000, cost: 5000, emoji: "☕", available: true },
  { id: "m3", name: "Cappuccino", category: "Kopi", price: 22000, cost: 8000, emoji: "☕", available: true },
  { id: "m4", name: "Kopi Susu Panas", category: "Kopi", price: 17000, cost: 6500, emoji: "☕", available: true },
  { id: "m5", name: "Caramel Macchiato", category: "Kopi", price: 28000, cost: 10000, emoji: "☕", available: true },
  { id: "m6", name: "Matcha Latte", category: "Non-Kopi", price: 25000, cost: 9500, emoji: "🍵", available: true },
  { id: "m7", name: "Chocolate", category: "Non-Kopi", price: 23000, cost: 8500, emoji: "🍫", available: true },
  { id: "m8", name: "Es Teh Leci", category: "Non-Kopi", price: 15000, cost: 4500, emoji: "🧊", available: true },
  { id: "m9", name: "Red Velvet Latte", category: "Non-Kopi", price: 26000, cost: 10000, emoji: "🥤", available: false },
  { id: "m10", name: "Croissant Butter", category: "Makanan", price: 22000, cost: 9000, emoji: "🥐", available: true },
  { id: "m11", name: "Pain au Chocolat", category: "Makanan", price: 24000, cost: 10000, emoji: "🥐", available: true },
  { id: "m12", name: "Nasi Ayam Sambal Matah", category: "Makanan", price: 32000, cost: 15000, emoji: "🍛", available: true },
  { id: "m13", name: "Roti Bakar Cokelat", category: "Snack", price: 18000, cost: 6000, emoji: "🍞", available: true },
  { id: "m14", name: "Banana Cake", category: "Snack", price: 20000, cost: 7500, emoji: "🍰", available: true },
  { id: "m15", name: "French Fries", category: "Snack", price: 19000, cost: 7000, emoji: "🍟", available: true },
];

// popularity weights (index-aligned with MENU) — coffee sells most
const WEIGHTS = [26, 16, 11, 9, 7, 12, 6, 5, 0, 8, 5, 7, 6, 5, 6];

function weightedMenuIndex(rnd: () => number): number {
  const total = WEIGHTS.reduce((a, b) => a + b, 0);
  let r = rnd() * total;
  for (let i = 0; i < WEIGHTS.length; i++) {
    r -= WEIGHTS[i];
    if (r <= 0) return i;
  }
  return 0;
}

// --- member roster ----------------------------------------------------------
const MEMBER_NAMES = [
  "Dimas Prayoga", "Sarah Wijaya", "Bagus Santoso", "Nadia Putri", "Reza Firmansyah",
  "Ayu Lestari", "Fajar Nugroho", "Citra Dewi", "Rangga Aditya", "Melati Anggraini",
  "Yoga Pratama", "Kirana Salsabila", "Bima Saputra", "Tania Kusuma", "Andre Wibowo",
  "Rina Amelia", "Galih Permana", "Sinta Marlina", "Hendra Gunawan", "Wulan Sari",
  "Ivan Kurniawan", "Dinda Safira", "Aldi Rahman", "Feby Oktaviani", "Rio Alfian",
  "Lia Kartika", "Doni Setiawan", "Nabila Zahra", "Eko Pramono", "Vina Maharani",
  "Krisna Bagaskara", "Putri Handayani", "Aji Suryadi", "Mega Utami", "Bayu Anggara",
  "Salsa Ramadhani", "Fikri Maulana", "Intan Permatasari", "Gilang Ramadhan", "Dewi Anjani",
  "Rafi Hidayat", "Tiara Novita", "Angga Saputra", "Maya Kirana", "Dodi Kurnia",
  "Larasati Dewi", "Bagas Wicaksono", "Nisa Rahmawati", "Yusuf Ardiansyah", "Cindy Paramita",
  "Farel Aditya", "Gita Savitri", "Rendra Pratama", "Alya Rizky", "Hafiz Nugraha",
  "Puspita Sari", "Rizal Fadhil", "Kenia Ayu",
];

const WALKIN_NAMES = ["Pelanggan", "Tamu Meja", "Walk-in", "Pembeli"];

function waFrom(rnd: () => number): string {
  let s = "628";
  for (let i = 0; i < 9; i++) s += int(rnd, 0, 9);
  return s;
}

const NOTES = [
  "less sugar", "extra shot", "less ice", "normal sugar", "panas", "takeaway",
  "extra hot", "no straw", "pakai gula aren", "dine in",
];

export function buildSeed(): DashboardState {
  const rnd = mulberry32(20260719);

  // Members start with only id/name/wa; joinedAt is derived from their first
  // order below so tiers stay coherent.
  const members: Member[] = MEMBER_NAMES.map((name, i) => ({
    id: "u" + (i + 1),
    name,
    wa: waFrom(rnd),
    joinedAt: NOW, // placeholder, set later
    redeemedPoints: 0,
  }));
  const N = members.length;

  // Power-law order frequency: shuffle members, then weight by rank so a loyal
  // core dominates and a long tail orders rarely (realistic cafe distribution).
  const rankOrder = members.map((_, i) => i);
  for (let i = rankOrder.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [rankOrder[i], rankOrder[j]] = [rankOrder[j], rankOrder[i]];
  }
  const weight = new Array<number>(N).fill(0);
  rankOrder.forEach((mi, rank) => {
    weight[mi] = 1 / Math.pow(rank + 1, 0.8);
  });
  // ~16% of members are "lapsed" — they only ordered >30 days ago (→ Pasif).
  const lapsed = new Set<number>();
  for (let i = 0; i < N; i++) if (rnd() < 0.16) lapsed.add(rankOrder[i]);

  // Weighted member pick among an eligible subset.
  function pickMember(recent: boolean): number {
    let total = 0;
    for (let i = 0; i < N; i++) {
      if (recent && lapsed.has(i)) continue;
      total += weight[i];
    }
    let r = rnd() * total;
    for (let i = 0; i < N; i++) {
      if (recent && lapsed.has(i)) continue;
      r -= weight[i];
      if (r <= 0) return i;
    }
    return rankOrder[0];
  }

  const orders: Order[] = [];
  const firstOrderAt = new Array<number>(N).fill(0);
  let seq = 1000;

  const todayStart = startOfDay(NOW);

  // Generate day by day for the last 46 days.
  for (let dayOffset = 45; dayOffset >= 0; dayOffset--) {
    const dayStart = todayStart - dayOffset * DAY_MS;
    const isToday = dayOffset === 0;
    const recentDay = dayOffset <= 30;
    // weekends busier; a gentle growth trend toward "today"
    const dow = new Date(dayStart + 7 * 3600 * 1000).getUTCDay();
    const weekend = dow === 0 || dow === 6;
    const growth = 1 + (45 - dayOffset) * 0.004; // ~+18% over the window
    const base = weekend ? 7 : 5;
    let count = Math.round((base + rnd() * 3) * growth);
    if (isToday) count = 9; // partial day — enough to populate "hari ini"

    for (let k = 0; k < count; k++) {
      seq += 1;
      // opening hours 08:00–21:00, clustered around lunch & evening
      let hour: number;
      const rh = rnd();
      if (rh < 0.35) hour = int(rnd, 8, 11);
      else if (rh < 0.7) hour = int(rnd, 12, 15);
      else hour = int(rnd, 16, 21);
      const minute = int(rnd, 0, 59);
      let createdAt = dayStart + hour * 3600_000 + minute * 60_000;
      if (isToday && createdAt > NOW) createdAt = NOW - int(rnd, 5, 240) * 60_000;

      // 1–3 line items
      const nItems = int(rnd, 1, 3);
      const chosen = new Map<number, number>();
      for (let j = 0; j < nItems; j++) {
        const mi = weightedMenuIndex(rnd);
        chosen.set(mi, (chosen.get(mi) ?? 0) + int(rnd, 1, 2));
      }
      const items: OrderItem[] = [...chosen.entries()].map(([mi, qty]) => ({
        menuId: MENU[mi].id,
        name: MENU[mi].name,
        qty,
        price: MENU[mi].price,
      }));

      const channel: OrderChannel =
        rnd() < 0.55 ? "bot" : rnd() < 0.66 ? "qr" : "walkin";
      const table = channel === "qr" ? int(rnd, 1, 12) : null;

      // member linkage — walk-in (non-member) share ~30%
      const linked = rnd() < 0.7;
      let member: Member | null = null;
      if (linked) {
        const mi = pickMember(recentDay);
        member = members[mi];
        if (firstOrderAt[mi] === 0 || createdAt < firstOrderAt[mi]) {
          firstOrderAt[mi] = createdAt;
        }
      }
      const customerName = member ? member.name : pick(rnd, WALKIN_NAMES);
      const customerWa = member ? member.wa : waFrom(rnd);

      // status: history mostly settled; today spread across the pipeline
      let status: OrderStatus;
      let paid: boolean;
      if (isToday) {
        const r = rnd();
        if (r < 0.25) { status = "baru"; paid = rnd() < 0.4; }
        else if (r < 0.5) { status = "diproses"; paid = true; }
        else if (r < 0.68) { status = "siap"; paid = true; }
        else if (r < 0.92) { status = "selesai"; paid = true; }
        else { status = "batal"; paid = false; }
      } else {
        if (rnd() < 0.05) { status = "batal"; paid = false; }
        else { status = "selesai"; paid = true; }
      }

      const noteBits: string[] = [];
      if (rnd() < 0.5) noteBits.push(pick(rnd, NOTES));
      if (table) noteBits.push("meja " + table);

      orders.push({
        id: String(seq),
        memberId: member ? member.id : null,
        customerName,
        customerWa,
        items,
        note: noteBits.join(" · "),
        table,
        channel,
        status,
        paid,
        createdAt,
      });
    }
  }

  // Derive joinedAt: members join a few days before their first order. Members
  // who never ordered are recent sign-ups (→ Baru, no orders yet).
  members.forEach((m, i) => {
    if (firstOrderAt[i] > 0) {
      m.joinedAt = firstOrderAt[i] - int(rnd, 1, 12) * DAY_MS;
    } else {
      m.joinedAt = NOW - int(rnd, 1, 16) * DAY_MS;
    }
    // A minority of loyal members have redeemed a voucher or two.
    m.redeemedPoints = rnd() < 0.28 ? int(rnd, 1, 2) * 100 : 0;
  });

  orders.sort((a, b) => b.createdAt - a.createdAt);

  const business: Business = {
    name: "Kopi Senja",
    outlet: "Kopi Senja — Tebet",
    wa: "628123456789",
    plan: "Pro",
    pointRate: 1000,
    voucherThreshold: 100,
    voucherValue: 5000,
    staff: [
      { id: "s1", name: "Rendi (Owner)", role: "Owner", wa: "628123456789" },
      { id: "s2", name: "Sasa", role: "Kasir", wa: "628998877665" },
    ],
  };

  return {
    version: STATE_VERSION,
    business,
    menu: MENU.map((m) => ({ ...m })),
    members,
    orders,
    broadcasts: [
      {
        id: "b1",
        segment: "VIP",
        message:
          "Halo kak! 🎉 Khusus member VIP Kopi Senja, tunjukkan chat ini buat dapat 1 Es Kopi Susu gratis minggu ini. Berlaku sampai Minggu ya!",
        recipients: 6,
        sentAt: NOW - 5 * DAY_MS,
      },
      {
        id: "b2",
        segment: "Pasif",
        message:
          "Kangen Kopi Senja? ☕ Kami kangen kamu juga! Balik lagi minggu ini dapat diskon 20% untuk semua kopi. Sampai ketemu!",
        recipients: 9,
        sentAt: NOW - 12 * DAY_MS,
      },
    ],
  };
}
