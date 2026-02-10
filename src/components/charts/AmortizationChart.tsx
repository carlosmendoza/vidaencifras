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
  const principal = 10000000; // $10,000,000 COP
  const annualRate = 0.18;
  const months = 24;
  const monthlyRate = annualRate / 12;

  // Cuota fija (sistema francés)
  const cuota = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

  const data = [];
  let saldo = principal;
  let totalIntereses = 0;
  let totalCapital = 0;

  for (let mes = 1; mes <= months; mes++) {
    const interes = saldo * monthlyRate;
    const capital = cuota - interes;
    saldo -= capital;
    totalIntereses += interes;
    totalCapital += capital;

    data.push({
      mes,
      capital: Math.round(capital),
      interes: Math.round(interes),
      saldo: Math.round(Math.max(0, saldo)),
      capitalAcumulado: Math.round(totalCapital),
      interesAcumulado: Math.round(totalIntereses),
    });
  }

  return { data, cuota: Math.round(cuota), totalIntereses: Math.round(totalIntereses) };
};

const { data, cuota, totalIntereses } = generateData();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function AmortizationChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Composición de la Cuota Mensual
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Préstamo de $10.000.000 a 24 meses con 18% anual
      </p>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorInteres" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="dark:stroke-slate-700"
            />
            <XAxis
              dataKey="mes"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              label={{
                value: "Mes",
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
              width={55}
            />
            <Tooltip
              formatter={(value, name) => [
                formatCurrency(value as number),
                name === "capital" ? "Abono a Capital" : "Intereses",
              ]}
              labelFormatter={(label) => `Mes ${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend
              formatter={(value) =>
                value === "capital" ? "Abono a Capital" : "Intereses"
              }
              wrapperStyle={{ paddingTop: "20px" }}
            />
            <Area
              type="monotone"
              dataKey="interes"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInteres)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="capital"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCapital)"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Cuota Mensual
          </p>
          <p className="text-base font-bold text-slate-700 dark:text-slate-200">
            {formatCurrency(cuota)}
          </p>
        </div>
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">
            Capital Prestado
          </p>
          <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            $10.000.000
          </p>
        </div>
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <p className="text-xs text-red-600 dark:text-red-400 mb-1">
            Total Intereses
          </p>
          <p className="text-base font-bold text-red-600 dark:text-red-400">
            {formatCurrency(totalIntereses)}
          </p>
        </div>
      </div>
    </div>
  );
}
