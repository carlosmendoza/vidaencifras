"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/lib/icons";
import { calcularLiquidacion, type TipoTerminacion, type TipoContrato } from "@/lib/calculadoras";
import { AUXILIO_TRANSPORTE, SMMLV, TOPE_AUXILIO } from "@/lib/calculadoras/constantes";

const faqs = [
  {
    question: "¿Qué incluye la liquidación laboral?",
    answer:
      "La liquidación incluye: salario pendiente, prima de servicios proporcional, cesantías proporcionales, intereses sobre cesantías, vacaciones no disfrutadas. Si el despido es sin justa causa, también incluye indemnización.",
  },
  {
    question: "¿Cuándo me deben pagar la liquidación?",
    answer:
      "El empleador debe pagar la liquidación al momento de terminar el contrato. Si no paga el último día, debe pagar un día de salario por cada día de mora (sanción moratoria), hasta por 24 meses.",
  },
  {
    question: "¿Cómo se calcula la indemnización por despido sin justa causa?",
    answer:
      "Para contratos a término indefinido: si tienes menos de 1 año, son 30 días de salario. Si tienes más de 1 año, son 30 días por el primer año + 20 días por cada año adicional. Para salarios altos (más de 10 SMMLV) los días adicionales son 15.",
  },
  {
    question: "¿Si renuncio tengo derecho a indemnización?",
    answer:
      "No. La indemnización solo aplica cuando el empleador termina el contrato sin justa causa. Si renuncias voluntariamente, solo recibes las prestaciones sociales proporcionales (prima, cesantías, vacaciones).",
  },
];

