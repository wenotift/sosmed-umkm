import type { Metadata } from "next";
import LoginContent from "./LoginContent";

export const metadata: Metadata = {
  title: "Log in — Sosmed AI",
  description: "Log in to your Sosmed AI account.",
};

export default function Page() {
  return <LoginContent />;
}
