"use client";

const weightRanges = [
  { weight: 50, base: 1.75, color: "#7dd3fc" },
  { weight: 60, base: 2.1, color: "#38bdf8" },
  { weight: 70, base: 2.45, color: "#0ea5e9" },
  { weight: 80, base: 2.8, color: "#0284c7" },
  { weight: 90, base: 3.15, color: "#0369a1" },
  { weight: 100, base: 3.5, color: "#075985" },
];

const activityAdjustments = [
  { name: "Sedentario", extra: 0, icon: "🪑" },
  { name: "Ligero", extra: 350, icon: "🚶" },
  { name: "Moderado", extra: 500, icon: "🏃" },
  { name: "Intenso", extra: 750, icon: "🏋️" },
  { name: "Muy intenso", extra: 1000, icon: "⛰️" },
];

const climateAdjustments = [
  { name: "Templado", extra: 0 },
  { name: "Cálido", extra: 500 },
  { name: "Muy cálido", extra: 750 },
];

const waterFoods = [
  { name: "Pepino", percent: 96, color: "#22c55e" },
  { name: "Sandía", percent: 92, color: "#ef4444" },
  { name: "Naranja", percent: 87, color: "#f97316" },
  { name: "Manzana", percent: 84, color: "#84cc16" },
  { name: "Banano", percent: 74, color: "#eab308" },
  { name: "Arroz cocido", percent: 70, color: "#d4d4d4" },
];

export function HydrationChart() {
  const maxLiters = 4;

  return (
    <div className="my-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 text-center">
        Agua diaria recomendada según tu peso
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
        Base: 35 ml por kg de peso corporal (EFSA)
      </p>

      {/* Barras por peso */}
      <div className="space-y-3">
        {weightRanges.map((item) => {
          const widthPercent = (item.base / maxLiters) * 100;
          return (
            <div key={item.weight} className="flex items-center gap-3">
              <span className="w-14 text-right text-sm font-medium text-slate-600 dark:text-slate-300">
                {item.weight} kg
              </span>
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-7 relative overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-3 transition-all"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.color,
                  }}
                >
                  <span className="text-xs font-bold text-white">
                    {item.base.toFixed(1)} L
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ajustes por actividad */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
          Ajuste por nivel de actividad física
        </p>
        <div className="grid grid-cols-5 gap-2 text-center">
          {activityAdjustments.map((item) => (
            <div
              key={item.name}
              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50"
            >
              <p className="text-lg mb-1">{item.icon}</p>
              <p className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
                {item.name}
              </p>
              <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
                {item.extra === 0 ? "Base" : `+${item.extra} ml`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido de agua en alimentos */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
          Contenido de agua en alimentos comunes
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {waterFoods.map((food) => (
            <div key={food.name} className="text-center">
              <div className="relative w-full aspect-square rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-end overflow-hidden mb-1">
                <div
                  className="w-full transition-all rounded-b-lg"
                  style={{
                    height: `${food.percent}%`,
                    backgroundColor: `${food.color}40`,
                    borderTop: `2px solid ${food.color}`,
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-200">
                  {food.percent}%
                </span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400">
                {food.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
        Fuente: EFSA Panel on Dietetic Products, Nutrition and Allergies (2010).
        USDA FoodData Central.
      </p>
    </div>
  );
}
