"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Icon } from "@/lib/icons";

const faqs = [
  {
    question: "¿Qué es el IBC (Ingreso Base de Cotización)?",
    answer:
      "El IBC es la base sobre la cual se calculan los aportes a seguridad social. Para independientes, corresponde al 40% del valor mensual del contrato. No puede ser menor a 1 SMMLV ni mayor a 25 SMMLV.",
  },
  {
    question: "¿Cuánto debo pagar de seguridad social como independiente?",
    answer:
      "Debes pagar el 28.5% de tu IBC: 12.5% para salud y 16% para pensión. Además, dependiendo del riesgo de tu actividad, debes aportar a ARL (desde 0.522% para riesgo I).",
  },
  {
    question: "¿Cuál es la diferencia entre retención del 10% y 11%?",
    answer:
      "Si eres declarante de renta (obligado a presentar declaración), la retención es del 11%. Si no eres declarante, la retención es del 10%. Esto aplica para contratos de prestación de servicios.",
  },
  {
    question: "¿Los aportes a seguridad social son deducibles de impuestos?",
    answer:
      "Sí, los aportes obligatorios a salud y pensión son 100% deducibles en tu declaración de renta. Esto reduce tu base gravable y por ende tu impuesto.",
  },
  {
    question: "¿Qué pasa si no pago seguridad social como independiente?",
    answer:
      "El contratante está obligado a verificar que estés al día con tus aportes. Si no pagas, puede retener pagos. Además, pierdes cobertura en salud y semanas cotizadas para pensión.",
  },
];

