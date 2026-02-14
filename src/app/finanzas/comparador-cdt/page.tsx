"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { ShareButtons } from "@/components/ShareButtons";
import { Icon } from "@/lib/icons";
import { CurrencyInput } from "@/components/CurrencyInput";
import { ResultWithMascot } from "@/components/ResultWithMascot";

// Tasas de referencia CDT bancos colombianos — febrero 2026
// Fuentes: Superfinanciera vía Semana/La República, El Tiempo, La FM (corte: 14 feb 2026)
// Nota: solo CDTs reales (no cuentas de ahorro ni bolsillos programados)
const BANCOS_PRESETS = [
  { nombre: "Tuya", tasa90: 10.45, tasa180: 11.41, tasa360: 12.89 },
  { nombre: "MiBanco", tasa90: 10.11, tasa180: 10.19, tasa360: 12.69 },
  { nombre: "Banco de Bogotá", tasa90: 9.8, tasa180: 10.5, tasa360: 12.14 },
  { nombre: "AV Villas", tasa90: 9.5, tasa180: 10.3, tasa360: 12.06 },
  { nombre: "Davivienda", tasa90: 9.0, tasa180: 10.0, tasa360: 11.92 },
  { nombre: "Bold", tasa90: 11.0, tasa180: 11.20, tasa360: 11.92 },
  { nombre: "Banco de Occidente", tasa90: 10.15, tasa180: 11.49, tasa360: 11.85 },
  { nombre: "Credifamilia", tasa90: 9.3, tasa180: 10.6, tasa360: 11.8 },
  { nombre: "BBVA", tasa90: 9.0, tasa180: 9.8, tasa360: 11.48 },
  { nombre: "Banco W", tasa90: 10.05, tasa180: 10.2, tasa360: 11.47 },
  { nombre: "Bancolombia", tasa90: 8.3, tasa180: 9.5, tasa360: 11.20 },
  { nombre: "Itaú", tasa90: 8.55, tasa180: 9.5, tasa360: 11.05 },
  { nombre: "Nu Colombia", tasa90: 9.7, tasa180: 10.5, tasa360: 10.5 },
  { nombre: "Banco Falabella", tasa90: 8.5, tasa180: 9.2, tasa360: 9.95 },
];

const RETENCION_FUENTE = 0.04; // 4% de retención en la fuente

interface CDTConfig {
  id: string;
  banco: string;
  tasaAnual: number;
  plazo: number;
  habilitado: boolean;
}

interface CDTResultado {
  id: string;
  banco: string;
  capital: number;
  tasaAnual: number;
  plazo: number;
  interesBruto: number;
  retencion: number;
  interesNeto: number;
  totalFinal: number;
  tasaEfectivaNeta: number;
}

