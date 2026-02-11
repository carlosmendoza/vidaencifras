"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";

// Tasas de referencia de bancos colombianos (actualizar periódicamente)
const BANCOS_PRESETS = [
  { nombre: "Bancolombia", tasa90: 9.5, tasa180: 10.0, tasa360: 10.5 },
  { nombre: "Davivienda", tasa90: 9.0, tasa180: 9.8, tasa360: 10.2 },
  { nombre: "Banco de Bogotá", tasa90: 9.2, tasa180: 9.9, tasa360: 10.3 },
  { nombre: "BBVA", tasa90: 8.8, tasa180: 9.5, tasa360: 10.0 },
  { nombre: "Scotiabank", tasa90: 9.3, tasa180: 9.7, tasa360: 10.1 },
  { nombre: "Banco de Occidente", tasa90: 9.4, tasa180: 10.1, tasa360: 10.6 },
  { nombre: "Banco Popular", tasa90: 9.6, tasa180: 10.2, tasa360: 10.7 },
  { nombre: "Banco Caja Social", tasa90: 9.8, tasa180: 10.3, tasa360: 10.8 },
];

const RETENCION_FUENTE = 0.04; // 4% de retención en la fuente

const faqs = [
  {
    question: "¿Qué es un CDT y cómo funciona?",
    answer:
      "Un CDT (Certificado de Depósito a Término) es un producto de ahorro donde depositas dinero por un plazo fijo y recibes intereses. No puedes retirar el dinero antes del vencimiento sin penalización. A mayor plazo, generalmente mayor tasa de interés.",
  },
  {
    question: "¿Cuál es la retención en la fuente de los CDTs?",
    answer:
      "Los rendimientos de CDTs tienen una retención en la fuente del 4% sobre los intereses ganados. Esta retención se aplica al momento del pago de los intereses y es descontable en tu declaración de renta.",
  },
  {
    question: "¿Qué pasa si necesito el dinero antes del vencimiento?",
    answer:
      "La mayoría de bancos permiten cancelar anticipadamente con una penalización, que suele ser la pérdida parcial o total de los intereses. Algunos bancos ofrecen CDTs 'redimibles' que permiten retiros sin penalización.",
  },
  {
    question: "¿Es mejor un CDT o una cuenta de ahorros?",
    answer:
      "Los CDTs ofrecen tasas más altas (10-12% vs 3-4% de cuentas de ahorro), pero no tienes liquidez. Si no necesitarás el dinero en el plazo del CDT, es mejor opción. Si necesitas acceso al dinero, la cuenta de ahorros es más conveniente.",
  },
];

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
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-4xl mx-auto shadow-2xl shadow-emerald-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            📊
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Comparador de CDTs
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Compara tasas de diferentes bancos y encuentra la mejor opción
          </p>
        </div>

        <div className="space-y-6">
          {/* Capital a invertir */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Capital a invertir
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
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
                      ? "bg-emerald-500 text-white"
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
                      ? "bg-emerald-500 text-white"
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
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
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
                      className="px-3 py-2 bg-white dark:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200 dark:border-slate-600"
                    >
                      + {banco.nombre}
                    </button>
                  ))}
                  <button
                    onClick={() => agregarCDT()}
                    className="px-3 py-2 bg-emerald-50 dark:bg-emerald-900/50 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors border border-emerald-200 dark:border-emerald-800"
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
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={cdt.habilitado}
                      onChange={(e) => actualizarCDT(cdt.id, "habilitado", e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-slate-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={cdt.banco}
                        onChange={(e) => actualizarCDT(cdt.id, "banco", e.target.value)}
                        className="px-3 py-2 rounded-xl text-sm font-semibold bg-transparent border border-slate-200 dark:border-slate-700"
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
                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                        {plazoSeleccionado} días
                      </div>
                    </div>
                    <button
                      onClick={() => eliminarCDT(cdt.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
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
            <div className="mt-10 space-y-6">
              {/* Mejor opción destacada */}
              <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl ring-1 ring-emerald-100 dark:ring-emerald-900 animate-result-appear">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🏆</span>
                  <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                    Mejor opción: {mejorOpcion.banco}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Interés neto</p>
                    <p className="text-2xl font-black text-emerald-600">${formatMoney(mejorOpcion.interesNeto)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total al vencimiento</p>
                    <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                      ${formatMoney(mejorOpcion.totalFinal)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tasa nominal</p>
                    <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                      {mejorOpcion.tasaAnual.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tasa efectiva neta</p>
                    <p className="text-2xl font-black text-emerald-600">
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

              {/* Tabla comparativa */}
              <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
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
                          {index === 0 && <span className="mr-2">🏆</span>}
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

              {/* Nota sobre retención */}
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Nota:</strong> La retención en la fuente del 4% se descuenta automáticamente de los intereses.
                  Este valor es descontable en tu declaración de renta anual.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Consejos */}
      <div className="max-w-4xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-base">💡</span>
            Consejos para invertir en CDT
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-emerald-500">•</span>
              <span><strong>Compara siempre:</strong> Las tasas varían significativamente entre bancos. Una diferencia de 0.5% puede representar miles de pesos en intereses.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500">•</span>
              <span><strong>Considera el plazo:</strong> A mayor plazo, mayor tasa, pero menos liquidez. Solo invierte a largo plazo dinero que no necesitarás.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500">•</span>
              <span><strong>Diversifica:</strong> Si tienes un monto grande, considera dividirlo en varios CDTs con diferentes vencimientos (escalera de CDTs).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500">•</span>
              <span><strong>Revisa el Fogafin:</strong> Los CDTs están protegidos por el Fogafin hasta $50 millones por banco, así que tus depósitos están seguros.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="emerald" />
        </div>
      </div>
    </div>
  );
}
