"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Icon } from "@/lib/icons";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useUrlState } from "@/hooks/useUrlState";
import { ResultWithMascot } from "@/components/ResultWithMascot";

interface Resultado {
  valorBruto: number;
  valorNeto: number;
  horasTotales: number;
  gastosTotal: number;
  ingresoNeto: number;
  equivalencias: { nombre: string; cantidad: number; icon: string }[];
}

export default function ValorHoraPage() {
  const { moneda } = useCurrency();
  const { values, setField, hadInitialParams } = useUrlState(
    {
      tipoIngreso: "mensual",
      ingreso: "",
      horasSemana: "40",
      diasSemana: "5",
      tiempoTraslado: "",
      gastoTransporte: "",
      gastoComida: "",
      otrosGastos: "",
    },
    {
      paramNames: {
        tipoIngreso: "tipo",
        ingreso: "ing",
        horasSemana: "hs",
        diasSemana: "ds",
        tiempoTraslado: "tt",
        gastoTransporte: "gt",
        gastoComida: "gc",
        otrosGastos: "og",
      },
    }
  );
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    const ingresoNum = parseFloat(values.ingreso) || 0;
    const horasSemanales = parseFloat(values.horasSemana) || 40;
    const diasSemanales = parseFloat(values.diasSemana) || 5;
    const trasladoMin = parseFloat(values.tiempoTraslado) || 0;
    const transporteMes = parseFloat(values.gastoTransporte) || 0;
    const comidaMes = parseFloat(values.gastoComida) || 0;
    const otrosMes = parseFloat(values.otrosGastos) || 0;

    if (ingresoNum <= 0) return;

    // Calcular ingreso mensual
    const ingresoMensual = values.tipoIngreso === "anual" ? ingresoNum / 12 : ingresoNum;

    // Horas trabajadas al mes (aprox 4.33 semanas)
    const horasMes = horasSemanales * 4.33;

    // Tiempo de traslado mensual (ida y vuelta, por cada día trabajado)
    const trasladoHorasMes = (trasladoMin * 2 * diasSemanales * 4.33) / 60;

    // Total de horas invertidas en trabajo
    const horasTotales = horasMes + trasladoHorasMes;

    // Total gastos mensuales relacionados con trabajo
    const gastosTotal = transporteMes + comidaMes + otrosMes;

    // Ingreso neto (después de gastos)
    const ingresoNeto = ingresoMensual - gastosTotal;

    // Valor bruto (sin considerar gastos ni traslado)
    const valorBruto = ingresoMensual / horasMes;

    // Valor neto (considerando todo)
    const valorNeto = ingresoNeto / horasTotales;

    // Equivalencias basadas en el valor de la hora
    const equivalencias = calcularEquivalencias(valorNeto, moneda.codigo);

    setResultado({
      valorBruto,
      valorNeto,
      horasTotales,
      gastosTotal,
      ingresoNeto,
      equivalencias,
    });
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams]);

  const calcularEquivalencias = (valorHora: number, monedaCodigo: string) => {
    // Precios aproximados por país
    const precios: Record<string, { cafe: number; netflix: number; cine: number; almuerzo: number; uber5km: number }> = {
      COP: { cafe: 6000, netflix: 27000, cine: 18000, almuerzo: 18000, uber5km: 12000 },
      MXN: { cafe: 60, netflix: 199, cine: 100, almuerzo: 120, uber5km: 80 },
      ARS: { cafe: 2500, netflix: 4299, cine: 4000, almuerzo: 5000, uber5km: 3000 },
      USD: { cafe: 5, netflix: 15, cine: 15, almuerzo: 15, uber5km: 12 },
      EUR: { cafe: 3, netflix: 13, cine: 12, almuerzo: 15, uber5km: 10 },
    };

    const p = precios[monedaCodigo] || precios.COP;

    return [
      { nombre: "cafes", cantidad: valorHora / p.cafe, icon: "coffee" },
      { nombre: "meses de Netflix", cantidad: valorHora / p.netflix, icon: "tv" },
      { nombre: "entradas de cine", cantidad: valorHora / p.cine, icon: "monitor" },
      { nombre: "almuerzos", cantidad: valorHora / p.almuerzo, icon: "utensils" },
      { nombre: "viajes en Uber (5km)", cantidad: valorHora / p.uber5km, icon: "car" },
    ];
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDecimal = (num: number) => {
    if (num >= 1) {
      return num.toFixed(1);
    }
    return num.toFixed(2);
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-orange-500/5">
        <CalculatorHeader title="Valor de tu Hora" subtitle="Descubre cuánto vale realmente una hora de tu tiempo" icon="gem" gradient="productividad" />

        <div className="space-y-6">
          {/* Tipo de ingreso */}
          <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setField("tipoIngreso", "mensual")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${values.tipoIngreso === "mensual"
                ? "bg-orange-500 text-white"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
            >
              Ingreso mensual
            </button>
            <button
              onClick={() => setField("tipoIngreso", "anual")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${values.tipoIngreso === "anual"
                ? "bg-orange-500 text-white"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
            >
              Ingreso anual
            </button>
          </div>

          {/* Ingreso */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Tu ingreso {values.tipoIngreso}
              </label>
              <CurrencySelector colorClass="orange" />
            </div>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                {moneda.simbolo}
              </span>
              <CurrencyInput
                value={values.ingreso}
                onChange={(v) => setField("ingreso", v)}
                placeholder={values.tipoIngreso === "mensual" ? "3.500.000" : "42.000.000"}
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          </div>

          {/* Horas por semana */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Horas por semana
              </label>
              <input
                type="number"
                value={values.horasSemana}
                onChange={(e) => setField("horasSemana", e.target.value)}
                placeholder="40"
                className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Días por semana
              </label>
              <input
                type="number"
                value={values.diasSemana}
                onChange={(e) => setField("diasSemana", e.target.value)}
                placeholder="5"
                className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          </div>

          {/* Tiempo de traslado */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tiempo de traslado (solo ida, en minutos)
            </label>
            <input
              type="number"
              value={values.tiempoTraslado}
              onChange={(e) => setField("tiempoTraslado", e.target.value)}
              placeholder="30"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <div className="flex gap-2 flex-wrap">
              {[15, 30, 45, 60, 90].map((m) => (
                <button
                  key={m}
                  onClick={() => setField("tiempoTraslado", m.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${values.tiempoTraslado === m.toString()
                    ? "bg-orange-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>

          {/* Gastos mensuales */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Gastos mensuales relacionados con el trabajo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-xs text-slate-500 dark:text-slate-400 ml-1">
                  Transporte
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    {moneda.simbolo}
                  </span>
                  <CurrencyInput
                    value={values.gastoTransporte}
                    onChange={(v) => setField("gastoTransporte", v)}
                    placeholder="200.000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-slate-500 dark:text-slate-400 ml-1">
                  Comida
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    {moneda.simbolo}
                  </span>
                  <CurrencyInput
                    value={values.gastoComida}
                    onChange={(v) => setField("gastoComida", v)}
                    placeholder="300.000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-slate-500 dark:text-slate-400 ml-1">
                  Otros
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    {moneda.simbolo}
                  </span>
                  <CurrencyInput
                    value={values.otrosGastos}
                    onChange={(v) => setField("otrosGastos", v)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.99]"
          >
            Calcular valor de mi hora
          </button>

          {resultado && (
            <ResultWithMascot>
            <div className="mt-10 space-y-6">
              {/* Resultado principal */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-4 md:p-6 bg-orange-50 dark:bg-orange-950/50 rounded-3xl ring-1 ring-orange-100 dark:ring-orange-900 text-center">
                  <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Valor bruto
                  </p>
                  <p className="text-xl md:text-3xl font-black text-orange-600">
                    {moneda.simbolo}{formatMoney(resultado.valorBruto)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">por hora</p>
                </div>
                <div className="p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl ring-1 ring-emerald-100 dark:ring-emerald-900 text-center">
                  <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Valor neto real
                  </p>
                  <p className="text-xl md:text-3xl font-black text-emerald-600">
                    {moneda.simbolo}{formatMoney(resultado.valorNeto)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">por hora</p>
                </div>
              </div>

              {/* Desglose */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-3">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">
                  Desglose mensual
                </h3>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Horas de trabajo + traslado</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {resultado.horasTotales.toFixed(1)} horas
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gastos laborales</span>
                  <span className="font-semibold text-red-500">
                    -{moneda.simbolo}{formatMoney(resultado.gastosTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Ingreso neto efectivo</span>
                  <span className="font-bold text-emerald-600">
                    {moneda.simbolo}{formatMoney(resultado.ingresoNeto)}
                  </span>
                </div>
              </div>

              {/* Equivalencias */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-700 dark:text-slate-300">
                  1 hora de tu trabajo equivale a...
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {resultado.equivalencias.map((eq) => (
                    <div
                      key={eq.nombre}
                      className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center"
                    >
                      <Icon name={eq.icon} className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <p className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">
                        {formatDecimal(eq.cantidad)}
                      </p>
                      <p className="text-xs text-slate-500">{eq.nombre}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflexión */}
              <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  <strong>Piénsalo así:</strong> Cada vez que gastas{" "}
                  {moneda.simbolo}{formatMoney(resultado.valorNeto)}, estás intercambiando
                  una hora de tu vida por ello. ¿Vale la pena?
                </p>
              </div>
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Icon name="lightbulb" className="w-6 h-6" weight="fill" />
            </span>
            Cómo usar el valor de tu hora
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>Delegar tareas:</strong> Si pagar por un servicio cuesta menos que el valor
                de tu hora, probablemente vale la pena delegarlo.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>Negociar salario:</strong> Conocer tu tarifa real te ayuda a negociar
                aumentos o evaluar ofertas laborales.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>Freelance:</strong> Usa el valor neto como base para establecer tus
                tarifas, añadiendo un margen por impuestos e imprevistos.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>Compras conscientes:</strong> Antes de comprar algo, piensa cuántas horas
                de trabajo representa.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <CalculatorFooter href="/productividad/valor-hora" />
    </div>
  );
}
