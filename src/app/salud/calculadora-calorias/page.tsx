"use client";

import { useState, useEffect } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";
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

  const faqs = [
    {
      question: "¿Qué es el TDEE y cómo se calcula?",
      answer:
        "TDEE (Total Daily Energy Expenditure) es el total de calorías que quemas al día, incluyendo actividad física. Se calcula multiplicando tu TMB (metabolismo basal) por un factor de actividad.",
    },
    {
      question: "¿Qué es el metabolismo basal (TMB)?",
      answer:
        "El TMB son las calorías que tu cuerpo necesita en reposo absoluto para funciones vitales como respirar, bombear sangre y mantener la temperatura corporal.",
    },
    {
      question: "¿Cuántas calorías debo comer para bajar de peso?",
      answer:
        "Para perder peso de forma saludable, se recomienda un déficit de 300-500 calorías diarias respecto a tu TDEE. Esto permite perder aproximadamente 0.5 kg por semana.",
    },
    {
      question: "¿Qué son los macronutrientes?",
      answer:
        "Los macronutrientes son proteínas, carbohidratos y grasas. Su distribución afecta tus resultados: más proteína ayuda a mantener músculo, los carbos dan energía, y las grasas son esenciales para hormonas.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de IMC",
      href: "/salud/calculadora-imc",
      description: "Calcula tu Índice de Masa Corporal",
      icon: "scale",
    },
    {
      name: "Calculadora de Porcentajes",
      href: "/herramientas/calculadora-porcentajes",
      description: "Para calcular % de macros",
      icon: "percent",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-red-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-red-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <Icon name="flame" className="w-10 h-10" />
          </div>
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

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="red" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
