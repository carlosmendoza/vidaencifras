"use client";

import { useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Icon } from "@/lib/icons";

type TipoTasa = "anual" | "mensual" | "nominal" | "efectiva_trimestral" | "efectiva_semestral";
type FrecuenciaAporte = "mensual" | "trimestral" | "semestral" | "anual" | "ninguno";

interface ResultadoCalculo {
  montoFinal: number;
  interesGanado: number;
  totalAportes: number;
  tasaEfectivaAnual: number;
  tasaEfectivaMensual: number;
  rendimientoTotal: number;
  evolucion: {
    periodo: number;
    capital: number;
    aporteAcumulado: number;
    interesAcumulado: number;
  }[];
}

export default function InteresCompuesto() {
  const { moneda } = useCurrency();
  const [capital, setCapital] = useState<string>("");
  const [tasa, setTasa] = useState<string>("");
  const [tipoTasa, setTipoTasa] = useState<TipoTasa>("anual");
  const [tiempo, setTiempo] = useState<string>("");
  const [frecuenciaCapitalizacion, setFrecuenciaCapitalizacion] = useState<number>(12);
  const [aportePeriodico, setAportePeriodico] = useState<string>("");
  const [frecuenciaAporte, setFrecuenciaAporte] = useState<FrecuenciaAporte>("mensual");
  const [aporteAlInicio, setAporteAlInicio] = useState<boolean>(false);
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [mostrarAvanzado, setMostrarAvanzado] = useState<boolean>(false);
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(false);

  const tiposTasaSimple = [
    { valor: "anual" as TipoTasa, nombre: "Anual" },
    { valor: "mensual" as TipoTasa, nombre: "Mensual" },
  ];

  const tiposTasaAvanzado = [
    { valor: "anual" as TipoTasa, nombre: "Efectiva Anual (TEA)", periodosPorAnio: 1 },
    { valor: "mensual" as TipoTasa, nombre: "Efectiva Mensual (TEM)", periodosPorAnio: 12 },
    { valor: "efectiva_trimestral" as TipoTasa, nombre: "Efectiva Trimestral (TET)", periodosPorAnio: 4 },
    { valor: "efectiva_semestral" as TipoTasa, nombre: "Efectiva Semestral (TES)", periodosPorAnio: 2 },
    { valor: "nominal" as TipoTasa, nombre: "Nominal Anual (TNA)", periodosPorAnio: 1 },
  ];

  const frecuenciasCapitalizacion = [
    { valor: 12, nombre: "Mensual" },
    { valor: 365, nombre: "Diaria" },
    { valor: 4, nombre: "Trimestral" },
    { valor: 2, nombre: "Semestral" },
    { valor: 1, nombre: "Anual" },
  ];

  const frecuenciasAporte = [
    { valor: "ninguno" as FrecuenciaAporte, nombre: "Sin aportes adicionales", periodosAnuales: 0 },
    { valor: "mensual" as FrecuenciaAporte, nombre: "Cada mes", periodosAnuales: 12 },
    { valor: "trimestral" as FrecuenciaAporte, nombre: "Cada 3 meses", periodosAnuales: 4 },
    { valor: "semestral" as FrecuenciaAporte, nombre: "Cada 6 meses", periodosAnuales: 2 },
    { valor: "anual" as FrecuenciaAporte, nombre: "Cada año", periodosAnuales: 1 },
  ];

  const getPeriodosPorAnio = (tipo: TipoTasa): number => {
    const found = tiposTasaAvanzado.find(t => t.valor === tipo);
    return found?.periodosPorAnio || 1;
  };

  const calcular = () => {
    const p = parseFloat(capital) || 0;
    const tasaInput = parseFloat(tasa);
    const t = parseFloat(tiempo);
    const n = frecuenciaCapitalizacion;
    const aporte = parseFloat(aportePeriodico) || 0;
    const freqAporte = frecuenciasAporte.find(f => f.valor === frecuenciaAporte);
    const aportesAnuales = freqAporte?.periodosAnuales || 0;

    if (isNaN(tasaInput) || isNaN(t) || t <= 0) return;

    let tasaNominal: number;
    let tasaEfectivaAnual: number;

    if (tipoTasa === "nominal") {
      // La tasa ingresada es nominal anual
      tasaNominal = tasaInput / 100;
      tasaEfectivaAnual = Math.pow(1 + tasaNominal / n, n) - 1;
    } else {
      // La tasa ingresada es efectiva (mensual, trimestral, anual, etc.)
      const periodosDelTipo = getPeriodosPorAnio(tipoTasa);
      const tasaEfectivaPeriodo = tasaInput / 100;

      // Convertir tasa efectiva del período a TEA
      tasaEfectivaAnual = Math.pow(1 + tasaEfectivaPeriodo, periodosDelTipo) - 1;

      // Convertir TEA a tasa nominal para la capitalización elegida
      tasaNominal = n * (Math.pow(1 + tasaEfectivaAnual, 1 / n) - 1);
    }

    const tasaPeriodo = tasaNominal / n;
    const totalPeriodos = n * t;

    // Calcular evolución año por año
    const evolucion: ResultadoCalculo["evolucion"] = [];
    let capitalActual = p;
    let totalAportesAcumulado = 0;
    let interesAcumulado = 0;

    const periodosCapitalizacionPorAporte = aportesAnuales > 0 ? n / aportesAnuales : 0;

    for (let anio = 1; anio <= t; anio++) {
      const periodosEnAnio = n;
      let aporteEnAnio = 0;

      for (let periodo = 1; periodo <= periodosEnAnio; periodo++) {
        if (aportesAnuales > 0 && periodosCapitalizacionPorAporte > 0) {
          const esPeridodoAporte = periodo % periodosCapitalizacionPorAporte === 0 ||
            (periodosCapitalizacionPorAporte < 1 && true);

          if (esPeridodoAporte || (aportesAnuales >= n)) {
            const aportePorPeriodo = aportesAnuales >= n ? aporte : aporte;
            if (aporteAlInicio) {
              capitalActual += aportePorPeriodo / (aportesAnuales >= n ? n / aportesAnuales : 1);
              aporteEnAnio += aportePorPeriodo / (aportesAnuales >= n ? n / aportesAnuales : 1);
            }
          }
        }

        const interesDelPeriodo = capitalActual * tasaPeriodo;
        capitalActual += interesDelPeriodo;
        interesAcumulado += interesDelPeriodo;

        if (aportesAnuales > 0 && !aporteAlInicio) {
          if (periodosCapitalizacionPorAporte >= 1 && periodo % periodosCapitalizacionPorAporte === 0) {
            capitalActual += aporte;
            aporteEnAnio += aporte;
          } else if (periodosCapitalizacionPorAporte < 1) {
            const aportesPorPeriodo = Math.round(1 / periodosCapitalizacionPorAporte);
            capitalActual += aporte * aportesPorPeriodo;
            aporteEnAnio += aporte * aportesPorPeriodo;
          }
        }
      }

      totalAportesAcumulado += aporteEnAnio;

      evolucion.push({
        periodo: anio,
        capital: capitalActual,
        aporteAcumulado: totalAportesAcumulado,
        interesAcumulado: interesAcumulado,
      });
    }

    let montoFinal: number;
    let totalAportes: number;

    if (aportesAnuales === 0 || aporte === 0) {
      montoFinal = p * Math.pow(1 + tasaPeriodo, totalPeriodos);
      totalAportes = 0;
    } else {
      montoFinal = capitalActual;
      totalAportes = totalAportesAcumulado;
    }

    const interesGanado = montoFinal - p - totalAportes;
    const inversionTotal = p + totalAportes;
    const rendimientoTotal = inversionTotal > 0 ? ((montoFinal - inversionTotal) / inversionTotal) * 100 : 0;

    const evolucionFinal: ResultadoCalculo["evolucion"] = [];
    if (aportesAnuales === 0 || aporte === 0) {
      for (let anio = 1; anio <= t; anio++) {
        const capitalEnAnio = p * Math.pow(1 + tasaPeriodo, n * anio);
        evolucionFinal.push({
          periodo: anio,
          capital: capitalEnAnio,
          aporteAcumulado: 0,
          interesAcumulado: capitalEnAnio - p,
        });
      }
    } else {
      evolucionFinal.push(...evolucion);
    }

    const tasaEfectivaMensual = (Math.pow(1 + tasaEfectivaAnual, 1 / 12) - 1) * 100;

    setResultado({
      montoFinal,
      interesGanado,
      totalAportes,
      tasaEfectivaAnual: tasaEfectivaAnual * 100,
      tasaEfectivaMensual,
      rendimientoTotal,
      evolucion: evolucionFinal,
    });
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercent = (num: number) => {
    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-emerald-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="trending-up" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Interés Compuesto
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula cuánto crecerá tu dinero con el tiempo
          </p>
        </div>

        <div className="space-y-6">
          {/* Capital inicial */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿Cuánto vas a invertir?
              </label>
              <CurrencySelector colorClass="emerald" />
            </div>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                placeholder="10000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          </div>

          {/* Tasa de interés - Modo simple */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuál es la tasa de interés?
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={tasa}
                  onChange={(e) => setTasa(e.target.value)}
                  placeholder={tipoTasa === "mensual" ? "1.5" : "12"}
                  step="0.01"
                  className="w-full px-6 py-4 rounded-2xl text-lg font-semibold pr-12"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
              </div>
              {!mostrarAvanzado ? (
                <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200">
                  {tiposTasaSimple.map((tipo) => (
                    <button
                      key={tipo.valor}
                      onClick={() => setTipoTasa(tipo.valor)}
                      className={`px-5 py-4 font-semibold transition-colors ${tipoTasa === tipo.valor || (tipo.valor === "anual" && tipoTasa !== "mensual" && tipoTasa !== "anual")
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`}
                    >
                      {tipo.nombre}
                    </button>
                  ))}
                </div>
              ) : (
                <select
                  value={tipoTasa}
                  onChange={(e) => setTipoTasa(e.target.value as TipoTasa)}
                  className="px-4 py-4 rounded-2xl text-base font-semibold bg-emerald-50 text-emerald-700 border-2 border-emerald-200 min-w-[180px]"
                >
                  {tiposTasaAvanzado.map((tipo) => (
                    <option key={tipo.valor} value={tipo.valor}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {tipoTasa === "mensual" && (
              <p className="text-xs text-emerald-600 ml-1">
                Ej: 1.5% mensual equivale a ~19.6% anual
              </p>
            )}
          </div>

          {/* Tiempo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Por cuántos años?
            </label>
            <input
              type="number"
              value={tiempo}
              onChange={(e) => setTiempo(e.target.value)}
              placeholder="5"
              min="1"
              step="1"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          {/* Botón opciones avanzadas */}
          <button
            onClick={() => setMostrarAvanzado(!mostrarAvanzado)}
            className="w-full py-3 rounded-xl font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            {mostrarAvanzado ? "Ocultar opciones avanzadas" : "Mostrar opciones avanzadas"}
            <span className={`transition-transform text-xs ${mostrarAvanzado ? "rotate-180" : ""}`}>▼</span>
          </button>

          {/* Opciones avanzadas */}
          {mostrarAvanzado && (
            <div className="space-y-5 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Opciones avanzadas</p>

              {/* Frecuencia de capitalización */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Capitalización de intereses
                </label>
                <select
                  value={frecuenciaCapitalizacion}
                  onChange={(e) => setFrecuenciaCapitalizacion(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-base font-semibold"
                >
                  {frecuenciasCapitalizacion.map((freq) => (
                    <option key={freq.valor} value={freq.valor}>
                      {freq.nombre}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Qué tan seguido se suman los intereses al capital
                </p>
              </div>

              {/* Aportes periódicos */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Aportes adicionales
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                      Monto
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">{moneda.simbolo}</span>
                      <input
                        type="number"
                        value={aportePeriodico}
                        onChange={(e) => setAportePeriodico(e.target.value)}
                        placeholder="500"
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-base font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                      Frecuencia
                    </label>
                    <select
                      value={frecuenciaAporte}
                      onChange={(e) => setFrecuenciaAporte(e.target.value as FrecuenciaAporte)}
                      className="w-full px-4 py-3 rounded-xl text-base font-semibold"
                    >
                      {frecuenciasAporte.map((freq) => (
                        <option key={freq.valor} value={freq.valor}>
                          {freq.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {frecuenciaAporte !== "ninguno" && parseFloat(aportePeriodico) > 0 && (
                  <label className="flex items-center gap-3 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={aporteAlInicio}
                      onChange={(e) => setAporteAlInicio(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-slate-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Aportar al inicio de cada período
                    </span>
                  </label>
                )}
              </div>
            </div>
          )}

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.99]"
          >
            Calcular
          </button>

          {/* Resultados */}
          {resultado && (
            <div className="mt-10 space-y-6">
              {/* Resumen principal */}
              <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">En {tiempo} años tendrás</p>
                  <p className="text-4xl font-black text-emerald-600">
                    {moneda.simbolo}{formatMoney(resultado.montoFinal)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-600 dark:text-slate-300">Capital inicial</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {moneda.simbolo}{formatMoney(parseFloat(capital) || 0)}
                    </span>
                  </div>

                  {resultado.totalAportes > 0 && (
                    <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                      <span className="text-slate-600 dark:text-slate-300">Total aportado</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {moneda.simbolo}{formatMoney(resultado.totalAportes)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-600 dark:text-slate-300">Intereses ganados</span>
                    <span className="font-bold text-teal-600">
                      +{moneda.simbolo}{formatMoney(resultado.interesGanado)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-2xl ring-1 ring-blue-100 dark:ring-blue-900 text-center">
                  <p className="text-2xl font-black text-blue-700">{formatPercent(resultado.tasaEfectivaAnual)}%</p>
                  <p className="text-xs text-blue-500 mt-1">tasa anual equivalente</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-2xl ring-1 ring-purple-100 dark:ring-purple-900 text-center">
                  <p className="text-2xl font-black text-purple-700">+{formatPercent(resultado.rendimientoTotal)}%</p>
                  <p className="text-xs text-purple-500 mt-1">ganancia total</p>
                </div>
              </div>

              {/* Botón para mostrar/ocultar tabla */}
              {resultado.evolucion.length > 1 && (
                <>
                  <button
                    onClick={() => setMostrarTabla(!mostrarTabla)}
                    className="w-full py-3 rounded-xl font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {mostrarTabla ? "Ocultar" : "Ver"} crecimiento año a año
                    <span className={`transition-transform ${mostrarTabla ? "rotate-180" : ""}`}>▼</span>
                  </button>

                  {mostrarTabla && (
                    <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr>
                            <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Año</th>
                            <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Capital</th>
                            {resultado.totalAportes > 0 && (
                              <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Aportes</th>
                            )}
                            <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Interés</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                          {resultado.evolucion.map((row) => (
                            <tr key={row.periodo} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">{row.periodo}</td>
                              <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                                {moneda.simbolo}{formatMoney(row.capital)}
                              </td>
                              {resultado.totalAportes > 0 && (
                                <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                                  {moneda.simbolo}{formatMoney(row.aporteAcumulado)}
                                </td>
                              )}
                              <td className="px-4 py-3 text-right text-teal-600">
                                {moneda.simbolo}{formatMoney(row.interesAcumulado)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            ¿Cómo funciona?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
            El interés compuesto hace que tu dinero crezca más rápido porque <strong className="text-slate-700 dark:text-slate-300">ganas intereses sobre tus intereses</strong>.
            Mientras más tiempo dejes tu dinero invertido, más notable es el efecto.
          </p>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/50 rounded-xl text-sm text-emerald-700 dark:text-emerald-300">
            <strong>Ejemplo:</strong> $10,000 al 10% anual durante 20 años = $67,275 (¡$57,275 solo en intereses!)
          </div>
        </div>

        <div className="pt-8">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-6 px-2">También te puede interesar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/finanzas/calculadora-prestamos"
              className="p-6 card-glass card-hover card-hover-emerald rounded-3xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
                <Icon name="landmark" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 dark:text-slate-100">Préstamos</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Cuotas y amortización</p>
              </div>
            </Link>
            <Link
              href="/finanzas/calculadora-salario-neto"
              className="p-6 card-glass card-hover card-hover-emerald rounded-3xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
                <Icon name="banknote" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 dark:text-slate-100">Salario Neto</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Deducciones legales</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
