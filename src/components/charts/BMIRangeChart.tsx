"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

const bmiCategories = [
  { name: "Bajo peso", min: 0, max: 18.5, color: "#60a5fa", description: "< 18.5" },
  { name: "Normal", min: 18.5, max: 24.9, color: "#34d399", description: "18.5 - 24.9" },
  { name: "Sobrepeso", min: 24.9, max: 29.9, color: "#fbbf24", description: "25 - 29.9" },
  { name: "Obesidad I", min: 29.9, max: 34.9, color: "#f97316", description: "30 - 34.9" },
  { name: "Obesidad II", min: 34.9, max: 39.9, color: "#ef4444", description: "35 - 39.9" },
  { name: "Obesidad III", min: 39.9, max: 45, color: "#dc2626", description: "≥ 40" },
];

const data = bmiCategories.map((cat) => ({
  name: cat.name,
  value: cat.max - cat.min,
  start: cat.min,
  color: cat.color,
  description: cat.description,
}));

export function BMIRangeChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Rangos de IMC según la OMS
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Clasificación del Índice de Masa Corporal
      </p>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
          >
            <XAxis
              type="number"
              domain={[0, 45]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              width={75}
            />
            <Tooltip
              formatter={(value, name, props) => [
                `IMC: ${props.payload.description}`,
                props.payload.name,
              ]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <ReferenceLine x={22} stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <div className="w-4 h-0.5 bg-indigo-500"></div>
        <span>Línea punteada: IMC ideal (22)</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
        {bmiCategories.slice(0, 3).map((cat) => (
          <div
            key={cat.name}
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${cat.color}20` }}
          >
            <div
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: cat.color }}
            ></div>
            <p className="font-medium text-slate-700 dark:text-slate-300">{cat.name}</p>
            <p className="text-slate-500 dark:text-slate-400">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
