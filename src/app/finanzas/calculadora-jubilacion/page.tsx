"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Icon } from "@/lib/icons";

const faqs = [
  {
    question: "¿A qué edad me puedo pensionar en Colombia?",
    answer:
      "La edad de pensión en Colombia es 57 años para mujeres y 62 para hombres. Además, debes haber cotizado mínimo 1.300 semanas (aproximadamente 25 años). Si no cumples las semanas, puedes acceder a una devolución de saldos o seguir cotizando.",
  },
  {
    question: "¿Cuánto debería ahorrar para mi jubilación?",
    answer:
      "Se recomienda ahorrar entre 10% y 15% de tu ingreso para la jubilación. Si empiezas tarde (después de los 40), considera aumentar a 20% o más. La clave es empezar lo antes posible para aprovechar el interés compuesto.",
  },
  {
    question: "¿Qué es la pensión voluntaria y cuáles son sus beneficios?",
    answer:
      "La pensión voluntaria es un ahorro adicional al obligatorio que ofrece beneficios tributarios: puedes deducir hasta el 30% de tu ingreso (máximo 3.800 UVT) de tu declaración de renta. Además, los rendimientos no pagan impuestos si cumples los requisitos de permanencia.",
  },
  {
    question: "¿Es mejor el régimen de prima media o el RAIS?",
    answer:
      "Prima Media (Colpensiones) suele ser mejor para salarios altos y carreras laborales estables. RAIS (fondos privados) puede ser mejor para salarios bajos o carreras cortas. Si tienes más de 750 semanas cotizadas, evalúa bien antes de cambiarte.",
  },
];

interface ResultadoJubilacion {
  ahorroNecesario: number;
  ahorroMensualRequerido: number;
  ahorroActualProyectado: number;
  brecha: number;
  pensionEstimadaMensual: number;
  añosParaJubilarse: number;
  evolucion: {
    edad: number;
    ahorro: number;
  }[];
}

