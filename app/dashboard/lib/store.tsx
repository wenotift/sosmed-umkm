"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { buildSeed, STORAGE_KEY, STATE_VERSION } from "./seed";
import { allMemberStats } from "./derive";
import type {
  Broadcast,
  Business,
  DashboardState,
  Member,
  MemberTier,
  MenuItem,
  Order,
  OrderStatus,
  StaffMember,
} from "./types";

// ---- actions ---------------------------------------------------------------
type Action =
  | { type: "REPLACE"; state: DashboardState }
  | { type: "RESET" }
  | { type: "ORDER_STATUS"; id: string; status: OrderStatus }
  | { type: "ORDER_PAID"; id: string; paid: boolean }
  | { type: "ORDER_ADD"; order: Order }
  | { type: "MENU_ADD"; item: MenuItem }
  | { type: "MENU_UPDATE"; item: MenuItem }
  | { type: "MENU_TOGGLE"; id: string }
  | { type: "MENU_DELETE"; id: string }
  | { type: "MEMBER_ADD"; member: Member }
  | { type: "MEMBER_UPDATE"; id: string; patch: Partial<Member> }
  | { type: "MEMBER_REDEEM"; id: string; points: number }
  | { type: "BROADCAST_SEND"; broadcast: Broadcast }
  | { type: "BUSINESS_UPDATE"; patch: Partial<Business> }
  | { type: "STAFF_ADD"; staff: StaffMember }
  | { type: "STAFF_REMOVE"; id: string };

function reducer(state: DashboardState, action: Action): DashboardState {
  switch (action.type) {
    case "REPLACE":
      return action.state;
    case "RESET":
      return buildSeed();

    case "ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.id
            ? {
                ...o,
                status: action.status,
                // completing/serving implies payment settled
                paid:
                  action.status === "selesai" || action.status === "siap"
                    ? true
                    : action.status === "batal"
                      ? o.paid
                      : o.paid,
              }
            : o,
        ),
      };
    case "ORDER_PAID":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.id ? { ...o, paid: action.paid } : o,
        ),
      };
    case "ORDER_ADD":
      return { ...state, orders: [action.order, ...state.orders] };

    case "MENU_ADD":
      return { ...state, menu: [...state.menu, action.item] };
    case "MENU_UPDATE":
      return {
        ...state,
        menu: state.menu.map((m) => (m.id === action.item.id ? action.item : m)),
      };
    case "MENU_TOGGLE":
      return {
        ...state,
        menu: state.menu.map((m) =>
          m.id === action.id ? { ...m, available: !m.available } : m,
        ),
      };
    case "MENU_DELETE":
      return { ...state, menu: state.menu.filter((m) => m.id !== action.id) };

    case "MEMBER_ADD":
      return { ...state, members: [action.member, ...state.members] };
    case "MEMBER_UPDATE":
      return {
        ...state,
        members: state.members.map((m) =>
          m.id === action.id ? { ...m, ...action.patch } : m,
        ),
      };
    case "MEMBER_REDEEM":
      return {
        ...state,
        members: state.members.map((m) =>
          m.id === action.id
            ? { ...m, redeemedPoints: m.redeemedPoints + action.points }
            : m,
        ),
      };

    case "BROADCAST_SEND":
      return { ...state, broadcasts: [action.broadcast, ...state.broadcasts] };

    case "BUSINESS_UPDATE":
      return { ...state, business: { ...state.business, ...action.patch } };
    case "STAFF_ADD":
      return {
        ...state,
        business: { ...state.business, staff: [...state.business.staff, action.staff] },
      };
    case "STAFF_REMOVE":
      return {
        ...state,
        business: {
          ...state.business,
          staff: state.business.staff.filter((s) => s.id !== action.id),
        },
      };
    default:
      return state;
  }
}

// ---- context ---------------------------------------------------------------
interface StoreCtx {
  state: DashboardState;
  dispatch: React.Dispatch<Action>;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  // Deterministic seed guarantees identical SSR + first client render, so no
  // hydration gate is needed. localStorage edits (if any) load right after
  // mount and re-render with saved data.
  const [state, dispatch] = useReducer(reducer, undefined, buildSeed);
  const hydrated = useRef(false);

  // Hydrate from localStorage once, after mount (browser only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DashboardState;
        if (parsed && parsed.version === STATE_VERSION) {
          dispatch({ type: "REPLACE", state: parsed });
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist on every change, but skip the first pass so the seed never clobbers
  // saved data before the hydration dispatch above has re-rendered.
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be full/blocked — non-fatal */
    }
  }, [state]);

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}

// Convenience selectors ------------------------------------------------------
export function useMemberStats() {
  const { state } = useStore();
  return allMemberStats(state);
}

export function tierColor(tier: MemberTier): string {
  switch (tier) {
    case "VIP":
      return "tier-vip";
    case "Reguler":
      return "tier-reg";
    case "Baru":
      return "tier-new";
    case "Pasif":
      return "tier-off";
  }
}

// Next free numeric order id as a string (e.g. "1287").
export function nextOrderId(orders: Order[]): string {
  let max = 1000;
  for (const o of orders) {
    const n = parseInt(o.id, 10);
    if (!Number.isNaN(n) && n > max) max = n;
  }
  return String(max + 1);
}

// Client-only id generator for new menu items / members / broadcasts.
export function uid(prefix: string): string {
  return prefix + "_" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}
