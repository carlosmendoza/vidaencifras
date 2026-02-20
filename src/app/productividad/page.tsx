import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, categoryColors } from "@/lib/blog";
import { Icon } from "@/lib/icons";
import { CategoryHero } from "@/components/CategoryHero";

export const metadata: Metadata = {
  title: "Calculadoras de Productividad - Optimiza tu Tiempo y Hábitos",
  description:
    "Herramientas gratuitas para gestionar tu tiempo: valor real de tu hora, impacto de tus hábitos, auditoría de 168 horas semanales, vida en semanas, Pomodoro y Eisenhower.",
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
  alternates: {
    canonical: "https://vidaencifras.com/productividad",
  },
};

const herramientas = [
  {
    nombre: "Valor de tu Hora",
    descripcion: "Descubre cuánto vale realmente tu tiempo. Ingresa tu salario y gastos laborales (transporte, comida) para conocer tu tarifa real por hora.",
    href: "/productividad/valor-hora",
    icon: "gem",
    gradient: "bg-orange-500",
  },
  {
    nombre: "Calculadora de Hábitos",
    descripcion: "¿Cuánto suman tus pequeños hábitos? Calcula el impacto a 1, 5 y 10 años de acciones diarias como ahorrar, leer, hacer ejercicio o dejar de fumar.",
    href: "/productividad/calculadora-habitos",
    icon: "target",
    gradient: "bg-orange-500",
  },
  {
    nombre: "Auditoría de Tiempo",
    descripcion: "Todos tenemos 168 horas a la semana. Registra cómo distribuyes tu tiempo entre trabajo, sueño, familia y ocio, y recibe sugerencias de mejora.",
    href: "/productividad/auditoria-tiempo",
    icon: "clock",
    gradient: "bg-orange-500",
  },
  {
    nombre: "Tu Vida en Semanas",
    descripcion: "Visualiza tu vida como una cuadrícula donde cada cuadrito es una semana. Descubre cuántas semanas has vivido y cuántas te quedan.",
    href: "/productividad/vida-en-semanas",
    icon: "calendar",
    gradient: "bg-orange-500",
  },
  {
    nombre: "Matriz Eisenhower",
    descripcion: "Prioriza tus tareas por urgencia e importancia. Organiza tu día y enfócate en lo que realmente importa.",
    href: "/productividad/matriz-eisenhower",
    icon: "grid",
    gradient: "bg-orange-500",
  },
  {
    nombre: "Calculadora Pomodoro",
    descripcion: "Planifica tus sesiones de trabajo con la técnica Pomodoro. Calcula cuántos pomodoros necesitas para completar tus tareas.",
    href: "/productividad/calculadora-pomodoro",
    icon: "timer",
    gradient: "bg-orange-500",
  },
];

export default function ProductividadPage() {
  const articulos = getAllPosts().filter((p) => p.category === "productividad").slice(0, 2);

  return (
    <div className="space-y-12">
      <CategoryHero
        pilar="productividad"
        accentBarColor="bg-orange-500 dark:bg-orange-400"
        title={<>Optimiza tu{" "}<span className="text-orange-600 dark:text-orange-400">tiempo</span></>}
        description="Herramientas para medir tu productividad, visualizar tu tiempo y tomar el control de tus metas y hábitos."
      />

      <section className="grid gap-6 md:grid-cols-2">
        {herramientas.map((herr) => (
          <Link
            key={herr.href}
            href={herr.href}
            className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700/50 rounded-2xl p-8 group hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${herr.gradient} flex items-center justify-center text-white mb-6 shadow-md`}>
              <Icon name={herr.icon} className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
              {herr.nombre}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{herr.descripcion}</p>
            <div className="mt-6 text-orange-600 dark:text-orange-400 font-bold text-sm">
              Usar calculadora
            </div>
          </Link>
        ))}
      </section>

      {articulos.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Artículos de Productividad
            </h2>
            <Link
              href="/blog?categoria=productividad"
              className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {articulos.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700/50 rounded-2xl p-6 group hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all"
              >
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[post.category]} text-white mb-3`}
                >
                  Productividad
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
