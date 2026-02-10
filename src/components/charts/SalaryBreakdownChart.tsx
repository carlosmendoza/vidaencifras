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
  Legend,
} from "recharts";

const data = [
  { name: "1 SMMLV", bruto: 1750905, descuentos: 140072, neto: 1859928 },
  { name: "2 SMMLV", bruto: 3501810, descuentos: 280145, neto: 3470760 },
  { name: "3 SMMLV", bruto: 5252715, descuentos: 420217, neto: 4832498 },
  { name: "4 SMMLV", bruto: 7003620, descuentos: 630326, neto: 6373294 },
];

const formatCOP = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export function SalaryBreakdownChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Salario Bruto vs Neto por nivel de SMMLV
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Cuánto recibes realmente después de descuentos
      </p>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={formatCOP}
            />
            <Tooltip
              formatter={(value) => [`$${formatCOP(value as number)}`, ""]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Bar dataKey="bruto" name="Salario Bruto" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="neto" name="Salario Neto" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-500 dark:text-slate-400">Descuento promedio</p>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-200">8%</p>
        </div>
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <p className="text-xs text-emerald-600 dark:text-emerald-400">Recibes aprox.</p>
          <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">92%</p>
        </div>
      </div>
    </div>
  );
}