export default function CalculadoraPrestacionServicios() {
  const [valorContrato, setValorContrato] = useState<string>("");
  const [esDeclarante, setEsDeclarante] = useState<boolean>(true);
  const [incluyeArl, setIncluyeArl] = useState<boolean>(true);
  const [nivelRiesgo, setNivelRiesgo] = useState<string>("1");

  // Constantes 2026
  const SMMLV = 1750905;
  const TOPE_IBC_MAXIMO = SMMLV * 25;

  // Tasas de ARL por nivel de riesgo
  const TASAS_ARL: Record<string, number> = {
    "1": 0.00522, // Riesgo I - 0.522%
    "2": 0.01044, // Riesgo II - 1.044%
    "3": 0.02436, // Riesgo III - 2.436%
    "4": 0.0435,  // Riesgo IV - 4.35%
    "5": 0.0696,  // Riesgo V - 6.96%
  };

  const valorNum = parseFloat(valorContrato) || 0;

  // Calcular IBC (40% del contrato, mínimo 1 SMMLV, máximo 25 SMMLV)
  const ibcCalculado = valorNum * 0.4;
  const ibc = Math.max(SMMLV, Math.min(ibcCalculado, TOPE_IBC_MAXIMO));

  // Aportes a seguridad social
  const aporteSalud = ibc * 0.125; // 12.5%
  const aportePension = ibc * 0.16; // 16%
  const tasaArl = TASAS_ARL[nivelRiesgo];
  const aporteArl = incluyeArl ? ibc * tasaArl : 0;
  const totalSeguridadSocial = aporteSalud + aportePension + aporteArl;

  // Retención en la fuente
  const tasaRetencion = esDeclarante ? 0.11 : 0.10;
  const retencion = valorNum * tasaRetencion;

  // Valor neto
  const valorNeto = valorNum - totalSeguridadSocial - retencion;

  // Porcentaje efectivo de descuentos
  const porcentajeDescuentos = valorNum > 0 ? ((totalSeguridadSocial + retencion) / valorNum) * 100 : 0;

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const tieneResultados = valorNum > 0;

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
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"><Icon name="file-text" className="w-10 h-10" /></div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora Prestación de Servicios
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula tus descuentos como independiente 2026
          </p>
        </div>

        <div className="space-y-6">
          {/* Valor del contrato */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuál es el valor mensual de tu contrato?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <CurrencyInput
                value={valorContrato}
                onChange={(v) => setValorContrato(v)}
                locale="es-CO"
                placeholder="5.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          </div>

          {/* Declarante de renta */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Eres declarante de renta?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setEsDeclarante(true)}
                className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                  esDeclarante
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                Sí (11% retención)
              </button>
              <button
                onClick={() => setEsDeclarante(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                  !esDeclarante
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                No (10% retención)
              </button>
            </div>
          </div>

          {/* ARL */}
          <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              checked={incluyeArl}
              onChange={(e) => setIncluyeArl(e.target.checked)}
              className="w-5 h-5 rounded-lg border-2 border-slate-300 text-teal-500 focus:ring-teal-500"
            />
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Incluir ARL
              </span>
              <p className="text-xs text-slate-500">
                Riesgos laborales (obligatorio para algunos contratos)
              </p>
            </div>
          </label>

          {/* Nivel de riesgo ARL */}
          {incluyeArl && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Nivel de riesgo ARL
              </label>
              <select
                value={nivelRiesgo}
                onChange={(e) => setNivelRiesgo(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl text-base font-semibold bg-white dark:bg-slate-800 border-none"
              >
                <option value="1">Riesgo I (0.522%) - Oficina, administrativo</option>
                <option value="2">Riesgo II (1.044%) - Comercio, servicios</option>
                <option value="3">Riesgo III (2.436%) - Manufactura ligera</option>
                <option value="4">Riesgo IV (4.35%) - Construcción</option>
                <option value="5">Riesgo V (6.96%) - Alto riesgo</option>
              </select>
            </div>
          )}

          {/* Resultados */}
          {tieneResultados && (
            <div className="mt-8 space-y-4">
              {/* Resultado principal */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Recibirás neto
                  </p>
                  <p className="text-4xl font-black text-teal-600">
                    ${formatMoney(valorNeto)}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                    {porcentajeDescuentos.toFixed(1)}% en descuentos
                  </p>
                </div>
              </div>

              {/* Desglose */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 ml-1">Desglose de descuentos</h3>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Valor bruto contrato</span>
                  </div>
                  <span className="font-bold text-lg text-slate-700 dark:text-slate-300">
                    ${formatMoney(valorNum)}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-3">
                  <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400">Seguridad Social</h4>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-300">IBC (40% del contrato)</span>
                      {ibcCalculado < SMMLV && (
                        <p className="text-xs text-teal-600">Ajustado al mínimo (1 SMMLV)</p>
                      )}
                    </div>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      ${formatMoney(ibc)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Salud (12.5%)</span>
                    <span className="font-semibold text-red-500">-${formatMoney(aporteSalud)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Pensión (16%)</span>
                    <span className="font-semibold text-red-500">-${formatMoney(aportePension)}</span>
                  </div>

                  {incluyeArl && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-300">ARL ({(tasaArl * 100).toFixed(3)}%)</span>
                      <span className="font-semibold text-red-500">-${formatMoney(aporteArl)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Total seguridad social</span>
                    <span className="font-bold text-red-500">-${formatMoney(totalSeguridadSocial)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                  <div>
                    <span className="font-semibold text-teal-700 dark:text-teal-300">Retención en la fuente</span>
                    <p className="text-xs text-teal-500">{esDeclarante ? "11%" : "10%"} del valor bruto</p>
                  </div>
                  <span className="font-bold text-lg text-teal-600">
                    -${formatMoney(retencion)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl ring-2 ring-teal-200 dark:ring-teal-800">
                  <div>
                    <span className="font-semibold text-teal-700 dark:text-teal-300">Valor neto a recibir</span>
                  </div>
                  <span className="font-bold text-xl text-teal-600">
                    ${formatMoney(valorNeto)}
                  </span>
                </div>
              </div>

              {/* Notas */}
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-2xl text-sm text-teal-700 dark:text-teal-300">
                <span className="inline-flex items-center gap-1 text-teal-600"><Icon name="lightbulb" className="w-5 h-5" weight="fill" /> <strong>Recuerda:</strong></span> La retención en la fuente es un anticipo de impuestos que puedes descontar en tu declaración de renta. Los aportes a seguridad social son deducibles al 100%.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600"><Icon name="lightbulb" className="w-5 h-5" weight="fill" /></span>
            Sobre prestación de servicios
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>IBC:</strong> Es el 40% de tus ingresos mensuales. Se usa para calcular tus aportes a seguridad social.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Salud:</strong> 12.5% del IBC. Da derecho a EPS para ti y tu familia.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Pensión:</strong> 16% del IBC. Acumula semanas para tu jubilación.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>ARL:</strong> Protección por accidentes laborales. Obligatoria en muchos contratos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Retención:</strong> Es un anticipo de impuestos, no un descuento definitivo.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tabla de referencia */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600"><Icon name="bar-chart" className="w-5 h-5" weight="fill" /></span>
            Valores de referencia 2026
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-slate-500 dark:text-slate-400">SMMLV</p>
              <p className="font-bold text-slate-800 dark:text-slate-100">${formatMoney(SMMLV)}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-slate-500 dark:text-slate-400">IBC Mínimo</p>
              <p className="font-bold text-slate-800 dark:text-slate-100">${formatMoney(SMMLV)}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-slate-500 dark:text-slate-400">IBC Máximo</p>
              <p className="font-bold text-slate-800 dark:text-slate-100">${formatMoney(TOPE_IBC_MAXIMO)}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-slate-500 dark:text-slate-400">Total Salud + Pensión</p>
              <p className="font-bold text-slate-800 dark:text-slate-100">28.5% del IBC</p>
            </div>
          </div>
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
