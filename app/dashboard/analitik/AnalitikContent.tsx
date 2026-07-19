"use client";

import { useMemo, useState } from "react";
import { Icon, Icons } from "../components/icons";
import { KpiCard } from "../components/blocks";
import { AreaChart, RankBars, ColumnChart, Donut } from "../components/charts";
import { useToast } from "../components/ui";
import { useStore } from "../lib/store";
import {
  kpiForRange,
  pctChange,
  revenueSeries,
  topMenu,
  hourHistogram,
  channelBreakdown,
  allMemberStats,
  repeatRate,
  orderTotal,
  isRevenue,
} from "../lib/derive";
import { DAY_MS, NOW, rupiah, rupiahShort, startOfDay, dateTime } from "../lib/format";
import { channelLabel } from "../components/ui";

type Range = 7 | 14 | 30;

export default function AnalitikContent() {
  const { state } = useStore();
  const { toast } = useToast();
  const [days, setDays] = useState<Range>(14);

  const today = startOfDay(NOW);
  const start = today - (days - 1) * DAY_MS;
  const end = NOW;
  const prevStart = start - days * DAY_MS;
  const prevEnd = start;

  const cur = kpiForRange(state, start, end);
  const prev = kpiForRange(state, prevStart, prevEnd);

  const series = revenueSeries(state, days).map((d) => ({
    label: d.label,
    value: d.revenue,
    sub: `${d.orders} order`,
  }));
  const menuRows = topMenu(state, start, end);
  const maxMenuRev = Math.max(1, ...menuRows.map((m) => m.revenue));

  const hours = hourHistogram(state, start, end);
  const hourData = [];
  for (let h = 8; h <= 21; h++) {
    hourData.push({ label: String(h), value: hours[h] });
  }

  const chan = channelBreakdown(state, start, end);
  const stats = useMemo(() => allMemberStats(state), [state]);
  const repeat = repeatRate(stats);

  const topCustomers = useMemo(
    () =>
      [...stats]
        .filter((s) => s.totalSpent > 0)
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 6),
    [stats],
  );
  const maxCust = topCustomers[0]?.totalSpent ?? 1;

  // Gross margin over the period, using menu cost snapshots.
  const margin = useMemo(() => {
    let revenue = 0;
    let cogs = 0;
    for (const o of state.orders) {
      if (!isRevenue(o) || o.createdAt < start || o.createdAt >= end) continue;
      for (const it of o.items) {
        const m = state.menu.find((x) => x.id === it.menuId);
        revenue += it.price * it.qty;
        cogs += (m?.cost ?? 0) * it.qty;
      }
    }
    const profit = revenue - cogs;
    const pct = revenue ? Math.round((profit / revenue) * 100) : 0;
    return { revenue, cogs, profit, pct };
  }, [state.orders, state.menu, start, end]);

  const exportCsv = () => {
    const rows = state.orders.filter(
      (o) => o.createdAt >= start && o.createdAt < end,
    );
    const header = ["Order ID", "Waktu", "Pelanggan", "Sumber", "Status", "Bayar", "Items", "Total"];
    const lines = [header.join(",")];
    for (const o of rows) {
      const items = o.items.map((it) => `${it.qty}x ${it.name}`).join("; ");
      const cells = [
        "#" + o.id,
        dateTime(o.createdAt),
        o.customerName,
        channelLabel(o.channel),
        o.status,
        o.paid ? "Lunas" : "Belum",
        items,
        String(orderTotal(o)),
      ].map((c) => `"${String(c).replace(/"/g, '""')}"`);
      lines.push(cells.join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-${state.business.name.toLowerCase().replace(/\s+/g, "-")}-${days}hari.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(`${rows.length} order diekspor ke CSV`);
  };

  return (
    <>
      <div className="dash-page-head">
        <div>
          <h1>Analitik</h1>
          <p>Performa {days} hari terakhir — semua dihitung dari data order kamu.</p>
        </div>
        <div className="dash-head-actions">
          <div className="dash-segmented">
            {([7, 14, 30] as Range[]).map((d) => (
              <button
                key={d}
                className={"dash-seg" + (days === d ? " active" : "")}
                onClick={() => setDays(d)}
              >
                {d} Hari
              </button>
            ))}
          </div>
          <button className="dash-btn dash-btn-ghost" onClick={exportCsv}>
            <Icon paths={Icons.download} size={16} /> Ekspor CSV
          </button>
        </div>
      </div>

      <div className="dash-kpis">
        <KpiCard
          icon={Icons.wallet}
          label="Pendapatan"
          value={rupiah(cur.revenue)}
          delta={pctChange(cur.revenue, prev.revenue)}
          compareLabel={`vs ${days} hari sebelumnya`}
        />
        <KpiCard
          icon={Icons.bag}
          label="Total order"
          value={String(cur.orders)}
          delta={pctChange(cur.orders, prev.orders)}
          compareLabel={`vs ${days} hari sebelumnya`}
        />
        <KpiCard
          icon={Icons.receipt}
          label="Rata-rata / order"
          value={rupiah(cur.aov)}
          delta={pctChange(cur.aov, prev.aov)}
          compareLabel={`vs ${days} hari sebelumnya`}
        />
        <KpiCard
          icon={Icons.refresh}
          label="Repeat rate"
          value={`${Math.round(repeat)}%`}
          foot={<span className="muted">member order ≥2×</span>}
        />
      </div>

      <div className="dash-card" style={{ marginBottom: 18 }}>
        <div className="dash-card-head">
          <div>
            <h2>Tren Penjualan</h2>
            <div className="sub">Pendapatan harian ({days} hari)</div>
          </div>
        </div>
        <AreaChart data={series} height={220} />
      </div>

      <div className="dash-grid-2b">
        <div className="dash-card">
          <div className="dash-card-head">
            <h2>Menu Terlaris</h2>
            <div className="sub">Berdasarkan omzet</div>
          </div>
          {menuRows.length ? (
            <RankBars
              rows={menuRows.slice(0, 7).map((m) => ({
                label: `${m.item.emoji} ${m.item.name}`,
                sub: `${m.qty} · ${rupiahShort(m.revenue)}`,
                value: m.revenue,
                max: maxMenuRev,
              }))}
            />
          ) : (
            <div className="dash-empty"><p className="dash-empty-sub">Belum ada data.</p></div>
          )}
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h2>Pelanggan Teratas</h2>
            <div className="sub">Berdasarkan total belanja</div>
          </div>
          {topCustomers.length ? (
            <RankBars
              rows={topCustomers.map((c) => ({
                label: c.member.name,
                sub: `${c.orderCount}× · ${rupiahShort(c.totalSpent)}`,
                value: c.totalSpent,
                max: maxCust,
              }))}
            />
          ) : (
            <div className="dash-empty"><p className="dash-empty-sub">Belum ada data.</p></div>
          )}
        </div>
      </div>

      <div className="dash-grid-2b">
        <div className="dash-card">
          <div className="dash-card-head">
            <h2>Order per Jam</h2>
            <div className="sub">Jam paling ramai</div>
          </div>
          <ColumnChart data={hourData} height={170} />
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h2>Sumber Order</h2>
            <div className="sub">Kontribusi tiap kanal</div>
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
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <div>
            <h2>Estimasi Laba Kotor</h2>
            <div className="sub">Pendapatan − modal (HPP) menu · {days} hari</div>
          </div>
        </div>
        <div className="dash-stat-strip" style={{ borderTop: "none" }}>
          <div className="dash-mini">
            <div className="n">{rupiah(margin.revenue)}</div>
            <div className="l">Pendapatan</div>
          </div>
          <div className="dash-mini">
            <div className="n">{rupiah(margin.cogs)}</div>
            <div className="l">Modal / HPP</div>
          </div>
          <div className="dash-mini">
            <div className="n" style={{ color: "var(--green)" }}>{rupiah(margin.profit)}</div>
            <div className="l">Laba kotor</div>
          </div>
          <div className="dash-mini">
            <div className="n">{margin.pct}%</div>
            <div className="l">Margin kotor</div>
          </div>
        </div>
      </div>
    </>
  );
}
