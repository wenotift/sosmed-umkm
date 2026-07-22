"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  sessionSnapshot,
  subscribeSession,
  isEmailAllowed,
  type Session,
} from "@/lib/auth";
import {
  loadOnboarding,
  saveOnboarding,
  INDUSTRIES,
  GOAL_OPTIONS,
  type OnboardingData,
  type AgentTone,
} from "./lib";

/* ---- inline icons ---------------------------------------------------------*/
function L({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const I = {
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="8" width="16" height="12" rx="4" /><path d="M12 8V4M9 4h6" /><circle cx="9" cy="14" r="1.3" fill="#fff" stroke="none" /><circle cx="15" cy="14" r="1.3" fill="#fff" stroke="none" /><path d="M2 13v2M22 13v2" /></svg>
  ),
  check: <L><path d="M20 6 9 17l-5-5" /></L>,
  arrowR: <L><path d="M5 12h14M13 6l6 6-6 6" /></L>,
  arrowL: <L><path d="M19 12H5M11 18l-6-6 6-6" /></L>,
  help: <L><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></L>,
  wa: <L><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 21l2-5.5a8.5 8.5 0 0 1 16-4z" /></L>,
  store: <L><path d="M4 9V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4M3 9h18l-1 2H4L3 9ZM5 11v9h14v-9M9 20v-5h6v5" /></L>,
  chat: <L><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 21l2-5.5a8.5 8.5 0 0 1 16-4z" /></L>,
  bot: <L><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 8V4M8 4h4M2 14h2M20 14h2M9 13v2M15 13v2" /></L>,
  tone: <L><path d="M14 9V5a3 3 0 0 0-6 0v4M5 9h14l1 12H4L5 9Z" /></L>,
  globe: <L><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" /></L>,
  goal: <L><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></L>,
  faq: <L><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></L>,
  users: <L><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></L>,
  bag: <L><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" /></L>,
  cal: <L><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></L>,
  chart: <L><path d="M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V7M8 17v-4" /></L>,
  book: <L><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z" /></L>,
  shield: <L><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" /></L>,
  edit: <L><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></L>,
  rocket: <L><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2a2.8 2.8 0 0 0-3-3zM12 15l-3-3a12 12 0 0 1 8-8c2.5 0 4 1.5 4 4a12 12 0 0 1-8 8zM15 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></L>,
  spark: <L><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><circle cx="12" cy="12" r="3" /></L>,
};

const TONES: AgentTone[] = ["Professional", "Friendly", "Casual", "Formal"];

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return (p[0]?.[0] ?? "") + (p[1]?.[0] ?? "");
}

