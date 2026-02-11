import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herramientas y Calculadoras de Uso General",
  description:
    "Calculadoras de uso diario: porcentajes, conversión de unidades y más. Herramientas simples para resolver cálculos cotidianos.",
  keywords: [
    "calculadora porcentajes",
    "calculadora descuentos",
    "conversor unidades",
    "calculadora online",
    "herramientas calculo",
    "calculadora gratis",
    "dias vividos",
    "diferencia fechas",
    "calculadora tiempo",
  ],
};

const calculadoras = [
  {
    nombre: "Calculadora de Porcentajes",
    descripcion: "Calcula cualquier porcentaje: aumentos, descuentos, diferencias y más",
    href: "/herramientas/calculadora-porcentajes",
    emoji: "%",
    gradient: "from-cyan-400 to-blue-500",
    bgHover: "group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50",
  },
  {
    nombre: "Calculadora de Descuentos",
    descripcion: "Calcula el precio final y cuánto ahorras con descuentos y ofertas",
    href: "/herramientas/calculadora-descuentos",
    emoji: "🏷️",
    gradient: "from-pink-400 to-rose-500",
    bgHover: "group-hover:bg-pink-50 dark:group-hover:bg-pink-950/50",
  },
  {
    nombre: "Conversor de Unidades",
    descripcion: "Convierte entre unidades de longitud, peso, temperatura y más",
    href: "/herramientas/conversor-unidades",
    emoji: "🔄",
    gradient: "from-indigo-400 to-purple-500",
    bgHover: "group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50",
  },
  {
    nombre: "Días Vividos",
    descripcion: "Descubre cuántos días, horas y minutos has vivido desde tu nacimiento",
    href: "/herramientas/calculadora-dias-vividos",
    emoji: "📅",
    gradient: "from-amber-400 to-orange-500",
    bgHover: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
  },
  {
    nombre: "Diferencia entre Fechas",
    descripcion: "Calcula el tiempo exacto entre dos fechas en años, meses y días",
    href: "/herramientas/calculadora-diferencia-fechas",
    emoji: "📆",
    gradient: "from-teal-400 to-cyan-500",
    bgHover: "group-hover:bg-teal-50 dark:group-hover:bg-teal-950/50",
  },
  {
    nombre: "Dividir Cuenta",
    descripcion: "Divide gastos entre amigos de forma justa y sin complicaciones",
    href: "/herramientas/calculadora-dividir-cuenta",
    emoji: "🧾",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  },
];

export default function HerramientasPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          Utilidades
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          Herramientas{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            del día a día
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Calculadoras de uso general para resolver cálculos cotidianos de forma rápida y sencilla.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {calculadoras.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="card-glass card-hover card-hover-indigo rounded-3xl p-8 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 ${calc.bgHover} transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 -z-10">
              <div className={`w-full h-full bg-gradient-to-br ${calc.gradient} rounded-full blur-3xl`} />
            </div>
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                {calc.emoji}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                {calc.nombre}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{calc.descripcion}</p>
              <div className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                Usar calculadora
                <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
