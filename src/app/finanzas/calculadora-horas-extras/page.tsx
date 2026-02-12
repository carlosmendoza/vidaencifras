"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";
import { calcularHorasExtras, type HorasExtrasOutput } from "@/lib/calculadoras";
import { SMMLV, TIPOS_HORA, type TipoHora } from "@/lib/calculadoras/constantes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useUrlState } from "@/hooks/useUrlState";
import { ResultWithMascot } from "@/components/ResultWithMascot";

interface TipoHoraUI {
  id: TipoHora;
  nombre: string;
  descripcion: string;
  recargo: number;
  color: string;
}

export default function CalculadoraHorasExtras() {
  const { values, setField, hadInitialParams } = useUrlState(
    { salario: "", tipoHora: "extra_diurna", cantidad: "" },
    { paramNames: { tipoHora: "tipo" } }
  );
  const [resultado, setResultado] = useState<HorasExtrasOutput | null>(null);

  const tiposHora: TipoHoraUI[] = TIPOS_HORA.map((t) => ({
    ...t,
    color: {
      extra_diurna: "amber",
      extra_nocturna: "indigo",
      extra_dom_diurna: "orange",
      extra_dom_nocturna: "rose",
      recargo_nocturno: "violet",
      recargo_dominical: "cyan",
      recargo_dom_nocturno: "pink",
    }[t.id],
  }));

  const calcular = () => {
    const res = calcularHorasExtras({
      salario: parseFloat(values.salario),
      tipoHora: values.tipoHora as TipoHora,
      cantidad: parseFloat(values.cantidad),
    });
    if (res) setResultado(res);
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const tipoSeleccionado = tiposHora.find((t) => t.id === values.tipoHora)!;

  const faqs = [
    {
      question: "¿Cómo se calcula el valor de la hora extra?",
      answer:
        "El valor hora se calcula dividiendo el salario mensual entre las horas de la jornada mensual (182 horas para jornada de 42h/semana en 2026). Luego se aplica el recargo según el tipo de hora extra.",
    },
    {
      question: "¿Cuál es la diferencia entre hora extra y recargo?",
      answer:
        "La hora extra es tiempo adicional después de completar tu jornada laboral. El recargo aplica cuando trabajas en horario nocturno o dominical dentro de tu jornada normal, sin ser tiempo adicional.",
    },
    {
      question: "¿Cuántas horas extras puedo trabajar al mes?",
      answer:
        "El máximo legal en Colombia es de 2 horas extras diarias y 12 semanales. El empleador debe solicitar autorización al Ministerio de Trabajo para que sus empleados trabajen horas extras.",
    },
    {
      question: "¿Las horas extras pagan aportes a salud y pensión?",
      answer:
        "Sí. Las horas extras hacen parte del salario y sobre ellas se calculan los aportes a salud, pensión y parafiscales. También se incluyen en la base para calcular prestaciones sociales.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Salario Neto",
      href: "/finanzas/calculadora-salario-neto",
      description: "Calcula tu sueldo después de descuentos",
      icon: "banknote",
    },
    {
      name: "Calculadora de Liquidación",
      href: "/finanzas/calculadora-liquidacion",
      description: "Calcula tu liquidación laboral",
      icon: "clipboard",
    },
    {
      name: "Calculadora de Vacaciones",
      href: "/finanzas/calculadora-vacaciones",
      description: "Calcula tus días y dinero",
      icon: "palmtree",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg text-white">
            <Icon name="clock" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Horas Extras
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Recargos laborales Colombia 2026
          </p>
        </div>

        <div className="space-y-6">
          {/* Salario */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Salario mensual
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <CurrencyInput
                value={values.salario}
                onChange={(v) => setField("salario", v)}
                locale="es-CO"
                placeholder="1.750.905"
                className="w-full pl-10 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: SMMLV, label: "1 SMMLV" },
                { value: SMMLV * 2, label: "2 SMMLV" },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setField("salario", s.value.toString())}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    values.salario === s.value.toString()
                      ? "bg-teal-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de hora */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tipo de hora/recargo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tiposHora.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => setField("tipoHora", tipo.id)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    values.tipoHora === tipo.id
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{tipo.nombre}</span>
                    <span className={`text-xs font-black ${values.tipoHora === tipo.id ? "text-white" : "text-teal-600 dark:text-teal-400"}`}>
                      +{(tipo.recargo * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${values.tipoHora === tipo.id ? "text-teal-100" : "text-slate-400"}`}>
                    {tipo.descripcion}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad de horas */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Cantidad de horas
            </label>
            <div className="relative">
              <input
                type="number"
                value={values.cantidad}
                onChange={(e) => setField("cantidad", e.target.value)}
                placeholder="10"
                step="0.5"
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-16"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                horas
              </span>
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.99]"
          >
            Calcular horas extras
          </button>

          {resultado && (
            <ResultWithMascot>
            <div className="mt-8 space-y-4">
              {/* Resultado principal */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl text-center ring-1 ring-teal-100 dark:ring-teal-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">
                  Total a recibir
                </p>
                <p className="text-5xl md:text-6xl font-black text-teal-600 dark:text-teal-400 tracking-tighter">
                  {formatMoney(resultado.totalPagar)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Por {resultado.totalHoras} horas de {tipoSeleccionado.nombre.toLowerCase()}
                </p>
              </div>

              {/* Desglose */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-800">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                  Desglose del cálculo
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Valor hora base</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {formatMoney(resultado.valorHoraBase)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      + Recargo ({(tipoSeleccionado.recargo * 100).toFixed(0)}%)
                    </span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      +{formatMoney(resultado.recargo)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Valor hora total</span>
                    <span className="font-black text-teal-600 dark:text-teal-400">
                      {formatMoney(resultado.valorHoraTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">× {resultado.totalHoras} horas</span>
                  </div>
                  <div className="border-t-2 border-teal-200 dark:border-teal-800 pt-3 flex justify-between items-center">
                    <span className="font-black text-slate-800 dark:text-slate-100">TOTAL</span>
                    <span className="font-black text-xl text-teal-600 dark:text-teal-400">
                      {formatMoney(resultado.totalPagar)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Tabla de referencia */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-base text-teal-500">
            <Icon name="bar-chart" className="w-5 h-5" />
          </span>
          Tabla de recargos Colombia
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Tipo</th>
                <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Recargo</th>
              </tr>
            </thead>
            <tbody>
              {tiposHora.map((tipo) => (
                <tr key={tipo.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 text-slate-600 dark:text-slate-400">{tipo.nombre}</td>
                  <td className="py-2 text-right font-bold text-teal-600 dark:text-teal-400">
                    +{(tipo.recargo * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
