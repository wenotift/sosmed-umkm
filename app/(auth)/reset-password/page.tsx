import type { Metadata } from "next";
import { Suspense } from "react";
import ResetContent from "./ResetContent";

export const metadata: Metadata = {
  title: "Set a new password — Sosmed AI",
  description: "Choose a new password for your Sosmed AI account.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetContent />
    </Suspense>
  );
}
