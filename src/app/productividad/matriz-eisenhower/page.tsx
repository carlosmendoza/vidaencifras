"use client";

import { useState, useMemo } from "react";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/lib/icons";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";

interface Tarea {
  id: string;
  texto: string;
  urgente: boolean;
  importante: boolean;
  completada: boolean;
}

type Cuadrante = "hacer" | "programar" | "delegar" | "eliminar";

const cuadranteInfo: Record<Cuadrante, { titulo: string; icon: string; color: string; bgColor: string; accion: string }> = {
  hacer: {
    titulo: "HACER",
    icon: "lightning",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    accion: "Hazlo ahora, no lo pospongas",
  },
  programar: {
    titulo: "PROGRAMAR",
    icon: "bell",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
    accion: "Agenda un momento específico",
  },
  delegar: {
    titulo: "DELEGAR",
    icon: "users",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
    accion: "¿Quién puede hacerlo por ti?",
  },
  eliminar: {
    titulo: "ELIMINAR",
    icon: "trash",
    color: "text-slate-500 dark:text-slate-400",
    bgColor: "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700",
    accion: "Deja de hacerlo",
  },
};

export default function MatrizEisenhower() {
  useCalculatorTracking();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [importante, setImportante] = useState(false);

  const agregarTarea = () => {
    if (!nuevaTarea.trim()) return;

    const tarea: Tarea = {
      id: Date.now().toString(),
      texto: nuevaTarea.trim(),
      urgente,
      importante,
      completada: false,
    };

    setTareas((prev) => [...prev, tarea]);
    setNuevaTarea("");
    setUrgente(false);
    setImportante(false);
  };

  const toggleCompletada = (id: string) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const eliminarTarea = (id: string) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  const moverTarea = (id: string, urgente: boolean, importante: boolean) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, urgente, importante } : t))
    );
  };

  const getCuadrante = (tarea: Tarea): Cuadrante => {
    if (tarea.urgente && tarea.importante) return "hacer";
    if (!tarea.urgente && tarea.importante) return "programar";
    if (tarea.urgente && !tarea.importante) return "delegar";
    return "eliminar";
  };

  const tareasPorCuadrante = useMemo(() => {
    return {
      hacer: tareas.filter((t) => t.urgente && t.importante),
      programar: tareas.filter((t) => !t.urgente && t.importante),
      delegar: tareas.filter((t) => t.urgente && !t.importante),
      eliminar: tareas.filter((t) => !t.urgente && !t.importante),
    };
  }, [tareas]);

  const exportarLista = () => {
    const lineas = Object.entries(tareasPorCuadrante).flatMap(([cuadrante, items]) => {
      if (items.length === 0) return [];
      const info = cuadranteInfo[cuadrante as Cuadrante];
      return [
        `\n${info.icon.toUpperCase()} ${info.titulo}`,
        ...items.map((t) => `  ${t.completada ? "✓" : "○"} ${t.texto}`),
      ];
    });

    const texto = `Matriz de Eisenhower - ${new Date().toLocaleDateString("es-CO")}\n${lineas.join("\n")}`;

    navigator.clipboard.writeText(texto);
    alert("Lista copiada al portapapeles");
  };

  const limpiarCompletadas = () => {
    setTareas((prev) => prev.filter((t) => !t.completada));
  };

  const stats = useMemo(() => {
    const total = tareas.length;
    const completadas = tareas.filter((t) => t.completada).length;
    return { total, completadas, pendientes: total - completadas };
  }, [tareas]);

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-6xl mx-auto shadow-xl shadow-orange-500/5">
        <CalculatorHeader
          title="Matriz de Eisenhower"
          subtitle="Prioriza tus tareas según urgencia e importancia"
          icon="grid"
          gradient="productividad"
        />

        {/* Agregar nueva tarea */}
        <div className="mb-8 p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
              placeholder="Nueva tarea..."
              className="flex-1 px-5 py-3 rounded-xl text-lg"
            />
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgente}
                  onChange={(e) => setUrgente(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-red-300 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Urgente</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={importante}
                  onChange={(e) => setImportante(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-blue-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Importante</span>
              </label>
              <button
                onClick={agregarTarea}
                className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas y acciones */}
        {tareas.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                {stats.total} tareas • {stats.completadas} completadas • {stats.pendientes} pendientes
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={limpiarCompletadas}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                Limpiar completadas
              </button>
              <button
                onClick={exportarLista}
                className="px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-2"
              >
                <Icon name="clipboard" className="w-4 h-4" /> Copiar lista
              </button>
            </div>
          </div>
        )}

        {/* Matriz 2x2 */}
        <div className="space-y-4">
          {/* Encabezados de columnas */}
          <div className="hidden md:grid md:grid-cols-2 gap-4">
            <div className="text-center">
              <span className="text-sm font-bold text-red-500 inline-flex items-center gap-1 justify-center"><Icon name="lightning" className="w-4 h-4" /> URGENTE</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-slate-400">NO URGENTE</span>
            </div>
          </div>

          {/* Fila 1: Importante */}
          <div>
            <div className="hidden md:block mb-2">
              <span className="text-sm font-bold text-blue-500 inline-flex items-center gap-1"><Icon name="target" className="w-4 h-4" /> IMPORTANTE</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CuadranteCard
                cuadrante="hacer"
                tareas={tareasPorCuadrante.hacer}
                onToggle={toggleCompletada}
                onDelete={eliminarTarea}
                onMove={moverTarea}
              />
              <CuadranteCard
                cuadrante="programar"
                tareas={tareasPorCuadrante.programar}
                onToggle={toggleCompletada}
                onDelete={eliminarTarea}
                onMove={moverTarea}
              />
            </div>
          </div>

          {/* Fila 2: No importante */}
          <div>
            <div className="hidden md:block mb-2">
              <span className="text-sm font-bold text-slate-400">NO IMPORTANTE</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CuadranteCard
                cuadrante="delegar"
                tareas={tareasPorCuadrante.delegar}
                onToggle={toggleCompletada}
                onDelete={eliminarTarea}
                onMove={moverTarea}
              />
              <CuadranteCard
                cuadrante="eliminar"
                tareas={tareasPorCuadrante.eliminar}
                onToggle={toggleCompletada}
                onDelete={eliminarTarea}
                onMove={moverTarea}
              />
            </div>
          </div>
        </div>

        {tareas.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg">Agrega tareas para comenzar a priorizarlas</p>
            <p className="text-sm mt-2">Marca si son urgentes y/o importantes</p>
          </div>
        )}
      </div>

      {/* Guía rápida */}
      <div className="max-w-6xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <Icon name="lightbulb" className="w-8 h-8 text-orange-500" weight="fill" />
            Guía de los 4 Cuadrantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.entries(cuadranteInfo) as [Cuadrante, typeof cuadranteInfo[Cuadrante]][]).map(([key, info]) => (
              <div key={key} className={`p-4 rounded-xl border ${info.bgColor}`}>
                <h3 className={`font-bold ${info.color} flex items-center gap-2`}>
                  <Icon name={info.icon} className="w-5 h-5" weight="fill" /> {info.titulo}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{info.accion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CalculatorFooter href="/productividad/matriz-eisenhower" />
    </div>
  );
}

function CuadranteCard({
  cuadrante,
  tareas,
  onToggle,
  onDelete,
  onMove,
}: {
  cuadrante: Cuadrante;
  tareas: Tarea[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, urgente: boolean, importante: boolean) => void;
}) {
  const info = cuadranteInfo[cuadrante];

  return (
    <div className={`p-4 rounded-2xl border-2 min-h-[200px] ${info.bgColor}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-bold ${info.color} flex items-center gap-2`}>
          <Icon name={info.icon} className="w-5 h-5" weight="bold" /> {info.titulo}
        </h3>
        <span className="text-xs text-slate-400 bg-white/50 dark:bg-slate-900/50 px-2 py-1 rounded-full">
          {tareas.length}
        </span>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{info.accion}</p>

      <div className="space-y-2">
        {tareas.map((tarea) => (
          <div
            key={tarea.id}
            className={`flex items-start gap-2 p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 group ${tarea.completada ? "opacity-50" : ""
              }`}
          >
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => onToggle(tarea.id)}
              className="mt-1 w-4 h-4 rounded border-2 border-slate-300 text-emerald-500 focus:ring-emerald-500"
            />
            <span
              className={`flex-1 text-sm text-slate-700 dark:text-slate-300 ${tarea.completada ? "line-through" : ""
                }`}
            >
              {tarea.texto}
            </span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {cuadrante !== "hacer" && (
                <button
                  onClick={() => onMove(tarea.id, true, true)}
                  className="p-1 text-red-400 hover:text-red-600"
                  title="Mover a Hacer"
                >
                  <Icon name="lightning" weight="fill" className="w-4 h-4 text-red-400 hover:text-red-500" />
                </button>
              )}
              {cuadrante !== "programar" && (
                <button
                  onClick={() => onMove(tarea.id, false, true)}
                  className="p-1 text-blue-400 hover:text-blue-600"
                  title="Mover a Programar"
                >
                  <Icon name="bell" weight="fill" className="w-4 h-4 text-blue-400 hover:text-blue-500" />
                </button>
              )}
              <button
                onClick={() => onDelete(tarea.id)}
                className="p-1 text-slate-400 hover:text-red-500"
                title="Eliminar"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
