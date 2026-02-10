import Link from "next/link";
import { getAllPosts, categoryLabels, categoryColors } from "@/lib/blog";

const pilares = [
  {
    nombre: "Salud",
    descripcion: "Cuida tu bienestar físico con datos precisos sobre calorías, IMC y más",
    href: "/salud",
    emoji: "❤️",
    gradient: "from-orange-400 to-red-500",
    bgHover: "group-hover:bg-red-50 dark:group-hover:bg-red-950/50",
    color: "text-red-600 dark:text-red-400",
    calculadoras: ["Calorías (TDEE)", "IMC"],
  },
  {
    nombre: "Finanzas",
    descripcion: "Toma el control de tu dinero con herramientas de inversión y préstamos",
    href: "/finanzas",
    emoji: "💰",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
    color: "text-emerald-600 dark:text-emerald-400",
    calculadoras: ["Liquidación", "Prima", "Cesantías"],
  },
  {
    nombre: "Productividad",
    descripcion: "Optimiza tu tiempo con herramientas de hábitos, metas y gestión personal",
    href: "/productividad",
    emoji: "⏱️",
    gradient: "from-amber-400 to-orange-500",
    bgHover: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
    color: "text-amber-600 dark:text-amber-400",
    calculadoras: ["Próximamente"],
  },
];

const utilidades = [
  {
    nombre: "Calculadora de Porcentajes",
    descripcion: "Calcula cualquier porcentaje",
    href: "/herramientas/calculadora-porcentajes",
    emoji: "%",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    nombre: "Calculadora de Descuentos",
    descripcion: "Precio final y cuánto ahorras",
    href: "/herramientas/calculadora-descuentos",
    emoji: "🏷️",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    nombre: "Conversor de Unidades",
    descripcion: "Convierte longitud, peso y más",
    href: "/herramientas/conversor-unidades",
    emoji: "🔄",
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    nombre: "Dividir Cuenta",
    descripcion: "Divide gastos entre amigos",
    href: "/herramientas/calculadora-dividir-cuenta",
    emoji: "🧾",
    gradient: "from-amber-400 to-orange-500",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-20">
      <section className="text-center space-y-8 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          Herramientas gratuitas
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
          Tu vida{" "}
          <span className="gradient-text">en cifras</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Todo lo que necesitas para mejorar tu <strong>salud</strong>, <strong>finanzas</strong> y <strong>productividad</strong>.
          Calculadoras, tutoriales, comparativas y plantillas.
        </p>
      </section>

      {/* Pilares principales */}
      <section id="pilares" className="scroll-mt-24">
        <div className="grid gap-8 md:grid-cols-3">
          {pilares.map((pilar) => (
            <Link
              key={pilar.href}
              href={pilar.href}
              className="card-glass card-hover rounded-3xl p-8 group relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 ${pilar.bgHover} transition-opacity duration-300`} />
              <div className="absolute top-0 right-0 w-48 h-48 opacity-20 -z-10">
                <div className={`w-full h-full bg-gradient-to-br ${pilar.gradient} rounded-full blur-3xl`} />
              </div>
              <div className="relative">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pilar.gradient} flex items-center justify-center text-4xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                  {pilar.emoji}
                </div>
                <h2 className={`text-3xl font-black mb-3 ${pilar.color} transition-colors`}>
                  {pilar.nombre}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {pilar.descripcion}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {pilar.calculadoras.map((calc) => (
                    <span
                      key={calc}
                      className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {calc}
                    </span>
                  ))}
                </div>
                <div className={`flex items-center ${pilar.color} font-bold text-sm`}>
                  Ver calculadoras
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Utilidades */}
      <section id="utilidades">
        <div className="text-center mb-10">
          <span className="badge badge-indigo mb-4">Utilidades</span>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Herramientas de uso diario</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {utilidades.map((util) => (
            <Link
              key={util.href}
              href={util.href}
              className="card-glass card-hover rounded-2xl p-6 group flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${util.gradient} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform flex-shrink-0`}>
                {util.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {util.nombre}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{util.descripcion}</p>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/herramientas"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Ver todas las herramientas →
          </Link>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section id="blog">
          <div className="text-center mb-10">
            <span className="badge badge-pink mb-4">Blog</span>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Últimos artículos</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-glass card-hover rounded-2xl p-6 group"
              >
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${
                    categoryColors[post.category] || "from-slate-500 to-slate-600"
                  } text-white mb-3`}
                >
                  {categoryLabels[post.category] || post.category}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {post.description}
                </p>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">
                  Leer más →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/blog"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Ver todos los artículos →
            </Link>
          </div>
        </section>
      )}

      {/* Beneficios */}
      <section id="beneficios" className="pt-10">
        <div className="text-center mb-12">
          <span className="badge badge-indigo mb-4">Ventajas</span>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">¿Por qué usar VidaEnCifras?</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card-glass card-hover rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg">⚡</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Rápido e Instantáneo</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Consigue tus resultados al momento sin esperas ni pantallas de carga lentas.
            </p>
          </div>
          <div className="card-glass card-hover rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg">🔒</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">100% Privado</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Tus datos son solo tuyos. No guardamos nada en servidores externos.
            </p>
          </div>
          <div className="card-glass card-hover rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg">🆓</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Siempre Gratis</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Accede a todas nuestras herramientas sin pagar un solo peso.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
