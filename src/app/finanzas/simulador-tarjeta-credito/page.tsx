"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { CreditCardPayoffChart } from "@/components/charts/CreditCardPayoffChart";
import { Icon } from "@/lib/icons";
import { CurrencyInput } from "@/components/CurrencyInput";

interface SimulacionResultado {
  pagoMinimo: {
    meses: number;
    totalPagado: number;
    interesesPagados: number;
    evolucion: { mes: number; saldo: number; pago: number; interes: number }[];
  };
  cuotaFija: {
    meses: number;
    totalPagado: number;
    interesesPagados: number;
    evolucion: { mes: number; saldo: number; pago: number; interes: number }[];
  };
  ahorro: number;
  mesesAhorrados: number;
}

export default function SimuladorTarjetaCredito() {
  const [saldo, setSaldo] = useState<string>("5000000");
  const [tasaEA, setTasaEA] = useState<string>("28");
  const [porcentajeMinimo, setPorcentajeMinimo] = useState<string>("3");
  const [cuotaFijaInput, setCuotaFijaInput] = useState<string>("");

  const resultado = useMemo((): SimulacionResultado | null => {
    const saldoNum = parseFloat(saldo);
    const tasaNum = parseFloat(tasaEA);
    const minPorcentaje = parseFloat(porcentajeMinimo) / 100;

    if (isNaN(saldoNum) || isNaN(tasaNum) || saldoNum <= 0 || tasaNum <= 0) return null;

    // Tasa mensual desde EA: (1 + EA)^(1/12) - 1
    const tasaMensual = Math.pow(1 + tasaNum / 100, 1 / 12) - 1;

    // Simular pago mínimo
    const simularPagoMinimo = () => {
      let saldoActual = saldoNum;
      let totalPagado = 0;
      const evolucion: { mes: number; saldo: number; pago: number; interes: number }[] = [];
      let mes = 0;
      const maxMeses = 360; // Máximo 30 años

      while (saldoActual > 100 && mes < maxMeses) {
        mes++;
        const interes = saldoActual * tasaMensual;
        const pagoMinimo = Math.max(saldoActual * minPorcentaje, 50000); // Mínimo $50,000
        const pago = Math.min(pagoMinimo, saldoActual + interes);
        const abonoCapital = pago - interes;
        saldoActual = Math.max(0, saldoActual - abonoCapital);
        totalPagado += pago;
        evolucion.push({ mes, saldo: saldoActual, pago, interes });
      }

      return {
        meses: mes,
        totalPagado,
        interesesPagados: totalPagado - saldoNum,
        evolucion,
      };
    };

    // Calcular cuota fija sugerida (pagar en 12 meses)
    const cuotaFijaSugerida = cuotaFijaInput
      ? parseFloat(cuotaFijaInput)
      : saldoNum * (tasaMensual * Math.pow(1 + tasaMensual, 12)) / (Math.pow(1 + tasaMensual, 12) - 1);

    // Simular cuota fija
    const simularCuotaFija = () => {
      if (cuotaFijaSugerida <= saldoNum * tasaMensual) {
        // La cuota no cubre ni los intereses
        return {
          meses: 999,
          totalPagado: 0,
          interesesPagados: 0,
          evolucion: [],
        };
      }

      let saldoActual = saldoNum;
      let totalPagado = 0;
      const evolucion: { mes: number; saldo: number; pago: number; interes: number }[] = [];
      let mes = 0;
      const maxMeses = 360;

      while (saldoActual > 100 && mes < maxMeses) {
        mes++;
        const interes = saldoActual * tasaMensual;
        const pago = Math.min(cuotaFijaSugerida, saldoActual + interes);
        const abonoCapital = pago - interes;
        saldoActual = Math.max(0, saldoActual - abonoCapital);
        totalPagado += pago;
        evolucion.push({ mes, saldo: saldoActual, pago, interes });
      }

      return {
        meses: mes,
        totalPagado,
        interesesPagados: totalPagado - saldoNum,
        evolucion,
      };
    };

    const pagoMinimo = simularPagoMinimo();
    const cuotaFija = simularCuotaFija();

    return {
      pagoMinimo,
      cuotaFija,
      ahorro: pagoMinimo.interesesPagados - cuotaFija.interesesPagados,
      mesesAhorrados: pagoMinimo.meses - cuotaFija.meses,
    };
  }, [saldo, tasaEA, porcentajeMinimo, cuotaFijaInput]);

  // Calcular cuota fija sugerida para mostrar placeholder
  const cuotaFijaSugerida = useMemo(() => {
    const saldoNum = parseFloat(saldo) || 0;
    const tasaNum = parseFloat(tasaEA) || 28;
    const tasaMensual = Math.pow(1 + tasaNum / 100, 1 / 12) - 1;
    return saldoNum * (tasaMensual * Math.pow(1 + tasaMensual, 12)) / (Math.pow(1 + tasaMensual, 12) - 1);
  }, [saldo, tasaEA]);

  // Preparar datos para el gráfico
  const chartData = useMemo(() => {
    if (!resultado) return [];
    const maxMes = Math.max(
      resultado.pagoMinimo.evolucion.length,
      resultado.cuotaFija.evolucion.length
    );
    // Limitamos a 60 meses (5 años) para el gráfico
    const limit = Math.min(maxMes, 60);
    const data = [];
    for (let i = 0; i < limit; i++) {
      const mes = i + 1;
      data.push({
        mes,
        saldoMinimo: resultado.pagoMinimo.evolucion[i]?.saldo ?? 0,
        saldoFijo: resultado.cuotaFija.evolucion[i]?.saldo ?? 0,
      });
    }
    return data;
  }, [resultado]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const faqs = [
    {
      question: "¿Por qué es malo pagar solo el mínimo?",
      answer:
        "Pagar solo el mínimo puede tardar años en saldar la deuda. El mínimo apenas cubre los intereses, por lo que el capital casi no se reduce.",
    },
    {
      question: "¿Cuál es la tasa de usura en Colombia?",
      answer:
        "La tasa de usura para tarjetas ronda entre 28% y 32% EA. La Superfinanciera la actualiza mensualmente.",
    },
    {
      question: "¿Cómo se calcula el pago mínimo?",
      answer:
        "Generalmente es un porcentaje del saldo (2% a 5%) más los intereses del período.",
    },
    {
      question: "¿Cuánto debería pagar cada mes?",
      answer:
        "Lo ideal es pagar el total facturado. Si no es posible, una cuota fija superior al mínimo te ahorrará mucho dinero.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Préstamos",
      href: "/finanzas/calculadora-prestamos",
      description: "Calcula cuotas y amortización",
      icon: "landmark",
    },
    {
      name: "Interés Compuesto",
      href: "/finanzas/calculadora-interes-compuesto",
      description: "Simula el crecimiento de tu dinero",
      icon: "trending-up",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-xl shadow-teal-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="credit-card" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Simulador de Tarjeta de Crédito
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Compara pago mínimo vs cuota fija
          </p>
        </div>

        <div className="space-y-6">
          {/* Saldo actual */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Saldo actual de la tarjeta
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <CurrencyInput
                value={saldo}
                onChange={(v) => setSaldo(v)}
                locale="es-CO"
                placeholder="5000000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
          </div>

          {/* Tasa y porcentaje mínimo en grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Tasa de interés (EA)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={tasaEA}
                  onChange={(e) => setTasaEA(e.target.value)}
                  placeholder="28"
                  step="0.1"
                  className="w-full px-5 py-4 rounded-2xl text-lg font-semibold pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Pago mínimo
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={porcentajeMinimo}
                  onChange={(e) => setPorcentajeMinimo(e.target.value)}
                  placeholder="3"
                  step="0.5"
                  className="w-full px-5 py-4 rounded-2xl text-lg font-semibold pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Cuota fija personalizada */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Cuota fija mensual (opcional)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <CurrencyInput
                value={cuotaFijaInput}
                onChange={(v) => setCuotaFijaInput(v)}
                locale="es-CO"
                placeholder={formatMoney(cuotaFijaSugerida)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Sugerido para pagar en 12 meses: ${formatMoney(cuotaFijaSugerida)}
            </p>
          </div>

          {/* Resultados */}
          {resultado && resultado.cuotaFija.meses < 999 && (
            <div className="mt-8 space-y-6 animate-result-appear">
              {/* Comparación lado a lado */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Pago mínimo */}
                <div className="p-4 sm:p-6 bg-red-50 dark:bg-red-950/30 rounded-2xl border-2 border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="trending-down" className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-red-700 dark:text-red-300">Pago mínimo</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Meses para pagar</p>
                      <p className="text-xl sm:text-2xl font-black text-red-600">{resultado.pagoMinimo.meses}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Total a pagar</p>
                      <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">
                        ${formatMoney(resultado.pagoMinimo.totalPagado)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Solo en intereses</p>
                      <p className="text-base sm:text-lg font-bold text-red-600">
                        ${formatMoney(resultado.pagoMinimo.interesesPagados)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cuota fija */}
                <div className="p-4 sm:p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="trending-up" className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-emerald-700 dark:text-emerald-300">Cuota fija</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Meses para pagar</p>
                      <p className="text-xl sm:text-2xl font-black text-emerald-600">{resultado.cuotaFija.meses}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Total a pagar</p>
                      <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">
                        ${formatMoney(resultado.cuotaFija.totalPagado)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Solo en intereses</p>
                      <p className="text-base sm:text-lg font-bold text-emerald-600">
                        ${formatMoney(resultado.cuotaFija.interesesPagados)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ahorro destacado */}
              <div className="p-6 bg-teal-50 dark:bg-teal-950/50 rounded-3xl text-center ring-1 ring-teal-100 dark:ring-teal-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">
                  Tu ahorro con cuota fija
                </p>
                <p className="text-4xl font-black text-teal-600 dark:text-teal-400 mb-2">
                  ${formatMoney(resultado.ahorro)}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  y <strong>{resultado.mesesAhorrados} meses</strong> menos de deuda
                </p>
              </div>

              {/* Gráfico */}
              {chartData.length > 0 && (
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">
                    Evolución del saldo
                  </h3>
                  <CreditCardPayoffChart data={chartData} />
                </div>
              )}

              <ShareButtons
                title="Simulador de Tarjeta de Crédito"
                text={`Descubrí que pagando cuota fija en mi tarjeta ahorro $${formatMoney(resultado.ahorro)} en intereses`}
                result={{
                  label: "Ahorro en intereses",
                  value: `$${formatMoney(resultado.ahorro)}`,
                }}
              />
            </div>
          )}

          {/* Advertencia si cuota no alcanza */}
          {resultado && resultado.cuotaFija.meses >= 999 && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-2xl border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-700 dark:text-amber-300 font-medium flex items-center gap-2">
                <Icon name="warning" className="w-5 h-5" />
                La cuota fija ingresada no es suficiente para cubrir los intereses. Aumenta el valor.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Consejos */}
      <div className="max-w-3xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
          </span>
          Consejos para salir de deudas de tarjeta
        </h2>
        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Nunca pagues solo el mínimo:</strong> Es la forma más cara y lenta de pagar. Los intereses se acumulan exponencialmente.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Considera compra de cartera:</strong> Algunos bancos ofrecen tasas más bajas para consolidar deudas de tarjetas.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Método avalancha:</strong> Paga primero la deuda con mayor tasa de interés mientras pagas mínimos en las demás.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Evita nuevas compras:</strong> Mientras pagas la deuda, no uses la tarjeta para compras adicionales.</span>
          </li>
        </ul>
      </div>

      <div className="max-w-3xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="teal" />
      </div>

      <div className="max-w-3xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
