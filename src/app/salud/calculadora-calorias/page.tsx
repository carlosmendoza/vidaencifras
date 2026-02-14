"use client";

import { useState, useEffect } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Icon } from "@/lib/icons";
import { Callout } from "@/components/Callout";
import { ResultWithMascot } from "@/components/ResultWithMascot";

type NivelActividad = "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo";
type Objetivo = "perder" | "mantener" | "ganar";

interface Resultado {
  tmb: number;
  tdee: number;
  objetivo: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

const nivelesActividad = [
  { valor: "sedentario" as NivelActividad, nombre: "Sedentario", descripcion: "Poco o nada de ejercicio", factor: 1.2 },
  { valor: "ligero" as NivelActividad, nombre: "Ligeramente activo", descripcion: "Ejercicio 1-3 días/semana", factor: 1.375 },
  { valor: "moderado" as NivelActividad, nombre: "Moderadamente activo", descripcion: "Ejercicio 3-5 días/semana", factor: 1.55 },
  { valor: "activo" as NivelActividad, nombre: "Muy activo", descripcion: "Ejercicio 6-7 días/semana", factor: 1.725 },
  { valor: "muy_activo" as NivelActividad, nombre: "Extra activo", descripcion: "Ejercicio intenso diario", factor: 1.9 },
];

const objetivos = [
  { valor: "perder" as Objetivo, nombre: "Perder peso", icon: "trending-down", ajuste: -500 },
  { valor: "mantener" as Objetivo, nombre: "Mantener", icon: "scale", ajuste: 0 },
  { valor: "ganar" as Objetivo, nombre: "Ganar masa", icon: "trending-up", ajuste: 500 },
];

export default function Calorias() {
  const { values, setField, hadInitialParams } = useUrlState(
    { sexo: "hombre", edad: "", peso: "", altura: "", actividad: "moderado", objetivo: "mantener" },
    { paramNames: { actividad: "act", objetivo: "obj" } }
  );
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    const edadNum = parseFloat(values.edad);
    const pesoNum = parseFloat(values.peso);
    const alturaNum = parseFloat(values.altura);

    if (isNaN(edadNum) || isNaN(pesoNum) || isNaN(alturaNum)) return;

    // Fórmula Mifflin-St Jeor
    let tmb: number;
    if (values.sexo === "hombre") {
      tmb = 10 * pesoNum + 6.25 * alturaNum - 5 * edadNum + 5;
    } else {
      tmb = 10 * pesoNum + 6.25 * alturaNum - 5 * edadNum - 161;
    }

    const factorActividad = nivelesActividad.find(n => n.valor === values.actividad)?.factor || 1.55;
    const tdee = tmb * factorActividad;

    const ajusteObjetivo = objetivos.find(o => o.valor === values.objetivo)?.ajuste || 0;
    const caloriasObjetivo = tdee + ajusteObjetivo;

    // Macros (basado en objetivo)
    let proteinaPorKg: number;
    let grasaPorcentaje: number;

    if (values.objetivo === "perder") {
      proteinaPorKg = 2.2; // Más proteína para preservar músculo
      grasaPorcentaje = 0.25;
    } else if (values.objetivo === "ganar") {
      proteinaPorKg = 2.0;
      grasaPorcentaje = 0.25;
    } else {
      proteinaPorKg = 1.8;
      grasaPorcentaje = 0.30;
    }

    const proteinas = pesoNum * proteinaPorKg;
    const grasas = (caloriasObjetivo * grasaPorcentaje) / 9;
    const caloriasRestantes = caloriasObjetivo - (proteinas * 4) - (grasas * 9);
    const carbohidratos = caloriasRestantes / 4;

    setResultado({
      tmb: Math.round(tmb),
      tdee: Math.round(tdee),
      objetivo: Math.round(caloriasObjetivo),
      proteinas: Math.round(proteinas),
      carbohidratos: Math.round(Math.max(0, carbohidratos)),
      grasas: Math.round(grasas),
    });
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams]);

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-red-500/5">
        <CalculatorHeader title="Calculadora de Calorías" subtitle="TDEE y macronutrientes personalizados" icon="flame" gradient="salud" />

        <div className="space-y-6">
          {/* Sexo */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setField("sexo", "hombre")}
              className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${values.sexo === "hombre"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
            >
              <Icon name="male" className="w-5 h-5 inline mr-2" weight="fill" /> Hombre
            </button>
            <button
              onClick={() => setField("sexo", "mujer")}
              className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${values.sexo === "mujer"
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
            >
              <Icon name="female" className="w-5 h-5 inline mr-2" weight="fill" /> Mujer
            </button>
          </div>

          {/* Datos físicos */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Edad</label>
              <div className="relative">
                <input
                  type="number"
                  value={values.edad}
                  onChange={(e) => setField("edad", e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-4 rounded-2xl text-lg font-semibold pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">años</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Peso</label>
              <div className="relative">
                <input
                  type="number"
                  value={values.peso}
                  onChange={(e) => setField("peso", e.target.value)}
                  placeholder="70"
                  className="w-full px-4 py-4 rounded-2xl text-lg font-semibold pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">kg</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Altura</label>
              <div className="relative">
                <input
                  type="number"
                  value={values.altura}
                  onChange={(e) => setField("altura", e.target.value)}
                  placeholder="175"
                  className="w-full px-4 py-4 rounded-2xl text-lg font-semibold pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">cm</span>
              </div>
            </div>
          </div>

          {/* Nivel de actividad */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nivel de actividad</label>
            <div className="space-y-2">
              {nivelesActividad.map((nivel) => (
                <button
                  key={nivel.valor}
                  onClick={() => setField("actividad", nivel.valor)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${values.actividad === nivel.valor
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                >
                  <p className="font-bold">{nivel.nombre}</p>
                  <p className={`text-sm ${values.actividad === nivel.valor ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                    {nivel.descripcion}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Objetivo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Tu objetivo</label>
            <div className="grid grid-cols-3 gap-3">
              {objetivos.map((obj) => (
                <button
                  key={obj.valor}
                  onClick={() => setField("objetivo", obj.valor)}
                  className={`p-4 rounded-xl text-center transition-all ${values.objetivo === obj.valor
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                >
                  <Icon name={obj.icon} className="w-8 h-8 mx-auto mb-1" weight="duotone" />
                  <p className="font-bold text-sm">{obj.nombre}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.99]"
          >
            Calcular Calorías
          </button>

          {resultado && (
            <ResultWithMascot variant="happy">
            <div className="mt-10 space-y-4">
              {/* TDEE */}
              <div className="p-6 bg-red-50 dark:bg-red-950/50 rounded-3xl text-center ring-1 ring-red-100 dark:ring-red-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">Tu gasto calórico diario (TDEE)</p>
                <p className="text-5xl font-black text-red-600">{resultado.tdee.toLocaleString()}</p>
                <p className="text-slate-500 dark:text-slate-400 font-bold">calorías/día</p>
              </div>

              {/* Calorías objetivo */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl text-center ring-1 ring-emerald-100 dark:ring-emerald-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">
                  Para {values.objetivo === "perder" ? "perder peso" : values.objetivo === "ganar" ? "ganar masa" : "mantener"}
                </p>
                <p className="text-4xl font-black text-emerald-600">{resultado.objetivo.toLocaleString()}</p>
                <p className="text-slate-500 dark:text-slate-400 font-bold">calorías/día</p>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-2xl text-center ring-1 ring-blue-100 dark:ring-blue-900">
                  <p className="text-2xl font-black text-blue-600">{resultado.proteinas}g</p>
                  <p className="text-xs font-bold text-blue-500">Proteínas</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-2xl text-center ring-1 ring-amber-100 dark:ring-amber-900">
                  <p className="text-2xl font-black text-amber-600">{resultado.carbohidratos}g</p>
                  <p className="text-xs font-bold text-amber-500"><span className="md:hidden">Carbos</span><span className="hidden md:inline">Carbohidratos</span></p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-2xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
                  <p className="text-2xl font-black text-purple-600">{resultado.grasas}g</p>
                  <p className="text-xs font-bold text-purple-500">Grasas</p>
                </div>
              </div>

              {/* TMB */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center ring-1 ring-slate-200 dark:ring-slate-700">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                  Metabolismo basal (TMB): <span className="font-bold text-slate-700 dark:text-slate-300">{resultado.tmb} kcal</span>
                </p>
              </div>
            </div>
            </ResultWithMascot>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <Icon name="info" className="w-8 h-8 text-red-500" weight="fill" />
          ¿Qué significan estos números?
        </h2>
        <ul className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">TMB:</span>
            Calorías que quemas en reposo total (funciones vitales).
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">TDEE:</span>
            Total de calorías que quemas al día incluyendo actividad.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">Macros:</span>
            Distribución sugerida de proteínas, carbohidratos y grasas.
          </li>
        </ul>
      </div>

      {/* Tabla de calorías de alimentos colombianos */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <Icon name="utensils" className="w-8 h-8 text-red-500" weight="fill" />
          Calorías de alimentos comunes colombianos
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
          Referencia rápida para planificar tus comidas con alimentos del día a día.
        </p>

        <div className="space-y-6">
          {/* Proteínas */}
          <div>
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">Proteínas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Alimento</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Porción</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Calorías</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Prot.</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Pechuga de pollo</td><td className="text-right">100 g</td><td className="text-right font-semibold">165</td><td className="text-right">31 g</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Huevo</td><td className="text-right">1 unidad (50 g)</td><td className="text-right font-semibold">72</td><td className="text-right">6 g</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Carne de res (magra)</td><td className="text-right">100 g</td><td className="text-right font-semibold">250</td><td className="text-right">26 g</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Mojarra frita</td><td className="text-right">150 g</td><td className="text-right font-semibold">270</td><td className="text-right">30 g</td></tr>
                  <tr><td className="py-2">Fríjoles rojos cocidos</td><td className="text-right">1 taza (170 g)</td><td className="text-right font-semibold">225</td><td className="text-right">15 g</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Carbohidratos */}
          <div>
            <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wide">Carbohidratos</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Alimento</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Porción</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Calorías</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Carbos</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Arroz blanco cocido</td><td className="text-right">1 taza (160 g)</td><td className="text-right font-semibold">206</td><td className="text-right">45 g</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Arepa de maíz blanco</td><td className="text-right">1 unidad (80 g)</td><td className="text-right font-semibold">170</td><td className="text-right">30 g</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Plátano maduro (tajadas)</td><td className="text-right">½ unidad (100 g)</td><td className="text-right font-semibold">120</td><td className="text-right">31 g</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Papa criolla cocida</td><td className="text-right">3 unidades (120 g)</td><td className="text-right font-semibold">100</td><td className="text-right">23 g</td></tr>
                  <tr><td className="py-2">Yuca cocida</td><td className="text-right">100 g</td><td className="text-right font-semibold">160</td><td className="text-right">38 g</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Frutas y verduras */}
          <div>
            <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">Frutas y verduras</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Alimento</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Porción</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Calorías</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Banano</td><td className="text-right">1 unidad (120 g)</td><td className="text-right font-semibold">105</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Mango</td><td className="text-right">1 taza (165 g)</td><td className="text-right font-semibold">99</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Aguacate</td><td className="text-right">½ unidad (100 g)</td><td className="text-right font-semibold">160</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Ensalada de lechuga y tomate</td><td className="text-right">1 plato (150 g)</td><td className="text-right font-semibold">30</td></tr>
                  <tr><td className="py-2">Lulo (jugo sin azúcar)</td><td className="text-right">1 vaso (250 ml)</td><td className="text-right font-semibold">50</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Grasas y snacks */}
          <div>
            <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-2 uppercase tracking-wide">Grasas, snacks y bebidas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Alimento</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Porción</th>
                    <th className="text-right py-2 font-bold text-slate-700 dark:text-slate-300">Calorías</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Aceite de oliva</td><td className="text-right">1 cucharada (15 ml)</td><td className="text-right font-semibold">120</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Maní tostado</td><td className="text-right">30 g (un puñado)</td><td className="text-right font-semibold">170</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Pan tajado integral</td><td className="text-right">1 tajada (30 g)</td><td className="text-right font-semibold">80</td></tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800"><td className="py-2">Gaseosa</td><td className="text-right">1 lata (350 ml)</td><td className="text-right font-semibold">140</td></tr>
                  <tr><td className="py-2">Empanada de carne</td><td className="text-right">1 unidad</td><td className="text-right font-semibold">300</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Callout type="warning" title="Aviso importante">
          Los valores son aproximados y pueden variar según la preparación y la marca. Consulta a un nutricionista para un plan personalizado.
        </Callout>
      </div>

      {/* Ejemplos de días de comida */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <Icon name="calendar" className="w-8 h-8 text-red-500" weight="fill" />
          Ejemplos de días de comida según objetivo
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
          Tres ejemplos de un día completo con comidas colombianas para distintos niveles calóricos.
        </p>

        <div className="space-y-6">
          {/* 1,500 kcal */}
          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl ring-1 ring-emerald-100 dark:ring-emerald-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-emerald-700 dark:text-emerald-400">~1,500 kcal — Perder peso</h3>
              <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">Déficit</span>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Desayuno (~350 kcal)</p>
                <p>2 huevos revueltos + 1 arepa pequeña + café con leche descremada</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Almuerzo (~500 kcal)</p>
                <p>Pechuga a la plancha (120 g) + ½ taza de arroz + ensalada + jugo de lulo sin azúcar</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Cena (~400 kcal)</p>
                <p>Sopa de verduras con pollo + 1 tajada de pan integral</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Snacks (~250 kcal)</p>
                <p>1 banano + 15 g de maní tostado</p>
              </div>
              <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Aprox: 120 g proteína · 150 g carbos · 45 g grasa
              </div>
            </div>
          </div>

          {/* 2,000 kcal */}
          <div className="p-5 bg-blue-50 dark:bg-blue-950/30 rounded-2xl ring-1 ring-blue-100 dark:ring-blue-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-blue-700 dark:text-blue-400">~2,000 kcal — Mantener peso</h3>
              <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">Equilibrio</span>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Desayuno (~450 kcal)</p>
                <p>Arepa con queso + 2 huevos + aguacate (¼) + chocolate caliente</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Almuerzo (~650 kcal)</p>
                <p>Arroz (1 taza) + fríjoles rojos + carne molida (100 g) + tajadas de plátano (3) + ensalada</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Cena (~500 kcal)</p>
                <p>Caldo de costilla + arepa con mantequilla + jugo de maracuyá</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Snacks (~400 kcal)</p>
                <p>1 mango + yogurt natural (200 g) + galletas integrales (3)</p>
              </div>
              <div className="pt-2 border-t border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400">
                Aprox: 130 g proteína · 220 g carbos · 60 g grasa
              </div>
            </div>
          </div>

          {/* 2,500 kcal */}
          <div className="p-5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl ring-1 ring-amber-100 dark:ring-amber-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-amber-700 dark:text-amber-400">~2,500 kcal — Ganar masa</h3>
              <span className="text-xs font-bold bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full">Superávit</span>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Desayuno (~600 kcal)</p>
                <p>Calentado (arroz + fríjoles) + 2 huevos + arepa con queso + jugo de guanábana</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Almuerzo (~800 kcal)</p>
                <p>Bandeja paisa adaptada: arroz (1 taza) + fríjoles + carne (150 g) + huevo + tajadas + ensalada</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Cena (~600 kcal)</p>
                <p>Pasta con pollo (150 g) + salsa de tomate + aguacate (½) + pan</p>
              </div>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Snacks (~500 kcal)</p>
                <p>Batido de banano con leche y avena + sándwich de atún + maní (30 g)</p>
              </div>
              <div className="pt-2 border-t border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-600 dark:text-amber-400">
                Aprox: 160 g proteína · 280 g carbos · 75 g grasa
              </div>
            </div>
          </div>
        </div>

        <Callout type="warning" title="Aviso importante">
          Estos menús son ejemplos orientativos, no planes de alimentación personalizados. Consulta a un nutricionista para un plan ajustado a tus necesidades.
        </Callout>
      </div>

      {/* Guía rápida de porciones */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <Icon name="target" className="w-8 h-8 text-red-500" weight="fill" />
          Guía rápida de porciones con las manos
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
          No necesitas pesar la comida. Usa tus manos como referencia para estimar porciones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl ring-1 ring-blue-100 dark:ring-blue-900 text-center">
            <p className="text-3xl mb-2">🤚</p>
            <p className="font-black text-blue-700 dark:text-blue-400 text-sm">Palma de la mano</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">= 1 porción de proteína (~100 g de carne o pollo)</p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl ring-1 ring-amber-100 dark:ring-amber-900 text-center">
            <p className="text-3xl mb-2">✊</p>
            <p className="font-black text-amber-700 dark:text-amber-400 text-sm">Puño cerrado</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">= 1 porción de carbohidratos (~1 taza de arroz cocido)</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl ring-1 ring-purple-100 dark:ring-purple-900 text-center">
            <p className="text-3xl mb-2">👍</p>
            <p className="font-black text-purple-700 dark:text-purple-400 text-sm">Pulgar</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">= 1 porción de grasas (~1 cucharada de aceite o mantequilla)</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl ring-1 ring-emerald-100 dark:ring-emerald-900 text-center">
            <p className="text-3xl mb-2">🫶</p>
            <p className="font-black text-emerald-700 dark:text-emerald-400 text-sm">Dos manos juntas</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">= 1 porción de verduras (~1 taza de ensalada)</p>
          </div>
        </div>

        <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Regla general por comida:</p>
          <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
            <li>1 palma de proteína</li>
            <li>1 puño de carbohidratos</li>
            <li>1 pulgar de grasas</li>
            <li>2 puños de verduras</li>
          </ul>
        </div>

        <Callout type="warning" title="Aviso importante">
          Las estimaciones con las manos son aproximadas. Si tienes un objetivo específico de peso, consulta a un profesional de la salud para una guía personalizada.
        </Callout>
      </div>

      <CalculatorFooter href="/salud/calculadora-calorias" />
    </div>
  );
}
