"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/lib/icons";
import { calcularLiquidacion, type TipoTerminacion, type TipoContrato } from "@/lib/calculadoras";
import { AUXILIO_TRANSPORTE, SMMLV, TOPE_AUXILIO } from "@/lib/calculadoras/constantes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useUrlState } from "@/hooks/useUrlState";
import { ResultWithMascot } from "@/components/ResultWithMascot";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";

export default function CalculadoraLiquidacion() {
  const { values, setField } = useUrlState(
    { salario: "", incluyeTransporte: "true", fechaIngreso: "", fechaSalida: "", tipoTerminacion: "renuncia", tipoContrato: "indefinido", diasVacacionesPendientes: "" },
    { paramNames: { incluyeTransporte: "transporte", fechaIngreso: "ingreso", fechaSalida: "salida", tipoTerminacion: "tipo", tipoContrato: "contrato", diasVacacionesPendientes: "vacaciones" } }
  );

  const salarioNum = parseFloat(values.salario) || 0;

  const resultado = calcularLiquidacion({
    salario: salarioNum,
    incluyeTransporte: values.incluyeTransporte === "true",
    fechaIngreso: values.fechaIngreso,
    fechaSalida: values.fechaSalida,
    tipoTerminacion: values.tipoTerminacion as TipoTerminacion,
    tipoContrato: values.tipoContrato as TipoContrato,
    diasVacacionesPendientes: values.diasVacacionesPendientes ? parseFloat(values.diasVacacionesPendientes) : undefined,
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
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <CalculatorHeader title="Calculadora de Liquidación" subtitle="Calcula tu liquidación laboral completa" icon="clipboard" gradient="finanzas" />

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
                  onClick={() => setField("tipoTerminacion", opt.value)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    values.tipoTerminacion === opt.value
                      ? "bg-teal-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de contrato (solo si aplica indemnización) */}
          {values.tipoTerminacion === "despido_sin_justa_causa" && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Tipo de contrato
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setField("tipoContrato", "indefinido")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                    values.tipoContrato === "indefinido"
                      ? "bg-teal-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  Indefinido
                </button>
                <button
                  onClick={() => setField("tipoContrato", "fijo")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                    values.tipoContrato === "fijo"
                      ? "bg-teal-500 text-white"
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
              <CurrencyInput
                value={values.salario}
                onChange={(v) => setField("salario", v)}
                locale="es-CO"
                placeholder="1.750.905"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: SMMLV, label: "1 SMMLV" },
                { value: SMMLV * 2, label: "2 SMMLV" },
                { value: SMMLV * 3, label: "3 SMMLV" },
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
                  Recibo auxilio de transporte
                </span>
                <p className="text-xs text-slate-500">
                  ${formatMoney(AUXILIO_TRANSPORTE)}
                </p>
              </div>
            </label>
          )}

          {/* Fechas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Fecha de ingreso
              </label>
              <input
                type="date"
                value={values.fechaIngreso}
                onChange={(e) => setField("fechaIngreso", e.target.value)}
                className="w-full px-4 py-4 rounded-2xl text-base font-semibold"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Fecha de salida
              </label>
              <input
                type="date"
                value={values.fechaSalida}
                onChange={(e) => setField("fechaSalida", e.target.value)}
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
              value={values.diasVacacionesPendientes}
              onChange={(e) => setField("diasVacacionesPendientes", e.target.value)}
              placeholder="Opcional"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <p className="text-xs text-slate-400 ml-1">
              Si lo dejas vacío, se calculan 15 días por año trabajado
            </p>
          </div>

          {/* Resultado */}
          {tieneResultados && (
            <ResultWithMascot>
            <div className="mt-8 space-y-4">
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Total liquidación
                  </p>
                  <p className="text-4xl font-black text-teal-600">
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
                  <span className="font-bold text-lg text-teal-600">
                    ${formatMoney(prima)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Cesantías</span>
                    <p className="text-xs text-slate-500">{diasAñoActual} días del año</p>
                  </div>
                  <span className="font-bold text-lg text-teal-600">
                    ${formatMoney(cesantias)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Intereses sobre cesantías</span>
                    <p className="text-xs text-slate-500">12% anual</p>
                  </div>
                  <span className="font-bold text-lg text-teal-600">
                    ${formatMoney(interesesCesantias)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Vacaciones</span>
                    <p className="text-xs text-slate-500">{diasVacaciones.toFixed(1)} días</p>
                  </div>
                  <span className="font-bold text-lg text-teal-600">
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
              <div className="flex gap-2 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-sm text-amber-700 dark:text-amber-300">
                <Icon name="warning" className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" weight="fill" />
                <p><strong>Nota:</strong> Este cálculo es una estimación. No incluye salarios pendientes, bonificaciones, ni descuentos. Consulta con un abogado laboral para casos específicos.</p>
              </div>
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Contenido educativo SEO */}
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ¿Qué es la liquidación? */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            ¿Qué es la liquidación laboral en Colombia?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              La <strong className="text-slate-700 dark:text-slate-300">liquidación laboral</strong> es el pago que recibe un trabajador cuando termina su relación laboral con una empresa. Incluye todas las prestaciones sociales proporcionales al tiempo trabajado, más la indemnización si aplica.
            </p>
            <p>
              En Colombia, el empleador está obligado a pagar la liquidación <strong className="text-slate-700 dark:text-slate-300">al momento de la terminación del contrato</strong>. Si no lo hace, debe pagar una sanción de un día de salario por cada día de mora, según el artículo 65 del Código Sustantivo del Trabajo.
            </p>
            <p>
              La liquidación aplica sin importar la razón de la terminación: renuncia voluntaria, despido (con o sin justa causa), terminación de contrato a término fijo o mutuo acuerdo.
            </p>
          </div>
        </div>

        {/* Componentes de la liquidación */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="list" className="w-5 h-5" weight="fill" />
            </span>
            ¿Qué conceptos incluye la liquidación?
          </h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
              <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">1. Prima de servicios proporcional</p>
              <p className="text-xs leading-relaxed">Equivale a 15 días de salario por semestre. La fórmula es: <span className="font-mono bg-slate-50 dark:bg-slate-900 px-1 rounded">Prima = (Salario + Auxilio) × Días trabajados en el semestre ÷ 360</span>. Se calculan los días desde el 1 de enero o el 1 de julio hasta la fecha de retiro.</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
              <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">2. Cesantías proporcionales</p>
              <p className="text-xs leading-relaxed">Equivalen a un mes de salario por año trabajado. La fórmula es: <span className="font-mono bg-slate-50 dark:bg-slate-900 px-1 rounded">Cesantías = (Salario + Auxilio) × Días trabajados en el año ÷ 360</span>. Se calculan los días desde el 1 de enero (o fecha de ingreso) hasta la fecha de retiro.</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
              <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">3. Intereses sobre cesantías</p>
              <p className="text-xs leading-relaxed">Son el 12% anual sobre las cesantías causadas. La fórmula es: <span className="font-mono bg-slate-50 dark:bg-slate-900 px-1 rounded">Intereses = Cesantías × Días trabajados en el año × 0.12 ÷ 360</span>. Es dinero adicional que se te paga directamente a ti.</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
              <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">4. Vacaciones no disfrutadas</p>
              <p className="text-xs leading-relaxed">Tienes derecho a 15 días hábiles de vacaciones por cada año trabajado. Si no las tomaste, te las pagan en dinero. La fórmula es: <span className="font-mono bg-slate-50 dark:bg-slate-900 px-1 rounded">Vacaciones = Salario × Días pendientes ÷ 30</span>. Las vacaciones se calculan solo sobre el salario, sin auxilio de transporte.</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl ring-1 ring-red-200 dark:ring-red-800">
              <p className="font-bold text-red-700 dark:text-red-300 mb-1">5. Indemnización por despido sin justa causa</p>
              <p className="text-xs leading-relaxed text-red-600 dark:text-red-400">Solo aplica cuando el empleador termina el contrato sin justa causa. Para contratos indefinidos con salario hasta 10 SMMLV: 30 días por el primer año + 20 días por cada año adicional. Para salarios superiores a 10 SMMLV: 20 días por el primer año + 15 días por cada año adicional.</p>
            </div>
          </div>
        </div>

        {/* Ejemplo práctico */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="calculator" className="w-5 h-5" weight="fill" />
            </span>
            Ejemplo: liquidación con salario mínimo y 2 años trabajados
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Supongamos que ganas {formatMoney(SMMLV)} (1 SMMLV) con auxilio de transporte de {formatMoney(AUXILIO_TRANSPORTE)}, y renuncias después de exactamente 2 años (del 1 de enero de 2024 al 31 de diciembre de 2025):
            </p>
            <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-mono text-xs">
              <div className="flex justify-between"><span>Prima (180 días del semestre)</span><span className="text-slate-700 dark:text-slate-300">{formatMoney((SMMLV + AUXILIO_TRANSPORTE) * 180 / 360)}</span></div>
              <div className="flex justify-between"><span>Cesantías (360 días del año)</span><span className="text-slate-700 dark:text-slate-300">{formatMoney(SMMLV + AUXILIO_TRANSPORTE)}</span></div>
              <div className="flex justify-between"><span>Intereses sobre cesantías (12%)</span><span className="text-slate-700 dark:text-slate-300">{formatMoney((SMMLV + AUXILIO_TRANSPORTE) * 0.12)}</span></div>
              <div className="flex justify-between"><span>Vacaciones (30 días pendientes)</span><span className="text-slate-700 dark:text-slate-300">{formatMoney(SMMLV)}</span></div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-teal-600">
                <span>Total liquidación</span>
                <span>{formatMoney((SMMLV + AUXILIO_TRANSPORTE) * 180 / 360 + (SMMLV + AUXILIO_TRANSPORTE) + (SMMLV + AUXILIO_TRANSPORTE) * 0.12 + SMMLV)}</span>
              </div>
            </div>
            <p>
              Este es un ejemplo simplificado. En la práctica, las fechas exactas, los días de vacaciones ya tomados y los cambios de salario afectan el cálculo. Usa la calculadora de arriba para un resultado preciso con tus datos reales.
            </p>
          </div>
        </div>

        {/* Tipos de terminación */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="info" className="w-5 h-5" weight="fill" />
            </span>
            ¿Cómo cambia la liquidación según el tipo de terminación?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Renuncia voluntaria</p>
                <p className="text-xs mt-1">Recibes prima, cesantías, intereses y vacaciones. No hay indemnización. Debes dar preaviso de 30 días (aunque no es obligatorio legalmente, es una buena práctica).</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Despido sin justa causa</p>
                <p className="text-xs mt-1">Recibes todo lo anterior MÁS la indemnización. Es el escenario más favorable económicamente para el trabajador. La indemnización depende del tipo de contrato y del tiempo trabajado.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Despido con justa causa</p>
                <p className="text-xs mt-1">Recibes prima, cesantías, intereses y vacaciones. No hay indemnización. Las causas justas están definidas en el artículo 62 del CST (faltas graves, bajo rendimiento comprobado, etc.).</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Fin de contrato a término fijo</p>
                <p className="text-xs mt-1">Recibes prima, cesantías, intereses y vacaciones. Si el empleador no renueva y no avisa con 30 días de anticipación, se considera prórroga automática y podría haber indemnización.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Consejos importantes */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center text-amber-600">
              <Icon name="warning" className="w-5 h-5" weight="fill" />
            </span>
            Consejos al recibir tu liquidación
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Revisa cada concepto:</strong> compara lo que te pagaron con lo que calculaste. Muchos empleadores cometen errores (a veces intencionales) en el cálculo de cesantías o vacaciones.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">No firmes sin leer:</strong> el documento de liquidación detalla cada pago. Si no estás de acuerdo con algún valor, puedes firmar con una nota de &quot;no conforme&quot; y reclamar después.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Plazo para reclamar:</strong> tienes 3 años para reclamar derechos laborales ante un juez. Después de este plazo, prescriben.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Sanción por mora:</strong> si tu empleador no te paga la liquidación a tiempo, puedes reclamar la sanción moratoria (1 día de salario por cada día de retraso).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <CalculatorFooter href="/finanzas/calculadora-liquidacion" />
    </div>
  );
}
