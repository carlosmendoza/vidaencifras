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
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-950/50",
      text: "text-indigo-600 dark:text-indigo-400",
      ring: "ring-indigo-100 dark:ring-indigo-900",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950/50",
      text: "text-orange-600 dark:text-orange-400",
      ring: "ring-orange-100 dark:ring-orange-900",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
      text: "text-emerald-600 dark:text-emerald-400",
      ring: "ring-emerald-100 dark:ring-emerald-900",
    },
    violet: {
      bg: "bg-violet-50 dark:bg-violet-950/50",
      text: "text-violet-600 dark:text-violet-400",
      ring: "ring-violet-100 dark:ring-violet-900",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-950/50",
      text: "text-rose-600 dark:text-rose-400",
      ring: "ring-rose-100 dark:ring-rose-900",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-950/50",
      text: "text-cyan-600 dark:text-cyan-400",
      ring: "ring-cyan-100 dark:ring-cyan-900",
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
