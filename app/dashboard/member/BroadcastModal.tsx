"use client";

import { useMemo, useState } from "react";
import { Modal, useToast } from "../components/ui";
import { Icon, Icons } from "../components/icons";
import { useStore, uid } from "../lib/store";
import { allMemberStats } from "../lib/derive";
import { NOW, groupThousands } from "../lib/format";
import type { MemberTier } from "../lib/types";

const SEGMENTS: (MemberTier | "Semua")[] = ["Semua", "VIP", "Reguler", "Baru", "Pasif"];

const TEMPLATES: Record<string, string> = {
  Semua: "Halo kak! ☕ Ada promo spesial minggu ini di Kopi Senja. Tunjukkan chat ini buat dapat diskon. Sampai ketemu!",
  VIP: "Halo member VIP! 🎉 Sebagai pelanggan setia, kamu dapat 1 minuman gratis minggu ini. Tunjukkan pesan ini di kasir ya!",
  Reguler: "Hai kak! 😊 Kumpulin poin terus di Kopi Senja — tiap Rp 1.000 = 1 poin, 100 poin = voucher Rp 5.000!",
  Baru: "Selamat datang di keluarga Kopi Senja! 👋 Yuk order lagi dan mulai kumpulin poin buat voucher gratis.",
  Pasif: "Kangen Kopi Senja? ☕ Balik lagi minggu ini dan dapat diskon 20% untuk semua kopi. Kami tunggu ya!",
};

export function BroadcastModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const [segment, setSegment] = useState<MemberTier | "Semua">("Semua");
  const [message, setMessage] = useState(TEMPLATES["Semua"]);
  const [err, setErr] = useState<string | null>(null);

  const stats = useMemo(() => allMemberStats(state), [state]);
  const recipients = useMemo(
    () =>
      segment === "Semua"
        ? stats.length
        : stats.filter((s) => s.tier === segment).length,
    [stats, segment],
  );

  const pickSegment = (s: MemberTier | "Semua") => {
    setSegment(s);
    // swap in the template only if the user hasn't customised away from a template
    if (Object.values(TEMPLATES).includes(message)) setMessage(TEMPLATES[s]);
  };

  const send = () => {
    if (!message.trim()) {
      setErr("Tulis pesan broadcast dulu.");
      return;
    }
    if (recipients === 0) {
      setErr("Tidak ada member di segmen ini.");
      return;
    }
    dispatch({
      type: "BROADCAST_SEND",
      broadcast: {
        id: uid("b"),
        segment,
        message: message.trim(),
        recipients,
        sentAt: NOW,
      },
    });
    toast(`Broadcast terkirim ke ${recipients} member`);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Kirim Broadcast" wide>
      <div className="dash-field">
        <label>Segmen penerima</label>
        <div className="dash-segmented" style={{ width: "100%" }}>
          {SEGMENTS.map((s) => (
            <button
              key={s}
              className={"dash-seg" + (segment === s ? " active" : "")}
              onClick={() => pickSegment(s)}
            >
              {s}
              <span className="cnt">
                {s === "Semua"
                  ? stats.length
                  : stats.filter((x) => x.tier === s).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="dash-field">
        <label>Pesan</label>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (err) setErr(null);
          }}
          maxLength={600}
          placeholder="Tulis pesan promo…"
        />
        <div className="hint">{message.length}/600 karakter</div>
      </div>

      {err && <div className="dash-field"><div className="err">{err}</div></div>}

      <div className="dash-broadcast-preview">
        <Icon paths={Icons.send} size={15} />
        Akan dikirim ke <b>&nbsp;{recipients} member&nbsp;</b> segmen{" "}
        <b>&nbsp;{segment}</b>. Estimasi biaya broadcast: <b>&nbsp;Rp {groupThousands(recipients * 800)}</b>
        &nbsp;(Rp 800/pesan).
      </div>

      <div className="dash-form-actions">
        <button className="dash-btn dash-btn-ghost" onClick={onClose}>
          Batal
        </button>
        <button className="dash-btn dash-btn-primary" onClick={send} disabled={recipients === 0}>
          <Icon paths={Icons.send} size={15} /> Kirim ke {recipients} member
        </button>
      </div>
    </Modal>
  );
}
