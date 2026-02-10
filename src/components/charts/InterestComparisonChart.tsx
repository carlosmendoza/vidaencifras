"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const generateData = () => {
  const principal = 10000;
  const rate = 0.1;
  const years = 30;
  const data = [];

  for (let year = 0; year <= years; year++) {
    const simpleInterest = principal + principal * rate * year;
    const compoundInterest = principal * Math.pow(1 + rate, year);

    data.push({
      year,
      simple: Math.round(simpleInterest),
      compuesto: Math.round(compoundInterest),
    });
  }

  return data;
};

const data = generateData();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function InterestComparisonChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Crecimiento de $10,000 al 10% anual
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Interés simple vs. interés compuesto durante 30 años
      </p>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSimple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorCompuesto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="dark:stroke-slate-700"
            />
            <XAxis
              dataKey="year"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              label={{
                value: "Años",
                position: "insideBottom",
                offset: -5,
                fill: "#64748b",
                fontSize: 12,
              }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip
              formatter={(value, name) => [
                formatCurrency(value as number),
                name === "simple" ? "Interés Simple" : "Interés Compuesto",
              ]}
              labelFormatter={(label) => `Año ${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend
              formatter={(value) =>
                value === "simple" ? "Interés Simple" : "Interés Compuesto"
              }
              wrapperStyle={{ paddingTop: "20px" }}
            />
            <Area
              type="monotone"
              dataKey="simple"
              stroke="#94a3b8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSimple)"
            />
            <Area
              type="monotone"
              dataKey="compuesto"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCompuesto)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Interés Simple (30 años)
          </p>
          <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
            $40,000
          </p>
        </div>
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">
            Interés Compuesto (30 años)
          </p>
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            $174,494
          </p>
        </div>
      </div>
    </div>
  );
}
