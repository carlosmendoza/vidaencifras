"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Icon } from "@/lib/icons";
import { calcularPrestamo, type PrestamoOutput } from "@/lib/calculadoras";
import { useUrlState } from "@/hooks/useUrlState";
import { ResultWithMascot } from "@/components/ResultWithMascot";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";

export default function Prestamos() {
  const { moneda } = useCurrency();
  const { values, setField, hadInitialParams } = useUrlState(
    { monto: "", tasaAnual: "", plazoMeses: "" },
    { paramNames: { tasaAnual: "tasa", plazoMeses: "plazo" } }
  );
  const [resultado, setResultado] = useState<PrestamoOutput | null>(null);
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(false);

  const calcular = () => {
    const res = calcularPrestamo({
      monto: parseFloat(values.monto),
      tasaAnual: parseFloat(values.tasaAnual),
      plazoMeses: parseInt(values.plazoMeses),
    });
    if (res) setResultado(res);
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const plazosRapidos = [12, 24, 36, 48, 60, 72];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <CalculatorHeader title="Calculadora de Préstamos" subtitle="Calcula tu cuota mensual y amortización" icon="landmark" gradient="finanzas" />

        <div className="space-y-6">
          {/* Monto del préstamo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Monto del préstamo
              </label>
              <CurrencySelector colorClass="teal" />
            </div>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">{moneda.simbolo}</span>
              <CurrencyInput
                value={values.monto}
                onChange={(v) => setField("monto", v)}
                placeholder="100.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
          </div>

          {/* Tasa de interés */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tasa de interés anual
            </label>
            <div className="relative">
              <input
                type="number"
                value={values.tasaAnual}
                onChange={(e) => setField("tasaAnual", e.target.value)}
                placeholder="12"
                step="0.1"
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-12"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">%</span>
            </div>
          </div>

          {/* Plazo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Plazo en meses
            </label>
            <div className="relative">
              <input
                type="number"
                value={values.plazoMeses}
                onChange={(e) => setField("plazoMeses", e.target.value)}
                placeholder="36"
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-16"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">meses</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {plazosRapidos.map((p) => (
                <button
                  key={p}
                  onClick={() => setField("plazoMeses", p.toString())}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    values.plazoMeses === p.toString()
                      ? "bg-teal-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {p} meses
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.99]"
          >
            Calcular Cuota
          </button>

          {resultado && (
            <ResultWithMascot>
            <div className="mt-10 space-y-4">
              {/* Cuota mensual */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl text-center ring-1 ring-teal-100 dark:ring-teal-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">Tu cuota mensual</p>
                <p className="text-5xl font-black text-teal-600">
                  {moneda.simbolo}{formatMoney(resultado.cuotaMensual)}
                </p>
              </div>

              {/* Detalles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total a pagar</p>
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">
                    {moneda.simbolo}{formatMoney(resultado.totalPagar)}
                  </p>
                </div>
                <div className="p-5 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total intereses</p>
                  <p className="text-xl font-black text-rose-600">
                    {moneda.simbolo}{formatMoney(resultado.totalIntereses)}
                  </p>
                </div>
              </div>

              {/* Barra visual */}
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="w-3 h-3 bg-slate-400 rounded"></span>
                  <span className="text-slate-600 dark:text-slate-300">Capital: {((parseFloat(values.monto) / resultado.totalPagar) * 100).toFixed(1)}%</span>
                  <span className="w-3 h-3 bg-rose-400 rounded ml-4"></span>
                  <span className="text-slate-600 dark:text-slate-300">Intereses: {((resultado.totalIntereses / resultado.totalPagar) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-4 rounded-full overflow-hidden flex">
                  <div
                    className="bg-slate-400 h-full"
                    style={{ width: `${(parseFloat(values.monto) / resultado.totalPagar) * 100}%` }}
                  ></div>
                  <div
                    className="bg-rose-400 h-full"
                    style={{ width: `${(resultado.totalIntereses / resultado.totalPagar) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Tabla de amortización */}
              <button
                onClick={() => setMostrarTabla(!mostrarTabla)}
                className="w-full py-3 rounded-xl font-semibold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900 hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors flex items-center justify-center gap-2"
              >
                {mostrarTabla ? "Ocultar" : "Ver"} tabla de amortización
                <span className={`transition-transform ${mostrarTabla ? "rotate-180" : ""}`}>▼</span>
              </button>

              {mostrarTabla && (
                <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 max-h-80">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0">
                      <tr>
                        <th className="px-3 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Mes</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Cuota</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Capital</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Interés</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Saldo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {resultado.amortizacion.map((row) => (
                        <tr key={row.mes} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-3 py-2 font-semibold text-slate-800 dark:text-slate-100">{row.mes}</td>
                          <td className="px-3 py-2 text-right">{moneda.simbolo}{formatMoney(row.cuota)}</td>
                          <td className="px-3 py-2 text-right text-slate-600 dark:text-slate-300">{moneda.simbolo}{formatMoney(row.capital)}</td>
                          <td className="px-3 py-2 text-right text-rose-600">{moneda.simbolo}{formatMoney(row.interes)}</td>
                          <td className="px-3 py-2 text-right font-semibold">{moneda.simbolo}{formatMoney(row.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Contenido educativo SEO */}
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ¿Cómo funciona un préstamo? */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            ¿Cómo se calcula la cuota de un préstamo?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              La cuota mensual de un préstamo con <strong className="text-slate-700 dark:text-slate-300">cuota fija (sistema francés)</strong> se calcula con una fórmula matemática que garantiza que todas las cuotas sean iguales durante la vida del crédito:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-mono text-center text-slate-700 dark:text-slate-300 text-xs">
              Cuota = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]
            </div>
            <div className="space-y-2 text-xs">
              <p>Donde:</p>
              <ul className="space-y-1 ml-4">
                <li><strong className="text-slate-700 dark:text-slate-300">P</strong> = Monto del préstamo (capital)</li>
                <li><strong className="text-slate-700 dark:text-slate-300">r</strong> = Tasa de interés mensual (tasa anual ÷ 12 ÷ 100)</li>
                <li><strong className="text-slate-700 dark:text-slate-300">n</strong> = Número total de cuotas (plazo en meses)</li>
              </ul>
            </div>
            <p>
              Cada cuota se compone de dos partes: <strong className="text-slate-700 dark:text-slate-300">capital</strong> (que reduce tu deuda) e <strong className="text-slate-700 dark:text-slate-300">intereses</strong> (el costo del dinero). Al inicio del préstamo pagas más intereses y menos capital, pero esta proporción se invierte gradualmente.
            </p>
          </div>
        </div>

        {/* Sistemas de amortización */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="list" className="w-5 h-5" weight="fill" />
            </span>
            Sistemas de amortización: francés vs. alemán
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Existen diferentes formas de pagar un préstamo. Los dos más comunes en Colombia son:
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Sistema francés (cuota fija)</p>
                <p className="text-xs leading-relaxed">Es el más utilizado por bancos en Colombia. Todas las cuotas son iguales durante la vida del crédito, lo que facilita la planificación del presupuesto. Al inicio se pagan más intereses; al final, más capital. Es el sistema que usa esta calculadora.</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Sistema alemán (cuota decreciente)</p>
                <p className="text-xs leading-relaxed">El abono a capital es fijo en cada cuota, pero los intereses disminuyen porque se calculan sobre el saldo pendiente. Las primeras cuotas son más altas, pero el total de intereses pagados es menor. Algunos bancos colombianos lo ofrecen para créditos hipotecarios.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cómo reducir intereses */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="bar-chart" className="w-5 h-5" weight="fill" />
            </span>
            5 estrategias para pagar menos intereses
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-teal-500 font-bold mt-0.5">1.</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Elige el plazo más corto que puedas pagar:</strong> un préstamo de $10.000.000 al 18% anual genera $3.156.000 en intereses a 36 meses, pero $5.561.000 a 60 meses. Casi el doble por solo 2 años más.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 font-bold mt-0.5">2.</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Haz abonos extraordinarios al capital:</strong> la mayoría de bancos en Colombia permiten abonos extra sin penalización. Incluso $100.000 adicionales al mes pueden reducir significativamente el plazo y los intereses totales.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 font-bold mt-0.5">3.</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Compara tasas antes de firmar:</strong> una diferencia de 2 puntos porcentuales en la tasa puede significar millones de pesos en un crédito a largo plazo. Cotiza en al menos 3 entidades.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 font-bold mt-0.5">4.</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Negocia la tasa:</strong> si tienes buen historial crediticio, puedes negociar una tasa más baja. Los bancos prefieren un cliente seguro con menor tasa que perder el negocio.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 font-bold mt-0.5">5.</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Considera la compra de cartera:</strong> si ya tienes un préstamo con tasa alta, otro banco puede comprarte la deuda a una tasa menor. Esto te ahorra intereses futuros.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tasas de interés en Colombia */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="info" className="w-5 h-5" weight="fill" />
            </span>
            Tasas de interés de referencia en Colombia
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Las tasas de interés que cobran los bancos en Colombia dependen del tipo de crédito y del perfil del solicitante. Estos son los rangos típicos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Crédito de libre inversión</p>
                <p className="text-xs">12% - 28% EA</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Crédito de vivienda (VIS)</p>
                <p className="text-xs">9% - 14% EA</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Crédito de vehículo</p>
                <p className="text-xs">10% - 22% EA</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Tarjeta de crédito</p>
                <p className="text-xs">24% - 28% EA (cercano a usura)</p>
              </div>
            </div>
            <p>
              La <strong className="text-slate-700 dark:text-slate-300">tasa de usura</strong> es el límite máximo legal que pueden cobrar las entidades financieras en Colombia. Es certificada trimestralmente por la Superfinanciera. Cualquier tasa superior se considera usura y es un delito penal.
            </p>
          </div>
        </div>

        {/* Qué revisar antes de tomar un préstamo */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center text-amber-600">
              <Icon name="warning" className="w-5 h-5" weight="fill" />
            </span>
            Antes de pedir un préstamo: qué debes revisar
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Tu capacidad de pago:</strong> la cuota mensual no debería superar el 30-35% de tus ingresos netos. Si la cuota consume más, estás en riesgo de sobreendeudamiento.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">El costo total del crédito:</strong> no mires solo la cuota. Revisa cuánto pagarás en total (capital + intereses). Un plazo más largo tiene cuota más baja pero cuesta mucho más en intereses.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Los seguros obligatorios:</strong> muchos préstamos incluyen seguros de vida y de deudor que aumentan la cuota. Pregunta el valor exacto antes de firmar.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Penalización por prepago:</strong> por ley en Colombia, los bancos no pueden cobrar penalización por pago anticipado en créditos de consumo ni en créditos de vivienda.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <CalculatorFooter href="/finanzas/calculadora-prestamos" />
    </div>
  );
}
