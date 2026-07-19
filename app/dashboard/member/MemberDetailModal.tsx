"use client";

import { useState } from "react";
import { Modal, ConfirmDialog, useToast } from "../components/ui";
import { Icon, Icons } from "../components/icons";
import { useStore, tierColor } from "../lib/store";
import { computeMemberStats } from "../lib/derive";
import { rupiah, longDate, timeAgo } from "../lib/format";


export function MemberDetailModal({
  memberId,
  onClose,
}: {
  memberId: string | null;
  onClose: () => void;
}) {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [confirmRedeem, setConfirmRedeem] = useState(false);

  const member = memberId ? state.members.find((m) => m.id === memberId) ?? null : null;
  if (!member) return null;

  const stats = computeMemberStats(member, state.orders, state.business);
  const biz = state.business;
  const canRedeem = stats.points >= biz.voucherThreshold;
  const vouchers = Math.floor(stats.points / biz.voucherThreshold);

  const memberOrders = state.orders
    .filter((o) => o.memberId === member.id)
    .slice(0, 5);

  const startEdit = () => {
    setName(member.name);
    setWa(member.wa);
    setEditing(true);
  };
  const saveEdit = () => {
    dispatch({
      type: "MEMBER_UPDATE",
      id: member.id,
      patch: { name: name.trim() || member.name, wa: wa.replace(/[^\d]/g, "") || member.wa },
    });
    toast("Data member diperbarui");
    setEditing(false);
  };

  const doRedeem = () => {
    dispatch({ type: "MEMBER_REDEEM", id: member.id, points: biz.voucherThreshold });
    toast(
      `Voucher ${rupiah(biz.voucherValue)} ditukar · −${biz.voucherThreshold} poin`,
    );
    setConfirmRedeem(false);
  };

  const waLink = `https://wa.me/${member.wa}?text=${encodeURIComponent(
    `Halo ${member.name}! 👋`,
  )}`;

  return (
    <>
      <Modal open onClose={onClose} title={member.name} wide>
        <div className="dash-member-head">
          <div className="dash-avatar-sm" style={{ width: 46, height: 46, fontSize: 16 }}>
            {member.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className={"dash-tier " + tierColor(stats.tier)}>{stats.tier}</span>
              <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>+{member.wa}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 3 }}>
              Member sejak {longDate(member.joinedAt)}
            </div>
          </div>
          <div className="dash-points-pill" style={{ fontSize: 15, padding: "6px 13px" }}>
            {stats.points} poin
          </div>
        </div>

        {editing ? (
          <div style={{ marginTop: 16 }}>
            <div className="dash-field">
              <label>Nama</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="dash-field">
              <label>WhatsApp</label>
              <input
                value={wa}
                onChange={(e) => setWa(e.target.value)}
                inputMode="numeric"
              />
            </div>
            <div className="dash-form-actions">
              <button className="dash-btn dash-btn-ghost" onClick={() => setEditing(false)}>
                Batal
              </button>
              <button className="dash-btn dash-btn-primary" onClick={saveEdit}>
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="dash-stat-strip" style={{ borderTop: "none", padding: "16px 0 0" }}>
              <div className="dash-mini">
                <div className="n">{stats.orderCount}</div>
                <div className="l">Total order</div>
              </div>
              <div className="dash-mini">
                <div className="n">{rupiah(stats.totalSpent)}</div>
                <div className="l">Total belanja</div>
              </div>
              <div className="dash-mini">
                <div className="n">{stats.earnedPoints}</div>
                <div className="l">Poin didapat</div>
              </div>
              <div className="dash-mini">
                <div className="n">{member.redeemedPoints}</div>
                <div className="l">Poin ditukar</div>
              </div>
            </div>

            <div
              className="dash-cap-banner"
              style={{ marginTop: 16, marginBottom: 0 }}
            >
              <span className="dash-cap-ic">
                <Icon paths={Icons.gift} size={18} />
              </span>
              <div className="dash-cap-text">
                <b>
                  {canRedeem
                    ? `Bisa tukar ${vouchers} voucher ${rupiah(biz.voucherValue)}`
                    : `${biz.voucherThreshold - stats.points} poin lagi menuju voucher`}
                </b>
                <p>
                  {biz.voucherThreshold} poin = voucher {rupiah(biz.voucherValue)} ·
                  1 poin / {rupiah(biz.pointRate)}
                </p>
              </div>
              <button
                className="dash-btn dash-btn-primary dash-btn-sm"
                disabled={!canRedeem}
                onClick={() => setConfirmRedeem(true)}
              >
                Tukar voucher
              </button>
            </div>

            {memberOrders.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: "var(--ink-soft)" }}>
                  RIWAYAT ORDER TERAKHIR
                </div>
                <div className="dash-def-list">
                  {memberOrders.map((o) => (
                    <div className="dash-def-row" key={o.id}>
                      <span className="k">
                        #{o.id} · {timeAgo(o.createdAt)}
                      </span>
                      <span className="v">
                        {rupiah(o.items.reduce((s, it) => s + it.price * it.qty, 0))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="dash-form-actions">
              <a className="dash-btn dash-btn-ghost" href={waLink} target="_blank" rel="noopener noreferrer">
                <Icon paths={Icons.phone} size={15} /> Chat
              </a>
              <button className="dash-btn dash-btn-ghost" onClick={startEdit}>
                <Icon paths={Icons.edit} size={15} /> Edit data
              </button>
            </div>
          </>
        )}
      </Modal>

      <ConfirmDialog
        open={confirmRedeem}
        title="Tukar voucher?"
        body={`Tukar ${biz.voucherThreshold} poin ${member.name} jadi voucher ${rupiah(
          biz.voucherValue,
        )}. Poin akan berkurang.`}
        confirmLabel="Ya, tukar"
        onConfirm={doRedeem}
        onCancel={() => setConfirmRedeem(false)}
      />
    </>
  );
}
