"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MAIN = [
  { label: "Produk", href: "/produk" },
  { label: "Harga", href: "/harga" },
  { label: "Partner", href: "/partner" },
];

type ResourceItem = { label: string; href: string; desc: string; icon: React.ReactNode };

const RESOURCES: ResourceItem[] = [
  {
    label: "Blog",
    href: "/blog",
    desc: "Tips & cerita untuk usaha F&B",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    label: "Bantuan",
    href: "/bantuan",
    desc: "Panduan & jawaban cepat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    label: "Komunitas",
    href: "/komunitas",
    desc: "Gabung sesama pemilik UMKM",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
      </svg>
    ),
  },
  {
    label: "Karir",
    href: "https://www.sosmed.io/careers",
    desc: "Bantu kami bangun Sosmed AI",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    label: "Afiliasi",
    href: "/afiliasi",
    desc: "Promosiin, dapat komisi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12v10H4V12" />
        <rect x="2" y="7" width="20" height="5" />
        <path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7" />
      </svg>
    ),
  },
];

function NavArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const isResourceActive = RESOURCES.some((r) => r.href === pathname);

  // ----- desktop dropdown: hover-intent open/close -----
  const openResources = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setResourcesOpen(true);
  };
  // short delay so moving the cursor across the gap to the panel doesn't flicker
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setResourcesOpen(false), 150);
  };
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("menu-lock", mobileOpen);
    return () => document.body.classList.remove("menu-lock");
  }, [mobileOpen]);

  // close desktop dropdown on outside click + Escape
  useEffect(() => {
    if (!resourcesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResourcesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [resourcesOpen]);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMenu = () => {
    setMobileOpen(false);
    setMobileResourcesOpen(false);
  };

  return (
    <>
      {/* NAV — fixed/sticky on top; logo + burger always visible */}
      <header className="nav">
        <div className="wrap nav-inner">
          <Link href="/" className="logo" aria-label="Sosmed AI - Beranda">
            <img
              src="/logo/sosmed-ai-logo-black-version.png"
              alt="Sosmed AI"
              width={1167}
              height={379}
            />
          </Link>
          <nav className="nav-links">
            {MAIN.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={pathname === m.href ? "active" : undefined}
                aria-current={pathname === m.href ? "page" : undefined}
              >
                {m.label}
              </Link>
            ))}
            <div
              className="nav-dropdown"
              ref={ddRef}
              onMouseEnter={openResources}
              onMouseLeave={scheduleClose}
              onFocus={openResources}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setResourcesOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={`nav-dd-btn${isResourceActive ? " active" : ""}`}
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                onClick={openResources}
              >
                Resources <Chevron className="chev" />
              </button>
              <div
                className={`nav-dd-panel${resourcesOpen ? " open" : ""}`}
                role="menu"
              >
                {RESOURCES.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    role="menuitem"
                    className={`nav-dd-item${pathname === r.href ? " active" : ""}`}
                    aria-current={pathname === r.href ? "page" : undefined}
                    onClick={() => setResourcesOpen(false)}
                  >
                    <span className="nav-dd-ic" aria-hidden="true">{r.icon}</span>
                    <span className="nav-dd-text">
                      <h4>{r.label}</h4>
                      <p>{r.desc}</p>
                    </span>
                    <NavArrow className="nav-dd-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="nav-cta">
            {/* desktop auth buttons (hidden on mobile — also in the mobile menu) */}
            <div className="nav-auth">
              {/* TODO: set business WhatsApp — replace href with
                  https://wa.me/<NUMBER>?text=Halo%20Sosmed%20AI%2C%20saya%20mau%20tanya%20soal%20produk.
                  and add target="_blank" rel="noopener" */}
              <a href="#" className="btn btn-ghost btn-sm">
                Chat Kami
              </a>
              <Link href="/daftar" className="btn btn-primary btn-sm">
                Daftar
              </Link>
            </div>
            <button
              type="button"
              className={`burger${mobileOpen ? " open" : ""}`}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU — full-screen panel that drops BELOW the navbar */}
      <div id="mobileMenu" className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <nav className="drawer-links">
          {MAIN.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={closeMenu}
              className={pathname === m.href ? "active" : undefined}
              aria-current={pathname === m.href ? "page" : undefined}
            >
              {m.label}
            </Link>
          ))}
          <button
            type="button"
            className="drawer-acc-btn"
            aria-expanded={mobileResourcesOpen}
            onClick={() => setMobileResourcesOpen((v) => !v)}
          >
            Resources <Chevron className="chev" />
          </button>
          <div className={`drawer-acc${mobileResourcesOpen ? " open" : ""}`}>
            <div className="drawer-acc-inner">
              {RESOURCES.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className={`drawer-sub${pathname === r.href ? " active" : ""}`}
                  onClick={closeMenu}
                  aria-current={pathname === r.href ? "page" : undefined}
                >
                  <span className="drawer-sub-ic" aria-hidden="true">{r.icon}</span>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="drawer-cta">
          {/* TODO: set business WhatsApp — replace href with
              https://wa.me/<NUMBER>?text=Halo%20Sosmed%20AI%2C%20saya%20mau%20tanya%20soal%20produk.
              and add target="_blank" rel="noopener" */}
          <a href="#" className="btn btn-ghost" onClick={closeMenu}>
            Chat Kami
          </a>
          <Link href="/daftar" className="btn btn-primary" onClick={closeMenu}>
            Daftar
          </Link>
        </div>
      </div>
    </>
  );
}
