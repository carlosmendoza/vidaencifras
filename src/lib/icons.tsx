"use client";

import {
  Heart,
  Wallet,
  Clock,
  Percent,
  Tag,
  RefreshCw,
  Receipt,
  TrendingUp,
  TrendingDown,
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
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
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
  "⚖️": "scale",
  "💧": "droplets",
  "😴": "moon",

  // Productividad
  "💎": "gem",
  "📅": "calendar",
  "🔍": "search",
  "🎯": "target",
  "🍅": "timer",
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

// Componente para renderizar iconos por nombre
export function Icon({ name, className = "w-6 h-6", size }: IconProps): ReactNode {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback: si es un emoji, mostrar el emoji
    if (name.length <= 2) {
      return <span className="text-2xl">{name}</span>;
    }
    return null;
  }

  return <IconComponent className={className} size={size} />;
}

// Helper para obtener el nombre del icono desde un emoji
export function getIconName(emoji: string): string {
  return emojiToIconName[emoji] || emoji;
}
