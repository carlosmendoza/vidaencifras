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
} from "recharts";

const data = [
  { name: "Extra diurna", recargo: 25, color: "#f59e0b" },
  { name: "Recargo nocturno", recargo: 35, color: "#8b5cf6" },
  { name: "Extra nocturna", recargo: 75, color: "#6366f1" },
  { name: "Recargo dominical", recargo: 75, color: "#06b6d4" },
  { name: "Extra dom. diurna", recargo: 100, color: "#f97316" },
  { name: "Recargo dom. noct.", recargo: 110, color: "#ec4899" },
  { name: "Extra dom. noct.", recargo: 150, color: "#ef4444" },
];

export function OvertimeRatesChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Recargos por tipo de hora extra
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Porcentaje adicional sobre el valor hora base
      </p>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, 160]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `+${value}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 11 }}
              width={95}
            />
            <Tooltip
              formatter={(value) => [`+${value}%`, "Recargo"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="recargo" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-center">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Ejemplo:</strong> Si tu hora base vale $10.000, una hora extra dominical nocturna (+150%) te paga $25.000
        </p>
      </div>
    </div>
  );
}
