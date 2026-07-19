"use client";

import { useMemo, useState } from "react";
import { Icon, Icons } from "../components/icons";
import { ConfirmDialog, EmptyState, useToast } from "../components/ui";
import { MenuFormModal } from "./MenuFormModal";
import { useStore } from "../lib/store";
import { isRevenue } from "../lib/derive";
import { rupiah } from "../lib/format";
import type { MenuCategory, MenuItem } from "../lib/types";

const CATS: (MenuCategory | "all")[] = ["all", "Kopi", "Non-Kopi", "Makanan", "Snack"];

export default function MenuContent() {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const [cat, setCat] = useState<MenuCategory | "all">("all");
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState<MenuItem | null>(null);

  // sold count + revenue per menu id, from all settled orders
  const sold = useMemo(() => {
    const map = new Map<string, { qty: number; revenue: number }>();
    for (const o of state.orders) {
      if (!isRevenue(o)) continue;
      for (const it of o.items) {
        const cur = map.get(it.menuId) ?? { qty: 0, revenue: 0 };
        cur.qty += it.qty;
        cur.revenue += it.qty * it.price;
        map.set(it.menuId, cur);
      }
    }
    return map;
  }, [state.orders]);

  const shown = state.menu.filter((m) => cat === "all" || m.category === cat);
  const availableCount = state.menu.filter((m) => m.available).length;

  const confirmDelete = () => {
    if (!toDelete) return;
    dispatch({ type: "MENU_DELETE", id: toDelete.id });
    toast(`Menu "${toDelete.name}" dihapus`, "info");
    setToDelete(null);
  };

  return (
    <>
      <div className="dash-page-head">
        <div>
          <h1>Menu Digital</h1>
          <p>
            {state.menu.length} item · {availableCount} tersedia. Update di sini langsung
            tampil di menu QR & AI chat.
          </p>
        </div>
        <div className="dash-head-actions">
          <button className="dash-btn dash-btn-primary" onClick={() => setCreating(true)}>
            <Icon paths={Icons.plus} size={16} /> Tambah menu
          </button>
        </div>
      </div>

      <div className="dash-segmented" style={{ marginBottom: 16 }}>
        {CATS.map((c) => (
          <button
            key={c}
            className={"dash-seg" + (cat === c ? " active" : "")}
            onClick={() => setCat(c)}
          >
            {c === "all" ? "Semua" : c}
            <span className="cnt">
              {c === "all"
                ? state.menu.length
                : state.menu.filter((m) => m.category === c).length}
            </span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="dash-card">
          <EmptyState title="Belum ada menu di kategori ini" />
        </div>
      ) : (
        <div className="dash-menu-grid">
          {shown.map((m) => {
            const s = sold.get(m.id);
            const margin = m.price > 0 ? Math.round(((m.price - m.cost) / m.price) * 100) : 0;
            return (
              <div className={"dash-menu-card" + (m.available ? "" : " off")} key={m.id}>
                <div className="dash-menu-card-top">
                  <span className="dash-menu-emoji">{m.emoji}</span>
                  <div className="dash-menu-info">
                    <div className="dash-menu-name">{m.name}</div>
                    <div className="dash-menu-cat">{m.category}</div>
                  </div>
                  <button
                    type="button"
                    className={"dash-toggle" + (m.available ? " on" : "")}
                    onClick={() => {
                      dispatch({ type: "MENU_TOGGLE", id: m.id });
                      toast(
                        m.available
                          ? `"${m.name}" ditandai habis`
                          : `"${m.name}" tersedia lagi`,
                        "info",
                      );
                    }}
                    aria-label="Ketersediaan"
                    title={m.available ? "Tersedia" : "Habis"}
                  />
                </div>
                <div className="dash-menu-price">
                  {rupiah(m.price)}
                  <span className="dash-menu-margin">margin {margin}%</span>
                </div>
                <div className="dash-menu-stats">
                  <span>
                    <b>{s?.qty ?? 0}</b> terjual
                  </span>
                  <span>
                    <b>{rupiah(s?.revenue ?? 0)}</b> omzet
                  </span>
                </div>
                <div className="dash-menu-actions">
                  <button className="dash-btn dash-btn-ghost dash-btn-sm" onClick={() => setEditing(m)}>
                    <Icon paths={Icons.edit} size={14} /> Edit
                  </button>
                  <button
                    className="dash-icon-btn"
                    onClick={() => setToDelete(m)}
                    aria-label="Hapus"
                  >
                    <Icon paths={Icons.trash} size={15} />
                  </button>
                </div>
                {!m.available && <div className="dash-menu-habis">HABIS</div>}
              </div>
            );
          })}
        </div>
      )}

      {creating && <MenuFormModal item={null} onClose={() => setCreating(false)} />}
      {editing && <MenuFormModal item={editing} onClose={() => setEditing(null)} />}
      <ConfirmDialog
        open={!!toDelete}
        title="Hapus menu?"
        body={`"${toDelete?.name}" akan dihapus dari daftar menu. Order lama yang sudah tercatat tidak berubah.`}
        confirmLabel="Hapus"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
