"use client";

import { useState } from "react";
import { Icon, Icons } from "../components/icons";
import { ConfirmDialog, Modal, useToast } from "../components/ui";
import { useStore, uid } from "../lib/store";
import { monthlyCapacity } from "../lib/derive";
import { rupiah } from "../lib/format";
import {
  PLAN_CAPACITY,
  PLAN_PRICE,
  PLAN_OUTLETS,
  type PlanName,
  type StaffMember,
} from "../lib/types";

const PLANS: PlanName[] = ["Lite", "Pro", "Max", "Ultra"];
const STAFF_LIMIT: Record<PlanName, number> = { Lite: 1, Pro: 2, Max: 5, Ultra: 10 };
const ROLES: StaffMember["role"][] = ["Owner", "Kasir", "Dapur"];

export default function PengaturanContent() {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const biz = state.business;

  // profile form (local until saved)
  const [name, setName] = useState(biz.name);
  const [outlet, setOutlet] = useState(biz.outlet);
  const [wa, setWa] = useState(biz.wa);

  // loyalty form
  const [pointRate, setPointRate] = useState(String(biz.pointRate));
  const [threshold, setThreshold] = useState(String(biz.voucherThreshold));
  const [voucherValue, setVoucherValue] = useState(String(biz.voucherValue));

  const [planModal, setPlanModal] = useState(false);
  const [staffModal, setStaffModal] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const cap = monthlyCapacity(state);

  const saveProfile = () => {
    dispatch({
      type: "BUSINESS_UPDATE",
      patch: { name: name.trim() || biz.name, outlet: outlet.trim(), wa: wa.replace(/[^\d]/g, "") },
    });
    toast("Profil bisnis disimpan");
  };

  const saveLoyalty = () => {
    dispatch({
      type: "BUSINESS_UPDATE",
      patch: {
        pointRate: Math.max(100, Number(pointRate) || biz.pointRate),
        voucherThreshold: Math.max(1, Number(threshold) || biz.voucherThreshold),
        voucherValue: Math.max(0, Number(voucherValue) || biz.voucherValue),
      },
    });
    toast("Aturan poin diperbarui");
  };

  const profileDirty =
    name !== biz.name || outlet !== biz.outlet || wa !== biz.wa;
  const loyaltyDirty =
    Number(pointRate) !== biz.pointRate ||
    Number(threshold) !== biz.voucherThreshold ||
    Number(voucherValue) !== biz.voucherValue;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <h1>Pengaturan</h1>
          <p>Kelola profil bisnis, aturan poin, langganan, dan tim.</p>
        </div>
      </div>

      <div className="dash-settings-grid">
        {/* profile */}
        <div className="dash-card dash-card-pad">
          <h2 className="dash-set-title">Profil Bisnis</h2>
          <p className="dash-set-sub">Nama & kontak yang dipakai AI saat balas customer.</p>
          <div className="dash-field">
            <label>Nama bisnis</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="dash-field">
            <label>Nama outlet</label>
            <input value={outlet} onChange={(e) => setOutlet(e.target.value)} />
          </div>
          <div className="dash-field">
            <label>Nomor WhatsApp bisnis</label>
            <input value={wa} onChange={(e) => setWa(e.target.value)} inputMode="numeric" />
            <div className="hint">Nomor yang terhubung ke AI Sosmed.</div>
          </div>
          <div className="dash-form-actions">
            <button
              className="dash-btn dash-btn-primary"
              onClick={saveProfile}
              disabled={!profileDirty}
            >
              Simpan profil
            </button>
          </div>
        </div>

        {/* loyalty */}
        <div className="dash-card dash-card-pad">
          <h2 className="dash-set-title">Aturan Poin & Voucher</h2>
          <p className="dash-set-sub">Atur nilai poin dan reward untuk member kamu.</p>
          <div className="dash-field">
            <label>Rupiah per 1 poin</label>
            <input
              value={pointRate}
              onChange={(e) => setPointRate(e.target.value.replace(/[^\d]/g, ""))}
              inputMode="numeric"
            />
            <div className="hint">Contoh: 1.000 → tiap belanja Rp 1.000 dapat 1 poin.</div>
          </div>
          <div className="dash-field-row">
            <div className="dash-field">
              <label>Poin / voucher</label>
              <input
                value={threshold}
                onChange={(e) => setThreshold(e.target.value.replace(/[^\d]/g, ""))}
                inputMode="numeric"
              />
            </div>
            <div className="dash-field">
              <label>Nilai voucher (Rp)</label>
              <input
                value={voucherValue}
                onChange={(e) => setVoucherValue(e.target.value.replace(/[^\d]/g, ""))}
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="dash-cap-banner" style={{ marginBottom: 0 }}>
            <span className="dash-cap-ic"><Icon paths={Icons.gift} size={17} /></span>
            <div className="dash-cap-text">
              <b>
                {threshold} poin = voucher {rupiah(Number(voucherValue) || 0)}
              </b>
              <p>1 poin didapat tiap belanja {rupiah(Number(pointRate) || 0)}.</p>
            </div>
          </div>
          <div className="dash-form-actions">
            <button
              className="dash-btn dash-btn-primary"
              onClick={saveLoyalty}
              disabled={!loyaltyDirty}
            >
              Simpan aturan
            </button>
          </div>
        </div>

        {/* subscription */}
        <div className="dash-card dash-card-pad">
          <h2 className="dash-set-title">Langganan</h2>
          <p className="dash-set-sub">Paket menentukan kapasitas order & fitur.</p>
          <div className="dash-plan-badge-row">
            <div>
              <div className="dash-plan-big">Paket {biz.plan}</div>
              <div className="dash-set-sub" style={{ marginTop: 2 }}>
                {rupiah(PLAN_PRICE[biz.plan])}/bulan · {PLAN_OUTLETS[biz.plan]} outlet ·{" "}
                {PLAN_CAPACITY[biz.plan]} order/bln
              </div>
            </div>
            <button className="dash-btn dash-btn-ghost" onClick={() => setPlanModal(true)}>
              Ubah paket
            </button>
          </div>
          <div className="dash-plan-meter" style={{ background: "var(--tint-line)", marginTop: 14 }}>
            <i
              className={cap.pct >= 85 ? "warn" : ""}
              style={{ width: `${cap.pct}%`, background: cap.pct >= 85 ? undefined : "linear-gradient(90deg,var(--accent-2),var(--accent))" }}
            />
          </div>
          <div className="dash-set-sub" style={{ marginTop: 8 }}>
            <b style={{ color: "var(--ink)" }}>{cap.used}</b> / {cap.limit} order terpakai bulan ini · sisa {cap.remaining}
          </div>
        </div>

        {/* staff */}
        <div className="dash-card dash-card-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 className="dash-set-title">Akses Tim</h2>
              <p className="dash-set-sub">
                {biz.staff.length} / {STAFF_LIMIT[biz.plan]} akses di paket {biz.plan}.
              </p>
            </div>
            <button
              className="dash-btn dash-btn-ghost dash-btn-sm"
              onClick={() => setStaffModal(true)}
              disabled={biz.staff.length >= STAFF_LIMIT[biz.plan]}
            >
              <Icon paths={Icons.plus} size={14} /> Tambah
            </button>
          </div>
          <div className="dash-def-list" style={{ marginTop: 8 }}>
            {biz.staff.map((s) => (
              <div className="dash-def-row" key={s.id} style={{ alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="dash-avatar-sm">{s.name[0]}</span>
                  <div>
                    <div className="dash-member-name">{s.name}</div>
                    <div className="dash-member-sub">{s.role} · +{s.wa}</div>
                  </div>
                </div>
                {s.role !== "Owner" && (
                  <button
                    className="dash-icon-btn"
                    aria-label="Hapus akses"
                    onClick={() => {
                      dispatch({ type: "STAFF_REMOVE", id: s.id });
                      toast(`Akses ${s.name} dihapus`, "info");
                    }}
                  >
                    <Icon paths={Icons.trash} size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* danger zone */}
      <div className="dash-card dash-card-pad dash-danger-zone">
        <div>
          <h2 className="dash-set-title">Reset Data Demo</h2>
          <p className="dash-set-sub">
            Kembalikan semua data (order, menu, member) ke contoh awal. Berguna kalau kamu
            cuma lagi coba-coba dashboard ini.
          </p>
        </div>
        <button className="dash-btn dash-btn-danger" onClick={() => setResetOpen(true)}>
          <Icon paths={Icons.refresh} size={15} /> Reset data
        </button>
      </div>

      {planModal && (
        <PlanModal
          current={biz.plan}
          onClose={() => setPlanModal(false)}
          onPick={(p) => {
            dispatch({ type: "BUSINESS_UPDATE", patch: { plan: p } });
            toast(`Paket diubah ke ${p}`);
            setPlanModal(false);
          }}
        />
      )}

      {staffModal && (
        <StaffModal
          onClose={() => setStaffModal(false)}
          onAdd={(s) => {
            dispatch({ type: "STAFF_ADD", staff: s });
            toast(`Akses ${s.name} ditambahkan`);
            setStaffModal(false);
          }}
        />
      )}

      <ConfirmDialog
        open={resetOpen}
        title="Reset semua data?"
        body="Semua perubahan yang kamu buat akan hilang dan data kembali ke contoh awal. Tindakan ini tidak bisa dibatalkan."
        confirmLabel="Ya, reset"
        danger
        onConfirm={() => {
          dispatch({ type: "RESET" });
          toast("Data demo direset");
          setResetOpen(false);
        }}
        onCancel={() => setResetOpen(false)}
      />
    </>
  );
}

function PlanModal({
  current,
  onPick,
  onClose,
}: {
  current: PlanName;
  onPick: (p: PlanName) => void;
  onClose: () => void;
}) {
  return (
    <Modal open onClose={onClose} title="Ubah Paket" wide>
      <div className="dash-plan-options">
        {PLANS.map((p) => (
          <button
            key={p}
            className={"dash-plan-option" + (p === current ? " current" : "")}
            onClick={() => onPick(p)}
            disabled={p === current}
          >
            <div className="dash-plan-option-name">
              {p}
              {p === current && <span className="dash-plan-current-tag">Aktif</span>}
            </div>
            <div className="dash-plan-option-price">{rupiah(PLAN_PRICE[p])}<span>/bln</span></div>
            <div className="dash-plan-option-meta">
              {PLAN_CAPACITY[p]} order/bln · {PLAN_OUTLETS[p]} outlet
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
}

function StaffModal({
  onAdd,
  onClose,
}: {
  onAdd: (s: StaffMember) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<StaffMember["role"]>("Kasir");
  const [wa, setWa] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const add = () => {
    if (!name.trim()) {
      setErr("Nama wajib diisi.");
      return;
    }
    onAdd({ id: uid("s"), name: name.trim(), role, wa: wa.replace(/[^\d]/g, "") || "-" });
  };

  return (
    <Modal open onClose={onClose} title="Tambah Akses Tim">
      <div className="dash-field">
        <label>Nama</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama staff" />
        {err && <div className="err">{err}</div>}
      </div>
      <div className="dash-field-row">
        <div className="dash-field">
          <label>Peran</label>
          <select value={role} onChange={(e) => setRole(e.target.value as StaffMember["role"])}>
            {ROLES.filter((r) => r !== "Owner").map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="dash-field">
          <label>WhatsApp</label>
          <input value={wa} onChange={(e) => setWa(e.target.value)} inputMode="tel" placeholder="0812…" />
        </div>
      </div>
      <div className="dash-form-actions">
        <button className="dash-btn dash-btn-ghost" onClick={onClose}>
          Batal
        </button>
        <button className="dash-btn dash-btn-primary" onClick={add}>
          Tambah
        </button>
      </div>
    </Modal>
  );
}
