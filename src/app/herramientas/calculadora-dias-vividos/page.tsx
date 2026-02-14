"use client";

import { useState, useEffect, useCallback } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Icon } from "@/lib/icons";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";

interface Resultado {
  dias: number;
  horas: number;
  minutos: number;
  semanas: number;
  meses: number;
  edadAnios: number;
  edadMeses: number;
  edadDias: number;
  proximoCumple: number;
  signoZodiacal: { nombre: string; emoji: string };
  generacion: string;
  diaSemana: string;
}

const signosZodiacales = [
  { nombre: "Capricornio", emoji: "♑", inicio: [1, 1], fin: [1, 19] },
  { nombre: "Acuario", emoji: "♒", inicio: [1, 20], fin: [2, 18] },
  { nombre: "Piscis", emoji: "♓", inicio: [2, 19], fin: [3, 20] },
  { nombre: "Aries", emoji: "♈", inicio: [3, 21], fin: [4, 19] },
  { nombre: "Tauro", emoji: "♉", inicio: [4, 20], fin: [5, 20] },
  { nombre: "Géminis", emoji: "♊", inicio: [5, 21], fin: [6, 20] },
  { nombre: "Cáncer", emoji: "♋", inicio: [6, 21], fin: [7, 22] },
  { nombre: "Leo", emoji: "♌", inicio: [7, 23], fin: [8, 22] },
  { nombre: "Virgo", emoji: "♍", inicio: [8, 23], fin: [9, 22] },
  { nombre: "Libra", emoji: "♎", inicio: [9, 23], fin: [10, 22] },
  { nombre: "Escorpio", emoji: "♏", inicio: [10, 23], fin: [11, 21] },
  { nombre: "Sagitario", emoji: "♐", inicio: [11, 22], fin: [12, 21] },
  { nombre: "Capricornio", emoji: "♑", inicio: [12, 22], fin: [12, 31] },
];

const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function obtenerSigno(mes: number, dia: number): { nombre: string; emoji: string } {
  for (const signo of signosZodiacales) {
    const [mesInicio, diaInicio] = signo.inicio;
    const [mesFin, diaFin] = signo.fin;

    if (
      (mes === mesInicio && dia >= diaInicio) ||
      (mes === mesFin && dia <= diaFin)
    ) {
      return { nombre: signo.nombre, emoji: signo.emoji };
    }
  }
  return { nombre: "Capricornio", emoji: "♑" };
}

function obtenerGeneracion(anio: number): string {
  if (anio >= 2013) return "Generación Alpha";
  if (anio >= 1997) return "Generación Z";
  if (anio >= 1981) return "Millennial";
  if (anio >= 1965) return "Generación X";
  if (anio >= 1946) return "Baby Boomer";
  return "Generación Silenciosa";
}

function calcularEdadExacta(nacimiento: Date, hoy: Date): { anios: number; meses: number; dias: number } {
  let anios = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();
  let dias = hoy.getDate() - nacimiento.getDate();

  if (dias < 0) {
    meses--;
    const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    dias += mesAnterior.getDate();
  }

  if (meses < 0) {
    anios--;
    meses += 12;
  }

  return { anios, meses, dias };
}

