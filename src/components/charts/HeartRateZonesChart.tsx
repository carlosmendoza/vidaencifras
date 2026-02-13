"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const exampleAge = 30;
const maxHR = Math.round(208 - 0.7 * exampleAge); // Tanaka: 187 bpm
const restingHR = 65;
const hrReserve = maxHR - restingHR;

const zones = [
  {
    name: "Zona 1",
    label: "Recuperación",
    min: 50,
    max: 60,
    color: "#94a3b8",
    description: "Calentamiento y recuperación activa",
    benefit: "Recuperación muscular",
  },
  {
    name: "Zona 2",
    label: "Quema de grasa",
    min: 60,
    max: 70,
    color: "#22c55e",
    description: "Caminata rápida, trote suave",
    benefit: "Resistencia base y oxidación de grasas",
  },
  {
    name: "Zona 3",
    label: "Aeróbica",
    min: 70,
    max: 80,
    color: "#3b82f6",
    description: "Carrera moderada, ciclismo",
    benefit: "Mejora cardiovascular",
  },
  {
    name: "Zona 4",
    label: "Umbral anaeróbico",
    min: 80,
    max: 90,
    color: "#f97316",
    description: "Entrenamiento de velocidad, intervalos",
    benefit: "Potencia y velocidad",
  },
  {
    name: "Zona 5",
    label: "Máximo",
    min: 90,
    max: 100,
    color: "#ef4444",
    description: "Sprints, esfuerzo máximo",
    benefit: "Capacidad anaeróbica",
  },
];

const data = zones.map((zone) => {
  const bpmMin = Math.round(restingHR + hrReserve * (zone.min / 100));
  const bpmMax = Math.round(restingHR + hrReserve * (zone.max / 100));
  return {
    name: zone.label,
    zoneName: zone.name,
    bpmMin,
    bpmMax,
    range: bpmMax - bpmMin,
    color: zone.color,
    description: zone.description,
    benefit: zone.benefit,
    percentRange: `${zone.min}-${zone.max}%`,
  };
});

export function HeartRateZonesChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Zonas de Frecuencia Cardíaca
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Ejemplo: 30 años, FC reposo 65 bpm — FC máx {maxHR} bpm (Fórmula de
        Tanaka)
      </p>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[60, 195]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              label={{
                value: "bpm",
                position: "insideBottomRight",
                offset: -5,
                style: { fill: "#94a3b8", fontSize: 11 },
              }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              width={120}
            />
            <Tooltip
              content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3 text-sm">
                    <p className="font-bold text-slate-800 dark:text-white">
                      {d.zoneName}: {d.name}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      {d.bpmMin} – {d.bpmMax} bpm ({d.percentRange})
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      {d.description}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 italic">
                      {d.benefit}
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="bpmMax" radius={[0, 6, 6, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="percentRange"
                position="right"
                style={{ fill: "#64748b", fontSize: 11 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2 text-center text-xs">
        {zones.map((zone) => (
          <div
            key={zone.name}
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${zone.color}15` }}
          >
            <div
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: zone.color }}
            />
            <p className="font-medium text-slate-700 dark:text-slate-300">
              {zone.name}
            </p>
            <p className="text-slate-500 dark:text-slate-400">{zone.min}-{zone.max}%</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
        Calculado con el método Karvonen (FC reserva). Fuente: Tanaka et al.,
        JACC 2001.
      </p>
    </div>
  );
}
