"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon, Icons } from "./components/icons";
import { KpiCard } from "./components/blocks";
import { AreaChart, RankBars, Donut } from "./components/charts";
import { StatusBadge, ChannelBadge } from "./components/ui";
import { OrderDetailModal } from "./components/OrderDetailModal";
import { useStore } from "./lib/store";
import {
  kpiForRange,
  pctChange,
  revenueSeries,
  topMenu,
  monthlyCapacity,
  pipelineCounts,
  channelBreakdown,
  allMemberStats,
  activeMemberCount,
} from "./lib/derive";
import { DAY_MS, NOW, rupiah, rupiahShort, timeAgo, startOfDay } from "./lib/format";
import type { Order } from "./lib/types";

type Period = "today" | "7d" | "month";

function periodRanges(p: Period) {
  const today = startOfDay(NOW);
  if (p === "today") {
    return {
      start: today,
      end: NOW,
      prevStart: today - DAY_MS,
      prevEnd: NOW - DAY_MS,
      label: "kemarin",
    };
  }
  if (p === "7d") {
    const start = today - 6 * DAY_MS;
    return {
      start,
      end: NOW,
      prevStart: start - 7 * DAY_MS,
      prevEnd: start,
      label: "7 hari sebelumnya",
    };
  }
  const d = new Date(NOW + 7 * 3600 * 1000);
  const monthStart = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1) - 7 * 3600 * 1000;
  const prevMonthStart =
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1) - 7 * 3600 * 1000;
  return {
    start: monthStart,
    end: NOW,
    prevStart: prevMonthStart,
    prevEnd: monthStart,
    label: "bulan lalu",
  };
}

