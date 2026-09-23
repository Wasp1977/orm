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
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  Unplug,
  PhoneOff,
  Timer,
  Ban,
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
  ADDITIONAL_OPERATOR_PRICE,
  fmtPrice,
  getOperatorCount,
  getAdditionalOpsCost,
  findPlan,
  type Screen,
  type Kit,
  type TariffPlan,
} from "@/lib/store";

/* ─── Enriched employee data ─── */
interface EmployeeDetail {
  name: string;
  phone: string;
  department?: string;
}

const MOCK_EMPLOYEE_DETAILS: EmployeeDetail[] = [
  { name: "Алексей Иванов", phone: "+7 900 111-22-33", department: "Отдел продаж" },
  { name: "Мария Петрова", phone: "+7 900 222-33-44", department: "Поддержка" },
  { name: "Дмитрий Сидоров", phone: "+7 900 333-44-55", department: "Отдел продаж" },
  { name: "Елена Козлова", phone: "+7 900 444-55-66" },
  { name: "Сергей Новиков", phone: "+7 900 555-66-77", department: "IT" },
  { name: "Анна Морозова", phone: "+7 900 666-77-88", department: "Поддержка" },
  { name: "Игорь Волков", phone: "+7 900 777-88-99" },
  { name: "Ольга Лебедева", phone: "+7 900 -888-99-00", department: "Отдел продаж" },
  { name: "Павел Соколов", phone: "+7 900 999-00-11", department: "IT" },
  { name: "Наталья Зайцева", phone: "+7 900 000-11-22" },
  { name: "Андрей Кузнецов", phone: "+7 901 111-22-33", department: "Поддержка" },
  { name: "Татьяна Попова", phone: "+7 901 222-33-44", department: "Отдел продаж" },
  { name: "Максим Васильев", phone: "+7 901 333-44-55" },
  { name: "Юлия Михайлова", phone: "+7 901 444-55-66", department: "IT" },
  { name: "Виктор Фёдоров", phone: "+7 901 555-66-77", department: "Поддержка" },
  { name: "Екатерина Андреева", phone: "+7 901 666-77-88" },
  { name: "Артём Семёнов", phone: "+7 901 777-88-99", department: "Отдел продаж" },
  { name: "Валерия Николаева", phone: "+7 901 888-99-00" },
  { name: "Роман Егоров", phone: "+7 901 (999)-00-11", department: "IT" },
  { name: "Светлана Павлова", phone: "+7 901 000-11-22", department: "Поддержка" },
  { name: "Кирилл Тарасов", phone: "+7 902 111-22-33" },
  { name: "Людмила Белова", phone: "+7 902 222-33-44", department: "Отдел продаж" },
  { name: "Геннадий Комаров", phone: "+7 902 333-44-55", department: "IT" },
  { name: "Ирина Орлова", phone: "+7 902 444-55-66" },
  { name: "Владимир Киселёв", phone: "+7 902 555-66-77", department: "Поддержка" },
];

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
  const { navigate, connectedOmniPlan, connectedAgentsPlan, connectedOperatorCount } = useAppStore();
  const isConnected = connectedOmniPlan !== null;
  const omnirmPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = connectedOperatorCount > 0 ? connectedOperatorCount : getOperatorCount(connectedOmniPlan);
  const extraOpsCost = getAdditionalOpsCost(connectedOmniPlan, connectedOperatorCount);

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
              <button
                onClick={() => navigate("kits")}
                className="mt-2 text-left hover:underline"
              >
                <p className="text-lg font-semibold text-[#1A1D29]">
                  {omnirmPlan?.name ?? "—"}
                </p>
                <p className="text-sm text-[#6B7280]">
                  {omnirmPlan?.priceLabel}
                  {agentsPlan ? ` + ${agentsPlan.priceLabel}` : ""}
                  {extraOpsCost > 0 ? ` + ${fmtPrice(extraOpsCost)} доп. операторы` : ""}
                </p>
              </button>
              <button
                onClick={() => navigate("constructor")}
                className="mt-1 text-left hover:underline"
              >
                <p className="text-sm text-[#6B7280]">{ops} оператор(ов)</p>
              </button>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    /* disconnect ОмниРМ */
                  }}
                  title="Отключить ОмниРМ"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Unplug className="h-4 w-4" />
                </button>
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
          Подключить ОмниРМ за 0 ₽
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
  const { navigate, connectedOmniPlan, connectedAgentsPlan, connectedOperatorCount, omnirmBlocked, disconnectOmni, toggleOmniBlock } = useAppStore();
  const omnirmPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = connectedOperatorCount > 0 ? connectedOperatorCount : getOperatorCount(connectedOmniPlan);
  const extraOpsCost = getAdditionalOpsCost(connectedOmniPlan, connectedOperatorCount);
  const totalCost = (omnirmPlan?.price ?? 0) + (agentsPlan?.price ?? 0) + extraOpsCost;

  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  /* Mock usage stats */
  const usedMinutes = 187;
  const totalMinutes = agentsPlan?.minutes ?? 300;
  const remainingMinutes = Math.max(0, totalMinutes - usedMinutes);
  const usedRequests = 142;
  const usedSms = 38;
  const fmtNum = (n: number) => n.toLocaleString("ru-RU");

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
        {omnirmBlocked ? (
          <Badge className="mb-4 bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]">
            ОмниРМ заблокирован
          </Badge>
        ) : (
          <Badge className="mb-4 bg-[#EAF7EE] text-[#1E9E4A] border-[#1E9E4A]/20">
            ОмниРМ подключен
          </Badge>
        )}
        <h1 className="text-3xl font-bold text-[#1A1D29] md:text-5xl">
          Все каналы — в одном окне оператора
        </h1>

        {/* Blocked alert */}
        {omnirmBlocked && (
          <div className="mx-auto mt-6 max-w-lg flex items-start gap-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 text-left">
            <Ban className="h-5 w-5 shrink-0 mt-0.5 text-[#DC2626]" />
            <div>
              <p className="text-sm font-semibold text-[#DC2626]">Услуга заблокирована</p>
              <p className="text-xs text-[#991B1B]">Работа ОмниРМ приостановлена — лимит минут на текущий месяц исчерпан.</p>
            </div>
          </div>
        )}

        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#E5E7EB] bg-[#F7F7FA] p-4 text-left">
          <div className="flex items-center gap-2">
            {omnirmBlocked ? (
              <>
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#DC2626]" />
                <span className="text-sm font-medium text-[#DC2626]">Заблокирована</span>
              </>
            ) : (
              <>
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1E9E4A]" />
                <span className="text-sm font-medium text-[#1E9E4A]">Подключено</span>
              </>
            )}
          </div>
          <div className="mt-2 space-y-1 text-sm text-[#1A1D29]">
            <p>Тариф ОмниРМ: <span className="font-semibold">{omnirmPlan?.name ?? "—"}</span></p>
            {agentsPlan && <p>ИИ-агенты: <span className="font-semibold">{agentsPlan.name}</span></p>}
            <p>Стоимость: <span className="font-semibold">{fmtPrice(totalCost)}/мес</span></p>
            <p>Операторов: <span className="font-semibold">{ops}</span> <span className="text-[#6B7280]">Подключено</span></p>
            {extraOpsCost > 0 && (
              <p>Доп. операторы: <span className="font-semibold">+{fmtPrice(extraOpsCost)} ₽/мес</span></p>
            )}
          </div>
        </div>

        {/* Usage stats */}
        <div className="mx-auto mt-6 max-w-lg">
          <div className="grid grid-cols-3 gap-3">
            <div className={`rounded-xl px-3 py-2.5 ${omnirmBlocked ? "bg-[#FEF2F2] border border-[#FECACA]" : "bg-[#F7F7FA]"}`}>
              <div className={`flex items-center justify-center gap-1 ${omnirmBlocked ? "text-[#DC2626]" : "text-[#2563EB]"}`}>
                <Timer className="h-3.5 w-3.5" />
                <span className="text-lg font-bold">{omnirmBlocked ? "0" : fmtNum(remainingMinutes)}</span>
              </div>
              <p className={`mt-0.5 text-[10px] font-medium text-center ${omnirmBlocked ? "text-[#991B1B]" : "text-[#6B7280]"}`}>минут осталось</p>
            </div>
            <div className="rounded-xl bg-[#F7F7FA] px-3 py-2.5">
              <div className="flex items-center justify-center gap-1 text-[#7C3AED]">
                <Phone className="h-3.5 w-3.5" />
                <span className="text-lg font-bold">{fmtNum(usedRequests)}</span>
              </div>
              <p className="mt-0.5 text-[10px] font-medium text-center text-[#6B7280]">обращений</p>
            </div>
            <div className="rounded-xl bg-[#F7F7FA] px-3 py-2.5">
              <div className="flex items-center justify-center gap-1 text-[#059669]">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-lg font-bold">{fmtNum(usedSms)}</span>
              </div>
              <p className="mt-0.5 text-[10px] font-medium text-center text-[#6B7280]">СМС</p>
            </div>
          </div>
          {!omnirmBlocked && (
            <button
              onClick={() => toggleOmniBlock(true)}
              className="mt-2 text-xs font-medium text-[#6B7280] hover:text-[#DC2626] transition-colors underline decoration-dashed underline-offset-2"
            >
              Посмотреть, что будет, когда минуты закончатся
            </button>
          )}
          {omnirmBlocked && (
            <button
              onClick={() => toggleOmniBlock(false)}
              className="mt-2 text-xs font-medium text-[#2563EB] hover:underline"
            >
              Вернуть работу сервиса
            </button>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setShowDisconnectConfirm(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#DC2626] hover:border-[#FECACA] transition-colors"
            title="Отключить ОмниРМ"
          >
            <Unplug className="h-5 w-5" />
          </button>
          <YellowBtn onClick={() => navigate("cabinet")}>
            Перейти в кабинет ОмниРМ
          </YellowBtn>
        </div>
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

      {/* Disconnect confirm popup */}
      {showDisconnectConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white shadow-xl">
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF2F2]">
                <Unplug className="h-6 w-6 text-[#DC2626]" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#1A1D29]">Отключить ОмниРМ?</h2>
              <p className="mt-2 text-sm text-[#6B7280]">Все каналы связи и история обращений будут недоступны. Вы сможете подключить услугу снова.</p>
            </div>
            <div className="px-6 py-4 flex items-center gap-3">
              <OutlineBtn onClick={() => setShowDisconnectConfirm(false)} className="flex-1 justify-center">Отмена</OutlineBtn>
              <button
                onClick={() => { disconnectOmni(); setShowDisconnectConfirm(false); }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B91C1C] transition-colors"
              >
                Отключить
              </button>
            </div>
          </div>
        </div>
      )}
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
        <span className="text-sm font-medium text-[#6B7280]">{kit.price === 0 ? "" : "₽/мес"}</span>
      </div>
      {kit.price === 0 && (
        <p className="text-xs text-[#6B7280]">в тарифе ОАТС</p>
      )}

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
        {kit.agents === "Без ИИ-агентов" ? (
          <div className="rounded-lg bg-[#FEF3C7] border border-[#FDE68A] px-3 py-2">
            <p className="text-xs font-medium text-[#92400E]">Тариф без ИИ-агентов</p>
            <p className="mt-0.5 text-[11px] text-[#A16207] leading-snug">
              Позволяет использовать ОмниРМ для одного сотрудника. Для раскрытия всех возможностей ОмниРМ выбирайте тарифы с ИИ-агентами.
            </p>
          </div>
        ) : (
          <p>{kit.agents}</p>
        )}
        {kit.overage && <p>Сверх: {kit.overage.replace("Сверх: ", "")}</p>}
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

  /* Auto-select Соло on first mount if nothing selected */
  useEffect(() => {
    if (!selectedKitId) selectKit("solo");
  }, []);

  /* ── Employee popup state ── */
  const [showEmpPopup, setShowEmpPopup] = useState(false);
  const [checkedEmps, setCheckedEmps] = useState<Set<number>>(new Set());

  const selectedKit = KITS.find((k) => k.id === selectedKitId) ?? null;
  const separate = selectedKit ? SEPARATE_PRICES[selectedKit.id] : null;
  const savings = separate ? separate.omnirm + separate.agents - selectedKit.price : 0;

  /* operator cost calculations */
  const kitIncludedOps = selectedKit ? selectedKit.operatorCount : 0;
  const selectedOpCount = checkedEmps.size > 0 ? checkedEmps.size : kitIncludedOps;
  const extraOps = Math.max(0, selectedOpCount - kitIncludedOps);
  const extraOpsCost = extraOps * ADDITIONAL_OPERATOR_PRICE;

  const toggleEmp = (idx: number) => {
    setCheckedEmps((prev) => {
      const next = new Set(prev);
      /* Соло — only 1 operator: radio-like behavior */
      if (selectedKitId === "solo") {
        if (next.has(idx)) {
          next.delete(idx);
        } else {
          next.clear();
          next.add(idx);
        }
      } else {
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
      }
      return next;
    });
  };

  const handleConnect = () => {
    if (!agree1 || !agree2) {
      setAlertShown(true);
      return;
    }
    setAlertShown(false);
    if (!selectedKit) return;

    /* If employees not yet chosen → open popup */
    if (checkedEmps.size === 0) {
      setShowEmpPopup(true);
      return;
    }

    /* Proceed to connection */
    const empNames = Array.from(checkedEmps).map((i) => MOCK_EMPLOYEES[i]);
    connect(selectedKit.omnirmPlan, selectedKit.agentsPlan || null, selectedOpCount, empNames);
    navigate("confirm");
  };

  /* Popup: extra-ops info */
  const popupExtra = Math.max(0, checkedEmps.size - kitIncludedOps);
  const popupExtraCost = popupExtra * ADDITIONAL_OPERATOR_PRICE;

  /* ── Better kit suggestion ── */
  const currentTotal = selectedKit ? selectedKit.price + extraOpsCost : 0;
  const betterKit = (() => {
    if (!selectedKit || checkedEmps.size === 0) return null;
    const kitIndex = KITS.findIndex((k) => k.id === selectedKit.id);
    // Check all more expensive kits
    for (let i = kitIndex + 1; i < KITS.length; i++) {
      const nextKit = KITS[i];
      const nextExtra = Math.max(0, selectedOpCount - nextKit.operatorCount);
      const nextTotal = nextKit.price + nextExtra * ADDITIONAL_OPERATOR_PRICE;
      // Suggest if: next kit is cheaper OR within 15% but gives more value (ИИ-агенты, more ops)
      if (nextTotal <= currentTotal || (nextTotal <= currentTotal * 1.15 && nextKit.operatorCount > selectedKit.operatorCount)) {
        return { kit: nextKit, total: nextTotal, savings: currentTotal - nextTotal };
      }
    }
    return null;
  })();

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

          {/* Employee selection section */}
          {selectedKit && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#1A1D29]">
                  Сотрудники для ОмниРМ
                </h2>
                <button
                  onClick={() => setShowEmpPopup(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#EEF2FF] px-3 py-2 text-sm font-medium text-[#4F46E5] hover:bg-[#E0E7FF] transition-colors"
                >
                  <Users className="h-4 w-4" />
                  {checkedEmps.size > 0 ? "Изменить" : "Выбрать сотрудников"}
                </button>
              </div>
              {checkedEmps.size > 0 ? (
                <>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    Выбрано {checkedEmps.size} {checkedEmps.size === 1 ? "сотрудник" : checkedEmps.size < 5 ? "сотрудника" : "сотрудников"} из {MOCK_EMPLOYEES.length}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {Array.from(checkedEmps).map((idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-full bg-[#EEF2FF] px-2.5 py-1 text-xs font-medium text-[#4F46E5]"
                      >
                        {MOCK_EMPLOYEES[idx]}
                      </span>
                    ))}
                  </div>
                  {extraOps > 0 && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FEF3C7] px-3 py-2.5 text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0 text-[#92400E]" />
                      <span className="text-[#92400E]">
                        Каждый следующий оператор стоит {fmtPrice(ADDITIONAL_OPERATOR_PRICE)}/мес.
                        {" "}Доп. операторы: {extraOps} × {fmtPrice(ADDITIONAL_OPERATOR_PRICE)} = {fmtPrice(extraOpsCost)}/мес
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-1 text-sm text-[#6B7280]">
                  Выберите сотрудников, которым будет подключена ОмниРМ
                </p>
              )}
            </div>
          )}

          {/* Better kit suggestion banner */}
          {betterKit && (
            <div className="rounded-2xl border border-[#C026D3]/30 bg-gradient-to-r from-[#FDF4FF] to-[#FAF5FF] p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C026D3]/10">
                  <Sparkles className="h-5 w-5 text-[#C026D3]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1D29]">
                    Комплект «{betterKit.kit.name}» выгоднее!
                  </p>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    С {selectedOpCount} {selectedOpCount === 1 ? "оператором" : selectedOpCount < 5 ? "операторами" : "операторами"} вы платите {fmtPrice(currentTotal)}/мес,
                    а комплект «{betterKit.kit.name}» — {fmtPrice(betterKit.total)}/мес
                    {betterKit.savings > 0 && <> (экономия {fmtPrice(betterKit.savings)}/мес)</>}
                    {betterKit.kit.agents !== "Без ИИ-агентов" && <> + ИИ-агенты в комплекте</>}
                  </p>
                  <Button
                    size="sm"
                    className="mt-3 bg-[#C026D3] text-white hover:bg-[#A020A0] border-[#C026D3]"
                    onClick={() => selectKit(betterKit.kit.id)}
                  >
                    Перейти на «{betterKit.kit.name}»
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Checkout sidebar */}
        <div className="w-full md:w-72 shrink-0">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1A1D29]">Ваш выбор</h3>
            {selectedKit ? (
              <div className="mt-3 space-y-2 text-sm text-[#6B7280]">
                <p className="font-medium text-[#1A1D29]">{selectedKit.name}</p>
                <p>{selectedKit.operators}</p>
                {selectedKit.agents === "Без ИИ-агентов" ? (
                  <div className="rounded-lg bg-[#FEF3C7] border border-[#FDE68A] px-2.5 py-1.5">
                    <p className="text-[11px] font-medium text-[#92400E]">Тариф без ИИ-агентов</p>
                    <p className="mt-0.5 text-[10px] text-[#A16207] leading-snug">Позволяет использовать ОмниРМ для одного сотрудника. Для раскрытия всех возможностей выбирайте тарифы с ИИ-агентами.</p>
                  </div>
                ) : (
                  <p>{selectedKit.agents}</p>
                )}
                <p className="font-medium text-[#1A1D29]">{selectedKit.pkg}</p>
                {savings > 0 && (
                  <p className="text-[#1E9E4A] font-medium">
                    Экономия {fmtPrice(savings)}/мес
                  </p>
                )}
                {/* Selected employees */}
                {checkedEmps.size > 0 && (
                  <div className="border-t border-[#E5E7EB] pt-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#1A1D29]">
                        Сотрудники ({checkedEmps.size})
                      </p>
                      <button
                        onClick={() => setShowEmpPopup(true)}
                        className="text-xs font-medium text-[#4F46E5] hover:underline"
                      >
                        Изменить
                      </button>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {Array.from(checkedEmps).slice(0, 5).map((idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-full bg-[#EEF2FF] px-2 py-0.5 text-xs font-medium text-[#4F46E5]"
                        >
                          {MOCK_EMPLOYEES[idx]}
                        </span>
                      ))}
                      {checkedEmps.size > 5 && (
                        <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-2 py-0.5 text-xs font-medium text-[#4F46E5]">
                          +{checkedEmps.size - 5}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {extraOps > 0 && (
                  <p className="text-xs text-[#92400E]">
                    Доп. операторы: +{fmtPrice(extraOpsCost)}/мес
                  </p>
                )}
                <div className="border-t border-[#E5E7EB] pt-2">
                  <p className="text-base font-bold text-[#1A1D29]">
                    {fmtPrice(selectedKit.price + extraOpsCost)}/мес
                  </p>
                </div>
                {/* Better option suggestion in sidebar */}
                {betterKit && (
                  <div className="mt-3 rounded-xl bg-gradient-to-r from-[#FDF4FF] to-[#FAF5FF] p-3 border border-[#C026D3]/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 shrink-0 text-[#C026D3] mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-[#1A1D29]">
                          «{betterKit.kit.name}» выгоднее
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#6B7280] leading-tight">
                          {fmtPrice(betterKit.total)}/мес
                          {betterKit.savings > 0 && <> — экономия {fmtPrice(betterKit.savings)}/мес</>}
                          {betterKit.kit.agents !== "Без ИИ-агентов" && <> + ИИ-агенты</>}
                        </p>
                        <button
                          onClick={() => selectKit(betterKit.kit.id)}
                          className="mt-1.5 text-[11px] font-semibold text-[#C026D3] hover:underline"
                        >
                          Перейти на «{betterKit.kit.name}» →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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

      {/* ═══ Employee selection popup ═══ */}
      {showEmpPopup && selectedKit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#1A1D29]">Сотрудники для ОмниРМ</h2>
                <p className="mt-0.5 text-sm text-[#6B7280]">
                  Выберите сотрудников, которым будет подключена ОмниРМ
                </p>
              </div>
              <button
                onClick={() => setShowEmpPopup(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1D29] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tariff info */}
            <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg bg-[#F7F7FA] px-3 py-2 text-sm text-[#6B7280]">
              <Monitor className="h-4 w-4 shrink-0 text-[#4F46E5]" />
              <span>Комплект «{selectedKit.name}» — включено {kitIncludedOps} {kitIncludedOps === 1 ? "оператор" : "операторов"}</span>
            </div>

            {/* Informer for extra cost */}
            {popupExtra > 0 && (
              <div className="mx-6 mt-2 flex items-center gap-2 rounded-lg bg-[#FEF3C7] px-3 py-2.5 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-[#92400E]" />
                <span className="text-[#92400E]">
                  Каждый следующий оператор стоит {fmtPrice(ADDITIONAL_OPERATOR_PRICE)}/мес.
                  {" "}(+{fmtPrice(popupExtraCost)} за {popupExtra} доп.)
                </span>
              </div>
            )}

            {/* Search / select all */}
            <div className="mx-6 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-3 py-2 w-56">
                <Search className="h-4 w-4 text-[#9CA3AF]" />
                <span className="text-sm text-[#9CA3AF]">Поиск сотрудника</span>
              </div>
              <button
                onClick={() => {
                  if (checkedEmps.size === MOCK_EMPLOYEES.length) {
                    setCheckedEmps(new Set());
                  } else {
                    setCheckedEmps(new Set(MOCK_EMPLOYEES.keys()));
                  }
                }}
                className="text-sm font-medium text-[#4F46E5] hover:underline"
              >
                {checkedEmps.size === MOCK_EMPLOYEES.length ? "Снять все" : "Выбрать все"}
              </button>
            </div>

            {/* Employee list */}
            <div className="mx-6 mt-3 max-h-64 overflow-y-auto space-y-0.5">
              {MOCK_EMPLOYEES.map((name, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-[#F7F7FA] transition-colors"
                >
                  <Checkbox
                    checked={checkedEmps.has(idx)}
                    onCheckedChange={() => toggleEmp(idx)}
                  />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
                    {name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <span className="text-sm font-medium text-[#1A1D29]">{name}</span>
                </label>
              ))}
            </div>

            {/* Footer: count + confirm */}
            <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-[#6B7280]">
                Выбрано: <span className="font-semibold text-[#1A1D29]">{checkedEmps.size}</span> из {MOCK_EMPLOYEES.length}
              </div>
              <div className="flex items-center gap-3">
                <OutlineBtn onClick={() => setShowEmpPopup(false)}>
                  Отмена
                </OutlineBtn>
                <YellowBtn
                  onClick={() => {
                    if (checkedEmps.size === 0) return;
                    if (!selectedKit) return;
                    const empNames = Array.from(checkedEmps).map((i) => MOCK_EMPLOYEES[i]);
                    const opCount = checkedEmps.size > 0 ? checkedEmps.size : kitIncludedOps;
                    connect(selectedKit.omnirmPlan, selectedKit.agentsPlan || null, opCount, empNames);
                    setShowEmpPopup(false);
                    navigate("confirm");
                  }}
                  disabled={checkedEmps.size === 0}
                >
                  Выбрать
                </YellowBtn>
              </div>
            </div>
          </div>
        </div>
      )}
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

/* ── Mock employees list ── */
const MOCK_EMPLOYEES = [
  "Алексей Иванов", "Мария Петрова", "Дмитрий Сидоров", "Елена Козлова",
  "Сергей Новиков", "Анна Морозова", "Игорь Волков", "Ольга Лебедева",
  "Павел Соколов", "Наталья Зайцева", "Андрей Кузнецов", "Татьяна Попова",
  "Максим Васильев", "Юлия Михайлова", "Виктор Фёдоров", "Екатерина Андреева",
  "Артём Семёнов", "Валерия Николаева", "Роман Егоров", "Светлана Павлова",
  "Кирилл Тарасов", "Людмила Белова", "Геннадий Комаров", "Ирина Орлова",
  "Владимир Киселёв",
];

function ConstructorScreen() {
  const {
    navigate,
    selectedOmniPlanId,
    selectedAgentsPlanId,
    selectOmniPlan,
    selectAgentsPlan,
    selectKit,
    selectedOperatorCount,
    setOperatorCount,
    agree3,
    agree4,
    setAgree,
    connect,
  } = useAppStore();
  const [alertShown, setAlertShown] = useState(false);

  /* Auto-select Соло (without ИИ-агенты) on first mount if nothing selected */
  useEffect(() => {
    if (!selectedOmniPlanId) {
      selectOmniPlan("solo");
      setOperatorCount(1);
    }
  }, []);

  /* ── Employee popup state ── */
  const [showEmpPopup, setShowEmpPopup] = useState(false);
  const [checkedEmps, setCheckedEmps] = useState<Set<number>>(new Set());

  const omniPlan = findPlan(OMNIRM_PLANS, selectedOmniPlanId);
  const agentsPlan = findPlan(AGENTS_PLANS, selectedAgentsPlanId);
  const hasOmni = !!selectedOmniPlanId;
  const includedOps = getOperatorCount(selectedOmniPlanId);
  const opCount = hasOmni ? (checkedEmps.size > 0 ? checkedEmps.size : selectedOperatorCount) : 0;
  const extraOps = hasOmni ? Math.max(0, opCount - includedOps) : 0;
  const extraOpsCost = extraOps * ADDITIONAL_OPERATOR_PRICE;
  const baseTotal = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0);
  const total = baseTotal + extraOpsCost;

  /* find matching kit */
  const matchingKit = KITS.find(
    (k) =>
      k.omnirmPlan === selectedOmniPlanId &&
      k.agentsPlan === selectedAgentsPlanId
  );

  const hasAnySelection = selectedOmniPlanId || selectedAgentsPlanId;

  const toggleEmp = (idx: number) => {
    setCheckedEmps((prev) => {
      const next = new Set(prev);
      /* Соло — only 1 operator: radio-like behavior */
      if (selectedOmniPlanId === "solo") {
        if (next.has(idx)) {
          next.delete(idx);
        } else {
          next.clear();
          next.add(idx);
        }
      } else {
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
      }
      return next;
    });
  };

  const handleConnect = () => {
    if (!agree3 || !agree4) {
      setAlertShown(true);
      return;
    }
    setAlertShown(false);
    if (!hasAnySelection) return;

    /* If ОмниРМ selected and employees not yet chosen → open popup */
    if (hasOmni && checkedEmps.size === 0) {
      setShowEmpPopup(true);
      return;
    }

    /* Proceed to connection */
    const empNames = Array.from(checkedEmps).map((i) => MOCK_EMPLOYEES[i]);
    connect(
      selectedOmniPlanId ?? null,
      selectedAgentsPlanId ?? null,
      hasOmni ? opCount : 0,
      empNames
    );
    navigate("confirm");
  };

  /* Popup: extra-ops info */
  const popupExtra = Math.max(0, checkedEmps.size - includedOps);
  const popupExtraCost = popupExtra * ADDITIONAL_OPERATOR_PRICE;

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
                  onSelect={() => {
                    selectOmniPlan(p.id);
                    setOperatorCount(p.includedOperators ?? 1);
                  }}
                />
              ))}
              <NoneCard
                label="Не нужна"
                selected={selectedOmniPlanId === null}
                onSelect={() => selectOmniPlan(null)}
              />
            </div>
          </div>

          {/* ИИ-агенты plans */}
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

          {/* Show selected employees summary (after popup) */}
          {hasOmni && checkedEmps.size > 0 && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#1A1D29]">
                  Сотрудники для ОмниРМ ({checkedEmps.size})
                </h2>
                <button
                  onClick={() => setShowEmpPopup(true)}
                  className="text-sm font-medium text-[#4F46E5] hover:underline"
                >
                  Изменить
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Array.from(checkedEmps).map((idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-full bg-[#EEF2FF] px-2.5 py-1 text-xs font-medium text-[#4F46E5]"
                  >
                    {MOCK_EMPLOYEES[idx]}
                  </span>
                ))}
              </div>
              {extraOps > 0 && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FEF3C7] px-3 py-2.5 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0 text-[#92400E]" />
                  <span className="text-[#92400E]">
                    Каждый следующий оператор стоит {fmtPrice(ADDITIONAL_OPERATOR_PRICE)}/мес.
                    {" "}Доп. операторы: {extraOps} × {fmtPrice(ADDITIONAL_OPERATOR_PRICE)} = {fmtPrice(extraOpsCost)}/мес
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Checkout sidebar */}
        <div className="w-full md:w-72 shrink-0">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1A1D29]">Ваш выбор</h3>
            <div className="mt-3 space-y-2 text-sm text-[#6B7280]">
              {omniPlan ? (
                <>
                  <p>ОмниРМ: <span className="font-medium text-[#1A1D29]">{omniPlan.name} — {omniPlan.priceLabel}</span></p>
                  {hasOmni && checkedEmps.size > 0 && (
                    <p className="pl-2">Сотрудников: <span className="font-medium text-[#1A1D29]">{checkedEmps.size}</span></p>
                  )}
                  {extraOps > 0 && (
                    <p className="pl-2 text-[#92400E]">Доп. операторы: +{fmtPrice(extraOpsCost)}/мес</p>
                  )}
                </>
              ) : (
                <p>ОмниРМ: <span className="text-[#9CA3AF]">не выбрана</span></p>
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
            {matchingKit && !extraOps && (
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
            disabled={!hasAnySelection}
          >
            Подключить
          </YellowBtn>
        </div>
      </div>

      {/* ═══ Employee selection popup ═══ */}
      {showEmpPopup && hasOmni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#1A1D29]">Сотрудники для ОмниРМ</h2>
                <p className="mt-0.5 text-sm text-[#6B7280]">
                  Выберите сотрудников, которым будет подключена ОмниРМ
                </p>
              </div>
              <button
                onClick={() => setShowEmpPopup(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1D29] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tariff info */}
            <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg bg-[#F7F7FA] px-3 py-2 text-sm text-[#6B7280]">
              <Monitor className="h-4 w-4 shrink-0 text-[#4F46E5]" />
              <span>Тариф «{omniPlan?.name}» — включено {includedOps} {includedOps === 1 ? "оператор" : "операторов"}</span>
            </div>

            {/* Informer for extra cost */}
            {popupExtra > 0 && (
              <div className="mx-6 mt-2 flex items-center gap-2 rounded-lg bg-[#FEF3C7] px-3 py-2.5 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-[#92400E]" />
                <span className="text-[#92400E]">
                  Каждый следующий оператор стоит {fmtPrice(ADDITIONAL_OPERATOR_PRICE)}/мес.
                  {" "}(+{fmtPrice(popupExtraCost)} за {popupExtra} доп.)
                </span>
              </div>
            )}

            {/* Search / select all */}
            <div className="mx-6 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-3 py-2 w-56">
                <Search className="h-4 w-4 text-[#9CA3AF]" />
                <span className="text-sm text-[#9CA3AF]">Поиск сотрудника</span>
              </div>
              <button
                onClick={() => {
                  if (checkedEmps.size === MOCK_EMPLOYEES.length) {
                    setCheckedEmps(new Set());
                  } else {
                    setCheckedEmps(new Set(MOCK_EMPLOYEES.keys()));
                  }
                }}
                className="text-sm font-medium text-[#4F46E5] hover:underline"
              >
                {checkedEmps.size === MOCK_EMPLOYEES.length ? "Снять все" : "Выбрать все"}
              </button>
            </div>

            {/* Employee list */}
            <div className="mx-6 mt-3 max-h-64 overflow-y-auto space-y-0.5">
              {MOCK_EMPLOYEES.map((name, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-[#F7F7FA] transition-colors"
                >
                  <Checkbox
                    checked={checkedEmps.has(idx)}
                    onCheckedChange={() => toggleEmp(idx)}
                  />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
                    {name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <span className="text-sm font-medium text-[#1A1D29]">{name}</span>
                </label>
              ))}
            </div>

            {/* Footer: count + confirm */}
            <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-[#6B7280]">
                Выбрано: <span className="font-semibold text-[#1A1D29]">{checkedEmps.size}</span> из {MOCK_EMPLOYEES.length}
              </div>
              <div className="flex items-center gap-3">
                <OutlineBtn onClick={() => setShowEmpPopup(false)}>
                  Отмена
                </OutlineBtn>
                <YellowBtn
                  onClick={() => {
                    if (checkedEmps.size === 0) return;
                    setOperatorCount(checkedEmps.size);
                    const empNames = Array.from(checkedEmps).map((i) => MOCK_EMPLOYEES[i]);
                    connect(
                      selectedOmniPlanId ?? null,
                      selectedAgentsPlanId ?? null,
                      checkedEmps.size,
                      empNames
                    );
                    setShowEmpPopup(false);
                    navigate("confirm");
                  }}
                  disabled={checkedEmps.size === 0}
                >
                  Выбрать
                </YellowBtn>
              </div>
            </div>
          </div>
        </div>
      )}
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
    connectedOperatorCount,
    connectedEmployeeNames,
  } = useAppStore();

  const omniPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const kit = KITS.find((k) => k.id === selectedKitId) ?? null;
  const extraOpsCost = getAdditionalOpsCost(connectedOmniPlan, connectedOperatorCount);
  const totalCost = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0) + extraOpsCost;

  const goToCabinet = () => {
    navigate("transition");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F7FA] px-6 py-8">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF7EE]">
          <CircleCheckBig className="h-8 w-8 text-[#1E9E4A]" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-[#1A1D29]">Услуга подключена</h1>

        <div className="mt-6 space-y-3 text-left text-sm text-[#6B7280]">
          {kit ? (
            <>
              <p>Комплект: <span className="font-semibold text-[#1A1D29]">{kit.name}</span></p>
              <p>{kit.operators}</p>
              {kit.agents === "Без ИИ-агентов" ? (
                <div className="rounded-lg bg-[#FEF3C7] border border-[#FDE68A] px-3 py-2">
                  <p className="text-xs font-medium text-[#92400E]">Тариф без ИИ-агентов</p>
                  <p className="mt-0.5 text-[11px] text-[#A16207] leading-snug">Позволяет использовать ОмниРМ для одного сотрудника. Для раскрытия всех возможностей ОмниРМ выбирайте тарифы с ИИ-агентами.</p>
                </div>
              ) : (
                <p>{kit.agents}</p>
              )}
            </>
          ) : (
            <>
              {omniPlan && (
                <div className="rounded-lg bg-[#F7F7FA] p-3">
                  <p className="font-semibold text-[#1A1D29]">ОмниРМ: {omniPlan.name}</p>
                  <p className="text-xs text-[#6B7280]">{omniPlan.priceLabel}</p>
                </div>
              )}
              {agentsPlan && (
                <div className="rounded-lg bg-[#F7F7FA] p-3">
                  <p className="font-semibold text-[#1A1D29]">ИИ-агенты: {agentsPlan.name}</p>
                  <p className="text-xs text-[#6B7280]">{agentsPlan.priceLabel}</p>
                  {agentsPlan.minutes && agentsPlan.requests && (
                    <p className="text-xs text-[#6B7280]">{agentsPlan.minutes} мин · {agentsPlan.requests} обращений</p>
                  )}
                  {agentsPlan.overMinute != null && agentsPlan.overRequest != null && (
                    <p className="text-xs text-[#6B7280]">Сверх: {agentsPlan.overMinute} ₽/мин · {agentsPlan.overRequest} ₽/обр</p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Selected employees */}
          {connectedEmployeeNames.length > 0 && (
            <div className="rounded-lg border border-[#E5E7EB] p-3">
              <p className="font-semibold text-[#1A1D29]">
                Сотрудники ({connectedEmployeeNames.length})
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {connectedEmployeeNames.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1 rounded-full bg-[#EEF2FF] px-2.5 py-1 text-xs font-medium text-[#4F46E5]"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[#E5E7EB] pt-3">
            <p className="text-base font-bold text-[#1A1D29]">{fmtPrice(totalCost)}/мес</p>
            {extraOpsCost > 0 && (
              <p className="text-xs text-[#92400E]">Включая доп. операторы: +{fmtPrice(extraOpsCost)}/мес</p>
            )}
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
    connectedOperatorCount,
    omnirmBlocked,
    disconnectOmni,
    toggleOmniBlock,
  } = useAppStore();

  const omniPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = connectedOperatorCount > 0 ? connectedOperatorCount : getOperatorCount(connectedOmniPlan);
  const extraOpsCost = getAdditionalOpsCost(connectedOmniPlan, connectedOperatorCount);
  const totalCost = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0) + extraOpsCost;

  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  /* Mock usage stats */
  const usedMinutes = 187;
  const totalMinutes = agentsPlan?.minutes ?? 300;
  const remainingMinutes = Math.max(0, totalMinutes - usedMinutes);
  const usedRequests = 142;
  const usedSms = 38;
  const fmtNum = (n: number) => n.toLocaleString("ru-RU");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1117] to-[#1A1D29] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          <Monitor className="h-6 w-6 text-[#FFDD5B]" />
          <span className="text-lg font-bold">ОмниРМ</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <UsersRound className="h-4 w-4" />
            Администратор
          </div>
          {/* Disconnect button */}
          <button
            onClick={() => setShowDisconnectConfirm(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#9CA3AF] hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors"
            title="Отключить ОмниРМ"
          >
            <Unplug className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-8 md:px-10">
        <h1 className="text-3xl font-bold">Кабинет ОмниРМ</h1>
        <p className="mt-2 text-[#9CA3AF]">Управление подключенными сервисами</p>

        {/* Blocked alert */}
        {omnirmBlocked && (
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
            <Ban className="h-5 w-5 shrink-0 mt-0.5 text-red-400" />
            <div>
              <p className="text-sm font-semibold text-red-400">Услуга заблокирована</p>
              <p className="text-xs text-red-400/80">Работа ОмниРМ приостановлена — лимит минут на текущий месяц исчерпан. Для возобновления работы пополните баланс или дождитесь начала следующего расчётного периода.</p>
              <button
                onClick={() => toggleOmniBlock(false)}
                className="mt-2 text-xs font-medium text-[#FFDD5B] hover:underline"
              >
                Вернуть работу сервиса
              </button>
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="mt-4">
          {omnirmBlocked ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-medium text-red-400">
              <Ban className="h-3 w-3" /> Заблокирована
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
              <Check className="h-3 w-3" /> Подключено
            </span>
          )}
        </div>

        {/* 2x2 grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
            {extraOpsCost > 0 && (
              <p className="text-xs text-[#9CA3AF]">Доп. операторы: +{fmtPrice(extraOpsCost)} ₽/мес</p>
            )}
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <UserCog className="h-4 w-4" />
              <span className="text-xs font-medium">Операторов</span>
            </div>
            <p className="mt-2 text-xl font-bold">{ops}</p>
            <p className="text-sm text-[#9CA3AF]">Подключено</p>
          </div>
        </div>

        {/* Usage statistics */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className={`rounded-xl p-4 ${omnirmBlocked ? "bg-red-500/10 border border-red-500/20" : "bg-white/5"}`}>
            <div className={`flex items-center gap-2 ${omnirmBlocked ? "text-red-400" : "text-blue-400"}`}>
              <Timer className="h-4 w-4" />
              <span className="text-2xl font-bold">{omnirmBlocked ? "0" : fmtNum(remainingMinutes)}</span>
            </div>
            <p className={`mt-1 text-xs ${omnirmBlocked ? "text-red-400/70" : "text-[#9CA3AF]"}`}>минут осталось</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Phone className="h-4 w-4" />
              <span className="text-2xl font-bold">{fmtNum(usedRequests)}</span>
            </div>
            <p className="mt-1 text-xs text-[#9CA3AF]">обращений</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <MessageSquare className="h-4 w-4" />
              <span className="text-2xl font-bold">{fmtNum(usedSms)}</span>
            </div>
            <p className="mt-1 text-xs text-[#9CA3AF]">СМС отправлено</p>
          </div>
        </div>
        {!omnirmBlocked && (
          <button
            onClick={() => toggleOmniBlock(true)}
            className="mt-3 text-xs font-medium text-[#9CA3AF] hover:text-red-400 transition-colors underline decoration-dashed underline-offset-2"
          >
            Посмотреть, что будет, когда минуты закончатся
          </button>
        )}

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

      {/* Disconnect confirm popup */}
      {showDisconnectConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-[#1A1D29] border border-white/10 shadow-xl">
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                <Unplug className="h-6 w-6 text-red-400" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-white">Отключить ОмниРМ?</h2>
              <p className="mt-2 text-sm text-[#9CA3AF]">Все каналы связи и история обращений будут недоступны. Вы сможете подключить услугу снова.</p>
            </div>
            <div className="px-6 py-4 flex items-center gap-3">
              <OutlineBtn onClick={() => setShowDisconnectConfirm(false)} className="flex-1 justify-center">Отмена</OutlineBtn>
              <button
                onClick={() => { disconnectOmni(); setShowDisconnectConfirm(false); }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
              >
                Отключить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   10. SERVICE CARD (ОмниРМ подключен)
   ═══════════════════════════════════════════ */

/* ─── OmniRmAdminCard: extracted component with all new features ─── */
function OmniRmAdminCard({
  ops,
  totalCost,
  extraOpsCost,
  kit,
  omniPlan,
  agentsPlan,
  omnirmBlocked,
  navigate,
  disconnectOmni,
  toggleOmniBlock,
  connectedEmployeeNames,
}: {
  ops: number;
  totalCost: number;
  extraOpsCost: number;
  kit: Kit | undefined;
  omniPlan: TariffPlan | null;
  agentsPlan: TariffPlan | null;
  omnirmBlocked: boolean;
  navigate: (s: Screen) => void;
  disconnectOmni: () => void;
  toggleOmniBlock: (b: boolean) => void;
  connectedEmployeeNames: string[];
}) {
  const fmtNum = (n: number) => n.toLocaleString("ru-RU");

  /* Popups */
  const [showEmpPopup, setShowEmpPopup] = useState(false);
  const [showTariffPopup, setShowTariffPopup] = useState(false);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  /* Employee selection state */
  const initialChecked = new Set<number>();
  connectedEmployeeNames.forEach((name) => {
    const idx = MOCK_EMPLOYEE_DETAILS.findIndex((e) => e.name === name);
    if (idx >= 0) initialChecked.add(idx);
  });
  const [checkedEmps, setCheckedEmps] = useState<Set<number>>(initialChecked);

  const toggleEmp = (idx: number) => {
    setCheckedEmps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  /* Mock usage stats */
  const usedMinutes = 187;
  const totalMinutes = agentsPlan?.minutes ?? 300;
  const remainingMinutes = Math.max(0, totalMinutes - usedMinutes);
  const totalRequests = agentsPlan?.requests ?? 300;
  const usedRequests = 142;
  const usedSms = 38;

  const tariffName = kit?.name ?? (omniPlan?.name ?? "—");

  return (
    <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      {/* Blocked alert */}
      {omnirmBlocked && (
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] px-4 py-3">
          <Ban className="h-5 w-5 shrink-0 text-[#DC2626]" />
          <div>
            <p className="text-sm font-semibold text-[#DC2626]">Услуга заблокирована</p>
            <p className="text-xs text-[#991B1B]">Работа ОмниРМ приостановлена — лимит минут на текущий месяц исчерпан. Для возобновления работы пополните баланс или дождитесь начала следующего расчётного периода.</p>
          </div>
        </div>
      )}

      {/* Badges row */}
      <div className="flex items-center gap-2">
        {omnirmBlocked ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DC2626] px-2.5 py-1 text-xs font-medium text-white">
            <Ban className="h-3 w-3" /> Заблокирована
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E] px-2.5 py-1 text-xs font-medium text-white">
            <Check className="h-3 w-3" /> Подключено
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A855F7] px-2.5 py-1 text-xs font-medium text-white">
          <Zap className="h-3 w-3" /> Новый сервис
        </span>
      </div>

      {/* Main info row */}
      <div className="mt-5 flex flex-wrap items-center gap-6 md:gap-10">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#3B82F6]">
            <UsersRound className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-[#111827]">ОмниРМ</span>
        </div>

        {/* Price block — no pencil */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-[#111827]">{fmtNum(totalCost)} ₽</span>
          <span className="text-xs text-[#6B7280]">в месяц</span>
          {extraOpsCost > 0 && (
            <span className="text-xs text-[#6B7280]">(+{fmtPrice(extraOpsCost)} доп. операторы)</span>
          )}
        </div>

        {/* Employees block — pencil moved to right, "Подключено" instead of "Доступно" */}
        <div className="flex items-center gap-2">
          <div>
            <p className="font-medium text-[#374151]">{ops} сотрудников</p>
            <p className="text-xs text-[#6B7280]">Подключено</p>
          </div>
          <button
            onClick={() => setShowEmpPopup(true)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#D1D5DB] text-[#6B7280] hover:bg-[#F3F4F6]"
            title="Редактировать сотрудников"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        {/* Tariff block — eye icon moved to right */}
        <div className="flex items-center gap-2">
          <div>
            <p className="font-semibold text-[#111827]">{tariffName}</p>
            <p className="text-xs text-[#6B7280]">тариф</p>
          </div>
          <button
            onClick={() => setShowTariffPopup(true)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#D1D5DB] text-[#6B7280] hover:bg-[#F3F4F6]"
            title="Посмотреть тариф"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Disconnect button (square, crossed plug) + CTA */}
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setShowDisconnectConfirm(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#DC2626] hover:border-[#FECACA] transition-colors"
            title="Отключить ОмниРМ"
          >
            <Unplug className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate("cabinet")}
            className="rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1F2937]"
          >
            Перейти в ОмниРМ
          </button>
        </div>
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

      {/* ─── Usage statistics ─── */}
      {!omnirmBlocked && (
        <div className="mt-5 w-full">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-[#F7F7FA] px-4 py-3">
              <div className="flex items-center gap-2 text-[#2563EB]">
                <Timer className="h-4 w-4" />
                <span className="text-lg font-bold">{fmtNum(remainingMinutes)}</span>
              </div>
              <p className="mt-0.5 text-xs text-[#6B7280]">минут осталось в этом месяце</p>
            </div>
            <div className="rounded-xl bg-[#F7F7FA] px-4 py-3">
              <div className="flex items-center gap-2 text-[#7C3AED]">
                <Phone className="h-4 w-4" />
                <span className="text-lg font-bold">{fmtNum(usedRequests)}</span>
              </div>
              <p className="mt-0.5 text-xs text-[#6B7280]">обращений</p>
            </div>
            <div className="rounded-xl bg-[#F7F7FA] px-4 py-3">
              <div className="flex items-center gap-2 text-[#059669]">
                <MessageSquare className="h-4 w-4" />
                <span className="text-lg font-bold">{fmtNum(usedSms)}</span>
              </div>
              <p className="mt-0.5 text-xs text-[#6B7280]">СМС отправлено</p>
            </div>
          </div>
          <button
            onClick={() => toggleOmniBlock(true)}
            className="mt-3 text-xs font-medium text-[#6B7280] hover:text-[#DC2626] transition-colors underline decoration-dashed underline-offset-2"
          >
            Посмотреть, что будет, когда минуты закончатся
          </button>
        </div>
      )}
      {omnirmBlocked && (
        <div className="mt-5 w-full">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-[#FEF2F2] px-4 py-3 border border-[#FECACA]">
              <div className="flex items-center gap-2 text-[#DC2626]">
                <Timer className="h-4 w-4" />
                <span className="text-lg font-bold">0</span>
              </div>
              <p className="mt-0.5 text-xs text-[#991B1B]">минут осталось</p>
            </div>
            <div className="rounded-xl bg-[#F7F7FA] px-4 py-3">
              <div className="flex items-center gap-2 text-[#7C3AED]">
                <Phone className="h-4 w-4" />
                <span className="text-lg font-bold">{fmtNum(usedRequests)}</span>
              </div>
              <p className="mt-0.5 text-xs text-[#6B7280]">обращений</p>
            </div>
            <div className="rounded-xl bg-[#F7F7FA] px-4 py-3">
              <div className="flex items-center gap-2 text-[#059669]">
                <MessageSquare className="h-4 w-4" />
                <span className="text-lg font-bold">{fmtNum(usedSms)}</span>
              </div>
              <p className="mt-0.5 text-xs text-[#6B7280]">СМС отправлено</p>
            </div>
          </div>
          <button
            onClick={() => toggleOmniBlock(false)}
            className="mt-3 text-xs font-medium text-[#2563EB] hover:underline"
          >
            Вернуть работу сервиса
          </button>
        </div>
      )}

      {/* ─── Employee edit popup ─── */}
      {showEmpPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#1A1D29]">Редактирование сотрудников</h2>
                <p className="mt-0.5 text-sm text-[#6B7280]">Выберите сотрудников, подключённых к ОмниРМ</p>
              </div>
              <button onClick={() => setShowEmpPopup(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1D29]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-6 mt-3 flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-3 py-2">
              <Search className="h-4 w-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#9CA3AF]">Поиск сотрудника</span>
            </div>
            <div className="mx-6 mt-3 max-h-72 overflow-y-auto space-y-0.5">
              {MOCK_EMPLOYEE_DETAILS.map((emp, idx) => (
                <label key={idx} className="flex items-center gap-3 rounded-lg px-2 py-2.5 cursor-pointer hover:bg-[#F7F7FA] transition-colors">
                  <Checkbox checked={checkedEmps.has(idx)} onCheckedChange={() => toggleEmp(idx)} />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
                    {emp.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1D29] truncate">{emp.name}</p>
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <Phone className="h-3 w-3 shrink-0" />
                      <span className="truncate">{emp.phone}</span>
                      {emp.department && (
                        <>
                          <span className="text-[#D1D5DB]">·</span>
                          <span className="truncate text-[#7C3AED]">{emp.department}</span>
                        </>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-[#6B7280]">
                Выбрано: <span className="font-semibold text-[#1A1D29]">{checkedEmps.size}</span> из {MOCK_EMPLOYEE_DETAILS.length}
              </div>
              <div className="flex items-center gap-3">
                <OutlineBtn onClick={() => setShowEmpPopup(false)}>Отмена</OutlineBtn>
                <YellowBtn onClick={() => setShowEmpPopup(false)} disabled={checkedEmps.size === 0}>Сохранить</YellowBtn>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Tariff info popup ─── */}
      {showTariffPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <h2 className="text-lg font-bold text-[#1A1D29]">Тариф «{tariffName}»</h2>
              <button onClick={() => setShowTariffPopup(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1D29]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-3">
              {omniPlan && (
                <div>
                  <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">ОмниРМ</p>
                  <p className="mt-1 text-base font-semibold text-[#111827]">{omniPlan.name} — {omniPlan.priceLabel}</p>
                  <ul className="mt-1 space-y-0.5">
                    {omniPlan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-sm text-[#4B5563]">
                        <Check className="h-3.5 w-3.5 text-[#22C55E]" /> {f}
                      </li>
                    ))}
                  </ul>
                  {omniPlan.cons && <p className="mt-1 text-xs text-[#9CA3AF]">{omniPlan.cons}</p>}
                  {omniPlan.footnote && <p className="mt-1 text-xs text-[#6B7280]">{omniPlan.footnote}</p>}
                </div>
              )}
              {agentsPlan && (
                <div className="border-t border-[#E5E7EB] pt-3">
                  <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">ИИ-агенты</p>
                  <p className="mt-1 text-base font-semibold text-[#111827]">{agentsPlan.name} — {agentsPlan.priceLabel}</p>
                  <ul className="mt-1 space-y-0.5">
                    {agentsPlan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-sm text-[#4B5563]">
                        <Check className="h-3.5 w-3.5 text-[#22C55E]" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="border-t border-[#E5E7EB] pt-3">
                <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Итого</p>
                <p className="mt-1 text-xl font-bold text-[#111827]">{fmtPrice(totalCost)}/мес</p>
                {extraOpsCost > 0 && (
                  <p className="text-xs text-[#6B7280]">+{fmtPrice(extraOpsCost)} доп. операторы</p>
                )}
              </div>
            </div>
            <div className="border-t border-[#E5E7EB] px-6 py-4">
              <YellowBtn onClick={() => { setShowTariffPopup(false); navigate("kits"); }} className="w-full justify-center">
                Выбрать другой тариф
              </YellowBtn>
            </div>
          </div>
        </div>
      )}

      {/* ─── Disconnect confirm popup ─── */}
      {showDisconnectConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white shadow-xl">
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF2F2]">
                <Unplug className="h-6 w-6 text-[#DC2626]" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#1A1D29]">Отключить ОмниРМ?</h2>
              <p className="mt-2 text-sm text-[#6B7280]">Все каналы связи и история обращений будут недоступны. Вы сможете подключить услугу снова.</p>
            </div>
            <div className="px-6 py-4 flex items-center gap-3">
              <OutlineBtn onClick={() => setShowDisconnectConfirm(false)} className="flex-1 justify-center">Отмена</OutlineBtn>
              <button
                onClick={() => { disconnectOmni(); setShowDisconnectConfirm(false); }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B91C1C] transition-colors"
              >
                Отключить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCardScreen() {
  const {
    navigate,
    connectedOmniPlan,
    connectedAgentsPlan,
    connectedOperatorCount,
    connectedEmployeeNames,
    omnirmBlocked,
    disconnectOmni,
    toggleOmniBlock,
  } = useAppStore();

  const omniPlan = findPlan(OMNIRM_PLANS, connectedOmniPlan);
  const agentsPlan = findPlan(AGENTS_PLANS, connectedAgentsPlan);
  const ops = connectedOperatorCount > 0 ? connectedOperatorCount : getOperatorCount(connectedOmniPlan);
  const extraOpsCost = getAdditionalOpsCost(connectedOmniPlan, connectedOperatorCount);
  const totalCost = (omniPlan?.price ?? 0) + (agentsPlan?.price ?? 0) + extraOpsCost;
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

  const sidebarTop = [
    { icon: Menu, label: "Меню", active: false },
    { icon: Users, label: "Сотрудники", active: true },
    { icon: Store, label: "Маркетплейс", active: false },
    { icon: BarChart3, label: "Статистика", active: false },
    { icon: FileIcon, label: "Файлы", active: false },
  ];

  const sidebarBottom = [
    { icon: Settings, label: "Настройки", active: false },
    { icon: Clock, label: "История", active: false },
    { icon: HelpCircle, label: "Справка", active: false },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar — with yellow active indicator */}
      <aside className="fixed left-0 top-0 z-10 flex h-full w-[72px] flex-col items-center border-r border-[#E5E7EB] bg-white py-4">
        <div className="flex flex-1 flex-col items-center gap-2">
          {sidebarTop.map((item) => (
            <button
              key={item.label}
              title={item.label}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                item.active
                  ? "text-[#111827]"
                  : "text-[#6B7280] hover:bg-[#F5F5F7] hover:text-[#1A1D29]"
              }`}
            >
              {/* Yellow left indicator for active item */}
              {item.active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[3px] h-5 w-1 rounded-r-full bg-[#FACC15]" />
              )}
              <item.icon className="h-5 w-5" />
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
          {sidebarBottom.map((item) => (
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

      {/* Main area */}
      <main className="ml-[72px] flex-1">
        {/* Header bar — branding + role switcher */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-[#111827]">Билайн</span>
            <span className="text-lg font-bold text-[#F59E0B]">Бизнес</span>
          </div>
          <div className="flex items-center gap-3">
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
            {/* Header right icons */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full text-[#374151] hover:bg-[#F3F4F6] cursor-pointer">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full text-[#374151] hover:bg-[#F3F4F6] cursor-pointer">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#6B7280]">
              <Users className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="px-6 py-6 md:px-8">
          {/* Heading + Search on the same line */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#111827]">Услуги</h1>
            <div className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-3 py-2.5 w-72">
              <Search className="h-5 w-5 text-[#9CA3AF]" />
              <span className="text-sm text-[#111827]">CRM</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex items-center gap-8 border-b border-[#E5E7EB]">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`relative pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.label
                    ? "text-[#111827]"
                    : "text-[#374151] hover:text-[#111827]"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {tab.icon && <Check className="h-3.5 w-3.5" />}
                  {tab.label}
                  <span className={`text-xs ${activeTab === tab.label ? "text-[#6B7280]" : "text-[#9CA3AF]"}`}>({tab.count})</span>
                </span>
                {activeTab === tab.label && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FACC15]" />
                )}
              </button>
            ))}
          </div>

          {/* ─── ADMIN card ─── */}
          {isAdmin && (
            <OmniRmAdminCard
              ops={ops}
              totalCost={totalCost}
              extraOpsCost={extraOpsCost}
              kit={kit}
              omniPlan={omniPlan}
              agentsPlan={agentsPlan}
              omnirmBlocked={omnirmBlocked}
              navigate={navigate}
              disconnectOmni={disconnectOmni}
              toggleOmniBlock={toggleOmniBlock}
              connectedEmployeeNames={connectedEmployeeNames}
            />
          )}

          {/* ─── OPERATOR card ─── */}
          {!isAdmin && (
            <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              {/* Badges row */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E] px-2.5 py-1 text-xs font-medium text-white">
                  <Check className="h-3 w-3" /> Подключено
                </span>
              </div>

              {/* Main info row — no financial data */}
              <div className="mt-5 flex flex-wrap items-center gap-6 md:gap-10">
                {/* Logo + Name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#3B82F6]">
                    <UsersRound className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-bold text-[#111827]">ОмниРМ</span>
                </div>

                {/* Employees block — read-only, no edit */}
                <div>
                  <p className="font-medium text-[#374151]">{ops} сотрудников</p>
                  <p className="text-xs text-[#6B7280]">Подключено</p>
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

          {/* Back link */}
          <div className="mt-6">
            <button
              onClick={() => navigate("vats")}
              className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1A1D29] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Вернуться в АТС
            </button>
          </div>
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
