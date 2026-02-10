import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productividad y Desarrollo Personal",
  description:
    "Herramientas de productividad: gestión del tiempo, seguimiento de hábitos, metas y desarrollo personal. Próximamente disponibles.",
  keywords: [
    "productividad",
    "productividad personal",
    "gestion del tiempo",
    "vida en semanas",
    "desarrollo personal",
    "habitos",
    "metas",
    "quantified self",
  ],
};

const proximamente = [
  {
    nombre: "Tu Vida en Semanas",
    descripcion: "Visualiza tu vida entera en una cuadrícula de semanas",
    emoji: "📊",
  },
  {
    nombre: "Calculadora de Hábitos",
    descripcion: "Mide el impacto acumulado de tus hábitos diarios",
    emoji: "🎯",
  },
  {
    nombre: "Auditoría de Tiempo",
    descripcion: "Analiza en qué inviertes tu tiempo semanal",
    emoji: "⏱️",
  },
  {
    nombre: "Valor de tu Hora",
    descripcion: "Calcula cuánto vale realmente una hora de tu tiempo",
    emoji: "💎",
  },
];

export default function ProductividadPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-sm font-semibold">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Productividad
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          Optimiza tu{" "}
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            tiempo
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Herramientas para medir tu productividad, visualizar tu tiempo y tomar el control de tus metas y hábitos.
        </p>
      </section>

      <section className="card-glass rounded-3xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
          🚧
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Próximamente
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
          Estamos desarrollando herramientas de productividad y desarrollo personal.
          Mientras tanto, explora nuestras otras calculadoras.
        </p>
        <Link
          href="/herramientas"
          className="btn-primary inline-flex items-center gap-2"
        >
          Ver herramientas disponibles
          <span>→</span>
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">
          Lo que estamos preparando
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {proximamente.map((item) => (
            <div
              key={item.nombre}
              className="card-glass rounded-2xl p-6 flex items-center gap-4 opacity-75"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl flex-shrink-0">
                {item.emoji}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">
                  {item.nombre}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
