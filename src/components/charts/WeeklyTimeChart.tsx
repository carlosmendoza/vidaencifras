"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

const data = [
  { categoria: "Sueño", horas: 49, color: "#6366f1", emoji: "😴" },
  { categoria: "Trabajo", horas: 45, color: "#8b5cf6", emoji: "💼" },
  { categoria: "Ocio", horas: 25, color: "#a855f7", emoji: "🎮" },
  { categoria: "Familia", horas: 14, color: "#d946ef", emoji: "👨‍👩‍👧" },
  { categoria: "Traslado", horas: 10, color: "#ec4899", emoji: "🚗" },
  { categoria: "Comidas", horas: 10, color: "#f43f5e", emoji: "🍽️" },
  { categoria: "Higiene", horas: 7, color: "#f97316", emoji: "🚿" },
  { categoria: "Ejercicio", horas: 3, color: "#eab308", emoji: "🏃" },
  { categoria: "Desarrollo", horas: 5, color: "#22c55e", emoji: "📚" },
];

const totalHours = 168;
const usedHours = data.reduce((sum, item) => sum + item.horas, 0);

export function WeeklyTimeChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Distribución típica de 168 horas semanales
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        ¿Dónde se va realmente tu tiempo cada semana?
      </p>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, 55]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `${value}h`}
            />
            <YAxis
              type="category"
              dataKey="categoria"
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={75}
            />
            <Tooltip
              formatter={(value) => [`${value} horas/semana`, "Tiempo"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="horas" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Horas asignadas
          </p>
          <p className="text-xl font-bold text-slate-700 dark:text-slate-200">
            {usedHours}h
          </p>
        </div>
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-center">
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">
            Tiempo "libre" restante
          </p>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {totalHours - usedHours}h
          </p>
        </div>
      </div>
    </div>
  );
}
