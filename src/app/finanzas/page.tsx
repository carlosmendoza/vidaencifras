import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, categoryColors } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Calculadoras de Finanzas Personales Colombia",
  description:
    "Calculadoras financieras gratuitas: interés compuesto, préstamos, presupuesto 50/30/20, ahorro, jubilación e inflación. Toma el control de tu dinero.",
  keywords: [
    "calculadora financiera",
    "calculadora interes compuesto",
    "calculadora prestamos",
    "presupuesto 50 30 20",
    "calculadora ahorro",
    "calculadora jubilacion",
    "calculadora inflacion Colombia",
    "finanzas personales Colombia",
    "planificacion financiera",
  ],
};

const calculadoras = [
  {
    nombre: "Calculadora de Interés Compuesto",
    descripcion: "Calcula cuánto crecerá tu dinero con el tiempo gracias al poder del interés compuesto",
    href: "/finanzas/calculadora-interes-compuesto",
    emoji: "💰",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  },
  {
    nombre: "Calculadora de Préstamos",
    descripcion: "Calcula cuotas mensuales y tabla de amortización para cualquier préstamo",
    href: "/finanzas/calculadora-prestamos",
    emoji: "🏦",
    gradient: "from-rose-400 to-pink-500",
    bgHover: "group-hover:bg-rose-50 dark:group-hover:bg-rose-950/50",
  },
  {
    nombre: "Presupuesto 50/30/20",
    descripcion: "Organiza tu plata de forma simple: necesidades, deseos y ahorro",
    href: "/finanzas/calculadora-presupuesto",
    emoji: "📊",
    gradient: "from-violet-400 to-purple-500",
    bgHover: "group-hover:bg-violet-50 dark:group-hover:bg-violet-950/50",
  },
  {
    nombre: "Calculadora de Ahorro",
    descripcion: "Planifica cuánto ahorrar para alcanzar tus metas financieras",
    href: "/finanzas/calculadora-ahorro",
    emoji: "🎯",
    gradient: "from-blue-400 to-cyan-500",
    bgHover: "group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50",
  },
  {
    nombre: "Calculadora de Jubilación",
    descripcion: "Planifica tu retiro y calcula cuánto necesitas para vivir tranquilo",
    href: "/finanzas/calculadora-jubilacion",
    emoji: "🏖️",
    gradient: "from-orange-400 to-amber-500",
    bgHover: "group-hover:bg-orange-50 dark:group-hover:bg-orange-950/50",
  },
  {
    nombre: "Calculadora de Inflación",
    descripcion: "Entiende cómo la inflación afecta tu dinero con datos del IPC",
    href: "/finanzas/calculadora-inflacion",
    emoji: "📉",
    gradient: "from-red-400 to-rose-500",
    bgHover: "group-hover:bg-red-50 dark:group-hover:bg-red-950/50",
  },
  {
    nombre: "Dividir Cuenta",
    descripcion: "Divide gastos entre amigos de forma justa y sin complicaciones",
    href: "/finanzas/calculadora-dividir-cuenta",
    emoji: "🧾",
    gradient: "from-pink-400 to-rose-500",
    bgHover: "group-hover:bg-pink-50 dark:group-hover:bg-pink-950/50",
  },
];

export default function FinanzasPage() {
  const articulos = getAllPosts().filter((p) => p.category === "finanzas").slice(0, 2);

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Finanzas Personales
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          Domina tu dinero{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            con números
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Herramientas para planificar inversiones, entender préstamos y gestionar gastos compartidos.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calculadoras.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="card-glass card-hover rounded-3xl p-8 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 ${calc.bgHover} transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 -z-10">
              <div className={`w-full h-full bg-gradient-to-br ${calc.gradient} rounded-full blur-3xl`} />
            </div>
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                {calc.emoji}
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {calc.nombre}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{calc.descripcion}</p>
              <div className="mt-6 flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
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
              Artículos de Finanzas
            </h2>
            <Link
              href="/blog?categoria=finanzas"
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
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
                  Finanzas
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
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
