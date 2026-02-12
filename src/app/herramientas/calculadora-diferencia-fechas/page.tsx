"use client";

import { useState, useEffect, useCallback } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import Link from "next/link";
import { Icon } from "@/lib/icons";

interface Resultado {
  dias: number;
  semanas: number;
  meses: number;
  anios: number;
  aniosCompletos: number;
  mesesRestantes: number;
  diasRestantes: number;
  horas: number;
  minutos: number;
  diasLaborables: number;
  finesDeSemana: number;
}

function esFeriado(fecha: Date): boolean {
  // Solo algunos feriados fijos comunes en Latinoamérica
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();

  const feriados = [
    [1, 1],   // Año nuevo
    [5, 1],   // Día del trabajo
    [12, 25], // Navidad
  ];

  return feriados.some(([m, d]) => m === mes && d === dia);
}

function contarDiasLaborables(inicio: Date, fin: Date): { laborables: number; finesDeSemana: number } {
  let laborables = 0;
  let finesDeSemana = 0;

  const fechaActual = new Date(inicio);
  while (fechaActual <= fin) {
    const diaSemana = fechaActual.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      finesDeSemana++;
    } else if (!esFeriado(fechaActual)) {
      laborables++;
    }
    fechaActual.setDate(fechaActual.getDate() + 1);
  }

  return { laborables, finesDeSemana };
}

function calcularDiferenciaExacta(inicio: Date, fin: Date): { anios: number; meses: number; dias: number } {
  let anios = fin.getFullYear() - inicio.getFullYear();
  let meses = fin.getMonth() - inicio.getMonth();
  let dias = fin.getDate() - inicio.getDate();

  if (dias < 0) {
    meses--;
    const mesAnterior = new Date(fin.getFullYear(), fin.getMonth(), 0);
    dias += mesAnterior.getDate();
  }

  if (meses < 0) {
    anios--;
    meses += 12;
  }

  return { anios, meses, dias };
}

export default function DiferenciaFechas() {
  const { values, setField, hadInitialParams } = useUrlState(
    { fechaInicio: "", fechaFin: "" },
    { paramNames: { fechaInicio: "inicio", fechaFin: "fin" } }
  );

  const fechaInicio = values.fechaInicio;
  const fechaFin = values.fechaFin;
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcular = useCallback(() => {
    if (!fechaInicio || !fechaFin) return;

    let inicio = new Date(fechaInicio + "T00:00:00");
    let fin = new Date(fechaFin + "T00:00:00");

    // Asegurar que inicio < fin
    if (inicio > fin) {
      [inicio, fin] = [fin, inicio];
    }

    const diffMs = fin.getTime() - inicio.getTime();
    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor(diffMs / (1000 * 60));

    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30.44);
    const anios = Math.floor(dias / 365.25);

    const exacta = calcularDiferenciaExacta(inicio, fin);
    const { laborables, finesDeSemana } = contarDiasLaborables(inicio, fin);

    setResultado({
      dias,
      semanas,
      meses,
      anios,
      aniosCompletos: exacta.anios,
      mesesRestantes: exacta.meses,
      diasRestantes: exacta.dias,
      horas,
      minutos,
      diasLaborables: laborables,
      finesDeSemana,
    });
  }, [fechaInicio, fechaFin]);

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams, calcular]);

  const setHoy = (campo: "inicio" | "fin") => {
    const hoy = new Date().toISOString().split("T")[0];
    if (campo === "inicio") {
      setField("fechaInicio", hoy);
    } else {
      setField("fechaFin", hoy);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-ES").format(num);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-purple-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-purple-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <Icon name="calendar" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Diferencia entre Fechas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula el tiempo exacto entre dos fechas
          </p>
        </div>

        <div className="space-y-6">
          {/* Fecha inicio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Fecha de inicio
              </label>
              <button
                onClick={() => setHoy("inicio")}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700"
              >
                Hoy
              </button>
            </div>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setField("fechaInicio", e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          {/* Fecha fin */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Fecha de fin
              </label>
              <button
                onClick={() => setHoy("fin")}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700"
              >
                Hoy
              </button>
            </div>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setField("fechaFin", e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-purple-500/20 active:scale-[0.99]"
          >
            Calcular Diferencia
          </button>

          {resultado && (
            <div className="mt-10 space-y-4">
              {/* Resultado exacto */}
              <div className="p-6 bg-purple-50 dark:bg-purple-950/50 rounded-3xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-3">Diferencia exacta</p>
                <div className="flex justify-center items-baseline gap-2 flex-wrap">
                  {resultado.aniosCompletos > 0 && (
                    <>
                      <span className="text-4xl font-black text-purple-600">{resultado.aniosCompletos}</span>
                      <span className="text-lg font-bold text-purple-500 mr-2">
                        {resultado.aniosCompletos === 1 ? "año" : "años"}
                      </span>
                    </>
                  )}
                  {resultado.mesesRestantes > 0 && (
                    <>
                      <span className="text-3xl font-black text-purple-500">{resultado.mesesRestantes}</span>
                      <span className="text-base font-bold text-purple-400 mr-2">
                        {resultado.mesesRestantes === 1 ? "mes" : "meses"}
                      </span>
                    </>
                  )}
                  <span className="text-2xl font-black text-purple-400">{resultado.diasRestantes}</span>
                  <span className="text-sm font-bold text-purple-300">
                    {resultado.diasRestantes === 1 ? "día" : "días"}
                  </span>
                </div>
              </div>

              {/* Total días */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                <p className="text-4xl font-black text-slate-700 dark:text-slate-300 tracking-tighter">
                  {formatNumber(resultado.dias)} <span className="text-xl font-bold text-slate-400 dark:text-slate-500">días totales</span>
                </p>
              </div>

              {/* Grid de estadísticas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">{formatNumber(resultado.semanas)}</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">semanas</p>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">{formatNumber(resultado.meses)}</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">meses</p>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">{formatNumber(resultado.horas)}</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">horas</p>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">{formatNumber(resultado.minutos)}</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">minutos</p>
                </div>
              </div>

              {/* Días laborables */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 rounded-2xl text-center ring-1 ring-emerald-100 dark:ring-emerald-900">
                  <p className="text-2xl font-black text-emerald-600">{formatNumber(resultado.diasLaborables)}</p>
                  <p className="text-xs font-bold text-emerald-500">días laborables</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-2xl text-center ring-1 ring-purple-100 dark:ring-purple-900">
                  <p className="text-2xl font-black text-purple-600">{formatNumber(resultado.finesDeSemana)}</p>
                  <p className="text-xs font-bold text-purple-500">fines de semana</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
          </span>
          Usos comunes
        </h2>
        <ul className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            Calcular cuántos días faltan para un evento importante
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            Saber la duración exacta de un proyecto o contrato
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            Contar días laborables para facturación o plazos
          </li>
        </ul>
      </div>
    </div>
  );
}
