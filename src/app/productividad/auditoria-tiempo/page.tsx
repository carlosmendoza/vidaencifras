"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Icon } from "@/lib/icons";

const faqs = [
  {
    question: "¿Por qué 168 horas?",
    answer:
      "Todos tenemos exactamente 168 horas a la semana (24 horas × 7 días). Es el gran ecualizador: millonarios y personas comunes tienen el mismo tiempo. La diferencia está en cómo lo usan.",
  },
  {
    question: "¿Cuántas horas debería dormir?",
    answer:
      "Los adultos necesitan 7-9 horas por noche (49-63 horas semanales). Dormir menos de 6 horas afecta la memoria, el sistema inmune y aumenta el riesgo de enfermedades crónicas.",
  },
  {
    question: "¿Cuánto tiempo de ocio es saludable?",
    answer:
      "Se recomienda entre 2-5 horas de tiempo libre de calidad al día. Muy poco causa agotamiento; demasiado sin propósito puede causar insatisfacción. El balance es clave.",
  },
  {
    question: "¿Cómo puedo encontrar más tiempo?",
    answer:
      "Audita primero: registra tu tiempo real por una semana. Identifica 'fugas' como redes sociales o reuniones innecesarias. Pequeños ajustes (20-30 min/día) suman 2+ horas semanales.",
  },
];

interface Categoria {
  id: string;
  nombre: string;
  icon: string;
  color: string;
  minRecomendado: number;
  maxRecomendado: number;
  descripcion: string;
}

const categorias: Categoria[] = [
  {
    id: "sueño",
    nombre: "Sueño",
    icon: "moon",
    color: "#6366f1",
    minRecomendado: 49,
    maxRecomendado: 63,
    descripcion: "Dormir y descanso nocturno",
  },
  {
    id: "trabajo",
    nombre: "Trabajo",
    icon: "briefcase",
    color: "#f59e0b",
    minRecomendado: 35,
    maxRecomendado: 50,
    descripcion: "Empleo, freelance, negocios",
  },
  {
    id: "traslado",
    nombre: "Traslado",
    icon: "car",
    color: "#64748b",
    minRecomendado: 0,
    maxRecomendado: 10,
    descripcion: "Transporte al trabajo y diligencias",
  },
  {
    id: "familia",
    nombre: "Familia",
    icon: "family",
    color: "#ec4899",
    minRecomendado: 10,
    maxRecomendado: 30,
    descripcion: "Tiempo con pareja, hijos, padres",
  },
  {
    id: "ejercicio",
    nombre: "Ejercicio",
    icon: "run",
    color: "#10b981",
    minRecomendado: 3,
    maxRecomendado: 10,
    descripcion: "Deporte, gimnasio, caminatas",
  },
  {
    id: "comidas",
    nombre: "Comidas",
    icon: "utensils",
    color: "#f97316",
    minRecomendado: 7,
    maxRecomendado: 14,
    descripcion: "Preparar y comer alimentos",
  },
  {
    id: "higiene",
    nombre: "Higiene",
    icon: "shower",
    color: "#06b6d4",
    minRecomendado: 5,
    maxRecomendado: 10,
    descripcion: "Aseo personal, arreglarse",
  },
  {
    id: "ocio",
    nombre: "Ocio",
    icon: "tv",
    color: "#8b5cf6",
    minRecomendado: 10,
    maxRecomendado: 25,
    descripcion: "TV, redes, videojuegos, hobbies",
  },
  {
    id: "desarrollo",
    nombre: "Desarrollo",
    icon: "books",
    color: "#3b82f6",
    minRecomendado: 5,
    maxRecomendado: 20,
    descripcion: "Estudiar, leer, aprender",
  },
  {
    id: "otros",
    nombre: "Otros",
    icon: "clipboard",
    color: "#78716c",
    minRecomendado: 0,
    maxRecomendado: 20,
    descripcion: "Tareas del hogar, trámites, etc.",
  },
];

interface Alerta {
  categoria: string;
  tipo: "warning" | "danger" | "success";
  mensaje: string;
}

