"use client";

import { gradients } from "@/lib/colors";

type GradientKey = keyof typeof gradients;

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
  color?: "emerald" | "teal" | "blue" | "purple" | "red" | "amber";
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
};

const bgClasses: Record<GradientKey, string> = {
  finanzas: "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 ring-emerald-100 dark:ring-emerald-900",
  salud: "from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 ring-orange-100 dark:ring-orange-900",
  productividad: "from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 ring-amber-100 dark:ring-amber-900",
  herramientas: "from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 ring-indigo-100 dark:ring-indigo-900",
  porcentajes: "from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50 ring-cyan-100 dark:ring-cyan-900",
  descuentos: "from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50 ring-pink-100 dark:ring-pink-900",
  conversor: "from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 ring-indigo-100 dark:ring-indigo-900",
  dividir: "from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 ring-amber-100 dark:ring-amber-900",
  azul: "from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 ring-blue-100 dark:ring-blue-900",
  morado: "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 ring-purple-100 dark:ring-purple-900",
  verde: "from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 ring-green-100 dark:ring-green-900",
};

const mainColorClasses: Record<GradientKey, string> = {
  finanzas: "text-emerald-600",
  salud: "text-red-600",
  productividad: "text-amber-600",
  herramientas: "text-indigo-600",
  porcentajes: "text-cyan-600",
  descuentos: "text-pink-600",
  conversor: "text-indigo-600",
  dividir: "text-amber-600",
  azul: "text-blue-600",
  morado: "text-purple-600",
  verde: "text-green-600",
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
    <div className={`p-8 bg-gradient-to-br ${bgClasses[gradient]} rounded-3xl ring-1`}>
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
  gradient?: "blue" | "purple" | "emerald" | "amber" | "pink";
}

const metricBgClasses = {
  blue: "from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 ring-blue-100 dark:ring-blue-900",
  purple: "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 ring-purple-100 dark:ring-purple-900",
  emerald: "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 ring-emerald-100 dark:ring-emerald-900",
  amber: "from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 ring-amber-100 dark:ring-amber-900",
  pink: "from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50 ring-pink-100 dark:ring-pink-900",
};

const metricTextClasses = {
  blue: "text-blue-700",
  purple: "text-purple-700",
  emerald: "text-emerald-700",
  amber: "text-amber-700",
  pink: "text-pink-700",
};

const metricLabelClasses = {
  blue: "text-blue-500",
  purple: "text-purple-500",
  emerald: "text-emerald-500",
  amber: "text-amber-500",
  pink: "text-pink-500",
};

/**
 * Tarjeta de métrica individual para mostrar en grid
 */
export function MetricCard({ value, label, gradient = "blue" }: MetricCardProps) {
  return (
    <div
      className={`p-4 bg-gradient-to-br ${metricBgClasses[gradient]} rounded-2xl ring-1 text-center`}
    >
      <p className={`text-2xl font-black ${metricTextClasses[gradient]}`}>{value}</p>
      <p className={`text-xs ${metricLabelClasses[gradient]} mt-1`}>{label}</p>
    </div>
  );
}