export default function CalculadoraJubilacion() {
  const { moneda } = useCurrency();
  const [edadActual, setEdadActual] = useState<string>("");
  const [edadJubilacion, setEdadJubilacion] = useState<string>("62");
  const [gastoMensualActual, setGastoMensualActual] = useState<string>("");
  const [ahorroActual, setAhorroActual] = useState<string>("");
  const [ahorroMensual, setAhorroMensual] = useState<string>("");
  const [tasaRetorno, setTasaRetorno] = useState<string>("8");
  const [inflacion, setInflacion] = useState<string>("5");
  const [añosJubilacion, setAñosJubilacion] = useState<string>("25");
  const [resultado, setResultado] = useState<ResultadoJubilacion | null>(null);
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);

  const calcular = () => {
    const edad = parseInt(edadActual) || 0;
    const jubilacion = parseInt(edadJubilacion) || 62;
    const gastoMensual = parseFloat(gastoMensualActual) || 0;
    const ahorro = parseFloat(ahorroActual) || 0;
    const aportesMensual = parseFloat(ahorroMensual) || 0;
    const retornoAnual = (parseFloat(tasaRetorno) || 8) / 100;
    const inflacionAnual = (parseFloat(inflacion) || 5) / 100;
    const añosEnJubilacion = parseInt(añosJubilacion) || 25;

    if (edad <= 0 || gastoMensual <= 0 || edad >= jubilacion) return;

    const añosParaJubilarse = jubilacion - edad;

    // Tasa real de retorno (ajustada por inflación)
    const tasaReal = (1 + retornoAnual) / (1 + inflacionAnual) - 1;

    // Gasto mensual ajustado por inflación al momento de jubilarse
    const gastoFuturo = gastoMensual * Math.pow(1 + inflacionAnual, añosParaJubilarse);
    const gastoAnualJubilacion = gastoFuturo * 12;

    // Cuánto necesitas acumulado para cubrir los años de jubilación
    // Usando valor presente de una anualidad
    const tasaMensualReal = tasaReal / 12;
    const mesesJubilacion = añosEnJubilacion * 12;

    // PV de pagos durante jubilación
    let ahorroNecesario: number;
    if (tasaReal > 0) {
      ahorroNecesario = gastoFuturo * ((1 - Math.pow(1 + tasaMensualReal, -mesesJubilacion)) / tasaMensualReal);
    } else {
      ahorroNecesario = gastoFuturo * mesesJubilacion;
    }

    // Proyección del ahorro actual
    const retornoMensual = retornoAnual / 12;
    const mesesParaJubilarse = añosParaJubilarse * 12;

    // Valor futuro del ahorro actual
    const valorFuturoAhorroActual = ahorro * Math.pow(1 + retornoMensual, mesesParaJubilarse);

    // Valor futuro de los aportes mensuales
    let valorFuturoAportes = 0;
    if (retornoMensual > 0) {
      valorFuturoAportes = aportesMensual * ((Math.pow(1 + retornoMensual, mesesParaJubilarse) - 1) / retornoMensual);
    } else {
      valorFuturoAportes = aportesMensual * mesesParaJubilarse;
    }

    const ahorroProyectado = valorFuturoAhorroActual + valorFuturoAportes;
    const brecha = ahorroNecesario - ahorroProyectado;

    // Cuánto necesitarías ahorrar mensualmente para cerrar la brecha
    let ahorroMensualRequerido = 0;
    if (brecha > 0 && retornoMensual > 0) {
      ahorroMensualRequerido = brecha * retornoMensual / (Math.pow(1 + retornoMensual, mesesParaJubilarse) - 1);
    } else if (brecha > 0) {
      ahorroMensualRequerido = brecha / mesesParaJubilarse;
    }

    // Pensión mensual que podrías pagarte
    const pensionEstimada = ahorroProyectado > 0
      ? ahorroProyectado * tasaMensualReal / (1 - Math.pow(1 + tasaMensualReal, -mesesJubilacion))
      : 0;

    // Evolución del ahorro
    const evolucion: ResultadoJubilacion["evolucion"] = [];
    let saldo = ahorro;
    for (let i = 0; i <= añosParaJubilarse; i++) {
      evolucion.push({
        edad: edad + i,
        ahorro: saldo,
      });
      // Agregar aportes y rendimiento del año
      for (let m = 0; m < 12; m++) {
        saldo = saldo * (1 + retornoMensual) + aportesMensual;
      }
    }

    setResultado({
      ahorroNecesario,
      ahorroMensualRequerido: Math.max(0, ahorroMensualRequerido),
      ahorroActualProyectado: ahorroProyectado,
      brecha: Math.max(0, brecha),
      pensionEstimadaMensual: Math.max(0, pensionEstimada),
      añosParaJubilarse,
      evolucion,
    });
  };

  const formatMoney = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)} mil millones`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)} millones`;
    }
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatMoneyFull = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-orange-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"><Icon name="umbrella" className="w-10 h-10" /></div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Jubilación
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Planifica tu retiro con tranquilidad
          </p>
        </div>

        <div className="space-y-6">
          {/* Edad actual */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuántos años tienes?
            </label>
            <input
              type="number"
              value={edadActual}
              onChange={(e) => setEdadActual(e.target.value)}
              placeholder="35"
              min="18"
              max="80"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          {/* Edad de jubilación */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿A qué edad quieres jubilarte?
            </label>
            <input
              type="number"
              value={edadJubilacion}
              onChange={(e) => setEdadJubilacion(e.target.value)}
              placeholder="62"
              min="45"
              max="80"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <div className="flex gap-2 flex-wrap">
              {[55, 57, 60, 62, 65].map((e) => (
                <button
                  key={e}
                  onClick={() => setEdadJubilacion(e.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    edadJubilacion === e.toString()
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {e} años
                </button>
              ))}
            </div>
          </div>

          {/* Gastos mensuales */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿Cuánto gastas al mes actualmente?
              </label>
              <CurrencySelector colorClass="orange" />
            </div>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
              <CurrencyInput
                value={gastoMensualActual}
                onChange={(v) => setGastoMensualActual(v)}
                placeholder="3.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Incluye arriendo, mercado, servicios, transporte, etc.
            </p>
          </div>

          {/* Ahorro actual para jubilación */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuánto tienes ahorrado para tu jubilación?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
              <CurrencyInput
                value={ahorroActual}
                onChange={(v) => setAhorroActual(v)}
                placeholder="20.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Incluye cesantías, pensión voluntaria, inversiones, etc.
            </p>
          </div>

          {/* Ahorro mensual */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuánto ahorras al mes para jubilación?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
              <CurrencyInput
                value={ahorroMensual}
                onChange={(v) => setAhorroMensual(v)}
                placeholder="500.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          </div>

          {/* Opciones avanzadas */}
          <button
            onClick={() => setMostrarAvanzado(!mostrarAvanzado)}
            className="w-full py-3 rounded-xl font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            {mostrarAvanzado ? "Ocultar opciones avanzadas" : "Opciones avanzadas"}
            <span className={`transition-transform text-xs ${mostrarAvanzado ? "rotate-180" : ""}`}>▼</span>
          </button>

          {mostrarAvanzado && (
            <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Retorno anual esperado
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={tasaRetorno}
                      onChange={(e) => setTasaRetorno(e.target.value)}
                      placeholder="8"
                      step="0.5"
                      className="w-full px-4 py-3 rounded-xl text-base font-semibold pr-10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Inflación esperada
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inflacion}
                      onChange={(e) => setInflacion(e.target.value)}
                      placeholder="5"
                      step="0.5"
                      className="w-full px-4 py-3 rounded-xl text-base font-semibold pr-10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Años en jubilación
                  </label>
                  <input
                    type="number"
                    value={añosJubilacion}
                    onChange={(e) => setAñosJubilacion(e.target.value)}
                    placeholder="25"
                    className="w-full px-4 py-3 rounded-xl text-base font-semibold"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Valores por defecto basados en promedios históricos de Colombia
              </p>
            </div>
          )}

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-orange-500/20 active:scale-[0.99]"
          >
            Calcular plan de jubilación
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              {/* Resumen principal */}
              <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 rounded-3xl ring-1 ring-orange-100 dark:ring-orange-900">
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Para mantener tu nivel de vida necesitas
                  </p>
                  <p className="text-3xl font-black text-orange-600">
                    {moneda.simbolo}{formatMoney(resultado.ahorroNecesario)}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    al momento de jubilarte (en {resultado.añosParaJubilarse} años)
                  </p>
                </div>
              </div>

              {/* Estado actual */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Tendrás acumulado</p>
                  <p className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200 break-all">
                    {moneda.simbolo}{formatMoney(resultado.ahorroActualProyectado)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    con tu ahorro actual y aportes
                  </p>
                </div>

                {resultado.brecha > 0 ? (
                  <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-2xl ring-1 ring-red-200 dark:ring-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-1">Te faltarían</p>
                    <p className="text-xl sm:text-2xl font-black text-red-600 break-all">
                      {moneda.simbolo}{formatMoney(resultado.brecha)}
                    </p>
                    <p className="text-xs text-red-500 mt-1">
                      para alcanzar tu meta
                    </p>
                  </div>
                ) : (
                  <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl ring-1 ring-emerald-200 dark:ring-emerald-800">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">¡Vas bien!</p>
                    <p className="text-xl sm:text-2xl font-black text-emerald-600">
                      Meta cubierta
                    </p>
                    <p className="text-xs text-emerald-500 mt-1">
                      Manteniendo tu ahorro actual
                    </p>
                  </div>
                )}
              </div>

              {/* Recomendación */}
              {resultado.brecha > 0 && resultado.ahorroMensualRequerido > 0 && (
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl ring-1 ring-blue-200 dark:ring-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Para cerrar la brecha necesitas ahorrar</p>
                  <p className="text-3xl font-black text-blue-600">
                    {moneda.simbolo}{formatMoneyFull(resultado.ahorroMensualRequerido)}<span className="text-lg font-bold text-blue-400">/mes</span>
                  </p>
                  <p className="text-xs text-blue-500 mt-2">
                    Esto es adicional a lo que ya ahorras
                  </p>
                </div>
              )}

              {/* Pensión estimada */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Con tu ahorro actual, podrías pagarte una pensión de
                </p>
                <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                  {moneda.simbolo}{formatMoneyFull(resultado.pensionEstimadaMensual)}<span className="text-base font-bold text-slate-400">/mes</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Durante {añosJubilacion} años (en pesos de hoy)
                </p>
              </div>

              {/* Proyección */}
              {resultado.evolucion.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">
                    Proyección de tu ahorro
                  </h3>
                  <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Edad</th>
                          <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Ahorro acumulado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {resultado.evolucion.filter((_, i) => i % 5 === 0 || i === resultado.evolucion.length - 1).map((row) => (
                          <tr key={row.edad} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">{row.edad} años</td>
                            <td className="px-4 py-3 text-right font-bold text-orange-600">
                              {moneda.simbolo}{formatMoney(row.ahorro)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-orange-500"><Icon name="lightbulb" className="w-5 h-5" weight="fill" /></span>
            Sobre la jubilación en Colombia
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span><strong>Edad de pensión:</strong> En Colombia, la edad legal de pensión es 57 años para mujeres y 62 para hombres, con mínimo 1.300 semanas cotizadas.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span><strong>Pensión voluntaria:</strong> Además de la obligatoria, puedes aportar a fondos de pensiones voluntarias con beneficios tributarios.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span><strong>Regla del 4%:</strong> Una estrategia común es retirar máximo 4% anual de tu ahorro para que dure toda la jubilación.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span><strong>Empieza temprano:</strong> Gracias al interés compuesto, $100.000 ahorrados a los 25 valen más que $300.000 ahorrados a los 45.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <FAQ items={faqs} colorClass="orange" />
        </div>
      </div>
    </div>
  );
}
