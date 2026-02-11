"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";
import { calcularVacaciones, type VacacionesOutput } from "@/lib/calculadoras";
import { SMMLV } from "@/lib/calculadoras/constantes";

export default function CalculadoraVacaciones() {
  const [salario, setSalario] = useState<string>("");
  const [fechaIngreso, setFechaIngreso] = useState<string>("");
  const [diasTomados, setDiasTomados] = useState<string>("0");
  const [resultado, setResultado] = useState<VacacionesOutput | null>(null);

  const calcular = () => {
    const res = calcularVacaciones({
      salario: parseFloat(salario),
      fechaIngreso,
      diasTomados: parseFloat(diasTomados) || 0,
    });
    if (res) setResultado(res);
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const faqs = [
    {
      question: "¿Cuántos días de vacaciones me corresponden en Colombia?",
      answer:
        "Por cada año trabajado tienes derecho a 15 días hábiles de vacaciones remuneradas. Si no has cumplido el año, se calculan proporcionalmente según el tiempo trabajado.",
    },
    {
      question: "¿Cómo se calcula el pago de vacaciones?",
      answer:
        "El valor de las vacaciones se calcula dividiendo tu salario mensual entre 30 y multiplicando por los días de vacaciones. El auxilio de transporte NO se incluye en este cálculo.",
    },
    {
      question: "¿Puedo acumular vacaciones?",
      answer:
        "Sí, puedes acumular hasta 2 años de vacaciones (30 días hábiles). Después de este límite, el empleador debe concederte las vacaciones obligatoriamente.",
    },
    {
      question: "¿Me pueden pagar las vacaciones en dinero?",
      answer:
        "Solo se puede compensar en dinero la mitad de las vacaciones (7.5 días por año). La otra mitad debe disfrutarse obligatoriamente como descanso. La compensación total solo aplica al terminar el contrato.",
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
      name: "Calculadora de Prima",
      href: "/finanzas/calculadora-prima",
      description: "Calcula tu prima de servicios",
      icon: "gift",
    },
    {
      name: "Calculadora de Liquidación",
      href: "/finanzas/calculadora-liquidacion",
      description: "Calcula tu liquidación laboral",
      icon: "clipboard",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-cyan-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="palmtree" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Vacaciones
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Días y dinero que te corresponden
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
              <input
                type="number"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                placeholder="2.500.000"
                className="w-full pl-10 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSalario(SMMLV.toString())}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  salario === SMMLV.toString()
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                1 SMMLV
              </button>
              <button
                onClick={() => setSalario((SMMLV * 2).toString())}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  salario === (SMMLV * 2).toString()
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                2 SMMLV
              </button>
              <button
                onClick={() => setSalario((SMMLV * 3).toString())}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  salario === (SMMLV * 3).toString()
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                3 SMMLV
              </button>
            </div>
          </div>

          {/* Fecha de ingreso */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Fecha de ingreso a la empresa
            </label>
            <input
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          {/* Días ya tomados */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Días de vacaciones ya tomados
            </label>
            <div className="relative">
              <input
                type="number"
                value={diasTomados}
                onChange={(e) => setDiasTomados(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-16"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                días
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 ml-1">
              Días hábiles de vacaciones que ya disfrutaste
            </p>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.99]"
          >
            Calcular vacaciones
          </button>

          {resultado && (
            <div className="mt-8 space-y-4">
              {/* Resultado principal */}
              <div className="p-8 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 rounded-3xl text-center ring-1 ring-cyan-100 dark:ring-cyan-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">
                  Vacaciones acumuladas
                </p>
                <p className="text-5xl md:text-6xl font-black text-cyan-600 dark:text-cyan-400 tracking-tighter">
                  {resultado.diasHabiles}
                </p>
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400">
                  días hábiles
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                  (~{resultado.diasCalendario} días calendario)
                </p>
              </div>

              {/* Valor en dinero */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Valor de tus vacaciones</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Si las cobraras hoy</p>
                  </div>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {formatMoney(resultado.valorVacaciones)}
                  </p>
                </div>
              </div>

              {/* Desglose */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-800">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                  Desglose
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Valor por día</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {formatMoney(resultado.valorPorDia)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Días hábiles acumulados</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      {resultado.diasHabiles} días
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Total</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      {formatMoney(resultado.valorVacaciones)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-sm">
                <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Recuerda</p>
                <p className="text-slate-600 dark:text-slate-300">
                  Solo puedes compensar en dinero máximo la mitad de tus vacaciones.
                  La otra mitad debe disfrutarse como descanso.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info adicional */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Icon name="calendar" className="w-5 h-5" weight="fill" />
          </span>
          ¿Cómo funcionan las vacaciones?
        </h2>
        <div className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
          <p>
            <strong className="text-slate-700 dark:text-slate-300">15 días hábiles por año:</strong> Por cada año
            completo trabajado tienes derecho a 15 días hábiles de vacaciones remuneradas.
          </p>
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Proporcionales:</strong> Si no has cumplido el año,
            se calculan proporcionalmente (1.25 días por mes trabajado).
          </p>
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Sin auxilio de transporte:</strong> El valor de las
            vacaciones se calcula solo sobre el salario básico, sin incluir el auxilio de transporte.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="cyan" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
