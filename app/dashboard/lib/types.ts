// Domain model for the Sosmed AI customer dashboard.
// This dashboard belongs to a subscribing UMKM F&B owner (e.g. "Kopi Senja"),
// not to Sosmed AI itself. Every figure the UI shows is derived from these
// records so all logic, calculations and mutations are real.

export type OrderStatus = "baru" | "diproses" | "siap" | "selesai" | "batal";

// How the order reached the business.
//  - bot    : customer chatted the WhatsApp AI directly
//  - qr     : customer scanned a table QR then ordered via WhatsApp
//  - walkin : owner/staff logged a counter order manually
export type OrderChannel = "bot" | "qr" | "walkin";

export type MenuCategory = "Kopi" | "Non-Kopi" | "Makanan" | "Snack";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // sell price, IDR
  cost: number; // COGS, IDR — used for margin analytics
  emoji: string;
  available: boolean;
}

export interface OrderItem {
  menuId: string;
  name: string; // snapshot of the menu name at order time
  qty: number;
  price: number; // unit price snapshot
}

export interface Order {
  id: string; // e.g. "1042" (rendered as #1042)
  memberId: string | null;
  customerName: string;
  customerWa: string; // 628xxxxxxxx
  items: OrderItem[];
  note: string; // e.g. "less sugar · meja 4"
  table: number | null;
  channel: OrderChannel;
  status: OrderStatus;
  paid: boolean;
  createdAt: number; // epoch ms
}

// Member tiers are DERIVED from spend/recency (see derive.ts), not stored.
export type MemberTier = "VIP" | "Reguler" | "Baru" | "Pasif";

export interface Member {
  id: string;
  name: string;
  wa: string;
  joinedAt: number;
  redeemedPoints: number; // points already spent on vouchers
}

export interface Broadcast {
  id: string;
  segment: MemberTier | "Semua";
  message: string;
  recipients: number;
  sentAt: number;
}

export type PlanName = "Lite" | "Pro" | "Max" | "Ultra";

export interface StaffMember {
  id: string;
  name: string;
  role: "Owner" | "Kasir" | "Dapur";
  wa: string;
}

export interface Business {
  name: string;
  outlet: string;
  wa: string; // the business WhatsApp number
  plan: PlanName;
  pointRate: number; // rupiah per 1 point (default 1000)
  voucherThreshold: number; // points needed for a voucher (default 100)
  voucherValue: number; // rupiah value of that voucher (default 5000)
  staff: StaffMember[];
}

export interface DashboardState {
  version: number;
  business: Business;
  menu: MenuItem[];
  members: Member[];
  orders: Order[];
  broadcasts: Broadcast[];
}

// Per-plan monthly order capacity, matching app/harga/PricingContent.tsx.
export const PLAN_CAPACITY: Record<PlanName, number> = {
  Lite: 150,
  Pro: 250,
  Max: 500,
  Ultra: 1000,
};

export const PLAN_PRICE: Record<PlanName, number> = {
  Lite: 249000,
  Pro: 399000,
  Max: 799000,
  Ultra: 1399000,
};

export const PLAN_OUTLETS: Record<PlanName, number> = {
  Lite: 1,
  Pro: 1,
  Max: 2,
  Ultra: 3,
};
