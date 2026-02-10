"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type PersonData = {
  name: string;
  pagado: number;
  debeRecibir?: number;
  debePagar?: number;
};

const data: PersonData[] = [
  { name: "Ana", pagado: 360, debeRecibir: 160 },
  { name: "Luis", pagado: 150, debePagar: 50 },
  { name: "Pedro", pagado: 90, debePagar: 110 },
];

const pieData = [
  { name: "Ana", value: 360, color: "#6366f1" },
  { name: "Luis", value: 150, color: "#8b5cf6" },
  { name: "Pedro", value: 90, color: "#a855f7" },
];

const formatCurrency = (value: number) => `$${value.toLocaleString("es-CO")}`;

export function ExpenseSplitChart() {
  const total = pieData.reduce((sum, item) => sum + item.value, 0);
  const perPerson = total / pieData.length;

  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        División de gastos del viaje
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Total: {formatCurrency(total)} — Por persona: {formatCurrency(perPerson)}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center space-y-3">
          {data.map((person, index) => (
            <div
              key={person.name}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pieData[index].color }}
                />
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {person.name}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pagó: {formatCurrency(person.pagado)}
                </p>
                {person.debeRecibir !== undefined ? (
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Recibe: {formatCurrency(person.debeRecibir)}
                  </p>
                ) : person.debePagar !== undefined ? (
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    Debe: {formatCurrency(person.debePagar)}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
        <p className="text-sm text-emerald-700 dark:text-emerald-300 text-center">
          <strong>Solución simple:</strong> Luis paga $50 a Ana, Pedro paga $110 a Ana
        </p>
      </div>
    </div>
  );
}
