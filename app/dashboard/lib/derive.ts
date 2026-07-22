// Pure derivations. Every number the dashboard shows comes from here — nothing
// is hard-coded in the UI, so any mutation to orders/members/menu recomputes.

import { DAY_MS, NOW, startOfDay, hourOf, weekdayShort, shortDate } from "./format";
import type {
  Business,
  DashboardState,
  Member,
  MemberTier,
  MenuItem,
  Order,
} from "./types";
import { PLAN_CAPACITY } from "./types";

// A settled order contributes to revenue: paid and not cancelled.
export function isRevenue(o: Order): boolean {
  return o.paid && o.status !== "batal";
}
export function isActive(o: Order): boolean {
  return o.status !== "batal";
}

export function orderTotal(o: Order): number {
  return o.items.reduce((sum, it) => sum + it.price * it.qty, 0);
}

export function orderQty(o: Order): number {
  return o.items.reduce((sum, it) => sum + it.qty, 0);
}

// Points earned by a settled order under the business point rule.
export function orderPoints(o: Order, biz: Business): number {
  if (!isRevenue(o)) return 0;
  return Math.floor(orderTotal(o) / biz.pointRate);
}

export function inRange(o: Order, start: number, end: number): boolean {
  return o.createdAt >= start && o.createdAt < end;
}

// ---- member-level aggregation ---------------------------------------------
export interface MemberStats {
  member: Member;
  totalSpent: number;
  orderCount: number;
  lastOrderAt: number | null;
  earnedPoints: number;
  points: number; // earned - redeemed, floored at 0
  tier: MemberTier;
}

export function computeMemberStats(
  member: Member,
  orders: Order[],
  biz: Business,
): MemberStats {
  let totalSpent = 0;
  let orderCount = 0;
  let lastOrderAt: number | null = null;
  let earnedPoints = 0;
  for (const o of orders) {
    if (o.memberId !== member.id) continue;
    if (!isRevenue(o)) continue;
    totalSpent += orderTotal(o);
    orderCount += 1;
    earnedPoints += orderPoints(o, biz);
    if (lastOrderAt === null || o.createdAt > lastOrderAt) lastOrderAt = o.createdAt;
  }
  const points = Math.max(0, earnedPoints - member.redeemedPoints);
  const tier = deriveTier({ member, totalSpent, orderCount, lastOrderAt });
  return { member, totalSpent, orderCount, lastOrderAt, earnedPoints, points, tier };
}

function deriveTier(a: {
  member: Member;
  totalSpent: number;
  orderCount: number;
  lastOrderAt: number | null;
}): MemberTier {
  const { member, totalSpent, orderCount, lastOrderAt } = a;
  // Pasif: has ordered before but not in the last 30 days.
  if (lastOrderAt !== null && NOW - lastOrderAt > 30 * DAY_MS) return "Pasif";
  // Baru: joined recently or barely ordered.
  if (NOW - member.joinedAt <= 21 * DAY_MS || orderCount <= 1) return "Baru";
  // VIP: high spend and frequency.
  if (totalSpent >= 400_000 && orderCount >= 8) return "VIP";
  return "Reguler";
}

export function allMemberStats(state: DashboardState): MemberStats[] {
  return state.members.map((m) => computeMemberStats(m, state.orders, state.business));
}

// ---- period KPIs -----------------------------------------------------------
export interface PeriodKpi {
  revenue: number;
  orders: number; // active (non-cancelled)
  paidOrders: number;
  aov: number;
  chatsHandled: number; // bot + qr conversations
  pointsIssued: number;
  newMembers: number;
}

export function kpiForRange(
  state: DashboardState,
  start: number,
  end: number,
): PeriodKpi {
  let revenue = 0;
  let orders = 0;
  let paidOrders = 0;
  let chatsHandled = 0;
  let pointsIssued = 0;
  for (const o of state.orders) {
    if (!inRange(o, start, end)) continue;
    if (isActive(o)) orders += 1;
    if (o.channel !== "walkin" && isActive(o)) chatsHandled += 1;
    if (isRevenue(o)) {
      revenue += orderTotal(o);
      paidOrders += 1;
      pointsIssued += orderPoints(o, state.business);
    }
  }
  let newMembers = 0;
  for (const m of state.members) {
    if (m.joinedAt >= start && m.joinedAt < end) newMembers += 1;
  }
  const aov = paidOrders ? Math.round(revenue / paidOrders) : 0;
  return { revenue, orders, paidOrders, aov, chatsHandled, pointsIssued, newMembers };
}

