import type { Metadata } from "next";
import SoonPage from "@/components/SoonPage";

export const metadata: Metadata = {
  title: "Harga",
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title="Harga" />;
}
