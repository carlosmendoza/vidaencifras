"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";
import { CurrencyInput } from "@/components/CurrencyInput";
import { ResultWithMascot } from "@/components/ResultWithMascot";
import {
  SMMLV_2025,
  LIMITES_MI_CASA_YA,
  REQUISITOS_MI_CASA_YA,
  DOCUMENTOS_REQUERIDOS,
  calcularElegibilidad,
} from "@/lib/data/subsidioViviendaColombia";

export default function CalculadoraSubsidioVivienda() {
  const [valorVivienda, setValorVivienda] = useState<string>("100000000");
  const [ingresosFamiliares, setIngresosFamiliares] = useState<string>("4000000");
  const [esPropietario, setEsPropietario] = useState<boolean>(false);
  const [tuvoSubsidio, setTuvoSubsidio] = useState<boolean>(false);

  const resultado = useMemo(() => {
    const valor = parseFloat(valorVivienda);
    const ingresos = parseFloat(ingresosFamiliares);

    if (isNaN(valor) || isNaN(ingresos) || valor <= 0 || ingresos <= 0) {
      return null;
    }

    return calcularElegibilidad(valor, ingresos, esPropietario, tuvoSubsidio);
  }, [valorVivienda, ingresosFamiliares, esPropietario, tuvoSubsidio]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const ingresosSMMLV = parseFloat(ingresosFamiliares) / SMMLV_2025;

  const faqs = [
    {
      question: "¿Qué es el programa Mi Casa Ya?",
      answer:
        "Mi Casa Ya otorga subsidios para vivienda nueva VIS y VIP a familias de bajos ingresos. Incluye subsidio a la cuota inicial y cobertura a la tasa.",
    },
    {
      question: "¿Cuánto es el subsidio?",
      answer:
        "Hasta 30 SMMLV para VIP y 20 SMMLV para VIS, dependiendo de tus ingresos familiares.",
    },
    {
      question: "¿Cuáles son los requisitos?",
      answer:
        "Ser colombiano, ingresos hasta 4 SMMLV, no ser propietario, no haber recibido subsidio antes, tener crédito aprobado.",
    },
    {
      question: "¿Aplica para vivienda usada?",
      answer:
        "No, Mi Casa Ya solo aplica para vivienda nueva. Para usada, consulta opciones del FNA.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Comparador de Préstamos",
      href: "/finanzas/comparador-prestamos",
      description: "Compara créditos hipotecarios",
      icon: "landmark",
    },
    {
      name: "Arriendo vs Compra",
      href: "/finanzas/arriendo-vs-compra",
      description: "¿Te conviene comprar?",
      icon: "home",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="home" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Subsidio Mi Casa Ya
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Verifica si eres elegible para el subsidio de vivienda
          </p>
        </div>

        <div className="space-y-6">
          {/* Valor de la vivienda */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Valor de la vivienda
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <CurrencyInput
                value={valorVivienda}
                onChange={(v) => setValorVivienda(v)}
                locale="es-CO"
                placeholder="100.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>VIP: Hasta ${formatMoney(LIMITES_MI_CASA_YA.vip.valorMaximo)}</span>
              <span>VIS: Hasta ${formatMoney(LIMITES_MI_CASA_YA.vis.valorMaximo)}</span>
            </div>
          </div>

          {/* Ingresos familiares */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Ingresos familiares mensuales
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <CurrencyInput
                value={ingresosFamiliares}
                onChange={(v) => setIngresosFamiliares(v)}
                locale="es-CO"
                placeholder="4.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Equivale a {ingresosSMMLV.toFixed(2)} SMMLV (máximo 4 SMMLV = ${formatMoney(4 * SMMLV_2025)})
            </p>
          </div>

          {/* Preguntas de elegibilidad */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Verifica tu situación
            </label>

            <div className="space-y-3">
              <button
                onClick={() => setEsPropietario(!esPropietario)}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-4 ${
                  esPropietario
                    ? "bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800"
                    : "bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    esPropietario ? "bg-red-500" : "bg-emerald-500"
                  }`}
                >
                  {esPropietario ? (
                    <Icon name="warning" className="w-4 h-4 text-white" />
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {esPropietario ? "Soy propietario de vivienda" : "No soy propietario de vivienda"}
                  </p>
                  <p className="text-xs text-slate-500">Toca para cambiar</p>
                </div>
              </button>

              <button
                onClick={() => setTuvoSubsidio(!tuvoSubsidio)}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-4 ${
                  tuvoSubsidio
                    ? "bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800"
                    : "bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    tuvoSubsidio ? "bg-red-500" : "bg-emerald-500"
                  }`}
                >
                  {tuvoSubsidio ? (
                    <Icon name="warning" className="w-4 h-4 text-white" />
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {tuvoSubsidio ? "Ya recibí subsidio de vivienda" : "Nunca he recibido subsidio de vivienda"}
                  </p>
                  <p className="text-xs text-slate-500">Toca para cambiar</p>
                </div>
              </button>
            </div>
          </div>

          {/* Resultado */}
          {resultado && (
            <ResultWithMascot>
            <div className="mt-8 space-y-4 animate-result-appear">
              {/* Estado de elegibilidad */}
              <div
                className={`p-8 rounded-3xl text-center ring-1 ${
                  resultado.esElegible
                    ? "bg-emerald-50 dark:bg-emerald-950/50 ring-emerald-100 dark:ring-emerald-900"
                    : "bg-red-50 dark:bg-red-950/50 ring-red-100 dark:ring-red-900"
                }`}
              >
                <div className="flex justify-center mb-4">
                  {resultado.esElegible ? (
                    <Icon name="seal-check" className="w-16 h-16 text-emerald-600" />
                  ) : (
                    <Icon name="warning" className="w-16 h-16 text-red-600" />
                  )}
                </div>
                <p
                  className={`text-2xl font-black mb-2 ${
                    resultado.esElegible ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {resultado.esElegible ? "¡Eres elegible!" : "No eres elegible"}
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  {resultado.razones.map((razon, i) => (
                    <li key={i}>{razon}</li>
                  ))}
                </ul>
              </div>

              {/* Detalles del subsidio si es elegible */}
              {resultado.esElegible && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl text-center border border-teal-200 dark:border-teal-800">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Tu subsidio</p>
                      <p className="text-3xl font-black text-teal-600">${formatMoney(resultado.subsidioMonto)}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        ({resultado.subsidioSMMLV} SMMLV)
                      </p>
                    </div>
                    <div className="p-5 bg-white/60 dark:bg-slate-800/60 rounded-2xl text-center border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Tipo de vivienda</p>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
                        {resultado.tipoVivienda.toUpperCase()}
                      </p>
                      <p className="text-sm text-slate-500">
                        {resultado.tipoVivienda === "vip" ? "Interés Prioritario" : "Interés Social"}
                      </p>
                    </div>
                  </div>

                  {/* Comparación de cuotas */}
                  <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">
                      Comparación de cuota mensual (estimado a 15 años)
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Sin subsidio</span>
                        <span className="font-bold text-red-600">${formatMoney(resultado.cuotaSinSubsidio)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">
                          Con subsidio {resultado.coberturaTasa && "+ cobertura tasa"}
                        </span>
                        <span className="font-bold text-emerald-600">${formatMoney(resultado.cuotaConSubsidio)}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <span className="font-bold text-slate-800 dark:text-slate-100">Tu ahorro mensual</span>
                        <span className="font-black text-2xl text-teal-600">${formatMoney(resultado.ahorroMensual)}</span>
                      </div>
                    </div>
                  </div>

                  {resultado.coberturaTasa && (
                    <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-2xl border border-teal-200 dark:border-teal-800">
                      <p className="text-sm text-teal-700 dark:text-teal-300 font-medium flex items-center gap-2">
                        <Icon name="seal-check" className="w-5 h-5" />
                        Incluye cobertura a la tasa de interés (reduce la cuota en los primeros años)
                      </p>
                    </div>
                  )}
                </>
              )}

              {resultado.esElegible && (
                <ShareButtons
                  title="Calculadora Mi Casa Ya"
                  text={`¡Soy elegible para el subsidio Mi Casa Ya! Puedo recibir $${formatMoney(resultado.subsidioMonto)} de subsidio`}
                  result={{
                    label: "Subsidio",
                    value: `$${formatMoney(resultado.subsidioMonto)}`,
                  }}
                />
              )}
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Requisitos */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Icon name="clipboard" className="w-5 h-5" />
          </span>
          Requisitos Mi Casa Ya
        </h2>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {REQUISITOS_MI_CASA_YA.map((req, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Documentos */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Icon name="file-text" className="w-5 h-5" />
          </span>
          Documentos necesarios
        </h2>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {DOCUMENTOS_REQUERIDOS.map((doc, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="teal" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
