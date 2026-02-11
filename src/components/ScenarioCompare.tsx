"use client";

import { useState } from "react";
import { Scenario } from "@/hooks/useScenarioCompare";

interface ScenarioCompareProps<T> {
  scenarios: Scenario<T>[];
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
  onAddScenario: () => void;
  onRemoveScenario: (id: string) => void;
  onDuplicateScenario: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  canAddScenario: boolean;
  canRemoveScenario: boolean;
  colorClass?: "emerald" | "teal" | "amber" | "red";
}

const colorClasses = {
  emerald: {
    active: "bg-emerald-500 text-white",
    inactive: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
    border: "border-emerald-200 dark:border-emerald-800",
    add: "border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50",
  },
  teal: {
    active: "bg-teal-500 text-white",
    inactive: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50",
    border: "border-teal-200 dark:border-teal-800",
    add: "border-teal-300 dark:border-teal-700 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50",
  },
  amber: {
    active: "bg-amber-500 text-white",
    inactive: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50",
    border: "border-amber-200 dark:border-amber-800",
    add: "border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50",
  },
  red: {
    active: "bg-red-500 text-white",
    inactive: "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50",
    border: "border-red-200 dark:border-red-800",
    add: "border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50",
  },
};

export function ScenarioTabs<T>({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  onAddScenario,
  onRemoveScenario,
  onDuplicateScenario,
  onUpdateName,
  canAddScenario,
  canRemoveScenario,
  colorClass = "emerald",
}: ScenarioCompareProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const colors = colorClasses[colorClass];

  const startEditing = (scenario: Scenario<T>) => {
    setEditingId(scenario.id);
    setEditName(scenario.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdateName(editingId, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="relative group">
            {editingId === scenario.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit();
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-emerald-500 focus:outline-none w-32"
                autoFocus
              />
            ) : (
              <button
                onClick={() => onSelectScenario(scenario.id)}
                onDoubleClick={() => startEditing(scenario)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  scenario.id === activeScenarioId
                    ? colors.active
                    : colors.inactive
                }`}
              >
                {scenario.name}
                {scenario.result && (
                  <span className="ml-2 opacity-75">✓</span>
                )}
              </button>
            )}

            {scenario.id === activeScenarioId && (
              <div className="absolute -top-1 -right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDuplicateScenario(scenario.id)}
                  className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-colors"
                  title="Duplicar"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                {canRemoveScenario && (
                  <button
                    onClick={() => onRemoveScenario(scenario.id)}
                    className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {canAddScenario && (
          <button
            onClick={onAddScenario}
            className={`px-4 py-2 rounded-xl text-sm font-medium border-2 border-dashed transition-all duration-200 ${colors.add}`}
          >
            + Agregar
          </button>
        )}
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
        Doble clic para renombrar • Máximo {4} escenarios
      </p>
    </div>
  );
}

interface ScenarioCompareResultsProps<T> {
  scenarios: Scenario<T>[];
  colorClass?: "emerald" | "teal" | "amber" | "red";
}

const resultColorClasses = {
  emerald: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 ring-emerald-200 dark:ring-emerald-800",
  teal: "from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 ring-teal-200 dark:ring-teal-800",
  amber: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 ring-amber-200 dark:ring-amber-800",
  red: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 ring-red-200 dark:ring-red-800",
};

const resultTextClasses = {
  emerald: "text-emerald-600 dark:text-emerald-400",
  teal: "text-teal-600 dark:text-teal-400",
  amber: "text-amber-600 dark:text-amber-400",
  red: "text-red-600 dark:text-red-400",
};

export function ScenarioCompareResults<T>({
  scenarios,
  colorClass = "emerald",
}: ScenarioCompareResultsProps<T>) {
  const completedScenarios = scenarios.filter((s) => s.result !== null);

  if (completedScenarios.length < 2) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm">Calcula al menos 2 escenarios para comparar</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Comparación de Escenarios
      </h3>

      {/* Vista de comparación lado a lado (desktop) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {completedScenarios.map((scenario) => (
          <div
            key={scenario.id}
            className={`p-4 rounded-2xl bg-gradient-to-br ${resultColorClasses[colorClass]} ring-1 animate-scale-in`}
          >
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 truncate">
              {scenario.name}
            </h4>
            <div className="text-center mb-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {scenario.result?.mainLabel}
              </p>
              <p className={`text-2xl font-black ${resultTextClasses[colorClass]}`}>
                {scenario.result?.mainValue}
              </p>
            </div>
            {scenario.result?.items && scenario.result.items.length > 0 && (
              <div className="space-y-2">
                {scenario.result.items.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs p-2 bg-white/60 dark:bg-slate-800/60 rounded-lg"
                  >
                    <span className="text-slate-600 dark:text-slate-400 truncate">
                      {item.label}
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 ml-2">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vista móvil (tabs/acordeón) */}
      <div className="md:hidden space-y-3">
        {completedScenarios.map((scenario) => (
          <details
            key={scenario.id}
            className={`rounded-2xl bg-gradient-to-br ${resultColorClasses[colorClass]} ring-1 overflow-hidden`}
          >
            <summary className="p-4 cursor-pointer flex justify-between items-center">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {scenario.name}
              </span>
              <span className={`font-bold ${resultTextClasses[colorClass]}`}>
                {scenario.result?.mainValue}
              </span>
            </summary>
            <div className="px-4 pb-4 space-y-2">
              {scenario.result?.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm p-2 bg-white/60 dark:bg-slate-800/60 rounded-lg"
                >
                  <span className="text-slate-600 dark:text-slate-400">
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
