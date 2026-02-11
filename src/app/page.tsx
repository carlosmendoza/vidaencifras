import Link from "next/link";
import { getAllPosts, categoryLabels, categoryColors } from "@/lib/blog";
import { pilares, utilidadesDestacadas } from "@/lib/calculators";
import { Icon } from "@/lib/icons";
import Reveal from "@/components/Reveal";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-20 md:space-y-40 mb-10 md:mb-20">
      <section className="text-center space-y-8 py-12 md:py-20 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
          Herramientas gratuitas
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1]">
          <span className="text-slate-400 dark:text-slate-500">Tu vida</span>{" "}
          <span className="text-indigo-600 dark:text-indigo-400">en cifras</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Todo lo que necesitas para mejorar tu <strong>salud</strong>, <strong>finanzas</strong> y <strong>productividad</strong>.
        </p>
      </section>

      {/* Pilares principales */}
      <Reveal>
        <section id="pilares" className="scroll-mt-24">
          <div className="grid gap-8 md:grid-cols-3">
            {pilares.map((pilar) => (
              <Link
                key={pilar.href}
                href={pilar.href}
                className={`card-glass card-hover ${pilar.cardHover} rounded-2xl p-8 md:p-10 group relative overflow-hidden transition-all duration-300 flex flex-col h-full`}
              >

                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pilar.gradient} flex items-center justify-center text-white mb-8 shadow-lg relative z-10 flex-shrink-0`}>
                  <Icon name={pilar.icon} className="w-10 h-10" />
                </div>

                <div className="relative z-10 flex flex-col flex-1">
                  <h2 className={`text-3xl font-black mb-4 ${pilar.color} transition-colors`}>
                    {pilar.nombre}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-lg">
                    {pilar.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {pilar.calculadoras.slice(0, 3).map((calc) => (
                      <span
                        key={calc}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider"
                      >
                        {calc}
                      </span>
                    ))}
                  </div>

                  <div className={`mt-auto flex items-center ${pilar.color} font-bold text-sm uppercase tracking-wider pt-4`}>
                    Ver calculadoras
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Utilidades */}
      <Reveal className="mt-8 md:mt-20">
        <section id="utilidades">
          <div className="text-center mb-12">
            <span className="badge badge-indigo mb-4">Eficiencia</span>
            <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Utilidades rápidas</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {utilidadesDestacadas.map((util) => (
              <Link
                key={util.href}
                href={util.href}
                className="card-glass card-hover card-hover-indigo rounded-3xl p-8 group flex items-center gap-6"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${util.gradient} flex items-center justify-center text-white shadow-xl flex-shrink-0 group-hover:rotate-6 transition-transform`}>
                  <Icon name={util.icon} className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                    {util.nombre}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{util.descripcion}</p>
                </div>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/herramientas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/30 font-bold"
            >
              Explorar todas las herramientas <span>→</span>
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Blog */}
      {posts.length > 0 && (
        <Reveal>
          <section id="blog">
            <div className="text-center mb-12">
              <span className="badge badge-slate mb-4">Conocimiento</span>
              <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Guías y artículos</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card-glass card-hover card-hover-indigo rounded-2xl p-8 group"
                >
                  <span
                    className={`inline-block px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r ${categoryColors[post.category] || "from-slate-500 to-slate-600"
                      } text-white mb-4 shadow-sm`}
                  >
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-3 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm inline-flex items-center group-hover:gap-2 transition-all">
                    Seguir leyendo <span className="ml-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/30 font-bold"
              >
                Ver todos los artículos <span>→</span>
              </Link>
            </div>
          </section>
        </Reveal>
      )}

      {/* Beneficios */}
      <Reveal>
        <section id="beneficios" className="pt-4 md:pt-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="badge badge-indigo mb-4">Filosofía</span>
            <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">¿Por qué VidaEnCifras?</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="card-glass card-hover card-hover-amber rounded-2xl p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-2 shadow-lg">
                <Icon name="lightning" className="w-10 h-10" weight="fill" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Velocidad pura</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                Resultados instantáneos. Sin esperas, sin publicidad intrusiva, solo datos.
              </p>
            </div>
            <div className="card-glass card-hover card-hover-emerald rounded-2xl p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-2 shadow-lg">
                <Icon name="lock" className="w-10 h-10" weight="fill" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Privacidad total</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                Tus datos no viajan a ningún servidor. Todo el cálculo ocurre en tu navegador.
              </p>
            </div>
            <div className="card-glass card-hover card-hover-indigo rounded-2xl p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-2 shadow-lg">
                <Icon name="seal-check" className="w-10 h-10" weight="fill" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Acceso libre</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                Herramientas profesionales totalmente gratuitas y sin necesidad de registro.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
