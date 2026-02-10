import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, categoryColors } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Calculadoras de Productividad - Optimiza tu Tiempo y Hábitos",
  description:
    "Herramientas gratuitas para gestionar tu tiempo: calcula el valor real de tu hora, mide el impacto de tus hábitos, audita tus 168 horas semanales y visualiza tu vida en semanas.",
  keywords: [
    "productividad personal",
    "gestion del tiempo",
    "calculadora habitos",
    "valor hora trabajo",
    "vida en semanas",
    "auditoria tiempo",
    "desarrollo personal",
    "quantified self",
    "cuanto vale mi hora",
    "como distribuyo mi tiempo",
  ],
};

const herramientas = [
  {
    nombre: "Valor de tu Hora",
    descripcion: "Descubre cuánto vale realmente tu tiempo. Ingresa tu salario y gastos laborales (transporte, comida) para conocer tu tarifa real por hora.",
    href: "/productividad/valor-hora",
    emoji: "💎",
    gradient: "from-amber-400 to-orange-500",
    bgHover: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
  },
  {
    nombre: "Calculadora de Hábitos",
    descripcion: "¿Cuánto suman tus pequeños hábitos? Calcula el impacto a 1, 5 y 10 años de acciones diarias como ahorrar, leer, hacer ejercicio o dejar de fumar.",
    href: "/productividad/calculadora-habitos",
    emoji: "🎯",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  },
  {
    nombre: "Auditoría de Tiempo",
    descripcion: "Todos tenemos 168 horas a la semana. Registra cómo distribuyes tu tiempo entre trabajo, sueño, familia y ocio, y recibe sugerencias de mejora.",
    href: "/productividad/auditoria-tiempo",
    emoji: "⏱️",
    gradient: "from-blue-400 to-indigo-500",
    bgHover: "group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50",
  },
  {
    nombre: "Tu Vida en Semanas",
    descripcion: "Visualiza tu vida como una cuadrícula donde cada cuadrito es una semana. Descubre cuántas semanas has vivido y cuántas te quedan.",
    href: "/productividad/vida-en-semanas",
    emoji: "📊",
    gradient: "from-purple-400 to-pink-500",
    bgHover: "group-hover:bg-purple-50 dark:group-hover:bg-purple-950/50",
  },
];

export default function ProductividadPage() {
  const articulos = getAllPosts().filter((p) => p.category === "productividad").slice(0, 2);

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

      <section className="grid gap-6 md:grid-cols-2">
        {herramientas.map((herr) => (
          <Link
            key={herr.href}
            href={herr.href}
            className="card-glass card-hover rounded-3xl p-8 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 ${herr.bgHover} transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 -z-10">
              <div className={`w-full h-full bg-gradient-to-br ${herr.gradient} rounded-full blur-3xl`} />
            </div>
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${herr.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                {herr.emoji}
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {herr.nombre}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{herr.descripcion}</p>
              <div className="mt-6 flex items-center text-amber-600 dark:text-amber-400 font-bold text-sm">
                Usar calculadora
                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {articulos.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Artículos de Productividad
            </h2>
            <Link
              href="/blog?categoria=productividad"
              className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {articulos.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-glass card-hover rounded-2xl p-6 group"
              >
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${categoryColors[post.category]} text-white mb-3`}
                >
                  Productividad
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
