"use client";

import { Modal, StatusBadge, ChannelBadge, useToast, statusLabel } from "./ui";
import { Icon, Icons } from "./icons";
import { useStore } from "../lib/store";
import { orderTotal, orderPoints, computeMemberStats } from "../lib/derive";
import { rupiah, dateTime } from "../lib/format";
import type { Order, OrderStatus } from "../lib/types";

// The forward path a "Konfirmasi" button advances an order along.
const NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  baru: "diproses",
  diproses: "siap",
  siap: "selesai",
};
const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  baru: "Konfirmasi & proses",
  diproses: "Tandai siap",
  siap: "Selesaikan order",
};

export function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  if (!order) return null;

  const total = orderTotal(order);
  const pts = orderPoints({ ...order, paid: true, status: "selesai" }, state.business);
  const member = order.memberId
    ? state.members.find((m) => m.id === order.memberId) ?? null
    : null;
  const memberStats = member
    ? computeMemberStats(member, state.orders, state.business)
    : null;

  const advance = () => {
    const next = NEXT[order.status];
    if (!next) return;
    dispatch({ type: "ORDER_STATUS", id: order.id, status: next });
    toast(`Order #${order.id} → ${statusLabel(next)}`);
    if (next === "selesai") onClose();
  };

  const setPaid = () => {
    dispatch({ type: "ORDER_PAID", id: order.id, paid: true });
    toast(`Pembayaran order #${order.id} dikonfirmasi`);
  };

  const cancel = () => {
    dispatch({ type: "ORDER_STATUS", id: order.id, status: "batal" });
    toast(`Order #${order.id} dibatalkan`, "info");
    onClose();
  };

  const waLink = `https://wa.me/${order.customerWa}?text=${encodeURIComponent(
    `Halo ${order.customerName}, soal order #${order.id} kamu di ${state.business.name} 🙏`,
  )}`;

  const canAdvance = order.status in NEXT;

  return (
    <Modal open onClose={onClose} title={`Order #${order.id}`} wide>
      <div className="dash-od-head">
        <div>
          <StatusBadge status={order.status} />{" "}
          <ChannelBadge channel={order.channel} />
        </div>
        <span className={order.paid ? "dash-paid" : "dash-unpaid"}>
          {order.paid ? "Lunas" : "Belum bayar"}
        </span>
      </div>

      <div className="dash-def-list" style={{ marginTop: 14 }}>
        <div className="dash-def-row">
          <span className="k">Pelanggan</span>
          <span className="v">{order.customerName}</span>
        </div>
        <div className="dash-def-row">
          <span className="k">WhatsApp</span>
          <span className="v">+{order.customerWa}</span>
        </div>
        {order.table && (
          <div className="dash-def-row">
            <span className="k">Meja</span>
            <span className="v">Meja {order.table}</span>
          </div>
        )}
        <div className="dash-def-row">
          <span className="k">Waktu</span>
          <span className="v">{dateTime(order.createdAt)}</span>
        </div>
        {memberStats && (
          <div className="dash-def-row">
            <span className="k">Status member</span>
            <span className="v">
              {memberStats.tier} · {memberStats.points} poin
            </span>
          </div>
        )}
      </div>

      <div className="dash-od-items">
        {order.items.map((it, i) => (
          <div className="dash-od-item" key={i}>
            <span className="q">{it.qty}×</span>
            <span className="n">{it.name}</span>
            <span className="p">{rupiah(it.price * it.qty)}</span>
          </div>
        ))}
        {order.note && <div className="dash-od-note">Catatan: {order.note}</div>}
        <div className="dash-od-total">
          <span>Total</span>
          <b>{rupiah(total)}</b>
        </div>
        <div className="dash-od-points">
          <Icon paths={Icons.star} size={13} /> Order ini bernilai{" "}
          <b>+{pts} poin</b> untuk member saat lunas
        </div>
      </div>

      <div className="dash-od-actions">
        <a
          className="dash-btn dash-btn-ghost"
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon paths={Icons.phone} size={15} /> Chat pelanggan
        </a>
        {order.status !== "batal" && order.status !== "selesai" && !order.paid && (
          <button className="dash-btn dash-btn-ghost" onClick={setPaid}>
            <Icon paths={Icons.wallet} size={15} /> Konfirmasi bayar
          </button>
        )}
        {order.status !== "batal" && order.status !== "selesai" && (
          <button className="dash-btn dash-btn-ghost dash-od-cancel" onClick={cancel}>
            Batalkan
          </button>
        )}
        {canAdvance && (
          <button className="dash-btn dash-btn-primary" onClick={advance}>
            <Icon paths={Icons.check} size={15} /> {NEXT_LABEL[order.status]}
          </button>
        )}
      </div>
    </Modal>
  );
}
