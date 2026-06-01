"use client";

import WhatsAppChat, { type ChatStep } from "./WhatsAppChat";

/**
 * Homepage "all-in-WhatsApp" showcase chat. Thin wrapper that feeds its
 * script to the shared <WhatsAppChat>. Numbers shown are illustrative
 * demo data, not real results.
 */

function ReportCard() {
  return (
    <div className="sw-report">
      <div className="sw-rrow"><span>Total order</span><b>1.284 · Rp 38,6 jt</b></div>
      <div className="sw-rrow"><span>Naik dari April</span><b className="up">↑18%</b></div>
      <div className="sw-rrow"><span>Member aktif</span><b>312 (+47)</b></div>
      <div className="sw-rrow"><span>Repeat rate</span><b>64%</b></div>
      <div className="sw-rtop">Top menu: Es Kopi Susu, Americano, Croissant</div>
    </div>
  );
}

function FileCard() {
  return (
    <>
      <span className="sw-doc">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7018D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
        </svg>
      </span>
      <span className="sw-finfo">
        <b>Laporan Mei 2026.pdf</b>
        <span>245 KB</span>
      </span>
    </>
  );
}

const STEPS: ChatStep[] = [
  { type: "show", msg: { kind: "out", text: "laporan bulan ini gimana?", time: "09:15" }, after: 1000 },
  { type: "typing", after: 1200 },
  { type: "show", msg: { kind: "in", text: "Berikut laporan Mei 2026 \u{1F4CA}", time: "09:15" }, after: 600 },
  { type: "show", msg: { kind: "node", node: <ReportCard /> }, after: 700 },
  { type: "show", msg: { kind: "node", bubbleClass: "sw-filebub", node: <FileCard /> }, after: 1700 },
  { type: "show", msg: { kind: "out", text: "matiin es kopi susu, stok habis", time: "09:16" }, after: 1000 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "Siap ✅ Es Kopi Susu sudah dinonaktifkan dari menu hari ini.", time: "09:16" }, after: 3400 },
  { type: "reset" },
];

export default function ShowcaseChat() {
  return <WhatsAppChat steps={STEPS} />;
}