// Percentage change between two comparable periods (guards div/0).
export function pctChange(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

export const todayStart = () => startOfDay(NOW);

export function ranges() {
  const today = startOfDay(NOW);
  const weekStart = today - 6 * DAY_MS;
  const monthStart = (() => {
    const d = new Date(NOW + 7 * 3600 * 1000);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1) - 7 * 3600 * 1000;
  })();
  return { today, tomorrow: today + DAY_MS, weekStart, monthStart, now: NOW };
}

// ---- top menu --------------------------------------------------------------
export interface MenuSales {
  item: MenuItem;
  qty: number;
  revenue: number;
  share: number; // 0..1 of total qty
}

export function topMenu(
  state: DashboardState,
  start = 0,
  end = Number.MAX_SAFE_INTEGER,
): MenuSales[] {
  const byId = new Map<string, { qty: number; revenue: number }>();
  let totalQty = 0;
  for (const o of state.orders) {
    if (!isRevenue(o) || !inRange(o, start, end)) continue;
    for (const it of o.items) {
      const cur = byId.get(it.menuId) ?? { qty: 0, revenue: 0 };
      cur.qty += it.qty;
      cur.revenue += it.qty * it.price;
      byId.set(it.menuId, cur);
      totalQty += it.qty;
    }
  }
  const rows: MenuSales[] = [];
  for (const item of state.menu) {
    const agg = byId.get(item.id);
    if (!agg) continue;
    rows.push({
      item,
      qty: agg.qty,
      revenue: agg.revenue,
      share: totalQty ? agg.qty / totalQty : 0,
    });
  }
  rows.sort((a, b) => b.qty - a.qty);
  return rows;
}

// ---- revenue time series ---------------------------------------------------
export interface DayPoint {
  date: number;
  label: string;
  revenue: number;
  orders: number;
}

export function revenueSeries(state: DashboardState, days: number): DayPoint[] {
  const today = startOfDay(NOW);
  const out: DayPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dayStart = today - i * DAY_MS;
    const dayEnd = dayStart + DAY_MS;
    let revenue = 0;
    let orders = 0;
    for (const o of state.orders) {
      if (!inRange(o, dayStart, dayEnd)) continue;
      if (isActive(o)) orders += 1;
      if (isRevenue(o)) revenue += orderTotal(o);
    }
    out.push({
      date: dayStart,
      label: days <= 7 ? weekdayShort(dayStart) : shortDate(dayStart),
      revenue,
      orders,
    });
  }
  return out;
}

// ---- channel & hour breakdowns --------------------------------------------
export function channelBreakdown(state: DashboardState, start = 0, end = Number.MAX_SAFE_INTEGER) {
  const acc = { bot: 0, qr: 0, walkin: 0 };
  for (const o of state.orders) {
    if (!isActive(o) || !inRange(o, start, end)) continue;
    acc[o.channel] += 1;
  }
  return acc;
}

// Orders per opening hour (08..21) across a range.
export function hourHistogram(state: DashboardState, start: number, end: number): number[] {
  const bins = new Array(24).fill(0) as number[];
  for (const o of state.orders) {
    if (!isActive(o) || !inRange(o, start, end)) continue;
    bins[hourOf(o.createdAt)] += 1;
  }
  return bins;
}

// ---- loyalty & retention ---------------------------------------------------
// Repeat rate = share of ordering members who ordered 2+ times.
export function repeatRate(stats: MemberStats[]): number {
  const ordered = stats.filter((s) => s.orderCount >= 1);
  if (ordered.length === 0) return 0;
  const repeat = ordered.filter((s) => s.orderCount >= 2);
  return (repeat.length / ordered.length) * 100;
}

export function activeMemberCount(stats: MemberStats[]): number {
  return stats.filter((s) => s.tier !== "Pasif" && s.orderCount >= 1).length;
}

// ---- subscription capacity -------------------------------------------------
export interface CapacityInfo {
  used: number;
  limit: number;
  pct: number;
  remaining: number;
}

export function monthlyCapacity(state: DashboardState): CapacityInfo {
  const { monthStart } = ranges();
  let used = 0;
  for (const o of state.orders) {
    if (o.createdAt >= monthStart && isActive(o)) used += 1;
  }
  const limit = PLAN_CAPACITY[state.business.plan];
  return {
    used,
    limit,
    pct: Math.min(100, (used / limit) * 100),
    remaining: Math.max(0, limit - used),
  };
}

// Count orders currently needing owner attention (new + in progress).
export function pipelineCounts(state: DashboardState) {
  const acc = { baru: 0, diproses: 0, siap: 0, selesai: 0, batal: 0 };
  const { today, tomorrow } = ranges();
  for (const o of state.orders) {
    if (!inRange(o, today, tomorrow)) continue;
    acc[o.status] += 1;
  }
  return acc;
}
