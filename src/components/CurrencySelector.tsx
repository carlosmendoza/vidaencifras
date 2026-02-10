"use client";

import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";

interface CurrencySelectorProps {
  colorClass?: string;
}

export function CurrencySelector({ colorClass = "emerald" }: CurrencySelectorProps) {
  const { moneda, setMoneda, monedas } = useCurrency();
  const [mostrar, setMostrar] = useState(false);

  const colorStyles: Record<string, { active: string; hover: string }> = {
    emerald: { active: "bg-emerald-100 text-emerald-700", hover: "hover:text-emerald-600" },
    rose: { active: "bg-rose-100 text-rose-700", hover: "hover:text-rose-600" },
    blue: { active: "bg-blue-100 text-blue-700", hover: "hover:text-blue-600" },
    orange: { active: "bg-orange-100 text-orange-700", hover: "hover:text-orange-600" },
    violet: { active: "bg-violet-100 text-violet-700", hover: "hover:text-violet-600" },
  };

  const styles = colorStyles[colorClass] || colorStyles.emerald;

  return (
    <div className="relative">
      <button
        onClick={() => setMostrar(!mostrar)}
        className={`text-xs font-medium text-slate-400 dark:text-slate-500 ${styles.hover} flex items-center gap-1 transition-colors`}
      >
        {moneda.codigo} {moneda.simbolo}
        <span className="text-[10px]">▼</span>
      </button>

      {mostrar && (
        <div className="absolute right-0 top-full mt-2 z-50 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg max-h-64 overflow-y-auto min-w-[200px]">
          <div className="grid grid-cols-2 gap-1">
            {monedas.map((m) => (
              <button
                key={m.codigo}
                onClick={() => {
                  setMoneda(m);
                  setMostrar(false);
                }}
                className={`px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                  moneda.codigo === m.codigo
                    ? `${styles.active} font-semibold`
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                <span className="font-medium">{m.simbolo}</span> {m.codigo}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
