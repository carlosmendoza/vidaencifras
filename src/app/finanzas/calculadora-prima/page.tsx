"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/lib/icons";
import { calcularPrima, type PeriodoPrima } from "@/lib/calculadoras";
import { AUXILIO_TRANSPORTE, SMMLV, TOPE_AUXILIO } from "@/lib/calculadoras/constantes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useUrlState } from "@/hooks/useUrlState";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";

export default function CalculadoraPrima() {
  useCalculatorTracking();
  const { values, setField } = useUrlState(
    { salario: "", incluyeTransporte: "true", fechaIngreso: "", periodo: "junio" },
    { paramNames: { incluyeTransporte: "transporte", fechaIngreso: "ingreso" } }
  );

  const salarioNum = parseFloat(values.salario) || 0;

  const resultado = salarioNum > 0 ? calcularPrima({
    salario: salarioNum,
    incluyeTransporte: values.incluyeTransporte === "true",
    fechaIngreso: values.fechaIngreso || undefined,
    periodo: values.periodo as PeriodoPrima,
  }) : null;

  const aplicaAuxilio = resultado?.aplicaAuxilio ?? false;
  const salarioBase = resultado?.salarioBase ?? salarioNum;
  const diasTrabajados = resultado?.diasTrabajados ?? 180;
  const prima = resultado?.prima ?? 0;

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <CalculatorHeader title="Calculadora de Prima de Servicios" subtitle="Calcula tu prima de junio y diciembre 2026" icon="gift" gradient="finanzas" />

        <div className="space-y-6">
          {/* Periodo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Qué prima quieres calcular?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setField("periodo", "junio")}
                className={`px-4 py-4 rounded-2xl font-semibold transition-colors ${
                  values.periodo === "junio"
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <span className="block text-lg">Junio</span>
                <span className="text-xs opacity-80">Ene - Jun</span>
              </button>
              <button
                onClick={() => setField("periodo", "diciembre")}
                className={`px-4 py-4 rounded-2xl font-semibold transition-colors ${
                  values.periodo === "diciembre"
                    ? "bg-teal-500 text-white"
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
              <CurrencyInput
                value={values.salario}
                onChange={(v) => setField("salario", v)}
                locale="es-CO"
                placeholder="1.300.000"
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
              value={values.fechaIngreso}
              onChange={(e) => setField("fechaIngreso", e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <p className="text-xs text-slate-400 ml-1">
              Déjalo vacío si trabajaste todo el semestre
            </p>
          </div>

          {/* Resultado */}
          {salarioNum > 0 && (
            <div className="mt-8 space-y-4">
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Tu prima de {values.periodo}
                  </p>
                  <p className="text-4xl font-black text-teal-600 dark:text-teal-400">
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
                    <span className="font-bold text-teal-600 dark:text-teal-400">
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

      {/* Qué es la prima de servicios */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl space-y-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            ¿Qué es la prima de servicios en Colombia?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            La <strong>prima de servicios</strong> es una prestación social obligatoria que todo empleador debe pagar a sus trabajadores en Colombia. Está establecida en el <strong>artículo 306 del Código Sustantivo del Trabajo</strong> y equivale a <strong>30 días de salario por cada año trabajado</strong>, pagados en dos cuotas semestrales de 15 días cada una.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            En 2026, con un salario mínimo (SMMLV) de <strong>${formatMoney(SMMLV)}</strong> y un auxilio de transporte de <strong>${formatMoney(AUXILIO_TRANSPORTE)}</strong>, la prima por semestre para un trabajador con salario mínimo es de <strong>${formatMoney(Math.round((SMMLV + AUXILIO_TRANSPORTE) / 2))}</strong>.
          </p>
        </div>
      </div>

      {/* Cómo calcular la prima */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl space-y-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="calculator" className="w-5 h-5" />
            </span>
            ¿Cómo se calcula la prima de servicios 2026?
          </h2>

          <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl ring-1 ring-teal-100 dark:ring-teal-900">
            <h3 className="text-sm font-bold text-teal-700 dark:text-teal-400 mb-3 uppercase tracking-wide">Fórmula oficial</h3>
            <p className="text-center text-lg font-black text-slate-700 dark:text-slate-200">
              Prima = (Salario + Aux. Transporte) × Días trabajados ÷ 360
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Paso a paso</h3>
            <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="w-6 h-6 shrink-0 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span><strong>Suma tu salario mensual y el auxilio de transporte</strong> (si aplica). El auxilio solo se incluye si ganas hasta 2 SMMLV (${formatMoney(SMMLV * 2)} en 2026).</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 shrink-0 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span><strong>Multiplica por los días trabajados</strong> en el semestre. Si trabajaste todo el semestre, son 180 días. Si ingresaste después, cuenta desde tu fecha de ingreso.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 shrink-0 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span><strong>Divide entre 360</strong>. Este divisor es fijo por ley y corresponde a los días del año laboral.</span>
              </li>
            </ol>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">Ejemplo con salario mínimo 2026</h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Salario</span>
                <span className="font-semibold">${formatMoney(SMMLV)}</span>
              </div>
              <div className="flex justify-between">
                <span>+ Auxilio de transporte</span>
                <span className="font-semibold">${formatMoney(AUXILIO_TRANSPORTE)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                <span>= Base</span>
                <span className="font-bold">${formatMoney(SMMLV + AUXILIO_TRANSPORTE)}</span>
              </div>
              <div className="flex justify-between">
                <span>× 180 días ÷ 360</span>
                <span className="font-semibold">× 0.5</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                <span className="font-bold">Prima del semestre</span>
                <span className="font-black text-teal-600">${formatMoney(Math.round((SMMLV + AUXILIO_TRANSPORTE) / 2))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fechas de pago y quién tiene derecho */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl space-y-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="calendar" className="w-5 h-5" />
            </span>
            Fechas de pago de la prima 2026
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl ring-1 ring-teal-100 dark:ring-teal-900 text-center">
              <p className="text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-1">Prima de junio</p>
              <p className="text-2xl font-black text-slate-700 dark:text-slate-200">30 de junio</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Periodo: enero – junio</p>
            </div>
            <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl ring-1 ring-teal-100 dark:ring-teal-900 text-center">
              <p className="text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-1">Prima de diciembre</p>
              <p className="text-2xl font-black text-slate-700 dark:text-slate-200">20 de diciembre</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Periodo: julio – diciembre</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">¿Quiénes tienen derecho a la prima?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Sí tienen derecho</p>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-500">✓</span> Contrato a término fijo</li>
                <li className="flex gap-2"><span className="text-emerald-500">✓</span> Contrato a término indefinido</li>
                <li className="flex gap-2"><span className="text-emerald-500">✓</span> Empleadas domésticas</li>
                <li className="flex gap-2"><span className="text-emerald-500">✓</span> Trabajadores por días (proporcional)</li>
                <li className="flex gap-2"><span className="text-emerald-500">✓</span> En periodo de prueba</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wide">No tienen derecho</p>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex gap-2"><span className="text-red-500">✗</span> Prestación de servicios (OPS)</li>
                <li className="flex gap-2"><span className="text-red-500">✗</span> Contratistas independientes</li>
                <li className="flex gap-2"><span className="text-red-500">✗</span> Trabajadores con salario integral</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de referencia rápida */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl space-y-4">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="table" className="w-5 h-5" />
            </span>
            Prima de servicios 2026 según salario
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Referencia rápida para semestre completo (180 días trabajados):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Salario mensual</th>
                  <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Prima por semestre</th>
                  <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Prima anual</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                {[
                  { label: `1 SMMLV (${formatMoney(SMMLV)})`, salario: SMMLV, conAuxilio: true },
                  { label: `2 SMMLV (${formatMoney(SMMLV * 2)})`, salario: SMMLV * 2, conAuxilio: true },
                  { label: `3 SMMLV (${formatMoney(SMMLV * 3)})`, salario: SMMLV * 3, conAuxilio: false },
                  { label: `5 SMMLV (${formatMoney(SMMLV * 5)})`, salario: SMMLV * 5, conAuxilio: false },
                ].map((row) => {
                  const base = row.salario + (row.conAuxilio ? AUXILIO_TRANSPORTE : 0);
                  const primaSemestre = Math.round(base / 2);
                  return (
                    <tr key={row.label} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2">{row.label}</td>
                      <td className="py-2 text-right font-semibold">${formatMoney(primaSemestre)}</td>
                      <td className="py-2 text-right font-bold text-teal-600">${formatMoney(primaSemestre * 2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">
            * Los salarios de hasta 2 SMMLV incluyen auxilio de transporte (${formatMoney(AUXILIO_TRANSPORTE)}) en la base de cálculo.
          </p>
        </div>
      </div>

      {/* Consejos */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl space-y-4">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500">
              <Icon name="coin" className="w-5 h-5" weight="fill" />
            </span>
            ¿Qué hacer con tu prima de servicios?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-teal-50 dark:bg-teal-900/50 rounded-xl">
              <h3 className="font-bold text-teal-700 dark:text-teal-300 mb-2">Fondo de emergencia</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Si no tienes uno, destina al menos el 50% de tu prima para cubrir 3 a 6 meses de gastos básicos.
              </p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/50 rounded-xl">
              <h3 className="font-bold text-teal-700 dark:text-teal-300 mb-2">Pagar deudas caras</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Tarjetas de crédito o créditos de libre inversión con tasas altas. Abonar a capital te ahorra intereses.
              </p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/50 rounded-xl">
              <h3 className="font-bold text-teal-700 dark:text-teal-300 mb-2">Invertir</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Un CDT o cuenta de ahorro de alto rendimiento puede darte entre 10% y 12% EA sobre tu prima.
              </p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/50 rounded-xl">
              <h3 className="font-bold text-teal-700 dark:text-teal-300 mb-2">Educación</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Cursos, certificaciones o herramientas que aumenten tus ingresos futuros. La mejor inversión.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CalculatorFooter href="/finanzas/calculadora-prima" />
    </div>
  );
}
