import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="logo" aria-label="SOSMED AI — Beranda">
              <img
                src="/logo/sosmed-ai-logo-black-version.png"
                alt="SOSMED AI"
                width={130}
                height={30}
              />
            </Link>
            <p>
              WhatsApp Anda, AI assistant bisnis Anda. Asisten WhatsApp AI untuk
              coffee shop dan restoran kecil Indonesia.
            </p>
          </div>
          <div className="foot-col">
            <h4>Produk</h4>
            <Link href="/produk">Produk</Link>
            <Link href="/solusi">Solusi</Link>
            <Link href="/harga">Harga</Link>
            <Link href="/partner">Partner</Link>
          </div>
          <div className="foot-col">
            <h4>Resources</h4>
            <Link href="/blog">Blog</Link>
            <Link href="/bantuan">Bantuan</Link>
            <Link href="/forum">Forum</Link>
            <Link href="/komunitas">Komunitas</Link>
            <Link href="/karir">Karir</Link>
          </div>
          <div className="foot-col">
            <h4>Perusahaan</h4>
            <a href="#">Tentang Kami</a>
            <a href="mailto:hello@sosmed.io">Kontak</a>
            <a href="#">Privasi</a>
            <a href="#">Syarat &amp; Ketentuan</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 SOSMED AI. All rights reserved.</span>
          <div className="foot-social">
            <a
              href="https://www.instagram.com/sosmed.io"
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@sosmed.io"
              target="_blank"
              rel="noopener"
            >
              TikTok
            </a>
            <a
              href="https://www.linkedin.com/company/sosmed-ai"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
