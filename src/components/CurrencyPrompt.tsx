"use client";

import { useState, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";

const PROMPT_KEY = "vidaencifras-currency-prompted";

const monedasPopulares = ["COP", "MXN", "ARS", "USD", "EUR", "PEN", "CLP"];

export function CurrencyPrompt() {
  const { moneda, setMoneda, monedas } = useCurrency();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  useEffect(() => {
    // Solo mostrar si no se ha preguntado antes
    const prompted = localStorage.getItem(PROMPT_KEY);
    if (!prompted) {
      // Pequeño delay para que no aparezca inmediatamente
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!visible || confirmed) return;
    // Auto-ocultar después de 15 segundos si no interactúan
    const timer = setTimeout(() => {
      dismiss();
    }, 15000);
    return () => clearTimeout(timer);
  }, [visible, confirmed]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(PROMPT_KEY, "true");
  };

  const selectCurrency = (codigo: string) => {
    const selected = monedas.find(m => m.codigo === codigo);
    if (selected) {
      setMoneda(selected);
      setConfirmed(codigo);
      // Esperar un momento para mostrar feedback antes de cerrar
      setTimeout(() => dismiss(), 1200);
    }
  };

  if (!visible) return null;

  if (confirmed) {
    const selectedMoneda = monedas.find(m => m.codigo === confirmed);
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
        <div className="bg-emerald-500 text-white rounded-2xl shadow-2xl shadow-emerald-500/30 p-4 flex items-center gap-3">
          <span className="text-2xl">✓</span>
          <p className="font-medium">
            Listo, {selectedMoneda?.nombre}
          </p>
        </div>
      </div>
    );
  }

  const populares = monedas.filter(m => monedasPopulares.includes(m.codigo));
  const otras = monedas.filter(m => !monedasPopulares.includes(m.codigo));

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 border border-slate-200 dark:border-slate-700 p-4 max-w-xs">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            ¿Cuál es tu moneda?
          </p>
          <button
            onClick={dismiss}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 -mt-1"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {populares.map((m) => (
            <button
              key={m.codigo}
              onClick={() => selectCurrency(m.codigo)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                moneda.codigo === m.codigo
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              {m.simbolo} {m.codigo}
            </button>
          ))}

          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Más...
            </button>
          )}
        </div>

        {expanded && (
          <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            {otras.map((m) => (
              <button
                key={m.codigo}
                onClick={() => selectCurrency(m.codigo)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {m.simbolo} {m.codigo}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