export default function AuditoriaTiempoPage() {
  const [horas, setHoras] = useState<Record<string, string>>(() => {
    const inicial: Record<string, string> = {};
    categorias.forEach((c) => (inicial[c.id] = ""));
    return inicial;
  });
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const totalHoras = useMemo(() => {
    return Object.values(horas).reduce((sum, h) => sum + (parseFloat(h) || 0), 0);
  }, [horas]);

  const horasRestantes = 168 - totalHoras;

  const handleHoraChange = (id: string, valor: string) => {
    setHoras((prev) => ({ ...prev, [id]: valor }));
    setMostrarResultado(false);
  };

  const calcularResultado = () => {
    if (Math.abs(horasRestantes) > 0.5) return;
    setMostrarResultado(true);
  };

  const datosGrafico = useMemo(() => {
    return categorias
      .map((c) => ({
        name: c.nombre,
        value: parseFloat(horas[c.id]) || 0,
        color: c.color,
      }))
      .filter((d) => d.value > 0);
  }, [horas]);

  const alertas = useMemo((): Alerta[] => {
    const resultado: Alerta[] = [];

    categorias.forEach((c) => {
      const valor = parseFloat(horas[c.id]) || 0;
      if (valor === 0) return;

      if (valor < c.minRecomendado) {
        if (c.id === "sueño" && valor < 42) {
          resultado.push({
            categoria: c.nombre,
            tipo: "danger",
            mensaje: `Menos de 6h/noche de sueño es peligroso para tu salud`,
          });
        } else if (c.id === "ejercicio" && valor < 2) {
          resultado.push({
            categoria: c.nombre,
            tipo: "warning",
            mensaje: `Muy poco ejercicio. La OMS recomienda mínimo 150 min/semana`,
          });
        } else if (c.minRecomendado > 0) {
          resultado.push({
            categoria: c.nombre,
            tipo: "warning",
            mensaje: `Por debajo del mínimo recomendado (${c.minRecomendado}h)`,
          });
        }
      } else if (valor > c.maxRecomendado) {
        if (c.id === "trabajo" && valor > 60) {
          resultado.push({
            categoria: c.nombre,
            tipo: "danger",
            mensaje: `Más de 60h de trabajo aumenta riesgo de burnout`,
          });
        } else if (c.id === "ocio" && valor > 35) {
          resultado.push({
            categoria: c.nombre,
            tipo: "warning",
            mensaje: `Mucho tiempo de ocio pasivo puede afectar tu bienestar`,
          });
        } else if (c.id === "traslado" && valor > 15) {
          resultado.push({
            categoria: c.nombre,
            tipo: "warning",
            mensaje: `Mucho tiempo en traslados. ¿Trabajo remoto es opción?`,
          });
        } else {
          resultado.push({
            categoria: c.nombre,
            tipo: "warning",
            mensaje: `Por encima del máximo recomendado (${c.maxRecomendado}h)`,
          });
        }
      } else {
        resultado.push({
          categoria: c.nombre,
          tipo: "success",
          mensaje: `Dentro del rango recomendado`,
        });
      }
    });

    return resultado;
  }, [horas]);

  const puntuacionBalance = useMemo(() => {
    let puntos = 100;
    const penalizaciones: number[] = [];

    categorias.forEach((c) => {
      const valor = parseFloat(horas[c.id]) || 0;
      if (valor === 0 && c.minRecomendado > 0) {
        penalizaciones.push(15); // No registró una categoría importante
        return;
      }

      const rango = c.maxRecomendado - c.minRecomendado;
      if (valor < c.minRecomendado) {
        const diferencia = c.minRecomendado - valor;
        const penalizacion = Math.min(15, (diferencia / Math.max(rango, 1)) * 20);
        penalizaciones.push(penalizacion);
      } else if (valor > c.maxRecomendado) {
        const diferencia = valor - c.maxRecomendado;
        const penalizacion = Math.min(15, (diferencia / Math.max(rango, 1)) * 15);
        penalizaciones.push(penalizacion);
      }
    });

    puntos -= penalizaciones.reduce((a, b) => a + b, 0);
    return Math.max(0, Math.round(puntos));
  }, [horas]);

  const sugerencias = useMemo(() => {
    const lista: string[] = [];
    const sueño = parseFloat(horas.sueño) || 0;
    const trabajo = parseFloat(horas.trabajo) || 0;
    const ejercicio = parseFloat(horas.ejercicio) || 0;
    const ocio = parseFloat(horas.ocio) || 0;
    const desarrollo = parseFloat(horas.desarrollo) || 0;

    if (sueño < 49) {
      lista.push(
        "Prioriza el sueño: intenta acostarte 30 minutos antes. El sueño es la base de todo."
      );
    }
    if (trabajo > 50 && ocio < 10) {
      lista.push(
        "Tu balance trabajo-vida está desequilibrado. Agenda tiempo de ocio como si fueran reuniones."
      );
    }
    if (ejercicio < 3) {
      lista.push(
        "Incorpora 30 min de caminata diaria. No necesitas gimnasio para moverte más."
      );
    }
    if (desarrollo < 5 && trabajo < 50) {
      lista.push(
        "Dedica al menos 30 min/día a aprender algo nuevo. Tu yo del futuro te lo agradecerá."
      );
    }
    if (ocio > 25) {
      lista.push(
        "Considera reemplazar parte del ocio pasivo por hobbies activos o tiempo social."
      );
    }

    if (lista.length === 0) {
      lista.push(
        "¡Tu distribución de tiempo se ve equilibrada! Sigue así y ajusta según cómo te sientas."
      );
    }

    return lista;
  }, [horas]);

  const getColorPuntuacion = () => {
    if (puntuacionBalance >= 80) return "text-emerald-600";
    if (puntuacionBalance >= 60) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="space-y-8">
      <Link
        href="/productividad"
        className="text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Productividad
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-xl shadow-orange-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="clock" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Auditoría de Tiempo
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Todos tenemos 168 horas a la semana. ¿Cómo usas las tuyas?
          </p>
        </div>

        {/* Contador de horas */}
        <div
          className={`mb-8 p-4 rounded-2xl text-center ${Math.abs(horasRestantes) <= 0.5
            ? "bg-emerald-50 dark:bg-emerald-950/30"
            : horasRestantes > 0
              ? "bg-amber-50 dark:bg-amber-950/30"
              : "bg-rose-50 dark:bg-rose-950/30"
            }`}
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Horas asignadas: <strong>{totalHoras.toFixed(1)}</strong> / 168
          </p>
          <p
            className={`text-lg font-bold ${Math.abs(horasRestantes) <= 0.5
              ? "text-emerald-600"
              : horasRestantes > 0
                ? "text-amber-600"
                : "text-rose-600"
              }`}
          >
            {Math.abs(horasRestantes) <= 0.5
              ? "¡Perfecto! Todas las horas asignadas"
              : horasRestantes > 0
                ? `Faltan ${horasRestantes.toFixed(1)} horas por asignar`
                : `Te pasaste por ${Math.abs(horasRestantes).toFixed(1)} horas`}
          </p>
        </div>

        {/* Inputs de categorías */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {categorias.map((c) => (
            <div key={c.id} className="space-y-2">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Icon name={c.icon} className="w-4 h-4" />
                {c.nombre}
              </label>
              <input
                type="number"
                value={horas[c.id]}
                onChange={(e) => handleHoraChange(c.id, e.target.value)}
                placeholder="0"
                min="0"
                max="168"
                step="0.5"
                className="w-full px-3 py-3 rounded-xl text-center font-semibold text-sm"
              />
              <p className="text-[10px] text-slate-400 text-center">{c.minRecomendado}-{c.maxRecomendado}h</p>
            </div>
          ))}
        </div>

        <button
          onClick={calcularResultado}
          disabled={Math.abs(horasRestantes) > 0.5}
          className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-[0.99] ${Math.abs(horasRestantes) <= 0.5
            ? "bg-orange-500 hover:bg-orange-600 text-white"
            : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
        >
          Analizar mi tiempo
        </button>

        {mostrarResultado && (
          <div className="mt-10 space-y-8">
            {/* Gráfico */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">
                Distribución de tu semana
              </h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={datosGrafico}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}h`}
                      labelLine={false}
                    >
                      {datosGrafico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} horas`, ""]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Leyenda */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {datosGrafico.map((d) => (
                  <div key={d.name} className="flex items-center gap-1 text-xs">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-slate-600 dark:text-slate-400">
                      <Icon name={categorias.find(cat => cat.nombre === d.name)?.icon || ""} className="w-3 h-3 inline mr-1" /> {d.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Puntuación */}
            <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Tu puntuación de balance
              </p>
              <p className={`text-6xl font-black ${getColorPuntuacion()}`}>
                {puntuacionBalance}
              </p>
              <p className="text-slate-400 mt-1">de 100</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                {puntuacionBalance >= 80
                  ? "¡Excelente! Tienes una distribución muy equilibrada"
                  : puntuacionBalance >= 60
                    ? "Bien, pero hay áreas que podrías mejorar"
                    : "Tu distribución tiene varios desequilibrios importantes"}
              </p>
            </div>

            {/* Alertas */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-700 dark:text-slate-300">
                Análisis por categoría
              </h3>
              <div className="grid gap-2">
                {alertas.map((alerta, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl flex items-center gap-3 ${alerta.tipo === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/30"
                      : alerta.tipo === "warning"
                        ? "bg-amber-50 dark:bg-amber-950/30"
                        : "bg-rose-50 dark:bg-rose-950/30"
                      }`}
                  >
                    <Icon name={alerta.tipo === "success" ? "check-circle" : alerta.tipo === "warning" ? "warning" : "warning-octagon"} className={`w-6 h-6 ${alerta.tipo === "success" ? "text-emerald-500" : alerta.tipo === "warning" ? "text-amber-500" : "text-rose-500"
                      }`} weight="fill" />
                    <div>
                      <p
                        className={`font-semibold text-sm ${alerta.tipo === "success"
                          ? "text-emerald-700 dark:text-emerald-300"
                          : alerta.tipo === "warning"
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-rose-700 dark:text-rose-300"
                          }`}
                      >
                        {alerta.categoria}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {alerta.mensaje}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sugerencias */}
            <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-800">
              <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                <Icon name="lightbulb" className="w-5 h-5" weight="fill" /> Sugerencias personalizadas
              </h3>
              <ul className="space-y-2">
                {sugerencias.map((s, i) => (
                  <li
                    key={i}
                    className="text-sm text-orange-700 dark:text-orange-300 flex gap-2"
                  >
                    <span>•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Información educativa */}
      <div className="max-w-3xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <Icon name="lightbulb" className="w-8 h-8 text-orange-500" weight="fill" />
            Distribución recomendada
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {categorias.map((c) => (
              <div key={c.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center">
                <Icon name={c.icon} className="w-6 h-6 mb-1 text-slate-600 dark:text-slate-300" />
                <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  {c.nombre}
                </p>
                <p className="text-xs text-slate-500">
                  {c.minRecomendado}-{c.maxRecomendado}h
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <FAQ items={faqs} colorClass="orange" />
        </div>
      </div>
    </div>
  );
}
