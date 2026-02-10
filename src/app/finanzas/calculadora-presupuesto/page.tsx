"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";

const faqs = [
  {
    question: "¿Qué es la regla 50/30/20?",
    answer:
      "Es un método de presupuesto creado por Elizabeth Warren que divide tu ingreso neto en tres categorías: 50% para necesidades esenciales (arriendo, servicios, mercado), 30% para deseos (entretenimiento, salidas), y 20% para ahorro e inversión.",
  },
  {
    question: "¿Cómo saber qué es una necesidad y qué es un deseo?",
    answer:
      "Una necesidad es un gasto que no puedes evitar sin afectar tu calidad de vida básica: vivienda, alimentación, transporte al trabajo, salud. Un deseo es algo que mejora tu vida pero podrías vivir sin ello: Netflix, restaurantes, ropa de marca.",
  },
  {
    question: "¿Puedo ajustar los porcentajes 50/30/20?",
    answer:
      "Sí. Si vives en una ciudad costosa, quizás necesites 60/20/20. Si quieres ahorrar más agresivamente, podrías usar 50/20/30 (destinando 30% al ahorro). Lo importante es que los porcentajes sumen 100% y sean realistas para ti.",
  },
  {
    question: "¿Qué debo incluir en el 20% de ahorro?",
    answer:
      "El 20% incluye: fondo de emergencia (3-6 meses de gastos), ahorro para metas específicas (vacaciones, carro), inversiones, aportes a pensión voluntaria, y pagos extra para eliminar deudas más rápido.",
  },
];

interface Distribucion {
  necesidades: number;
  deseos: number;
  ahorro: number;
}

interface Categoria {
  nombre: string;
  monto: number;
  porcentaje: number;
  color: string;
  icono: string;
  ejemplos: string[];
}

