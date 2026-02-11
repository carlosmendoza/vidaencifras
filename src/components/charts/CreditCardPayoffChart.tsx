"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  mes: number;
  saldoMinimo: number;
  saldoFijo: number;
}

interface CreditCardPayoffChartProps {
  data: DataPoint[];
  colorMinimo?: string;
  colorFijo?: string;
}

export function CreditCardPayoffChart({
  data,
  colorMinimo = "#ef4444",
  colorFijo = "#10b981",
}: CreditCardPayoffChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorMinimo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorMinimo} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colorMinimo} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorFijo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorFijo} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colorFijo} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            className="dark:stroke-slate-700"
          />
          <XAxis
            dataKey="mes"
            tick={{ fill: "#64748b", fontSize: 11 }}
            tickLine={{ stroke: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            label={{
              value: "Meses",
              position: "insideBottom",
              offset: -5,
              fill: "#64748b",
              fontSize: 11,
            }}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 11 }}
            tickLine={{ stroke: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
              return `$${(value / 1000).toFixed(0)}k`;
            }}
            width={55}
          />
          <Tooltip
            formatter={(value, name) => [
              formatCurrency(value as number),
              name === "saldoMinimo" ? "Pago mínimo" : "Cuota fija",
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
              value === "saldoMinimo" ? "Pagando mínimo" : "Cuota fija"
            }
            wrapperStyle={{ paddingTop: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="saldoMinimo"
            stroke={colorMinimo}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="saldoFijo"
            stroke={colorFijo}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
