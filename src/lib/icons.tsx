"use client";

import {
  Heart,
  Wallet,
  Clock,
  Percent,
  Tag,
  RefreshCw,
  Receipt,
  TrendingUp as LucideTrendingUp,
  TrendingDown as LucideTrendingDown,
  Landmark,
  Banknote,
  ClipboardList,
  Gift,
  Home,
  Palmtree,
  BarChart3,
  Flame,
  Scale,
  Droplets,
  Moon,
  Gem,
  Calendar,
  CalendarDays,
  Search,
  Target,
  LayoutGrid,
  Timer,
  PiggyBank,
  Calculator,
  Briefcase,
  FileText,
  Umbrella,
  Link2,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  Heart as PhHeart,
  Wallet as PhWallet,
  Clock as PhClock,
  TrendUp as PhTrendUp,
  CellSignalFull as PhSignal,
  TrendDown as PhTrendDown,
  Bank as PhBank,
  Money as PhMoney,
  ClipboardText as PhClipboard,
  Gift as PhGift,
  House as PhHouse,
  TreePalm as PhPalm,
  ChartBar as PhChart,
  PiggyBank as PhPiggy,
  Calculator as PhCalc,
  Briefcase as PhCase,
  FileText as PhFile,
  Umbrella as PhUmbrella,
  Percent as PhPercent,
  Tag as PhTag,
  ArrowClockwise as PhRefresh,
  Receipt as PhReceipt,
  Flame as PhFlame,
  Scales as PhScales,
  Drop as PhDrop,
  Moon as PhMoon,
  Diamond as PhGem,
  Confetti as PhConfetti,
  User as PhUser,
  Cake as PhCake,
  Calendar as PhCalendar,
  MagnifyingGlass as PhSearch,
  Target as PhTarget,
  SquaresFour as PhGrid,
  Timer as PhTimer,
  Lightning as PhLightning,
  Trash as PhTrash,
  Users as PhUsers,
  Bell as PhBell,
  Coffee as PhCoffee,
  Drop as PhDropPh,
  Books as PhBooks,
  PersonSimpleRun as PhRun,
  FlowerLotus as PhMeditation,
  DeviceMobile as PhMobile,
  Globe as PhGlobe,
  Moped as PhMoped,
  Play as PhPlay,
  Pause as PhPause,
  SmileyWink as PhCigarette,
  Warning as PhWarning,
  Info as PhInfo,
  Lightbulb as PhLightbulb,
  Lock as PhLock,
  SealCheck as PhSealCheck,
  Car as PhCar,
  UsersThree as PhFamily,
  ForkKnife as PhUtensils,
  Television as PhTv,
  Shower as PhShower,
  GenderMale as PhMale,
  GenderFemale as PhFemale,
  Monitor as PhMonitor,
  Heartbeat as PhActivity,
  CreditCard as PhCreditCard,
  FileArrowDown as PhFileArrowDown,
  type Icon as PhIcon
} from "@phosphor-icons/react";
import { ReactNode } from "react";

// Mapeo de identificadores a iconos de lucide
export const iconMap: Record<string, LucideIcon> = {
  // Pilares
  heart: Heart,
  wallet: Wallet,
  clock: Clock,

  // Herramientas
  percent: Percent,
  tag: Tag,
  refresh: RefreshCw,
  receipt: Receipt,

  // Finanzas
  "trending-up": LucideTrendingUp,
  "trending-down": LucideTrendingDown,
  landmark: Landmark,
  banknote: Banknote,
  clipboard: ClipboardList,
  gift: Gift,
  home: Home,
  palmtree: Palmtree,
  "bar-chart": BarChart3,
  "piggy-bank": PiggyBank,
  calculator: Calculator,
  briefcase: Briefcase,
  "file-text": FileText,
  umbrella: Umbrella,

  // Salud
  flame: Flame,
  scale: Scale,
  droplets: Droplets,
  moon: Moon,

  // Productividad
  gem: Gem,
  calendar: Calendar,
  "calendar-days": CalendarDays,
  search: Search,
  target: Target,
  grid: LayoutGrid,
  timer: Timer,

  // Otros
  link: Link2,
  wrench: Wrench,
};

