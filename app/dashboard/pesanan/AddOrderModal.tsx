"use client";

import { useMemo, useState } from "react";
import { Modal, useToast } from "../components/ui";
import { Icon, Icons } from "../components/icons";
import { useStore, nextOrderId } from "../lib/store";
import { rupiah } from "../lib/format";
import { NOW } from "../lib/format";
import type { Order, OrderChannel } from "../lib/types";

// Manual order entry — a counter/walk-in sale the owner logs by hand. It settles
// immediately (paid + selesai) so it counts toward revenue and member points.
export function AddOrderModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [memberId, setMemberId] = useState<string>("");
  const [walkinName, setWalkinName] = useState("");
  const [note, setNote] = useState("");
  const [channel, setChannel] = useState<OrderChannel>("walkin");
  const [table, setTable] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const available = state.menu.filter((m) => m.available);

  const items = useMemo(
    () =>
      Object.entries(qty)
        .filter(([, q]) => q > 0)
        .map(([id, q]) => {
          const m = state.menu.find((x) => x.id === id)!;
          return { menuId: id, name: m.name, qty: q, price: m.price };
        }),
    [qty, state.menu],
  );
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  const bump = (id: string, d: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) }));

  const submit = () => {
    if (items.length === 0) {
      setErr("Pilih minimal satu item menu.");
      return;
    }
    const member = memberId ? state.members.find((m) => m.id === memberId) : null;
    const name = member ? member.name : walkinName.trim() || "Pelanggan";
    const wa = member ? member.wa : "";
    const noteBits = [note.trim(), table.trim() ? `meja ${table.trim()}` : ""].filter(Boolean);

    const order: Order = {
      id: nextOrderId(state.orders),
      memberId: member ? member.id : null,
      customerName: name,
      customerWa: wa,
      items,
      note: noteBits.join(" · "),
      table: table.trim() ? Number(table.trim()) : null,
      channel,
      status: "selesai",
      paid: true,
      createdAt: NOW,
    };
    dispatch({ type: "ORDER_ADD", order });
    toast(`Order #${order.id} dicatat · ${rupiah(total)}`);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Catat Order Manual" wide>
      <div className="dash-field">
        <label>Pelanggan</label>
        <select
          className="dash-select"
          style={{ width: "100%" }}
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        >
          <option value="">— Walk-in / non-member —</option>
          {state.members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} (+{m.wa})
            </option>
          ))}
        </select>
      </div>

      {!memberId && (
        <div className="dash-field">
          <label>Nama walk-in (opsional)</label>
          <input
            value={walkinName}
            onChange={(e) => setWalkinName(e.target.value)}
            placeholder="mis. Meja 4 / Tamu"
          />
        </div>
      )}

      <div className="dash-field">
        <label>Item pesanan</label>
        <div className="dash-order-picker">
          {available.map((m) => (
            <div className="dash-pick-row" key={m.id}>
              <span className="dash-menu-emoji" style={{ width: 34, height: 34, fontSize: 17 }}>
                {m.emoji}
              </span>
              <div className="dash-pick-mid">
                <div className="dash-pick-name">{m.name}</div>
                <div className="dash-pick-price">{rupiah(m.price)}</div>
              </div>
              <div className="dash-qty-input">
                <button type="button" onClick={() => bump(m.id, -1)} aria-label="Kurangi">
                  −
                </button>
                <span>{qty[m.id] ?? 0}</span>
                <button type="button" onClick={() => bump(m.id, 1)} aria-label="Tambah">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-field-row">
        <div className="dash-field">
          <label>Sumber order</label>
          <select
            className="dash-select"
            style={{ width: "100%" }}
            value={channel}
            onChange={(e) => setChannel(e.target.value as OrderChannel)}
          >
            <option value="walkin">Walk-in / Kasir</option>
            <option value="qr">QR Meja</option>
            <option value="bot">AI Chat WhatsApp</option>
          </select>
        </div>
        <div className="dash-field">
          <label>No. meja (opsional)</label>
          <input
            value={table}
            onChange={(e) => setTable(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="mis. 4"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="dash-field">
        <label>Catatan (opsional)</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="mis. less sugar, takeaway"
        />
      </div>

      {err && <div className="dash-field"><div className="err">{err}</div></div>}

      <div className="dash-add-total">
        <span>Total</span>
        <b>{rupiah(total)}</b>
      </div>

      <div className="dash-form-actions">
        <button className="dash-btn dash-btn-ghost" onClick={onClose}>
          Batal
        </button>
        <button className="dash-btn dash-btn-primary" onClick={submit}>
          <Icon paths={Icons.check} size={15} /> Catat order
        </button>
      </div>
    </Modal>
  );
}
