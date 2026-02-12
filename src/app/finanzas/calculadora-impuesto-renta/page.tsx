"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { CalculatorResult } from "@/components/CalculatorResult";
import { ShareButtons } from "@/components/ShareButtons";
import { Icon } from "@/lib/icons";
import { calcularImpuestoRenta, type ImpuestoRentaOutput, type TipoTrabajador } from "@/lib/calculadoras";
import { UVT_2025, TABLA_TARIFAS_RENTA } from "@/lib/calculadoras/constantes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useUrlState } from "@/hooks/useUrlState";

const TABLA_TARIFAS = TABLA_TARIFAS_RENTA;

const faqs = [
  {
    question: "¿Quiénes deben declarar renta en Colombia?",
    answer:
      "Deben declarar renta las personas naturales cuyos ingresos brutos en el año gravable hayan sido iguales o superiores a 1.400 UVT (aproximadamente $69,7 millones en 2025), o que tengan un patrimonio bruto superior a 4.500 UVT al 31 de diciembre.",
  },
  {
    question: "¿Qué es el UVT y para qué sirve?",
    answer:
      "La Unidad de Valor Tributario (UVT) es una medida de valor que permite ajustar automáticamente los valores en las normas tributarias. Para 2025, el UVT es de $49.799. Se actualiza cada año según la inflación.",
  },
  {
    question: "¿Qué deducciones puedo aplicar?",
    answer:
      "Puedes deducir aportes a salud y pensión, intereses de vivienda, dependientes (hasta 10% de ingresos), medicina prepagada, y el 25% de renta exenta laboral. El total de deducciones no puede superar el 40% de tus ingresos ni 5.040 UVT.",
  },
  {
    question: "¿Cuándo debo pagar el impuesto de renta?",
    answer:
      "Las personas naturales declaran y pagan entre agosto y octubre del año siguiente, según los dos últimos dígitos del NIT. Por ejemplo, para ingresos de 2024, se declara en 2025.",
  },
];

