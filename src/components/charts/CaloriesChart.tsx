"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const tmb = 1370; // TMB ejemplo mujer de 30 años, 65kg, 165cm

const activityData = [
  { name: "Sedentario", factor: 1.2, color: "#94a3b8" },
  { name: "Ligero", factor: 1.375, color: "#60a5fa" },
  { name: "Moderado", factor: 1.55, color: "#34d399" },
  { name: "Activo", factor: 1.725, color: "#f97316" },
  { name: "Muy activo", factor: 1.9, color: "#ef4444" },
];

const data = activityData.map((item) => ({
  name: item.name,
  tdee: Math.round(tmb * item.factor),
  color: item.color,
  factor: item.factor,
}));

const macroDistribution = [
  { name: "Carbohidratos", percent: 50, color: "#f97316", description: "45-65%" },
  { name: "Proteínas", percent: 25, color: "#3b82f6", description: "10-35%" },
  { name: "Grasas", percent: 25, color: "#eab308", description: "20-35%" },
];

export function CaloriesChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        TDEE según Nivel de Actividad
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Ejemplo: Mujer, 30 años, 65 kg, 165 cm (TMB: {tmb} kcal)
      </p>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              domain={[1000, 3000]}
              tickFormatter={(value) => `${value}`}
              width={45}
            />
            <Tooltip
              formatter={(value, name, props) => [
                `${value} kcal/día`,
                `Factor: ×${props.payload.factor}`,
              ]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="tdee" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
          Distribución recomendada de macronutrientes
        </p>
        <div className="flex items-center gap-1 h-8 rounded-lg overflow-hidden">
          {macroDistribution.map((macro) => (
            <div
              key={macro.name}
              className="h-full flex items-center justify-center text-white text-xs font-medium"
              style={{
                backgroundColor: macro.color,
                width: `${macro.percent}%`,
              }}
            >
              {macro.percent}%
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          {macroDistribution.map((macro) => (
            <div key={macro.name}>
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ backgroundColor: macro.color }}
              ></div>
              <p className="font-medium text-slate-700 dark:text-slate-300">
                {macro.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400">{macro.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
