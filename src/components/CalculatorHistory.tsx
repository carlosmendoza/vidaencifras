"use client";

import Link from "next/link";
import { useHistory, CalculationEntry } from "@/context/HistoryContext";

interface CalculatorHistoryProps {
  limit?: number;
  showClearButton?: boolean;
  compact?: boolean;
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `Hace ${minutes} min`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days < 7) return `Hace ${days}d`;

  return new Date(timestamp).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
}

function HistoryItem({
  entry,
  compact,
  onRemove,
}: {
  entry: CalculationEntry;
  compact: boolean;
  onRemove: (id: string) => void;
}) {
  // Construir URL con parámetros de búsqueda para restaurar inputs
  const buildUrl = () => {
    const params = new URLSearchParams();
    Object.entries(entry.inputs).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    return `${entry.calculatorPath}?${params.toString()}`;
  };

  if (compact) {
    return (
      <Link
        href={buildUrl()}
        className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group"
      >
        <span className="text-xl">{entry.calculatorEmoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
            {entry.calculatorName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {entry.result.mainValue}
          </p>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {formatTimeAgo(entry.timestamp)}
        </span>
      </Link>
    );
  }

  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 flex items-center justify-center text-2xl">
        {entry.calculatorEmoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 truncate">
            {entry.calculatorName}
          </h4>
          <span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
            {formatTimeAgo(entry.timestamp)}
          </span>
        </div>

        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
          {entry.result.mainValue}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {entry.result.mainLabel}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <Link
            href={buildUrl()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Repetir
          </Link>
          <button
            onClick={() => onRemove(entry.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export function CalculatorHistory({
  limit = 5,
  showClearButton = true,
  compact = false,
}: CalculatorHistoryProps) {
  const { history, removeFromHistory, clearHistory, getRecentCalculations } = useHistory();

  const recentHistory = getRecentCalculations(limit);

  if (recentHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Aún no tienes cálculos guardados
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
          Tus cálculos recientes aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {showClearButton && history.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {history.length} cálculo{history.length !== 1 ? "s" : ""} guardado{history.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={clearHistory}
            className="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            Limpiar historial
          </button>
        </div>
      )}

      <div className={compact ? "space-y-2" : "space-y-3"}>
        {recentHistory.map((entry) => (
          <HistoryItem
            key={entry.id}
            entry={entry}
            compact={compact}
            onRemove={removeFromHistory}
          />
        ))}
      </div>

      {history.length > limit && (
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 pt-2">
          Mostrando {limit} de {history.length} cálculos
        </p>
      )}
    </div>
  );
}

export function HistoryWidget() {
  const { getRecentCalculations } = useHistory();
  const recentHistory = getRecentCalculations(3);

  if (recentHistory.length === 0) return null;

  return (
    <div className="card-glass rounded-2xl p-4">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Cálculos recientes
      </h3>
      <CalculatorHistory limit={3} showClearButton={false} compact />
    </div>
  );
}
