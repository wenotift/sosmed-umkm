import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Forum",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Forum" />;
}
