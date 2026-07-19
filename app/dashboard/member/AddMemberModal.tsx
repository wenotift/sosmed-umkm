"use client";

import { useState } from "react";
import { Modal, useToast } from "../components/ui";
import { Icon, Icons } from "../components/icons";
import { useStore, uid } from "../lib/store";
import { NOW } from "../lib/format";

// Normalize an Indonesian mobile number to 628xxxxxxxxx (mirrors the marketing forms).
function normalizeWa(raw: string): string | null {
  let d = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (d.startsWith("8")) d = "62" + d;
  if (!/^628\d{7,11}$/.test(d)) return null;
  return d;
}

export function AddMemberModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [errs, setErrs] = useState<{ name?: string; wa?: string }>({});

  const save = () => {
    const e: typeof errs = {};
    if (!name.trim()) e.name = "Nama wajib diisi.";
    const norm = normalizeWa(wa);
    if (!wa.trim()) e.wa = "Nomor WhatsApp wajib diisi.";
    else if (!norm) e.wa = "Nomor tidak valid (contoh: 0812xxxxxxxx).";
    else if (state.members.some((m) => m.wa === norm))
      e.wa = "Nomor ini sudah terdaftar sebagai member.";
    setErrs(e);
    if (Object.keys(e).length) return;

    dispatch({
      type: "MEMBER_ADD",
      member: {
        id: uid("u"),
        name: name.trim(),
        wa: norm as string,
        joinedAt: NOW,
        redeemedPoints: 0,
      },
    });
    toast(`Member "${name.trim()}" ditambahkan`);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Tambah Member">
      <p className="dash-confirm-body" style={{ marginBottom: 16 }}>
        Biasanya member daftar sendiri lewat WhatsApp. Tambah manual di sini kalau perlu.
      </p>
      <div className="dash-field">
        <label>Nama</label>
        <input
          className={errs.name ? "invalid" : ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama pelanggan"
        />
        {errs.name && <div className="err">{errs.name}</div>}
      </div>
      <div className="dash-field">
        <label>WhatsApp</label>
        <input
          className={errs.wa ? "invalid" : ""}
          value={wa}
          onChange={(e) => setWa(e.target.value)}
          placeholder="0812xxxxxxxx"
          inputMode="tel"
        />
        {errs.wa && <div className="err">{errs.wa}</div>}
      </div>
      <div className="dash-form-actions">
        <button className="dash-btn dash-btn-ghost" onClick={onClose}>
          Batal
        </button>
        <button className="dash-btn dash-btn-primary" onClick={save}>
          <Icon paths={Icons.check} size={15} /> Tambah member
        </button>
      </div>
    </Modal>
  );
}
