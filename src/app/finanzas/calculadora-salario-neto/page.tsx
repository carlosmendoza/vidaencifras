"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";

interface Resultado {
  salarioBruto: number;
  auxilioTransporte: number;
  descuentoSalud: number;
  descuentoPension: number;
  fondoSolidaridad: number;
  totalDescuentos: number;
  salarioNeto: number;
}

export default function CalculadoraSalarioNeto() {
  const [salario, setSalario] = useState<string>("");
  const [incluyeTransporte, setIncluyeTransporte] = useState<boolean>(true);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  // Valores 2026 Colombia
  const SMMLV = 1750905;
  const AUXILIO_TRANSPORTE = 249095;
  const TOPE_AUXILIO = SMMLV * 2;

  // Porcentajes de descuento (parte del trabajador)
  const PORCENTAJE_SALUD = 0.04; // 4%
  const PORCENTAJE_PENSION = 0.04; // 4%

  const calcular = () => {
    const salarioBruto = parseFloat(salario);
    if (isNaN(salarioBruto) || salarioBruto <= 0) return;

    // Auxilio de transporte aplica si gana hasta 2 SMMLV
    const aplicaAuxilio = incluyeTransporte && salarioBruto <= TOPE_AUXILIO;
    const auxilioTransporte = aplicaAuxilio ? AUXILIO_TRANSPORTE : 0;

    // Los descuentos se calculan sobre el salario bruto (sin auxilio de transporte)
    const descuentoSalud = salarioBruto * PORCENTAJE_SALUD;
    const descuentoPension = salarioBruto * PORCENTAJE_PENSION;

    // Fondo de Solidaridad Pensional (si gana más de 4 SMMLV)
    let fondoSolidaridad = 0;
    if (salarioBruto >= SMMLV * 4) {
      // 1% adicional para salarios entre 4 y 16 SMMLV
      fondoSolidaridad = salarioBruto * 0.01;
      // Escala adicional para salarios más altos
      if (salarioBruto >= SMMLV * 16) {
        fondoSolidaridad = salarioBruto * 0.02;
      }
    }

    const totalDescuentos = descuentoSalud + descuentoPension + fondoSolidaridad;
    const salarioNeto = salarioBruto - totalDescuentos + auxilioTransporte;

    setResultado({
      salarioBruto,
      auxilioTransporte,
      descuentoSalud,
      descuentoPension,
      fondoSolidaridad,
      totalDescuentos,
      salarioNeto,
    });
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const salarioRapido = [SMMLV, SMMLV * 2, SMMLV * 3, SMMLV * 4];

  const faqs = [
    {
      question: "¿Qué descuentos se hacen al salario en Colombia?",
      answer:
        "Los descuentos obligatorios son: salud (4%) y pensión (4%), ambos calculados sobre el salario básico. Si ganas más de 4 SMMLV, también se descuenta el Fondo de Solidaridad Pensional (1% adicional).",
    },
    {
      question: "¿El auxilio de transporte tiene descuentos?",
      answer:
        "No. El auxilio de transporte no tiene descuentos de salud ni pensión. Se suma íntegro al salario neto. Aplica para quienes ganan hasta 2 SMMLV.",
    },
    {
      question: "¿Qué es el Fondo de Solidaridad Pensional?",
      answer:
        "Es un aporte adicional del 1% que deben hacer los trabajadores que ganan 4 SMMLV o más. Este dinero se destina a subsidiar las pensiones de adultos mayores de escasos recursos.",
    },
    {
      question: "¿La retención en la fuente se descuenta del salario?",
      answer:
        "Sí, pero solo aplica para salarios altos (generalmente desde 4.5 SMMLV). El valor depende de deducciones personales como dependientes, medicina prepagada, intereses de vivienda, etc.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Prima",
      href: "/finanzas/calculadora-prima",
      description: "Calcula tu prima de servicios",
      emoji: "🎁",
    },
    {
      name: "Calculadora de Liquidación",
      href: "/finanzas/calculadora-liquidacion",
      description: "Calcula tu liquidación laboral",
      emoji: "📋",
    },
    {
      name: "Calculadora de Horas Extras",
      href: "/finanzas/calculadora-horas-extras",
      description: "Calcula el valor de tus extras",
      emoji: "⏰",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-emerald-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            💵
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Salario Neto
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            ¿Cuánto recibes realmente? Colombia 2026
          </p>
        </div>

        <div className="space-y-6">
          {/* Salario bruto */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Salario mensual bruto
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
            {/* Botones rápidos */}
            <div className="flex flex-wrap gap-2">
              {salarioRapido.map((s) => (
                <button
                  key={s}
                  onClick={() => setSalario(s.toString())}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    salario === s.toString()
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {s === SMMLV ? "1 SMMLV" : `${s / SMMLV} SMMLV`}
                </button>
              ))}
            </div>
          </div>

          {/* Auxilio de transporte */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <button
              onClick={() => setIncluyeTransporte(!incluyeTransporte)}
              className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors ${
                incluyeTransporte ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  incluyeTransporte ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Incluir auxilio de transporte
              </span>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {formatMoney(AUXILIO_TRANSPORTE)} (aplica hasta 2 SMMLV)
              </p>
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.99]"
          >
            Calcular salario neto
          </button>

          {resultado && (
            <div className="mt-8 space-y-4">
              {/* Resultado principal */}
              <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl text-center ring-1 ring-emerald-100 dark:ring-emerald-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">
                  Recibes mensualmente
                </p>
                <p className="text-5xl md:text-6xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">
                  {formatMoney(resultado.salarioNeto)}
                </p>
              </div>

              {/* Desglose */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-800">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                  Desglose de tu nómina
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Salario bruto</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {formatMoney(resultado.salarioBruto)}
                    </span>
                  </div>

                  {resultado.auxilioTransporte > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400">+ Auxilio transporte</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        +{formatMoney(resultado.auxilioTransporte)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2">DESCUENTOS</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Salud (4%)</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      -{formatMoney(resultado.descuentoSalud)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Pensión (4%)</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      -{formatMoney(resultado.descuentoPension)}
                    </span>
                  </div>

                  {resultado.fondoSolidaridad > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Fondo solidaridad (1%)</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        -{formatMoney(resultado.fondoSolidaridad)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Total descuentos</span>
                    <span className="font-black text-rose-600 dark:text-rose-400">
                      -{formatMoney(resultado.totalDescuentos)}
                    </span>
                  </div>

                  <div className="border-t-2 border-emerald-200 dark:border-emerald-800 pt-3 flex justify-between items-center">
                    <span className="font-black text-slate-800 dark:text-slate-100">SALARIO NETO</span>
                    <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">
                      {formatMoney(resultado.salarioNeto)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Porcentaje de descuento */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                    {((resultado.totalDescuentos / resultado.salarioBruto) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs font-bold text-slate-400">de descuentos</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl text-center">
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {(100 - (resultado.totalDescuentos / resultado.salarioBruto) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs font-bold text-slate-400">recibes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info sobre aportes del empleador */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-base">
            ℹ️
          </span>
          ¿Y el empleador qué paga?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
          Además de tu salario, el empleador aporta por ti:
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300">Salud</p>
            <p className="text-slate-500 dark:text-slate-400">8.5%</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300">Pensión</p>
            <p className="text-slate-500 dark:text-slate-400">12%</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300">ARL</p>
            <p className="text-slate-500 dark:text-slate-400">0.52% - 6.96%</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300">Parafiscales</p>
            <p className="text-slate-500 dark:text-slate-400">9% (SENA, ICBF, CCF)</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <FAQ items={faqs} colorClass="emerald" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