// Mapeo de Phosphor Icons (para el demo premium)
export const phosphorMap: Record<string, PhIcon> = {
  heart: PhHeart,
  wallet: PhWallet,
  clock: PhClock,
  "trending-up": PhTrendUp,
  "trending-down": PhTrendDown,
  landmark: PhBank,
  banknote: PhMoney,
  clipboard: PhClipboard,
  gift: PhGift,
  home: PhHouse,
  palmtree: PhPalm,
  "bar-chart": PhChart,
  "piggy-bank": PhPiggy,
  calculator: PhCalc,
  briefcase: PhCase,
  "file-text": PhFile,
  umbrella: PhUmbrella,
  percent: PhPercent,
  tag: PhTag,
  refresh: PhRefresh,
  receipt: PhReceipt,
  flame: PhFlame,
  scale: PhScales,
  droplets: PhDrop,
  moon: PhMoon,
  gem: PhGem,
  confetti: PhConfetti,
  user: PhUser,
  cake: PhCake,
  calendar: PhCalendar,
  search: PhSearch,
  target: PhTarget,
  grid: PhGrid,
  timer: PhTimer,
  tomato: PhTimer, // Símbolo del pomodoro
  lightning: PhLightning,
  trash: PhTrash,
  users: PhUsers,
  bell: PhBell,
  coffee: PhCoffee,
  drop: PhDropPh,
  books: PhBooks,
  run: PhRun,
  meditation: PhMeditation,
  mobile: PhMobile,
  globe: PhGlobe,
  moped: PhMoped,
  play: PhPlay,
  pause: PhPause,
  cigarette: PhCigarette,
  warning: PhWarning,
  info: PhInfo,
  lightbulb: PhLightbulb,
  lock: PhLock,
  "seal-check": PhSealCheck,
  car: PhCar,
  family: PhFamily,
  utensils: PhUtensils,
  tv: PhTv,
  shower: PhShower,
  male: PhMale,
  female: PhFemale,
  activity: PhActivity,
  monitor: PhMonitor,
  "credit-card": PhCreditCard,
  "file-arrow-down": PhFileArrowDown,
};

// Mapeo de emojis legacy a nombres de iconos (para migración gradual)
export const emojiToIconName: Record<string, string> = {
  // Pilares
  "❤️": "heart",
  "💰": "wallet",
  "⏱️": "clock",

  // Herramientas
  "%": "percent",
  "🏷️": "tag",
  "🔄": "refresh",
  "🧾": "receipt",

  // Finanzas
  "🏦": "landmark",
  "💵": "banknote",
  "📋": "clipboard",
  "🎁": "gift",
  "🏠": "home",
  "⏰": "clock",
  "🏖️": "palmtree",
  "🏛️": "landmark",
  "📊": "bar-chart",

  // Salud
  "🔥": "flame",
  "秤": "scale",
  "⚖️": "scale",
  "💧": "droplets",
  "😴": "moon",

  // Productividad
  "💎": "gem",
  "📅": "calendar",
  "🔍": "search",
  "🎯": "target",
  "🍅": "timer",
  "🗑️": "trash",
  "👥": "users",
  "📚": "books",
  "🏃": "run",
  "🧘": "meditation",
  "🚬": "cigarette",
  "📱": "mobile",
  "🌍": "globe",
  "🛵": "moped",
  "☕": "coffee",
  "🚗": "car",
  "👨‍👩‍👧": "family",
  "🍽️": "utensils",
  "📺": "tv",
  "🚿": "shower",
  "💼": "briefcase",
  "👨": "male",
  "👩": "female",
  "📉": "trending-down",
  "📈": "trending-up",
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  library?: "lucide" | "phosphor";
}

// Componente para renderizar iconos por nombre
export function Icon({
  name,
  className = "w-6 h-6",
  size,
  weight = "duotone",
  library = "phosphor" // Cambiamos el default a phosphor para el demo
}: IconProps): ReactNode {

  if (library === "phosphor") {
    const PhComponent = phosphorMap[name];
    if (PhComponent) {
      return <PhComponent className={className} size={size} weight={weight} />;
    }
  }

  const LucideComponent = iconMap[name];

  if (!LucideComponent) {
    // Fallback: si es un emoji, mostrar el emoji
    if (name.length <= 2) {
      return <span className={className} style={{ fontSize: size }}>{name}</span>;
    }
    return null;
  }

  return <LucideComponent className={className} size={size} />;
}

// Helper para obtener el nombre del icono desde un emoji
export function getIconName(emoji: string): string {
  return emojiToIconName[emoji] || emoji;
}
