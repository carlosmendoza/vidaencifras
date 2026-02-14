"use client";

import { useState, useEffect } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Icon } from "@/lib/icons";
import { ResultWithMascot } from "@/components/ResultWithMascot";

interface Resultado {
  imc: number;
  categoria: string;
  colorClass: string;
  bgClass: string;
  pesoIdealMin: number;
  pesoIdealMax: number;
  diferenciaPeso: number;
}

export default function IMC() {
  const { values, setField, hadInitialParams } = useUrlState(
    { sistema: "metrico", peso: "", altura: "", pies: "", pulgadas: "" },
    { paramNames: { sistema: "sys", pulgadas: "pulg" } }
  );
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    let pesoKg: number;
    let alturaM: number;

    if (values.sistema === "metrico") {
      pesoKg = parseFloat(values.peso);
      alturaM = parseFloat(values.altura) / 100;
    } else {
      // Convertir libras a kg
      pesoKg = parseFloat(values.peso) * 0.453592;
      // Convertir pies y pulgadas a metros
      const totalPulgadas = (parseFloat(values.pies) || 0) * 12 + (parseFloat(values.pulgadas) || 0);
      alturaM = totalPulgadas * 0.0254;
    }

    if (isNaN(pesoKg) || isNaN(alturaM) || alturaM === 0) return;

    const imc = pesoKg / (alturaM * alturaM);

    // Calcular peso ideal (IMC entre 18.5 y 24.9)
    const pesoIdealMin = 18.5 * alturaM * alturaM;
    const pesoIdealMax = 24.9 * alturaM * alturaM;

    // Diferencia con el peso ideal más cercano
    let diferenciaPeso = 0;
    if (imc < 18.5) {
      diferenciaPeso = pesoIdealMin - pesoKg; // Positivo = necesita subir
    } else if (imc > 24.9) {
      diferenciaPeso = pesoIdealMax - pesoKg; // Negativo = necesita bajar
    }

    let categoria: string;
    let colorClass: string;
    let bgClass: string;

    if (imc < 18.5) {
      categoria = "Bajo peso";
      colorClass = "text-amber-600";
      bgClass = "bg-amber-100";
    } else if (imc < 25) {
      categoria = "Peso normal";
      colorClass = "text-emerald-600";
      bgClass = "bg-emerald-100";
    } else if (imc < 30) {
      categoria = "Sobrepeso";
      colorClass = "text-orange-600";
      bgClass = "bg-orange-100";
    } else {
      categoria = "Obesidad";
      colorClass = "text-rose-600";
      bgClass = "bg-rose-100";
    }

    setResultado({ imc, categoria, colorClass, bgClass, pesoIdealMin, pesoIdealMax, diferenciaPeso });
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams]);

  // Calcular posición del indicador en la barra (0-100%)
  const calcularPosicionBarra = (imc: number): number => {
    // La barra va de IMC 15 a 40
    const min = 15;
    const max = 40;
    const posicion = ((imc - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, posicion));
  };

  const formatPeso = (kg: number): string => {
    if (values.sistema === "imperial") {
      const libras = kg / 0.453592;
      return `${libras.toFixed(1)} lb`;
    }
    return `${kg.toFixed(1)} kg`;
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-red-500/5">
        <CalculatorHeader title="Calculadora de IMC" subtitle="Índice de Masa Corporal" icon="scale" gradient="salud" />

        <div className="space-y-8">
          {/* Selector de sistema */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setField("sistema", "metrico")}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${values.sistema === "metrico"
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
            >
              kg / cm
            </button>
            <button
              onClick={() => setField("sistema", "imperial")}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${values.sistema === "imperial"
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
            >
              lb / ft
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Peso */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                {values.sistema === "metrico" ? "Peso (kg)" : "Peso (libras)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={values.peso}
                  onChange={(e) => setField("peso", e.target.value)}
                  placeholder={values.sistema === "metrico" ? "70" : "154"}
                  step="0.1"
                  className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-14"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                  {values.sistema === "metrico" ? "kg" : "lb"}
                </span>
              </div>
            </div>

            {/* Altura */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                {values.sistema === "metrico" ? "Altura (cm)" : "Altura"}
              </label>
              {values.sistema === "metrico" ? (
                <div className="relative">
                  <input
                    type="number"
                    value={values.altura}
                    onChange={(e) => setField("altura", e.target.value)}
                    placeholder="170"
                    className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-14"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                    cm
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={values.pies}
                      onChange={(e) => setField("pies", e.target.value)}
                      placeholder="5"
                      className="w-full px-4 py-4 rounded-2xl text-xl font-semibold pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold text-sm">
                      ft
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={values.pulgadas}
                      onChange={(e) => setField("pulgadas", e.target.value)}
                      placeholder="7"
                      className="w-full px-4 py-4 rounded-2xl text-xl font-semibold pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold text-sm">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.99]"
          >
            Calcular IMC
          </button>

          {resultado && (
            <ResultWithMascot variant={resultado.categoria === "Peso normal" ? "happy" : "default"}>
            <div className="mt-10 space-y-6">
              {/* Resultado principal */}
              <div className="p-8 bg-red-50 dark:bg-red-950/50 rounded-3xl text-center ring-1 ring-red-100 dark:ring-red-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">Tu IMC es</p>
                <p className="text-7xl font-black text-red-600 mb-4 tracking-tighter">
                  {resultado.imc.toFixed(1)}
                </p>
                <div className={`text-2xl font-black px-6 py-2 rounded-full inline-block ${resultado.bgClass} ${resultado.colorClass}`}>
                  {resultado.categoria}
                </div>
              </div>

              {/* Barra visual del IMC */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-800">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">Tu posición en la escala</p>
                <div className="relative mt-8">
                  {/* Tooltip del valor */}
                  <div
                    className="absolute -top-7 w-0 transition-all duration-500"
                    style={{ left: `${calcularPosicionBarra(resultado.imc)}%` }}
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                      {resultado.imc.toFixed(1)}
                    </div>
                  </div>
                  {/* Barra de colores */}
                  <div className="relative h-8 rounded-full overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 bg-amber-400"></div>
                      <div className="flex-[1.5] bg-emerald-400"></div>
                      <div className="flex-1 bg-orange-400"></div>
                      <div className="flex-1 bg-rose-400"></div>
                    </div>
                  </div>
                  {/* Indicador línea */}
                  <div
                    className="absolute top-0 h-8 w-1 bg-slate-800 dark:bg-slate-200 shadow-lg transition-all duration-500"
                    style={{ left: `${calcularPosicionBarra(resultado.imc)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>

              {/* Peso ideal */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl ring-1 ring-emerald-100 dark:ring-emerald-900">
                <p className="text-sm font-bold text-emerald-700 mb-2">Tu peso ideal</p>
                <p className="text-2xl font-black text-emerald-600">
                  {formatPeso(resultado.pesoIdealMin)} - {formatPeso(resultado.pesoIdealMax)}
                </p>
                {resultado.diferenciaPeso !== 0 && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {resultado.diferenciaPeso > 0 ? (
                      <>Necesitas subir <span className="font-bold text-amber-600">{formatPeso(resultado.diferenciaPeso)}</span></>
                    ) : (
                      <>Necesitas bajar <span className="font-bold text-rose-600">{formatPeso(Math.abs(resultado.diferenciaPeso))}</span></>
                    )}
                  </p>
                )}
                {resultado.diferenciaPeso === 0 && (
                  <p className="text-sm text-emerald-600 mt-2 font-medium">
                    ¡Estás en tu peso ideal!
                  </p>
                )}
              </div>
            </div>
            </ResultWithMascot>
          )}
        </div>

        {/* Tabla de referencia */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs font-bold">
          <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-2xl border border-amber-100 dark:border-amber-800">
            <p className="text-amber-700 mb-1">{"< 18.5"}</p>
            <p className="text-amber-600/70">Bajo peso</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800">
            <p className="text-emerald-700 mb-1">18.5 - 24.9</p>
            <p className="text-emerald-600/70">Normal</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950/50 p-4 rounded-2xl border border-orange-100 dark:border-orange-800">
            <p className="text-orange-700 mb-1">25 - 29.9</p>
            <p className="text-orange-600/70">Sobrepeso</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/50 p-4 rounded-2xl border border-rose-100 dark:border-rose-800">
            <p className="text-rose-700 mb-1">≥ 30</p>
            <p className="text-rose-600/70">Obesidad</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <Icon name="info" className="w-8 h-8 text-red-500" weight="fill" />
          ¿Qué es el IMC?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso
          con tu altura. Se usa como indicador general del estado nutricional.
          Sin embargo, no considera factores como la masa muscular, la edad o
          el sexo, por lo que es solo una referencia general.
        </p>
      </div>

      <CalculatorFooter href="/salud/calculadora-imc" />
    </div>
  );
}
