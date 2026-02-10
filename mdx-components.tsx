import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { InterestComparisonChart } from "@/components/charts/InterestComparisonChart";

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
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-slate-100 dark:bg-slate-800 px-4 py-2 text-left font-semibold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
        {children}
      </td>
    ),
    InterestComparisonChart,
    ...components,
  };
}
