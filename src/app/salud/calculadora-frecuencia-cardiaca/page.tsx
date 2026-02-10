"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";

interface Zona {
  nombre: string;
  porcentajeMin: number;
  porcentajeMax: number;
  fcMin: number;
  fcMax: number;
  descripcion: string;
  colorClass: string;
  bgClass: string;
}

interface Resultado {
  fcMaxima: number;
  fcReposo: number;
  fcReserva: number;
  zonas: Zona[];
}

export default function CalculadoraFrecuenciaCardiaca() {
  const [edad, setEdad] = useState<string>("");
  const [fcReposo, setFcReposo] = useState<string>("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = () => {
    const edadNum = parseInt(edad);
    const fcReposoNum = parseInt(fcReposo) || 70; // Default si no ingresa

    if (isNaN(edadNum) || edadNum <= 0) return;

    // Fórmula de Tanaka (más precisa que 220-edad)
    const fcMaxima = Math.round(208 - 0.7 * edadNum);

    // Frecuencia cardíaca de reserva (método Karvonen)
    const fcReserva = fcMaxima - fcReposoNum;

    // Calcular zonas usando método Karvonen
    const zonasConfig = [
      { nombre: "Zona 1 - Recuperación", min: 50, max: 60, desc: "Calentamiento, enfriamiento, recuperación activa", color: "emerald" },
      { nombre: "Zona 2 - Quema de grasa", min: 60, max: 70, desc: "Resistencia básica, quema de grasa óptima", color: "cyan" },
      { nombre: "Zona 3 - Aeróbica", min: 70, max: 80, desc: "Mejora cardiovascular, resistencia aeróbica", color: "amber" },
      { nombre: "Zona 4 - Umbral anaeróbico", min: 80, max: 90, desc: "Alto rendimiento, entrenamiento de velocidad", color: "orange" },
      { nombre: "Zona 5 - Máxima", min: 90, max: 100, desc: "Esfuerzo máximo, sprints cortos", color: "rose" },
    ];

    const zonas: Zona[] = zonasConfig.map((z) => ({
      nombre: z.nombre,
      porcentajeMin: z.min,
      porcentajeMax: z.max,
      fcMin: Math.round(fcReposoNum + (fcReserva * z.min) / 100),
      fcMax: Math.round(fcReposoNum + (fcReserva * z.max) / 100),
      descripcion: z.desc,
      colorClass: `text-${z.color}-600`,
      bgClass: `bg-${z.color}-50 dark:bg-${z.color}-950/50`,
    }));

    setResultado({
      fcMaxima,
      fcReposo: fcReposoNum,
      fcReserva,
      zonas,
    });
  };

  const faqs = [
    {
      question: "¿Cómo mido mi frecuencia cardíaca en reposo?",
      answer:
        "Mídela al despertar, antes de levantarte de la cama. Cuenta tus pulsaciones durante 60 segundos colocando dos dedos en la muñeca o el cuello. Hazlo varios días y promedia los resultados.",
    },
    {
      question: "¿Qué es la frecuencia cardíaca máxima?",
      answer:
        "Es el número máximo de latidos por minuto que tu corazón puede alcanzar durante el ejercicio intenso. Disminuye con la edad y varía entre personas.",
    },
    {
      question: "¿En qué zona debo entrenar?",
      answer:
        "Depende de tu objetivo. Zona 2 para quemar grasa y resistencia base, Zona 3 para mejorar capacidad aeróbica, Zonas 4-5 para rendimiento deportivo y velocidad.",
    },
    {
      question: "¿Qué es el método Karvonen?",
      answer:
        "Es un método preciso para calcular zonas de entrenamiento que considera tu frecuencia cardíaca en reposo, no solo tu edad. Es más personalizado que la fórmula básica.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Calorías",
      href: "/salud/calculadora-calorias",
      description: "Calcula tu gasto calórico",
      emoji: "🔥",
    },
    {
      name: "Calculadora de IMC",
      href: "/salud/calculadora-imc",
      description: "Conoce tu peso ideal",
      emoji: "⚖️",
    },
  ];

  // Colores que Tailwind puede detectar (clases completas)
  const zonaColores = [
    { bg: "bg-emerald-50 dark:bg-emerald-950/50", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800", bar: "bg-emerald-400" },
    { bg: "bg-cyan-50 dark:bg-cyan-950/50", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-800", bar: "bg-cyan-400" },
    { bg: "bg-amber-50 dark:bg-amber-950/50", text: "text-amber-600 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800", bar: "bg-amber-400" },
    { bg: "bg-orange-50 dark:bg-orange-950/50", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800", bar: "bg-orange-400" },
    { bg: "bg-rose-50 dark:bg-rose-950/50", text: "text-rose-600 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800", bar: "bg-rose-400" },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-rose-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            ❤️
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Frecuencia Cardíaca
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula tus zonas de entrenamiento
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Edad */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Tu edad
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  placeholder="30"
                  className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-16"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                  años
                </span>
              </div>
            </div>

            {/* FC en reposo */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                FC en reposo (opcional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={fcReposo}
                  onChange={(e) => setFcReposo(e.target.value)}
                  placeholder="70"
                  className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-16"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                  bpm
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                Mídela al despertar. Si no la sabes, usamos 70 bpm.
              </p>
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-rose-500 to-red-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-rose-500/20 active:scale-[0.99]"
          >
            Calcular zonas
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              {/* Resultados principales */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-5 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/50 dark:to-red-950/50 rounded-2xl text-center ring-1 ring-rose-100 dark:ring-rose-900">
                  <p className="text-4xl font-black text-rose-600">{resultado.fcMaxima}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1">FC Máxima</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl text-center ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-4xl font-black text-slate-700 dark:text-slate-200">{resultado.fcReposo}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1">FC Reposo</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 rounded-2xl text-center ring-1 ring-violet-100 dark:ring-violet-900">
                  <p className="text-4xl font-black text-violet-600">{resultado.fcReserva}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1">FC Reserva</p>
                </div>
              </div>

              {/* Zonas de entrenamiento */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  Tus zonas de entrenamiento
                </h3>
                {resultado.zonas.map((zona, index) => (
                  <div
                    key={zona.nombre}
                    className={`p-4 rounded-2xl ${zonaColores[index].bg} border ${zonaColores[index].border}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold text-sm ${zonaColores[index].text}`}>
                        {zona.nombre}
                      </span>
                      <span className="text-lg font-black text-slate-700 dark:text-slate-200">
                        {zona.fcMin} - {zona.fcMax} bpm
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{zona.descripcion}</p>
                    {/* Barra visual */}
                    <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${zonaColores[index].bar} rounded-full`}
                        style={{ width: `${zona.porcentajeMax}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-right">
                      {zona.porcentajeMin}% - {zona.porcentajeMax}% de tu FC máxima
                    </p>
                  </div>
                ))}
              </div>

              {/* Tip de uso */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl ring-1 ring-amber-100 dark:ring-amber-900">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">
                  ¿Cómo usar estas zonas?
                </p>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>• <strong>80%</strong> de tu entrenamiento en Zonas 1-2</li>
                  <li>• <strong>20%</strong> en Zonas 3-5 (entrenamiento intenso)</li>
                  <li>• Usa un reloj o banda para monitorear tu FC</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center text-base">
            ℹ️
          </span>
          ¿Por qué entrenar por zonas?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Entrenar en diferentes zonas de frecuencia cardíaca te permite
          optimizar tus resultados. Cada zona activa diferentes sistemas
          energéticos de tu cuerpo. La zona 2 es ideal para quemar grasa y
          construir resistencia base, mientras que las zonas más altas mejoran
          tu velocidad y potencia.
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <FAQ items={faqs} colorClass="rose" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
