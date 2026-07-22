// Onboarding wizard state — persisted to localStorage so progress survives
// reloads and the final config carries into the dashboard.

export type AgentTone = "Professional" | "Friendly" | "Casual" | "Formal";

export interface OnboardingData {
  step: number; // furthest step reached (2..4)
  waNumber: string;
  waConnected: boolean;
  businessName: string;
  businessDesc: string;
  industry: string;
  agentName: string;
  tone: AgentTone;
  language: string;
  goals: string[];
  complete: boolean;
}

const KEY = "sosmed-onboarding-v1";

// Progress is stored PER ACCOUNT (key suffixed with the login email). A global
// key would leak one user's "complete" flag to every account tested in the
// same browser — new registrants would silently skip the wizard.
function keyFor(owner?: string): string {
  return owner ? `${KEY}:${owner.trim().toLowerCase()}` : KEY;
}

export const INDUSTRIES = [
  "Food & Beverage",
  "Health & Beauty",
  "Fashion & Apparel",
  "Retail & E-commerce",
  "Jasa & Layanan",
  "Pendidikan",
  "Properti",
  "Lainnya",
];

export const GOAL_OPTIONS = [
  "Answer FAQs",
  "Qualify Leads",
  "Recommend Products",
  "Book Appointments",
  "Handle Orders",
  "Send Promos",
];

export function defaultOnboarding(): OnboardingData {
  return {
    step: 2,
    waNumber: "",
    waConnected: false,
    businessName: "",
    businessDesc: "",
    industry: INDUSTRIES[0],
    agentName: "Sosi AI",
    tone: "Friendly",
    language: "Bahasa Indonesia",
    goals: ["Answer FAQs", "Qualify Leads"],
    complete: false,
  };
}

export function loadOnboarding(owner?: string): OnboardingData {
  if (typeof window === "undefined") return defaultOnboarding();
  try {
    const raw = window.localStorage.getItem(keyFor(owner));
    if (raw) return { ...defaultOnboarding(), ...(JSON.parse(raw) as Partial<OnboardingData>) };
  } catch {
    /* ignore */
  }
  return defaultOnboarding();
}

export function saveOnboarding(data: OnboardingData, owner?: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(keyFor(owner), JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function isOnboardingComplete(owner?: string): boolean {
  return loadOnboarding(owner).complete;
}
