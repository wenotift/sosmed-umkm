import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { AuthFooter } from "./i18n";
import "./auth.css";

// Auth screens are app entry points, not indexable marketing pages.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <Nav />
      <div className="auth">{children}</div>
      <AuthFooter />
    </div>
  );
}
