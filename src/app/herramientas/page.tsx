import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Herramientas y Calculadoras de Uso General",
  description:
    "Calculadoras de uso diario: porcentajes, descuentos, conversión de unidades, diferencia entre fechas y más. Herramientas simples para resolver cálculos cotidianos.",
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
    icon: "percent",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Calculadora de Descuentos",
    descripcion: "Calcula el precio final y cuánto ahorras con descuentos y ofertas",
    href: "/herramientas/calculadora-descuentos",
    icon: "tag",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Conversor de Unidades",
    descripcion: "Convierte entre unidades de longitud, peso, temperatura y más",
    href: "/herramientas/conversor-unidades",
    icon: "refresh",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Días Vividos",
    descripcion: "Descubre cuántos días, horas y minutos has vivido desde tu nacimiento",
    href: "/herramientas/calculadora-dias-vividos",
    icon: "calendar",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Diferencia entre Fechas",
    descripcion: "Calcula el tiempo exacto entre dos fechas en años, meses y días",
    href: "/herramientas/calculadora-diferencia-fechas",
    icon: "calendar-days",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Dividir Cuenta",
    descripcion: "Divide gastos entre amigos de forma justa y sin complicaciones",
    href: "/herramientas/calculadora-dividir-cuenta",
    icon: "receipt",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Calculadora de IVA",
    descripcion: "Agrega, quita o calcula el IVA de cualquier monto",
    href: "/herramientas/calculadora-iva",
    icon: "receipt",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Calculadora TRM",
    descripcion: "Convierte dólares a pesos colombianos con la TRM del día",
    href: "/herramientas/calculadora-trm",
    icon: "coins",
    gradient: "bg-purple-500",
  },
  {
    nombre: "Calculadora de Edad",
    descripcion: "Tu edad exacta en años, meses y días desde tu nacimiento",
    href: "/herramientas/calculadora-edad",
    icon: "calendar",
    gradient: "bg-purple-500",
  },
];

export default function HerramientasPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="w-12 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          Herramientas{" "}
          <span className="text-purple-600 dark:text-purple-400">del día a día</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
          Calculadoras de uso general para resolver cálculos cotidianos de forma rápida y sencilla.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {calculadoras.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700/50 rounded-2xl p-8 group hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${calc.gradient} flex items-center justify-center text-white mb-6 shadow-md`}>
              <Icon name={calc.icon} className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
              {calc.nombre}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{calc.descripcion}</p>
            <div className="mt-6 text-purple-600 dark:text-purple-400 font-bold text-sm">
              Usar calculadora
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
