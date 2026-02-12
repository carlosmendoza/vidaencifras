"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/lib/icons";
import { calcularCesantias } from "@/lib/calculadoras";
import { AUXILIO_TRANSPORTE, SMMLV, TOPE_AUXILIO } from "@/lib/calculadoras/constantes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useUrlState } from "@/hooks/useUrlState";

const faqs = [
  {
    question: "¿Qué son las cesantías?",
    answer:
      "Las cesantías son una prestación social que equivale a un mes de salario por cada año trabajado. Se llaman así porque originalmente servían para cuando el trabajador quedaba cesante (sin empleo). Hoy se pueden usar para vivienda, educación o al terminar el contrato.",
  },
  {
    question: "¿Cuándo se consignan las cesantías?",
    answer:
      "El empleador debe consignar las cesantías al fondo antes del 14 de febrero de cada año. Las cesantías corresponden al año anterior (enero a diciembre). Si no consigna a tiempo, debe pagar un día de salario por cada día de mora.",
  },
  {
    question: "¿Puedo retirar mis cesantías antes de renunciar?",
    answer:
      "Sí, puedes hacer retiros parciales para: compra de vivienda, remodelación de vivienda propia, pago de créditos hipotecarios, o educación propia o de tu familia (cónyuge, hijos). Necesitas autorización del empleador y documentos que soporten el uso.",
  },
  {
    question: "¿Qué son los intereses sobre cesantías?",
    answer:
      "Son un pago adicional del 12% anual sobre las cesantías acumuladas. El empleador debe pagarlos directamente al trabajador (no al fondo) antes del 31 de enero de cada año. Si trabajaste menos de un año, se calculan proporcionalmente.",
  },
];

export default function CalculadoraCesantias() {
  const { values, setField } = useUrlState(
    { salario: "", incluyeTransporte: "true", fechaIngreso: "", fechaCorte: "" },
    { paramNames: { incluyeTransporte: "transporte", fechaIngreso: "ingreso", fechaCorte: "corte" } }
  );
  const [mostrarIntereses, setMostrarIntereses] = useState<boolean>(true);

  const salarioNum = parseFloat(values.salario) || 0;

  const resultado = salarioNum > 0 ? calcularCesantias({
    salario: salarioNum,
    incluyeTransporte: values.incluyeTransporte === "true",
    fechaIngreso: values.fechaIngreso || undefined,
    fechaCorte: values.fechaCorte || undefined,
  }) : null;

  const aplicaAuxilio = resultado?.aplicaAuxilio ?? false;
  const salarioBase = resultado?.salarioBase ?? salarioNum;
  const diasTrabajados = resultado?.diasTrabajados ?? 360;
  const cesantias = resultado?.cesantias ?? 0;
  const interesesCesantias = resultado?.interesesCesantias ?? 0;

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
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"><Icon name="briefcase" className="w-10 h-10" /></div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Cesantías
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula tus cesantías e intereses 2026
          </p>
        </div>

        <div className="space-y-6">
          {/* Salario */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuál es tu salario mensual?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <CurrencyInput
                value={values.salario}
                onChange={(v) => setField("salario", v)}
                locale="es-CO"
                placeholder="1.300.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[1300000, 2000000, 3000000, 5000000].map((s) => (
                <button
                  key={s}
                  onClick={() => setField("salario", s.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    values.salario === s.toString()
                      ? "bg-teal-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  ${formatMoney(s)}
                </button>
              ))}
            </div>
          </div>

          {/* Auxilio de transporte */}
          {salarioNum > 0 && salarioNum <= TOPE_AUXILIO && (
            <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                checked={values.incluyeTransporte === "true"}
                onChange={(e) => setField("incluyeTransporte", String(e.target.checked))}
                className="w-5 h-5 rounded-lg border-2 border-slate-300 text-teal-500 focus:ring-teal-500"
              />
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Incluir auxilio de transporte
                </span>
                <p className="text-xs text-slate-500">
                  ${formatMoney(AUXILIO_TRANSPORTE)} (aplica si ganas hasta 2 SMMLV)
                </p>
              </div>
            </label>
          )}

          {/* Fecha de ingreso */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuándo ingresaste a la empresa?
            </label>
            <input
              type="date"
              value={values.fechaIngreso}
              onChange={(e) => setField("fechaIngreso", e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <p className="text-xs text-slate-400 ml-1">
              Déjalo vacío para calcular un año completo
            </p>
          </div>

          {/* Fecha de corte (opcional) */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Fecha de corte (opcional)
            </label>
            <input
              type="date"
              value={values.fechaCorte}
              onChange={(e) => setField("fechaCorte", e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <p className="text-xs text-slate-400 ml-1">
              Por defecto se calcula hasta el 31 de diciembre
            </p>
          </div>

          {/* Mostrar intereses */}
          <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              checked={mostrarIntereses}
              onChange={(e) => setMostrarIntereses(e.target.checked)}
              className="w-5 h-5 rounded-lg border-2 border-slate-300 text-teal-500 focus:ring-teal-500"
            />
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Calcular intereses sobre cesantías
              </span>
              <p className="text-xs text-slate-500">
                12% anual, pagados en enero
              </p>
            </div>
          </label>

          {/* Resultado */}
          {salarioNum > 0 && (
            <div className="mt-8 space-y-4">
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Tus cesantías
                  </p>
                  <p className="text-4xl font-black text-teal-600 dark:text-teal-400">
                    ${formatMoney(cesantias)}
                  </p>
                  {mostrarIntereses && (
                    <div className="mt-4 pt-4 border-t border-teal-200 dark:border-teal-800">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        + Intereses sobre cesantías
                      </p>
                      <p className="text-2xl font-black text-teal-600 dark:text-teal-400">
                        ${formatMoney(interesesCesantias)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              {mostrarIntereses && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-center">
                  <p className="text-sm text-emerald-600 mb-1">Total a recibir</p>
                  <p className="text-3xl font-black text-emerald-600">
                    ${formatMoney(cesantias + interesesCesantias)}
                  </p>
                </div>
              )}

              {/* Desglose */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Salario base</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    ${formatMoney(salarioNum)}
                  </span>
                </div>
                {aplicaAuxilio && (
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-600 dark:text-slate-300">+ Auxilio transporte</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      ${formatMoney(AUXILIO_TRANSPORTE)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Base para cesantías</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    ${formatMoney(salarioBase)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Días trabajados</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {diasTrabajados} de 360
                  </span>
                </div>
              </div>

              {/* Fechas importantes */}
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2"><Icon name="calendar" className="w-4 h-4" weight="fill" /> Fechas importantes</p>
                <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                  <li>• <strong>14 de febrero:</strong> Límite para que el empleador consigne cesantías al fondo</li>
                  <li>• <strong>31 de enero:</strong> Límite para pagar intereses sobre cesantías al trabajador</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500"><Icon name="lightbulb" className="w-5 h-5" weight="fill" /></span>
            Sobre las cesantías
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Fórmula:</strong> (Salario + Aux. Transporte) × Días trabajados ÷ 360</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Intereses:</strong> Cesantías × 12% × Días trabajados ÷ 360</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Dónde se guardan:</strong> En un fondo de cesantías (Porvenir, Protección, Colfondos, FNA).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Retiro parcial:</strong> Solo para vivienda o educación, con autorización del empleador.</span>
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
