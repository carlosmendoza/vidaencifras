"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { CalculatorResult } from "@/components/CalculatorResult";
import { ShareButtons } from "@/components/ShareButtons";

const faqs = [
  {
    question: "¿Cuándo conviene más comprar que arrendar?",
    answer:
      "Generalmente conviene comprar si planeas quedarte más de 5-7 años, tienes la cuota inicial, el costo mensual de la hipoteca es similar o menor al arriendo, y esperas que la propiedad se valorice. Cada caso es diferente según tus circunstancias.",
  },
  {
    question: "¿Qué costos adicionales tiene comprar vivienda en Colombia?",
    answer:
      "Además del precio, debes considerar: escrituración y registro (aprox. 1.5% del valor), avalúo, estudio de títulos, seguros obligatorios, y gastos de mudanza. También hay costos continuos como predial, administración y mantenimiento.",
  },
  {
    question: "¿Cuál es una cuota inicial razonable?",
    answer:
      "Lo ideal es dar mínimo 20-30% de cuota inicial. Con menos del 20%, algunos bancos cobran seguro adicional (PMI). Una cuota inicial mayor reduce tu cuota mensual y el total de intereses pagados.",
  },
  {
    question: "¿Cómo afecta la valorización a la decisión?",
    answer:
      "La valorización promedio en Colombia es del 3-5% anual, pero varía mucho según la zona. En zonas de alta demanda puede ser mayor. Sin embargo, la valorización no es garantizada y hay períodos donde los inmuebles pierden valor.",
  },
];

interface Resultado {
  // Escenario compra
  costoTotalCompra: number;
  totalIntereses: number;
  valorFinalVivienda: number;
  patrimonioFinalCompra: number;
  cuotaMensualHipoteca: number;
  // Escenario arriendo
  costoTotalArriendo: number;
  ahorroInvertido: number;
  rendimientoInversion: number;
  patrimonioFinalArriendo: number;
  // Comparación
  puntoEquilibrio: number | null;
  recomendacion: "comprar" | "arrendar" | "similar";
  diferencia: number;
  // Proyección anual
  proyeccion: {
    año: number;
    patrimonioCompra: number;
    patrimonioArriendo: number;
    costoAcumuladoCompra: number;
    costoAcumuladoArriendo: number;
  }[];
}

