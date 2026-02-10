import Link from "next/link";

const calculadoras = [
  {
    nombre: "Calculadora de Porcentajes",
    descripcion: "Calcula cualquier porcentaje, aumento o descuento",
    href: "/porcentajes",
    emoji: "%",
    gradient: "from-cyan-400 to-blue-500",
    bgHover: "group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50",
  },
  {
    nombre: "Calorías Diarias (TDEE)",
    descripcion: "Calcula tu gasto calórico y macronutrientes",
    href: "/calorias",
    emoji: "🔥",
    gradient: "from-orange-400 to-red-500",
    bgHover: "group-hover:bg-orange-50 dark:group-hover:bg-orange-950/50",
  },
  {
    nombre: "Interés Compuesto",
    descripcion: "Calcula cuánto crecerá tu dinero con el tiempo",
    href: "/interes-compuesto",
    emoji: "💰",
    gradient: "from-emerald-400 to-teal-500",
    bgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50",
  },
  {
    nombre: "Calculadora de Préstamos",
    descripcion: "Calcula cuotas y amortización de préstamos",
    href: "/prestamos",
    emoji: "🏦",
    gradient: "from-rose-400 to-pink-500",
    bgHover: "group-hover:bg-rose-50 dark:group-hover:bg-rose-950/50",
  },
  {
    nombre: "Conversor de Unidades",
    descripcion: "Convierte longitud, peso, temperatura y más",
    href: "/conversor-unidades",
    emoji: "🔄",
    gradient: "from-indigo-400 to-purple-500",
    bgHover: "group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50",
  },
  {
    nombre: "Diferencia entre Fechas",
    descripcion: "Calcula el tiempo exacto entre dos fechas",
    href: "/diferencia-fechas",
    emoji: "📆",
    gradient: "from-teal-400 to-cyan-500",
    bgHover: "group-hover:bg-teal-50 dark:group-hover:bg-teal-950/50",
  },
  {
    nombre: "Índice de Masa Corporal",
    descripcion: "Calcula tu IMC y conoce tu estado",
    href: "/imc",
    emoji: "⚖️",
    gradient: "from-violet-400 to-purple-500",
    bgHover: "group-hover:bg-violet-50 dark:group-hover:bg-violet-950/50",
  },
  {
    nombre: "Promedio de Notas",
    descripcion: "Calcula tu promedio ponderado o simple",
    href: "/promedio-notas",
    emoji: "📚",
    gradient: "from-blue-400 to-indigo-500",
    bgHover: "group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50",
  },
  {
    nombre: "Días Vividos",
    descripcion: "Descubre cuántos días, horas y minutos has vivido",
    href: "/dias-vividos",
    emoji: "📅",
    gradient: "from-amber-400 to-orange-500",
    bgHover: "group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50",
  },
  {
    nombre: "Dividir Cuenta",
    descripcion: "Divide gastos entre amigos fácilmente",
    href: "/dividir-cuenta",
    emoji: "🧾",
    gradient: "from-pink-400 to-rose-500",
    bgHover: "group-hover:bg-pink-50 dark:group-hover:bg-pink-950/50",
  },
];

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center space-y-8 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          Herramientas gratuitas
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
          Calculadoras para <br />
          <span className="gradient-text">
            todo lo que necesites
          </span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Herramientas potentes, simples y rápidas diseñadas para facilitar tu día a día.
          Totalmente gratis y sin complicaciones.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <a href="#calculadoras" className="btn-primary px-8 py-4 text-lg">
            Explorar Herramientas
          </a>
        </div>
      </section>

      <section id="calculadoras" className="scroll-mt-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {calc.nombre}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{calc.descripcion}</p>
                <div className="mt-8 flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  Usar calculadora
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
              Accede a todas nuestras herramientas sin pagar nunca ni un solo céntimo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