export default function ComparadorCDT() {
  const [capital, setCapital] = useState<string>("10000000");
  const [plazoSeleccionado, setPlazoSeleccionado] = useState<90 | 180 | 360>(180);
  const [cdts, setCdts] = useState<CDTConfig[]>(
    BANCOS_PRESETS.slice(0, 4).map((banco, i) => ({
      id: `cdt-${i}`,
      banco: banco.nombre,
      tasaAnual: plazoSeleccionado === 90 ? banco.tasa90 : plazoSeleccionado === 180 ? banco.tasa180 : banco.tasa360,
      plazo: plazoSeleccionado,
      habilitado: true,
    }))
  );
  const [mostrarPersonalizado, setMostrarPersonalizado] = useState(false);

  // Actualizar tasas cuando cambia el plazo
  const actualizarPlazo = (nuevoPlazo: 90 | 180 | 360) => {
    setPlazoSeleccionado(nuevoPlazo);
    setCdts((prev) =>
      prev.map((cdt) => {
        const bancoPreset = BANCOS_PRESETS.find((b) => b.nombre === cdt.banco);
        if (bancoPreset) {
          const nuevaTasa =
            nuevoPlazo === 90 ? bancoPreset.tasa90 : nuevoPlazo === 180 ? bancoPreset.tasa180 : bancoPreset.tasa360;
          return { ...cdt, plazo: nuevoPlazo, tasaAnual: nuevaTasa };
        }
        return { ...cdt, plazo: nuevoPlazo };
      })
    );
  };

  const agregarCDT = (banco?: typeof BANCOS_PRESETS[0]) => {
    const nuevoCDT: CDTConfig = {
      id: `cdt-${Date.now()}`,
      banco: banco?.nombre || "CDT Personalizado",
      tasaAnual: banco
        ? plazoSeleccionado === 90
          ? banco.tasa90
          : plazoSeleccionado === 180
          ? banco.tasa180
          : banco.tasa360
        : 10.0,
      plazo: plazoSeleccionado,
      habilitado: true,
    };
    setCdts((prev) => [...prev, nuevoCDT]);
  };

  const eliminarCDT = (id: string) => {
    setCdts((prev) => prev.filter((cdt) => cdt.id !== id));
  };

  const actualizarCDT = (id: string, campo: keyof CDTConfig, valor: string | number | boolean) => {
    setCdts((prev) =>
      prev.map((cdt) => (cdt.id === id ? { ...cdt, [campo]: valor } : cdt))
    );
  };

  const resultados = useMemo((): CDTResultado[] => {
    const capitalNum = parseFloat(capital) || 0;
    if (capitalNum <= 0) return [];

    return cdts
      .filter((cdt) => cdt.habilitado)
      .map((cdt) => {
        const diasAño = 365;
        const tasaDiaria = cdt.tasaAnual / 100 / diasAño;
        const interesBruto = capitalNum * tasaDiaria * cdt.plazo;
        const retencion = interesBruto * RETENCION_FUENTE;
        const interesNeto = interesBruto - retencion;
        const totalFinal = capitalNum + interesNeto;
        const tasaEfectivaNeta = (interesNeto / capitalNum) * (365 / cdt.plazo) * 100;

        return {
          id: cdt.id,
          banco: cdt.banco,
          capital: capitalNum,
          tasaAnual: cdt.tasaAnual,
          plazo: cdt.plazo,
          interesBruto,
          retencion,
          interesNeto,
          totalFinal,
          tasaEfectivaNeta,
        };
      })
      .sort((a, b) => b.interesNeto - a.interesNeto);
  }, [capital, cdts]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const mejorOpcion = resultados[0];
  const peorOpcion = resultados[resultados.length - 1];
  const diferencia = mejorOpcion && peorOpcion ? mejorOpcion.interesNeto - peorOpcion.interesNeto : 0;

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl shadow-teal-500/5">
        <CalculatorHeader title="Comparador de CDTs" subtitle="Compara tasas de diferentes bancos y encuentra la mejor opción" icon="bar-chart" gradient="finanzas" />

        <div className="space-y-6">
          {/* Capital a invertir */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Capital a invertir
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <CurrencyInput
                value={capital}
                onChange={(v) => setCapital(v)}
                locale="es-CO"
                placeholder="10.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[5000000, 10000000, 20000000, 50000000].map((monto) => (
                <button
                  key={monto}
                  onClick={() => setCapital(monto.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    capital === monto.toString()
                      ? "bg-teal-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  ${formatMoney(monto)}
                </button>
              ))}
            </div>
          </div>

          {/* Plazo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Plazo
            </label>
            <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              {[90, 180, 360].map((dias) => (
                <button
                  key={dias}
                  onClick={() => actualizarPlazo(dias as 90 | 180 | 360)}
                  className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                    plazoSeleccionado === dias
                      ? "bg-teal-500 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  {dias} días
                </button>
              ))}
            </div>
          </div>

          {/* CDTs a comparar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                CDTs a comparar
              </label>
              <button
                onClick={() => setMostrarPersonalizado(!mostrarPersonalizado)}
                className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
              >
                {mostrarPersonalizado ? "Ocultar opciones" : "Agregar banco"}
              </button>
            </div>

            {mostrarPersonalizado && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Selecciona un banco para agregar:
                </p>
                <div className="flex flex-wrap gap-2">
                  {BANCOS_PRESETS.filter(
                    (b) => !cdts.some((cdt) => cdt.banco === b.nombre)
                  ).map((banco) => (
                    <button
                      key={banco.nombre}
                      onClick={() => agregarCDT(banco)}
                      className="px-3 py-2 bg-white dark:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 hover:text-teal-600 dark:hover:text-teal-400 transition-colors border border-slate-200 dark:border-slate-600"
                    >
                      + {banco.nombre}
                    </button>
                  ))}
                  <button
                    onClick={() => agregarCDT()}
                    className="px-3 py-2 bg-teal-50 dark:bg-teal-900/50 rounded-xl text-sm font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors border border-teal-200 dark:border-teal-800"
                  >
                    + Personalizado
                  </button>
                </div>
              </div>
            )}

            {/* Lista de CDTs */}
            <div className="space-y-3">
              {cdts.map((cdt) => (
                <div
                  key={cdt.id}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    cdt.habilitado
                      ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={cdt.habilitado}
                      onChange={(e) => actualizarCDT(cdt.id, "habilitado", e.target.checked)}
                      className="w-5 h-5 mt-2 rounded-lg border-2 border-slate-300 text-teal-500 focus:ring-teal-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3">
                        <input
                          type="text"
                          value={cdt.banco}
                          onChange={(e) => actualizarCDT(cdt.id, "banco", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-transparent border border-slate-200 dark:border-slate-700"
                          placeholder="Nombre del banco"
                        />
                        <div className="relative">
                          <input
                            type="number"
                            value={cdt.tasaAnual}
                            onChange={(e) => actualizarCDT(cdt.id, "tasaAnual", parseFloat(e.target.value) || 0)}
                            step="0.1"
                            className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-transparent border border-slate-200 dark:border-slate-700 pr-10"
                            placeholder="Tasa"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">% EA</span>
                        </div>
                        <div className="hidden md:flex text-sm text-slate-500 dark:text-slate-400 items-center">
                          {plazoSeleccionado} días
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => eliminarCDT(cdt.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resultados */}
          {resultados.length > 0 && (
            <ResultWithMascot>
            <div className="mt-10 space-y-6">
              {/* Mejor opción destacada */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900 animate-result-appear">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="seal-check" className="w-6 h-6 text-teal-600" />
                  <h3 className="text-lg font-bold text-teal-700 dark:text-teal-300">
                    Mejor opción: {mejorOpcion.banco}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Interés neto</p>
                    <p className="text-xl sm:text-2xl font-black text-emerald-600">${formatMoney(mejorOpcion.interesNeto)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total al vencimiento</p>
                    <p className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200">
                      ${formatMoney(mejorOpcion.totalFinal)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tasa nominal</p>
                    <p className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200">
                      {mejorOpcion.tasaAnual.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tasa efectiva neta</p>
                    <p className="text-xl sm:text-2xl font-black text-emerald-600">
                      {mejorOpcion.tasaEfectivaNeta.toFixed(2)}%
                    </p>
                  </div>
                </div>
                {diferencia > 0 && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center">
                    Ganas <strong>${formatMoney(diferencia)}</strong> más que la peor opción
                  </p>
                )}
                <ShareButtons
                  title="Comparador de CDTs Colombia"
                  text={`El mejor CDT para invertir $${formatMoney(parseFloat(capital))} a ${plazoSeleccionado} días es ${mejorOpcion.banco} con ${mejorOpcion.tasaAnual}% EA`}
                  result={{
                    label: "Ganancia neta",
                    value: `$${formatMoney(mejorOpcion.interesNeto)}`,
                  }}
                />
              </div>

              {/* Tabla comparativa — desktop */}
              <div className="hidden md:block overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Banco</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Tasa EA</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Interés bruto</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Retención (4%)</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Interés neto</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Total final</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {resultados.map((r, index) => (
                      <tr
                        key={r.id}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          index === 0 ? "bg-emerald-50/50 dark:bg-emerald-900/20" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                          {index === 0 && <Icon name="seal-check" className="w-5 h-5 inline-block mr-2 text-teal-600" />}
                          {r.banco}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                          {r.tasaAnual.toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                          ${formatMoney(r.interesBruto)}
                        </td>
                        <td className="px-4 py-3 text-right text-red-500">
                          -${formatMoney(r.retencion)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-emerald-600">
                          ${formatMoney(r.interesNeto)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-emerald-600">
                          ${formatMoney(r.totalFinal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards comparativas — mobile */}
              <div className="md:hidden space-y-3">
                {resultados.map((r, index) => (
                  <div
                    key={r.id}
                    className={`p-4 rounded-2xl border ${
                      index === 0
                        ? "bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {index === 0 && <Icon name="seal-check" className="w-4 h-4 inline-block mr-1 text-teal-600" />}
                        {r.banco}
                      </span>
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {r.tasaAnual.toFixed(1)}% EA
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Interés neto</p>
                        <p className="font-bold text-emerald-600">${formatMoney(r.interesNeto)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Total final</p>
                        <p className="font-bold text-slate-700 dark:text-slate-200">${formatMoney(r.totalFinal)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nota sobre retención */}
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Nota:</strong> La retención en la fuente del 4% se descuenta automáticamente de los intereses.
                  Este valor es descontable en tu declaración de renta anual.
                </p>
              </div>
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Consejos */}
      <div className="max-w-4xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-base text-teal-600 dark:text-teal-400"><Icon name="lightbulb" className="w-5 h-5" /></span>
            Consejos para invertir en CDT
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Compara siempre:</strong> Las tasas varían significativamente entre bancos. Una diferencia de 0.5% puede representar miles de pesos en intereses.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Considera el plazo:</strong> A mayor plazo, mayor tasa, pero menos liquidez. Solo invierte a largo plazo dinero que no necesitarás.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Diversifica:</strong> Si tienes un monto grande, considera dividirlo en varios CDTs con diferentes vencimientos (escalera de CDTs).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Revisa el Fogafin:</strong> Los CDTs están protegidos por el Fogafin hasta $50 millones por banco, así que tus depósitos están seguros.</span>
            </li>
          </ul>
        </div>
      </div>

      <CalculatorFooter href="/finanzas/comparador-cdt" />
    </div>
  );
}
