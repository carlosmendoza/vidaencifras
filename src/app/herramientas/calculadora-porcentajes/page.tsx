"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";

type TipoCalculo = "porcentaje_de" | "que_porcentaje" | "aumento" | "descuento" | "diferencia";

interface Resultado {
  valor: number;
  explicacion: string;
}

export default function Porcentajes() {
  const [tipoCalculo, setTipoCalculo] = useState<TipoCalculo>("porcentaje_de");
  const [valor1, setValor1] = useState<string>("");
  const [valor2, setValor2] = useState<string>("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

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

  const calcular = () => {
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
  };

  const labels = getLabels();

  const faqs = [
    {
      question: "¿Cómo calcular el porcentaje de un número?",
      answer:
        "Para calcular el X% de un número Y, multiplica Y por X y divide entre 100. Ejemplo: el 15% de 200 es (200 × 15) / 100 = 30.",
    },
    {
      question: "¿Cómo saber qué porcentaje es un número de otro?",
      answer:
        "Divide el número menor entre el mayor y multiplica por 100. Ejemplo: para saber qué porcentaje es 30 de 200: (30 / 200) × 100 = 15%.",
    },
    {
      question: "¿Cómo calcular un descuento porcentual?",
      answer:
        "Multiplica el precio original por (1 - descuento/100). Ejemplo: un producto de $100 con 25% de descuento: 100 × (1 - 0.25) = $75.",
    },
    {
      question: "¿Cómo calcular un aumento porcentual?",
      answer:
        "Multiplica el valor original por (1 + aumento/100). Ejemplo: un salario de $1000 con aumento del 10%: 1000 × (1 + 0.10) = $1100.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Préstamos",
      href: "/finanzas/calculadora-prestamos",
      description: "Calcula cuotas e intereses",
      icon: "landmark",
    },
    {
      name: "Calculadora de Interés Compuesto",
      href: "/finanzas/calculadora-interes-compuesto",
      description: "Simula el crecimiento de tu dinero",
      icon: "trending-up",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-cyan-500/5 dark:shadow-cyan-500/10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">%</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Porcentajes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula cualquier porcentaje fácilmente
          </p>
        </div>

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
                    setTipoCalculo(tipo.valor);
                    setResultado(null);
                  }}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    tipoCalculo === tipo.valor
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
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
                onChange={(e) => setValor1(e.target.value)}
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
                onChange={(e) => setValor2(e.target.value)}
                placeholder={labels.placeholder2}
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.99]"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-8 p-8 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50 rounded-3xl text-center ring-1 ring-cyan-100 dark:ring-cyan-900">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-3">Resultado</p>
              <p className="text-5xl font-black text-cyan-600 dark:text-cyan-400 mb-4 tracking-tighter">
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
          <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center text-cyan-600 dark:text-cyan-400">
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

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="cyan" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
