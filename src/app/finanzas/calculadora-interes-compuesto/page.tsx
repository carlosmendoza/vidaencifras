"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Icon } from "@/lib/icons";
import { calcularInteresCompuesto, type InteresCompuestoOutput, type TipoTasa, type FrecuenciaAporte } from "@/lib/calculadoras";
import { useUrlState } from "@/hooks/useUrlState";
import { ResultWithMascot } from "@/components/ResultWithMascot";

export default function InteresCompuesto() {
  const { moneda } = useCurrency();
  const { values, setField, hadInitialParams } = useUrlState(
    { capital: "", tasa: "", tipoTasa: "anual", tiempo: "", frecuenciaCapitalizacion: "12", aportePeriodico: "", frecuenciaAporte: "mensual", aporteAlInicio: "false" },
    { paramNames: { tipoTasa: "tipo", frecuenciaCapitalizacion: "capitalizacion", aportePeriodico: "aporte", frecuenciaAporte: "frecuencia" } }
  );
  const [resultado, setResultado] = useState<InteresCompuestoOutput | null>(null);
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

  const calcular = () => {
    const res = calcularInteresCompuesto({
      capital: parseFloat(values.capital) || 0,
      tasa: parseFloat(values.tasa),
      tipoTasa: values.tipoTasa as TipoTasa,
      tiempo: parseFloat(values.tiempo),
      frecuenciaCapitalizacion: Number(values.frecuenciaCapitalizacion),
      aportePeriodico: parseFloat(values.aportePeriodico) || 0,
      frecuenciaAporte: values.frecuenciaAporte as FrecuenciaAporte,
      aporteAlInicio: values.aporteAlInicio === "true",
    });
    if (res) setResultado(res);
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hadInitialParams]);

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
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
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
              <CurrencySelector colorClass="teal" />
            </div>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
              <CurrencyInput
                value={values.capital}
                onChange={(v) => setField("capital", v)}
                placeholder="10.000"
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
                  value={values.tasa}
                  onChange={(e) => setField("tasa", e.target.value)}
                  placeholder={values.tipoTasa === "mensual" ? "1.5" : "12"}
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
                      onClick={() => setField("tipoTasa", tipo.valor)}
                      className={`px-5 py-4 font-semibold transition-colors ${values.tipoTasa === tipo.valor || (tipo.valor === "anual" && values.tipoTasa !== "mensual" && values.tipoTasa !== "anual")
                        ? "bg-teal-500 text-white"
                        : "bg-white text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`}
                    >
                      {tipo.nombre}
                    </button>
                  ))}
                </div>
              ) : (
                <select
                  value={values.tipoTasa}
                  onChange={(e) => setField("tipoTasa", e.target.value)}
                  className="px-4 py-4 rounded-2xl text-base font-semibold bg-teal-50 text-teal-700 border-2 border-teal-200 min-w-[180px]"
                >
                  {tiposTasaAvanzado.map((tipo) => (
                    <option key={tipo.valor} value={tipo.valor}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {values.tipoTasa === "mensual" && (
              <p className="text-xs text-teal-600 ml-1">
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
              value={values.tiempo}
              onChange={(e) => setField("tiempo", e.target.value)}
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
                  value={values.frecuenciaCapitalizacion}
                  onChange={(e) => setField("frecuenciaCapitalizacion", e.target.value)}
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
                      <CurrencyInput
                        value={values.aportePeriodico}
                        onChange={(v) => setField("aportePeriodico", v)}
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
                      value={values.frecuenciaAporte}
                      onChange={(e) => setField("frecuenciaAporte", e.target.value)}
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

                {values.frecuenciaAporte !== "ninguno" && parseFloat(values.aportePeriodico) > 0 && (
                  <label className="flex items-center gap-3 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={values.aporteAlInicio === "true"}
                      onChange={(e) => setField("aporteAlInicio", String(e.target.checked))}
                      className="w-5 h-5 rounded-lg border-2 border-slate-300 text-teal-500 focus:ring-teal-500"
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
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.99]"
          >
            Calcular
          </button>

          {/* Resultados */}
          {resultado && (
            <ResultWithMascot>
            <div className="mt-10 space-y-6">
              {/* Resumen principal */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900">
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">En {values.tiempo} años tendrás</p>
                  <p className="text-4xl font-black text-teal-600">
                    {moneda.simbolo}{formatMoney(resultado.montoFinal)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-600 dark:text-slate-300">Capital inicial</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {moneda.simbolo}{formatMoney(parseFloat(values.capital) || 0)}
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
                <div className="p-4 bg-teal-50 dark:bg-teal-950/50 rounded-2xl ring-1 ring-teal-100 dark:ring-teal-900 text-center">
                  <p className="text-2xl font-black text-teal-600 dark:text-teal-400">{formatPercent(resultado.tasaEfectivaAnual)}%</p>
                  <p className="text-xs text-teal-500 mt-1">tasa anual equivalente</p>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-950/50 rounded-2xl ring-1 ring-teal-100 dark:ring-teal-900 text-center">
                  <p className="text-2xl font-black text-teal-600 dark:text-teal-400">+{formatPercent(resultado.rendimientoTotal)}%</p>
                  <p className="text-xs text-teal-500 mt-1">ganancia total</p>
                </div>
              </div>

              {/* Botón para mostrar/ocultar tabla */}
              {resultado.evolucion.length > 1 && (
                <>
                  <button
                    onClick={() => setMostrarTabla(!mostrarTabla)}
                    className="w-full py-3 rounded-xl font-semibold text-teal-700 bg-teal-100 dark:bg-teal-900 hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors flex items-center justify-center gap-2"
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
                              <td className="px-4 py-3 text-right font-semibold text-teal-600">
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
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            ¿Cómo funciona?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
            El interés compuesto hace que tu dinero crezca más rápido porque <strong className="text-slate-700 dark:text-slate-300">ganas intereses sobre tus intereses</strong>.
            Mientras más tiempo dejes tu dinero invertido, más notable es el efecto.
          </p>
          <div className="p-4 bg-teal-50 dark:bg-teal-900/50 rounded-xl text-sm text-teal-700 dark:text-teal-300">
            <strong>Ejemplo:</strong> $10,000 al 10% anual durante 20 años = $67,275 (¡$57,275 solo en intereses!)
          </div>
        </div>

        <div className="pt-8">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-6 px-2">También te puede interesar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/finanzas/calculadora-prestamos"
              className="p-6 card-glass card-hover card-hover-teal rounded-3xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 transition-transform group-hover:scale-110">
                <Icon name="landmark" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 dark:text-slate-100">Préstamos</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Cuotas y amortización</p>
              </div>
            </Link>
            <Link
              href="/finanzas/calculadora-salario-neto"
              className="p-6 card-glass card-hover card-hover-teal rounded-3xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 transition-transform group-hover:scale-110">
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
