"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reusable auto-playing WhatsApp chat mockup. Renders as a bare rounded
 * card (.sw-screen in globals.css) — no phone bezel. Pass a `steps`
 * timeline; the chat plays it once, then loops forever. Under
 * prefers-reduced-motion the whole thread is shown statically.
 *
 * Used by the homepage showcase and the /produk feature blocks. All
 * figures rendered through it are illustrative demo data, not real results.
 */

export type ChatMsg =
  | { kind: "out"; text: string; time?: string }
  | { kind: "in"; text: string; time?: string }
  // arbitrary card content (report/menu/order cards, file attachments, …)
  | { kind: "node"; side?: "in" | "out"; node: ReactNode; bubbleClass?: string };

export type ChatStep =
  | { type: "show"; msg: ChatMsg; after: number }
  | { type: "typing"; after: number }
  | { type: "reset"; after?: number };

function Ticks() {
  return (
    <svg className="sw-tick" viewBox="0 0 18 12" width="15" height="10" aria-hidden="true">
      <path d="M1 6.5l3 3 5.5-7" fill="none" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 6.5l3 3 5.5-7" fill="none" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhatsAppChat({
  steps,
  headerName = "Sosmed AI Assistant",
  initialDelay = 600,
  resetDelay = 500,
}: {
  steps: ChatStep[];
  headerName?: string;
  initialDelay?: number;
  resetDelay?: number;
}) {
  const allMsgs = steps
    .filter((s): s is Extract<ChatStep, { type: "show" }> => s.type === "show")
    .map((s) => s.msg);

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMessages(allMsgs);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const run = (i: number) => {
      const step = steps[i];
      if (step.type === "reset") {
        setMessages([]);
        setTyping(false);
        t = setTimeout(() => run(0), step.after ?? resetDelay);
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
    t = setTimeout(() => run(0), initialDelay);
    return () => clearTimeout(t);
    // steps is a module-level constant per call site; intentionally run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="sw-name">{headerName}</div>
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
          if (m.kind === "node") {
            return (
              <div key={i} className={`sw-bub ${m.side ?? "in"}${m.bubbleClass ? " " + m.bubbleClass : ""}`}>
                {m.node}
              </div>
            );
          }
          return (
            <div key={i} className={`sw-bub ${m.kind}`}>
              {m.text}
              {m.time && (
                <span className="sw-time">
                  {m.time}
                  {m.kind === "out" && <Ticks />}
                </span>
              )}
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