export default function RingkasanContent() {
  const { state } = useStore();
  const [period, setPeriod] = useState<Period>("today");
  const [selected, setSelected] = useState<Order | null>(null);

  const r = periodRanges(period);
  const cur = kpiForRange(state, r.start, r.end);
  const prev = kpiForRange(state, r.prevStart, r.prevEnd);

  const cap = monthlyCapacity(state);
  const pipe = pipelineCounts(state);
  const series = revenueSeries(state, period === "today" ? 7 : period === "7d" ? 14 : 30);
  const menuRows = topMenu(state, r.start, r.end).slice(0, 5);
  const chan = channelBreakdown(state, r.start, r.end);
  const memberStats = useMemo(() => allMemberStats(state), [state]);
  const activeMembers = activeMemberCount(memberStats);

  const recent = state.orders.slice(0, 6);
  const maxMenu = menuRows[0]?.qty ?? 1;

  const chartData = series.map((d) => ({
    label: d.label,
    value: d.revenue,
    sub: `${d.orders} order`,
  }));

  const cmp = r.label;

  return (
    <>
      {cap.pct >= 80 && (
        <div className={"dash-cap-banner" + (cap.pct >= 90 ? " warn" : "")}>
          <span className="dash-cap-ic">
            <Icon paths={Icons.spark} size={18} />
          </span>
          <div className="dash-cap-text">
            <b>
              {cap.used} dari {cap.limit} order terpakai bulan ini
            </b>
            <p>
              Sisa kuota {cap.remaining} order di paket {state.business.plan}. Upgrade
              paket kalau butuh kapasitas lebih.
            </p>
          </div>
          <Link href="/dashboard/pengaturan" className="dash-btn dash-btn-primary dash-btn-sm">
            Kelola paket
          </Link>
        </div>
      )}

      <div className="dash-page-head">
        <div>
          <h1>Halo, {state.business.name} 👋</h1>
          <p>Ini ringkasan performa bisnis kamu.</p>
        </div>
        <div className="dash-segmented">
          {(["today", "7d", "month"] as Period[]).map((p) => (
            <button
              key={p}
              className={"dash-seg" + (period === p ? " active" : "")}
              onClick={() => setPeriod(p)}
            >
              {p === "today" ? "Hari ini" : p === "7d" ? "7 Hari" : "Bulan ini"}
            </button>
          ))}
        </div>
      </div>

      <div className="dash-kpis">
        <KpiCard
          icon={Icons.wallet}
          label="Pendapatan"
          value={rupiah(cur.revenue)}
          delta={pctChange(cur.revenue, prev.revenue)}
          compareLabel={`vs ${cmp}`}
        />
        <KpiCard
          icon={Icons.bag}
          label="Order"
          value={String(cur.orders)}
          delta={pctChange(cur.orders, prev.orders)}
          compareLabel={`vs ${cmp}`}
        />
        <KpiCard
          icon={Icons.bot}
          label="Chat ditangani AI"
          value={String(cur.chatsHandled)}
          delta={pctChange(cur.chatsHandled, prev.chatsHandled)}
          compareLabel={`vs ${cmp}`}
        />
        <KpiCard
          icon={Icons.users}
          label="Member baru"
          value={String(cur.newMembers)}
          foot={<span className="muted">{activeMembers} member aktif total</span>}
        />
      </div>

      <div className="dash-grid-2">
        <div className="dash-card">
          <div className="dash-card-head">
            <div>
              <h2>Tren Penjualan</h2>
              <div className="sub">
                Rata-rata order value {rupiah(cur.aov)} · {cur.paidOrders} order lunas
              </div>
            </div>
            <Link href="/dashboard/analitik" className="dash-see">
              Analitik lengkap <Icon paths={Icons.chevron} size={13} />
            </Link>
          </div>
          <AreaChart data={chartData} />
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h2>Menu Terlaris</h2>
            <Link href="/dashboard/menu" className="dash-see">
              Kelola menu <Icon paths={Icons.chevron} size={13} />
            </Link>
          </div>
          {menuRows.length ? (
            <RankBars
              rows={menuRows.map((m) => ({
                label: `${m.item.emoji} ${m.item.name}`,
                sub: `${m.qty} · ${Math.round(m.share * 100)}%`,
                value: m.qty,
                max: maxMenu,
              }))}
            />
          ) : (
            <div className="dash-empty">
              <p className="dash-empty-sub">Belum ada penjualan di periode ini.</p>
            </div>
          )}
        </div>
      </div>

      <div className="dash-grid-2">
        <div className="dash-card">
          <div className="dash-card-head">
            <div>
              <h2>Pesanan Terbaru</h2>
              <div className="sub">
                {pipe.baru} baru · {pipe.diproses} diproses · {pipe.siap} siap hari ini
              </div>
            </div>
            <Link href="/dashboard/pesanan" className="dash-see">
              Semua pesanan <Icon paths={Icons.chevron} size={13} />
            </Link>
          </div>
          <div>
            {recent.map((o) => (
              <button
                key={o.id}
                className="dash-orow"
                style={{ width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid var(--line)", cursor: "pointer" }}
                onClick={() => setSelected(o)}
              >
                <div className="dash-orow-main">
                  <div className="dash-orow-id">#{o.id}</div>
                  <div className="dash-orow-items">
                    {o.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}
                  </div>
                  <div className="dash-orow-meta">
                    <ChannelBadge channel={o.channel} />
                    <span>{o.customerName}</span>
                    <span>· {timeAgo(o.createdAt)}</span>
                  </div>
                </div>
                <div className="dash-orow-right">
                  <div className="dash-orow-total">
                    {rupiah(o.items.reduce((s, it) => s + it.price * it.qty, 0))}
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h2>Sumber Order</h2>
            <div className="sub">{cmp === "kemarin" ? "Hari ini" : "Periode ini"}</div>
          </div>
          <Donut
            centerLabel={String(chan.bot + chan.qr + chan.walkin)}
            centerSub="order"
            segments={[
              { label: "AI Chat WhatsApp", value: chan.bot, color: "#A050F8" },
              { label: "QR Meja", value: chan.qr, color: "#2563A8" },
              { label: "Walk-in / Kasir", value: chan.walkin, color: "#CBBF9E" },
            ]}
          />
          <div className="dash-stat-strip">
            <div className="dash-mini">
              <div className="n">{rupiahShort(cur.revenue)}</div>
              <div className="l">Pendapatan periode</div>
            </div>
            <div className="dash-mini">
              <div className="n">{cur.pointsIssued}</div>
              <div className="l">Poin terbit</div>
            </div>
            <div className="dash-mini">
              <div className="n">
                {Math.round(
                  ((chan.bot + chan.qr) / Math.max(1, chan.bot + chan.qr + chan.walkin)) * 100,
                )}
                %
              </div>
              <div className="l">Order via AI</div>
            </div>
          </div>
        </div>
      </div>

      <OrderDetailModal order={selected} onClose={() => setSelected(null)} />
    </>
  );
}
