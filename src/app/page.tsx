"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Users,
  Store,
  BarChart3,
  FileIcon,
  Monitor,
  Settings,
  Clock,
  HelpCircle,
  Phone,
  ChevronRight,
  Check,
  X,
  ArrowLeft,
  Zap,
  MessageSquare,
  Bot,
  TrendingUp,
  Shield,
  Headphones,
  RefreshCw,
  Radio,
  LayoutGrid,
  Sparkles,
  AlertCircle,
  Loader2,
  CircleCheckBig,
  Pencil,
  ChevronDown,
  UsersRound,
  DollarSign,
  UserCog,
  EyeOff,
  ExternalLink,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  useAppStore,
  KITS,
  OMNIRM_PLANS,
  AGENTS_PLANS,
  SEPARATE_PRICES,
  fmtPrice,
  getOperatorCount,
  findPlan,
  type Screen,
  type Kit,
  type TariffPlan,
} from "@/lib/store";

/* ─── tiny helpers ─── */

function YellowBtn({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFDD5B] px-6 py-3 text-sm font-semibold text-[#1A1D29] hover:bg-[#FFD23D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

function OutlineBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-[#2D3250] px-6 py-3 text-sm font-medium text-[#1A1D29] hover:bg-[#F5F5F7] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

function ProtoNav({ onBack, onReset }: { onBack?: () => void; onReset?: () => void }) {
  const { navigate, reset } = useAppStore();
  return (
    <div className="flex items-center gap-4">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1A1D29] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
      )}
      {onReset && (
        <button
          onClick={() => {
            reset();
          }}
          className="text-sm text-[#6B7280] hover:text-[#1A1D29] transition-colors"
        >
          Начать заново
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   1. VATS DASHBOARD
   ═══════════════════════════════════════════ */

function VatsScreen() {
  const { navigate, connectedOmniPlan, connectedAgentsPlan } = useAppStore();
  const isConnected = connectedOmniPlan !== null;
  const omnirmPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = getOperatorCount(connectedOmniPlan);

  const sidebarItems = [
    { icon: Menu, label: "Меню", active: false },
    { icon: Users, label: "Сотрудники", active: true },
    { icon: Store, label: "Маркетплейс", active: false },
    { icon: BarChart3, label: "Статистика", active: false },
    { icon: FileIcon, label: "Файлы", active: false },
  ];

  const bottomItems = [
    { icon: Settings, label: "Настройки", active: false },
    { icon: Clock, label: "История", active: false },
    { icon: HelpCircle, label: "Справка", active: false },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-10 flex h-full w-16 flex-col items-center border-r border-[#E5E7EB] bg-white py-4">
        <div className="flex flex-1 flex-col items-center gap-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              title={item.label}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                item.active
                  ? "bg-[#EEF2FF] text-[#4F46E5]"
                  : "text-[#6B7280] hover:bg-[#F5F5F7] hover:text-[#1A1D29]"
              }`}
            >
              <item.icon className="h-5 w-5" />
            </button>
          ))}

          {/* ОмниРМ button — same style as others */}
          <button
            title="ОмниРМ"
            onClick={() => navigate("landing")}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F5F5F7] hover:text-[#1A1D29]"
          >
            <Monitor className="h-5 w-5" />
          </button>

          {/* Spacer */}
          <div className="flex-1" />
        </div>

        <div className="flex flex-col items-center gap-2">
          {bottomItems.map((item) => (
            <button
              key={item.label}
              title={item.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F5F5F7] hover:text-[#1A1D29]"
            >
              <item.icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-16 flex-1 p-6 md:p-8">
        {/* Header row with optional service card link */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1A1D29]">Ваша АТС</h1>
          {isConnected && (
            <button
              onClick={() => navigate("service-card")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Посмотреть карточку услуги
            </button>
          )}
        </div>

        {/* Progress card */}
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#6B7280]">Настройка АТС</span>
            <span className="text-sm font-semibold text-[#1A1D29]">25%</span>
          </div>
          <Progress value={25} className="mt-2" />
        </div>

        {/* 3-column widgets */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {/* Tariff */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Тариф</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-[#1A1D29]">Бизнес</p>
            <p className="text-sm text-[#6B7280]">5 990 ₽/мес</p>
          </div>

          {/* Numbers */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Номера</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-[#1A1D29]">3 номера</p>
            <p className="text-sm text-[#6B7280]">+7 (495) 123-45-67</p>
          </div>

          {/* ОмниРМ promo / connected */}
          {isConnected ? (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1E9E4A]" />
                <span className="text-sm font-medium text-[#1E9E4A]">ОмниРМ подключен</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-[#1A1D29]">
                {omnirmPlan?.name ?? "—"}
              </p>
              <p className="text-sm text-[#6B7280]">
                {omnirmPlan?.priceLabel}
                {agentsPlan ? ` + ${agentsPlan.priceLabel}` : ""}
              </p>
              <p className="text-sm text-[#6B7280]">{ops} оператор(ов)</p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  className="bg-[#1A1D29] text-white hover:bg-[#2D3250]"
                  onClick={() => navigate("cabinet")}
                >
                  Перейти в кабинет ОмниРМ
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("service-card")}
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Карточка услуги
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl bg-gradient-to-br from-[#1A1D29] to-[#2D3250] p-6 text-white shadow-sm hover:from-[#2D3250] hover:to-[#3D4260] transition-all"
            >
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <span className="text-sm font-semibold">ОмниРМ</span>
              </div>
              <p className="mt-2 text-sm opacity-80">
                Все каналы — в одном окне оператора. Звонки, чаты, Telegram и&nbsp;др.
              </p>
              <YellowBtn onClick={() => navigate("landing")} className="mt-4 w-full">
                Подробнее
              </YellowBtn>
            </div>
          )}
        </div>

        {/* Table stub */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1A1D29]">Телефонные номера</h3>
          <div className="mt-3 space-y-2">
            {[
              "+7 (495) 123-45-67 — Основной",
              "+7 (495) 765-43-21 — Отдел продаж",
              "+7 (495) 987-65-43 — Поддержка",
            ].map((row) => (
              <div key={row} className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#1A1D29]">
                <Phone className="h-4 w-4 text-[#6B7280]" />
                {row}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════
   2. LANDING — NOT CONNECTED
   ═══════════════════════════════════════════ */

function LandingScreen() {
  const { navigate } = useAppStore();

  const painCards = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Пропущенные звонки",
      text: "Клиенты уходят к конкурентам, пока линия занята",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Разрозненные чаты",
      text: "WhatsApp, Telegram, сайт — всё в разных окнах",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Медленный ответ",
      text: "Оператор переключается между вкладками и теряет время",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Нет аналитики",
      text: "Неизвестно, сколько обращений теряется и почему",
    },
  ];

  const steps = [
    { num: 1, title: "Выберите комплект", text: "Готовые наборы под любой масштаб" },
    { num: 2, title: "Настройте каналы", text: "Подключите телефон, чат, мессенджеры" },
    { num: 3, title: "Добавьте операторов", text: "Пригласите команду и назначьте роли" },
    { num: 4, title: "Начните работу", text: "Все обращения — в едином интерфейсе" },
  ];

  const benefitCards = [
    {
      icon: <Radio className="h-6 w-6" />,
      title: "5+ каналов",
      text: "Телефония, виджет, Telegram, WhatsApp, ВКонтакте и другие",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "ИИ-агенты",
      text: "Автоматически обрабатывают рутину 24/7 без участия оператора",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "до 14% экономия",
      text: "Снижение нагрузки на операторов и сокращение времени ответа",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Безопасность",
      text: "Шифрование данных, соответствие 152-ФЗ, резервирование",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <div className="flex items-center justify-end px-6 pt-4 md:px-10">
        <ProtoNav onBack={() => navigate("vats")} onReset />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 text-center md:px-10">
        <Badge className="mb-4 bg-[#FFDD5B]/20 text-[#B89B0D] border-[#FFDD5B]/30">
          Подключение бесплатно
        </Badge>
        <h1 className="text-3xl font-bold text-[#1A1D29] md:text-5xl">
          Все каналы — в одном окне оператора
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] md:text-lg">
          Звонки, чаты с сайта, Telegram, WhatsApp — всё поступает в&nbsp;единую
          консоль. ИИ-агенты берут рутину на&nbsp;себя.
        </p>
        <YellowBtn onClick={() => navigate("kits")} className="mt-8">
          Подключить ОмниРМ
        </YellowBtn>
      </section>

      {/* Stats row */}
      <section className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-8 px-6 md:gap-16">
        {[
          { val: "5+", label: "каналов" },
          { val: "до 14%", label: "экономия" },
          { val: "24/7", label: "ИИ-агенты" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-[#1A1D29] md:text-3xl">{s.val}</p>
            <p className="text-sm text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Pain cards */}
      <section className="mx-auto mt-20 max-w-5xl px-6 md:px-10">
        <h2 className="text-center text-2xl font-bold text-[#1A1D29]">Знакомо?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {painCards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#92400E]">
                {c.icon}
              </div>
              <h3 className="mt-3 text-base font-semibold text-[#1A1D29]">{c.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto mt-20 max-w-5xl px-6 md:px-10">
        <h2 className="text-center text-2xl font-bold text-[#1A1D29]">Как это работает</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1D29] text-sm font-bold text-white">
                {s.num}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#1A1D29]">{s.title}</h3>
              <p className="mt-1 text-xs text-[#6B7280]">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto mt-20 max-w-5xl px-6 pb-20 md:px-10">
        <h2 className="text-center text-2xl font-bold text-[#1A1D29]">Что вы получаете</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {benefitCards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                {c.icon}
              </div>
              <h3 className="mt-3 text-base font-semibold text-[#1A1D29]">{c.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   3. LANDING — CONNECTED
   ═══════════════════════════════════════════ */

function LandingConnectedScreen() {
  const { navigate, connectedOmniPlan, connectedAgentsPlan } = useAppStore();
  const omnirmPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = getOperatorCount(connectedOmniPlan);
  const totalCost = (omnirmPlan?.price ?? 0) + (agentsPlan?.price ?? 0);

  const benefitCards = [
    {
      icon: <Radio className="h-6 w-6" />,
      title: "5+ каналов",
      text: "Телефония, виджет, Telegram, WhatsApp, ВКонтакте и другие",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "ИИ-агенты",
      text: "Автоматически обрабатывают рутину 24/7 без участия оператора",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "до 14% экономия",
      text: "Снижение нагрузки на операторов и сокращение времени ответа",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Безопасность",
      text: "Шифрование данных, соответствие 152-ФЗ, резервирование",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <div className="flex items-center justify-between px-6 pt-4 md:px-10">
        <button
          onClick={() => navigate("vats")}
          className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1A1D29] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Вернуться в АТС
        </button>
        <ProtoNav onReset />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 text-center md:px-10">
        <Badge className="mb-4 bg-[#EAF7EE] text-[#1E9E4A] border-[#1E9E4A]/20">
          ОмниРМ подключен
        </Badge>
        <h1 className="text-3xl font-bold text-[#1A1D29] md:text-5xl">
          Все каналы — в одном окне оператора
        </h1>
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#E5E7EB] bg-[#F7F7FA] p-4 text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1E9E4A]" />
            <span className="text-sm font-medium text-[#1E9E4A]">Подключено</span>
          </div>
          <div className="mt-2 space-y-1 text-sm text-[#1A1D29]">
            <p>Тариф ОмниРМ: <span className="font-semibold">{omnirmPlan?.name ?? "—"}</span></p>
            {agentsPlan && <p>ИИ-агенты: <span className="font-semibold">{agentsPlan.name}</span></p>}
            <p>Стоимость: <span className="font-semibold">{fmtPrice(totalCost)}/мес</span></p>
            <p>Операторов: <span className="font-semibold">{ops}</span></p>
          </div>
        </div>
        <YellowBtn onClick={() => navigate("cabinet")} className="mt-8">
          Перейти в кабинет ОмниРМ
        </YellowBtn>
        <button
          onClick={() => navigate("service-card")}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Карточка услуги
        </button>
      </section>

      {/* Benefits */}
      <section className="mx-auto mt-20 max-w-5xl px-6 pb-20 md:px-10">
        <h2 className="text-center text-2xl font-bold text-[#1A1D29]">Что вы получаете</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {benefitCards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                {c.icon}
              </div>
              <h3 className="mt-3 text-base font-semibold text-[#1A1D29]">{c.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   4. KITS SELECTION
   ═══════════════════════════════════════════ */

function KitCard({
  kit,
  selected,
  onSelect,
}: {
  kit: Kit;
  selected: boolean;
  onSelect: () => void;
}) {
  const separate = SEPARATE_PRICES[kit.id];
  const savings = separate ? separate.omnirm + separate.agents - kit.price : 0;

  const fmtNum = (n: number) => n.toLocaleString("ru-RU");

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border p-5 transition-all ${
        selected
          ? "border-[#FFDD5B] bg-[#FFFEF5] shadow-md"
          : kit.recommended
            ? "border-[#C026D3] bg-white hover:border-[#E879A8] hover:shadow-sm"
            : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm"
      }`}
    >
      {/* Header: name + badge */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-[#1A1D29]">{kit.name}</h3>
        {kit.recommended && (
          <Badge className="bg-[#C026D3] text-white border-[#C026D3] text-[10px]">
            Рекомендуем
          </Badge>
        )}
      </div>

      {/* Price — biggest, most prominent */}
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-[#1A1D29]">
          {fmtNum(kit.price)}
        </span>
        <span className="text-sm font-medium text-[#6B7280]">₽/мес</span>
      </div>

      {/* Key params — 3 prominent stat blocks */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {/* Operators */}
        <div className="rounded-xl bg-[#F5F5F7] px-3 py-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-[#4F46E5]">
            <UsersRound className="h-3.5 w-3.5" />
            <span className="text-xl font-bold">{kit.operatorCount}</span>
          </div>
          <p className="mt-0.5 text-[10px] font-medium text-[#6B7280]">
            {kit.operatorCount === 1 ? "оператор" : "операторов"}
          </p>
        </div>
        {/* Minutes */}
        <div className="rounded-xl bg-[#F5F5F7] px-3 py-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-[#1E9E4A]">
            <Phone className="h-3.5 w-3.5" />
            <span className="text-xl font-bold">{fmtNum(kit.minutes)}</span>
          </div>
          <p className="mt-0.5 text-[10px] font-medium text-[#6B7280]">мин голоса</p>
        </div>
        {/* Requests */}
        <div className="rounded-xl bg-[#F5F5F7] px-3 py-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-[#C026D3]">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="text-xl font-bold">{fmtNum(kit.requests)}</span>
          </div>
          <p className="mt-0.5 text-[10px] font-medium text-[#6B7280]">обращений</p>
        </div>
      </div>

      {/* Secondary details */}
      <div className="mt-3 space-y-0.5 text-xs text-[#9CA3AF]">
        <p>{kit.agents}</p>
        <p>Сверх: {kit.overage.replace("Сверх: ", "")}</p>
      </div>

      {savings > 0 && (
        <div className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#EAF7EE] px-2.5 py-1 text-xs font-medium text-[#1E9E4A]">
          <TrendingUp className="h-3 w-3" /> Экономия {fmtPrice(savings)}/мес
        </div>
      )}
    </div>
  );
}

function KitsScreen() {
  const {
    navigate,
    selectedKitId,
    selectKit,
    agree1,
    agree2,
    setAgree,
    connect,
  } = useAppStore();
  const [alertShown, setAlertShown] = useState(false);

  const selectedKit = KITS.find((k) => k.id === selectedKitId) ?? null;
  const separate = selectedKit ? SEPARATE_PRICES[selectedKit.id] : null;
  const savings = separate ? separate.omnirm + separate.agents - selectedKit.price : 0;

  const handleConnect = () => {
    if (!agree1 || !agree2) {
      setAlertShown(true);
      return;
    }
    setAlertShown(false);
    if (selectedKit) {
      connect(selectedKit.omnirmPlan, selectedKit.agentsPlan);
      navigate("confirm");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FA]">
      {/* Nav */}
      <div className="flex items-center justify-between px-6 pt-4 md:px-10">
        <ProtoNav onBack={() => navigate("landing")} onReset />
      </div>

      {/* Progress bar */}
      <div className="mx-auto max-w-4xl px-6 pt-6 md:px-10">
        <div className="flex items-center gap-3">
          {["Комплекты", "Конструктор", "Подтверждение"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i === 0
                    ? "bg-[#1A1D29] text-white"
                    : "bg-[#E5E7EB] text-[#6B7280]"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm ${
                  i === 0
                    ? "font-semibold text-[#1A1D29]"
                    : "text-[#6B7280]"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mx-auto max-w-4xl px-6 pt-8 md:px-10">
        <h1 className="text-2xl font-bold text-[#1A1D29]">Вместе выгоднее</h1>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pt-6 md:flex-row md:px-10">
        {/* Kit cards */}
        <div className="flex-1 space-y-4">
          {KITS.map((kit) => (
            <KitCard
              key={kit.id}
              kit={kit}
              selected={selectedKitId === kit.id}
              onSelect={() => selectKit(kit.id)}
            />
          ))}

          <button
            onClick={() => navigate("constructor")}
            className="mt-2 text-sm font-medium text-[#4F46E5] hover:underline"
          >
            Хочу собрать свой тариф — конструктор тарифа →
          </button>
        </div>

        {/* Checkout sidebar */}
        <div className="w-full md:w-72 shrink-0">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1A1D29]">Ваш выбор</h3>
            {selectedKit ? (
              <div className="mt-3 space-y-2 text-sm text-[#6B7280]">
                <p className="font-medium text-[#1A1D29]">{selectedKit.name}</p>
                <p>{selectedKit.operators}</p>
                <p>{selectedKit.agents}</p>
                <p className="font-medium text-[#1A1D29]">{selectedKit.pkg}</p>
                {savings > 0 && (
                  <p className="text-[#1E9E4A] font-medium">
                    Экономия {fmtPrice(savings)}/мес
                  </p>
                )}
                <div className="border-t border-[#E5E7EB] pt-2">
                  <p className="text-base font-bold text-[#1A1D29]">{selectedKit.priceLabel}</p>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#6B7280]">Выберите комплект</p>
            )}
          </div>

          {/* Agreements */}
          <div className="mt-4 space-y-3">
            <label className="flex items-start gap-2 text-xs text-[#6B7280] cursor-pointer">
              <Checkbox
                checked={agree1}
                onCheckedChange={(v) => setAgree(1, !!v)}
                className="mt-0.5"
              />
              <span>
                Я ознакомлен и принимаю условия{" "}
                <span className="underline">договора-оферты</span>
              </span>
            </label>
            <label className="flex items-start gap-2 text-xs text-[#6B7280] cursor-pointer">
              <Checkbox
                checked={agree2}
                onCheckedChange={(v) => setAgree(2, !!v)}
                className="mt-0.5"
              />
              <span>
                Я принимаю{" "}
                <span className="underline">политику конфиденциальности</span>
              </span>
            </label>
          </div>

          {alertShown && (!agree1 || !agree2) && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Примите условия для продолжения
            </div>
          )}
        </div>
      </div>

      {/* Footer action bar */}
      <div className="sticky bottom-0 mt-8 border-t border-[#E5E7EB] bg-white px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <OutlineBtn onClick={() => navigate("constructor")}>Собрать самому</OutlineBtn>
          <YellowBtn onClick={handleConnect} disabled={!selectedKitId}>
            Подключить комплект
          </YellowBtn>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   5. CONSTRUCTOR
   ═══════════════════════════════════════════ */

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: TariffPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border p-4 transition-all ${
        selected
          ? "border-[#FFDD5B] bg-[#FFFEF5] shadow-md"
          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#1A1D29]">{plan.name}</h3>
        {selected && <Check className="h-5 w-5 text-[#1E9E4A]" />}
      </div>
      <p className="mt-1 text-lg font-bold text-[#1A1D29]">{plan.priceLabel}</p>
      {plan.note && <p className="text-xs text-[#6B7280]">{plan.note}</p>}
      <ul className="mt-2 space-y-0.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Check className="h-3 w-3 text-[#1E9E4A] shrink-0" /> {f}
          </li>
        ))}
      </ul>
      {plan.cons && (
        <p className="mt-2 text-xs text-[#92400E]">⚠ {plan.cons}</p>
      )}
      {plan.footnote && (
        <p className="mt-1 text-xs text-[#6B7280]">{plan.footnote}</p>
      )}
      {plan.overMinute != null && plan.overRequest != null && (
        <p className="mt-1 text-xs text-[#6B7280]">
          Сверх: {plan.overMinute} ₽/мин · {plan.overRequest} ₽/обр
        </p>
      )}
    </div>
  );
}

function NoneCard({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border p-4 text-center transition-all ${
        selected
          ? "border-[#FFDD5B] bg-[#FFFEF5] shadow-md"
          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm"
      }`}
    >
      <X className="mx-auto h-5 w-5 text-[#6B7280]" />
      <p className="mt-1 text-sm font-medium text-[#6B7280]">{label}</p>
    </div>
  );
}

function ConstructorScreen() {
  const {
    navigate,
    selectedOmniPlanId,
    selectedAgentsPlanId,
    selectOmniPlan,
    selectAgentsPlan,
    selectKit,
    agree3,
    agree4,
    setAgree,
    connect,
  } = useAppStore();
  const [alertShown, setAlertShown] = useState(false);

  const omniPlan = findPlan(OMNIRM_PLANS, selectedOmniPlanId);
  const agentsPlan = findPlan(AGENTS_PLANS, selectedAgentsPlanId);
  const total = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0);

  /* find matching kit */
  const matchingKit = KITS.find(
    (k) =>
      k.omnirmPlan === selectedOmniPlanId &&
      k.agentsPlan === selectedAgentsPlanId
  );

  const handleConnect = () => {
    if (!agree3 || !agree4) {
      setAlertShown(true);
      return;
    }
    setAlertShown(false);
    if (selectedOmniPlanId && selectedAgentsPlanId) {
      connect(selectedOmniPlanId, selectedAgentsPlanId);
      navigate("confirm");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FA]">
      {/* Nav */}
      <div className="flex items-center justify-end px-6 pt-4 md:px-10">
        <ProtoNav onBack={() => navigate("kits")} onReset />
      </div>

      {/* Progress bar */}
      <div className="mx-auto max-w-4xl px-6 pt-6 md:px-10">
        <div className="flex items-center gap-3">
          {["Комплекты", "Конструктор", "Подтверждение"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i === 1
                    ? "bg-[#1A1D29] text-white"
                    : "bg-[#E5E7EB] text-[#6B7280]"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm ${
                  i === 1
                    ? "font-semibold text-[#1A1D29]"
                    : "text-[#6B7280]"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mx-auto max-w-4xl px-6 pt-8 md:px-10">
        <h1 className="text-2xl font-bold text-[#1A1D29]">Соберите свой тариф</h1>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pt-6 md:flex-row md:px-10">
        {/* Plans */}
        <div className="flex-1 space-y-8">
          {/* ОмниРМ plans */}
          <div>
            <h2 className="text-base font-semibold text-[#1A1D29]">ОмниРМ</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {OMNIRM_PLANS.map((p) => (
                <PlanCard
                  key={p.id}
                  plan={p}
                  selected={selectedOmniPlanId === p.id}
                  onSelect={() => selectOmniPlan(p.id)}
                />
              ))}
              <NoneCard
                label="Не нужна"
                selected={selectedOmniPlanId === null}
                onSelect={() => selectOmniPlan(null)}
              />
            </div>
          </div>

          {/* Agents plans */}
          <div>
            <h2 className="text-base font-semibold text-[#1A1D29]">ИИ-агенты</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {AGENTS_PLANS.map((p) => (
                <PlanCard
                  key={p.id}
                  plan={p}
                  selected={selectedAgentsPlanId === p.id}
                  onSelect={() => selectAgentsPlan(p.id)}
                />
              ))}
              <NoneCard
                label="Не нужны"
                selected={selectedAgentsPlanId === null}
                onSelect={() => selectAgentsPlan(null)}
              />
            </div>
          </div>
        </div>

        {/* Checkout sidebar */}
        <div className="w-full md:w-72 shrink-0">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1A1D29]">Ваш выбор</h3>
            <div className="mt-3 space-y-2 text-sm text-[#6B7280]">
              {omniPlan ? (
                <p>ОмниРМ: <span className="font-medium text-[#1A1D29]">{omniPlan.name} — {omniPlan.priceLabel}</span></p>
              ) : (
                <p>ОмниРМ: <span className="text-[#9CA3AF]">не выбран</span></p>
              )}
              {agentsPlan ? (
                <p>ИИ-агенты: <span className="font-medium text-[#1A1D29]">{agentsPlan.name} — {agentsPlan.priceLabel}</span></p>
              ) : (
                <p>ИИ-агенты: <span className="text-[#9CA3AF]">не выбраны</span></p>
              )}
              <div className="border-t border-[#E5E7EB] pt-2">
                <p className="text-base font-bold text-[#1A1D29]">{fmtPrice(total)}/мес</p>
              </div>
            </div>
            {matchingKit && (
              <div className="mt-3 rounded-lg bg-[#EEF2FF] p-3">
                <p className="text-xs text-[#4F46E5]">
                  Комплект «{matchingKit.name}» выгоднее — экономия {fmtPrice(
                    SEPARATE_PRICES[matchingKit.id]
                      ? SEPARATE_PRICES[matchingKit.id].omnirm +
                          SEPARATE_PRICES[matchingKit.id].agents -
                          matchingKit.price
                      : 0
                  )}/мес
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 text-[#4F46E5] border-[#4F46E5] hover:bg-[#EEF2FF]"
                  onClick={() => {
                    selectKit(matchingKit.id);
                    navigate("kits");
                  }}
                >
                  Перейти к комплекту «{matchingKit.name}»
                </Button>
              </div>
            )}
          </div>

          {/* Agreements */}
          <div className="mt-4 space-y-3">
            <label className="flex items-start gap-2 text-xs text-[#6B7280] cursor-pointer">
              <Checkbox
                checked={agree3}
                onCheckedChange={(v) => setAgree(3, !!v)}
                className="mt-0.5"
              />
              <span>
                Я ознакомлен и принимаю условия{" "}
                <span className="underline">договора-оферты</span>
              </span>
            </label>
            <label className="flex items-start gap-2 text-xs text-[#6B7280] cursor-pointer">
              <Checkbox
                checked={agree4}
                onCheckedChange={(v) => setAgree(4, !!v)}
                className="mt-0.5"
              />
              <span>
                Я принимаю{" "}
                <span className="underline">политику конфиденциальности</span>
              </span>
            </label>
          </div>

          {alertShown && (!agree3 || !agree4) && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Примите условия для продолжения
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 mt-8 border-t border-[#E5E7EB] bg-white px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <OutlineBtn onClick={() => navigate("kits")}>Готовые комплекты</OutlineBtn>
          <YellowBtn
            onClick={handleConnect}
            disabled={!selectedOmniPlanId && !selectedAgentsPlanId}
          >
            Подключить
          </YellowBtn>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   6. CONFIRMATION
   ═══════════════════════════════════════════ */

function ConfirmScreen() {
  const {
    navigate,
    connectedOmniPlan,
    connectedAgentsPlan,
    selectedKitId,
  } = useAppStore();

  const omniPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const kit = KITS.find((k) => k.id === selectedKitId) ?? null;
  const totalCost = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0);

  const goToCabinet = () => {
    navigate("transition");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F7FA] px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF7EE]">
          <CircleCheckBig className="h-8 w-8 text-[#1E9E4A]" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-[#1A1D29]">Услуга подключена</h1>

        <div className="mt-6 space-y-2 text-left text-sm text-[#6B7280]">
          {kit ? (
            <>
              <p>Комплект: <span className="font-semibold text-[#1A1D29]">{kit.name}</span></p>
              <p>{kit.operators}</p>
              <p>{kit.agents}</p>
            </>
          ) : (
            <>
              {omniPlan && (
                <p>ОмниРМ: <span className="font-semibold text-[#1A1D29]">{omniPlan.name}</span></p>
              )}
              {agentsPlan && (
                <p>ИИ-агенты: <span className="font-semibold text-[#1A1D29]">{agentsPlan.name}</span></p>
              )}
            </>
          )}
          <div className="border-t border-[#E5E7EB] pt-2">
            <p className="text-base font-bold text-[#1A1D29]">{fmtPrice(totalCost)}/мес</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <YellowBtn onClick={goToCabinet} className="w-full">
            Перейти в кабинет ОмниРМ
          </YellowBtn>
          <OutlineBtn onClick={() => navigate("vats")} className="w-full">
            Вернуться в АТС
          </OutlineBtn>
          <button
            onClick={() => navigate("manage")}
            className="text-sm font-medium text-[#6B7280] hover:text-[#1A1D29] transition-colors"
          >
            Изменить тариф
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   7. MANAGE SUBSCRIPTION
   ═══════════════════════════════════════════ */

function ManageScreen() {
  const {
    navigate,
    connectedOmniPlan,
    connectedAgentsPlan,
  } = useAppStore();

  const omniPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);

  return (
    <div className="min-h-screen bg-[#F7F7FA] px-6 pt-10 md:px-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-[#1A1D29]">Управление подпиской</h1>

        <div className="mt-6 space-y-4">
          {/* ОмниРМ row */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">ОмниРМ</p>
                <p className="text-base font-semibold text-[#1A1D29]">
                  {omniPlan?.name ?? "—"} · {omniPlan?.priceLabel ?? ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("constructor")}
                >
                  <Pencil className="h-3.5 w-3.5" /> Изменить
                </Button>
                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                  Отключить
                </Button>
              </div>
            </div>
          </div>

          {/* Agents row */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">ИИ-агенты</p>
                <p className="text-base font-semibold text-[#1A1D29]">
                  {agentsPlan?.name ?? "—"} · {agentsPlan?.priceLabel ?? ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("constructor")}
                >
                  <Pencil className="h-3.5 w-3.5" /> Изменить
                </Button>
                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                  Отключить
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <YellowBtn onClick={() => navigate("cabinet")}>
            Сохранить изменения
          </YellowBtn>
          <OutlineBtn onClick={() => navigate("vats")}>
            Вернуться в АТС
          </OutlineBtn>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   8. CABINET
   ═══════════════════════════════════════════ */

function CabinetScreen() {
  const {
    navigate,
    connectedOmniPlan,
    connectedAgentsPlan,
  } = useAppStore();

  const omniPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = getOperatorCount(connectedOmniPlan);
  const totalCost = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1117] to-[#1A1D29] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          <Monitor className="h-6 w-6 text-[#FFDD5B]" />
          <span className="text-lg font-bold">ОмниРМ</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
          <UsersRound className="h-4 w-4" />
          Администратор
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-8 md:px-10">
        <h1 className="text-3xl font-bold">Кабинет ОмниРМ</h1>
        <p className="mt-2 text-[#9CA3AF]">Управление подключенными сервисами</p>

        {/* 2x2 grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <Monitor className="h-4 w-4" />
              <span className="text-xs font-medium">ОмниРМ тариф</span>
            </div>
            <p className="mt-2 text-xl font-bold">{omniPlan?.name ?? "—"}</p>
            <p className="text-sm text-[#9CA3AF]">{omniPlan?.priceLabel ?? ""}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-medium">ИИ-агенты тариф</span>
            </div>
            <p className="mt-2 text-xl font-bold">{agentsPlan?.name ?? "—"}</p>
            <p className="text-sm text-[#9CA3AF]">{agentsPlan?.priceLabel ?? ""}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Стоимость</span>
            </div>
            <p className="mt-2 text-xl font-bold">{fmtPrice(totalCost)}/мес</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <UserCog className="h-4 w-4" />
              <span className="text-xs font-medium">Операторов в системе</span>
            </div>
            <p className="mt-2 text-xl font-bold">{ops}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button
            onClick={() => navigate("vats")}
            className="text-sm font-medium text-[#FFDD5B] hover:underline"
          >
            Вернуться в АТС →
          </button>
          <button
            onClick={() => navigate("landing-connected")}
            className="text-sm font-medium text-[#9CA3AF] hover:text-[#FFDD5B] hover:underline transition-colors"
          >
            Страница ОмниРМ →
          </button>
          <button
            onClick={() => navigate("service-card")}
            className="text-sm font-medium text-[#9CA3AF] hover:text-[#FFDD5B] hover:underline transition-colors"
          >
            Карточка услуги →
          </button>
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════
   10. SERVICE CARD (ОмниРМ подключен)
   ═══════════════════════════════════════════ */

function ServiceCardScreen() {
  const {
    navigate,
    connectedOmniPlan,
    connectedAgentsPlan,
  } = useAppStore();

  const omniPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = getOperatorCount(connectedOmniPlan);
  const totalCost = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0);
  const kit = KITS.find(
    (k) => k.omnirmPlan === connectedOmniPlan && k.agentsPlan === connectedAgentsPlan
  );

  const fmtNum = (n: number) => n.toLocaleString("ru-RU");

  /* Role toggle: "admin" | "operator" */
  const [role, setRole] = useState<"admin" | "operator">("admin");
  const isAdmin = role === "admin";

  /* Tabs */
  const [activeTab, setActiveTab] = useState("Все");
  const tabs = [
    { label: "Подключенные", count: 17, icon: true },
    { label: "Все", count: 8, icon: false },
    { label: "Новинки", count: 5, icon: false },
    { label: "Популярное", count: 8, icon: false },
    { label: "Новые тарифы", count: 2, icon: false },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar — same as VatsScreen */}
      <aside className="fixed left-0 top-0 z-10 flex h-full w-16 flex-col items-center border-r border-[#E5E7EB] bg-white py-4">
        <div className="flex flex-1 flex-col items-center gap-2">
          {[Menu, Users, Store, BarChart3, FileIcon].map((Icon, i) => (
            <button
              key={i}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F5F5F7] hover:text-[#1A1D29]"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
          <button
            title="ОмниРМ"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F5F5F7] hover:text-[#1A1D29]"
          >
            <Monitor className="h-5 w-5" />
          </button>
          <div className="flex-1" />
        </div>
        <div className="flex flex-col items-center gap-2">
          {[Settings, Clock, HelpCircle].map((Icon, i) => (
            <button
              key={i}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F5F5F7] hover:text-[#1A1D29]"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </aside>

      {/* Main area */}
      <main className="ml-16 flex-1">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("vats")}
              className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1A1D29]"
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
          </div>
          {/* Role switcher */}
          <div className="flex items-center gap-1 rounded-lg bg-[#F3F4F6] p-0.5">
            <button
              onClick={() => setRole("admin")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                isAdmin
                  ? "bg-white text-[#111827] shadow-sm"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Администратор
            </button>
            <button
              onClick={() => setRole("operator")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                !isAdmin
                  ? "bg-white text-[#111827] shadow-sm"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Оператор
            </button>
          </div>
        </div>

        <div className="px-6 py-6 md:px-8">
          <h1 className="text-2xl font-bold text-[#111827]">Услуги</h1>

          {/* Search */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-3 py-2.5">
            <Search className="h-4 w-4 text-[#9CA3AF]" />
            <span className="text-sm text-[#9CA3AF]">CRM</span>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex items-center gap-6 border-b border-[#E5E7EB]">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`relative pb-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.label
                    ? "text-[#111827]"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {tab.icon && <Check className="h-3.5 w-3.5" />}
                  {tab.label}
                  <span className="text-xs text-[#9CA3AF]">({tab.count})</span>
                </span>
                {activeTab === tab.label && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FDB913]" />
                )}
              </button>
            ))}
          </div>

          {/* ─── ADMIN card ─── */}
          {isAdmin && (
            <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              {/* Badges row */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E] px-3 py-1 text-xs font-medium text-white">
                  <Check className="h-3 w-3" /> Подключено
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A855F7] px-3 py-1 text-xs font-medium text-white">
                  <Zap className="h-3 w-3" /> Новый сервис
                </span>
              </div>

              {/* Main info row */}
              <div className="mt-5 flex flex-wrap items-center gap-6 md:gap-10">
                {/* Logo + Name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#3B82F6]">
                    <UsersRound className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-semibold text-[#111827]">ОмниРМ</span>
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[#111827]">{fmtNum(totalCost)} ₽</span>
                  <span className="text-xs text-[#6B7280]">в месяц</span>
                  <button className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] hover:bg-[#F3F4F6]">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Employees block */}
                <div>
                  <p className="font-semibold text-[#111827]">{ops} сотрудников</p>
                  <p className="text-xs text-[#6B7280]">Доступно</p>
                  <button className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] hover:bg-[#F3F4F6]">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Tariff block */}
                <div>
                  <p className="font-semibold text-[#111827]">{kit?.name ?? (omniPlan?.name ?? "—")}</p>
                  <p className="text-xs text-[#6B7280]">тариф</p>
                  <button className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] hover:bg-[#F3F4F6]">
                    <EyeOff className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* CTA button */}
                <button
                  onClick={() => navigate("cabinet")}
                  className="ml-auto rounded-lg bg-[#000000] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#111827]"
                >
                  Перейти в кабинет ОмниРМ
                </button>
              </div>

              {/* Description */}
              <div className="mt-5 flex items-start justify-between">
                <p className="max-w-xl text-sm leading-relaxed text-[#4B5563]">
                  ОмниРМ — ваши сотрудники смогут общаться с клиентами в любых мессенджерах,
                  по телефону или по видеосвязи. История заказов будет в одном пространстве.
                </p>
                <button
                  onClick={() => navigate("landing-connected")}
                  className="shrink-0 text-sm font-medium text-[#2563EB] hover:underline"
                >
                  На страницу ОмниРМ
                </button>
              </div>
            </div>
          )}

          {/* ─── OPERATOR card ─── */}
          {!isAdmin && (
            <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              {/* Badges row */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E] px-3 py-1 text-xs font-medium text-white">
                  <Check className="h-3 w-3" /> Подключено
                </span>
              </div>

              {/* Main info row — no financial data */}
              <div className="mt-5 flex flex-wrap items-center gap-6 md:gap-10">
                {/* Logo + Name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#3B82F6]">
                    <UsersRound className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-semibold text-[#111827]">ОмниРМ</span>
                </div>

                {/* Employees block — read-only, no edit */}
                <div>
                  <p className="font-semibold text-[#111827]">{ops} сотрудников</p>
                  <p className="text-xs text-[#6B7280]">Доступно</p>
                </div>

                {/* Tariff block — read-only, no edit */}
                <div>
                  <p className="font-semibold text-[#111827]">{kit?.name ?? (omniPlan?.name ?? "—")}</p>
                  <p className="text-xs text-[#6B7280]">тариф</p>
                </div>

                {/* CTA button — Request access */}
                <button
                  className="ml-auto rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA]"
                >
                  Запросить доступ
                </button>
              </div>

              {/* Description */}
              <div className="mt-5 flex items-start justify-between">
                <p className="max-w-xl text-sm leading-relaxed text-[#4B5563]">
                  ОмниРМ — ваши сотрудники смогут общаться с клиентами в любых мессенджерах,
                  по телефону или по видеосвязи. История заказов будет в одном пространстве.
                </p>
                <button
                  onClick={() => navigate("landing-connected")}
                  className="shrink-0 text-sm font-medium text-[#2563EB] hover:underline"
                >
                  На страницу ОмниРМ
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════
   9. TRANSITION OVERLAY
   ═══════════════════════════════════════════ */

function TransitionScreen() {
  const { navigate } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => navigate("cabinet"), 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F1117]">
      <Loader2 className="h-10 w-10 animate-spin text-[#FFDD5B]" />
      <p className="mt-4 text-base font-medium text-white">
        Переход в кабинет ОмниРМ…
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE — Screen Router
   ═══════════════════════════════════════════ */

const SCREEN_MAP: Record<Screen, () => React.ReactNode> = {
  vats: () => <VatsScreen />,
  landing: () => <LandingScreen />,
  "landing-connected": () => <LandingConnectedScreen />,
  kits: () => <KitsScreen />,
  constructor: () => <ConstructorScreen />,
  confirm: () => <ConfirmScreen />,
  manage: () => <ManageScreen />,
  cabinet: () => <CabinetScreen />,
  transition: () => <TransitionScreen />,
  "service-card": () => <ServiceCardScreen />,
};

export default function HomePage() {
  const { screen } = useAppStore();
  const renderer = SCREEN_MAP[screen];
  return <>{renderer()}</>;
}
