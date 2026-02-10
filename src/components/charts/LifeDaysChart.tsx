"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const lifeExpectancy = 80;
const totalDays = lifeExpectancy * 365;
const exampleAge = 30;
const daysLived = exampleAge * 365;
const daysRemaining = totalDays - daysLived;

const data = [
  { name: "Días vividos", value: daysLived, color: "#6366f1" },
  { name: "Días restantes", value: daysRemaining, color: "#e2e8f0" },
];

const timeDistribution = [
  { name: "Dormir", years: 26.7, color: "#8b5cf6" },
  { name: "Trabajar", years: 10.5, color: "#3b82f6" },
  { name: "Pantallas", years: 9.1, color: "#ef4444" },
  { name: "Comer", years: 4.5, color: "#f97316" },
  { name: "Transporte", years: 4.3, color: "#eab308" },
  { name: "Tiempo libre", years: 9, color: "#22c55e" },
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("es-CO").format(num);
};

export function LifeDaysChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Tu Vida en Días (ejemplo: 30 años)
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Basado en esperanza de vida de {lifeExpectancy} años
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-[220px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatNumber(value as number) + " días", ""]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round((daysLived / totalDays) * 100)}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">vivido</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <p className="text-xs text-indigo-600 dark:text-indigo-400">Días vividos</p>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {formatNumber(daysLived)}
            </p>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400">Días restantes</p>
            <p className="text-xl font-bold text-slate-600 dark:text-slate-300">
              {formatNumber(daysRemaining)}
            </p>
          </div>
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <p className="text-xs text-amber-600 dark:text-amber-400">Sábados restantes</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {formatNumber(Math.round(daysRemaining / 7))}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
          ¿Cómo gastamos una vida promedio de 80 años?
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {timeDistribution.map((item) => (
            <div key={item.name} className="text-center">
              <div
                className="w-full h-2 rounded-full mb-1"
                style={{ backgroundColor: item.color }}
              ></div>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {item.years} años
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
