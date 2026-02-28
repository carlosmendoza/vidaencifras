"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/lib/icons";
import { calcularSalarioNeto, type SalarioNetoOutput } from "@/lib/calculadoras";
import { SMMLV, AUXILIO_TRANSPORTE, TOPE_AUXILIO, UVT_2026 } from "@/lib/calculadoras/constantes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useUrlState } from "@/hooks/useUrlState";
import { ResultWithMascot } from "@/components/ResultWithMascot";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";

export default function CalculadoraSalarioNeto() {
  const { values, setField, hadInitialParams } = useUrlState(
    { salario: "", incluyeTransporte: "true", mostrarRetencion: "false", dependientes: "0", medicinaPrepagada: "", interesesVivienda: "", aportesAfc: "" },
    { paramNames: { incluyeTransporte: "transporte", mostrarRetencion: "retencion", medicinaPrepagada: "medicina", interesesVivienda: "vivienda" } }
  );
  const [resultado, setResultado] = useState<SalarioNetoOutput | null>(null);

  const UVT = UVT_2026;

  const salarioNum = parseFloat(values.salario) || 0;
  const aplicaAuxilio = !salarioNum || salarioNum <= TOPE_AUXILIO;

  // Verificar si podría aplicar retención (sin deducciones adicionales)
  const podriaAplicarRetencion = (() => {
    if (!salarioNum) return false;
    const fondoSol = salarioNum >= SMMLV * 16 ? 0.02 : salarioNum >= SMMLV * 4 ? 0.01 : 0;
    const ingreso = salarioNum * (1 - 0.08 - fondoSol);
    const exenta = Math.min(ingreso * 0.25, 240 * UVT);
    return ingreso - exenta > 95 * UVT;
  })();

  const calcular = () => {
    const res = calcularSalarioNeto({
      salario: parseFloat(values.salario),
      incluyeTransporte: aplicaAuxilio && values.incluyeTransporte === "true",
      calcularRetencion: podriaAplicarRetencion && values.mostrarRetencion === "true",
      dependientes: parseInt(values.dependientes) || 0,
      medicinaPrepagada: parseFloat(values.medicinaPrepagada) || 0,
      interesesVivienda: parseFloat(values.interesesVivienda) || 0,
      aportesAfc: parseFloat(values.aportesAfc) || 0,
    });
    if (res) setResultado(res);
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hadInitialParams]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const salarioRapido = [SMMLV, SMMLV * 2, SMMLV * 3, SMMLV * 4];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <CalculatorHeader title="Calculadora de Salario Neto" subtitle="¿Cuánto recibes realmente? Colombia 2026" icon="banknote" gradient="finanzas" />

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
              <CurrencyInput
                value={values.salario}
                onChange={(v) => setField("salario", v)}
                locale="es-CO"
                placeholder="2.500.000"
                className="w-full pl-10 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            {/* Botones rápidos */}
            <div className="flex flex-wrap gap-2">
              {salarioRapido.map((s) => (
                <button
                  key={s}
                  onClick={() => setField("salario", s.toString())}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    values.salario === s.toString()
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {`${s / SMMLV} SMMLV`}
                </button>
              ))}
            </div>
          </div>

          {/* Auxilio de transporte — solo aplica hasta 2 SMMLV */}
          {aplicaAuxilio && (
            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <button
                onClick={() => setField("incluyeTransporte", values.incluyeTransporte === "true" ? "false" : "true")}
                className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors ${
                  values.incluyeTransporte === "true" ? "bg-teal-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    values.incluyeTransporte === "true" ? "translate-x-5" : "translate-x-0"
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
          )}

          {/* Retención en la fuente — solo cuando el salario es suficientemente alto */}
          {podriaAplicarRetencion && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl space-y-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => setField("mostrarRetencion", values.mostrarRetencion === "true" ? "false" : "true")}
                  className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors ${
                    values.mostrarRetencion === "true" ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      values.mostrarRetencion === "true" ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Calcular retención en la fuente
                  </span>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Tu salario supera el umbral de 95 UVT gravables
                  </p>
                </div>
              </div>

              {values.mostrarRetencion === "true" && (
                <div className="space-y-4 pt-2 border-t border-amber-200 dark:border-amber-800">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    Deducciones para reducir retención
                  </p>

                  {/* Dependientes */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Dependientes económicos (0-4)
                    </label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((n) => (
                        <button
                          key={n}
                          onClick={() => setField("dependientes", n.toString())}
                          className={`w-10 h-10 rounded-xl font-bold transition-all ${
                            values.dependientes === n.toString()
                              ? "bg-amber-500 text-white shadow-lg"
                              : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-100"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      Hijos menores, cónyuge sin ingresos, padres dependientes
                    </p>
                  </div>

                  {/* Medicina prepagada */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Medicina prepagada (mensual)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <CurrencyInput
                        value={values.medicinaPrepagada}
                        onChange={(v) => setField("medicinaPrepagada", v)}
                        locale="es-CO"
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* Intereses vivienda */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Intereses crédito vivienda (mensual)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <CurrencyInput
                        value={values.interesesVivienda}
                        onChange={(v) => setField("interesesVivienda", v)}
                        locale="es-CO"
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* AFC */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Aportes AFC/FVP (mensual)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <CurrencyInput
                        value={values.aportesAfc}
                        onChange={(v) => setField("aportesAfc", v)}
                        locale="es-CO"
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      Ahorro en Fondo de Cesantías o Pensión Voluntaria
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={calcular}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.99]"
          >
            Calcular salario neto
          </button>

          {resultado && (
            <ResultWithMascot>
            <div className="mt-8 space-y-4">
              {/* Resultado principal */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl text-center ring-1 ring-teal-100 dark:ring-teal-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">
                  Recibes mensualmente
                </p>
                <p className="text-5xl md:text-6xl font-black text-teal-600 dark:text-teal-400 tracking-tighter">
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

                  {resultado.retencionFuente > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Retención en la fuente</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        -{formatMoney(resultado.retencionFuente)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Total descuentos</span>
                    <span className="font-black text-rose-600 dark:text-rose-400">
                      -{formatMoney(resultado.totalDescuentos)}
                    </span>
                  </div>

                  <div className="border-t-2 border-teal-200 dark:border-teal-800 pt-3 flex justify-between items-center">
                    <span className="font-black text-slate-800 dark:text-slate-100">SALARIO NETO</span>
                    <span className="font-black text-xl text-teal-600 dark:text-teal-400">
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
                <div className="p-4 bg-teal-50 dark:bg-teal-950/50 rounded-2xl text-center">
                  <p className="text-2xl font-black text-teal-600 dark:text-teal-400">
                    {(100 - (resultado.totalDescuentos / resultado.salarioBruto) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs font-bold text-slate-400">recibes</p>
                </div>
              </div>

              {/* Detalle retención en la fuente */}
              {podriaAplicarRetencion && values.mostrarRetencion === "true" && (
                <div className="p-6 bg-amber-50 dark:bg-amber-950/30 rounded-2xl ring-1 ring-amber-200 dark:ring-amber-800">
                  <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
                    <Icon name="bar-chart" className="w-5 h-5" weight="fill" /> Cálculo de retención en la fuente
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ingreso laboral (después de aportes)</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {formatMoney(resultado.salarioBruto - resultado.descuentoSalud - resultado.descuentoPension - resultado.fondoSolidaridad)}
                      </span>
                    </div>
                    {resultado.deducciones > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">- Deducciones (dependientes, medicina, etc.)</span>
                        <span className="font-medium text-amber-600">
                          -{formatMoney(resultado.deducciones)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">- Renta exenta 25%</span>
                      <span className="font-medium text-amber-600">
                        -{formatMoney(resultado.rentaExenta)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-amber-200 dark:border-amber-800">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Base gravable</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {formatMoney(resultado.baseGravable)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">Base en UVT ({formatMoney(UVT)}/UVT)</span>
                      <span className="text-xs text-slate-400">
                        {(resultado.baseGravable / UVT).toFixed(2)} UVT
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-amber-200 dark:border-amber-800">
                      <span className="font-black text-amber-700 dark:text-amber-400">Retención en la fuente</span>
                      <span className="font-black text-amber-700 dark:text-amber-400">
                        {formatMoney(resultado.retencionFuente)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Contenido educativo SEO */}
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ¿Cómo se calcula? */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            ¿Cómo se calcula el salario neto en Colombia?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              El <strong className="text-slate-700 dark:text-slate-300">salario neto</strong> es el dinero que realmente recibes en tu cuenta cada mes, después de que tu empleador descuenta los aportes obligatorios por ley. En Colombia, la fórmula básica es:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-mono text-center text-slate-700 dark:text-slate-300">
              Salario Neto = Salario Bruto + Auxilio de Transporte − Descuentos Obligatorios
            </div>
            <p>
              Los descuentos obligatorios que se aplican a todo trabajador con contrato laboral en Colombia son el aporte a <strong className="text-slate-700 dark:text-slate-300">salud (4%)</strong> y el aporte a <strong className="text-slate-700 dark:text-slate-300">pensión (4%)</strong>, calculados sobre el salario básico mensual (sin incluir el auxilio de transporte). Si tu salario supera los 4 SMMLV, se suma un descuento adicional por el Fondo de Solidaridad Pensional.
            </p>
          </div>
        </div>

        {/* Descuentos paso a paso */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
              <Icon name="list" className="w-5 h-5" weight="fill" />
            </span>
            Descuentos obligatorios de nómina en Colombia 2026
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Todo empleado con contrato laboral tiene los siguientes descuentos en su nómina mensual. Estos porcentajes se calculan sobre el <strong className="text-slate-700 dark:text-slate-300">salario básico</strong>, no sobre el total devengado:
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Aporte a Salud</p>
                  <span className="text-teal-600 dark:text-teal-400 font-black">4%</span>
                </div>
                <p className="text-xs">Del total del 12.5%, tú pagas 4% y tu empleador paga 8.5%. Este aporte financia tu EPS (Entidad Promotora de Salud) y te da derecho a atención médica, medicamentos y procedimientos.</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Aporte a Pensión</p>
                  <span className="text-teal-600 dark:text-teal-400 font-black">4%</span>
                </div>
                <p className="text-xs">Del total del 16%, tú pagas 4% y tu empleador paga 12%. Este dinero va a tu fondo de pensiones (Colpensiones o un fondo privado como Porvenir, Protección, Colfondos o Skandia).</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Fondo de Solidaridad Pensional</p>
                  <span className="text-amber-600 dark:text-amber-400 font-black">1% - 2%</span>
                </div>
                <p className="text-xs">Solo aplica si ganas 4 SMMLV o más ({formatMoney(SMMLV * 4)} en 2026). Es 1% para salarios entre 4 y 16 SMMLV, y 2% para salarios superiores a 16 SMMLV. Financia pensiones de adultos mayores en situación de pobreza.</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Retención en la Fuente</p>
                  <span className="text-amber-600 dark:text-amber-400 font-black">Variable</span>
                </div>
                <p className="text-xs">Es un anticipo del impuesto de renta que te descuentan mensualmente. Solo aplica si tu ingreso gravable supera las 95 UVT ({formatMoney(95 * UVT)}). Se puede reducir con deducciones como dependientes, medicina prepagada e intereses de vivienda.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ejemplo práctico */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
              <Icon name="calculator" className="w-5 h-5" weight="fill" />
            </span>
            Ejemplo: salario neto con 1 SMMLV en 2026
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Si ganas el salario mínimo mensual legal vigente de <strong className="text-slate-700 dark:text-slate-300">{formatMoney(SMMLV)}</strong>, tu nómina se calcula así:
            </p>
            <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-mono text-xs">
              <div className="flex justify-between"><span>Salario bruto</span><span className="text-slate-700 dark:text-slate-300">{formatMoney(SMMLV)}</span></div>
              <div className="flex justify-between text-emerald-600"><span>+ Auxilio de transporte</span><span>{formatMoney(AUXILIO_TRANSPORTE)}</span></div>
              <div className="flex justify-between text-rose-600"><span>− Salud (4%)</span><span>−{formatMoney(SMMLV * 0.04)}</span></div>
              <div className="flex justify-between text-rose-600"><span>− Pensión (4%)</span><span>−{formatMoney(SMMLV * 0.04)}</span></div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-teal-600">
                <span>= Salario neto</span>
                <span>{formatMoney(SMMLV + AUXILIO_TRANSPORTE - SMMLV * 0.04 - SMMLV * 0.04)}</span>
              </div>
            </div>
            <p>
              Con salario mínimo, los descuentos totales representan el 8% de tu salario básico. El auxilio de transporte no tiene descuentos y se suma íntegro. Esto significa que recibes el <strong className="text-slate-700 dark:text-slate-300">92%</strong> de tu salario más el auxilio completo.
            </p>
          </div>
        </div>

        {/* Auxilio de transporte */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
              <Icon name="truck" className="w-5 h-5" weight="fill" />
            </span>
            ¿Quién recibe auxilio de transporte en 2026?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              El auxilio de transporte de <strong className="text-slate-700 dark:text-slate-300">{formatMoney(AUXILIO_TRANSPORTE)}</strong> aplica para trabajadores que ganan hasta 2 SMMLV (<strong className="text-slate-700 dark:text-slate-300">{formatMoney(TOPE_AUXILIO)}</strong>). Si ganas más de este monto, no recibes auxilio de transporte.
            </p>
            <p>
              Es importante saber que el auxilio de transporte <strong className="text-slate-700 dark:text-slate-300">no es salario</strong>, pero sí se incluye en la base para calcular prestaciones sociales como prima de servicios y cesantías. No se le descuenta salud ni pensión.
            </p>
            <p>
              Si trabajas desde casa (teletrabajo o trabajo remoto), tu empleador puede optar por no pagarte auxilio de transporte, ya que no incurres en gastos de desplazamiento. Sin embargo, muchas empresas lo mantienen como beneficio.
            </p>
          </div>
        </div>

        {/* Aportes del empleador */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
              <Icon name="info" className="w-5 h-5" weight="fill" />
            </span>
            ¿Cuánto paga tu empleador por ti?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Además de tu salario, tu empleador asume costos adicionales que no aparecen en tu nómina pero que son parte de tu compensación total:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Salud</p>
                <p className="text-xs">8.5% del salario</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Pensión</p>
                <p className="text-xs">12% del salario</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">ARL</p>
                <p className="text-xs">0.52% - 6.96% (según riesgo)</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="font-bold text-slate-700 dark:text-slate-300">Parafiscales</p>
                <p className="text-xs">9% (SENA 2%, ICBF 3%, CCF 4%)</p>
              </div>
            </div>
            <p>
              Esto significa que por cada {formatMoney(1000000)} que ganas, tu empleador paga aproximadamente {formatMoney(300000)} adicionales en aportes. Si sumas prestaciones sociales (prima, cesantías, vacaciones), el costo total del empleador es entre un <strong className="text-slate-700 dark:text-slate-300">45% y 55%</strong> adicional sobre tu salario bruto.
            </p>
          </div>
        </div>

        {/* Diferencia bruto vs neto */}
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600">
              <Icon name="bar-chart" className="w-5 h-5" weight="fill" />
            </span>
            Salario bruto vs. salario neto: ¿cuál es la diferencia?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Cuando te ofrecen un empleo en Colombia, el salario que te mencionan suele ser el <strong className="text-slate-700 dark:text-slate-300">salario bruto</strong> (antes de descuentos). Es fundamental que entiendas la diferencia para no llevarte sorpresas con tu primer pago:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Salario bruto:</strong> es el valor pactado en tu contrato laboral, antes de cualquier descuento. Es la base para calcular aportes y prestaciones.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Salario neto:</strong> es lo que realmente llega a tu cuenta bancaria cada mes, después de descontar salud, pensión, fondo de solidaridad y retención en la fuente (si aplica).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span><strong className="text-slate-700 dark:text-slate-300">Total devengado:</strong> incluye el salario bruto más otros pagos como auxilio de transporte, horas extras, comisiones y bonificaciones.</span>
              </li>
            </ul>
            <p>
              Cuando negocies tu salario, siempre pregunta si el valor ofrecido es bruto o neto. Usa esta calculadora para saber exactamente cuánto recibirás con un salario bruto determinado.
            </p>
          </div>
        </div>
      </div>

      <CalculatorFooter href="/finanzas/calculadora-salario-neto" />
    </div>
  );
}
