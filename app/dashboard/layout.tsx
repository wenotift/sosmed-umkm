import type { Metadata } from "next";
import "./dashboard.css";
import { StoreProvider } from "./lib/store";
import { ToastProvider } from "./components/ui";
import DashboardShell from "./DashboardShell";

// The dashboard is a private, app-like surface — keep it out of search results.
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ToastProvider>
        <DashboardShell>{children}</DashboardShell>
      </ToastProvider>
    </StoreProvider>
  );
}