export default function CalculadoraLiquidacion() {
  const [salario, setSalario] = useState<string>("");
  const [incluyeTransporte, setIncluyeTransporte] = useState<boolean>(true);
  const [fechaIngreso, setFechaIngreso] = useState<string>("");
  const [fechaSalida, setFechaSalida] = useState<string>("");
  const [tipoTerminacion, setTipoTerminacion] = useState<TipoTerminacion>("renuncia");
  const [tipoContrato, setTipoContrato] = useState<TipoContrato>("indefinido");
  const [diasVacacionesPendientes, setDiasVacacionesPendientes] = useState<string>("");

  const salarioNum = parseFloat(salario) || 0;

  const resultado = calcularLiquidacion({
    salario: salarioNum,
    incluyeTransporte,
    fechaIngreso,
    fechaSalida,
    tipoTerminacion,
    tipoContrato,
    diasVacacionesPendientes: diasVacacionesPendientes ? parseFloat(diasVacacionesPendientes) : undefined,
  });

  const diasTrabajados = resultado?.diasTrabajados ?? 0;
  const añosTrabajados = resultado?.añosTrabajados ?? 0;
  const diasSemestreActual = resultado?.diasSemestreActual ?? 0;
  const diasAñoActual = resultado?.diasAñoActual ?? 0;
  const prima = resultado?.prima ?? 0;
  const cesantias = resultado?.cesantias ?? 0;
  const interesesCesantias = resultado?.interesesCesantias ?? 0;
  const diasVacaciones = resultado?.diasVacaciones ?? 0;
  const vacaciones = resultado?.vacaciones ?? 0;
  const indemnizacion = resultado?.indemnizacion ?? 0;
  const totalLiquidacion = resultado?.totalLiquidacion ?? 0;

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const tieneResultados = resultado !== null;

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-purple-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"><Icon name="clipboard" className="w-10 h-10" /></div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Liquidación
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula tu liquidación laboral completa
          </p>
        </div>

        <div className="space-y-6">
          {/* Tipo de terminación */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Por qué termina tu contrato?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "renuncia", label: "Renuncio" },
                { value: "despido_sin_justa_causa", label: "Despido sin justa causa" },
                { value: "despido_justa_causa", label: "Despido con justa causa" },
                { value: "fin_contrato", label: "Fin de contrato" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTipoTerminacion(opt.value as TipoTerminacion)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    tipoTerminacion === opt.value
                      ? "bg-purple-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de contrato (solo si aplica indemnización) */}
          {tipoTerminacion === "despido_sin_justa_causa" && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Tipo de contrato
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTipoContrato("indefinido")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                    tipoContrato === "indefinido"
                      ? "bg-purple-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  Indefinido
                </button>
                <button
                  onClick={() => setTipoContrato("fijo")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                    tipoContrato === "fijo"
                      ? "bg-purple-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  Fijo
                </button>
              </div>
            </div>
          )}

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
          </div>

          {/* Auxilio de transporte */}
          {salarioNum > 0 && salarioNum <= TOPE_AUXILIO && (
            <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                checked={incluyeTransporte}
                onChange={(e) => setIncluyeTransporte(e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-slate-300 text-purple-500 focus:ring-purple-500"
              />
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Recibo auxilio de transporte
                </span>
                <p className="text-xs text-slate-500">
                  ${formatMoney(AUXILIO_TRANSPORTE)}
                </p>
              </div>
            </label>
          )}

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Fecha de ingreso
              </label>
              <input
                type="date"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl text-base font-semibold"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Fecha de salida
              </label>
              <input
                type="date"
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl text-base font-semibold"
              />
            </div>
          </div>

          {/* Vacaciones pendientes */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Días de vacaciones pendientes (opcional)
            </label>
            <input
              type="number"
              value={diasVacacionesPendientes}
              onChange={(e) => setDiasVacacionesPendientes(e.target.value)}
              placeholder="Dejar vacío para calcular automático"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <p className="text-xs text-slate-400 ml-1">
              Si no sabes, se calculan 15 días por año trabajado
            </p>
          </div>

          {/* Resultado */}
          {tieneResultados && (
            <div className="mt-8 space-y-4">
              <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-3xl ring-1 ring-purple-100 dark:ring-purple-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Total liquidación
                  </p>
                  <p className="text-4xl font-black text-purple-600">
                    ${formatMoney(totalLiquidacion)}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                    {diasTrabajados} días trabajados ({Math.floor(añosTrabajados)} años y {Math.round((añosTrabajados % 1) * 12)} meses)
                  </p>
                </div>
              </div>

              {/* Desglose detallado */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 ml-1">Desglose</h3>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Prima de servicios</span>
                    <p className="text-xs text-slate-500">{diasSemestreActual} días del semestre</p>
                  </div>
                  <span className="font-bold text-lg text-purple-600">
                    ${formatMoney(prima)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Cesantías</span>
                    <p className="text-xs text-slate-500">{diasAñoActual} días del año</p>
                  </div>
                  <span className="font-bold text-lg text-purple-600">
                    ${formatMoney(cesantias)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Intereses sobre cesantías</span>
                    <p className="text-xs text-slate-500">12% anual</p>
                  </div>
                  <span className="font-bold text-lg text-purple-600">
                    ${formatMoney(interesesCesantias)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Vacaciones</span>
                    <p className="text-xs text-slate-500">{diasVacaciones.toFixed(1)} días</p>
                  </div>
                  <span className="font-bold text-lg text-purple-600">
                    ${formatMoney(vacaciones)}
                  </span>
                </div>

                {indemnizacion > 0 && (
                  <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl ring-1 ring-red-200 dark:ring-red-800">
                    <div>
                      <span className="font-semibold text-red-700 dark:text-red-300">Indemnización</span>
                      <p className="text-xs text-red-500">Por despido sin justa causa</p>
                    </div>
                    <span className="font-bold text-lg text-red-600">
                      ${formatMoney(indemnizacion)}
                    </span>
                  </div>
                )}
              </div>

              {/* Nota */}
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-sm text-amber-700 dark:text-amber-300">
                <span className="inline-flex items-center gap-1 text-amber-600"><Icon name="warning" className="w-5 h-5" weight="fill" /> <strong>Nota:</strong></span> Este cálculo es una estimación. No incluye salarios pendientes, bonificaciones, ni descuentos. Consulta con un abogado laboral para casos específicos.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600"><Icon name="lightbulb" className="w-5 h-5" weight="fill" /></span>
            Sobre la liquidación
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>Prima:</strong> 15 días de salario por semestre trabajado.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>Cesantías:</strong> 1 mes de salario por año trabajado.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>Intereses:</strong> 12% anual sobre las cesantías.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>Vacaciones:</strong> 15 días hábiles por año trabajado.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span><strong>Indemnización:</strong> Solo aplica si te despiden sin justa causa.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <FAQ items={faqs} colorClass="violet" />
        </div>
      </div>
    </div>
  );
}
