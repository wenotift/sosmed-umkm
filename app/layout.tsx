import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOSMED AI — Asisten WhatsApp AI untuk Coffee Shop & Restoran",
  description:
    "Jadikan WhatsApp coffee shop Anda asisten otomatis. Terima order 24 jam, balas pelanggan, dan bikin mereka balik lagi dengan sistem poin — semua otomatis lewat WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
