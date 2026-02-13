import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Callout } from "@/components/Callout";

// Dynamic imports para mejorar performance - los charts se cargan solo cuando se usan
const InterestComparisonChart = dynamic(
  () => import("@/components/charts/InterestComparisonChart").then((mod) => mod.InterestComparisonChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const AmortizationChart = dynamic(
  () => import("@/components/charts/AmortizationChart").then((mod) => mod.AmortizationChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const BMIRangeChart = dynamic(
  () => import("@/components/charts/BMIRangeChart").then((mod) => mod.BMIRangeChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const LifeDaysChart = dynamic(
  () => import("@/components/charts/LifeDaysChart").then((mod) => mod.LifeDaysChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const CaloriesChart = dynamic(
  () => import("@/components/charts/CaloriesChart").then((mod) => mod.CaloriesChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const PercentageChart = dynamic(
  () => import("@/components/charts/PercentageChart").then((mod) => mod.PercentageChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const ExpenseSplitChart = dynamic(
  () => import("@/components/charts/ExpenseSplitChart").then((mod) => mod.ExpenseSplitChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const WeeklyTimeChart = dynamic(
  () => import("@/components/charts/WeeklyTimeChart").then((mod) => mod.WeeklyTimeChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const SalaryBreakdownChart = dynamic(
  () => import("@/components/charts/SalaryBreakdownChart").then((mod) => mod.SalaryBreakdownChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const OvertimeRatesChart = dynamic(
  () => import("@/components/charts/OvertimeRatesChart").then((mod) => mod.OvertimeRatesChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const HeartRateZonesChart = dynamic(
  () => import("@/components/charts/HeartRateZonesChart").then((mod) => mod.HeartRateZonesChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const SleepCyclesChart = dynamic(
  () => import("@/components/charts/SleepCyclesChart").then((mod) => mod.SleepCyclesChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const HydrationChart = dynamic(
  () => import("@/components/charts/HydrationChart").then((mod) => mod.HydrationChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const HealthIndicatorsChart = dynamic(
  () => import("@/components/charts/HealthIndicatorsChart").then((mod) => mod.HealthIndicatorsChart),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

const theadColorsByCategory: Record<string, string> = {
  finanzas: "bg-teal-500",
  salud: "bg-red-500",
  productividad: "bg-orange-500",
  herramientas: "bg-purple-500",
};

export function useMDXComponents(components: MDXComponents, category?: string): MDXComponents {
  const theadColor = theadColorsByCategory[category || ""] || "bg-purple-500";
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-black mb-6 gradient-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 text-slate-700 dark:text-slate-200">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-300">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
      <Link
        href={href || "#"}
        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
      >
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-500 dark:text-slate-400 my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600 dark:text-indigo-400">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-6">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-800 dark:text-white">
        {children}
      </strong>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">{children}</table>
        </div>
      </div>
    ),
    thead: ({ children }) => (
      <thead className={`${theadColor} text-white`}>
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg">
        {children}
      </th>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
        {children}
      </tr>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
        {children}
      </td>
    ),
    InterestComparisonChart,
    AmortizationChart,
    BMIRangeChart,
    LifeDaysChart,
    CaloriesChart,
    PercentageChart,
    ExpenseSplitChart,
    WeeklyTimeChart,
    SalaryBreakdownChart,
    OvertimeRatesChart,
    HeartRateZonesChart,
    SleepCyclesChart,
    HydrationChart,
    HealthIndicatorsChart,
    Callout,
    ...components,
  };
}
