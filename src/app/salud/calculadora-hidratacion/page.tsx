"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";

type NivelActividad = "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo";
type Clima = "templado" | "calido" | "muy_calido";

interface Resultado {
  aguaBase: number;
  aguaActividad: number;
  aguaClima: number;
  aguaTotal: number;
  vasos: number;
  botellas: number;
}

export default function CalculadoraHidratacion() {
  const [peso, setPeso] = useState<string>("");
  const [actividad, setActividad] = useState<NivelActividad>("ligero");
  const [clima, setClima] = useState<Clima>("templado");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    const pesoNum = parseFloat(peso);
    if (isNaN(pesoNum) || pesoNum <= 0) return;

    // Fórmula base: 35ml por kg de peso corporal
    const aguaBase = pesoNum * 35;

    // Ajuste por actividad física
    const factoresActividad: Record<NivelActividad, number> = {
      sedentario: 0,
      ligero: 350,
      moderado: 500,
      activo: 700,
      muy_activo: 1000,
    };
    const aguaActividad = factoresActividad[actividad];

    // Ajuste por clima
    const factoresClima: Record<Clima, number> = {
      templado: 0,
      calido: 500,
      muy_calido: 750,
    };
    const aguaClima = factoresClima[clima];

    const aguaTotal = aguaBase + aguaActividad + aguaClima;
    const vasos = Math.ceil(aguaTotal / 250); // Vasos de 250ml
    const botellas = aguaTotal / 500; // Botellas de 500ml

    setResultado({
      aguaBase,
      aguaActividad,
      aguaClima,
      aguaTotal,
      vasos,
      botellas,
    });
  };

  const faqs = [
    {
      question: "¿Cuánta agua debo tomar al día?",
      answer:
        "La cantidad recomendada varía según tu peso, actividad física y clima. Una regla general es 35ml por kilogramo de peso corporal, ajustada según tu nivel de actividad y el clima donde vives.",
    },
    {
      question: "¿Cuenta el café y té como hidratación?",
      answer:
        "Sí, pero con moderación. Aunque contienen cafeína (diurético leve), la cantidad de agua que aportan supera la pérdida. Sin embargo, el agua pura sigue siendo la mejor opción.",
    },
    {
      question: "¿Cuáles son los signos de deshidratación?",
      answer:
        "Los principales signos son: sed intensa, orina oscura, fatiga, dolor de cabeza, mareos, piel seca y confusión. Si tu orina es amarillo claro, estás bien hidratado.",
    },
    {
      question: "¿Es malo tomar demasiada agua?",
      answer:
        "Sí, beber agua en exceso puede causar hiponatremia (niveles bajos de sodio). Esto es raro pero puede ocurrir si bebes varios litros en poco tiempo. Escucha a tu cuerpo.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Calorías",
      href: "/salud/calculadora-calorias",
      description: "Calcula tu gasto calórico diario",
      emoji: "🔥",
    },
    {
      name: "Calculadora de IMC",
      href: "/salud/calculadora-imc",
      description: "Conoce tu peso ideal",
      emoji: "⚖️",
    },
  ];

  const nivelesActividad = [
    { value: "sedentario", label: "Sedentario", desc: "Sin ejercicio" },
    { value: "ligero", label: "Ligero", desc: "1-2 días/semana" },
    { value: "moderado", label: "Moderado", desc: "3-4 días/semana" },
    { value: "activo", label: "Activo", desc: "5-6 días/semana" },
    { value: "muy_activo", label: "Muy activo", desc: "Diario intenso" },
  ];

  const nivelesClima = [
    { value: "templado", label: "Templado", desc: "< 25°C" },
    { value: "calido", label: "Cálido", desc: "25-32°C" },
    { value: "muy_calido", label: "Muy cálido", desc: "> 32°C" },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-cyan-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            💧
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Hidratación
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Descubre cuánta agua necesitas al día
          </p>
        </div>

        <div className="space-y-8">
          {/* Peso */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tu peso (kg)
            </label>
            <div className="relative">
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="70"
                step="0.1"
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-14"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                kg
              </span>
            </div>
          </div>

          {/* Nivel de actividad */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Nivel de actividad física
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {nivelesActividad.map((nivel) => (
                <button
                  key={nivel.value}
                  onClick={() => setActividad(nivel.value as NivelActividad)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    actividad === nivel.value
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="font-bold text-sm block">{nivel.label}</span>
                  <span className={`text-xs ${actividad === nivel.value ? "text-cyan-100" : "text-slate-400"}`}>
                    {nivel.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Clima */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Clima donde vives
            </label>
            <div className="grid grid-cols-3 gap-2">
              {nivelesClima.map((nivel) => (
                <button
                  key={nivel.value}
                  onClick={() => setClima(nivel.value as Clima)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    clima === nivel.value
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="font-bold text-sm block">{nivel.label}</span>
                  <span className={`text-xs ${clima === nivel.value ? "text-cyan-100" : "text-slate-400"}`}>
                    {nivel.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.99]"
          >
            Calcular hidratación
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              {/* Resultado principal */}
              <div className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50 rounded-3xl text-center ring-1 ring-cyan-100 dark:ring-cyan-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">
                  Necesitas beber
                </p>
                <p className="text-7xl font-black text-cyan-600 mb-2 tracking-tighter">
                  {(resultado.aguaTotal / 1000).toFixed(1)}
                </p>
                <p className="text-2xl font-bold text-cyan-500">litros al día</p>
              </div>

              {/* Desglose */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-800">
                  <p className="text-3xl font-black text-slate-700 dark:text-slate-200">
                    {resultado.vasos}
                  </p>
                  <p className="text-xs font-bold text-slate-400">vasos (250ml)</p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-800">
                  <p className="text-3xl font-black text-slate-700 dark:text-slate-200">
                    {resultado.botellas.toFixed(1)}
                  </p>
                  <p className="text-xs font-bold text-slate-400">botellas (500ml)</p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-800">
                  <p className="text-3xl font-black text-slate-700 dark:text-slate-200">
                    {Math.round(resultado.aguaTotal)}
                  </p>
                  <p className="text-xs font-bold text-slate-400">ml totales</p>
                </div>
              </div>

              {/* Distribución */}
              <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                  Cómo se calcula
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Base (35ml × peso)</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{Math.round(resultado.aguaBase)} ml</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">+ Actividad física</span>
                    <span className="font-bold text-cyan-600">+{resultado.aguaActividad} ml</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">+ Ajuste por clima</span>
                    <span className="font-bold text-orange-500">+{resultado.aguaClima} ml</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Total diario</span>
                    <span className="font-black text-cyan-600 text-lg">{Math.round(resultado.aguaTotal)} ml</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl ring-1 ring-emerald-100 dark:ring-emerald-900">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                  Consejos para mantenerte hidratado
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    Bebe un vaso de agua al despertar
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    Lleva una botella de agua contigo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    Bebe antes de sentir sed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    Come frutas y verduras con alto contenido de agua
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center text-base">
            ℹ️
          </span>
          ¿Por qué es importante hidratarse?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          El agua es esencial para casi todas las funciones del cuerpo: regula
          la temperatura, transporta nutrientes, elimina toxinas y mantiene la
          piel saludable. Una hidratación adecuada mejora la concentración, el
          rendimiento físico y el estado de ánimo.
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <FAQ items={faqs} colorClass="cyan" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
