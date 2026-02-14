"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Icon } from "@/lib/icons";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";

const TRM_FALLBACK = 4187.42; // TRM aproximada feb 14, 2026

export default function CalculadoraTRM() {
  useCalculatorTracking();
  const [monto, setMonto] = useState("100");
  const [direccion, setDireccion] = useState<"usd-cop" | "cop-usd">("usd-cop");
  const [trm, setTrm] = useState<number>(TRM_FALLBACK);
  const [trmFecha, setTrmFecha] = useState<string>("");
  const [cargando, setCargando] = useState(true);
  const [errorTrm, setErrorTrm] = useState(false);

  useEffect(() => {
    const obtenerTRM = async () => {
      try {
        // API pública del Banco de la República vía datos.gov.co
        const hoy = new Date();
        const fecha = hoy.toISOString().split("T")[0];
        const res = await fetch(
          `https://www.datos.gov.co/resource/32sa-8pi3.json?$where=vigenciadesde%20%3E=%20%27${fecha}%27&$limit=1&$order=vigenciadesde%20DESC`
        );
        if (!res.ok) throw new Error("Error en API");
        const data = await res.json();
        if (data.length > 0) {
          setTrm(parseFloat(data[0].valor));
          setTrmFecha(data[0].vigenciadesde.split("T")[0]);
        } else {
          // Intentar con fecha de ayer
          const ayer = new Date(hoy);
          ayer.setDate(ayer.getDate() - 1);
          const fechaAyer = ayer.toISOString().split("T")[0];
          const res2 = await fetch(
            `https://www.datos.gov.co/resource/32sa-8pi3.json?$where=vigenciadesde%20%3E=%20%27${fechaAyer}%27&$limit=1&$order=vigenciadesde%20DESC`
          );
          if (!res2.ok) throw new Error("Error en API");
          const data2 = await res2.json();
          if (data2.length > 0) {
            setTrm(parseFloat(data2[0].valor));
            setTrmFecha(data2[0].vigenciadesde.split("T")[0]);
          } else {
            setErrorTrm(true);
          }
        }
      } catch {
        setErrorTrm(true);
      } finally {
        setCargando(false);
      }
    };
    obtenerTRM();
  }, []);

  const formatCOP = useCallback((num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }, []);

  const formatUSD = useCallback((num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }, []);

  const resultado = useMemo(() => {
    const montoNum = parseFloat(monto) || 0;
    if (montoNum <= 0) return null;

    if (direccion === "usd-cop") {
      return {
        origen: `$${formatUSD(montoNum)} USD`,
        destino: `$${formatCOP(Math.round(montoNum * trm))} COP`,
        valor: montoNum * trm,
      };
    } else {
      return {
        origen: `$${formatCOP(montoNum)} COP`,
        destino: `$${formatUSD(montoNum / trm)} USD`,
        valor: montoNum / trm,
      };
    }
  }, [monto, direccion, trm, formatCOP, formatUSD]);

  const formatFecha = (fecha: string) => {
    if (!fecha) return "";
    const d = new Date(fecha + "T12:00:00");
    return d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-purple-500/5">
        <CalculatorHeader title="Calculadora TRM" subtitle="Convierte dólares a pesos colombianos con la TRM del día" icon="coins" gradient="herramientas" />

        <div className="space-y-6">
          {/* TRM actual */}
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl ring-1 ring-purple-100 dark:ring-purple-900 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              TRM {trmFecha ? `del ${formatFecha(trmFecha)}` : "actual"}
              {errorTrm && " (valor de referencia)"}
            </p>
            <p className="text-3xl font-black text-purple-600 dark:text-purple-400">
              {cargando ? "..." : `$${formatCOP(Math.round(trm))}`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              1 USD = {formatCOP(Math.round(trm))} COP
            </p>
            {errorTrm && (
              <p className="text-xs text-amber-500 mt-2">
                No se pudo obtener la TRM en tiempo real. Usando valor de referencia.
              </p>
            )}
          </div>

          {/* Dirección */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Qué quieres convertir?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setDireccion("usd-cop"); setMonto("100"); }}
                className={`px-4 py-4 rounded-2xl font-semibold transition-colors ${
                  direccion === "usd-cop"
                    ? "bg-purple-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <span className="block text-lg">USD → COP</span>
                <span className="text-xs opacity-80">Dólares a pesos</span>
              </button>
              <button
                onClick={() => { setDireccion("cop-usd"); setMonto("1000000"); }}
                className={`px-4 py-4 rounded-2xl font-semibold transition-colors ${
                  direccion === "cop-usd"
                    ? "bg-purple-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <span className="block text-lg">COP → USD</span>
                <span className="text-xs opacity-80">Pesos a dólares</span>
              </button>
            </div>
          </div>

          {/* Monto */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              {direccion === "usd-cop" ? "Monto en dólares (USD)" : "Monto en pesos (COP)"}
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <CurrencyInput
                value={monto}
                onChange={setMonto}
                locale={direccion === "usd-cop" ? "en-US" : "es-CO"}
                placeholder={direccion === "usd-cop" ? "100" : "1.000.000"}
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(direccion === "usd-cop"
                ? [50, 100, 500, 1000]
                : [1000000, 5000000, 10000000, 50000000]
              ).map((val) => (
                <button
                  key={val}
                  onClick={() => setMonto(val.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    monto === val.toString()
                      ? "bg-purple-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {direccion === "usd-cop" ? `$${val} USD` : `$${formatCOP(val)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Resultado */}
          {resultado && (
            <div className="mt-8 space-y-4">
              <div className="p-8 bg-purple-50 dark:bg-purple-950/50 rounded-3xl ring-1 ring-purple-100 dark:ring-purple-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {resultado.origen}
                  </p>
                  <p className="text-lg text-slate-400 mb-1">=</p>
                  <p className="text-4xl font-black text-purple-600 dark:text-purple-400">
                    {resultado.destino}
                  </p>
                </div>
              </div>

              {/* Tabla de referencia rápida */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  Tabla de conversión rápida
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">USD</th>
                        <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">COP</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-400">
                      {[1, 10, 50, 100, 500, 1000].map((usd) => (
                        <tr key={usd} className="border-b border-slate-100 dark:border-slate-800">
                          <td className="py-2">${usd} USD</td>
                          <td className="py-2 text-right font-semibold">${formatCOP(Math.round(usd * trm))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl space-y-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-500">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            ¿Qué es la TRM?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            La <strong>Tasa Representativa del Mercado (TRM)</strong> es el precio oficial del dólar en Colombia. La calcula y certifica la <strong>Superintendencia Financiera</strong> a partir del promedio ponderado de las operaciones de compra y venta de dólares entre bancos y casas de cambio autorizadas.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            La TRM se publica cada día hábil y aplica para el día siguiente. Es la referencia oficial para contratos, importaciones, exportaciones y cualquier operación en dólares en Colombia.
          </p>

          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">¿Quién fija la TRM?</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>No la fija el gobierno.</strong> Es el resultado de la oferta y demanda de dólares en el mercado colombiano.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>La certifica la Superfinanciera</strong> con base en operaciones reales de bancos, fiduciarias y comisionistas de bolsa.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>El Banco de la República</strong> puede intervenir comprando o vendiendo dólares para estabilizar el mercado, pero no fija la TRM directamente.</span>
            </li>
          </ul>
        </div>
      </div>

      <CalculatorFooter href="/herramientas/calculadora-trm" />
    </div>
  );
}
