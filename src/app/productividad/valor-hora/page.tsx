"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";

const faqs = [
  {
    question: "¿Por qué es importante conocer el valor de mi hora?",
    answer:
      "Conocer el valor de tu hora te ayuda a tomar mejores decisiones sobre cómo invertir tu tiempo. Puedes evaluar si vale la pena hacer algo tú mismo o delegarlo, y establecer tarifas justas si eres freelancer o independiente.",
  },
  {
    question: "¿Qué gastos debo incluir en el cálculo?",
    answer:
      "Incluye todos los gastos asociados a trabajar: transporte (gasolina, pasajes, parqueadero), comida fuera de casa, ropa de trabajo, y el tiempo de traslado. Estos costos reducen tu ingreso real por hora.",
  },
  {
    question: "¿Cómo uso el valor de mi hora para tomar decisiones?",
    answer:
      "Si tu hora vale $50.000 y un servicio de aseo cobra $40.000 por 2 horas de trabajo, te conviene contratarlo y usar ese tiempo para trabajar o descansar. Aplica esta lógica a cualquier decisión de tiempo vs dinero.",
  },
  {
    question: "¿El valor bruto y neto de la hora son muy diferentes?",
    answer:
      "Sí, pueden diferir bastante. El valor bruto solo considera salario/horas. El valor neto descuenta gastos laborales y cuenta el tiempo total invertido (incluyendo traslados), dando una imagen más realista.",
  },
];

interface Resultado {
  valorBruto: number;
  valorNeto: number;
  horasTotales: number;
  gastosTotal: number;
  ingresoNeto: number;
  equivalencias: { nombre: string; cantidad: number; emoji: string }[];
}

export default function ValorHoraPage() {
  const { moneda } = useCurrency();
  const [tipoIngreso, setTipoIngreso] = useState<"mensual" | "anual">("mensual");
  const [ingreso, setIngreso] = useState("");
  const [horasSemana, setHorasSemana] = useState("40");
  const [diasSemana, setDiasSemana] = useState("5");
  const [tiempoTraslado, setTiempoTraslado] = useState("");
  const [gastoTransporte, setGastoTransporte] = useState("");
  const [gastoComida, setGastoComida] = useState("");
  const [otrosGastos, setOtrosGastos] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    const ingresoNum = parseFloat(ingreso) || 0;
    const horasSemanales = parseFloat(horasSemana) || 40;
    const diasSemanales = parseFloat(diasSemana) || 5;
    const trasladoMin = parseFloat(tiempoTraslado) || 0;
    const transporteMes = parseFloat(gastoTransporte) || 0;
    const comidaMes = parseFloat(gastoComida) || 0;
    const otrosMes = parseFloat(otrosGastos) || 0;

    if (ingresoNum <= 0) return;

    // Calcular ingreso mensual
    const ingresoMensual = tipoIngreso === "anual" ? ingresoNum / 12 : ingresoNum;

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
      { nombre: "cafés", cantidad: valorHora / p.cafe, emoji: "☕" },
      { nombre: "meses de Netflix", cantidad: valorHora / p.netflix, emoji: "📺" },
      { nombre: "entradas de cine", cantidad: valorHora / p.cine, emoji: "🎬" },
      { nombre: "almuerzos", cantidad: valorHora / p.almuerzo, emoji: "🍽️" },
      { nombre: "viajes en Uber (5km)", cantidad: valorHora / p.uber5km, emoji: "🚗" },
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
      <Link
        href="/productividad"
        className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Productividad
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-amber-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            💎
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Valor de tu Hora
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Descubre cuánto vale realmente una hora de tu tiempo
          </p>
        </div>

        <div className="space-y-6">
          {/* Tipo de ingreso */}
          <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTipoIngreso("mensual")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                tipoIngreso === "mensual"
                  ? "bg-amber-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              Ingreso mensual
            </button>
            <button
              onClick={() => setTipoIngreso("anual")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                tipoIngreso === "anual"
                  ? "bg-amber-500 text-white"
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
                Tu ingreso {tipoIngreso}
              </label>
              <CurrencySelector colorClass="amber" />
            </div>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                {moneda.simbolo}
              </span>
              <input
                type="number"
                value={ingreso}
                onChange={(e) => setIngreso(e.target.value)}
                placeholder={tipoIngreso === "mensual" ? "3.500.000" : "42.000.000"}
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
                value={horasSemana}
                onChange={(e) => setHorasSemana(e.target.value)}
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
                value={diasSemana}
                onChange={(e) => setDiasSemana(e.target.value)}
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
              value={tiempoTraslado}
              onChange={(e) => setTiempoTraslado(e.target.value)}
              placeholder="30"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <div className="flex gap-2 flex-wrap">
              {[15, 30, 45, 60, 90].map((m) => (
                <button
                  key={m}
                  onClick={() => setTiempoTraslado(m.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    tiempoTraslado === m.toString()
                      ? "bg-amber-500 text-white"
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
                  <input
                    type="number"
                    value={gastoTransporte}
                    onChange={(e) => setGastoTransporte(e.target.value)}
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
                  <input
                    type="number"
                    value={gastoComida}
                    onChange={(e) => setGastoComida(e.target.value)}
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
                  <input
                    type="number"
                    value={otrosGastos}
                    onChange={(e) => setOtrosGastos(e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.99]"
          >
            Calcular valor de mi hora
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              {/* Resultado principal */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-3xl ring-1 ring-amber-100 dark:ring-amber-900 text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Valor bruto
                  </p>
                  <p className="text-3xl font-black text-amber-600">
                    {moneda.simbolo}{formatMoney(resultado.valorBruto)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">por hora</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl ring-1 ring-emerald-100 dark:ring-emerald-900 text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Valor neto real
                  </p>
                  <p className="text-3xl font-black text-emerald-600">
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
                      <span className="text-2xl">{eq.emoji}</span>
                      <p className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">
                        {formatDecimal(eq.cantidad)}
                      </p>
                      <p className="text-xs text-slate-500">{eq.nombre}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflexión */}
              <div className="p-6 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Piénsalo así:</strong> Cada vez que gastas{" "}
                  {moneda.simbolo}{formatMoney(resultado.valorNeto)}, estás intercambiando
                  una hora de tu vida por ello. ¿Vale la pena?
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center text-base">
              💡
            </span>
            Cómo usar el valor de tu hora
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>Delegar tareas:</strong> Si pagar por un servicio cuesta menos que el valor
                de tu hora, probablemente vale la pena delegarlo.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>Negociar salario:</strong> Conocer tu tarifa real te ayuda a negociar
                aumentos o evaluar ofertas laborales.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>Freelance:</strong> Usa el valor neto como base para establecer tus
                tarifas, añadiendo un margen por impuestos e imprevistos.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>Compras conscientes:</strong> Antes de comprar algo, piensa cuántas horas
                de trabajo representa.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="amber" />
        </div>
      </div>
    </div>
  );
}
