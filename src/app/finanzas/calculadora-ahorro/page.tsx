"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";

const faqs = [
  {
    question: "¿Cuánto debería tener en mi fondo de emergencia?",
    answer:
      "Se recomienda tener entre 3 y 6 meses de gastos mensuales. Si tienes un trabajo estable, 3 meses puede ser suficiente. Si eres independiente o tienes ingresos variables, apunta a 6 meses o más.",
  },
  {
    question: "¿Es mejor ahorrar en cuenta de ahorros o CDT?",
    answer:
      "Depende de cuándo necesites el dinero. La cuenta de ahorros te da liquidez inmediata pero menor rentabilidad (3-4% anual). Un CDT ofrece mejor tasa (10-12% anual) pero no puedes retirar hasta el vencimiento.",
  },
  {
    question: "¿Cuánto debería ahorrar de mi salario?",
    answer:
      "La regla general es ahorrar mínimo el 20% de tu ingreso neto. Si apenas empiezas, comienza con 10% y ve aumentando. Lo importante es crear el hábito de ahorrar algo cada mes.",
  },
  {
    question: "¿Cómo puedo ahorrar si no me alcanza el dinero?",
    answer:
      "Empieza con montos pequeños (incluso $20.000 mensuales). Revisa tus gastos y elimina suscripciones que no uses. Automatiza la transferencia apenas recibas tu salario. El hábito importa más que el monto.",
  },
];

interface ResultadoAhorro {
  ahorroMensualRequerido: number;
  ahorroSemanalRequerido: number;
  totalAportado: number;
  interesesGanados: number;
  metaAlcanzable: boolean;
  mesesRequeridos: number | null;
  evolucion: {
    mes: number;
    ahorrado: number;
    intereses: number;
    total: number;
  }[];
}