export default function OnboardingContent() {
  const router = useRouter();
  const session = useSyncExternalStore<Session | null | undefined>(
    subscribeSession,
    sessionSnapshot,
    () => undefined,
  );

  // Lazy-load persisted onboarding on the client (component is gated to null on
  // the server / during hydration, so there's no mismatch).
  const [data, setData] = useState<OnboardingData>(loadOnboarding);
  const [step, setStep] = useState<number>(() =>
    Math.min(4, Math.max(2, loadOnboarding().step)),
  );

  // persist on change
  useEffect(() => {
    saveOnboarding(data);
  }, [data]);

  // auth/allowlist guard + skip if already onboarded (redirect only — no setState)
  useEffect(() => {
    if (session === null || (session && !isEmailAllowed(session.email))) {
      router.replace("/login");
    } else if (data.complete) {
      router.replace("/dashboard");
    }
  }, [session, data.complete, router]);

  if (
    session === undefined ||
    session === null ||
    !isEmailAllowed(session.email) ||
    data.complete
  ) {
    return null;
  }

  const set = <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const goto = (s: number) => {
    setStep(s);
    setData((d) => ({ ...d, step: Math.max(d.step, s) }));
    window.scrollTo({ top: 0 });
  };

  const toggleGoal = (g: string) =>
    setData((d) => ({
      ...d,
      goals: d.goals.includes(g) ? d.goals.filter((x) => x !== g) : [...d.goals, g],
    }));

  const launch = () => {
    setData((d) => ({ ...d, complete: true }));
    saveOnboarding({ ...data, complete: true });
    router.push("/dashboard");
  };

  const STEPS = [
    { n: 1, title: "Create Account", sub: "Akun kamu sudah dibuat" },
    { n: 2, title: "Connect WhatsApp", sub: "Hubungkan WhatsApp Business" },
    { n: 3, title: "Setup Your Agent", sub: "Atur AI agent & alur kerja" },
    { n: 4, title: "Ready to Go!", sub: "Tinjau dan luncurkan agent" },
  ];
  const statusOf = (n: number) => (n < step ? "done" : n === step ? "active" : "pending");

  const bizName = data.businessName.trim() || "Bisnis kamu";
  const agentName = data.agentName.trim() || "Sosi AI";

  return (
    <div className="onb">
      {/* sidebar */}
      <aside className="onb-side">
        <div className="onb-brand">
          <Image
            className="onb-brand-logo"
            src="/logo/sosmed-ai-logo-white-version.png"
            alt="Sosmed AI"
            width={150}
            height={37}
            priority
          />
          <div className="onb-brand-sub">AI Native WhatsApp Automation Agent</div>
        </div>

        <div className="onb-steps">
          {STEPS.map((s, i) => {
            const st = statusOf(s.n);
            return (
              <div key={s.n}>
                <div className={`onb-step ${st}`}>
                  <span className="onb-step-num">
                    {st === "done" ? I.check : s.n}
                  </span>
                  <div className="onb-step-txt">
                    <h4>{s.title}</h4>
                    <p>{s.sub}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && <span className={"onb-step-line" + (s.n < step ? " done" : "")} />}
              </div>
            );
          })}
        </div>

        <div className="onb-side-foot">
          <div className="onb-mascot">{I.robot}</div>
          <div className="onb-ready-card">
            <h4>Kamu hampir selesai! 🎉</h4>
            <p>AI agent kamu siap membalas, membantu, dan menumbuhkan bisnis.</p>
            <ul className="onb-ready-list">
              {["Otomatis 24/7", "Balas instan", "Kumpulkan leads", "Tutup lebih banyak deal"].map((t) => (
                <li key={t}><span className="ck">{I.check}</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="onb-main">
        <header className="onb-top">
          <span className="onb-help">{I.help} Butuh bantuan?</span>
          <span className="onb-user">
            <span className="av">{initials(session.name)}</span>
            {session.name}
          </span>
        </header>

        <div className="onb-content">
          {/* progress rail */}
          <div className="onb-rail">
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ display: "contents" }}>
                <div className={`onb-rail-step ${statusOf(s.n)}`}>
                  <span className="onb-rail-dot">{s.n < step ? I.check : s.n}</span>
                  <span className="onb-rail-lbl">{s.title}</span>
                </div>
                {i < STEPS.length - 1 && <span className={"onb-rail-conn" + (s.n < step ? " done" : "")} />}
              </div>
            ))}
          </div>

          {step === 2 && (
            <StepConnect
              data={data}
              onChange={(wa) => set("waNumber", wa)}
              onConnect={() => set("waConnected", true)}
              onNext={() => goto(3)}
            />
          )}

          {step === 3 && (
            <StepAgent
              data={data}
              set={set}
              toggleGoal={toggleGoal}
              bizName={bizName}
              agentName={agentName}
              onBack={() => goto(2)}
              onNext={() => goto(4)}
            />
          )}

          {step === 4 && (
            <StepReady
              data={data}
              onBack={() => goto(3)}
              onLaunch={launch}
              onDashboard={launch}
              onEdit={() => goto(3)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== Step 2 — Connect WhatsApp ===========================================*/
function StepConnect({
  data,
  onChange,
  onConnect,
  onNext,
}: {
  data: OnboardingData;
  onChange: (wa: string) => void;
  onConnect: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <h1 className="onb-h1">Hubungkan WhatsApp 📱</h1>
      <p className="onb-lead">
        Sambungkan nomor WhatsApp Business kamu agar AI agent bisa mulai membalas
        pelanggan secara otomatis.
      </p>

      <div className="onb-card onb-connect">
        {data.waConnected ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div className="onb-connect-ic">{I.check}</div>
            <h3 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
              WhatsApp tersambung!
            </h3>
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 16 }}>
              +{data.waNumber || "62•••"} siap dipakai agent kamu.
            </p>
            <span className="onb-connected">{I.check} Business Account · Connected</span>
          </div>
        ) : (
          <div className="onb-connect-box">
            <div className="onb-connect-ic">{I.wa}</div>
            <h3 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
              Sambungkan WhatsApp Business
            </h3>
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 18 }}>
              Masukkan nomor WhatsApp Business kamu untuk mulai.
            </p>
            <input
              className="onb-input"
              style={{ maxWidth: 320, margin: "0 auto 14px", textAlign: "center" }}
              value={data.waNumber}
              onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="0812xxxxxxxx"
              inputMode="tel"
            />
            <div>
              <button
                className="onb-btn onb-btn-primary"
                disabled={data.waNumber.length < 8}
                onClick={onConnect}
              >
                {I.wa} Sambungkan
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="onb-nav">
        <span style={{ fontSize: 12.5, color: "var(--faint)" }}>Langkah 2 dari 4</span>
        <div className="onb-nav-right">
          <button className="onb-btn-link" onClick={onNext}>Lewati dulu</button>
          <button className="onb-btn onb-btn-primary" onClick={onNext} disabled={!data.waConnected}>
            Lanjut: Setup Agent {I.arrowR}
          </button>
        </div>
      </div>
    </>
  );
}

