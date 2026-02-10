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
  { name: "10%", value: 10, example: "$15 de $150" },
  { name: "15%", value: 15, example: "$22.50 de $150" },
  { name: "20%", value: 20, example: "$30 de $150" },
  { name: "25%", value: 25, example: "$37.50 de $150" },
  { name: "30%", value: 30, example: "$45 de $150" },
  { name: "50%", value: 50, example: "$75 de $150" },
];

const colors = [
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
];

export function PercentageChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Porcentajes comunes de $150
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Visualiza cuánto representa cada porcentaje
      </p>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, 50]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={40}
            />
            <Tooltip
              formatter={(value, name, props) => [
                props.payload.example,
                "Resultado",
              ]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-center">
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          <strong>Truco:</strong> Para el 10%, solo mueve el punto decimal un lugar a la izquierda
        </p>
      </div>
    </div>
  );
}
