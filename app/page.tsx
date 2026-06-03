"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShowcaseChat from "./ShowcaseChat";

// AI-Native banner: F&B-intent list icon (repeated in the right side-list).
function AiBannerDi() {
  return (
    <span className="aib-di">
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="2" />
        <circle cx="15" cy="15" r="2" />
        <path d="M9 11v2M11 9h2" />
      </svg>
    </span>
  );
}

// AI-Native banner center flow — static illustrative SVG (viewBox + width:100%
// so it scales on mobile). Injected as-is for foreignObject fidelity; classes
// are aib-* prefixed and styled scoped under .ainat. Conceptual, not a claim.
const AINATIVE_FLOW_SVG = `<svg class="aib-flow-svg" viewBox="0 0 380 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi alur AI-Native">
<defs><marker id="aibAh" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M3 4 L7 9 L11 4" stroke="#5FC983" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></marker>
<marker id="aibAhg" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M3 4 L7 9 L11 4" stroke="#C9C5D2" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<path d="M190 138 V 240" fill="none" stroke="#5FC983" stroke-width="2.4" marker-end="url(#aibAh)"/>
<circle cx="190" cy="138" r="5.5" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M190 348 V 402" fill="none" stroke="#5FC983" stroke-width="2.4"/>
<circle cx="190" cy="402" r="5.5" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M190 402 V 426 Q190 446 168 446 H 119 Q97 446 97 464 V 478" fill="none" stroke="#5FC983" stroke-width="2.4" marker-end="url(#aibAh)"/>
<path d="M190 402 V 426 Q190 446 212 446 H 261 Q283 446 283 464 V 478" fill="none" stroke="#DAD7E0" stroke-width="2.4" marker-end="url(#aibAhg)"/>
<foreignObject x="14" y="-2" width="120" height="26"><div xmlns="http://www.w3.org/1999/xhtml"><span class="aib-tabtag"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg> Pemicu</span></div></foreignObject>
<foreignObject x="248" y="-2" width="120" height="26"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="aib-pill"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Masuk</span></div></foreignObject>
<foreignObject x="14" y="32" width="352" height="106"><div xmlns="http://www.w3.org/1999/xhtml" class="aib-node aib-ok"><div class="aib-nrow"><span class="aib-nicon aib-ic-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span class="aib-ntitle">Pesan masuk di WhatsApp</span><span class="aib-ntag">Input</span></div><div class="aib-nsub">"es kopsu 2 ya bang, less sugar 🙏"</div></div></foreignObject>
<foreignObject x="234" y="222" width="132" height="26"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="aib-pill"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Dipahami</span></div></foreignObject>
<foreignObject x="14" y="240" width="352" height="108"><div xmlns="http://www.w3.org/1999/xhtml" class="aib-node aib-ok"><div class="aib-nrow"><span class="aib-nicon aib-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z"/></svg></span><span class="aib-ntitle">AI pahami &amp; tentukan maksud</span><span class="aib-ntag">AI-Native</span></div><div class="aib-nsub">Paham slang &amp; konteks, lalu arahkan - tanpa skrip</div></div></foreignObject>
<foreignObject x="55" y="434" width="84" height="26"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center"><span class="aib-blabel">Order</span></div></foreignObject>
<foreignObject x="231" y="434" width="104" height="26"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center"><span class="aib-blabel aib-mut">Tanya menu</span></div></foreignObject>
<foreignObject x="8" y="478" width="178" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="aib-node aib-ok"><div class="aib-nrow"><span class="aib-nicon aib-ic-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9l-5 5-3-3"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg></span><span class="aib-ntitle">Catat pesanan</span></div><div class="aib-nsub">Order tercatat otomatis</div></div></foreignObject>
<foreignObject x="194" y="478" width="178" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="aib-node aib-mut"><div class="aib-nrow"><span class="aib-nicon aib-ic-grey"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span><span class="aib-ntitle">Kirim menu</span></div><div class="aib-nsub">Cabang lain</div></div></foreignObject>
</svg>`;

// Chatbot-vs-AI-Native comparison: intent side-list icon (repeated).
function CmpDi() {
  return (
    <span className="cf-di">
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="2" />
        <circle cx="15" cy="15" r="2" />
        <path d="M9 11v2M11 9h2" />
      </svg>
    </span>
  );
}

// Comparison lane flows — static illustrative SVGs (viewBox + width:100% so they
// scale on mobile). Injected as-is for foreignObject fidelity; classes are cf-*
// prefixed and styled scoped under .cmpsec. Single-color connectors per lane
// (grey chatbot / green AI-native). Conceptual, not a claim of a shipped feature.
const CMP_CHATBOT_SVG = `<svg class="cf-flow" viewBox="0 0 360 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Alur chatbot berbasis aturan">
<defs><marker id="cfCb" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M3 4 L7 9 L11 4" stroke="#C9C5D2" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<path d="M180 118 V160" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cfCb)"/>
<circle cx="180" cy="118" r="4" fill="#fff" stroke="#C9C5D2" stroke-width="2"/>
<path d="M180 230 V272" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cfCb)"/>
<path d="M180 364 V392" stroke="#D6D2DE" stroke-width="1.8" fill="none"/>
<circle cx="180" cy="392" r="4" fill="#fff" stroke="#C9C5D2" stroke-width="2"/>
<path d="M180 392 V414 Q180 432 158 432 H114 Q92 432 92 450 V450" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cfCb)"/>
<path d="M180 392 V414 Q180 432 202 432 H246 Q268 432 268 450 V450" stroke="#D6D2DE" stroke-width="1.8" fill="none" marker-end="url(#cfCb)"/>
<foreignObject x="200" y="20" width="146" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="cf-pill cf-red">Perlu disiapkan</span></div></foreignObject>
<foreignObject x="14" y="36" width="332" height="82"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node"><div class="cf-nrow"><span class="cf-nicon cf-ic-red"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></span><span class="cf-ntitle">Latih &amp; susun skrip</span><span class="cf-ntag">Manual</span></div></div></foreignObject>
<foreignObject x="14" y="160" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node"><div class="cf-nrow"><span class="cf-nicon cf-ic-grey"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span class="cf-ntitle">Pesan masuk</span></div></div></foreignObject>
<foreignObject x="14" y="272" width="332" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node"><div class="cf-nrow"><span class="cf-nicon cf-ic-grey"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span><span class="cf-ntitle">Cocokkan kata kunci</span><span class="cf-ntag">Aturan</span></div><div class="cf-nsub">Sesuai daftar skrip?</div></div></foreignObject>
<foreignObject x="28" y="418" width="128" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center"><span class="cf-blabel">Cocok</span></div></foreignObject>
<foreignObject x="196" y="418" width="144" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center"><span class="cf-blabel">Di luar skrip</span></div></foreignObject>
<foreignObject x="10" y="450" width="164" height="78"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node"><div class="cf-nrow"><span class="cf-nicon cf-ic-grey"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9l-5 5-3-3"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg></span><span class="cf-ntitle">Jawaban skrip</span></div></div></foreignObject>
<foreignObject x="186" y="450" width="164" height="78"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node cf-dead"><div class="cf-nrow"><span class="cf-nicon cf-ic-red"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span><span class="cf-ntitle">"Tidak mengerti"</span></div></div></foreignObject>
</svg>`;

