"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";

const faqs = [
  {
    question: "¿Qué es el 4x1000?",
    answer:
      "El 4x1000 (o GMF - Gravamen a los Movimientos Financieros) es un impuesto colombiano del 0.4% que se cobra sobre cada transacción financiera: retiros, transferencias, pagos con cheque, etc. Se descuenta automáticamente de tu cuenta.",
  },
  {
    question: "¿Qué transacciones están exentas del 4x1000?",
    answer:
      "Puedes marcar UNA cuenta de ahorros o corriente como exenta del 4x1000 para retiros hasta 350 UVT mensuales (aproximadamente $16.5 millones en 2024). Los traslados entre cuentas del mismo titular en el mismo banco también están exentos.",
  },
  {
    question: "¿Cómo marco mi cuenta como exenta del 4x1000?",
    answer:
      "Debes solicitar la exención directamente en tu banco, ya sea en sucursal o por canales digitales. Solo puedes tener UNA cuenta exenta en todo el sistema financiero. Si cambias de banco, debes desmarcar la anterior primero.",
  },
  {
    question: "¿El 4x1000 se puede deducir de impuestos?",
    answer:
      "Sí. El 50% del GMF pagado durante el año es deducible del impuesto de renta. Esto significa que si pagaste $1.000.000 en 4x1000, puedes deducir $500.000 de tu base gravable.",
  },
];

export default function Calculadora4x1000() {
  const [monto, setMonto] = useState<string>("");
  const [frecuencia, setFrecuencia] = useState<"unica" | "mensual" | "anual">("unica");
  const [cantidadMensual, setCantidadMensual] = useState<string>("1");

  const montoNum = parseFloat(monto) || 0;
  const impuesto = montoNum * 0.004;
  const cantidad = parseInt(cantidadMensual) || 1;

  const calcularTotal = () => {
    if (frecuencia === "unica") return impuesto;
    if (frecuencia === "mensual") return impuesto * cantidad * 12;
    return impuesto * cantidad;
  };

  const impuestoTotal = calcularTotal();

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Ejemplos comunes
  const ejemplos = [
    { label: "1 millón", valor: 1000000 },
    { label: "5 millones", valor: 5000000 },
    { label: "10 millones", valor: 10000000 },
    { label: "50 millones", valor: 50000000 },
  ];

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-indigo-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">🏦</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora 4x1000
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula el impuesto a movimientos financieros
          </p>
        </div>

        <div className="space-y-6">
          {/* Monto */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Monto de la transacción
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="1.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {ejemplos.map((ej) => (
                <button
                  key={ej.valor}
                  onClick={() => setMonto(ej.valor.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    monto === ej.valor.toString()
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {ej.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frecuencia */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cada cuánto haces esta transacción?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "unica", label: "Una vez" },
                { value: "mensual", label: "Cada mes" },
                { value: "anual", label: "Varias al año" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFrecuencia(opt.value as typeof frecuencia)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                    frecuencia === opt.value
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {frecuencia !== "unica" && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿Cuántas veces {frecuencia === "mensual" ? "al mes" : "al año"}?
              </label>
              <input
                type="number"
                value={cantidadMensual}
                onChange={(e) => setCantidadMensual(e.target.value)}
                min="1"
                className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          )}

          {/* Resultado instantáneo */}
          {montoNum > 0 && (
            <div className="mt-8 space-y-4">
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 rounded-3xl ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Impuesto 4x1000 {frecuencia === "unica" ? "" : frecuencia === "mensual" ? "(anual)" : "(total año)"}
                  </p>
                  <p className="text-4xl font-black text-indigo-600">
                    ${formatMoney(impuestoTotal)}
                  </p>
                  {frecuencia === "unica" && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                      Recibes: ${formatMoney(montoNum - impuesto)}
                    </p>
                  )}
                </div>
              </div>

              {/* Desglose */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 text-center">
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                    ${formatMoney(impuesto)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">por transacción</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-center">
                  <p className="text-2xl font-black text-emerald-600">
                    ${formatMoney(impuestoTotal * 0.5)}
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">deducible en renta (50%)</p>
                </div>
              </div>

              {/* Tabla de referencia rápida */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Referencia rápida</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">$1.000.000</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">$4.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">$5.000.000</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">$20.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">$10.000.000</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">$40.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">$100.000.000</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">$400.000</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-base">💡</span>
            ¿Cómo funciona el 4x1000?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
            El 4x1000 es un impuesto que se cobra automáticamente sobre los movimientos financieros en Colombia. Por cada $1.000 que retires o transfieras, pagas $4 de impuesto.
          </p>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-indigo-500">•</span>
              <span><strong>Se cobra en:</strong> Retiros en cajero, transferencias, pagos con cheque, débitos automáticos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-500">•</span>
              <span><strong>NO se cobra en:</strong> Pagos con tarjeta débito/crédito en comercios, cuenta exenta (hasta 350 UVT/mes).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-500">•</span>
              <span><strong>Tip:</strong> Marca tu cuenta principal como exenta y evita este impuesto en la mayoría de tus transacciones.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="indigo" />
        </div>
      </div>
    </div>
  );
}
