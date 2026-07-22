"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Icon, Icons } from "./icons";
import type { OrderChannel, OrderStatus } from "../lib/types";

// ---- Toast -----------------------------------------------------------------
type ToastKind = "success" | "info" | "error";
interface Toast {
  id: number;
  kind: ToastKind;
  msg: string;
}
interface ToastCtx {
  toast: (msg: string, kind?: ToastKind) => void;
}
const ToastContext = createContext<ToastCtx | null>(null);

let toastSeq = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((msg: string, kind: ToastKind = "success") => {
    const id = ++toastSeq;
    setToasts((t) => [...t, { id, kind, msg }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="dash-toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`dash-toast dash-toast-${t.kind}`}>
            <span className="dash-toast-ic">
              <Icon paths={t.kind === "error" ? Icons.x : Icons.check} size={15} />
            </span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastCtx {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: () => {} };
  return ctx;
}

// ---- Modal -----------------------------------------------------------------
export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="dash-modal-backdrop" onMouseDown={onClose}>
      <div
        className={"dash-modal" + (wide ? " dash-modal-wide" : "")}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="dash-modal-head">
          <h3>{title}</h3>
          <button className="dash-icon-btn" onClick={onClose} aria-label="Tutup">
            <Icon paths={Icons.x} size={18} />
          </button>
        </div>
        <div className="dash-modal-body">{children}</div>
      </div>
    </div>
  );
}

// ---- Confirm dialog (promise-free, controlled) -----------------------------
export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Ya, lanjut",
  danger,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="dash-confirm-body">{body}</p>
      <div className="dash-form-actions">
        <button className="dash-btn dash-btn-ghost" onClick={onCancel}>
          Batal
        </button>
        <button
          className={"dash-btn " + (danger ? "dash-btn-danger" : "dash-btn-primary")}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

// ---- Status & channel badges ----------------------------------------------
const STATUS_META: Record<OrderStatus, { label: string; cls: string }> = {
  baru: { label: "Baru", cls: "st-baru" },
  diproses: { label: "Diproses", cls: "st-proses" },
  siap: { label: "Siap", cls: "st-siap" },
  selesai: { label: "Selesai", cls: "st-selesai" },
  batal: { label: "Batal", cls: "st-batal" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const m = STATUS_META[status];
  return <span className={"dash-status " + m.cls}>{m.label}</span>;
}

export const STATUS_ORDER: OrderStatus[] = ["baru", "diproses", "siap", "selesai", "batal"];
export function statusLabel(s: OrderStatus) {
  return STATUS_META[s].label;
}

const CHANNEL_META: Record<OrderChannel, { label: string; icon: ReactNode }> = {
  bot: { label: "AI Chat", icon: Icons.bot },
  qr: { label: "QR Meja", icon: Icons.qr },
  walkin: { label: "Walk-in", icon: Icons.walk },
};

export function ChannelBadge({ channel }: { channel: OrderChannel }) {
  const m = CHANNEL_META[channel];
  return (
    <span className={"dash-chan chan-" + channel}>
      <Icon paths={m.icon} size={13} />
      {m.label}
    </span>
  );
}

export function channelLabel(c: OrderChannel) {
  return CHANNEL_META[c].label;
}

// ---- Empty state -----------------------------------------------------------
export function EmptyState({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="dash-empty">
      <div className="dash-empty-ic">
        <Icon paths={Icons.search} size={22} />
      </div>
      <p className="dash-empty-title">{title}</p>
      {sub && <p className="dash-empty-sub">{sub}</p>}
    </div>
  );
}
