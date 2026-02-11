"use client";

import { useState, useEffect, useCallback } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";

interface Resultado {
  precioFinal: number;
  ahorro: number;
  porcentajeTotal: number;
}

export default function CalculadoraDescuentos() {
  const { values, setField, hadInitialParams } = useUrlState(
    { precioOriginal: "", descuento1: "", descuento2: "", usarDescuentoAdicional: "false" },
    { paramNames: { precioOriginal: "precio", descuento1: "d1", descuento2: "d2", usarDescuentoAdicional: "extra" } }
  );

  const precioOriginal = values.precioOriginal;
  const descuento1 = values.descuento1;
  const descuento2 = values.descuento2;
  const usarDescuentoAdicional = values.usarDescuentoAdicional === "true";
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const descuentosRapidos = [10, 15, 20, 25, 30, 50];

  const calcular = useCallback(() => {
    const precio = parseFloat(precioOriginal);
    const desc1 = parseFloat(descuento1) || 0;
    const desc2 = usarDescuentoAdicional ? (parseFloat(descuento2) || 0) : 0;

    if (isNaN(precio) || precio <= 0) return;

    // Calcular descuentos encadenados (no se suman, se aplican uno después del otro)
    let precioFinal = precio;
    precioFinal = precioFinal * (1 - desc1 / 100);
    if (desc2 > 0) {
      precioFinal = precioFinal * (1 - desc2 / 100);
    }

    const ahorro = precio - precioFinal;
    const porcentajeTotal = ((precio - precioFinal) / precio) * 100;

    setResultado({
      precioFinal,
      ahorro,
      porcentajeTotal,
    });
  }, [precioOriginal, descuento1, descuento2, usarDescuentoAdicional]);

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams, calcular]);

  const formatearPrecio = (valor: number): string => {
    return valor.toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const faqs = [
    {
      question: "¿Cómo se calculan los descuentos encadenados?",
      answer:
        "Los descuentos no se suman directamente. Un 30% + 20% adicional NO es 50%. Primero se aplica el 30% al precio original, y luego el 20% se aplica al precio ya rebajado. Ejemplo: $100 con 30% = $70, luego 20% de $70 = $56 (44% total, no 50%).",
    },
    {
      question: "¿Cómo calcular el precio original desde el precio con descuento?",
      answer:
        "Divide el precio final entre (1 - descuento/100). Ejemplo: si el precio final es $75 y el descuento fue 25%, el original era: $75 / (1 - 0.25) = $75 / 0.75 = $100.",
    },
    {
      question: "¿Qué es mejor: 30% de descuento o $30.000 de descuento?",
      answer:
        "Depende del precio original. Si el producto cuesta $100.000, el 30% ($30.000) es igual. Si cuesta más de $100.000, el 30% es mejor. Si cuesta menos, los $30.000 fijos son mejor.",
    },
    {
      question: "¿Los descuentos incluyen IVA?",
      answer:
        "Generalmente los descuentos se aplican al precio con IVA incluido, que es el precio que ves en la etiqueta. El descuento reduce el total que pagas, incluyendo impuestos.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Porcentajes",
      href: "/herramientas/calculadora-porcentajes",
      description: "Calcula cualquier porcentaje",
      icon: "percent",
    },
    {
      name: "Dividir Cuenta",
      href: "/herramientas/calculadora-dividir-cuenta",
      description: "Divide gastos entre amigos",
      icon: "receipt",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-pink-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <Icon name="tag" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Descuentos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula el precio final y cuánto ahorras
          </p>
        </div>

        <div className="space-y-6">
          {/* Precio original */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Precio original
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <input
                type="number"
                value={precioOriginal}
                onChange={(e) => setField("precioOriginal", e.target.value)}
                placeholder="150.000"
                className="w-full pl-10 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
          </div>

          {/* Descuento principal */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Descuento (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={descuento1}
                onChange={(e) => setField("descuento1", e.target.value)}
                placeholder="30"
                max={100}
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-12"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                %
              </span>
            </div>
            {/* Botones rápidos */}
            <div className="flex flex-wrap gap-2">
              {descuentosRapidos.map((d) => (
                <button
                  key={d}
                  onClick={() => setField("descuento1", d.toString())}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    descuento1 === d.toString()
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {d}%
                </button>
              ))}
            </div>
          </div>

          {/* Toggle descuento adicional */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setField("usarDescuentoAdicional", String(!usarDescuentoAdicional))}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                usarDescuentoAdicional ? "bg-pink-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  usarDescuentoAdicional ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Agregar descuento adicional (ej: 20% + 10% extra)
            </span>
          </div>

          {/* Descuento adicional */}
          {usarDescuentoAdicional && (
            <div className="space-y-3 p-4 bg-pink-50 dark:bg-pink-950/30 rounded-2xl">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Descuento adicional (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={descuento2}
                  onChange={(e) => setField("descuento2", e.target.value)}
                  placeholder="10"
                  max={100}
                  className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-12"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                  %
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Se aplica sobre el precio ya rebajado, no sobre el original.
              </p>
            </div>
          )}

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-pink-500/20 active:scale-[0.99]"
          >
            Calcular descuento
          </button>

          {resultado && (
            <div className="mt-8 space-y-4">
              {/* Precio final */}
              <div className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50 rounded-3xl text-center ring-1 ring-pink-100 dark:ring-pink-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">
                  Precio final
                </p>
                <p className="text-5xl md:text-6xl font-black text-pink-600 dark:text-pink-400 tracking-tighter">
                  ${formatearPrecio(resultado.precioFinal)}
                </p>
              </div>

              {/* Detalles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl text-center ring-1 ring-emerald-100 dark:ring-emerald-900">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">Ahorras</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    ${formatearPrecio(resultado.ahorro)}
                  </p>
                </div>
                <div className="p-5 bg-violet-50 dark:bg-violet-950/50 rounded-2xl text-center ring-1 ring-violet-100 dark:ring-violet-900">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">Descuento total</p>
                  <p className="text-2xl font-black text-violet-600 dark:text-violet-400">
                    {resultado.porcentajeTotal.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Resumen visual */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-500 dark:text-slate-400">Precio original</span>
                  <span className="font-bold text-slate-400 line-through">
                    ${formatearPrecio(parseFloat(precioOriginal))}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-500 dark:text-slate-400">
                    Descuento {descuento1}%
                    {usarDescuentoAdicional && descuento2 && ` + ${descuento2}%`}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    -${formatearPrecio(resultado.ahorro)}
                  </span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Total a pagar</span>
                  <span className="font-black text-lg text-pink-600 dark:text-pink-400">
                    ${formatearPrecio(resultado.precioFinal)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de descuentos comunes */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center text-pink-600 dark:text-pink-400">
            <Icon name="bar-chart" className="w-5 h-5" weight="fill" />
          </span>
          Tabla rápida de descuentos
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Precio final por cada $100.000:
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
          {[10, 20, 30, 40, 50, 70].map((d) => (
            <div key={d} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-xs font-bold text-pink-600 dark:text-pink-400 mb-1">{d}%</p>
              <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                ${formatearPrecio(100000 * (1 - d / 100))}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="pink" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
