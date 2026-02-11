import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, categoryColors } from "@/lib/blog";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Calculadoras de Finanzas Personales Colombia",
  description:
    "Calculadoras financieras gratuitas: liquidación laboral, prima, cesantías, 4x1000, préstamos, ahorro y más. Herramientas para empleados y finanzas personales.",
  keywords: [
    "calculadora liquidacion",
    "calculadora prima",
    "calculadora cesantias",
    "calculadora salario neto",
    "calculadora horas extras",
    "calculadora vacaciones",
    "calculadora 4x1000",
    "calculadora prestamos",
    "calculadora interes compuesto",
    "finanzas personales Colombia",
    "prestaciones sociales Colombia",
    "calculadora laboral",
    "nomina colombia",
  ],
};

const calculadoras = [
  {
    nombre: "Calculadora de Liquidación",
    descripcion: "Calcula tu liquidación laboral completa: prima, cesantías, vacaciones e indemnización",
    href: "/finanzas/calculadora-liquidacion",
    icon: "clipboard",
    gradient: "from-purple-400 to-pink-500",
    bgHover: "group-hover:bg-purple-50 dark:group-hover:bg-purple-950/50",
  },
  {
    nombre: "Calculadora de Prima",
    descripcion: "Calcula tu prima de servicios de junio y diciembre",
    href: "/finanzas/calculadora-prima",
    icon: "gift",
    gradient: "from-green-400 to-emerald-500",
    bgHover: "group-hover:bg-green-50 dark:group-hover:bg-green-950/50",
  },
  {
    nombre: "Calculadora de Cesantías",
    descripcion: "Calcula tus cesantías e intereses sobre cesantías",
    href: "/finanzas/calculadora-cesantias",
    icon: "briefcase",
    gradient: "from-cyan-400 to-teal-500",
    bgHover: "group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50",
  },
  {
    nombre: "Calculadora de Salario Neto",
    descripcion: "Descubre cuánto recibes después de los descuentos de nómina",
    href: "/finanzas/calculadora-salario-neto",
    icon: "banknote",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  },
  {
    nombre: "Calculadora de Horas Extras",
    descripcion: "Calcula el valor de tus horas extras y recargos laborales",
    href: "/finanzas/calculadora-horas-extras",
    icon: "clock",
    gradient: "from-amber-400 to-orange-500",
    bgHover: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
  },
  {
    nombre: "Calculadora de Vacaciones",
    descripcion: "Calcula los días y el dinero de tus vacaciones acumuladas",
    href: "/finanzas/calculadora-vacaciones",
    icon: "palmtree",
    gradient: "from-sky-400 to-cyan-500",
    bgHover: "group-hover:bg-sky-50 dark:group-hover:bg-sky-950/50",
  },
  {
    nombre: "Calculadora de Interés Compuesto",
    descripcion: "Calcula cuánto crecerá tu dinero con el tiempo gracias al poder del interés compuesto",
    href: "/finanzas/calculadora-interes-compuesto",
    icon: "trending-up",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  },
  {
    nombre: "Calculadora de Préstamos",
    descripcion: "Calcula cuotas mensuales y tabla de amortización para cualquier préstamo",
    href: "/finanzas/calculadora-prestamos",
    icon: "landmark",
    gradient: "from-rose-400 to-pink-500",
    bgHover: "group-hover:bg-rose-50 dark:group-hover:bg-rose-950/50",
  },
  {
    nombre: "Calculadora 4x1000",
    descripcion: "Calcula el impuesto a movimientos financieros de cualquier transacción",
    href: "/finanzas/calculadora-4x1000",
    icon: "landmark",
    gradient: "from-indigo-400 to-blue-500",
    bgHover: "group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50",
  },
  {
    nombre: "Presupuesto 50/30/20",
    descripcion: "Organiza tu plata de forma simple: necesidades, deseos y ahorro",
    href: "/finanzas/calculadora-presupuesto",
    icon: "bar-chart",
    gradient: "from-violet-400 to-purple-500",
    bgHover: "group-hover:bg-violet-50 dark:group-hover:bg-violet-950/50",
  },
  {
    nombre: "Comparador Cuentas de Ahorro",
    descripcion: "Compara rendimientos de Ualá, Nu, Pibank, Lulo y más cuentas remuneradas",
    href: "/finanzas/simulador-cuenta-ahorro",
    icon: "piggy-bank",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  },
  {
    nombre: "Calculadora de Ahorro",
    descripcion: "Calcula cuánto ahorrar o cuánto tiempo necesitas para tu meta. Con tasa personalizada.",
    href: "/finanzas/calculadora-meta-ahorro",
    icon: "target",
    gradient: "from-amber-400 to-orange-500",
    bgHover: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
  },
  {
    nombre: "Calculadora de Jubilación",
    descripcion: "Planifica tu retiro y calcula cuánto necesitas para vivir tranquilo",
    href: "/finanzas/calculadora-jubilacion",
    icon: "umbrella",
    gradient: "from-orange-400 to-amber-500",
    bgHover: "group-hover:bg-orange-50 dark:group-hover:bg-orange-950/50",
  },
  {
    nombre: "Calculadora de Inflación",
    descripcion: "Entiende cómo la inflación afecta tu dinero con datos del IPC",
    href: "/finanzas/calculadora-inflacion",
    icon: "trending-down",
    gradient: "from-red-400 to-rose-500",
    bgHover: "group-hover:bg-red-50 dark:group-hover:bg-red-950/50",
  },
  {
    nombre: "Prestación de Servicios",
    descripcion: "Calcula tus ingresos netos como independiente: retención, salud y pensión",
    href: "/finanzas/calculadora-prestacion-servicios",
    icon: "file-text",
    gradient: "from-amber-400 to-orange-500",
    bgHover: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
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
            className="card-glass card-hover card-hover-emerald rounded-3xl p-8 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 ${calc.bgHover} transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 -z-10">
              <div className={`w-full h-full bg-gradient-to-br ${calc.gradient} rounded-full blur-3xl`} />
            </div>
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                <Icon name={calc.icon} className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                {calc.nombre}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{calc.descripcion}</p>
              <div className="mt-6 flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                Usar calculadora
                <span className="ml-2">→</span>
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
                className="card-glass card-hover card-hover-emerald rounded-2xl p-6 group"
              >
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${categoryColors[post.category]} text-white mb-3`}
                >
                  Finanzas
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
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
