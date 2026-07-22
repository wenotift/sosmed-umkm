import type { Metadata } from "next";
import "./onboarding.css";

export const metadata: Metadata = {
  title: "Setup — Sosmed AI",
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
