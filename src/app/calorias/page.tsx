"use client";

import { useState } from "react";
import Link from "next/link";

type Sexo = "hombre" | "mujer";
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
  { valor: "perder" as Objetivo, nombre: "Perder peso", emoji: "📉", ajuste: -500 },
  { valor: "mantener" as Objetivo, nombre: "Mantener", emoji: "⚖️", ajuste: 0 },
  { valor: "ganar" as Objetivo, nombre: "Ganar masa", emoji: "📈", ajuste: 500 },
];

export default function Calorias() {
  const [sexo, setSexo] = useState<Sexo>("hombre");
  const [edad, setEdad] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [actividad, setActividad] = useState<NivelActividad>("moderado");
  const [objetivo, setObjetivo] = useState<Objetivo>("mantener");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    const edadNum = parseFloat(edad);
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (isNaN(edadNum) || isNaN(pesoNum) || isNaN(alturaNum)) return;

    // Fórmula Mifflin-St Jeor
    let tmb: number;
    if (sexo === "hombre") {
      tmb = 10 * pesoNum + 6.25 * alturaNum - 5 * edadNum + 5;
    } else {
      tmb = 10 * pesoNum + 6.25 * alturaNum - 5 * edadNum - 161;
    }

    const factorActividad = nivelesActividad.find(n => n.valor === actividad)?.factor || 1.55;
    const tdee = tmb * factorActividad;

    const ajusteObjetivo = objetivos.find(o => o.valor === objetivo)?.ajuste || 0;
    const caloriasObjetivo = tdee + ajusteObjetivo;

    // Macros (basado en objetivo)
    let proteinaPorKg: number;
    let grasaPorcentaje: number;

    if (objetivo === "perder") {
      proteinaPorKg = 2.2; // Más proteína para preservar músculo
      grasaPorcentaje = 0.25;
    } else if (objetivo === "ganar") {
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

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-orange-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">🔥</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Calorías
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            TDEE y macronutrientes personalizados
          </p>
        </div>

        <div className="space-y-6">
          {/* Sexo */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSexo("hombre")}
              className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                sexo === "hombre"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              👨 Hombre
            </button>
            <button
              onClick={() => setSexo("mujer")}
              className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                sexo === "mujer"
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              👩 Mujer
            </button>
          </div>

          {/* Datos físicos */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Edad</label>
              <div className="relative">
                <input
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
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
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
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
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
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
                  onClick={() => setActividad(nivel.valor)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    actividad === nivel.valor
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <p className="font-bold">{nivel.nombre}</p>
                  <p className={`text-sm ${actividad === nivel.valor ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
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
                  onClick={() => setObjetivo(obj.valor)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    objetivo === obj.valor
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <p className="text-2xl mb-1">{obj.emoji}</p>
                  <p className="font-bold text-sm">{obj.nombre}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-orange-500/20 active:scale-[0.99]"
          >
            Calcular Calorías
          </button>

          {resultado && (
            <div className="mt-10 space-y-4">
              {/* TDEE */}
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 rounded-3xl text-center ring-1 ring-orange-100 dark:ring-orange-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">Tu gasto calórico diario (TDEE)</p>
                <p className="text-5xl font-black text-orange-600">{resultado.tdee.toLocaleString()}</p>
                <p className="text-slate-500 dark:text-slate-400 font-bold">calorías/día</p>
              </div>

              {/* Calorías objetivo */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl text-center ring-1 ring-emerald-100 dark:ring-emerald-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">
                  Para {objetivo === "perder" ? "perder peso" : objetivo === "ganar" ? "ganar masa" : "mantener"}
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
                  <p className="text-xs font-bold text-amber-500">Carbohidratos</p>
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
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-base">ℹ️</span>
          ¿Qué significan estos números?
        </h2>
        <ul className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">TMB:</span>
            Calorías que quemas en reposo total (funciones vitales)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">TDEE:</span>
            Total de calorías que quemas al día incluyendo actividad
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">Macros:</span>
            Distribución sugerida de proteínas, carbohidratos y grasas
          </li>
        </ul>
      </div>
    </div>
  );
}
