"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BELIEFS: { n: string; h: string; p: string }[] = [
  {
    n: "[1]",
    h: "Mulai harus instan.",
    p: "Karena waktumu untuk melayani pelanggan, bukan untuk belajar dashboard. Tanpa instalasi, tanpa training, tanpa pindah aplikasi.",
  },
  {
    n: "[2]",
    h: "Canggih harus terasa mudah.",
    p: 'Karena kamu yang mengendalikan alat, bukan alat yang mengatur kamu. AI yang mengerti "es kopsu 2 less sugar ya kak" — tanpa kamu hafal format apa pun.',
  },
  {
    n: "[3]",
    h: "Temui owner di tempatnya.",
    p: "Karena pemilik warung sudah hidup di WhatsApp. Kami membangun di sana — bukan memaksa pindah ke aplikasi baru yang asing.",
  },
  {
    n: "[4]",
    h: "AI harus jadi fondasi.",
    p: "Karena AI bukan sekadar fitur tambahan — AI yang mengubah segalanya. Dari sekadar mencatat, jadi benar-benar mengerti.",
  },
];

export default function ManifestoContent() {
  const dotsRef = useRef<HTMLDivElement>(null);

  // Fixed left-edge scroll-progress dots: fill round(progress * count).
  useEffect(() => {
    const container = dotsRef.current;
    if (!container) return;
    const dots = Array.from(container.querySelectorAll<HTMLSpanElement>("span"));
    if (!dots.length) return;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      const lit = Math.round(p * dots.length);
      dots.forEach((d, i) => d.classList.toggle("on", i < lit));
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <Nav />
      <main className="manifesto-page">
        {/* HERO */}
        <section className="m-hero">
          <div className="m-eyebrow">
            Sosmed AI<span className="m-abbr">Manifesto</span>
          </div>
          <h1>Bisnis warung lebih canggih dari korporat.</h1>
          <p className="m-lede">
            Sudah saatnya UMKM F&amp;B dapat alat sekelas perusahaan besar.
          </p>
        </section>

        {/* NARRATIVE */}
        <section className="m-prose">
          <div className="wrap">
            <h2>
              Selama ini, teknologi bisnis dibuat untuk perusahaan besar — bukan untuk
              warung dan kafe.
            </h2>
            <p>
              Pemilik UMKM F&amp;B di Indonesia dihadapkan pada pilihan yang tidak adil:
              pakai tools mahal dan rumit yang butuh tim IT, atau jalan seadanya — catat
              order di buku, hitung kasir manual, kelola pelanggan dari ingatan.
            </p>
            <p>
              Software canggih selalu datang dengan dashboard berlapis, biaya langganan
              dolar, dan kurva belajar berhari-hari. Jadi kebanyakan owner memilih bertahan
              dengan cara lama — sampai kewalahan.
            </p>
            <p>
              Kita diberi tahu: <b>begitulah cara teknologi bisnis bekerja.</b> Yang besar
              dapat alat canggih, yang kecil dapat sisanya.
            </p>
            <p className="m-turn">Tapi zaman sudah berubah.</p>
            <p>
              Hari ini, AI sudah cukup pintar untuk mengerti bahasa sehari-hari. WhatsApp
              sudah jadi tempat di mana setiap transaksi terjadi. Dan pemilik warung sudah
              jago memakainya — tiap hari, tanpa diajari.
            </p>
            <p>
              <b>Jadi kenapa alatnya belum menyusul?</b>
            </p>
          </div>
        </section>

        {/* BELIEFS */}
        <section className="m-beliefs">
          <div className="wrap">
            <p className="m-intro">
              Sosmed AI dibangun di atas keyakinan sederhana: teknologi terbaik harusnya
              bekerja untuk kamu, bukan sebaliknya. Artinya —
            </p>
            {BELIEFS.map((b) => (
              <div className="m-belief" key={b.n}>
                <div className="m-bn">{b.n}</div>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="m-close">
          <div className="wrap">
            <h2>Inilah yang kami bangun.</h2>
            <p>
              Operating system bisnis untuk setiap warung, kafe, dan resto kecil di
              Indonesia — langsung di WhatsApp, ditenagai AI.
            </p>
            <p>
              Bukan versi murahan dari alat korporat. Tapi alat yang memang dibuat untuk
              cara UMKM benar-benar bekerja.
            </p>
            <div className="m-cta">
              <Link className="m-cta-primary" href="/daftar">
                Gabung Waitlist
              </Link>
              <Link className="m-cta-ghost" href="/produk">
                Lihat Produk
              </Link>
            </div>
          </div>
        </section>

        <div className="m-dots" ref={dotsRef} aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </main>
      <Footer />
    </>
  );
}
