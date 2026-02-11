"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";

type Modo = "despertar" | "dormir";

interface HoraSugerida {
  hora: string;
  ciclos: number;
  horasTotales: number;
  calidad: "optima" | "buena" | "minima";
}

export default function CalculadoraSueno() {
  const [modo, setModo] = useState<Modo>("despertar");
  const [hora, setHora] = useState<string>("07:00");
  const [resultado, setResultado] = useState<HoraSugerida[] | null>(null);

  const DURACION_CICLO = 90; // minutos
  const TIEMPO_DORMIRSE = 15; // minutos promedio para quedarse dormido

  const calcular = () => {
    const [horaStr, minStr] = hora.split(":");
    const horaNum = parseInt(horaStr);
    const minNum = parseInt(minStr);

    if (isNaN(horaNum) || isNaN(minNum)) return;

    const sugerencias: HoraSugerida[] = [];

    if (modo === "despertar") {
      // Calcular horas para irse a dormir dado que quiere despertar a X hora
      // Restamos ciclos completos desde la hora de despertar
      for (let ciclos = 6; ciclos >= 3; ciclos--) {
        const minutosTotales = ciclos * DURACION_CICLO + TIEMPO_DORMIRSE;

        let horaDormir = horaNum;
        let minDormir = minNum - minutosTotales;

        // Ajustar si los minutos son negativos
        while (minDormir < 0) {
          minDormir += 60;
          horaDormir -= 1;
        }
        while (horaDormir < 0) {
          horaDormir += 24;
        }

        const horaFormateada = `${horaDormir.toString().padStart(2, "0")}:${minDormir.toString().padStart(2, "0")}`;
        const horasTotales = (ciclos * DURACION_CICLO) / 60;

        let calidad: "optima" | "buena" | "minima" = "minima";
        if (ciclos >= 5) calidad = "optima";
        else if (ciclos >= 4) calidad = "buena";

        sugerencias.push({
          hora: horaFormateada,
          ciclos,
          horasTotales,
          calidad,
        });
      }
    } else {
      // Calcular horas óptimas para despertar dado que se va a dormir a X hora
      // Sumamos tiempo para dormirse + ciclos completos
      for (let ciclos = 3; ciclos <= 6; ciclos++) {
        const minutosTotales = ciclos * DURACION_CICLO + TIEMPO_DORMIRSE;

        let horaDespertar = horaNum;
        let minDespertar = minNum + minutosTotales;

        // Ajustar si los minutos exceden 60
        while (minDespertar >= 60) {
          minDespertar -= 60;
          horaDespertar += 1;
        }
        while (horaDespertar >= 24) {
          horaDespertar -= 24;
        }

        const horaFormateada = `${horaDespertar.toString().padStart(2, "0")}:${minDespertar.toString().padStart(2, "0")}`;
        const horasTotales = (ciclos * DURACION_CICLO) / 60;

        let calidad: "optima" | "buena" | "minima" = "minima";
        if (ciclos >= 5) calidad = "optima";
        else if (ciclos >= 4) calidad = "buena";

        sugerencias.push({
          hora: horaFormateada,
          ciclos,
          horasTotales,
          calidad,
        });
      }
    }

    setResultado(sugerencias);
  };

  const getCalidadStyle = (calidad: string) => {
    switch (calidad) {
      case "optima":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/50",
          border: "border-emerald-200 dark:border-emerald-800",
          text: "text-emerald-600 dark:text-emerald-400",
          badge: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
        };
      case "buena":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/50",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-amber-600 dark:text-amber-400",
          badge: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
        };
      default:
        return {
          bg: "bg-slate-50 dark:bg-slate-800/50",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-600 dark:text-slate-400",
          badge: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
        };
    }
  };

  const faqs = [
    {
      question: "¿Qué es un ciclo de sueño?",
      answer:
        "Un ciclo de sueño dura aproximadamente 90 minutos y pasa por diferentes fases: sueño ligero, sueño profundo y sueño REM. Despertar al final de un ciclo te hace sentir más descansado.",
    },
    {
      question: "¿Cuántas horas de sueño necesito?",
      answer:
        "La mayoría de adultos necesitan entre 7-9 horas (4-6 ciclos). Sin embargo, lo importante es despertar al final de un ciclo completo, no la cantidad exacta de horas.",
    },
    {
      question: "¿Por qué me siento cansado aunque dormí 8 horas?",
      answer:
        "Probablemente despertaste en medio de un ciclo de sueño profundo. Despertar entre ciclos (no durante uno) te hace sentir más descansado, incluso con menos horas totales.",
    },
    {
      question: "¿Qué pasa si duermo menos de 4 ciclos?",
      answer:
        "Dormir menos de 6 horas (4 ciclos) regularmente puede afectar tu salud, concentración, memoria y sistema inmune. Intenta siempre completar al menos 4 ciclos.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Calorías",
      href: "/salud/calculadora-calorias",
      description: "Calcula tu gasto calórico",
      icon: "flame",
    },
    {
      name: "Calculadora de Hidratación",
      href: "/salud/calculadora-hidratacion",
      description: "Cuánta agua necesitas",
      icon: "droplets",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-indigo-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <Icon name="moon" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Sueño
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Optimiza tus ciclos de sueño
          </p>
        </div>

        <div className="space-y-8">
          {/* Selector de modo */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setModo("despertar")}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${modo === "despertar"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
            >
              Quiero despertar a las...
            </button>
            <button
              onClick={() => setModo("dormir")}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${modo === "dormir"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
            >
              Me voy a dormir a las...
            </button>
          </div>

          {/* Input de hora */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 text-center">
              {modo === "despertar" ? "¿A qué hora necesitas despertar?" : "¿A qué hora te vas a dormir?"}
            </label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-3xl font-bold text-center"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.99]"
          >
            Calcular horas óptimas
          </button>

          {resultado && (
            <div className="mt-10 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 text-center">
                {modo === "despertar" ? "Deberías ir a dormir a las:" : "Deberías despertar a las:"}
              </h3>

              {resultado.map((sugerencia, index) => {
                const style = getCalidadStyle(sugerencia.calidad);
                return (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl ${style.bg} border ${style.border} flex items-center justify-between`}
                  >
                    <div>
                      <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                        {sugerencia.hora}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {sugerencia.ciclos} ciclos · {sugerencia.horasTotales} horas
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${style.badge}`}>
                      {sugerencia.calidad === "optima" && "Óptimo"}
                      {sugerencia.calidad === "buena" && "Bueno"}
                      {sugerencia.calidad === "minima" && "Mínimo"}
                    </span>
                  </div>
                );
              })}

              {/* Nota explicativa */}
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Nota:</strong> Se incluyen ~15 minutos promedio para quedarse dormido.
                  Despertar al final de un ciclo te ayuda a sentirte más descansado.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Información sobre ciclos */}
        <div className="mt-12 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-4">Fases de un ciclo de sueño</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <div className="flex-shrink-0 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-center">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400">N1</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ligero</p>
            </div>
            <span className="text-slate-300">→</span>
            <div className="flex-shrink-0 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-center">
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">N2</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Medio</p>
            </div>
            <span className="text-slate-300">→</span>
            <div className="flex-shrink-0 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-center">
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400">N3</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Profundo</p>
            </div>
            <span className="text-slate-300">→</span>
            <div className="flex-shrink-0 px-4 py-2 bg-pink-100 dark:bg-pink-900/50 rounded-lg text-center">
              <p className="text-xs font-bold text-pink-600 dark:text-pink-400">REM</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sueños</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
            Cada ciclo dura ~90 minutos. Despertar en N3 causa fatiga; despertar después del REM es ideal.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <Icon name="info" className="w-8 h-8 text-indigo-500" weight="fill" />
          ¿Por qué importan los ciclos de sueño?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Tu cerebro pasa por diferentes fases de sueño durante la noche. El
          sueño profundo (N3) es crucial para la recuperación física, mientras
          que el REM consolida la memoria. Despertar durante el sueño profundo
          causa esa sensación de aturdimiento, incluso después de dormir muchas
          horas.
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <FAQ items={faqs} colorClass="indigo" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