export default function CalculadoraAhorro() {
  const { moneda } = useCurrency();
  const [meta, setMeta] = useState<string>("");
  const [plazoMeses, setPlazoMeses] = useState<string>("");
  const [ahorroActual, setAhorroActual] = useState<string>("");
  const [tasaAnual, setTasaAnual] = useState<string>("");
  const [tipoCalculo, setTipoCalculo] = useState<"meta" | "tiempo">("meta");
  const [ahorroMensual, setAhorroMensual] = useState<string>("");
  const [resultado, setResultado] = useState<ResultadoAhorro | null>(null);

  const calcular = () => {
    const metaNum = parseFloat(meta) || 0;
    const plazoNum = parseFloat(plazoMeses) || 0;
    const actualNum = parseFloat(ahorroActual) || 0;
    const tasaMensual = (parseFloat(tasaAnual) || 0) / 100 / 12;
    const ahorroMensualNum = parseFloat(ahorroMensual) || 0;

    if (tipoCalculo === "meta") {
      // Calcular cuánto ahorrar mensualmente para alcanzar la meta
      if (metaNum <= 0 || plazoNum <= 0) return;

      const montoFaltante = metaNum - actualNum;
      if (montoFaltante <= 0) {
        setResultado({
          ahorroMensualRequerido: 0,
          ahorroSemanalRequerido: 0,
          totalAportado: 0,
          interesesGanados: 0,
          metaAlcanzable: true,
          mesesRequeridos: 0,
          evolucion: [],
        });
        return;
      }

      let ahorroRequerido: number;
      if (tasaMensual > 0) {
        // Con interés: PMT = FV * r / [(1+r)^n - 1]
        // Pero debemos restar el valor futuro del ahorro actual
        const valorFuturoActual = actualNum * Math.pow(1 + tasaMensual, plazoNum);
        const montoFaltanteFuturo = metaNum - valorFuturoActual;
        if (montoFaltanteFuturo <= 0) {
          ahorroRequerido = 0;
        } else {
          ahorroRequerido = montoFaltanteFuturo * tasaMensual / (Math.pow(1 + tasaMensual, plazoNum) - 1);
        }
      } else {
        // Sin interés: simple división
        ahorroRequerido = montoFaltante / plazoNum;
      }

      // Calcular evolución
      const evolucion: ResultadoAhorro["evolucion"] = [];
      let saldoAcumulado = actualNum;
      let totalAportado = actualNum;
      let interesesAcumulados = 0;

      for (let mes = 1; mes <= plazoNum; mes++) {
        const interesMes = saldoAcumulado * tasaMensual;
        saldoAcumulado += interesMes + ahorroRequerido;
        totalAportado += ahorroRequerido;
        interesesAcumulados += interesMes;

        if (mes <= 12 || mes % 6 === 0 || mes === plazoNum) {
          evolucion.push({
            mes,
            ahorrado: totalAportado,
            intereses: interesesAcumulados,
            total: saldoAcumulado,
          });
        }
      }

      setResultado({
        ahorroMensualRequerido: Math.max(0, ahorroRequerido),
        ahorroSemanalRequerido: Math.max(0, ahorroRequerido / 4.33),
        totalAportado: totalAportado,
        interesesGanados: interesesAcumulados,
        metaAlcanzable: ahorroRequerido >= 0,
        mesesRequeridos: null,
        evolucion,
      });
    } else {
      // Calcular cuánto tiempo tomará alcanzar la meta
      if (metaNum <= 0 || ahorroMensualNum <= 0) return;

      const montoFaltante = metaNum - actualNum;
      if (montoFaltante <= 0) {
        setResultado({
          ahorroMensualRequerido: ahorroMensualNum,
          ahorroSemanalRequerido: ahorroMensualNum / 4.33,
          totalAportado: 0,
          interesesGanados: 0,
          metaAlcanzable: true,
          mesesRequeridos: 0,
          evolucion: [],
        });
        return;
      }

      let meses: number;
      if (tasaMensual > 0) {
        // n = log((FV*r + PMT) / (PV*r + PMT)) / log(1+r)
        const numerador = Math.log((metaNum * tasaMensual + ahorroMensualNum) / (actualNum * tasaMensual + ahorroMensualNum));
        meses = Math.ceil(numerador / Math.log(1 + tasaMensual));
      } else {
        meses = Math.ceil(montoFaltante / ahorroMensualNum);
      }

      // Calcular evolución
      const evolucion: ResultadoAhorro["evolucion"] = [];
      let saldoAcumulado = actualNum;
      let totalAportado = actualNum;
      let interesesAcumulados = 0;

      for (let mes = 1; mes <= meses; mes++) {
        const interesMes = saldoAcumulado * tasaMensual;
        saldoAcumulado += interesMes + ahorroMensualNum;
        totalAportado += ahorroMensualNum;
        interesesAcumulados += interesMes;

        if (mes <= 12 || mes % 6 === 0 || mes === meses) {
          evolucion.push({
            mes,
            ahorrado: totalAportado,
            intereses: interesesAcumulados,
            total: saldoAcumulado,
          });
        }
      }

      setResultado({
        ahorroMensualRequerido: ahorroMensualNum,
        ahorroSemanalRequerido: ahorroMensualNum / 4.33,
        totalAportado,
        interesesGanados: interesesAcumulados,
        metaAlcanzable: true,
        mesesRequeridos: meses,
        evolucion,
      });
    }
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatMeses = (meses: number): string => {
    const años = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    if (años === 0) return `${meses} meses`;
    if (mesesRestantes === 0) return `${años} ${años === 1 ? "año" : "años"}`;
    return `${años} ${años === 1 ? "año" : "años"} y ${mesesRestantes} ${mesesRestantes === 1 ? "mes" : "meses"}`;
  };

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-blue-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">🎯</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Ahorro
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Planifica cómo alcanzar tus metas de ahorro
          </p>
        </div>

        <div className="space-y-6">
          {/* Tipo de cálculo */}
          <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTipoCalculo("meta")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                tipoCalculo === "meta"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              ¿Cuánto ahorrar?
            </button>
            <button
              onClick={() => setTipoCalculo("tiempo")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                tipoCalculo === "tiempo"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              ¿Cuánto tiempo?
            </button>
          </div>

          {/* Meta de ahorro */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿Cuál es tu meta de ahorro?
              </label>
              <CurrencySelector colorClass="blue" />
            </div>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
              <input
                type="number"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                placeholder="10.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Ej: vacaciones, cuota inicial carro, fondo de emergencia
            </p>
          </div>

          {/* Ahorro actual */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuánto tienes ahorrado actualmente? (opcional)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
              <input
                type="number"
                value={ahorroActual}
                onChange={(e) => setAhorroActual(e.target.value)}
                placeholder="0"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          </div>

          {tipoCalculo === "meta" ? (
            /* Plazo en meses */
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿En cuántos meses quieres lograrlo?
              </label>
              <input
                type="number"
                value={plazoMeses}
                onChange={(e) => setPlazoMeses(e.target.value)}
                placeholder="24"
                className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
              />
              <div className="flex gap-2 flex-wrap">
                {[6, 12, 24, 36, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPlazoMeses(m.toString())}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      plazoMeses === m.toString()
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {m} meses
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Ahorro mensual */
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿Cuánto puedes ahorrar al mes?
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{moneda.simbolo}</span>
                <input
                  type="number"
                  value={ahorroMensual}
                  onChange={(e) => setAhorroMensual(e.target.value)}
                  placeholder="500.000"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
                />
              </div>
            </div>
          )}

          {/* Tasa de interés */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tasa de interés anual (opcional)
            </label>
            <div className="relative">
              <input
                type="number"
                value={tasaAnual}
                onChange={(e) => setTasaAnual(e.target.value)}
                placeholder="0"
                step="0.1"
                className="w-full px-6 py-4 rounded-2xl text-lg font-semibold pr-12"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Si guardas en cuenta de ahorros (~3-4%) o CDT (~10-12%)
            </p>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.99]"
          >
            Calcular plan de ahorro
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              {resultado.mesesRequeridos === 0 || resultado.ahorroMensualRequerido === 0 ? (
                <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl ring-1 ring-emerald-100 dark:ring-emerald-900 text-center">
                  <p className="text-4xl mb-2">🎉</p>
                  <p className="text-xl font-bold text-emerald-600">¡Ya alcanzaste tu meta!</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Tu ahorro actual ya cubre el objetivo.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-3xl ring-1 ring-blue-100 dark:ring-blue-900">
                    {tipoCalculo === "meta" ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Necesitas ahorrar
                        </p>
                        <p className="text-4xl font-black text-blue-600">
                          {moneda.simbolo}{formatMoney(resultado.ahorroMensualRequerido)}
                          <span className="text-lg font-bold text-blue-400">/mes</span>
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                          ≈ {moneda.simbolo}{formatMoney(resultado.ahorroSemanalRequerido)} por semana
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Alcanzarás tu meta en
                        </p>
                        <p className="text-4xl font-black text-blue-600">
                          {formatMeses(resultado.mesesRequeridos!)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Desglose */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                      <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                        {moneda.simbolo}{formatMoney(resultado.totalAportado)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">total aportado</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-center">
                      <p className="text-2xl font-black text-emerald-600">
                        +{moneda.simbolo}{formatMoney(resultado.interesesGanados)}
                      </p>
                      <p className="text-xs text-emerald-500 mt-1">intereses ganados</p>
                    </div>
                  </div>

                  {/* Evolución */}
                  {resultado.evolucion.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-700 dark:text-slate-300">
                        Proyección de tu ahorro
                      </h3>
                      <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                              <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Mes</th>
                              <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Aportado</th>
                              <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Intereses</th>
                              <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {resultado.evolucion.map((row) => (
                              <tr key={row.mes} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">{row.mes}</td>
                                <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                                  {moneda.simbolo}{formatMoney(row.ahorrado)}
                                </td>
                                <td className="px-4 py-3 text-right text-emerald-600">
                                  {moneda.simbolo}{formatMoney(row.intereses)}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-blue-600">
                                  {moneda.simbolo}{formatMoney(row.total)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-base">💡</span>
            Consejos para ahorrar
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-blue-500">•</span>
              <span><strong>Págate primero:</strong> Transfiere a tu cuenta de ahorros apenas recibas el salario, no lo que sobre al final del mes.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">•</span>
              <span><strong>Automatiza:</strong> Programa transferencias automáticas para que ahorrar sea un hábito.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">•</span>
              <span><strong>Cuenta separada:</strong> Usa una cuenta diferente para tus ahorros, así evitas la tentación de gastarlos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">•</span>
              <span><strong>CDT:</strong> Si no necesitas el dinero pronto, un CDT te da mejor rentabilidad que una cuenta de ahorros normal.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="blue" />
        </div>
      </div>
    </div>
  );
}
