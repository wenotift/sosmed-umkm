import type { Metadata } from "next";
import ForgotContent from "./ForgotContent";

export const metadata: Metadata = {
  title: "Reset your password — Sosmed AI",
  description: "Request a password reset link for your Sosmed AI account.",
};

export default function Page() {
  return <ForgotContent />;
}
