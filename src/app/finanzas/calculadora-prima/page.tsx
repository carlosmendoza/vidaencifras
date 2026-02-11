"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/lib/icons";

const faqs = [
  {
    question: "¿Qué es la prima de servicios?",
    answer:
      "La prima de servicios es una prestación social en Colombia equivalente a un mes de salario al año. Se paga en dos cuotas: la primera antes del 30 de junio y la segunda antes del 20 de diciembre.",
  },
  {
    question: "¿Quiénes tienen derecho a la prima?",
    answer:
      "Todos los trabajadores con contrato laboral tienen derecho a prima, incluyendo empleadas domésticas. Los contratistas por prestación de servicios NO tienen derecho a prima porque no tienen vínculo laboral.",
  },
  {
    question: "¿Cómo se calcula la prima si trabajo medio tiempo?",
    answer:
      "La prima se calcula sobre el salario que recibes, sin importar si es tiempo completo o medio tiempo. Si ganas $800.000 mensuales trabajando medio tiempo, tu prima se calcula sobre esos $800.000.",
  },
  {
    question: "¿El auxilio de transporte se incluye en la prima?",
    answer:
      "Sí. Si ganas hasta 2 SMMLV ($3.501.810 en 2026) y recibes auxilio de transporte, este se suma al salario para calcular la prima. El auxilio de transporte en 2026 es $249.095.",
  },
];

export default function CalculadoraPrima() {
  const [salario, setSalario] = useState<string>("");
  const [incluyeTransporte, setIncluyeTransporte] = useState<boolean>(true);
  const [fechaIngreso, setFechaIngreso] = useState<string>("");
  const [periodo, setPeriodo] = useState<"junio" | "diciembre">("junio");

  const AUXILIO_TRANSPORTE = 249095;
  const SMMLV = 1750905;
  const TOPE_AUXILIO = SMMLV * 2;

  const salarioNum = parseFloat(salario) || 0;
  const aplicaAuxilio = incluyeTransporte && salarioNum <= TOPE_AUXILIO && salarioNum > 0;
  const salarioBase = salarioNum + (aplicaAuxilio ? AUXILIO_TRANSPORTE : 0);

  // Calcular días trabajados en el semestre
  const calcularDiasTrabajados = (): number => {
    if (!fechaIngreso) return 180; // Semestre completo

    const inicio = new Date(fechaIngreso);
    const año = new Date().getFullYear();

    let inicioSemestre: Date;
    let finSemestre: Date;

    if (periodo === "junio") {
      inicioSemestre = new Date(año, 0, 1); // 1 enero
      finSemestre = new Date(año, 5, 30); // 30 junio
    } else {
      inicioSemestre = new Date(año, 6, 1); // 1 julio
      finSemestre = new Date(año, 11, 31); // 31 diciembre
    }

    // Si ingresó antes del semestre, trabajó todo el semestre
    if (inicio <= inicioSemestre) return 180;

    // Si ingresó después del fin del semestre, no tiene días
    if (inicio > finSemestre) return 0;

    // Calcular días desde ingreso hasta fin de semestre
    const diffTime = finSemestre.getTime() - inicio.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return Math.min(diffDays, 180);
  };

  const diasTrabajados = calcularDiasTrabajados();
  const prima = (salarioBase * diasTrabajados) / 360;

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
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-green-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="gift" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Prima
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula tu prima de servicios 2026
          </p>
        </div>

        <div className="space-y-6">
          {/* Periodo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Qué prima quieres calcular?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPeriodo("junio")}
                className={`px-4 py-4 rounded-2xl font-semibold transition-colors ${
                  periodo === "junio"
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <span className="block text-lg">Junio</span>
                <span className="text-xs opacity-80">Ene - Jun</span>
              </button>
              <button
                onClick={() => setPeriodo("diciembre")}
                className={`px-4 py-4 rounded-2xl font-semibold transition-colors ${
                  periodo === "diciembre"
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <span className="block text-lg">Diciembre</span>
                <span className="text-xs opacity-80">Jul - Dic</span>
              </button>
            </div>
          </div>

          {/* Salario */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuál es tu salario mensual?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                placeholder="1.300.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[1300000, 1800000, 2500000, 3500000].map((s) => (
                <button
                  key={s}
                  onClick={() => setSalario(s.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    salario === s.toString()
                      ? "bg-green-500 text-white"
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
                checked={incluyeTransporte}
                onChange={(e) => setIncluyeTransporte(e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-slate-300 text-green-500 focus:ring-green-500"
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
              ¿Cuándo ingresaste a la empresa? (opcional)
            </label>
            <input
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <p className="text-xs text-slate-400 ml-1">
              Déjalo vacío si trabajaste todo el semestre
            </p>
          </div>

          {/* Resultado */}
          {salarioNum > 0 && (
            <div className="mt-8 space-y-4">
              <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-3xl ring-1 ring-green-100 dark:ring-green-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Tu prima de {periodo}
                  </p>
                  <p className="text-4xl font-black text-green-600">
                    ${formatMoney(prima)}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                    Por {diasTrabajados} días trabajados
                  </p>
                </div>
              </div>

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
                    <span className="font-bold text-green-600">
                      ${formatMoney(AUXILIO_TRANSPORTE)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Base para prima</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    ${formatMoney(salarioBase)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Días trabajados</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {diasTrabajados} de 180
                  </span>
                </div>
              </div>

              {/* Fórmula */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  <strong>Fórmula:</strong> (Salario + Aux. Transporte) × Días trabajados ÷ 360
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            Sobre la prima de servicios
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-green-500">•</span>
              <span><strong>Cuándo se paga:</strong> Máximo 30 de junio (primer semestre) y 20 de diciembre (segundo semestre).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">•</span>
              <span><strong>Cuánto es:</strong> Equivale a 15 días de salario por cada semestre trabajado, o sea 1 mes al año.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">•</span>
              <span><strong>Salario variable:</strong> Si tienes comisiones, horas extra o recargos, se promedia lo recibido en el semestre.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">•</span>
              <span><strong>Proporcional:</strong> Si no trabajaste todo el semestre, recibes proporcional a los días trabajados.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <FAQ items={faqs} colorClass="emerald" />
        </div>
      </div>
    </div>
  );
}
