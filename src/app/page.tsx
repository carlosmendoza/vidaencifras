import Link from "next/link";
import { getAllPosts, categoryLabels, categoryColors } from "@/lib/blog";
import {
  pilares,
  utilidadesDestacadas,
  calculadorasFinanzas,
  calculadorasSalud,
  calculadorasProductividad,
} from "@/lib/calculators";
import { Icon } from "@/lib/icons";
import Reveal from "@/components/Reveal";
import DatoDelDia from "@/components/DatoDelDia";

const pilarCounts: Record<string, number> = {
  Salud: calculadorasSalud.length,
  Finanzas: calculadorasFinanzas.length,
  Productividad: calculadorasProductividad.length,
};

const categoryChips = [
  { label: "Finanzas", href: "/finanzas", bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-400" },
  { label: "Salud", href: "/salud", bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-700 dark:text-red-400" },
  { label: "Productividad", href: "/productividad", bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-400" },
  { label: "Herramientas", href: "/herramientas", bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-700 dark:text-indigo-400" },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-32 mb-10 md:mb-20">
      {/* Hero */}
      <section className="py-12 md:py-20 animate-fade-in-up">
        <div className="w-12 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mb-8" />
        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] text-slate-800 dark:text-slate-100">
          Las cuentas que nadie{" "}
          <span className="text-indigo-600 dark:text-indigo-400">te enseñó a hacer</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Cuánto te descuentan del salario. Cuánto pagas de renta. Cuánto necesitas para tu primer apartamento. Respuestas en segundos.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          {categoryChips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className={`px-4 py-2 rounded-full text-sm font-bold ${chip.bg} ${chip.text} hover:opacity-80 transition-opacity`}
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Pilares */}
      <Reveal>
        <section id="pilares" className="scroll-mt-24 grid gap-6 md:grid-cols-3">
          {pilares.map((pilar) => (
            <Link
              key={pilar.href}
              href={pilar.href}
              className="relative bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700/50 rounded-2xl p-8 group hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pilar.gradient}`} />

              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pilar.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                  <Icon name={pilar.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-xl font-black ${pilar.color}`}>
                    {pilar.nombre}
                  </h2>
                  <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">
                    {pilarCounts[pilar.nombre]} calculadoras
                  </span>
                </div>
              </div>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-4">
                {pilar.descripcion}
              </p>

              <div className="flex flex-wrap gap-2">
                {pilar.calculadoras.slice(0, 3).map((calc) => (
                  <span
                    key={calc}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-600/50 text-slate-600 dark:text-slate-200 font-bold uppercase tracking-wider"
                  >
                    {calc}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>
      </Reveal>

      {/* Utilidades */}
      <Reveal>
        <section id="utilidades">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Herramientas de uso diario
            </h2>
            <Link
              href="/herramientas"
              className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0"
            >
              Ver todas
            </Link>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700/50">
            {utilidadesDestacadas.map((util) => (
              <Link
                key={util.href}
                href={util.href}
                className="flex items-center gap-4 py-4 md:py-5 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors -mx-4 px-4 rounded-lg"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${util.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                  <Icon name={util.icon} className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {util.nombre}
                </span>
                <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">
                  {util.descripcion}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Dato del día */}
      <Reveal>
        <DatoDelDia />
      </Reveal>

      {/* Blog */}
      {posts.length > 0 && (
        <Reveal>
          <section id="blog">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Del blog
              </h2>
              <Link
                href="/blog"
                className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0"
              >
                Todos los artículos
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-5">
              {/* Post destacado */}
              <Link
                href={`/blog/${posts[0].slug}`}
                className="md:col-span-3 bg-indigo-50 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700/50 rounded-2xl p-8 group hover:bg-indigo-100/60 dark:hover:bg-slate-800 transition-colors"
              >
                <span
                  className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${categoryColors[posts[0].category] || "from-slate-500 to-slate-600"} text-white mb-4`}
                >
                  {categoryLabels[posts[0].category] || posts[0].category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 mb-3 leading-tight">
                  {posts[0].title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {posts[0].description}
                </p>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  Leer artículo
                </span>
              </Link>

              {/* Posts secundarios */}
              <div className="md:col-span-2 flex flex-col gap-6">
                {posts.slice(1, 3).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${categoryColors[post.category] || "from-slate-500 to-slate-600"} text-white mb-3`}
                    >
                      {categoryLabels[post.category] || post.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-2 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                      Leer artículo
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
