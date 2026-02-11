"use client";

import { useMemo } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";

type ModoCalculo = "agregar" | "quitar" | "solo_iva";
type TasaIVA = 19 | 5 | 0;

interface Resultado {
  base: number;
  iva: number;
  total: number;
}

export default function CalculadoraIVA() {
  const { values, setField } = useUrlState(
    { modo: "agregar", tasa: "19", valor: "" },
    { paramNames: { modo: "m", tasa: "t", valor: "v" } }
  );

  const modo = values.modo as ModoCalculo;
  const tasa = parseInt(values.tasa) as TasaIVA;
  const valor = values.valor;

  const resultado = useMemo((): Resultado | null => {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) return null;

    const tasaDecimal = tasa / 100;

    switch (modo) {
      case "agregar":
        // Valor es la base, calcular IVA y total
        return {
          base: valorNum,
          iva: valorNum * tasaDecimal,
          total: valorNum * (1 + tasaDecimal),
        };
      case "quitar":
        // Valor es el total con IVA incluido, calcular base e IVA
        const baseQuitar = valorNum / (1 + tasaDecimal);
        return {
          base: baseQuitar,
          iva: valorNum - baseQuitar,
          total: valorNum,
        };
      case "solo_iva":
        // Valor es la base, solo calcular el IVA
        return {
          base: valorNum,
          iva: valorNum * tasaDecimal,
          total: valorNum * (1 + tasaDecimal),
        };
      default:
        return null;
    }
  }, [valor, modo, tasa]);

  const modos = [
    { valor: "agregar" as ModoCalculo, nombre: "Agregar IVA", descripcion: "Base → Total con IVA" },
    { valor: "quitar" as ModoCalculo, nombre: "Quitar IVA", descripcion: "Total → Base sin IVA" },
    { valor: "solo_iva" as ModoCalculo, nombre: "Solo IVA", descripcion: "Calcular solo el impuesto" },
  ];

  const tasas = [
    { valor: 19 as TasaIVA, nombre: "19%", descripcion: "Tarifa general" },
    { valor: 5 as TasaIVA, nombre: "5%", descripcion: "Tarifa especial" },
    { valor: 0 as TasaIVA, nombre: "0%", descripcion: "Exento" },
  ];

  const getInputLabel = () => {
    switch (modo) {
      case "agregar":
      case "solo_iva":
        return "Valor sin IVA (base)";
      case "quitar":
        return "Valor con IVA incluido";
    }
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const faqs = [
    {
      question: "¿Cuál es el IVA en Colombia?",
      answer:
        "En Colombia, la tarifa general del IVA es del 19%. Sin embargo, existen tasas reducidas del 5% para ciertos productos y del 0% para productos exentos como canasta familiar básica y medicamentos.",
    },
    {
      question: "¿Cómo se calcula el IVA de un producto?",
      answer:
        "Para agregar IVA: multiplica el precio base por 1.19 (para 19%). Para quitar IVA: divide el precio total entre 1.19. Para calcular solo el IVA: multiplica el precio base por 0.19.",
    },
    {
      question: "¿Qué productos tienen IVA del 5%?",
      answer:
        "Tienen IVA del 5%: algunos alimentos procesados, embutidos, bicicletas hasta 50 UVT, servicios de vigilancia con armas, entre otros definidos en el Estatuto Tributario.",
    },
    {
      question: "¿Qué productos están exentos de IVA?",
      answer:
        "Están exentos: canasta familiar básica (arroz, pan, leche, huevos, frutas, verduras), medicamentos, libros, cuadernos, servicios de salud, educación y transporte público.",
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
      name: "Calculadora de Descuentos",
      href: "/herramientas/calculadora-descuentos",
      description: "Precio final y ahorro",
      icon: "tag",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-indigo-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="receipt" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de IVA
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula el IVA en Colombia al instante
          </p>
        </div>

        <div className="space-y-6">
          {/* Selector de modo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Qué quieres calcular?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {modos.map((m) => (
                <button
                  key={m.valor}
                  onClick={() => setField("modo", m.valor)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    modo === m.valor
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {m.nombre}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 ml-1">
              {modos.find((m) => m.valor === modo)?.descripcion}
            </p>
          </div>

          {/* Selector de tasa */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tasa de IVA
            </label>
            <div className="flex gap-2">
              {tasas.map((t) => (
                <button
                  key={t.valor}
                  onClick={() => setField("tasa", String(t.valor))}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                    tasa === t.valor
                      ? "bg-indigo-500 text-white font-bold shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="block font-bold">{t.nombre}</span>
                  <span className="text-xs opacity-75">{t.descripcion}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input de valor */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              {getInputLabel()}
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <input
                type="number"
                value={valor}
                onChange={(e) => setField("valor", e.target.value)}
                placeholder="100000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
          </div>

          {/* Resultado instantáneo */}
          {resultado && (
            <div className="mt-8 space-y-4 animate-result-appear">
              {/* Resultado principal */}
              <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-3xl text-center ring-1 ring-indigo-100 dark:ring-indigo-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">
                  {modo === "solo_iva" ? "IVA a pagar" : modo === "agregar" ? "Total con IVA" : "Base sin IVA"}
                </p>
                <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                  ${formatMoney(modo === "solo_iva" ? resultado.iva : modo === "agregar" ? resultado.total : resultado.base)}
                </p>
              </div>

              {/* Desglose */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Base</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                    ${formatMoney(resultado.base)}
                  </p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">IVA ({tasa}%)</p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    ${formatMoney(resultado.iva)}
                  </p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Total</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                    ${formatMoney(resultado.total)}
                  </p>
                </div>
              </div>

              {/* Fórmula aplicada */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center text-sm text-slate-600 dark:text-slate-400">
                {modo === "agregar" && (
                  <span>${formatMoney(resultado.base)} × 1.{tasa.toString().padStart(2, "0")} = <strong className="text-indigo-600">${formatMoney(resultado.total)}</strong></span>
                )}
                {modo === "quitar" && (
                  <span>${formatMoney(resultado.total)} ÷ 1.{tasa.toString().padStart(2, "0")} = <strong className="text-indigo-600">${formatMoney(resultado.base)}</strong></span>
                )}
                {modo === "solo_iva" && (
                  <span>${formatMoney(resultado.base)} × 0.{tasa.toString().padStart(2, "0")} = <strong className="text-indigo-600">${formatMoney(resultado.iva)}</strong></span>
                )}
              </div>

              <ShareButtons
                title="Calculadora de IVA Colombia"
                text={`Calculé el IVA del ${tasa}% con la calculadora de Vida en Cifras`}
                result={{
                  label: modo === "solo_iva" ? "IVA" : modo === "agregar" ? "Total con IVA" : "Base sin IVA",
                  value: `$${formatMoney(modo === "solo_iva" ? resultado.iva : modo === "agregar" ? resultado.total : resultado.base)}`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Información sobre tasas */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
          </span>
          Tasas de IVA en Colombia
        </h2>
        <div className="space-y-4 text-sm">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl border border-indigo-100 dark:border-indigo-900">
            <p className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">19% - Tarifa General</p>
            <p className="text-slate-600 dark:text-slate-400">
              Aplica a la mayoría de bienes y servicios: electrónicos, ropa, servicios profesionales, restaurantes, etc.
            </p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-xl border border-amber-100 dark:border-amber-900">
            <p className="font-bold text-amber-700 dark:text-amber-300 mb-1">5% - Tarifa Especial</p>
            <p className="text-slate-600 dark:text-slate-400">
              Algunos alimentos procesados, embutidos, café procesado, bicicletas hasta 50 UVT, servicios de vigilancia armada.
            </p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-100 dark:border-emerald-900">
            <p className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">0% - Exentos</p>
            <p className="text-slate-600 dark:text-slate-400">
              Canasta familiar básica, medicamentos, libros, cuadernos, servicios de salud, educación, transporte público, exportaciones.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="indigo" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
