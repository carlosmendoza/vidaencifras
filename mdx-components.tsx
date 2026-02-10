import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { InterestComparisonChart } from "@/components/charts/InterestComparisonChart";
import { AmortizationChart } from "@/components/charts/AmortizationChart";
import { BMIRangeChart } from "@/components/charts/BMIRangeChart";
import { LifeDaysChart } from "@/components/charts/LifeDaysChart";
import { CaloriesChart } from "@/components/charts/CaloriesChart";
import { PercentageChart } from "@/components/charts/PercentageChart";
import { ExpenseSplitChart } from "@/components/charts/ExpenseSplitChart";
import { WeeklyTimeChart } from "@/components/charts/WeeklyTimeChart";
import { SalaryBreakdownChart } from "@/components/charts/SalaryBreakdownChart";
import { OvertimeRatesChart } from "@/components/charts/OvertimeRatesChart";
import { Callout } from "@/components/Callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
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
      <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
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
    Callout,
    ...components,
  };
}