const CMP_AI_SVG = `<svg class="cf-flow" viewBox="0 0 360 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Alur Sosmed AI yang AI-Native">
<defs><marker id="cfAi" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M3 4 L7 9 L11 4" stroke="#5FC983" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<path d="M180 106 V148" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cfAi)"/>
<circle cx="180" cy="106" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M180 240 V282" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cfAi)"/>
<circle cx="180" cy="240" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M180 374 V416" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cfAi)"/>
<circle cx="180" cy="374" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<path d="M180 486 V528" stroke="#5FC983" stroke-width="1.8" fill="none" marker-end="url(#cfAi)"/>
<circle cx="180" cy="486" r="4" fill="#fff" stroke="#16A34A" stroke-width="2"/>
<foreignObject x="200" y="20" width="146" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="cf-pill cf-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Tanpa dilatih</span></div></foreignObject>
<foreignObject x="14" y="36" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node cf-ok"><div class="cf-nrow"><span class="cf-nicon cf-ic-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span class="cf-ntitle">Pesan masuk</span></div></div></foreignObject>
<foreignObject x="14" y="148" width="332" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node cf-ok"><div class="cf-nrow"><span class="cf-nicon cf-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z"/></svg></span><span class="cf-ntitle">Pahami maksud</span></div><div class="cf-nsub">Paham slang &amp; singkatan, bukan kata kunci</div></div></foreignObject>
<foreignObject x="14" y="282" width="332" height="92"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node cf-ok"><div class="cf-nrow"><span class="cf-nicon cf-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 5V3M12 21v-2M5 12H3M21 12h-2M7 7L5.5 5.5M18.5 18.5L17 17M17 7l1.5-1.5M5.5 18.5L7 17"/></svg></span><span class="cf-ntitle">Menalar konteks</span></div><div class="cf-nsub">Termasuk pertanyaan acak - tetap nyambung</div></div></foreignObject>
<foreignObject x="14" y="416" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node cf-ok"><div class="cf-nrow"><span class="cf-nicon cf-ic-purple"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/><path d="M3 12h12"/></svg></span><span class="cf-ntitle">Tentukan tindakan</span><span class="cf-ntag">Order/menu/poin</span></div></div></foreignObject>
<foreignObject x="200" y="510" width="146" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:right"><span class="cf-pill cf-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Selesai</span></div></foreignObject>
<foreignObject x="14" y="528" width="332" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="cf-node cf-ok"><div class="cf-nrow"><span class="cf-nicon cf-ic-green"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><span class="cf-ntitle">Respons yang tepat</span></div></div></foreignObject>
</svg>`;

const FLIP_PHRASES = [
  "Restoran",
  "Warung",
  "Coffee Shop",
  "Bakery Shop",
  "Pastry Shop",
  "F&B lainnya",
];

/* ---- line icons: 24x24, inherit each section's accent via currentColor ---- */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function IconCoffee() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 9h13v4.5a5.5 5.5 0 0 1-5.5 5.5h-2A5.5 5.5 0 0 1 4 13.5Z" />
      <path d="M17 10.5h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 3v2M11.5 3v2" />
    </svg>
  );
}

function IconShieldCheck() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </svg>
  );
}

function IconCreditCard() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9.5h18" />
      <path d="M7 14.5h3.5" />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 4v15a1 1 0 0 0 1 1h15" />
      <path d="m7.5 14 3.5-3.5 3 3L20 7" />
      <path d="M16 7h4v4" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M11 3c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
      <path d="M18.5 14c.2 1.3.9 2 2.2 2.2-1.3.2-2 .9-2.2 2.2-.2-1.3-.9-2-2.2-2.2 1.3-.2 2-.9 2.2-2.2Z" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      <path d="M8 9h8M8 12.5h5" />
    </svg>
  );
}

function IconBowl() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M2 10.5h20" />
      <path d="M4 10.5a8 8 0 0 0 16 0" />
      <path d="M9 6.8c-.4-.9.4-1.7 0-2.8M13 6.8c-.4-.9.4-1.7 0-2.8" />
    </svg>
  );
}

function IconCup() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 7h12l-1 12.6a2 2 0 0 1-2 1.4H9a2 2 0 0 1-2-1.4L6 7Z" />
      <path d="M5 7h14" />
      <path d="m13.5 2-2 5" />
    </svg>
  );
}

function IconBread() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 11a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5 2 2 0 0 1-2 2v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5a2 2 0 0 1-2-2Z" />
      <path d="M10 9.5 8.8 12M14 9.5 12.8 12" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <path d="M12 14.5v2.5" />
    </svg>
  );
}

