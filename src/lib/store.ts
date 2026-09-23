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
  | "transition"
  | "service-card";

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
  /** How many operators are included in this plan */
  includedOperators?: number;
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

export const ADDITIONAL_OPERATOR_PRICE = 990;

export const OMNIRM_PLANS: TariffPlan[] = [
  {
    id: "solo",
    name: "Соло",
    price: 0,
    priceLabel: "0 ₽",
    note: "в тарифе ОАТС",
    features: ["1 оператор", "все каналы", "100 диалогов/мес", "история 30 дней"],
    cons: "без очередей, супервизора, аналитики и рассылок",
    includedOperators: 1,
  },
  {
    id: "team5",
    name: "Команда 5",
    price: 3990,
    priceLabel: "3 990 ₽/мес",
    features: ["до 5 операторов", "полный функционал"],
    footnote: "+990 ₽ за оператора с 6-го",
    includedOperators: 5,
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
    id: "business",
    name: "Бизнес",
    price: 6500,
    priceLabel: "6 500 ₽/мес",
    features: ["800 мин голоса", "1 000 обращений", "все каналы", "обзвон из пакета"],
    minutes: 800,
    requests: 1000,
    overMinute: 9,
    overRequest: 4,
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
    id: "solo",
    name: "Соло",
    price: 0,
    priceLabel: "0 ₽",
    operatorCount: 1,
    operatorLabel: "1 оператор",
    minutes: 0,
    requests: 100,
    operators: "ОмниРМ: 1 оператор (Соло)",
    agents: "Без ИИ-агентов",
    pkg: "все каналы · 100 диалогов/мес",
    overage: "",
    recommended: false,
    omnirmPlan: "solo",
    agentsPlan: "",
  },
  {
    id: "start-plus",
    name: "Старт+",
    price: 3990,
    priceLabel: "3 990 ₽/мес",
    operatorCount: 2,
    operatorLabel: "2 оператора",
    minutes: 300,
    requests: 300,
    operators: "ОмниРМ: 2 оператора (Соло + 1 доп.)",
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
    price: 8990,
    priceLabel: "8 990 ₽/мес",
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
    price: 23900,
    priceLabel: "23 900 ₽/мес",
    operatorCount: 20,
    operatorLabel: "до 20 операторов",
    minutes: 2000,
    requests: 3000,
    operators: "ОмниРМ: до 20 операторов (Команда 5 + 15 доп.)",
    agents: "ИИ-агенты, тариф Про",
    pkg: "2 000 мин голоса · 3 000 обращений",
    overage: "Сверх: 8 ₽/мин · 3 ₽/обр",
    recommended: false,
    omnirmPlan: "team5",
    agentsPlan: "pro",
  },
];

export const SEPARATE_PRICES: Record<string, { omnirm: number; agents: number }> = {
  "solo": { omnirm: 0, agents: 0 },
  "start-plus": { omnirm: 990, agents: 2700 },
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

/** Cost of additional operators beyond the plan's included amount */
export function getAdditionalOpsCost(
  omniPlanId: string | null,
  operatorCount: number
): number {
  if (!omniPlanId) return 0;
  const included = getOperatorCount(omniPlanId);
  const extra = Math.max(0, operatorCount - included);
  return extra * ADDITIONAL_OPERATOR_PRICE;
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
  /** Number of operators selected by user in constructor */
  selectedOperatorCount: number;
  connectedOmniPlan: string | null;
  connectedAgentsPlan: string | null;
  /** Number of operators stored after connection */
  connectedOperatorCount: number;
  /** Names of employees selected for ОмниРМ connection */
  connectedEmployeeNames: string[];
  agree1: boolean;
  agree2: boolean;
  agree3: boolean;
  agree4: boolean;

  navigate: (s: Screen) => void;
  selectKit: (id: string | null) => void;
  selectOmniPlan: (id: string | null) => void;
  selectAgentsPlan: (id: string | null) => void;
  setOperatorCount: (n: number) => void;
  connect: (omniPlan: string | null, agentsPlan: string | null, operatorCount: number, employeeNames?: string[]) => void;
  setAgree: (n: 1 | 2 | 3 | 4, v: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  screen: "vats",
  selectedKitId: "solo",
  selectedOmniPlanId: "solo",
  selectedAgentsPlanId: null,
  selectedOperatorCount: 1,
  connectedOmniPlan: null,
  connectedAgentsPlan: null,
  connectedOperatorCount: 0,
  connectedEmployeeNames: [],
  agree1: false,
  agree2: false,
  agree3: false,
  agree4: false,

  navigate: (s) => set({ screen: s }),
  selectKit: (id) => set({ selectedKitId: id }),
  selectOmniPlan: (id) => set({ selectedOmniPlanId: id }),
  selectAgentsPlan: (id) => set({ selectedAgentsPlanId: id }),
  setOperatorCount: (n) => set({ selectedOperatorCount: n }),
  connect: (omniPlan, agentsPlan, operatorCount, employeeNames = []) =>
    set({
      connectedOmniPlan: omniPlan,
      connectedAgentsPlan: agentsPlan,
      connectedOperatorCount: operatorCount,
      connectedEmployeeNames: employeeNames,
    }),
  setAgree: (n, v) => set({ [`agree${n}`]: v }),
  reset: () =>
    set({
      screen: "vats",
      selectedKitId: "solo",
      selectedOmniPlanId: "solo",
      selectedAgentsPlanId: null,
      selectedOperatorCount: 1,
      connectedOmniPlan: null,
      connectedAgentsPlan: null,
      connectedOperatorCount: 0,
      connectedEmployeeNames: [],
      agree1: false,
      agree2: false,
      agree3: false,
      agree4: false,
    }),
}));
