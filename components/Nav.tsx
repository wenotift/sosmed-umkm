"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MAIN = [
  { label: "Produk", href: "/produk" },
  { label: "Harga", href: "/harga" },
  { label: "Partner", href: "/partner" },
];

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "Bantuan", href: "/bantuan" },
  { label: "Forum", href: "/forum" },
  { label: "Komunitas", href: "/komunitas" },
  { label: "Karir", href: "/karir" },
];

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
                    className={pathname === r.href ? "active" : undefined}
                    aria-current={pathname === r.href ? "page" : undefined}
                    onClick={() => setResourcesOpen(false)}
                  >
                    {r.label}
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
              {/* TODO: /daftar route not built yet — placeholder link */}
              <Link href="#" className="btn btn-primary btn-sm">
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
          {/* TODO: /daftar route not built yet — placeholder link */}
          <Link href="#" className="btn btn-primary" onClick={closeMenu}>
            Daftar
          </Link>
        </div>
      </div>
    </>
  );
}