export default function Home() {
  // ===== hero flipping word =====
  const [flipIdx, setFlipIdx] = useState(0);
  const [flipPrev, setFlipPrev] = useState<number | null>(null);

  useEffect(() => {
    // respect reduced-motion: don't rotate, just show the first phrase statically
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setFlipIdx((cur) => {
        setFlipPrev(cur);
        return (cur + 1) % FLIP_PHRASES.length;
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    // AbortController lets us remove every addEventListener at once on cleanup,
    // so React Strict Mode's double-mount doesn't double-fire or leak listeners.
    const ac = new AbortController();
    const { signal } = ac;

    // ===== Animated chat demos (height-stable) =====
    function playChat(chat: any) {
      if (!chat) return;
      const bubbles = Array.from(
        chat.querySelectorAll(".bubble, .ui-pill")
      ) as HTMLElement[];
      const loopMs = parseInt(chat.dataset.loop || "6000", 10);
      if (chat._timers) chat._timers.forEach((t: number) => clearTimeout(t));
      chat._timers = [];

      // reset: all bubbles pending (out of flow), container stays fixed height
      bubbles.forEach((b) => {
        b.classList.remove("seen");
        b.classList.add("pending");
      });
      const oldTyping = chat.querySelector(".typing");
      if (oldTyping) oldTyping.remove();
      chat.scrollTop = 0;

      let delay = 350;
      bubbles.forEach((b) => {
        const isIn =
          b.classList.contains("b-in") ||
          b.classList.contains("b-points") ||
          b.classList.contains("ui-pill");
        const typeTime = isIn ? 800 : 400;
        // typing indicator
        const t1 = window.setTimeout(() => {
          const typing = document.createElement("div");
          typing.className = "typing" + (isIn ? "" : " out");
          typing.innerHTML = "<span></span><span></span><span></span>";
          chat.appendChild(typing);
          requestAnimationFrame(() => typing.classList.add("show"));
          chat.scrollTop = chat.scrollHeight;
          chat._activeTyping = typing;
        }, delay);
        chat._timers.push(t1);
        // reveal bubble (move into flow + fade in), remove typing, scroll within container
        const t2 = window.setTimeout(() => {
          if (chat._activeTyping) {
            chat._activeTyping.remove();
            chat._activeTyping = null;
          }
          b.classList.remove("pending");
          // force reflow so the transition fires
          void b.offsetWidth;
          b.classList.add("seen");
          chat.scrollTop = chat.scrollHeight;
        }, delay + typeTime);
        chat._timers.push(t2);
        delay += typeTime + 700;
      });

      // show replay + schedule loop
      const replay = chat.parentElement.querySelector("[data-replay]");
      const tEnd = window.setTimeout(() => {
        if (replay) replay.classList.add("show");
      }, delay);
      chat._timers.push(tEnd);
      const tLoop = window.setTimeout(() => {
        if (replay) replay.classList.remove("show");
        playChat(chat);
      }, delay + loopMs);
      chat._timers.push(tLoop);
    }

    // init: mark all bubbles pending immediately so containers render at fixed height with nothing showing
    document.querySelectorAll("[data-chat]").forEach((chat) => {
      chat
        .querySelectorAll(".bubble, .ui-pill")
        .forEach((b) => b.classList.add("pending"));
    });

    // start on scroll into view
    const chatObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const target = e.target as any;
          if (e.isIntersecting && !target._started) {
            target._started = true;
            playChat(target);
          }
        });
      },
      { threshold: 0.35 }
    );
    document
      .querySelectorAll("[data-chat]")
      .forEach((c) => chatObserver.observe(c));

    // replay buttons
    document.querySelectorAll("[data-replay]").forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const chat = btn.parentElement!.querySelector("[data-chat]");
          btn.classList.remove("show");
          playChat(chat);
        },
        { signal }
      );
    });

    // ===== FAQ accordion =====
    document.querySelectorAll(".faq-q").forEach((q) => {
      q.addEventListener(
        "click",
        () => {
          const item = q.parentElement as HTMLElement;
          const open = item.classList.contains("open");
          document.querySelectorAll(".faq-item").forEach((i) => {
            i.classList.remove("open");
            (i.querySelector(".faq-a") as HTMLElement).style.maxHeight = "";
          });
          if (!open) {
            item.classList.add("open");
            const a = item.querySelector(".faq-a") as HTMLElement;
            a.style.maxHeight = a.scrollHeight + "px";
          }
        },
        { signal }
      );
    });

    // ===== cleanup: stop observers, clear timers, drop listeners (Strict Mode safe) =====
    return () => {
      chatObserver.disconnect();
      ac.abort();
      document.querySelectorAll("[data-chat]").forEach((chat) => {
        const c = chat as any;
        if (c._timers) c._timers.forEach((t: number) => clearTimeout(t));
        c._timers = [];
        c._started = false;
        c._activeTyping = null;
        const typing = chat.querySelector(".typing");
        if (typing) typing.remove();
      });
    };
  }, []);

  return (
    <>
      <Nav />

      {/* `home` scopes the homepage-only glassmorphism test (globals.css) so it
          can't leak to shared classes (.step, .price) used on other pages. */}
      <main className="home">

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <h1 className="reveal d1 hero-headline">
            <span className="hl-line">WhatsApp Anda,</span>
            <span className="hl-line">AI Assistant bisnis</span>
            <span className="hl-line hl-flip-line">
              untuk{" "}
              <span className="flip" aria-live="polite">
                <span className="flip-sizer" aria-hidden="true">
                  Bakery Shop
                </span>
                {flipPrev !== null && (
                  <span
                    key={`flip-out-${flipIdx}`}
                    className="flip-word out"
                    aria-hidden="true"
                  >
                    {FLIP_PHRASES[flipPrev]}
                  </span>
                )}
                <span key={`flip-in-${flipIdx}`} className="flip-word in">
                  {FLIP_PHRASES[flipIdx]}
                </span>
              </span>
            </span>
          </h1>
          <p className="sub reveal d3">
            Terima order otomatis 24 jam dan bikin pelanggan balik lagi dengan
            sistem poin. Semuanya jalan sendiri lewat WhatsApp, dan Anda kelola
            semuanya dari chat juga: tanpa dashboard, tanpa aplikasi, tanpa
            login.
          </p>
          <div className="hero-cta reveal d4">
            <button className="btn btn-soon" disabled>
              <span className="dot"></span> Segera Hadir
            </button>
            <a className="btn btn-ghost" href="#cara-kerja">
              Lihat Cara Kerja ↓
            </a>
          </div>
          <p className="hero-note reveal d4">
            Akses awal segera dibuka · <b>Gratis untuk founding user</b> · Setup
            30 menit
          </p>

          {/* HERO VISUAL */}
          <div className="hero-visual reveal d5">
            <div className="hv-grid">
              {/* whatsapp chat */}
              <div className="phone">
                <div className="demo-tag">
                  <span className="rec"></span> DEMO LANGSUNG
                </div>
                <div className="wa-top">
                  <div className="wa-av">KS</div>
                  <div>
                    <div className="wa-name">Kopi Senja</div>
                    <div className="wa-status">● online · dibalas otomatis</div>
                  </div>
                </div>
                <div className="wa-body chat-anim" data-chat data-loop="6000">
                  <div className="bubble b-out">
                    Halo kak, masih buka? Mau es kopi susu 2 ya, less sugar 🙏
                    <span className="b-meta">21:14 ✓✓</span>
                  </div>
                  <div className="bubble b-in">
                    Halo kak! Masih buka sampai jam 11 malam 🙌 Es Kopi Susu Gula
                    Aren 2 (less sugar), totalnya Rp 36.000. Diambil atau diantar
                    ya kak?<span className="b-meta">21:14</span>
                  </div>
                  <div className="bubble b-out">
                    Diambil aja ya<span className="b-meta">21:15 ✓✓</span>
                  </div>
                  <div className="bubble b-in">
                    Siap kak! Order #1042 lagi disiapin ya ☕ Struk sudah dikirim.
                    <span className="b-meta">21:15</span>
                  </div>
                  <div className="bubble b-points">
                    🎉 Kakak dapat +36 poin! Total 284 poin — 16 lagi buat
                    voucher Rp 5.000.
                  </div>
                </div>
                <button className="replay-btn" data-replay>
                  ↻ Putar ulang
                </button>
              </div>
              {/* dashboard summary — monthly recap + top menu (illustrative demo data) */}
              <div className="dpanels">
                <div className="dpanel">
                  <div className="dp-head">
                    <h4>Ringkasan Bulan Ini</h4>
                    <span className="per">Mei 2026 ⌄</span>
                  </div>
                  <div className="dstats">
                    <div className="dstat">
                      <div className="dl">
                        <svg viewBox="0 0 24 24" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>{" "}
                        Total Order
                      </div>
                      <div className="dv">1.284</div>
                      <div className="dd">↑ 18%</div>
                    </div>
                    <div className="dstat">
                      <div className="dl">
                        <svg viewBox="0 0 24 24" strokeWidth="2">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                        </svg>{" "}
                        Pendapatan
                      </div>
                      <div className="dv">Rp 38,6 jt</div>
                      <div className="dd">↑ 18%</div>
                    </div>
                    <div className="dstat">
                      <div className="dl">
                        <svg viewBox="0 0 24 24" strokeWidth="2">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                        </svg>{" "}
                        Member Aktif
                      </div>
                      <div className="dv">312</div>
                      <div className="dd">(+47)</div>
                    </div>
                    <div className="dstat">
                      <div className="dl">
                        <svg viewBox="0 0 24 24" strokeWidth="2">
                          <path d="M17 2l4 4-4 4M7 22l-4-4 4-4" />
                        </svg>{" "}
                        Repeat Rate
                      </div>
                      <div className="dv">64%</div>
                      <div className="dd">↑ 8%</div>
                    </div>
                  </div>
                </div>

                <div className="dpanel">
                  <div className="dp-head">
                    <h4>Top Menu</h4>
                  </div>
                  <div className="top-row">
                    <span className="top-rank">1</span>
                    <div className="top-mid">
                      <div className="tn">
                        Es Kopi Susu <span className="tc">426 (33%)</span>
                      </div>
                      <div className="top-bar">
                        <i style={{ width: "100%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="top-row">
                    <span className="top-rank">2</span>
                    <div className="top-mid">
                      <div className="tn">
                        Americano <span className="tc">318 (25%)</span>
                      </div>
                      <div className="top-bar">
                        <i style={{ width: "75%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="top-row">
                    <span className="top-rank">3</span>
                    <div className="top-mid">
                      <div className="tn">
                        Croissant <span className="tc">196 (15%)</span>
                      </div>
                      <div className="top-bar">
                        <i style={{ width: "46%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="dsee">Lihat semua ›</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust">
        <div className="wrap">
          <p>Dibangun khusus untuk cara kerja F&amp;B Indonesia</p>
          <div className="trust-row">
            <div className="trust-pill">
              <span className="e"><IconShieldCheck /></span> WhatsApp Business API
            </div>
            <div className="trust-pill">
              <span className="e"><IconBolt /></span> Setup 30 Menit
            </div>
            <div className="trust-pill">
              <span className="e">🇮🇩</span> Bahasa Indonesia Native
            </div>
            <div className="trust-pill">
              <span className="e"><IconLock /></span> Aman &amp; Patuh UU PDP
            </div>
          </div>
        </div>
      </section>

      {/* CHATBOT-VS-AI-NATIVE FLOW COMPARISON — illustrative concept (scoped .cmpsec) */}
      <section className="cmpsec">
        <div className="wrap">
          <div className="cf-head">
            <span className="cf-eyebrow">Cara kerjanya</span>
            <h2>Chatbot automation vs AI-Native</h2>
            <p>
              Keduanya hidup di WhatsApp, tapi cara kerjanya beda jauh. Begini
              bedanya, langkah demi langkah.
            </p>
          </div>

          <div className="cf-canvas">
            <div className="cf-lanes">
              <div className="cf-lane">
                <div className="cf-lane-title">
                  <span className="cf-chip">Chatbot automation</span>
                  <span className="cf-tag cf-grey">Berbasis aturan</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: CMP_CHATBOT_SVG }} />
                <p className="cf-lane-note">
                  Harus dilatih, dirawat terus, dan tetap mentok di luar skrip.
                </p>
              </div>

              <div className="cf-lane">
                <div className="cf-lane-title">
                  <span className="cf-chip">Sosmed AI</span>
                  <span className="cf-tag cf-green">AI-Native</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: CMP_AI_SVG }} />
                <p className="cf-lane-note">
                  Tanpa dilatih - paham, menalar, dan makin pintar seiring
                  dipakai.
                </p>
              </div>

              <div className="cf-ilist">
                <div className="cf-ili cf-faint"><CmpDi /> Tanya jam buka</div>
                <div className="cf-ili cf-faint2"><CmpDi /> Cek promo hari ini</div>
                <div className="cf-ili cf-active"><CmpDi /> Order makanan &amp; minuman</div>
                <div className="cf-ili"><CmpDi /> Tanya menu &amp; harga</div>
                <div className="cf-ili cf-faint2"><CmpDi /> Konfirmasi pembayaran</div>
                <div className="cf-ili cf-faint"><CmpDi /> Minta alamat &amp; ongkir</div>
              </div>
            </div>
          </div>

          <p className="cf-cap">
            Ilustrasi konsep cara kerja AI-Native. Sosmed AI masih dalam
            pengembangan; sebagian kemampuan masih kami kerjakan.
          </p>
        </div>
      </section>

      {/* AI-NATIVE BANNER — illustrative concept (scoped .ainat) */}
      <section className="ainat">
        <div className="wrap">
          <div className="aib-top">
            <h2>
              Ini bukan automation chatbot,
              <br className="aib-br" />
              tapi AI-Native di WhatsApp Anda.
            </h2>
            <p>
              Paham bahasa sehari-hari pelanggan. Menalar sendiri. Tetap
              nyambung walau pertanyaannya di luar dugaan.
            </p>
          </div>

          <div className="aib-panel">
            <div className="aib-left">
              <h3>AI yang paham maksud pelanggan.</h3>
              <p>
                Dari order sampai tanya menu, AI menangkap maksud dari chat
                sehari-hari lalu mengarahkannya sendiri - tanpa skrip yang harus
                Anda latih.
              </p>
              <Link className="aib-link" href="/produk">
                Pelajari cara kerjanya{" "}
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div
              className="aib-flow"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: AINATIVE_FLOW_SVG }}
            />

            <div className="aib-list">
              <div className="aib-li aib-faint"><AiBannerDi /> Tanya jam buka</div>
              <div className="aib-li aib-faint2"><AiBannerDi /> Cek promo hari ini</div>
              <div className="aib-li aib-active"><AiBannerDi /> Order makanan &amp; minuman</div>
              <div className="aib-li"><AiBannerDi /> Tanya menu &amp; harga</div>
              <div className="aib-li aib-faint2"><AiBannerDi /> Konfirmasi pembayaran</div>
              <div className="aib-li aib-faint"><AiBannerDi /> Minta alamat &amp; ongkir</div>
            </div>
          </div>

          <p className="aib-cap">
            Ilustrasi konsep cara kerja AI-Native. Sosmed AI masih dalam
            pengembangan.
          </p>
        </div>
      </section>

      {/* ALL-IN-ONE PACKAGE CARD */}
      <section className="pkg">
        <div className="wrap">
          <div className="pkg-card">
            <div className="pkg-left">
              <div className="pkg-brand">
                <img
                  className="pkg-logo-img"
                  src="/logo/sosmed-ai-logo-all-white-version.png"
                  alt="Sosmed AI"
                />
                <span className="pkg-tag">Satu Paket</span>
              </div>
              <h2>Semua yang bisnis Anda butuhkan, dalam satu paket.</h2>
              <p className="pkg-sub">
                Satu langganan, semua fitur. Tanpa add-on, tanpa biaya
                tersembunyi — semuanya jalan dari WhatsApp.
              </p>
              <a className="pkg-btn" href="/produk">
                Lihat Cara Kerja →
              </a>
            </div>

            <div className="pkg-grid">
              <div className="pkg-feat">
                <div className="pf-ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 5h18M3 12h18M3 19h12" />
                    <circle cx="20" cy="19" r="2.2" fill="#E9DCFF" stroke="none" />
                  </svg>
                </div>
                <h3>Order Otomatis</h3>
                <p>
                  Pelanggan order sendiri lewat chat — lengkap dengan rincian
                  dan QRIS.
                </p>
              </div>
              <div className="pkg-feat">
                <div className="pf-ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
                  </svg>
                </div>
                <h3>Poin &amp; Member</h3>
                <p>Poin masuk tiap transaksi, pelanggan balik lagi tanpa kartu fisik.</p>
              </div>
              <div className="pkg-feat">
                <div className="pf-ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <path d="M14 14h3v3M21 21v-7M17 21h4" />
                  </svg>
                </div>
                <h3>Menu Digital + QR</h3>
                <p>Scan QR di meja, pilih menu, order lanjut otomatis di WhatsApp.</p>
              </div>
              <div className="pkg-feat">
                <div className="pf-ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19V5M4 19h16" />
                    <rect x="7" y="11" width="3" height="5" />
                    <rect x="12" y="8" width="3" height="8" />
                    <rect x="17" y="13" width="3" height="3" />
                  </svg>
                </div>
                <h3>Kelola dari WhatsApp</h3>
                <p>Laporan, konfirmasi, atur menu — semua dari chat. Tanpa dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="wrap">
          <div className="eyebrow">Kenyataan Sehari-hari di Bisnis F&amp;B</div>
          <h2 className="sec-title sec-title-2line">
            Berapa banyak order hilang
            <br />
            karena chat nggak sempat dibales?
          </h2>
          <div className="prob-grid">
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Chat masuk pas lagi rame.</b> Pelanggan nanya menu, nunggu
                lama, nggak dibales, akhirnya pindah ke tempat sebelah.
              </p>
            </div>
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Tutup, owner tidur.</b> Order tengah malam atau pagi buta
                hilang begitu aja.
              </p>
            </div>
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Capek bales pertanyaan yang sama.</b> &quot;Buka jam
                berapa?&quot;, &quot;ada apa aja?&quot;, &quot;berapa
                totalnya?&quot;, berjam-jam tiap hari.
              </p>
            </div>
            <div className="prob">
              <div className="x">✕</div>
              <p>
                <b>Pelanggan dateng sekali, terus lupa.</b> Padahal 60–70% omzet
                bisnis F&amp;B datang dari pelanggan langganan.
              </p>
            </div>
          </div>
          <p className="prob-foot">
            Rata-rata bisnis F&amp;B kehilangan <b>Rp 2–4 juta per bulan</b>{" "}
            hanya dari order yang nggak kebales. Sosmed AI menutup celah itu.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur">
        <div className="wrap">
          <div className="eyebrow">Yang Anda Dapatkan</div>
          <h2 className="sec-title">
            Satu sistem. Semua yang bisnis Anda butuhkan.
          </h2>
          <p className="sec-lead">
            Bukan sekadar chatbot. Sosmed AI adalah sistem lengkap untuk order,
            menu, member, dan poin yang jalan otomatis di WhatsApp yang sudah
            Anda pakai tiap hari.
          </p>

          {/* f1 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">01 · Bot Order Otomatis</div>
              <h3>Balas pelanggan 24 jam, tanpa pegang HP terus.</h3>
              <p>
                AI balas tanya menu, jam buka, dan terima order langsung dari
                chat. Bahasa Indonesia santai, ngerti pesanan kayak &quot;es
                kopi susu less sugar, gelas gede&quot;. Yang ribet baru
                dialihkan ke staf Anda.
              </p>
              <div className="f-chips">
                <span>24 Jam</span>
                <span>Bahasa Santai</span>
                <span>Ngerti Varian Menu</span>
              </div>
            </div>
            <div className="f-visual chat-anim" data-chat data-loop="5000">
              <div className="bubble b-out" style={{ maxWidth: "90%" }}>
                Ada menu apa aja kak?
              </div>
              <div className="bubble b-in" style={{ maxWidth: "90%" }}>
                Hari ini ada: Es Kopi Susu, Americano, Cappuccino, Matcha Latte,
                sama Croissant &amp; Pain au Chocolat 🥐 Mau pesan yang mana kak?
              </div>
              <div
                className="ui-pill"
                style={{ alignSelf: "flex-start", color: "var(--green)" }}
              >
                ⚡ Dibalas dalam 2 detik
              </div>
              <button className="replay-btn" data-replay>
                ↻ Putar ulang
              </button>
            </div>
          </div>

          {/* f2 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">02 · Menu Digital + QR Meja</div>
              <h3>Ganti menu JPG yang ribet di-update.</h3>
              <p>
                Menu online yang bisa Anda ubah dalam 30 detik. Cetak QR untuk di
                meja, pelanggan tinggal scan, lihat menu, lalu pesan dari tempat
                duduk. Ganti harga sekali, langsung berubah di mana-mana.
              </p>
              <div className="f-chips">
                <span>Update Instan</span>
                <span>QR di Meja</span>
                <span>Order dari Tempat Duduk</span>
              </div>
            </div>
            <div className="f-visual">
              <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                <div className="qr">
                  <svg className="qr-svg" viewBox="0 0 64 64" aria-hidden="true">
                    <rect width="64" height="64" fill="#fff" />
                    <path fill="currentColor" d="M6 6h16v16H6zM42 6h16v16H42zM6 42h16v16H6z" />
                    <path fill="#fff" d="M9 9h10v10H9zM45 9h10v10H45zM9 45h10v10H9z" />
                    <path fill="currentColor" d="M11.5 11.5h5v5h-5zM47.5 11.5h5v5h-5zM11.5 47.5h5v5h-5z" />
                    <path fill="currentColor" d="M28 8h4v4h-4zM36 8h4v4h-4zM28 16h4v4h-4zM32 24h4v4h-4zM8 28h4v4H8zM16 28h4v4h-4zM24 28h4v4h-4zM28 32h4v4h-4zM40 28h4v4h-4zM48 32h4v4h-4zM56 28h4v4h-4zM28 40h4v4h-4zM36 44h4v4h-4zM44 40h4v4h-4zM52 44h4v4h-4zM28 48h4v4h-4zM32 56h4v4h-4zM40 52h4v4h-4zM48 56h4v4h-4zM56 48h4v4h-4zM40 36h4v4h-4zM40 60h4v4h-4z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="menu-item">
                    <span>Es Kopi Susu Gula Aren</span>
                    <span className="p">Rp 18rb</span>
                  </div>
                  <div className="menu-item">
                    <span>Americano</span>
                    <span className="p">Rp 15rb</span>
                  </div>
                  <div className="menu-item">
                    <span>Matcha Latte</span>
                    <span className="p">Rp 25rb</span>
                  </div>
                  <div className="menu-item">
                    <span>Croissant</span>
                    <span className="p">Rp 22rb</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* f3 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">03 · Sistem Poin &amp; Member</div>
              <h3>Bikin pelanggan balik lagi, otomatis.</h3>
              <p>
                Setiap belanja Rp 1.000 dapat 1 poin. Kumpulin 100 poin, tukar
                voucher Rp 5.000. Pelanggan daftar member langsung lewat
                WhatsApp, cukup ketik nama, nggak perlu download aplikasi atau
                kartu fisik.
              </p>
              <div className="f-chips">
                <span>1 Poin / Rp 1.000</span>
                <span>Voucher Otomatis</span>
                <span>Daftar via WhatsApp</span>
              </div>
            </div>
            <div className="f-visual chat-anim" data-chat data-loop="5000">
              <div className="bubble b-in" style={{ maxWidth: "92%" }}>
                Mau daftar member kak? Tiap order dapat poin, bisa ditukar
                minuman gratis ☕ Ketik nama aja buat daftar 🙂
              </div>
              <div className="bubble b-out" style={{ maxWidth: "60%" }}>
                Dimas
              </div>
              <div className="bubble b-points" style={{ maxWidth: "92%" }}>
                ✅ Sip Dimas, udah terdaftar! Order tadi langsung dapat +36 poin.
              </div>
              <button className="replay-btn" data-replay>
                ↻ Putar ulang
              </button>
            </div>
          </div>

          {/* f4 */}
          <div className="feature">
            <div className="f-text">
              <div className="f-kicker">04 · Kelola Order dari WhatsApp</div>
              <h3>Lihat &amp; kelola order tanpa buka dashboard.</h3>
              <p>
                Order baru langsung masuk ke WhatsApp Anda dengan notifikasi.
                Chat bot Anda buat lihat order hari ini, tandai pesanan selesai,
                atau cek penjualan. Semua dari chat, nggak perlu buka aplikasi
                atau laptop.
              </p>
              <div className="f-chips">
                <span>Notif Real-Time</span>
                <span>Kelola via Chat</span>
                <span>Tanpa Login</span>
              </div>
            </div>
            <div className="f-visual">
              <div className="order-row" style={{ margin: "0 0 9px" }}>
                <div>
                  <div className="oi">#1042 · Es Kopi Susu ×2</div>
                  <div className="od">less sugar</div>
                </div>
                <div className="stat stat-new">Baru</div>
              </div>
              <div className="order-row" style={{ margin: "0 0 9px" }}>
                <div>
                  <div className="oi">#1041 · Americano ×1</div>
                  <div className="od">meja 4</div>
                </div>
                <div className="stat stat-done">Selesai</div>
              </div>
              <div className="mini-stats" style={{ marginTop: "4px" }}>
                <div className="mini">
                  <div className="n">48</div>
                  <div className="l">Order</div>
                </div>
                <div className="mini">
                  <div className="n">Rp 1,4jt</div>
                  <div className="l">Penjualan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="wrap">
          <div className="eyebrow">Kenapa Sosmed AI</div>
          <h2 className="sec-title">
            Bukan yang termurah. Yang paling pas untuk bisnis F&amp;B.
          </h2>
          <div className="why-grid" style={{ marginTop: "14px" }}>
            <div className="why-card">
              <div className="ic"><IconCoffee /></div>
              <h3>Khusus F&amp;B</h3>
              <p>
                Bukan tools generik untuk semua usaha. Tiap fitur dirancang untuk
                cara kerja bisnis F&amp;B: varian menu (ukuran, topping, level
                pedas), QR meja, poin untuk pelanggan langganan.
              </p>
            </div>
            <div className="why-card">
              <div className="ic"><IconShieldCheck /></div>
              <h3>WhatsApp Business API</h3>
              <p>
                Kami membangun di atas WhatsApp Business API, bukan tools bajakan
                yang minta scan QR. Jadi lebih stabil, sesuai ketentuan WhatsApp,
                dan bisa kirim promo dengan lebih tenang.
              </p>
            </div>
            <div className="why-card">
              <div className="ic"><IconCreditCard /></div>
              <h3>Satu Harga, Semua Fitur</h3>
              <p>
                Nggak ada biaya tersembunyi, nggak ada add-on yang bikin tagihan
                membengkak. Anda tahu persis bayar berapa tiap bulan.
              </p>
            </div>
            <div className="why-card">
              <div className="ic"><IconGrowth /></div>
              <h3>Bayar Sendiri</h3>
              <p>
                Mulai Rp 199 ribu/bulan, sekitar Rp 6.600/hari, kurang dari satu
                porsi menu. Satu order tambahan sehari aja sudah balik modal
                berkali lipat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NO DASHBOARD / ALL IN WHATSAPP */}
      <section id="tanpa-dashboard" className="nodash wa-showcase">
        <div className="wrap">
          <div className="eyebrow">Tanpa Aplikasi, Tanpa Login</div>
          <h2 className="sec-title">
            Semua di WhatsApp. Baik customer maupun Anda.
          </h2>
          <p className="sec-lead">
            Pemilik usaha nggak perlu buka dashboard, nggak perlu install
            aplikasi atau hapal sistem apapun. Kelola seluruh aktivitas bisnis
            dengan chat di WhatsApp.
          </p>

          {/* showcase: all in whatsapp */}
          <div className="sw-card">
            <div className="sw-top">
              <div className="sw-content">
                <h2 className="sw-title">
                  Anda sudah jago pakai
                  <br />
                  WhatsApp. <span className="sw-grad">Itu aja cukup.</span>
                </h2>
                <p className="sw-sub">
                  Kebanyakan tools bisnis maksa Anda belajar dashboard rumit,
                  login tiap hari. Sosmed AI kebalikannya.
                </p>
                <div className="sw-feats">
                  <div className="sw-feat">
                    <div className="sw-fic">
                      <IconSpark />
                    </div>
                    <div>
                      <h3>Tinggal chat ke Chatbot AI-Native</h3>
                      <p>
                        Lihat order, ubah menu, cek penjualan, atau tandai
                        pesanan selesai.
                      </p>
                    </div>
                  </div>
                  <div className="sw-feat">
                    <div className="sw-fic">
                      <IconMessage />
                    </div>
                    <div>
                      <h3>Cuma pakai WhatsApp</h3>
                      <p>
                        Pelanggan pesan lewat WA, Anda kelola juga lewat
                        WhatsApp.
                      </p>
                    </div>
                  </div>
                  <div className="sw-feat">
                    <div className="sw-fic">
                      <IconBolt />
                    </div>
                    <div>
                      <h3>Tanpa pakai Aplikasi</h3>
                      <p>Gak perlu instal aplikasi atau login ke dashboard.</p>
                    </div>
                  </div>
                </div>
                <div className="sw-strip">
                  <div className="sw-mini">
                    <div className="sw-mic">
                      <IconMessage />
                    </div>
                    <h4>WhatsApp First</h4>
                    <p>100% di WhatsApp</p>
                  </div>
                  <div className="sw-mini">
                    <div className="sw-mic">
                      <IconSpark />
                    </div>
                    <h4>AI Assistant</h4>
                    <p>Jawaban instan</p>
                  </div>
                  <div className="sw-mini">
                    <div className="sw-mic">
                      <IconLock />
                    </div>
                    <h4>Aman &amp; Privat</h4>
                    <p>Sesuai UU PDP</p>
                  </div>
                  <div className="sw-mini">
                    <div className="sw-mic">
                      <IconBolt />
                    </div>
                    <h4>Hemat Waktu</h4>
                    <p>Kelola bisnis cepat</p>
                  </div>
                </div>
              </div>
              <ShowcaseChat />
            </div>
          </div>

          {/* command cards — Sisi Customer / Sisi Owner */}
          <div className="cmd-grid">
            <div className="cmd-card">
              <div className="cmd-head">
                <div className="cmd-hic cust">
                  <svg viewBox="0 0 24 24" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z" />
                  </svg>
                </div>
                <div className="cmd-htx">
                  <h3>Sisi Customer</h3>
                  <p>Pesan &amp; cek lewat WhatsApp</p>
                </div>
                <span className="cmd-badge">Customer First</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg></span>
                <span className="cmd-pill">&quot;menu&quot;</span>
                <span className="cmd-desc">Lihat menu &amp; harga terkini</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg></span>
                <span className="cmd-pill">&quot;pesan…&quot;</span>
                <span className="cmd-desc">Order langsung dari chat</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 12h.01" /></svg></span>
                <span className="cmd-pill">&quot;cek poin&quot;</span>
                <span className="cmd-desc">Lihat saldo poin &amp; voucher</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg></span>
                <span className="cmd-pill">&quot;daftar&quot;</span>
                <span className="cmd-desc">Jadi member cukup ketik nama</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>
                <span className="cmd-pill">&quot;jam buka?&quot;</span>
                <span className="cmd-desc">Info jam &amp; lokasi otomatis</span>
              </div>
            </div>

            <div className="cmd-card">
              <div className="cmd-head">
                <div className="cmd-hic own">
                  <svg viewBox="0 0 24 24" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l1.5-5h15L21 9M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18M8 9v3a2 2 0 0 0 4 0 2 2 0 0 0 4 0V9" />
                  </svg>
                </div>
                <div className="cmd-htx">
                  <h3>Sisi Owner</h3>
                  <p>Kelola bisnis lewat WhatsApp</p>
                </div>
                <span className="cmd-badge">Business Control</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" /></svg></span>
                <span className="cmd-pill">&quot;order hari ini&quot;</span>
                <span className="cmd-desc">Lihat order &amp; penjualan</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V4M4 20h16M8 16v-4M13 16V8M18 16v-7" /></svg></span>
                <span className="cmd-pill">&quot;laporan harian&quot;</span>
                <span className="cmd-desc">Ringkasan penjualan harian</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18l5-5 3 3 7-7M21 9V4h-5" /></svg></span>
                <span className="cmd-pill">&quot;laporan bulanan&quot;</span>
                <span className="cmd-desc">Performa bulanan + tren &amp; PDF</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="5" /><circle cx="8" cy="12" r="2.5" fill="currentColor" stroke="none" /></svg></span>
                <span className="cmd-pill">&quot;matiin [menu]&quot;</span>
                <span className="cmd-desc">Nonaktifkan menu yang habis</span>
              </div>
              <div className="cmd-row">
                <span className="cmd-ic"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg></span>
                <span className="cmd-pill">&quot;#1042 selesai&quot;</span>
                <span className="cmd-desc">Tandai pesanan selesai</span>
              </div>
            </div>
          </div>

          {/* dashboard band — available by request, with mockup */}
          <div className="dash-band">
            <div className="dash-left">
              <h2>
                Butuh lebih lengkap?
                <br />
                <span className="grad">Dashboard tetap tersedia.</span>
              </h2>
              <p>
                WhatsApp cukup untuk operasional harian. Tapi kalau Anda mau
                laporan penjualan mendetail, kelola puluhan menu sekaligus, atau
                lihat analitik member, dashboard web lengkap siap kapan pun Anda
                butuhkan. WhatsApp dulu, dashboard kalau perlu.
              </p>
              <span className="db-req">
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>{" "}
                By Request Only
              </span>
            </div>

            <div className="db-mock">
              <div className="dbm-win">
                <div className="dbm-bar"><span></span><span></span><span></span></div>
                <div className="dbm-side"><i className="on"></i><i></i><i></i><i></i><i></i></div>
                <div className="dbm-main">
                  <div className="dbm-stats">
                    <div className="dbm-stat"><div className="l">Total Order</div><div className="v">1.284</div><div className="d">↑ 18%</div></div>
                    <div className="dbm-stat"><div className="l">Pendapatan</div><div className="v">Rp 38,6 jt</div><div className="d">↑ 18%</div></div>
                    <div className="dbm-stat"><div className="l">Member Aktif</div><div className="v">312</div><div className="d">(+47)</div></div>
                  </div>
                  <div className="dbm-chart">
                    <div className="ct">Tren Penjualan</div>
                    <svg viewBox="0 0 480 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dbFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#C880F8" stopOpacity=".28" />
                          <stop offset="1" stopColor="#C880F8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M10 110 C 70 95, 90 70, 140 80 C 190 90, 210 45, 260 70 C 300 90, 320 55, 360 75 C 400 92, 430 40, 470 38 L470 140 L10 140 Z" fill="url(#dbFill)" />
                      <path d="M10 110 C 70 95, 90 70, 140 80 C 190 90, 210 45, 260 70 C 300 90, 320 55, 360 75 C 400 92, 430 40, 470 38" fill="none" stroke="#A050F8" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="470" cy="38" r="4" fill="#A050F8" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="db-float">
                <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V4M4 20h16M8 16v-4M13 16V8M18 16v-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI TECH / INTELLIGENCE */}
      <section id="teknologi" className="tech">
        <div className="wrap">
          <div className="eyebrow">Teknologi di Balik Layar</div>
          <h2 className="sec-title">
            AI yang ngerti Indonesia, bukan sekadar tempelan.
          </h2>
          <p className="sec-lead">
            Sosmed AI ditenagai mesin AI multi-model yang dirancang khusus untuk
            bahasa dan perilaku konsumen Indonesia. Cepat, hemat, dan terdengar
            manusiawi.
          </p>

          <div className="tech-grid">
            <div className="tech-feats">
              <div className="tech-feat">
                <div className="ic"><IconSpark /></div>
                <div>
                  <h3>Native Bahasa Indonesia, bukan terjemahan</h3>
                  <p>
                    Dilatih untuk ngerti cara orang Indonesia chat, dari
                    &quot;gas kak&quot;, &quot;es batunya banyakin&quot;, sampai
                    gaya Jaksel. Bot membalas dengan tone yang pas, bukan kaku
                    ala robot translate.
                  </p>
                </div>
              </div>
              <div className="tech-feat">
                <div className="ic"><IconBolt /></div>
                <div>
                  <h3>Multi-model routing yang cerdas</h3>
                  <p>
                    Setiap pesan diarahkan ke model AI yang paling tepat: yang
                    ringan untuk tanya menu, yang canggih untuk percakapan rumit.
                    Hasilnya balasan cepat, biaya efisien, kualitas tinggi.
                  </p>
                </div>
              </div>
              <div className="tech-feat">
                <div className="ic"><IconTarget /></div>
                <div>
                  <h3>Ngerti konteks F&amp;B</h3>
                  <p>
                    Paham varian menu, modifier (ukuran, topping, level pedas,
                    extra shot), dan istilah F&amp;B. Memvalidasi pesanan dengan
                    menu asli Anda, nggak pernah ngarang item yang nggak ada.
                  </p>
                </div>
              </div>
              <div className="tech-feat">
                <div className="ic"><IconShieldCheck /></div>
                <div>
                  <h3>Aman, terkendali, dan akurat</h3>
                  <p>
                    Harga dan total selalu dihitung dari data Anda, bukan dari
                    AI. Yang di luar jangkauan otomatis dialihkan ke Anda. Tidak
                    ada halusinasi soal harga atau stok.
                  </p>
                </div>
              </div>
            </div>

            {/* AI routing visual */}
            <div className="ai-viz">
              <div className="ai-viz-top">
                <span className="pulse"></span> Mesin AI · memproses pesan
              </div>
              <div className="ai-msg">
                &quot;halo kak, es kopi susu 2 ya, less sugar, sama croissant 1
                🙏&quot;
              </div>
              <div className="ai-flow">
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#C9A6FB" }}></span>{" "}
                    Deteksi maksud
                  </span>
                  <span className="tag tag-route">Order + Menu</span>
                </div>
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#5FD98A" }}></span>{" "}
                    Cek menu &amp; varian
                  </span>
                  <span className="tag tag-fast">Tervalidasi</span>
                </div>
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#C9A6FB" }}></span>{" "}
                    Hitung total dari data
                  </span>
                  <span className="tag tag-route">Rp 58.000</span>
                </div>
                <div className="ai-node">
                  <span className="lbl">
                    <span className="dot2" style={{ background: "#5FD98A" }}></span>{" "}
                    Balas + kasih poin
                  </span>
                  <span className="tag tag-fast">1,8 detik</span>
                </div>
              </div>
              <div className="ai-foot">
                Diproses dengan model AI yang dipilih otomatis per tugas
              </div>
            </div>
          </div>

          <div className="models">
            <div className="model-chip">
              <span className="md"></span> Routing Multi-Model
            </div>
            <div className="model-chip">
              <span className="md"></span> Caching Cerdas
            </div>
            <div className="model-chip">
              <span className="md"></span> Validasi Anti-Halusinasi
            </div>
            <div className="model-chip">
              <span className="md"></span> Optimasi Biaya Otomatis
            </div>
          </div>
        </div>
      </section>

      {/* AI-NATIVE DIFFERENCE */}
      <section id="beda" className="native">
        <div className="wrap">
          <div className="eyebrow">Apa Bedanya</div>
          <h2 className="sec-title sec-title-2line">
            Kami bukan chatbot.
            <br />
            Kami AI-native.
          </h2>
          <p className="sec-lead">
            Kebanyakan &quot;bot WhatsApp&quot; cuma menu balasan otomatis dengan
            template kaku. Sosmed AI dibangun di atas kecerdasan buatan sungguhan
            yang ngerti maksud, konteks, dan bahasa, bukan sekadar mencocokkan
            kata kunci.
          </p>

          <div className="vs-grid">
            <div className="vs-card vs-old">
              <span className="vs-label">Chatbot Biasa</span>
              <h3>Bot template &amp; keyword</h3>
              <ul className="vs-list">
                <li>
                  <span className="vs-ic">✕</span> Balas hanya kalau kata
                  kuncinya pas. Salah ketik sedikit, langsung bingung.
                </li>
                <li>
                  <span className="vs-ic">✕</span> &quot;Tekan 1 untuk menu,
                  tekan 2 untuk pesan&quot;, kaku seperti mesin.
                </li>
                <li>
                  <span className="vs-ic">✕</span> Nggak ngerti &quot;es-nya
                  dikit aja ya, gula setengah&quot;, di luar skrip langsung
                  gagal.
                </li>
                <li>
                  <span className="vs-ic">✕</span> Jawaban sama untuk semua
                  orang, terasa robotik.
                </li>
                <li>
                  <span className="vs-ic">✕</span> Perlu disetting manual tiap
                  skenario, ribet diubah.
                </li>
              </ul>
            </div>
            <div className="vs-card vs-new">
              <span className="vs-label">✦ Sosmed AI</span>
              <h3>AI-native, ngerti maksud</h3>
              <ul className="vs-list">
                <li>
                  <span className="vs-ic">✓</span> Paham maksud walau diketik
                  berantakan, typo, atau campur bahasa.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Ngobrol natural seperti staf
                  beneran, santai, ramah, manusiawi.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Ngerti &quot;es-nya dikit,
                  gula setengah, gelas gede&quot; tanpa perlu disetting.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Tone menyesuaikan konteks,
                  dari sapaan ramah sampai konfirmasi order.
                </li>
                <li>
                  <span className="vs-ic">✓</span> Belajar dari menu &amp; data
                  Anda otomatis, tanpa perlu skrip manual.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="banding" style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Perbandingan</div>
          <h2 className="sec-title">Sosmed AI vs. solusi lain.</h2>
          <p className="sec-lead">
            Kenapa bisnis F&amp;B memilih Sosmed AI dibanding chatbot generik,
            tools impor, atau hire admin manual.
          </p>

          <div className="compare-wrap">
            <div className="compare">
              <table className="ctable">
                <thead>
                  <tr>
                    <th className="feat-col">Fitur</th>
                    <th className="us">Sosmed AI</th>
                    <th>Chatbot Generik</th>
                    <th>Tools Impor</th>
                    <th>Admin Manual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="feat-col">AI-native (ngerti maksud)</td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Template</span>
                    </td>
                    <td>
                      <span className="partial">~ Sebagian</span>
                    </td>
                    <td>
                      <span className="partial">~ Manusia</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">
                      Khusus F&amp;B (varian menu, QR meja)
                    </td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Generik</span>
                    </td>
                    <td>
                      <span className="no">✕ Generik</span>
                    </td>
                    <td>
                      <span className="partial">~ Tergantung</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Bahasa Indonesia native</td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="partial">~ Terbatas</span>
                    </td>
                    <td>
                      <span className="no">✕ Translate</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Sistem poin &amp; member</td>
                    <td className="us">
                      <span className="yes">✓ Built-in</span>
                    </td>
                    <td>
                      <span className="no">✕ Tidak</span>
                    </td>
                    <td>
                      <span className="partial">~ Add-on</span>
                    </td>
                    <td>
                      <span className="no">✕ Manual</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">WhatsApp Business API</td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="partial">~ Sering bajakan</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Pribadi</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Kerja 24 jam tanpa lelah</td>
                    <td className="us">
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="yes">✓ Ya</span>
                    </td>
                    <td>
                      <span className="no">✕ Jam kerja</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Harga untuk UMKM F&amp;B</td>
                    <td className="us">
                      <span className="yes">✓ Rp 199rb</span>
                    </td>
                    <td>
                      <span className="partial">~ Variatif</span>
                    </td>
                    <td>
                      <span className="no">✕ Mahal</span>
                    </td>
                    <td>
                      <span className="no">✕ Rp 2jt+</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="feat-col">Setup &amp; pakai sederhana</td>
                    <td className="us">
                      <span className="yes">✓ 30 menit</span>
                    </td>
                    <td>
                      <span className="partial">~ Ribet</span>
                    </td>
                    <td>
                      <span className="no">✕ Teknis</span>
                    </td>
                    <td>
                      <span className="yes">✓ Mudah</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="price-note" style={{ marginTop: "20px" }}>
            Perbandingan berdasarkan karakteristik umum tiap kategori solusi.
            Tidak menyebut merek tertentu.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja">
        <div className="wrap">
          <div className="eyebrow">Cara Kerja</div>
          <h2 className="sec-title sec-title-2line">
            Dari daftar sampai terima
            <br />
            order otomatis, cuma 30 menit.
          </h2>
          <div className="steps" style={{ marginTop: "14px" }}>
            <div className="step">
              <div className="num">1</div>
              <h3>Hubungkan WhatsApp</h3>
              <p>
                Sambungkan nomor WhatsApp bisnis Anda lewat WhatsApp Business
                API. Tim kami bantu prosesnya.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Isi Menu Anda</h3>
              <p>
                Masukkan menu (atau foto menu yang ada, kami bantu input). Atur
                jam buka, alamat, dan aturan poin.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Bot Mulai Jalan</h3>
              <p>
                Bot langsung aktif: terima order, kasih poin, kirim struk. Anda
                tinggal lihat order masuk sambil ngurus pesanan.
              </p>
            </div>
          </div>
          <p className="how-foot">
            Setup di tempat. Tanpa install apa-apa. Tanpa skill teknis.
            <br />
            Kalau bisa pakai WhatsApp, Anda bisa pakai Sosmed AI.
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section id="untuk-fnb" style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="eyebrow">Cocok Untuk</div>
          <h2 className="sec-title sec-title-1line">
            Dibuat khusus untuk bisnis F&amp;B.
          </h2>
          <div className="uc-grid" style={{ marginTop: "14px" }}>
            <div className="uc">
              <div className="emo"><IconCoffee /></div>
              <h3>Coffee Shop &amp; Kafe</h3>
              <p>
                Terima order pas rame, kasih poin tiap cup, bikin pelanggan jadi
                langganan. Single outlet sampai 2–3 cabang.
              </p>
            </div>
            <div className="uc">
              <div className="emo"><IconBowl /></div>
              <h3>Restoran &amp; Warung</h3>
              <p>
                Kelola order delivery &amp; takeaway dari satu dashboard. Menu
                digital yang gampang di-update.
              </p>
            </div>
            <div className="uc">
              <div className="emo"><IconCup /></div>
              <h3>Kedai Minuman &amp; Dessert</h3>
              <p>
                Sistem poin yang bikin pelanggan balik. Member digital tanpa
                kartu fisik. Boba, jus, es krim.
              </p>
            </div>
            <div className="uc">
              <div className="emo"><IconBread /></div>
              <h3>Bakery &amp; Pastry</h3>
              <p>
                Terima pre-order kue &amp; roti via WhatsApp, kelola pesanan
                custom, kirim struk &amp; reminder otomatis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING BANNER (replaces the old inline pricing section) */}
      <section className="price-banner-sec">
        <div className="wrap">
          <div className="price-banner">
            <div className="pb-left">
              <div className="pb-eyebrow">Harga</div>
              <h2>
                Mulai Rp 7 ribu<span className="small">per hari.</span>
              </h2>
              <p className="pb-body">
                Lebih murah dari satu cup kopi. Satu order tambahan sehari aja
                sudah balik modal, dan Anda bisa hemat waktu sekaligus biaya yang
                biasanya kebuang.
              </p>
              <div className="pb-btns">
                {/* coming-soon, intentionally NOT a link until launch */}
                <button type="button" className="btn btn-solid" disabled>
                  <span className="dot"></span> Daftar
                </button>
                <Link className="btn btn-ghost" href="/harga">
                  Lihat Harga →
                </Link>
              </div>
              <div className="pb-soon">Pendaftaran segera dibuka.</div>
            </div>

            <div className="pb-right">
              <div className="pb-graphic">
                <div className="wa-win">
                  <div className="mp-bar">
                    <span className="mp-back">‹</span>
                    <div className="mp-av">KS</div>
                    <div className="mp-meta">
                      <div className="mp-name">Kopi Senja</div>
                      <div className="mp-sub">online</div>
                    </div>
                    <div className="mp-ico">⋮</div>
                  </div>
                  <div className="mp-chat">
                    <div className="mb out">
                      es kopi susu 2, less sugar
                      <span className="tm">21:14 ✓✓</span>
                    </div>
                    <div className="mb in">
                      Siap kak! Total Rp 36.000. Diambil atau diantar?
                      <span className="tm">21:14</span>
                    </div>
                    <div className="mb out">
                      ambil aja<span className="tm">21:15 ✓✓</span>
                    </div>
                    <div className="mb in">
                      Oke! Bayar via QRIS ya 👇<span className="tm">21:15</span>
                    </div>
                  </div>
                  <div className="mp-input">
                    <span>Ketik pesan…</span>
                    <span className="snd">➤</span>
                  </div>
                </div>

                <div className="dash-card">
                  <div className="dc-head">
                    <span className="dc-ic">📊</span> Laporan Hari Ini
                  </div>
                  <div className="dc-stat">
                    <span className="dc-lbl">Order masuk</span>
                    <span className="dc-val">48</span>
                  </div>
                  <div className="dc-stat">
                    <span className="dc-lbl">Penjualan</span>
                    <span className="dc-val up">Rp 1,4 jt</span>
                  </div>
                  <div className="dc-stat">
                    <span className="dc-lbl">Member baru</span>
                    <span className="dc-val">6</span>
                  </div>
                  <div className="dc-bars">
                    <span style={{ height: "40%" }}></span>
                    <span style={{ height: "62%" }}></span>
                    <span style={{ height: "48%" }}></span>
                    <span style={{ height: "80%" }}></span>
                    <span style={{ height: "70%" }}></span>
                    <span style={{ height: "95%" }}></span>
                    <span style={{ height: "84%" }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="eyebrow">FAQ</div>
          <h2 className="sec-title">Yang sering ditanyain pemilik bisnis F&amp;B.</h2>
          <div className="faq-wrap" style={{ marginTop: "14px" }}>
            <div className="faq-item">
              <button className="faq-q">
                Apa itu Sosmed AI?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Asisten WhatsApp berbasis AI khusus untuk bisnis F&amp;B kecil
                  seperti kafe, restoran, dan warung. Bot kami terima order
                  otomatis, balas pelanggan 24 jam, dan kelola sistem poin
                  member, semua lewat WhatsApp yang sudah Anda pakai.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Saya nggak ngerti teknologi, bisa pakai?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Bisa banget. Nggak perlu install aplikasi atau belajar sistem
                  ribet. Tim kami bantu setting dalam 30 menit. Kalau bisa pakai
                  WhatsApp, Anda bisa pakai Sosmed AI.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Apakah nomor WhatsApp bisnis saya aman?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Sangat aman. Kami membangun di atas WhatsApp Business API,
                  bukan tools bajakan yang minta scan QR. Jadi lebih stabil dan
                  sesuai ketentuan WhatsApp, nomor Anda lebih terjaga, dan bisa
                  kirim promo dengan lebih tenang.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Gimana sistem poinnya bekerja?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Setiap belanja Rp 1.000 dapat 1 poin. Kumpulin 100 poin, dapat
                  voucher Rp 5.000. Pelanggan daftar member langsung lewat
                  WhatsApp, cukup ketik nama. Poin dihitung otomatis, voucher
                  dikirim otomatis.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Pelanggan saya kebanyakan bayar tunai, bisa dapat poin?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Untuk awal, poin otomatis untuk order via WhatsApp. Fitur QR di
                  kasir untuk pelanggan walk-in sedang kami siapkan dan tersedia
                  menyusul.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Berapa harganya?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Mulai Rp 199 ribu/bulan untuk Starter, semua fitur sudah
                  termasuk. Pendaftar awal dapat harga founding user yang dikunci
                  selamanya.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Kapan bisa mulai pakai?<span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Kami sedang finalisasi dan akan segera membuka akses untuk
                  batch pertama. Pantau halaman ini dan media sosial kami untuk
                  info peluncuran.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Bisa integrasi dengan GoFood/GrabFood/ShopeeFood?
                <span className="ic">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Sedang kami kembangkan sebagai add-on. Info rilisnya akan
                  diumumkan menyusul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="wrap">
          <div className="cta-close">
            <div className="ctac-badge">
              <span className="cb-dot"></span> Segera Hadir
            </div>
            <h2>
              Saatnya bikin AI bekerja untuk
              <br />
              coffee shop dan restoran Anda.
            </h2>
            <p>
              Sosmed AI bakal jadi asisten WhatsApp yang bantu Anda kembangkan
              bisnis, tingkatkan produktivitas, dan layani pelanggan tanpa
              repot.
            </p>
            <a
              className="btn btn-ig"
              href="https://www.instagram.com/sosmed.io"
              target="_blank"
              rel="noopener"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1.2"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Ikuti Kami di Instagram
            </a>
            <div className="ctac-fine">
              Sebentar lagi hadir untuk bisnis F&amp;B Anda.
            </div>
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </>
  );
}
