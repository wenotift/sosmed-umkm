"use client";

import { useMemo, useState } from "react";
import { Icon, Icons } from "../components/icons";
import { EmptyState } from "../components/ui";
import { MemberDetailModal } from "./MemberDetailModal";
import { BroadcastModal } from "./BroadcastModal";
import { AddMemberModal } from "./AddMemberModal";
import { useStore, tierColor } from "../lib/store";
import { allMemberStats } from "../lib/derive";
import { rupiah, timeAgo } from "../lib/format";
import type { MemberTier } from "../lib/types";

const SEGMENTS: (MemberTier | "all")[] = ["all", "VIP", "Reguler", "Baru", "Pasif"];
const SEG_LABEL: Record<string, string> = {
  all: "Semua",
  VIP: "VIP",
  Reguler: "Reguler",
  Baru: "Baru",
  Pasif: "Pasif",
};

type SortKey = "spent" | "points" | "orders" | "recent";

export default function MemberContent() {
  const { state } = useStore();
  const [seg, setSeg] = useState<MemberTier | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("spent");
  const [detail, setDetail] = useState<string | null>(null);
  const [broadcast, setBroadcast] = useState(false);
  const [adding, setAdding] = useState(false);

  const stats = useMemo(() => allMemberStats(state), [state]);

  const summary = useMemo(() => {
    const vip = stats.filter((s) => s.tier === "VIP").length;
    const pasif = stats.filter((s) => s.tier === "Pasif").length;
    const points = stats.reduce((a, s) => a + s.points, 0);
    const active = stats.filter((s) => s.tier !== "Pasif" && s.orderCount >= 1).length;
    return { total: stats.length, vip, pasif, points, active };
  }, [stats]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = stats.filter((s) => {
      if (seg !== "all" && s.tier !== seg) return false;
      if (needle) {
        if (
          !s.member.name.toLowerCase().includes(needle) &&
          !s.member.wa.includes(needle)
        )
          return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "spent") return b.totalSpent - a.totalSpent;
      if (sort === "points") return b.points - a.points;
      if (sort === "orders") return b.orderCount - a.orderCount;
      return (b.lastOrderAt ?? 0) - (a.lastOrderAt ?? 0);
    });
    return list;
  }, [stats, seg, q, sort]);

  return (
    <>
      <div className="dash-page-head">
        <div>
          <h1>Member & Poin</h1>
          <p>Database pelanggan kamu — otomatis dari nomor WhatsApp mereka.</p>
        </div>
        <div className="dash-head-actions">
          <button className="dash-btn dash-btn-ghost" onClick={() => setAdding(true)}>
            <Icon paths={Icons.plus} size={16} /> Tambah member
          </button>
          <button className="dash-btn dash-btn-primary" onClick={() => setBroadcast(true)}>
            <Icon paths={Icons.send} size={16} /> Kirim broadcast
          </button>
        </div>
      </div>

      <div className="dash-kpis">
        <div className="dash-kpi">
          <div className="dash-kpi-top">
            <span className="dash-kpi-ic"><Icon paths={Icons.users} size={17} /></span>
            Total member
          </div>
          <div className="dash-kpi-val">{summary.total}</div>
          <div className="dash-kpi-foot"><span className="muted">{summary.active} aktif</span></div>
        </div>
        <div className="dash-kpi">
          <div className="dash-kpi-top">
            <span className="dash-kpi-ic"><Icon paths={Icons.crown} size={17} /></span>
            Member VIP
          </div>
          <div className="dash-kpi-val">{summary.vip}</div>
          <div className="dash-kpi-foot"><span className="muted">pelanggan paling loyal</span></div>
        </div>
        <div className="dash-kpi">
          <div className="dash-kpi-top">
            <span className="dash-kpi-ic"><Icon paths={Icons.clock} size={17} /></span>
            Member pasif
          </div>
          <div className="dash-kpi-val">{summary.pasif}</div>
          <div className="dash-kpi-foot"><span className="muted">&gt;30 hari tak order</span></div>
        </div>
        <div className="dash-kpi">
          <div className="dash-kpi-top">
            <span className="dash-kpi-ic"><Icon paths={Icons.star} size={17} /></span>
            Poin beredar
          </div>
          <div className="dash-kpi-val">{summary.points}</div>
          <div className="dash-kpi-foot"><span className="muted">belum ditukar voucher</span></div>
        </div>
      </div>

      <div className="dash-toolbar">
        <div className="dash-search">
          <Icon paths={Icons.search} size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama atau nomor WhatsApp…"
          />
        </div>
        <div className="dash-segmented">
          {SEGMENTS.map((s) => (
            <button
              key={s}
              className={"dash-seg" + (seg === s ? " active" : "")}
              onClick={() => setSeg(s)}
            >
              {SEG_LABEL[s]}
              <span className="cnt">
                {s === "all" ? stats.length : stats.filter((x) => x.tier === s).length}
              </span>
            </button>
          ))}
        </div>
        <select
          className="dash-select"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          <option value="spent">Urut: Belanja terbanyak</option>
          <option value="points">Urut: Poin terbanyak</option>
          <option value="orders">Urut: Order terbanyak</option>
          <option value="recent">Urut: Order terbaru</option>
        </select>
      </div>

      <div className="dash-card">
        {rows.length === 0 ? (
          <EmptyState title="Tidak ada member" sub="Coba ubah filter atau kata kunci." />
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Tier</th>
                  <th style={{ textAlign: "right" }}>Order</th>
                  <th style={{ textAlign: "right" }}>Total belanja</th>
                  <th style={{ textAlign: "right" }}>Poin</th>
                  <th>Terakhir order</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr
                    key={s.member.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setDetail(s.member.id)}
                  >
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="dash-avatar-sm">
                          {s.member.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <div className="dash-member-name">{s.member.name}</div>
                          <div className="dash-member-sub">+{s.member.wa}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={"dash-tier " + tierColor(s.tier)}>{s.tier}</span>
                    </td>
                    <td className="num" style={{ textAlign: "right" }}>{s.orderCount}</td>
                    <td className="num" style={{ textAlign: "right" }}>{rupiah(s.totalSpent)}</td>
                    <td style={{ textAlign: "right" }}>
                      <span className="dash-points-pill">{s.points}</span>
                    </td>
                    <td style={{ color: "var(--ink-soft)", fontSize: 12.5 }}>
                      {s.lastOrderAt ? timeAgo(s.lastOrderAt) : "Belum pernah"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {state.broadcasts.length > 0 && (
        <div className="dash-card" style={{ marginTop: 18 }}>
          <div className="dash-card-head">
            <h2>Riwayat Broadcast</h2>
            <div className="sub">{state.broadcasts.length} pesan terkirim</div>
          </div>
          <div>
            {state.broadcasts.map((b) => (
              <div className="dash-orow" key={b.id}>
                <div className="dash-orow-main">
                  <div className="dash-orow-meta" style={{ marginTop: 0, marginBottom: 4 }}>
                    <span className="dash-chip" style={{ padding: "3px 9px", fontSize: 11 }}>
                      Segmen {b.segment}
                    </span>
                    <span>· {b.recipients} penerima</span>
                    <span>· {timeAgo(b.sentAt)}</span>
                  </div>
                  <div className="dash-orow-items" style={{ maxWidth: "70ch", whiteSpace: "normal" }}>
                    {b.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <MemberDetailModal memberId={detail} onClose={() => setDetail(null)} />
      {broadcast && <BroadcastModal onClose={() => setBroadcast(false)} />}
      {adding && <AddMemberModal onClose={() => setAdding(false)} />}
    </>
  );
}
