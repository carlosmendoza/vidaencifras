"use client";

import { RefObject } from "react";
import { Icon } from "@/lib/icons";
import { usePDFExport, PDFExportOptions } from "@/hooks/usePDFExport";

interface PDFExportButtonProps {
  elementRef: RefObject<HTMLElement | null>;
  options: PDFExportOptions;
  colorClass?: "emerald" | "rose" | "amber" | "teal" | "indigo" | "cyan";
  className?: string;
}

const colorClasses = {
  emerald: {
    idle: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800",
    loading: "bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300",
    success: "bg-emerald-500 text-white",
    error: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  },
  rose: {
    idle: "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800",
    loading: "bg-rose-200 dark:bg-rose-800 text-rose-700 dark:text-rose-300",
    success: "bg-rose-500 text-white",
    error: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  },
  amber: {
    idle: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800",
    loading: "bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300",
    success: "bg-amber-500 text-white",
    error: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  },
  teal: {
    idle: "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 hover:bg-teal-200 dark:hover:bg-teal-800",
    loading: "bg-teal-200 dark:bg-teal-800 text-teal-700 dark:text-teal-300",
    success: "bg-teal-500 text-white",
    error: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  },
  indigo: {
    idle: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800",
    loading: "bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300",
    success: "bg-indigo-500 text-white",
    error: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  },
  cyan: {
    idle: "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-800",
    loading: "bg-cyan-200 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-300",
    success: "bg-cyan-500 text-white",
    error: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  },
};

export function PDFExportButton({
  elementRef,
  options,
  colorClass = "emerald",
  className = "",
}: PDFExportButtonProps) {
  const { exportToPDF, status, error } = usePDFExport();

  const handleClick = () => {
    if (status !== "loading") {
      exportToPDF(elementRef, options);
    }
  };

  const colors = colorClasses[colorClass];
  const currentColor = colors[status];

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed ${currentColor} ${className}`}
      title={error || "Exportar a PDF"}
    >
      {status === "loading" ? (
        <>
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Generando...</span>
        </>
      ) : status === "success" ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>¡Descargado!</span>
        </>
      ) : status === "error" ? (
        <>
          <Icon name="warning" className="w-4 h-4" />
          <span>Error</span>
        </>
      ) : (
        <>
          <Icon name="file-arrow-down" className="w-4 h-4" />
          <span>Exportar PDF</span>
        </>
      )}
    </button>
  );
}