export default function CalculadoraImpuestoRenta() {
  const { values, setField, hadInitialParams } = useUrlState(
    { ingresos: "", tipoTrabajador: "empleado", dependientes: "0", interesesVivienda: "", medicinaPrepagada: "", aportesVoluntarios: "" },
    { paramNames: { tipoTrabajador: "trabajador", interesesVivienda: "vivienda", medicinaPrepagada: "medicina", aportesVoluntarios: "voluntarios" } }
  );
  const [resultado, setResultado] = useState<ImpuestoRentaOutput | null>(null);

  const calcular = () => {
    const res = calcularImpuestoRenta({
      ingresos: parseFloat(values.ingresos) || 0,
      tipoTrabajador: values.tipoTrabajador as TipoTrabajador,
      dependientes: parseInt(values.dependientes) || 0,
      interesesVivienda: parseFloat(values.interesesVivienda) || 0,
      medicinaPrepagada: parseFloat(values.medicinaPrepagada) || 0,
      aportesVoluntarios: parseFloat(values.aportesVoluntarios) || 0,
    });
    if (res) setResultado(res);
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hadInitialParams]);

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
        className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <Icon name="landmark" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Impuesto de Renta
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Estima tu impuesto de renta en Colombia para el año 2025
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            UVT 2025: ${formatMoney(UVT_2025)}
          </p>
        </div>

        <div className="space-y-6">
          {/* Tipo de trabajador */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tipo de trabajador
            </label>
            <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setField("tipoTrabajador", "empleado")}
                className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                  values.tipoTrabajador === "empleado"
                    ? "bg-teal-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                Empleado
              </button>
              <button
                onClick={() => setField("tipoTrabajador", "independiente")}
                className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                  values.tipoTrabajador === "independiente"
                    ? "bg-teal-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                Independiente
              </button>
            </div>
          </div>

          {/* Ingresos anuales */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Ingresos brutos anuales
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <CurrencyInput
                value={values.ingresos}
                onChange={(v) => setField("ingresos", v)}
                locale="es-CO"
                placeholder="60.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Suma de todos tus ingresos del año (salarios, honorarios, etc.)
            </p>
          </div>

          {/* Dependientes */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Número de dependientes económicos
            </label>
            <select
              value={values.dependientes}
              onChange={(e) => setField("dependientes", e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            >
              <option value="0">Sin dependientes</option>
              <option value="1">1 dependiente</option>
              <option value="2">2 dependientes</option>
              <option value="3">3 dependientes</option>
              <option value="4">4 o más dependientes</option>
            </select>
            <p className="text-xs text-slate-400 ml-1">
              Hijos menores, personas con discapacidad o mayores de 62 años a cargo
            </p>
          </div>

          {/* Deducciones opcionales */}
          <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Deducciones adicionales (opcional)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Intereses de vivienda (anual)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <CurrencyInput
                    value={values.interesesVivienda}
                    onChange={(v) => setField("interesesVivienda", v)}
                    locale="es-CO"
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Medicina prepagada (anual)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <CurrencyInput
                    value={values.medicinaPrepagada}
                    onChange={(v) => setField("medicinaPrepagada", v)}
                    locale="es-CO"
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Aportes voluntarios AFC/FPV (anual)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <CurrencyInput
                    value={values.aportesVoluntarios}
                    onChange={(v) => setField("aportesVoluntarios", v)}
                    locale="es-CO"
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-teal-500/20 active:scale-[0.99]"
          >
            Calcular impuesto
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              <CalculatorResult
                mainValue={`$${formatMoney(resultado.impuestoRenta)}`}
                mainLabel="Impuesto de Renta Estimado"
                gradient="finanzas"
                items={[
                  {
                    label: "Renta líquida gravable",
                    value: `$${formatMoney(resultado.rentaLiquidaGravable)}`,
                  },
                  {
                    label: "Renta en UVT",
                    value: `${formatMoney(Math.round(resultado.rentaLiquidaUVT))} UVT`,
                  },
                  {
                    label: "Tarifa efectiva",
                    value: `${resultado.tarifaEfectiva.toFixed(1)}%`,
                    color: "teal",
                  },
                  {
                    label: "Tarifa marginal",
                    value: `${resultado.tarifaMarginal.toFixed(0)}%`,
                  },
                ]}
              >
                <ShareButtons
                  title="Calculadora Impuesto de Renta Colombia"
                  text={`Mi impuesto de renta estimado es $${formatMoney(resultado.impuestoRenta)} (tarifa efectiva: ${resultado.tarifaEfectiva.toFixed(1)}%)`}
                  result={{
                    label: "Impuesto de Renta",
                    value: `$${formatMoney(resultado.impuestoRenta)}`,
                  }}
                />
              </CalculatorResult>

              {/* Desglose de deducciones */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-4">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-6 h-6 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
                    <Icon name="clipboard" className="w-4 h-4" />
                  </span>
                  Desglose de deducciones
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Aporte salud</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      ${formatMoney(resultado.desglose.aporteSalud)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Aporte pensión</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      ${formatMoney(resultado.desglose.aportePension)}
                    </span>
                  </div>
                  {resultado.desglose.fondoSolidaridad > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Fondo de solidaridad</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        ${formatMoney(resultado.desglose.fondoSolidaridad)}
                      </span>
                    </div>
                  )}
                  {resultado.desglose.dependientes > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Dependientes</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        ${formatMoney(resultado.desglose.dependientes)}
                      </span>
                    </div>
                  )}
                  {resultado.desglose.interesesVivienda > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Intereses vivienda</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        ${formatMoney(resultado.desglose.interesesVivienda)}
                      </span>
                    </div>
                  )}
                  {resultado.desglose.medicinaPrepagada > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Medicina prepagada</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        ${formatMoney(resultado.desglose.medicinaPrepagada)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">25% renta exenta</span>
                    <span className="font-semibold text-emerald-600">
                      ${formatMoney(resultado.rentaExenta25)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Total deducciones</span>
                      <span className="text-emerald-600">
                        ${formatMoney(resultado.totalDeducciones)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de tarifas */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-4">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-6 h-6 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
                    <Icon name="bar-chart" className="w-4 h-4" />
                  </span>
                  Tabla de tarifas 2025
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 dark:text-slate-400">
                        <th className="pb-2">Rango (UVT)</th>
                        <th className="pb-2 text-right">Tarifa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {TABLA_TARIFAS.map((rango, i) => (
                        <tr
                          key={i}
                          className={resultado.rangoAplicable.includes(rango.desde.toString()) ? "bg-teal-50 dark:bg-teal-900/30" : ""}
                        >
                          <td className="py-2 text-slate-700 dark:text-slate-300">
                            {rango.desde.toLocaleString()} - {rango.hasta === Infinity ? "∞" : rango.hasta.toLocaleString()}
                          </td>
                          <td className="py-2 text-right font-semibold text-slate-700 dark:text-slate-300">
                            {(rango.tarifa * 100).toFixed(0)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400">
                  Tu renta líquida ({formatMoney(Math.round(resultado.rentaLiquidaUVT))} UVT) está en el rango: {resultado.rangoAplicable}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información importante */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
              <Icon name="warning" className="w-5 h-5" weight="fill" />
            </span>
            Información importante
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span>Esta es una <strong>estimación</strong>. Tu impuesto real puede variar según otros factores como rentas de capital, dividendos, o beneficios tributarios específicos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span>Consulta con un contador público para tu declaración oficial y para optimizar legalmente tus deducciones.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span>Los aportes a AFC y pensiones voluntarias son excelentes estrategias para reducir tu carga tributaria de forma legal.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <FAQ items={faqs} colorClass="teal" />
        </div>
      </div>
    </div>
  );
}
