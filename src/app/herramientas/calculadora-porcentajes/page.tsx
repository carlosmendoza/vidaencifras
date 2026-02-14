"use client";

import { useState, useEffect, useCallback } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Icon } from "@/lib/icons";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";

type TipoCalculo = "porcentaje_de" | "que_porcentaje" | "aumento" | "descuento" | "diferencia";

interface Resultado {
  valor: number;
  explicacion: string;
}

export default function Porcentajes() {
  const { values, setField, hadInitialParams } = useUrlState(
    { tipoCalculo: "porcentaje_de", valor1: "", valor2: "" },
    { paramNames: { tipoCalculo: "tipo", valor1: "v1", valor2: "v2" } }
  );

  const tipoCalculo = values.tipoCalculo as TipoCalculo;
  const valor1 = values.valor1;
  const valor2 = values.valor2;
  const [resultado, setResultado] = useState<Resultado | null>(null);
  useCalculatorTracking(resultado !== null);

  const tiposCalculo = [
    { valor: "porcentaje_de" as TipoCalculo, nombre: "% de un número", descripcion: "¿Cuánto es el X% de Y?" },
    { valor: "que_porcentaje" as TipoCalculo, nombre: "Qué % es", descripcion: "¿Qué porcentaje es X de Y?" },
    { valor: "aumento" as TipoCalculo, nombre: "Aumento %", descripcion: "Aumentar X en Y%" },
    { valor: "descuento" as TipoCalculo, nombre: "Descuento %", descripcion: "Restar Y% a X" },
    { valor: "diferencia" as TipoCalculo, nombre: "Diferencia %", descripcion: "Diferencia porcentual entre X e Y" },
  ];

  const getLabels = (): { label1: string; label2: string; placeholder1: string; placeholder2: string } => {
    switch (tipoCalculo) {
      case "porcentaje_de":
        return { label1: "Porcentaje (%)", label2: "Número", placeholder1: "15", placeholder2: "200" };
      case "que_porcentaje":
        return { label1: "Número parcial", label2: "Número total", placeholder1: "30", placeholder2: "200" };
      case "aumento":
        return { label1: "Número original", label2: "Porcentaje a aumentar (%)", placeholder1: "100", placeholder2: "20" };
      case "descuento":
        return { label1: "Precio original", label2: "Descuento (%)", placeholder1: "150", placeholder2: "25" };
      case "diferencia":
        return { label1: "Valor inicial", label2: "Valor final", placeholder1: "80", placeholder2: "100" };
    }
  };

  const calcular = useCallback(() => {
    const v1 = parseFloat(valor1);
    const v2 = parseFloat(valor2);

    if (isNaN(v1) || isNaN(v2)) return;

    let valor: number;
    let explicacion: string;

    switch (tipoCalculo) {
      case "porcentaje_de":
        valor = (v1 / 100) * v2;
        explicacion = `El ${v1}% de ${v2} es ${valor.toFixed(2)}`;
        break;
      case "que_porcentaje":
        valor = (v1 / v2) * 100;
        explicacion = `${v1} es el ${valor.toFixed(2)}% de ${v2}`;
        break;
      case "aumento":
        valor = v1 * (1 + v2 / 100);
        explicacion = `${v1} + ${v2}% = ${valor.toFixed(2)}`;
        break;
      case "descuento":
        valor = v1 * (1 - v2 / 100);
        explicacion = `${v1} - ${v2}% = ${valor.toFixed(2)}`;
        break;
      case "diferencia":
        valor = ((v2 - v1) / Math.abs(v1)) * 100;
        explicacion = valor >= 0
          ? `Aumento del ${valor.toFixed(2)}%`
          : `Disminución del ${Math.abs(valor).toFixed(2)}%`;
        break;
    }

    setResultado({ valor, explicacion });
  }, [tipoCalculo, valor1, valor2]);

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams, calcular]);

  const labels = getLabels();

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-purple-500/5">
        <CalculatorHeader
          title="Calculadora de Porcentajes"
          subtitle="Calcula cualquier porcentaje fácilmente"
          icon="%"
          gradient="herramientas"
        />

        <div className="space-y-6">
          {/* Selector de tipo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Qué quieres calcular?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tiposCalculo.map((tipo) => (
                <button
                  key={tipo.valor}
                  onClick={() => {
                    setField("tipoCalculo", tipo.valor);
                    setResultado(null);
                  }}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    tipoCalculo === tipo.valor
                      ? "bg-purple-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tipo.nombre}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 ml-1">
              {tiposCalculo.find(t => t.valor === tipoCalculo)?.descripcion}
            </p>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                {labels.label1}
              </label>
              <input
                type="number"
                value={valor1}
                onChange={(e) => setField("valor1", e.target.value)}
                placeholder={labels.placeholder1}
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                {labels.label2}
              </label>
              <input
                type="number"
                value={valor2}
                onChange={(e) => setField("valor2", e.target.value)}
                placeholder={labels.placeholder2}
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-purple-500/20 active:scale-[0.99]"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-8 p-8 bg-purple-50 dark:bg-purple-950/50 rounded-3xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-3">Resultado</p>
              <p className="text-5xl font-black text-purple-600 dark:text-purple-400 mb-4 tracking-tighter">
                {tipoCalculo === "que_porcentaje" || tipoCalculo === "diferencia"
                  ? `${resultado.valor.toFixed(2)}%`
                  : resultado.valor.toFixed(2)}
              </p>
              <p className="text-slate-600 dark:text-slate-300 font-medium">{resultado.explicacion}</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
          </span>
          Fórmulas útiles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">X% de Y</p>
            <p className="text-slate-500 dark:text-slate-400">(X / 100) × Y</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Qué % es X de Y</p>
            <p className="text-slate-500 dark:text-slate-400">(X / Y) × 100</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Aumento de X%</p>
            <p className="text-slate-500 dark:text-slate-400">Valor × (1 + X/100)</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Descuento de X%</p>
            <p className="text-slate-500 dark:text-slate-400">Valor × (1 - X/100)</p>
          </div>
        </div>
      </div>

      <CalculatorFooter href="/herramientas/calculadora-porcentajes" />
    </div>
  );
}