export default function ArriendoVsCompra() {
  const [precioVivienda, setPrecioVivienda] = useState<string>("300000000");
  const [cuotaInicial, setCuotaInicial] = useState<string>("60000000");
  const [tasaHipotecaria, setTasaHipotecaria] = useState<string>("12");
  const [plazoAnos, setPlazoAnos] = useState<string>("20");
  const [canonArriendo, setCanonArriendo] = useState<string>("1500000");
  const [incrementoArriendo, setIncrementoArriendo] = useState<string>("4");
  const [valorizacion, setValorizacion] = useState<string>("4");
  const [costosAdicionales, setCostosAdicionales] = useState<string>("500000");
  const [rendimientoInversion, setRendimientoInversion] = useState<string>("8");
  const [horizonteTiempo, setHorizonteTiempo] = useState<string>("10");

  const resultado = useMemo((): Resultado | null => {
    const precio = parseFloat(precioVivienda) || 0;
    const cuotaIni = parseFloat(cuotaInicial) || 0;
    const tasaAnual = (parseFloat(tasaHipotecaria) || 0) / 100;
    const plazo = parseInt(plazoAnos) || 20;
    const arriendo = parseFloat(canonArriendo) || 0;
    const incArriendo = (parseFloat(incrementoArriendo) || 0) / 100;
    const valAnual = (parseFloat(valorizacion) || 0) / 100;
    const costosMensuales = parseFloat(costosAdicionales) || 0;
    const rendInv = (parseFloat(rendimientoInversion) || 0) / 100;
    const horizonte = parseInt(horizonteTiempo) || 10;

    if (precio <= 0 || arriendo <= 0 || horizonte <= 0) return null;

    const montoHipoteca = precio - cuotaIni;
    const tasaMensual = tasaAnual / 12;
    const numeroPagos = plazo * 12;

    // Calcular cuota mensual de la hipoteca
    const cuotaMensual = montoHipoteca * (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) / (Math.pow(1 + tasaMensual, numeroPagos) - 1);

    // Proyección año por año
    const proyeccion: Resultado["proyeccion"] = [];
    let saldoHipoteca = montoHipoteca;
    let valorVivienda = precio;
    let arriendoActual = arriendo;
    let inversionAcumulada = cuotaIni; // Lo que hubiera invertido si no comprara
    let costoAcumuladoCompra = cuotaIni;
    let costoAcumuladoArriendo = 0;
    let puntoEquilibrio: number | null = null;

    for (let año = 1; año <= horizonte; año++) {
      // Calcular pagos del año - Compra
      let interesesAño = 0;
      let capitalAño = 0;
      for (let mes = 1; mes <= 12; mes++) {
        if (saldoHipoteca > 0) {
          const interesMes = saldoHipoteca * tasaMensual;
          const capitalMes = Math.min(cuotaMensual - interesMes, saldoHipoteca);
          interesesAño += interesMes;
          capitalAño += capitalMes;
          saldoHipoteca -= capitalMes;
        }
      }

      // Costos anuales de compra
      const costoCompraAño = (cuotaMensual + costosMensuales) * 12;
      costoAcumuladoCompra += costoCompraAño;
      valorVivienda *= (1 + valAnual);

      // Patrimonio compra = valor vivienda - saldo hipoteca
      const patrimonioCompra = valorVivienda - Math.max(0, saldoHipoteca);

      // Calcular arriendo del año
      const arriendoAño = arriendoActual * 12;
      costoAcumuladoArriendo += arriendoAño;
      arriendoActual *= (1 + incArriendo);

      // Diferencia mensual que podría invertir
      const diferenciaMensual = Math.max(0, (cuotaMensual + costosMensuales) - arriendo);

      // Actualizar inversión: lo que tenía + rendimiento + nuevos aportes
      inversionAcumulada = inversionAcumulada * (1 + rendInv) + diferenciaMensual * 12;

      // Patrimonio arriendo = inversión acumulada
      const patrimonioArriendo = inversionAcumulada;

      // Detectar punto de equilibrio
      if (!puntoEquilibrio && patrimonioCompra > patrimonioArriendo) {
        puntoEquilibrio = año;
      }

      proyeccion.push({
        año,
        patrimonioCompra,
        patrimonioArriendo,
        costoAcumuladoCompra,
        costoAcumuladoArriendo,
      });
    }

    const ultimoAño = proyeccion[proyeccion.length - 1];
    const totalIntereses = costoAcumuladoCompra - cuotaIni - (montoHipoteca - Math.max(0, saldoHipoteca));

    // Determinar recomendación
    let recomendacion: "comprar" | "arrendar" | "similar";
    const diferencia = ultimoAño.patrimonioCompra - ultimoAño.patrimonioArriendo;
    const umbral = precio * 0.05; // 5% del precio como umbral

    if (diferencia > umbral) {
      recomendacion = "comprar";
    } else if (diferencia < -umbral) {
      recomendacion = "arrendar";
    } else {
      recomendacion = "similar";
    }

    return {
      costoTotalCompra: costoAcumuladoCompra,
      totalIntereses,
      valorFinalVivienda: valorVivienda,
      patrimonioFinalCompra: ultimoAño.patrimonioCompra,
      cuotaMensualHipoteca: cuotaMensual,
      costoTotalArriendo: costoAcumuladoArriendo,
      ahorroInvertido: cuotaIni,
      rendimientoInversion: inversionAcumulada - cuotaIni,
      patrimonioFinalArriendo: ultimoAño.patrimonioArriendo,
      puntoEquilibrio,
      recomendacion,
      diferencia,
      proyeccion,
    };
  }, [precioVivienda, cuotaInicial, tasaHipotecaria, plazoAnos, canonArriendo, incrementoArriendo, valorizacion, costosAdicionales, rendimientoInversion, horizonteTiempo]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

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
            🏠
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            ¿Arrendar o Comprar?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Compara financieramente ambas opciones según tu situación
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Compra */}
          <div className="space-y-4 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl">
            <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span>🏡</span> Escenario Compra
            </h2>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Precio de la vivienda
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={precioVivienda}
                  onChange={(e) => setPrecioVivienda(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Cuota inicial
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={cuotaInicial}
                  onChange={(e) => setCuotaInicial(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl"
                />
              </div>
              <p className="text-xs text-slate-400">
                {parseFloat(precioVivienda) > 0
                  ? `${((parseFloat(cuotaInicial) / parseFloat(precioVivienda)) * 100).toFixed(0)}% del precio`
                  : ""}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Tasa hipotecaria anual
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={tasaHipotecaria}
                    onChange={(e) => setTasaHipotecaria(e.target.value)}
                    step="0.1"
                    className="w-full px-4 py-3 rounded-xl pr-10"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Plazo (años)
                </label>
                <input
                  type="number"
                  value={plazoAnos}
                  onChange={(e) => setPlazoAnos(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Valorización anual
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={valorizacion}
                    onChange={(e) => setValorizacion(e.target.value)}
                    step="0.5"
                    className="w-full px-4 py-3 rounded-xl pr-10"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Gastos mensuales
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={costosAdicionales}
                    onChange={(e) => setCostosAdicionales(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <p className="text-xs text-slate-400">Predial, admin, seguros</p>
              </div>
            </div>
          </div>

          {/* Columna Arriendo */}
          <div className="space-y-4 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl">
            <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span>🔑</span> Escenario Arriendo
            </h2>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Canon de arriendo mensual
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={canonArriendo}
                  onChange={(e) => setCanonArriendo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Incremento anual del arriendo
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={incrementoArriendo}
                  onChange={(e) => setIncrementoArriendo(e.target.value)}
                  step="0.5"
                  className="w-full px-4 py-3 rounded-xl pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
              </div>
              <p className="text-xs text-slate-400">En Colombia el límite legal es el IPC</p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Rendimiento de inversión alternativa
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={rendimientoInversion}
                  onChange={(e) => setRendimientoInversion(e.target.value)}
                  step="0.5"
                  className="w-full px-4 py-3 rounded-xl pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
              </div>
              <p className="text-xs text-slate-400">Si inviertes la cuota inicial y la diferencia mensual</p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Horizonte de tiempo (años)
              </label>
              <input
                type="number"
                value={horizonteTiempo}
                onChange={(e) => setHorizonteTiempo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl"
              />
              <div className="flex gap-2 flex-wrap">
                {[5, 10, 15, 20].map((años) => (
                  <button
                    key={años}
                    onClick={() => setHorizonteTiempo(años.toString())}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      horizonteTiempo === años.toString()
                        ? "bg-emerald-500 text-white"
                        : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {años} años
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="mt-10 space-y-6">
            {/* Recomendación principal */}
            <div
              className={`p-8 rounded-3xl ring-1 animate-result-appear ${
                resultado.recomendacion === "comprar"
                  ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 ring-emerald-100 dark:ring-emerald-900"
                  : resultado.recomendacion === "arrendar"
                  ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 ring-emerald-100 dark:ring-emerald-900"
                  : "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 ring-amber-100 dark:ring-amber-900"
              }`}
            >
              <div className="text-center mb-6">
                <span className="text-4xl mb-2 block">
                  {resultado.recomendacion === "comprar" ? "🏡" : resultado.recomendacion === "arrendar" ? "🔑" : "⚖️"}
                </span>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {resultado.recomendacion === "comprar"
                    ? "Comprar parece mejor opción"
                    : resultado.recomendacion === "arrendar"
                    ? "Arrendar parece mejor opción"
                    : "Las opciones son similares"}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  En {horizonteTiempo} años, la diferencia de patrimonio es de{" "}
                  <strong>${formatMoney(Math.abs(resultado.diferencia))}</strong>
                </p>
                {resultado.puntoEquilibrio && (
                  <p className="text-sm text-slate-400 mt-1">
                    Punto de equilibrio: <strong>{resultado.puntoEquilibrio} años</strong>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Resumen Compra */}
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3">🏡 Compra</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Cuota mensual</span>
                      <span className="font-semibold">${formatMoney(resultado.cuotaMensualHipoteca + parseFloat(costosAdicionales))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Valor final vivienda</span>
                      <span className="font-semibold">${formatMoney(resultado.valorFinalVivienda)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Costo total pagado</span>
                      <span className="font-semibold text-red-500">${formatMoney(resultado.costoTotalCompra)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Patrimonio final</span>
                      <span className="font-black text-emerald-600">${formatMoney(resultado.patrimonioFinalCompra)}</span>
                    </div>
                  </div>
                </div>

                {/* Resumen Arriendo */}
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3">🔑 Arriendo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Arriendo inicial</span>
                      <span className="font-semibold">${formatMoney(parseFloat(canonArriendo))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Inversión acumulada</span>
                      <span className="font-semibold">${formatMoney(resultado.patrimonioFinalArriendo)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Total arriendo pagado</span>
                      <span className="font-semibold text-red-500">${formatMoney(resultado.costoTotalArriendo)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Patrimonio final</span>
                      <span className="font-black text-emerald-600">${formatMoney(resultado.patrimonioFinalArriendo)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ShareButtons
                title="¿Arrendar o Comprar? - VidaEnCifras"
                text={`Analicé arrendar vs comprar: En ${horizonteTiempo} años, ${resultado.recomendacion === "comprar" ? "comprar" : resultado.recomendacion === "arrendar" ? "arrendar" : "ambas opciones"} genera un patrimonio de $${formatMoney(Math.max(resultado.patrimonioFinalCompra, resultado.patrimonioFinalArriendo))}`}
              />
            </div>

            {/* Proyección */}
            <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Año</th>
                    <th className="px-4 py-3 text-right font-bold text-emerald-600">Patrimonio Compra</th>
                    <th className="px-4 py-3 text-right font-bold text-emerald-600">Patrimonio Arriendo</th>
                    <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Diferencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {resultado.proyeccion.map((row) => {
                    const diff = row.patrimonioCompra - row.patrimonioArriendo;
                    return (
                      <tr key={row.año} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">{row.año}</td>
                        <td className="px-4 py-3 text-right text-emerald-600 font-semibold">
                          ${formatMoney(row.patrimonioCompra)}
                        </td>
                        <td className="px-4 py-3 text-right text-emerald-600 font-semibold">
                          ${formatMoney(row.patrimonioArriendo)}
                        </td>
                        <td className={`px-4 py-3 text-right font-bold ${diff > 0 ? "text-emerald-600" : "text-emerald-600"}`}>
                          {diff > 0 ? "+" : ""}{formatMoney(diff)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Información importante */}
      <div className="max-w-4xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center text-base">⚠️</span>
            Consideraciones importantes
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>Esta calculadora es una <strong>guía financiera</strong>. La decisión de comprar o arrendar también depende de factores como estabilidad laboral, planes familiares y preferencias personales.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>La <strong>valorización no está garantizada</strong>. El mercado inmobiliario puede tener períodos de estancamiento o incluso pérdida de valor.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>Los <strong>rendimientos de inversión</strong> son estimados y pueden variar significativamente según el tipo de inversión y las condiciones del mercado.</span>
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
