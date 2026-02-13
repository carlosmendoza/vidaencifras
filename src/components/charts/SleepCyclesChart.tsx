"use client";

const cycleMinutes = 90;
const fallAsleepMinutes = 15;
const totalCycles = 5;

const stages = [
  { name: "Despierto", color: "#94a3b8", y: 0 },
  { name: "N1 (Ligero)", color: "#93c5fd", y: 1 },
  { name: "N2 (Intermedio)", color: "#3b82f6", y: 2 },
  { name: "N3 (Profundo)", color: "#1e3a5f", y: 3 },
  { name: "REM", color: "#a78bfa", y: 4 },
];

// Patrón simplificado de una noche de sueño (5 ciclos)
// Cada ciclo: N1 → N2 → N3 → N2 → REM
// La proporción de N3 disminuye y REM aumenta con cada ciclo
const nightPattern = [
  // Dormirse
  { stage: 0, duration: 15 },
  // Ciclo 1 - Más sueño profundo
  { stage: 1, duration: 5 },
  { stage: 2, duration: 25 },
  { stage: 3, duration: 40 },
  { stage: 2, duration: 10 },
  { stage: 4, duration: 10 },
  // Ciclo 2
  { stage: 1, duration: 5 },
  { stage: 2, duration: 20 },
  { stage: 3, duration: 30 },
  { stage: 2, duration: 15 },
  { stage: 4, duration: 20 },
  // Ciclo 3
  { stage: 1, duration: 5 },
  { stage: 2, duration: 25 },
  { stage: 3, duration: 15 },
  { stage: 2, duration: 15 },
  { stage: 4, duration: 30 },
  // Ciclo 4
  { stage: 1, duration: 5 },
  { stage: 2, duration: 30 },
  { stage: 3, duration: 5 },
  { stage: 2, duration: 15 },
  { stage: 4, duration: 35 },
  // Ciclo 5
  { stage: 1, duration: 5 },
  { stage: 2, duration: 25 },
  { stage: 2, duration: 15 },
  { stage: 4, duration: 40 },
  // Despertar
  { stage: 1, duration: 5 },
  { stage: 0, duration: 5 },
];

// Calcular tiempo total y porcentajes
const totalMinutes = nightPattern.reduce((sum, p) => sum + p.duration, 0);
const stageMinutes = [0, 0, 0, 0, 0];
nightPattern.forEach((p) => {
  stageMinutes[p.stage] += p.duration;
});

const hoursRecommended = [
  { age: "0–3 meses", hours: "14–17 h", color: "#93c5fd" },
  { age: "4–11 meses", hours: "12–15 h", color: "#93c5fd" },
  { age: "1–2 años", hours: "11–14 h", color: "#60a5fa" },
  { age: "3–5 años", hours: "10–13 h", color: "#60a5fa" },
  { age: "6–13 años", hours: "9–11 h", color: "#3b82f6" },
  { age: "14–17 años", hours: "8–10 h", color: "#3b82f6" },
  { age: "18–64 años", hours: "7–9 h", color: "#2563eb" },
  { age: "65+ años", hours: "7–8 h", color: "#1d4ed8" },
];

export function SleepCyclesChart() {
  // Construir puntos para la gráfica como segmentos
  let currentMinute = 0;
  const segments: {
    x: number;
    width: number;
    stage: number;
    label: string;
    color: string;
  }[] = [];

  nightPattern.forEach((p) => {
    segments.push({
      x: currentMinute,
      width: p.duration,
      stage: p.stage,
      label: stages[p.stage].name,
      color: stages[p.stage].color,
    });
    currentMinute += p.duration;
  });

  const chartWidth = 100; // porcentaje
  const chartHeight = 200;
  const stageHeight = chartHeight / 5;

  // Marcas de ciclos (cada 90 min, comenzando después de dormirse)
  const cycleMarks: number[] = [];
  for (let i = 1; i <= totalCycles; i++) {
    cycleMarks.push(fallAsleepMinutes + i * cycleMinutes);
  }

  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Arquitectura del Sueño: Una Noche Típica
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        5 ciclos de ~90 min cada uno (7.5 horas totales)
      </p>

      {/* Hipnograma visual */}
      <div className="relative overflow-x-auto pb-2">
        <div className="min-w-[500px]">
          {/* Labels de etapas (eje Y) */}
          <div className="flex">
            <div className="w-20 flex-shrink-0">
              {stages.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-end pr-2"
                  style={{ height: `${stageHeight}px` }}
                >
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 text-right leading-tight">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Área de la gráfica */}
            <div className="flex-1 relative border-l border-b border-slate-300 dark:border-slate-600">
              {/* Líneas horizontales de guía */}
              {stages.map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-b border-slate-100 dark:border-slate-700"
                  style={{ top: `${i * stageHeight}px` }}
                />
              ))}

              {/* Segmentos del sueño */}
              <svg
                width="100%"
                height={chartHeight}
                viewBox={`0 0 ${totalMinutes} ${chartHeight}`}
                preserveAspectRatio="none"
                className="relative z-10"
              >
                {segments.map((seg, i) => (
                  <rect
                    key={i}
                    x={seg.x}
                    y={seg.stage * stageHeight + 2}
                    width={seg.width}
                    height={stageHeight - 4}
                    rx={3}
                    fill={seg.color}
                    opacity={0.85}
                  >
                    <title>
                      {seg.label}: {seg.width} min
                    </title>
                  </rect>
                ))}

                {/* Marcas de ciclos */}
                {cycleMarks.map((min, i) => (
                  <g key={`cycle-${i}`}>
                    <line
                      x1={min}
                      y1={0}
                      x2={min}
                      y2={chartHeight}
                      stroke="#6366f1"
                      strokeWidth={1}
                      strokeDasharray="4 3"
                      opacity={0.5}
                    />
                    <text
                      x={min - cycleMinutes / 2 + (i === 0 ? fallAsleepMinutes / 2 : 0)}
                      y={12}
                      textAnchor="middle"
                      fill="#6366f1"
                      fontSize={9}
                      fontWeight="600"
                    >
                      Ciclo {i + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Eje X: horas */}
          <div className="flex ml-20">
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className="text-[10px] text-slate-400 dark:text-slate-500"
                style={{
                  width: `${(60 / totalMinutes) * 100}%`,
                  textAlign: i === 0 ? "left" : "center",
                }}
              >
                {i}h
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribución de etapas */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
          Distribución por etapa
        </p>
        <div className="flex items-center gap-1 h-7 rounded-lg overflow-hidden">
          {stages.slice(1).map((s, i) => {
            const percent = Math.round(
              (stageMinutes[i + 1] / (totalMinutes - stageMinutes[0])) * 100
            );
            return (
              <div
                key={s.name}
                className="h-full flex items-center justify-center text-white text-[10px] font-medium"
                style={{ backgroundColor: s.color, width: `${percent}%` }}
              >
                {percent > 8 ? `${percent}%` : ""}
              </div>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
          {stages.slice(1).map((s, i) => (
            <div key={s.name}>
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ backgroundColor: s.color }}
              />
              <p className="font-medium text-slate-700 dark:text-slate-300">
                {s.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                ~{stageMinutes[i + 1]} min
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Horas recomendadas por edad */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
          Horas de sueño recomendadas por edad
        </p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {hoursRecommended.map((item) => (
            <div key={item.age} className="text-center">
              <div
                className="w-full h-2 rounded-full mb-1"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {item.hours}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {item.age}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
        Fuente: National Sleep Foundation, Sleep Health Journal 2015.
      </p>
    </div>
  );
}
