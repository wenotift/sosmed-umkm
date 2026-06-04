"use client";

import { useMemo, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FAQ_CATEGORIES, toPlainText } from "./faqs";

// TODO: set the business WhatsApp number — replace with https://wa.me/<NUMBER>
const WA_HREF = "#";

// Pre-filled email draft for the "Email kami" button.
const MAIL_SUBJECT = "Butuh bantuan Sosmed AI";
const MAIL_BODY = `Halo tim Sosmed AI,

Saya butuh bantuan soal:

Nama bisnis:
Jumlah outlet:
Perkiraan order/hari:`;
const MAIL_HREF = `mailto:halo@sosmed.io?subject=${encodeURIComponent(
  MAIL_SUBJECT,
)}&body=${encodeURIComponent(MAIL_BODY)}`;

const ICONS: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  price: (
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  bag: (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  wa: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </>
  ),
};

// Blueprint card art per category: a dashed "construction" shape + a solid line glyph.
const CARD_ART: Record<string, React.ReactNode> = {
  "cat-harga": (
    <>
      <circle cx="32" cy="32" r="20" stroke="#C9C3D6" strokeDasharray="3 3" />
      <path d="M32 20v24M38 26h-9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8h-9" />
    </>
  ),
  "cat-order": (
    <>
      <circle cx="32" cy="32" r="20" stroke="#C9C3D6" strokeDasharray="3 3" />
      <path d="M24 22 21 27v16a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V27l-3-5Z" />
      <path d="M21 27h22M37 32a5 5 0 0 1-10 0" />
    </>
  ),
  "cat-fitur": (
    <>
      <rect x="14" y="14" width="36" height="36" transform="rotate(15 32 32)" stroke="#C9C3D6" strokeDasharray="3 3" />
      <path d="M32 18 20 24l12 6 12-6-12-6Z" />
      <path d="m20 38 12 6 12-6M20 31l12 6 12-6" />
    </>
  ),
  "cat-akun": (
    <>
      <rect x="16" y="16" width="32" height="32" stroke="#C9C3D6" strokeDasharray="3 3" />
      <circle cx="32" cy="28" r="7" />
      <path d="M20 46a12 12 0 0 1 24 0" />
    </>
  ),
};

function Ic({ n, className }: { n: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[n]}
    </svg>
  );
}

// Precompute lowercased search text (question + plain answer) per item.
const SEARCHABLE = FAQ_CATEGORIES.map((c) =>
  c.items.map((it) => (it.q + " " + toPlainText(it.a)).toLowerCase()),
);

export default function BantuanContent() {
  const [query, setQuery] = useState("");
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Which items match the query (per category).
  const matches = useMemo(
    () =>
      FAQ_CATEGORIES.map((c, ci) =>
        c.items.map((_, ii) => !q || SEARCHABLE[ci][ii].includes(q)),
      ),
    [q],
  );
  const anyVisible = matches.some((cat) => cat.some(Boolean));

  const keyOf = (ci: number, ii: number) => `${ci}-${ii}`;
  const isOpen = (ci: number, ii: number) =>
    searching ? matches[ci][ii] : openKeys.has(keyOf(ci, ii));

  const toggle = (ci: number, ii: number) => {
    const k = keyOf(ci, ii);
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  };

  const quickSearch = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <>
      <Nav />
      <main className="bantuan-page">
        {/* HERO + search */}
        <section className="bn-hero">
          <div className="wrap">
            <h1>Ada yang bisa kami bantu?</h1>
            <p>Cari jawaban cepat soal Sosmed AI — harga, order, fitur, dan akun.</p>
            <div className="bn-search glass">
              <Ic n="search" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari bantuan… (mis. harga, order, broadcast)"
                aria-label="Cari bantuan"
              />
            </div>
            <p className="bn-popular">
              Populer:{" "}
              {["harga", "order", "broadcast"].map((t, i) => (
                <span key={t}>
                  {i > 0 && " · "}
                  <button type="button" onClick={() => quickSearch(t)}>
                    {t}
                  </button>
                </span>
              ))}
            </p>
          </div>
        </section>

        <div className="wrap">
          {/* CATEGORY CARDS (hidden while searching) */}
          {!searching && (
            <div className="bn-cats">
              {FAQ_CATEGORIES.map((c) => (
                <a className="bn-cat" href={`#${c.id}`} key={c.id}>
                  <div className="bn-cat-art">
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.3}
                      aria-hidden="true"
                    >
                      {CARD_ART[c.id]}
                    </svg>
                    <span className="bn-plus">+</span>
                  </div>
                  <h3>{c.label}</h3>
                  <p>{c.blurb}</p>
                </a>
              ))}
            </div>
          )}

          {/* FAQ SECTIONS */}
          <div className="bn-faqs">
            {FAQ_CATEGORIES.map((c, ci) => {
              const secVisible = matches[ci].some(Boolean);
              if (!secVisible) return null;
              return (
                <section className="bn-section" id={c.id} key={c.id}>
                  <div className="bn-head">
                    <Ic n={c.icon} />
                    <h2>{c.label}</h2>
                    <span className="bn-count">{c.items.length} artikel</span>
                  </div>
                  {c.items.map((it, ii) => {
                    if (!matches[ci][ii]) return null;
                    const open = isOpen(ci, ii);
                    return (
                      <div className={`bn-qa${open ? " open" : ""}`} key={it.q}>
                        <button
                          type="button"
                          className="bn-q"
                          aria-expanded={open}
                          onClick={() => toggle(ci, ii)}
                        >
                          <span>{it.q}</span>
                          <Ic n="chevron" className="bn-chev" />
                        </button>
                        {open && (
                          <div
                            className="bn-ans"
                            dangerouslySetInnerHTML={{ __html: it.a }}
                          />
                        )}
                      </div>
                    );
                  })}
                </section>
              );
            })}
          </div>

          {/* empty state */}
          {searching && !anyVisible && (
            <div className="bn-noresults">
              Gak nemu jawaban untuk &quot;{query}&quot;. Coba kata lain, atau hubungi
              kami di bawah.
            </div>
          )}

          {/* CONTACT */}
          <section className="bn-contact">
            <h2>Masih butuh bantuan?</h2>
            <p>
              Tim kami siap bantu lewat WhatsApp. Konsultasi gratis 15 menit untuk
              hitung tier yang pas.
            </p>
            <div className="bn-contact-btns">
              <a
                className="bn-btn bn-btn-wa"
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Ic n="wa" /> Chat WhatsApp
              </a>
              <a className="bn-btn bn-btn-mail" href={MAIL_HREF}>
                <Ic n="mail" /> Email kami
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
