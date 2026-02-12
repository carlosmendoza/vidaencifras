"use client";

import { gradients } from "@/lib/colors";

type GradientKey = keyof typeof gradients;

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
  color?: "emerald" | "teal" | "blue" | "purple" | "red" | "amber" | "orange";
}

interface CalculatorResultProps {
  title?: string;
  mainValue: string;
  mainLabel: string;
  items?: ResultItem[];
  gradient?: GradientKey;
  children?: React.ReactNode;
}

const colorClasses = {
  emerald: "text-emerald-600",
  teal: "text-teal-600",
  blue: "text-blue-600",
  purple: "text-purple-600",
  red: "text-red-600",
  amber: "text-amber-600",
  orange: "text-orange-600",
};

const bgClasses: Record<GradientKey, string> = {
  finanzas: "bg-teal-50 dark:bg-teal-950/50 ring-teal-100 dark:ring-teal-900",
  salud: "bg-red-50 dark:bg-red-950/50 ring-red-100 dark:ring-red-900",
  productividad: "bg-orange-50 dark:bg-orange-950/50 ring-orange-100 dark:ring-orange-900",
  herramientas: "bg-purple-50 dark:bg-purple-950/50 ring-purple-100 dark:ring-purple-900",
};

const mainColorClasses: Record<GradientKey, string> = {
  finanzas: "text-teal-600",
  salud: "text-red-600",
  productividad: "text-orange-600",
  herramientas: "text-purple-600",
};

/**
 * Componente reutilizable para mostrar resultados de calculadoras
 * con diseño consistente
 */
export function CalculatorResult({
  title,
  mainValue,
  mainLabel,
  items = [],
  gradient = "finanzas",
  children,
}: CalculatorResultProps) {
  return (
    <div className={`p-8 ${bgClasses[gradient]} rounded-3xl ring-1`}>
      {title && (
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4">
          {title}
        </h3>
      )}

      <div className="text-center mb-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
          {mainLabel}
        </p>
        <p className={`text-4xl font-black ${mainColorClasses[gradient]}`}>
          {mainValue}
        </p>
      </div>

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl"
            >
              <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
              <span
                className={`font-bold ${
                  item.color ? colorClasses[item.color] : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

interface MetricCardProps {
  value: string;
  label: string;
  gradient?: "blue" | "purple" | "emerald" | "amber" | "pink" | "teal" | "red" | "orange";
}

const metricBgClasses = {
  blue: "bg-blue-50 dark:bg-blue-950/50 ring-blue-100 dark:ring-blue-900",
  purple: "bg-purple-50 dark:bg-purple-950/50 ring-purple-100 dark:ring-purple-900",
  emerald: "bg-emerald-50 dark:bg-emerald-950/50 ring-emerald-100 dark:ring-emerald-900",
  amber: "bg-amber-50 dark:bg-amber-950/50 ring-amber-100 dark:ring-amber-900",
  pink: "bg-pink-50 dark:bg-pink-950/50 ring-pink-100 dark:ring-pink-900",
  teal: "bg-teal-50 dark:bg-teal-950/50 ring-teal-100 dark:ring-teal-900",
  red: "bg-red-50 dark:bg-red-950/50 ring-red-100 dark:ring-red-900",
  orange: "bg-orange-50 dark:bg-orange-950/50 ring-orange-100 dark:ring-orange-900",
};

const metricTextClasses = {
  blue: "text-blue-700",
  purple: "text-purple-700",
  emerald: "text-emerald-700",
  amber: "text-amber-700",
  pink: "text-pink-700",
  teal: "text-teal-700",
  red: "text-red-700",
  orange: "text-orange-700",
};

const metricLabelClasses = {
  blue: "text-blue-500",
  purple: "text-purple-500",
  emerald: "text-emerald-500",
  amber: "text-amber-500",
  pink: "text-pink-500",
  teal: "text-teal-500",
  red: "text-red-500",
  orange: "text-orange-500",
};

/**
 * Tarjeta de métrica individual para mostrar en grid
 */
export function MetricCard({ value, label, gradient = "blue" }: MetricCardProps) {
  return (
    <div
      className={`p-4 ${metricBgClasses[gradient]} rounded-2xl ring-1 text-center`}
    >
      <p className={`text-2xl font-black ${metricTextClasses[gradient]}`}>{value}</p>
      <p className={`text-xs ${metricLabelClasses[gradient]} mt-1`}>{label}</p>
    </div>
  );
}