export default function CalculadoraPresupuesto() {
  const [ingresos, setIngresos] = useState<string>("");
  const [resultado, setResultado] = useState<Distribucion | null>(null);
  const [personalizarPorcentajes, setPersonalizarPorcentajes] = useState(false);
  const [porcentajeNecesidades, setPorcentajeNecesidades] = useState<number>(50);
  const [porcentajeDeseos, setPorcentajeDeseos] = useState<number>(30);
  const [porcentajeAhorro, setPorcentajeAhorro] = useState<number>(20);

  const calcular = () => {
    const ingreso = parseFloat(ingresos);
    if (isNaN(ingreso) || ingreso <= 0) return;

    const pctNecesidades = personalizarPorcentajes ? porcentajeNecesidades : 50;
    const pctDeseos = personalizarPorcentajes ? porcentajeDeseos : 30;
    const pctAhorro = personalizarPorcentajes ? porcentajeAhorro : 20;

    setResultado({
      necesidades: ingreso * (pctNecesidades / 100),
      deseos: ingreso * (pctDeseos / 100),
      ahorro: ingreso * (pctAhorro / 100),
    });
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const totalPorcentaje = porcentajeNecesidades + porcentajeDeseos + porcentajeAhorro;
  const porcentajesValidos = totalPorcentaje === 100;

  const categorias: Categoria[] = resultado ? [
    {
      nombre: "Necesidades",
      monto: resultado.necesidades,
      porcentaje: personalizarPorcentajes ? porcentajeNecesidades : 50,
      color: "from-red-400 to-rose-500",
      icono: "🏠",
      ejemplos: ["Arriendo o cuota vivienda", "Servicios públicos", "Mercado", "Transporte", "Salud", "Seguros"],
    },
    {
      nombre: "Deseos",
      monto: resultado.deseos,
      porcentaje: personalizarPorcentajes ? porcentajeDeseos : 30,
      color: "from-amber-400 to-orange-500",
      icono: "🎉",
      ejemplos: ["Restaurantes y domicilios", "Entretenimiento", "Ropa no esencial", "Suscripciones", "Hobbies"],
    },
    {
      nombre: "Ahorro e inversión",
      monto: resultado.ahorro,
      porcentaje: personalizarPorcentajes ? porcentajeAhorro : 20,
      color: "from-emerald-400 to-teal-500",
      icono: "💰",
      ejemplos: ["Fondo de emergencia", "Ahorro para metas", "Inversiones", "Pago extra de deudas", "Pensión voluntaria"],
    },
  ] : [];

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-violet-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">📊</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Presupuesto 50/30/20
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Organiza tu plata de forma simple y efectiva
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuánto ganas al mes?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={ingresos}
                onChange={(e) => setIngresos(e.target.value)}
                placeholder="3.500.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Ingresa tu salario neto (lo que te llega después de descuentos)
            </p>
          </div>

          <button
            onClick={() => setPersonalizarPorcentajes(!personalizarPorcentajes)}
            className="w-full py-3 rounded-xl font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            {personalizarPorcentajes ? "Usar porcentajes estándar (50/30/20)" : "Personalizar porcentajes"}
            <span className={`transition-transform text-xs ${personalizarPorcentajes ? "rotate-180" : ""}`}>▼</span>
          </button>

          {personalizarPorcentajes && (
            <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Personalizar distribución
                </p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${porcentajesValidos ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                  Total: {totalPorcentaje}%
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-300">🏠 Necesidades</span>
                    <span className="font-bold text-rose-600">{porcentajeNecesidades}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={porcentajeNecesidades}
                    onChange={(e) => setPorcentajeNecesidades(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-300">🎉 Deseos</span>
                    <span className="font-bold text-amber-600">{porcentajeDeseos}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={porcentajeDeseos}
                    onChange={(e) => setPorcentajeDeseos(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-300">💰 Ahorro</span>
                    <span className="font-bold text-emerald-600">{porcentajeAhorro}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={porcentajeAhorro}
                    onChange={(e) => setPorcentajeAhorro(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {!porcentajesValidos && (
                <p className="text-xs text-red-500 text-center mt-2">
                  Los porcentajes deben sumar 100%
                </p>
              )}
            </div>
          )}

          <button
            onClick={calcular}
            disabled={personalizarPorcentajes && !porcentajesValidos}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-violet-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calcular presupuesto
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 rounded-3xl ring-1 ring-violet-100 dark:ring-violet-900">
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tu ingreso mensual</p>
                  <p className="text-3xl font-black text-violet-600">
                    ${formatMoney(parseFloat(ingresos))}
                  </p>
                </div>

                {/* Barra de distribución visual */}
                <div className="flex h-8 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-gradient-to-r from-red-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${personalizarPorcentajes ? porcentajeNecesidades : 50}%` }}
                  >
                    {personalizarPorcentajes ? porcentajeNecesidades : 50}%
                  </div>
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${personalizarPorcentajes ? porcentajeDeseos : 30}%` }}
                  >
                    {personalizarPorcentajes ? porcentajeDeseos : 30}%
                  </div>
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${personalizarPorcentajes ? porcentajeAhorro : 20}%` }}
                  >
                    {personalizarPorcentajes ? porcentajeAhorro : 20}%
                  </div>
                </div>
              </div>

              {/* Tarjetas de categorías */}
              <div className="space-y-4">
                {categorias.map((cat) => (
                  <div
                    key={cat.nombre}
                    className="p-6 bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg`}>
                          {cat.icono}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 dark:text-slate-100">{cat.nombre}</h3>
                          <p className="text-sm text-slate-500">{cat.porcentaje}% de tu ingreso</p>
                        </div>
                      </div>
                      <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                        ${formatMoney(cat.monto)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.ejemplos.map((ejemplo) => (
                        <span
                          key={ejemplo}
                          className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        >
                          {ejemplo}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Consejos */}
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-sm text-amber-700 dark:text-amber-300">
                <strong>💡 Consejo:</strong> Si tus necesidades superan el 50%, revisa si puedes reducir gastos fijos como servicios o buscar opciones más económicas de transporte.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center text-base">💡</span>
            ¿Qué es la regla 50/30/20?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
            Es un método simple para organizar tu plata creado por Elizabeth Warren. La idea es dividir tu ingreso neto en tres categorías:
          </p>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-rose-500 font-bold">50%</span>
              <span><strong>Necesidades:</strong> Gastos esenciales que no puedes evitar (vivienda, comida, transporte al trabajo).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500 font-bold">30%</span>
              <span><strong>Deseos:</strong> Lo que te hace feliz pero no es indispensable (salidas, streaming, ropa de marca).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold">20%</span>
              <span><strong>Ahorro:</strong> Tu futuro financiero (emergencias, inversiones, pagar deudas más rápido).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="violet" />
        </div>
      </div>
    </div>
  );
}
