"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MAIN = [
  { label: "Produk", href: "/produk" },
  { label: "Solusi", href: "/solusi" },
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

  const isResourceActive = RESOURCES.some((r) => r.href === pathname);

  // lock body scroll while the drawer is open
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

  // Escape closes the mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeDrawer = () => {
    setMobileOpen(false);
    setMobileResourcesOpen(false);
  };

  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="wrap nav-inner">
          <Link href="/" className="logo" aria-label="SOSMED AI — Beranda">
            <img
              src="/logo/sosmed-ai-logo-black-version.png"
              alt="SOSMED AI"
              width={130}
              height={30}
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
            <div className="nav-dropdown" ref={ddRef}>
              <button
                type="button"
                className={`nav-dd-btn${isResourceActive ? " active" : ""}`}
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                onClick={() => setResourcesOpen((v) => !v)}
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
            <button
              type="button"
              className={`burger${mobileOpen ? " open" : ""}`}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <div className="scrim" onClick={closeDrawer}></div>
        <div className="drawer">
          <div className="drawer-top">
            <Link
              href="/"
              className="logo"
              onClick={closeDrawer}
              aria-label="SOSMED AI — Beranda"
            >
              <img
                src="/logo/sosmed-ai-logo-black-version.png"
                alt="SOSMED AI"
                width={130}
                height={30}
              />
            </Link>
            <button
              type="button"
              className="drawer-close"
              onClick={closeDrawer}
              aria-label="Tutup menu"
            >
              ×
            </button>
          </div>
          <nav className="drawer-links">
            {MAIN.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                onClick={closeDrawer}
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
                    className={`drawer-sub${
                      pathname === r.href ? " active" : ""
                    }`}
                    onClick={closeDrawer}
                    aria-current={pathname === r.href ? "page" : undefined}
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="drawer-cta">
            <button
              className="btn btn-soon"
              disabled
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span className="dot"></span> Segera Hadir
            </button>
            <a
              className="btn btn-ghost"
              href="https://www.instagram.com/sosmed.io"
              target="_blank"
              rel="noopener"
            >
              Ikuti di Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
