import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/lib/icons";
import { CategoryHero } from "@/components/CategoryHero";

export const metadata: Metadata = {
  title: "Calculadoras de Salud y Bienestar",
  description:
    "Calculadoras gratuitas de salud: calorías diarias (TDEE), índice de masa corporal (IMC), hidratación, frecuencia cardíaca y ciclos de sueño. Cuida tu bienestar con datos precisos.",
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
  alternates: {
    canonical: "https://vidaencifras.com/salud",
  },
};

const calculadoras = [
  {
    nombre: "Calculadora de Calorías (TDEE)",
    descripcion: "Calcula tu gasto calórico diario y macronutrientes según tu actividad física",
    href: "/salud/calculadora-calorias",
    icon: "flame",
    color: "bg-red-500",
  },
  {
    nombre: "Calculadora de IMC",
    descripcion: "Calcula tu índice de masa corporal y conoce tu peso ideal",
    href: "/salud/calculadora-imc",
    icon: "scale",
    color: "bg-red-500",
  },
  {
    nombre: "Calculadora de Hidratación",
    descripcion: "Descubre cuántos litros de agua necesitas beber según tu peso y actividad",
    href: "/salud/calculadora-hidratacion",
    icon: "droplets",
    color: "bg-red-500",
  },
  {
    nombre: "Calculadora de Frecuencia Cardíaca",
    descripcion: "Calcula tu FC máxima y zonas de entrenamiento personalizadas",
    href: "/salud/calculadora-frecuencia-cardiaca",
    icon: "heart",
    color: "bg-red-500",
  },
  {
    nombre: "Calculadora de Sueño",
    descripcion: "Optimiza tus ciclos de sueño para despertar descansado",
    href: "/salud/calculadora-sueno",
    icon: "moon",
    color: "bg-red-500",
  },
];

export default function SaludPage() {
  return (
    <div className="space-y-12">
      <CategoryHero
        pilar="salud"
        accentBarColor="bg-red-500 dark:bg-red-400"
        title={<>Cuida tu salud{" "}<span className="text-red-600 dark:text-red-400">con datos</span></>}
        description="Herramientas para entender mejor tu cuerpo y tomar decisiones informadas sobre tu bienestar físico."
      />

      <section className="grid gap-6 md:grid-cols-2">
        {calculadoras.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700/50 rounded-2xl p-8 group hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${calc.color} flex items-center justify-center text-white mb-6 shadow-md`}>
              <Icon name={calc.icon} className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
              {calc.nombre}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{calc.descripcion}</p>
            <div className="mt-6 text-red-600 dark:text-red-400 font-bold text-sm">
              Usar calculadora
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