/* ===== Step 3 — Setup Your Agent ===========================================*/
function StepAgent({
  data,
  set,
  toggleGoal,
  bizName,
  agentName,
  onBack,
  onNext,
}: {
  data: OnboardingData;
  set: <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => void;
  toggleGoal: (g: string) => void;
  bizName: string;
  agentName: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const canDo = [
    { ic: I.faq, label: "Answer FAQs" },
    { ic: I.bag, label: "Recommend Products" },
    { ic: I.users, label: "Qualify Leads" },
    { ic: I.cal, label: "Book Appointments" },
  ];
  return (
    <>
      <h1 className="onb-h1">Setup AI Agent kamu 🤖</h1>
      <p className="onb-lead">
        Ceritakan tentang bisnis kamu dan atur bagaimana AI agent harus berperilaku,
        membalas, dan mengotomatiskan percakapan.
      </p>

      <div className="onb-grid">
        {/* form */}
        <div className="onb-card">
          <div className="onb-section-title"><span className="n">1</span> Bisnis kamu</div>
          <div className="onb-field">
            <label>Nama bisnis</label>
            <input value={data.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="mis. Kopi Senja" />
          </div>
          <div className="onb-field">
            <label>Deskripsi bisnis</label>
            <textarea
              value={data.businessDesc}
              onChange={(e) => set("businessDesc", e.target.value.slice(0, 500))}
              placeholder="Ceritakan produk/jasa dan apa yang membuat bisnismu spesial…"
            />
            <div className="hint">{data.businessDesc.length}/500</div>
          </div>
          <div className="onb-field">
            <label>Industri</label>
            <select value={data.industry} onChange={(e) => set("industry", e.target.value)}>
              {INDUSTRIES.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>

          <div className="onb-section-title" style={{ marginTop: 22 }}><span className="n">2</span> Profil Agent</div>
          <div className="onb-field">
            <label>Nama agent</label>
            <input value={data.agentName} onChange={(e) => set("agentName", e.target.value)} placeholder="Sosi AI" />
          </div>
          <div className="onb-field">
            <label>Gaya bahasa agent</label>
            <div className="onb-tones">
              {TONES.map((t) => (
                <button key={t} className={"onb-tone" + (data.tone === t ? " on" : "")} onClick={() => set("tone", t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="onb-field">
            <label>Bahasa</label>
            <select value={data.language} onChange={(e) => set("language", e.target.value)}>
              <option>Bahasa Indonesia</option>
              <option>English</option>
              <option>Bahasa + English (mix)</option>
            </select>
          </div>
          <div className="onb-field">
            <label>Tujuan utama</label>
            <div className="onb-goals">
              {GOAL_OPTIONS.map((g) => (
                <button key={g} className={"onb-goal" + (data.goals.includes(g) ? " on" : "")} onClick={() => toggleGoal(g)}>
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* preview */}
        <div className="onb-preview">
          <div className="onb-preview-head">
            <h3>Preview Agent</h3>
            <p>Beginilah cara agent kamu menyapa pelanggan.</p>
          </div>
          <div className="onb-wa">
            <div className="onb-wa-top">
              <span className="onb-wa-av">{I.bot}</span>
              <div>
                <div className="onb-wa-name">{agentName}</div>
                <div className="onb-wa-status"><span className="dot" /> Business Account</div>
              </div>
            </div>
            <div className="onb-bub">
              Halo! 👋 Terima kasih sudah menghubungi <b>{bizName}</b>. Ada yang bisa {agentName} bantu hari ini?
            </div>
            <div className="onb-qr">
              <button>🛍️ Lihat Produk</button>
              <button>🏷️ Cek Promo</button>
              <button>📦 Status Pesanan</button>
            </div>
          </div>
          <div className="onb-can">
            <h4>YANG BISA AGENT KAMU LAKUKAN</h4>
            <div className="onb-can-grid">
              {canDo.map((c) => (
                <span key={c.label} className="onb-can-chip">{c.ic} {c.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="onb-nav">
        <button className="onb-btn onb-btn-ghost" onClick={onBack}>{I.arrowL} Kembali</button>
        <div className="onb-nav-right">
          <button className="onb-btn-link" onClick={onNext}>Lewati dulu</button>
          <button className="onb-btn onb-btn-primary" onClick={onNext}>Lanjut: Ready to Go! {I.arrowR}</button>
        </div>
      </div>
    </>
  );
}

/* ===== Step 4 — Ready to Go! ================================================*/
function StepReady({
  data,
  onBack,
  onLaunch,
  onDashboard,
  onEdit,
}: {
  data: OnboardingData;
  onBack: () => void;
  onLaunch: () => void;
  onDashboard: () => void;
  onEdit: () => void;
}) {
  const rows = [
    { ic: I.store, k: "Bisnis", v: data.businessName.trim() || "Bisnis kamu", ok: true },
    { ic: I.wa, k: "WhatsApp Business", v: data.waConnected ? "+" + (data.waNumber || "62•••") : "Belum tersambung", ok: data.waConnected },
    { ic: I.bot, k: "Nama Agent", v: data.agentName.trim() || "Sosi AI" },
    { ic: I.tone, k: "Gaya Bahasa", v: data.tone },
    { ic: I.globe, k: "Bahasa", v: data.language },
    { ic: I.goal, k: "Tujuan Utama", v: data.goals.length ? data.goals.join(", ") : "—" },
  ];
  const next = [
    { ic: I.chat, b: "Test agent kamu", s: "Kirim pesan test di WhatsApp." },
    { ic: I.chart, b: "Lihat analitik", s: "Pantau percakapan, leads, dan performa." },
    { ic: I.book, b: "Pusat Bantuan", s: "Pelajari fitur & best practice." },
  ];
  return (
    <>
      <h1 className="onb-h1">AI Agent kamu Siap! 🎉</h1>
      <p className="onb-lead">Tinjau pengaturan di bawah, lalu luncurkan WhatsApp AI agent kamu.</p>

      <div className="onb-grid">
        <div className="onb-card">
          <div className="onb-section-title" style={{ marginBottom: 8 }}>Ringkasan</div>
          {rows.map((r) => (
            <div className="onb-summary-row" key={r.k}>
              <span className="onb-summary-ic">{r.ic}</span>
              <div className="onb-summary-mid">
                <div className="onb-summary-k">{r.k}</div>
                <div className="onb-summary-v">{r.v}</div>
              </div>
              {r.ok ? (
                <span className="onb-badge-ok">Connected</span>
              ) : (
                <button className="onb-btn onb-btn-ghost" style={{ padding: "6px 12px", fontSize: 12.5 }} onClick={onEdit}>
                  {I.edit} Edit
                </button>
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: 9, alignItems: "center", marginTop: 14, padding: 12, background: "#F1FBF5", border: "1px solid #DCF3E4", borderRadius: 12, fontSize: 12.5, color: "#15803D" }}>
            <span style={{ color: "#16A34A" }}>{I.shield}</span> Datamu aman & terenkripsi. Kami tidak menyimpan isi pesan.
          </div>
        </div>

        <div>
          <div className="onb-success-hero">
            <div className="onb-success-ic">{I.check}</div>
            <h3>Semua siap! Kamu sudah bisa jalan.</h3>
            <p>AI agent kamu kini aktif dan siap membantu pelanggan di WhatsApp.</p>
          </div>
          <div className="onb-card" style={{ marginTop: 16 }}>
            <div className="onb-section-title" style={{ marginBottom: 6 }}>Selanjutnya?</div>
            <div className="onb-next">
              {next.map((n) => (
                <div className="onb-next-row" key={n.b}>
                  <span className="onb-next-ic">{n.ic}</span>
                  <div className="onb-next-mid"><b>{n.b}</b><span>{n.s}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="onb-nav">
        <button className="onb-btn onb-btn-ghost" onClick={onBack}>{I.arrowL} Kembali</button>
        <div className="onb-nav-right">
          <button className="onb-btn onb-btn-ghost" onClick={onDashboard}>Ke Dashboard</button>
          <button className="onb-btn onb-btn-launch" onClick={onLaunch}>{I.rocket} Luncurkan AI Agent</button>
        </div>
      </div>
    </>
  );
}
