"use client";

import { useMemo } from "react";
import { Icon } from "@/lib/icons";

interface WeeksGridProps {
  semanasVividas: number;
  semanasTotal: number;
  expectativaVida: number;
  hitos?: { semana: number; nombre: string; icon: string }[];
}

export function WeeksGrid({
  semanasVividas,
  semanasTotal,
  expectativaVida,
  hitos = [],
}: WeeksGridProps) {
  const años = expectativaVida;
  const semanasPorAño = 52;

  const hitosMap = useMemo(() => {
    const map = new Map<number, { nombre: string; icon: string }>();
    hitos.forEach((h) => map.set(h.semana, { nombre: h.nombre, icon: h.icon }));
    return map;
  }, [hitos]);

  const getColorSemana = (semanaAbsoluta: number) => {
    if (semanaAbsoluta < semanasVividas) {
      // Semana vivida
      const año = Math.floor(semanaAbsoluta / 52);
      if (año < 18) return "bg-blue-400 dark:bg-blue-500"; // Infancia/adolescencia
      if (año < 30) return "bg-emerald-400 dark:bg-emerald-500"; // Juventud
      if (año < 50) return "bg-amber-400 dark:bg-amber-500"; // Madurez
      if (año < 65) return "bg-orange-400 dark:bg-orange-500"; // Pre-retiro
      return "bg-rose-400 dark:bg-rose-500"; // Retiro
    }
    return "bg-slate-200 dark:bg-slate-700"; // Por vivir
  };

  const marcasAño = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  return (
    <div className="space-y-4">
      {/* Leyenda de colores */}
      <div className="flex flex-wrap justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-blue-400" />
          <span className="text-slate-600 dark:text-slate-400">0-17 años</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          <span className="text-slate-600 dark:text-slate-400">18-29 años</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-amber-400" />
          <span className="text-slate-600 dark:text-slate-400">30-49 años</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-orange-400" />
          <span className="text-slate-600 dark:text-slate-400">50-64 años</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-rose-400" />
          <span className="text-slate-600 dark:text-slate-400">65+ años</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" />
          <span className="text-slate-600 dark:text-slate-400">Por vivir</span>
        </div>
      </div>

      {/* Grid de semanas */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[600px]">
          {/* Números de columna (semanas) */}
          <div className="flex mb-1 ml-8">
            {[1, 10, 20, 30, 40, 52].map((s) => (
              <div
                key={s}
                className="text-[8px] text-slate-400"
                style={{
                  marginLeft: s === 1 ? 0 : `${((s - 1) / 52) * 100 - (s === 1 ? 0 : 2)}%`,
                  position: s === 1 ? "relative" : "absolute",
                }}
              >
                {s === 1 ? "Sem 1" : s === 52 ? "52" : s}
              </div>
            ))}
          </div>

          {/* Filas por año */}
          <div className="space-y-[2px]">
            {Array.from({ length: años }, (_, año) => {
              const semanaInicioAño = año * semanasPorAño;
              return (
                <div key={año} className="flex items-center gap-1">
                  {/* Etiqueta de año */}
                  <div className="w-7 text-right text-[9px] text-slate-400 font-medium pr-1">
                    {marcasAño.includes(año) ? año : ""}
                  </div>
                  {/* Semanas del año */}
                  <div className="flex gap-[1px] flex-1">
                    {Array.from({ length: semanasPorAño }, (_, semana) => {
                      const semanaAbsoluta = semanaInicioAño + semana;
                      const hito = hitosMap.get(semanaAbsoluta);
                      const esActual =
                        semanaAbsoluta >= semanasVividas - 1 &&
                        semanaAbsoluta <= semanasVividas;

                      return (
                        <div
                          key={semana}
                          className={`
                            w-[calc((100%-51px)/52)] aspect-square rounded-[1px]
                            ${getColorSemana(semanaAbsoluta)}
                            ${esActual ? "ring-2 ring-indigo-500 ring-offset-1" : ""}
                            ${hito ? "ring-1 ring-amber-500" : ""}
                            transition-transform hover:scale-150 hover:z-10
                          `}
                          title={
                            hito
                              ? `${hito.nombre} (Año ${año}, Semana ${semana + 1})`
                              : `Año ${año}, Semana ${semana + 1}`
                          }
                        >
                          {hito && (
                            <span className="flex items-center justify-center h-full text-white">
                              <Icon name={hito.icon} className="w-2 h-2" weight="fill" />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Estadísticas visuales */}
      <div className="flex justify-center gap-2 text-xs">
        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
          <span className="text-slate-500">Vividas:</span>{" "}
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {semanasVividas.toLocaleString()}
          </span>
        </div>
        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
          <span className="text-slate-500">Restantes:</span>{" "}
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {(semanasTotal - semanasVividas).toLocaleString()}
          </span>
        </div>
        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
          <span className="text-slate-500">Total:</span>{" "}
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {semanasTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