export default function DiasVividos() {
  const { values, setField, hadInitialParams } = useUrlState(
    { fechaNacimiento: "" },
    { paramNames: { fechaNacimiento: "fecha" } }
  );

  const fechaNacimiento = values.fechaNacimiento;
  const [resultado, setResultado] = useState<Resultado | null>(null);
  useCalculatorTracking(resultado !== null);

  const calcular = useCallback(() => {
    if (!fechaNacimiento) return;

    const nacimiento = new Date(fechaNacimiento + "T00:00:00");
    const hoy = new Date();

    const diffMs = hoy.getTime() - nacimiento.getTime();

    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor(diffMs / (1000 * 60));
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30.44);

    const edadExacta = calcularEdadExacta(nacimiento, hoy);

    const proximoCumple = new Date(
      hoy.getFullYear(),
      nacimiento.getMonth(),
      nacimiento.getDate()
    );
    if (proximoCumple <= hoy) {
      proximoCumple.setFullYear(proximoCumple.getFullYear() + 1);
    }
    const diasHastaCumple = Math.ceil(
      (proximoCumple.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );

    const signoZodiacal = obtenerSigno(nacimiento.getMonth() + 1, nacimiento.getDate());
    const generacion = obtenerGeneracion(nacimiento.getFullYear());
    const diaSemana = diasSemana[nacimiento.getDay()];

    setResultado({
      dias,
      horas,
      minutos,
      semanas,
      meses,
      edadAnios: edadExacta.anios,
      edadMeses: edadExacta.meses,
      edadDias: edadExacta.dias,
      proximoCumple: diasHastaCumple,
      signoZodiacal,
      generacion,
      diaSemana,
    });
  }, [fechaNacimiento]);

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams, calcular]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-ES").format(num);
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-purple-500/5">
        <CalculatorHeader
          title="Días Vividos"
          subtitle="Descubre tu vida en números"
          icon="calendar"
          gradient="herramientas"
        />

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuándo naciste?
            </label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setField("fechaNacimiento", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-purple-500/20 active:scale-[0.99]"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-10 space-y-4">
              {/* Edad exacta */}
              <div className="p-6 bg-purple-50 dark:bg-purple-950/50 rounded-3xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">Tu edad exacta</p>
                <div className="flex justify-center items-baseline gap-1 flex-wrap">
                  <span className="text-5xl font-black text-purple-600">{resultado.edadAnios}</span>
                  <span className="text-lg font-bold text-purple-500">años</span>
                  <span className="text-3xl font-black text-purple-500 mx-1">{resultado.edadMeses}</span>
                  <span className="text-base font-bold text-purple-400">meses</span>
                  <span className="text-2xl font-black text-purple-400 mx-1">{resultado.edadDias}</span>
                  <span className="text-sm font-bold text-purple-300">días</span>
                </div>
              </div>

              {/* Días vividos */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Has vivido</p>
                <p className="text-4xl font-black text-slate-700 dark:text-slate-300 tracking-tighter">
                  {formatNumber(resultado.dias)} <span className="text-xl font-bold text-slate-400 dark:text-slate-500">días</span>
                </p>
              </div>

              {/* Grid de estadísticas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">
                    {formatNumber(resultado.horas)}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">horas</p>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">
                    {formatNumber(resultado.semanas)}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">semanas</p>
                </div>
              </div>

              {/* Signo y generación */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-2xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
                  <p className="text-3xl mb-1">{resultado.signoZodiacal.emoji}</p>
                  <p className="font-bold text-purple-700 dark:text-purple-300">{resultado.signoZodiacal.nombre}</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-2xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
                  <Icon name="user" className="w-8 h-8 mx-auto mb-1 text-purple-600 dark:text-purple-400" weight="fill" />
                  <p className="font-bold text-purple-700 dark:text-purple-300 text-sm">{resultado.generacion}</p>
                </div>
              </div>

              {/* Día de nacimiento */}
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                  Naciste un <span className="font-bold text-slate-700 dark:text-slate-300">{resultado.diaSemana}</span>
                </p>
              </div>

              {/* Próximo cumpleaños */}
              <div className="p-5 bg-purple-50 dark:bg-purple-950/50 rounded-2xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {resultado.proximoCumple === 0 ? (
                    <span className="font-black text-purple-600 text-xl flex items-center justify-center gap-2">
                      ¡Hoy es tu cumpleaños! <Icon name="cake" className="w-6 h-6" />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Faltan <span className="font-black text-purple-600 text-xl">{resultado.proximoCumple}</span> días para tu cumple <Icon name="cake" className="w-6 h-6" />
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Icon name="lightbulb" className="w-6 h-6" weight="fill" />
          </span>
          Datos curiosos
        </h2>
        <ul className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            El promedio de vida mundial es de aproximadamente 27,375 días (75 años)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            Pasamos cerca de 8,760 días durmiendo (24 años)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            El corazón late aproximadamente 100,000 veces por día
          </li>
        </ul>
      </div>

      <CalculatorFooter href="/herramientas/calculadora-dias-vividos" />
    </div>
  );
}
