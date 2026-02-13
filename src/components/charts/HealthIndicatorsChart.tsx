"use client";

const indicators = [
  {
    name: "IMC",
    unit: "kg/m²",
    optimal: "18.5–24.9",
    risk: "≥ 30",
    color: "#22c55e",
    riskColor: "#ef4444",
    description: "Relación peso-altura",
    href: "/salud/calculadora-imc",
  },
  {
    name: "FC reposo",
    unit: "bpm",
    optimal: "60–80",
    risk: "> 100",
    color: "#3b82f6",
    riskColor: "#ef4444",
    description: "Latidos por minuto en reposo",
    href: "/salud/calculadora-frecuencia-cardiaca",
  },
  {
    name: "Horas de sueño",
    unit: "horas",
    optimal: "7–9",
    risk: "< 6",
    color: "#8b5cf6",
    riskColor: "#f97316",
    description: "Sueño por noche (adultos)",
    href: "/salud/calculadora-sueno",
  },
  {
    name: "Agua diaria",
    unit: "litros",
    optimal: "2.0–3.5",
    risk: "< 1.5",
    color: "#0ea5e9",
    riskColor: "#f97316",
    description: "Según peso y actividad",
    href: "/salud/calculadora-hidratacion",
  },
  {
    name: "TDEE",
    unit: "kcal",
    optimal: "1.800–2.500",
    risk: "< 1.200",
    color: "#f97316",
    riskColor: "#ef4444",
    description: "Gasto energético total diario",
    href: "/salud/calculadora-calorias",
  },
];

export function HealthIndicatorsChart() {
  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        5 Indicadores Clave de Salud
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Rangos saludables para adultos (18–64 años)
      </p>

      <div className="space-y-4">
        {indicators.map((ind) => (
          <div
            key={ind.name}
            className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
          >
            {/* Icono de color */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${ind.color}20` }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: ind.color }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-slate-800 dark:text-white text-sm">
                  {ind.name}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  {ind.description}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${ind.color}15`,
                    color: ind.color,
                  }}
                >
                  Óptimo: {ind.optimal} {ind.unit}
                </span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${ind.riskColor}15`,
                    color: ind.riskColor,
                  }}
                >
                  Riesgo: {ind.risk}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
        Fuentes: OMS, AHA, National Sleep Foundation, EFSA. Valores de
        referencia generales — consulta a tu médico para una evaluación
        personalizada.
      </p>
    </div>
  );
}
