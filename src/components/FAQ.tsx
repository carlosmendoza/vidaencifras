"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  colorClass?: string;
}

export function FAQ({ items, title = "Preguntas Frecuentes", colorClass = "indigo" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const colorStyles: Record<string, { bg: string; text: string; ring: string }> = {
    teal: {
      bg: "bg-teal-50 dark:bg-teal-950/50",
      text: "text-teal-600 dark:text-teal-400",
      ring: "ring-teal-100 dark:ring-teal-900",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-950/50",
      text: "text-red-600 dark:text-red-400",
      ring: "ring-red-100 dark:ring-red-900",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950/50",
      text: "text-orange-600 dark:text-orange-400",
      ring: "ring-orange-100 dark:ring-orange-900",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/50",
      text: "text-purple-600 dark:text-purple-400",
      ring: "ring-purple-100 dark:ring-purple-900",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-950/50",
      text: "text-indigo-600 dark:text-indigo-400",
      ring: "ring-indigo-100 dark:ring-indigo-900",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
      text: "text-emerald-600 dark:text-emerald-400",
      ring: "ring-emerald-100 dark:ring-emerald-900",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/50",
      text: "text-amber-600 dark:text-amber-400",
      ring: "ring-amber-100 dark:ring-amber-900",
    },
  };

  const colors = colorStyles[colorClass] || colorStyles.indigo;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
        <span className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center text-base`}>
          ?
        </span>
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl ring-1 ${colors.ring} overflow-hidden transition-all`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full p-4 text-left flex items-center justify-between gap-4 ${
                openIndex === index ? colors.bg : "bg-white/60 dark:bg-slate-800/60"
              } transition-colors`}
            >
              <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                {item.question}
              </span>
              <span
                className={`${colors.text} text-xl font-bold transition-transform ${
                  openIndex === index ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 bg-white/60 dark:bg-slate-800/60">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
