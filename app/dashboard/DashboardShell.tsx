"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon, Icons } from "./components/icons";
import { useStore } from "./lib/store";
import { monthlyCapacity, pipelineCounts } from "./lib/derive";
import { longDate, NOW } from "./lib/format";

interface NavDef {
  href: string;
  label: string;
  icon: ReactNode;
  title: string;
  sub: string;
}

const NAV: NavDef[] = [
  { href: "/dashboard", label: "Ringkasan", icon: Icons.grid, title: "Ringkasan", sub: "Ikhtisar bisnis kamu hari ini" },
  { href: "/dashboard/pesanan", label: "Pesanan", icon: Icons.receipt, title: "Pesanan", sub: "Kelola order masuk dari WhatsApp & QR meja" },
  { href: "/dashboard/menu", label: "Menu", icon: Icons.menu, title: "Menu Digital", sub: "Atur item, harga, dan ketersediaan" },
  { href: "/dashboard/member", label: "Member & Poin", icon: Icons.users, title: "Member & Poin", sub: "Database pelanggan, poin, dan broadcast" },
  { href: "/dashboard/analitik", label: "Analitik", icon: Icons.chart, title: "Analitik", sub: "Tren penjualan, menu, dan pelanggan" },
  { href: "/dashboard/pengaturan", label: "Pengaturan", icon: Icons.gear, title: "Pengaturan", sub: "Profil bisnis, langganan, dan tim" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { state } = useStore();
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = () => setDrawer(false);

  const current =
    [...NAV].sort((a, b) => b.href.length - a.href.length).find((n) =>
      pathname === n.href || pathname.startsWith(n.href + "/"),
    ) ?? NAV[0];

  const cap = monthlyCapacity(state);
  const pipe = pipelineCounts(state);
  const openOrders = pipe.baru + pipe.diproses;

  return (
    <div className={"dash" + (drawer ? " side-open" : "")}>
      <aside className="dash-side">
        <div className="dash-brand">
          <div className="dash-brand-mark">S</div>
          <div>
            <div className="dash-brand-name">Sosmed AI</div>
            <div className="dash-brand-sub">Dashboard Bisnis</div>
          </div>
        </div>

        <nav className="dash-nav">
          {NAV.map((n) => {
            const active =
              pathname === n.href || pathname.startsWith(n.href + "/");
            const badge =
              n.href === "/dashboard/pesanan" && openOrders > 0 ? openOrders : null;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={closeDrawer}
                className={"dash-nav-item" + (active ? " active" : "")}
              >
                <Icon paths={n.icon} size={19} />
                {n.label}
                {badge !== null && <span className="dash-nav-badge">{badge}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="dash-side-foot">
          <div className="dash-plan-card">
            <div className="dash-plan-top">
              <span className="dash-plan-name">
                <Icon paths={Icons.spark} size={14} />
                Paket {state.business.plan}
              </span>
              <span className="dash-plan-pill">Aktif</span>
            </div>
            <div className="dash-plan-meter">
              <i
                className={cap.pct >= 85 ? "warn" : ""}
                style={{ width: `${cap.pct}%` }}
              />
            </div>
            <div className="dash-plan-cap">
              <b>{cap.used}</b> / {cap.limit} order bulan ini
            </div>
          </div>
        </div>
      </aside>

      {drawer && <div className="dash-scrim" onClick={() => setDrawer(false)} />}

      <div className="dash-main">
        <header className="dash-top">
          <button
            className="dash-burger"
            onClick={() => setDrawer((d) => !d)}
            aria-label="Menu"
          >
            <Icon paths={Icons.grid} size={18} />
          </button>
          <div>
            <div className="dash-top-title">{current.title}</div>
            <div className="dash-top-sub">{current.sub}</div>
          </div>
          <div className="dash-top-right">
            <span className="dash-top-date">
              <Icon paths={Icons.clock} size={14} />
              {longDate(NOW)}
            </span>
            <button className="dash-icon-btn" aria-label="Notifikasi">
              <Icon paths={Icons.bell} size={17} />
            </button>
            <div className="dash-avatar" title={state.business.name}>
              {initials(state.business.name)}
            </div>
          </div>
        </header>

        <main className="dash-content">{children}</main>
      </div>
    </div>
  );
}
