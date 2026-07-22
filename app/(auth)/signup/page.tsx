import type { Metadata } from "next";
import SignupContent from "./SignupContent";

export const metadata: Metadata = {
  title: "Create your account — Sosmed AI",
  description: "Sign up and build your AI WhatsApp agent in minutes.",
};

export default function Page() {
  return <SignupContent />;
}
