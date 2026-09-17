"use client";
import { create } from "zustand";

export type Screen =
  | "vats"
  | "landing"
  | "landing-connected"
  | "kits"
  | "constructor"
  | "confirm"
  | "manage"
  | "cabinet"
  | "transition";

export interface TariffPlan {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  note?: string;
  features: string[];
  cons?: string;
  footnote?: string;
  minutes?: number;
  requests?: number;
  overMinute?: number;
  overRequest?: number;
}

export interface Kit {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  operatorCount: number;
  operatorLabel: string;
  minutes: number;
  requests: number;
  operators: string;
  agents: string;
  pkg: string;
  overage: string;
  recommended: boolean;
  omnirmPlan: string;
  agentsPlan: string;
}

export const OMNIRM_PLANS: TariffPlan[] = [
  {
    id: "solo",
    name: "Соло",
    price: 0,
    priceLabel: "0 ₽",
    note: "в тарифе ОАТС",
    features: ["1 оператор", "1 канал (виджет или MAX)", "100 диалогов/мес", "история 30 дней"],
    cons: "без очередей, супервизора, аналитики и рассылок",
  },
  {
    id: "team5",
    name: "Команда 5",
    price: 3990,
    priceLabel: "3 990 ₽/мес",
    features: ["до 5 операторов", "полный функционал"],
    footnote: "+990 ₽ за оператора с 6-го",
  },
];

export const AGENTS_PLANS: TariffPlan[] = [
  {
    id: "start",
    name: "Старт",
    price: 2700,
    priceLabel: "2 700 ₽/мес",
    features: ["300 мин голоса", "300 обращений", "все каналы"],
    minutes: 300,
    requests: 300,
    overMinute: 10,
    overRequest: 5,
  },
  {
    id: "pro",
    name: "Про",
    price: 18700,
    priceLabel: "18 700 ₽/мес",
    features: ["2 000 мин голоса", "3 000 обращений", "все каналы", "персональный менеджер"],
    minutes: 2000,
    requests: 3000,
    overMinute: 8,
    overRequest: 3,
  },
];

export const KITS: Kit[] = [
  {
    id: "start-plus",
    name: "Старт+",
    price: 2490,
    priceLabel: "2 490 ₽/мес",
    operatorCount: 1,
    operatorLabel: "1 оператор",
    minutes: 300,
    requests: 300,
    operators: "ОмниРМ: 1 оператор (Соло)",
    agents: "ИИ-агенты, тариф Старт",
    pkg: "300 мин голоса · 300 обращений",
    overage: "Сверх: 10 ₽/мин · 5 ₽/обр",
    recommended: true,
    omnirmPlan: "solo",
    agentsPlan: "start",
  },
  {
    id: "business-plus",
    name: "Бизнес+",
    price: 7990,
    priceLabel: "7 990 ₽/мес",
    operatorCount: 5,
    operatorLabel: "до 5 операторов",
    minutes: 300,
    requests: 300,
    operators: "ОмниРМ: до 5 операторов (Команда 5)",
    agents: "ИИ-агенты, тариф Старт",
    pkg: "300 мин голоса · 300 обращений",
    overage: "Сверх: 10 ₽/мин · 5 ₽/обр",
    recommended: false,
    omnirmPlan: "team5",
    agentsPlan: "start",
  },
  {
    id: "pro-plus",
    name: "Про+",
    price: 21900,
    priceLabel: "21 900 ₽/мес",
    operatorCount: 5,
    operatorLabel: "до 5 операторов",
    minutes: 2000,
    requests: 3000,
    operators: "ОмниРМ: до 5 операторов (Команда 5)",
    agents: "ИИ-агенты, тариф Про",
    pkg: "2 000 мин голоса · 3 000 обращений",
    overage: "Сверх: 8 ₽/мин · 3 ₽/обр",
    recommended: false,
    omnirmPlan: "team5",
    agentsPlan: "pro",
  },
];

export const SEPARATE_PRICES: Record<string, { omnirm: number; agents: number }> = {
  "start-plus": { omnirm: 0, agents: 2700 },
  "business-plus": { omnirm: 3990, agents: 6500 },
  "pro-plus": { omnirm: 3990, agents: 18700 },
};

export function fmtPrice(n: number): string {
  return n.toLocaleString("ru-RU") + " ₽";
}

export function getOperatorCount(planId: string | null): number {
  if (planId === "solo") return 1;
  if (planId === "team5") return 5;
  return 0;
}

export function findPlan(plans: TariffPlan[], id: string | null): TariffPlan | null {
  if (!id) return null;
  return plans.find((p) => p.id === id) ?? null;
}

interface AppState {
  screen: Screen;
  selectedKitId: string | null;
  selectedOmniPlanId: string | null;
  selectedAgentsPlanId: string | null;
  connectedOmniPlan: string | null;
  connectedAgentsPlan: string | null;
  agree1: boolean;
  agree2: boolean;
  agree3: boolean;
  agree4: boolean;

  navigate: (s: Screen) => void;
  selectKit: (id: string | null) => void;
  selectOmniPlan: (id: string | null) => void;
  selectAgentsPlan: (id: string | null) => void;
  connect: (omniPlan: string, agentsPlan: string) => void;
  setAgree: (n: 1 | 2 | 3 | 4, v: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  screen: "vats",
  selectedKitId: null,
  selectedOmniPlanId: null,
  selectedAgentsPlanId: null,
  connectedOmniPlan: null,
  connectedAgentsPlan: null,
  agree1: false,
  agree2: false,
  agree3: false,
  agree4: false,

  navigate: (s) => set({ screen: s }),
  selectKit: (id) => set({ selectedKitId: id }),
  selectOmniPlan: (id) => set({ selectedOmniPlanId: id }),
  selectAgentsPlan: (id) => set({ selectedAgentsPlanId: id }),
  connect: (omniPlan, agentsPlan) =>
    set({
      connectedOmniPlan: omniPlan,
      connectedAgentsPlan: agentsPlan,
    }),
  setAgree: (n, v) => set({ [`agree${n}`]: v }),
  reset: () =>
    set({
      screen: "vats",
      selectedKitId: null,
      selectedOmniPlanId: null,
      selectedAgentsPlanId: null,
      connectedOmniPlan: null,
      connectedAgentsPlan: null,
      agree1: false,
      agree2: false,
      agree3: false,
      agree4: false,
    }),
}));
