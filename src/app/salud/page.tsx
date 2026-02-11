import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Calculadoras de Salud y Bienestar",
  description:
    "Calculadoras gratuitas para tu salud: calorías diarias (TDEE), índice de masa corporal (IMC) y más. Cuida tu bienestar con datos precisos.",
  keywords: [
    "calculadora salud",
    "calculadora calorias",
    "calculadora TDEE",
    "calculadora IMC",
    "indice masa corporal",
    "gasto calorico",
    "macronutrientes",
    "calculadora hidratacion",
    "frecuencia cardiaca",
    "ciclos de sueño",
  ],
};

const calculadoras = [
  {
    nombre: "Calculadora de Calorías (TDEE)",
    descripcion: "Calcula tu gasto calórico diario y macronutrientes según tu actividad física",
    href: "/salud/calculadora-calorias",
    icon: "flame",
    gradient: "from-orange-400 to-red-500",
    bgHover: "group-hover:bg-orange-50 dark:group-hover:bg-orange-950/50",
  },
  {
    nombre: "Calculadora de IMC",
    descripcion: "Calcula tu índice de masa corporal y conoce tu peso ideal",
    href: "/salud/calculadora-imc",
    icon: "scale",
    gradient: "from-violet-400 to-purple-500",
    bgHover: "group-hover:bg-violet-50 dark:group-hover:bg-violet-950/50",
  },
  {
    nombre: "Calculadora de Hidratación",
    descripcion: "Descubre cuántos litros de agua necesitas beber según tu peso y actividad",
    href: "/salud/calculadora-hidratacion",
    icon: "droplets",
    gradient: "from-cyan-400 to-blue-500",
    bgHover: "group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50",
  },
  {
    nombre: "Calculadora de Frecuencia Cardíaca",
    descripcion: "Calcula tu FC máxima y zonas de entrenamiento personalizadas",
    href: "/salud/calculadora-frecuencia-cardiaca",
    icon: "heart",
    gradient: "from-rose-400 to-red-500",
    bgHover: "group-hover:bg-rose-50 dark:group-hover:bg-rose-950/50",
  },
  {
    nombre: "Calculadora de Sueño",
    descripcion: "Optimiza tus ciclos de sueño para despertar descansado",
    href: "/salud/calculadora-sueno",
    icon: "moon",
    gradient: "from-indigo-400 to-purple-500",
    bgHover: "group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50",
  },
];

export default function SaludPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-sm font-semibold">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          Salud y Bienestar
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          Cuida tu salud{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            con datos
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Herramientas para entender mejor tu cuerpo y tomar decisiones informadas sobre tu bienestar físico.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {calculadoras.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="card-glass card-hover card-hover-red rounded-3xl p-8 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 ${calc.bgHover} transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 -z-10">
              <div className={`w-full h-full bg-gradient-to-br ${calc.gradient} rounded-full blur-3xl`} />
            </div>
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                <Icon name={calc.icon} className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                {calc.nombre}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{calc.descripcion}</p>
              <div className="mt-6 flex items-center text-red-600 dark:text-red-400 font-bold text-sm">
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
