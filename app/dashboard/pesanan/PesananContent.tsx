"use client";

import { useMemo, useState } from "react";
import { Icon, Icons } from "../components/icons";
import {
  StatusBadge,
  ChannelBadge,
  EmptyState,
  statusLabel,
} from "../components/ui";
import { OrderDetailModal } from "../components/OrderDetailModal";
import { AddOrderModal } from "./AddOrderModal";
import { useStore } from "../lib/store";
import { orderTotal } from "../lib/derive";
import { rupiah, timeAgo, clock } from "../lib/format";
import type { Order, OrderChannel, OrderStatus } from "../lib/types";

const STATUS_TABS: (OrderStatus | "all")[] = [
  "all",
  "baru",
  "diproses",
  "siap",
  "selesai",
  "batal",
];

export default function PesananContent() {
  const { state } = useStore();
  const [tab, setTab] = useState<OrderStatus | "all">("all");
  const [channel, setChannel] = useState<OrderChannel | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [adding, setAdding] = useState(false);
  const [limit, setLimit] = useState(25);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: state.orders.length };
    for (const o of state.orders) c[o.status] = (c[o.status] ?? 0) + 1;
    return c;
  }, [state.orders]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return state.orders.filter((o) => {
      if (tab !== "all" && o.status !== tab) return false;
      if (channel !== "all" && o.channel !== channel) return false;
      if (needle) {
        const hay = (
          o.id +
          " " +
          o.customerName +
          " " +
          o.items.map((it) => it.name).join(" ")
        ).toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [state.orders, tab, channel, q]);

  const shown = filtered.slice(0, limit);
  // keep the selected order reference fresh after store mutations
  const liveSelected = selected
    ? state.orders.find((o) => o.id === selected.id) ?? null
    : null;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <h1>Pesanan</h1>
          <p>
            {filtered.length} order{tab !== "all" ? ` · ${statusLabel(tab)}` : ""}
          </p>
        </div>
        <div className="dash-head-actions">
          <button className="dash-btn dash-btn-primary" onClick={() => setAdding(true)}>
            <Icon paths={Icons.plus} size={16} /> Catat order manual
          </button>
        </div>
      </div>

      <div className="dash-toolbar">
        <div className="dash-search">
          <Icon paths={Icons.search} size={16} />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(25);
            }}
            placeholder="Cari #order, nama, atau menu…"
          />
        </div>
        <select
          className="dash-select"
          value={channel}
          onChange={(e) => setChannel(e.target.value as OrderChannel | "all")}
        >
          <option value="all">Semua sumber</option>
          <option value="bot">AI Chat WhatsApp</option>
          <option value="qr">QR Meja</option>
          <option value="walkin">Walk-in / Kasir</option>
        </select>
      </div>

      <div className="dash-segmented" style={{ marginBottom: 16 }}>
        {STATUS_TABS.map((s) => (
          <button
            key={s}
            className={"dash-seg" + (tab === s ? " active" : "")}
            onClick={() => {
              setTab(s);
              setLimit(25);
            }}
          >
            {s === "all" ? "Semua" : statusLabel(s)}
            <span className="cnt">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="dash-card">
        {shown.length === 0 ? (
          <EmptyState
            title="Tidak ada pesanan"
            sub="Coba ubah filter atau kata kunci pencarian."
          />
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Pelanggan</th>
                  <th>Sumber</th>
                  <th>Waktu</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((o) => (
                  <tr key={o.id} onClick={() => setSelected(o)} style={{ cursor: "pointer" }}>
                    <td>
                      <div className="dash-orow-id">#{o.id}</div>
                      <div className="dash-orow-items" style={{ maxWidth: "28ch" }}>
                        {o.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}
                      </div>
                    </td>
                    <td>
                      {o.customerName}
                      {!o.paid && o.status !== "batal" && (
                        <div>
                          <span className="dash-unpaid">Belum bayar</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <ChannelBadge channel={o.channel} />
                    </td>
                    <td>
                      <div>{clock(o.createdAt)}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                        {timeAgo(o.createdAt)}
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="num" style={{ textAlign: "right" }}>
                      {rupiah(orderTotal(o))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filtered.length > limit && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            className="dash-btn dash-btn-ghost"
            onClick={() => setLimit((l) => l + 25)}
          >
            Tampilkan lebih banyak ({filtered.length - limit} lagi)
          </button>
        </div>
      )}

      <OrderDetailModal order={liveSelected} onClose={() => setSelected(null)} />
      {adding && <AddOrderModal onClose={() => setAdding(false)} />}
    </>
  );
}
