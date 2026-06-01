"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Auto-playing WhatsApp chat mockup for the homepage "all-in-WhatsApp"
 * showcase. Renders as a bare rounded card (.sw-screen in globals.css) —
 * no phone bezel. Numbers shown are illustrative demo data, not real results.
 */

type Msg =
  | { kind: "out"; text: string; time: string }
  | { kind: "in"; text: string; time: string }
  | { kind: "report" }
  | { kind: "file" };

type Step =
  | { type: "show"; msg: Msg; after: number }
  | { type: "typing"; after: number }
  | { type: "reset" };

const STEPS: Step[] = [
  { type: "show", msg: { kind: "out", text: "laporan bulan ini gimana?", time: "09:15" }, after: 1000 },
  { type: "typing", after: 1200 },
  { type: "show", msg: { kind: "in", text: "Berikut laporan Mei 2026 \u{1F4CA}", time: "09:15" }, after: 600 },
  { type: "show", msg: { kind: "report" }, after: 700 },
  { type: "show", msg: { kind: "file" }, after: 1700 },
  { type: "show", msg: { kind: "out", text: "matiin es kopi susu, stok habis", time: "09:16" }, after: 1000 },
  { type: "typing", after: 1000 },
  { type: "show", msg: { kind: "in", text: "Siap ✅ Es Kopi Susu sudah dinonaktifkan dari menu hari ini.", time: "09:16" }, after: 3400 },
  { type: "reset" },
];

const ALL_MSGS: Msg[] = STEPS.filter(
  (s): s is Extract<Step, { type: "show" }> => s.type === "show",
).map((s) => s.msg);

function Ticks() {
  return (
    <svg className="sw-tick" viewBox="0 0 18 12" width="15" height="10" aria-hidden="true">
      <path d="M1 6.5l3 3 5.5-7" fill="none" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 6.5l3 3 5.5-7" fill="none" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

export default function ShowcaseChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMessages(ALL_MSGS);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const run = (i: number) => {
      const step = STEPS[i];
      if (step.type === "reset") {
        setMessages([]);
        setTyping(false);
        t = setTimeout(() => run(0), 500);
        return;
      }
      if (step.type === "typing") {
        setTyping(true);
        t = setTimeout(() => run(i + 1), step.after);
        return;
      }
      setTyping(false);
      setMessages((prev) => [...prev, step.msg]);
      t = setTimeout(() => run(i + 1), step.after);
    };
    t = setTimeout(() => run(0), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  return (
    <div className="sw-screen" aria-hidden="true">
      <div className="sw-bar">
        <span className="sw-back">‹</span>
        <div className="sw-av">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff" aria-hidden="true">
            <path d="M12 2c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7Z" />
          </svg>
        </div>
        <div className="sw-meta">
          <div className="sw-name">Sosmed AI Assistant</div>
          <div className="sw-online">online</div>
        </div>
        <div className="sw-icons">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 10.5 21 7v10l-5-3.5z" />
            <rect x="3" y="6" width="13" height="12" rx="2" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
          </svg>
        </div>
      </div>

      <div className="sw-chat" ref={bodyRef}>
        {messages.map((m, i) => {
          if (m.kind === "report") {
            return (
              <div key={i} className="sw-bub in">
                <ReportCard />
              </div>
            );
          }
          if (m.kind === "file") {
            return (
              <div key={i} className="sw-bub in sw-filebub">
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
              </div>
            );
          }
          return (
            <div key={i} className={`sw-bub ${m.kind}`}>
              {m.text}
              <span className="sw-time">
                {m.time}
                {m.kind === "out" && <Ticks />}
              </span>
            </div>
          );
        })}
        {typing && (
          <div className="sw-typing">
            <span /><span /><span />
          </div>
        )}
      </div>

      <div className="sw-input">
        <div className="sw-field">Ketik pesan</div>
        <div className="sw-send">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff" aria-hidden="true">
            <path d="M3 3l18 9-18 9 4-9-4-9z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
