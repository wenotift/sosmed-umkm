import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SoonPage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <Nav />
      <main className="soon-page">
        <div className="soon-inner">
          <div className="badge">
            <span className="dot"></span> Segera Hadir
          </div>
          <h1>{title}</h1>
          <p>{subtitle ?? `Halaman ${title} segera hadir.`}</p>
          <Link className="btn btn-primary" href="/">
            ← Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
