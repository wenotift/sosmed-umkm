"use client";

import { useState } from "react";
import { Modal, useToast } from "../components/ui";
import { Icon, Icons } from "../components/icons";
import { useStore, uid } from "../lib/store";
import type { MenuCategory, MenuItem } from "../lib/types";

const CATEGORIES: MenuCategory[] = ["Kopi", "Non-Kopi", "Makanan", "Snack"];
const EMOJIS = ["☕", "🧋", "🍵", "🥤", "🧊", "🍫", "🥐", "🍰", "🍞", "🍟", "🍛", "🍪", "🥪", "🍮"];

export function MenuFormModal({
  item,
  onClose,
}: {
  item: MenuItem | null; // null = create
  onClose: () => void;
}) {
  const { dispatch } = useStore();
  const { toast } = useToast();
  const [name, setName] = useState(item?.name ?? "");
  const [category, setCategory] = useState<MenuCategory>(item?.category ?? "Kopi");
  const [price, setPrice] = useState(item ? String(item.price) : "");
  const [cost, setCost] = useState(item ? String(item.cost) : "");
  const [emoji, setEmoji] = useState(item?.emoji ?? "☕");
  const [available, setAvailable] = useState(item?.available ?? true);
  const [errs, setErrs] = useState<{ name?: string; price?: string }>({});

  const save = () => {
    const e: typeof errs = {};
    if (!name.trim()) e.name = "Nama menu wajib diisi.";
    const p = Number(price);
    if (!price || Number.isNaN(p) || p <= 0) e.price = "Harga harus lebih dari 0.";
    setErrs(e);
    if (Object.keys(e).length) return;

    const next: MenuItem = {
      id: item?.id ?? uid("m"),
      name: name.trim(),
      category,
      price: Math.round(p),
      cost: Math.max(0, Math.round(Number(cost) || 0)),
      emoji,
      available,
    };
    dispatch(item ? { type: "MENU_UPDATE", item: next } : { type: "MENU_ADD", item: next });
    toast(item ? `Menu "${next.name}" diperbarui` : `Menu "${next.name}" ditambahkan`);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={item ? "Edit Menu" : "Tambah Menu"}>
      <div className="dash-field">
        <label>Ikon</label>
        <div className="dash-emoji-grid">
          {EMOJIS.map((em) => (
            <button
              key={em}
              type="button"
              className={"dash-emoji-btn" + (emoji === em ? " on" : "")}
              onClick={() => setEmoji(em)}
            >
              {em}
            </button>
          ))}
        </div>
      </div>
      <div className="dash-field">
        <label>Nama menu</label>
        <input
          className={errs.name ? "invalid" : ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="mis. Es Kopi Susu Gula Aren"
        />
        {errs.name && <div className="err">{errs.name}</div>}
      </div>
      <div className="dash-field">
        <label>Kategori</label>
        <select value={category} onChange={(e) => setCategory(e.target.value as MenuCategory)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="dash-field-row">
        <div className="dash-field">
          <label>Harga jual (Rp)</label>
          <input
            className={errs.price ? "invalid" : ""}
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))}
            inputMode="numeric"
            placeholder="18000"
          />
          {errs.price && <div className="err">{errs.price}</div>}
        </div>
        <div className="dash-field">
          <label>Modal / HPP (Rp)</label>
          <input
            value={cost}
            onChange={(e) => setCost(e.target.value.replace(/[^\d]/g, ""))}
            inputMode="numeric"
            placeholder="7000"
          />
          <div className="hint">Untuk hitung margin di Analitik.</div>
        </div>
      </div>
      <div className="dash-field" style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
        <div>
          <label style={{ marginBottom: 2 }}>Tersedia untuk dipesan</label>
          <div className="hint" style={{ marginTop: 0 }}>
            Matikan kalau stok habis — item hilang dari menu customer.
          </div>
        </div>
        <button
          type="button"
          className={"dash-toggle" + (available ? " on" : "")}
          onClick={() => setAvailable((v) => !v)}
          aria-label="Ketersediaan"
        />
      </div>

      <div className="dash-form-actions">
        <button className="dash-btn dash-btn-ghost" onClick={onClose}>
          Batal
        </button>
        <button className="dash-btn dash-btn-primary" onClick={save}>
          <Icon paths={Icons.check} size={15} /> {item ? "Simpan" : "Tambah menu"}
        </button>
      </div>
    </Modal>
  );
}
