"use client";

import { useMemo } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Icon } from "@/lib/icons";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";

function calcularEdad(nacimiento: Date, referencia: Date) {
  let anios = referencia.getFullYear() - nacimiento.getFullYear();
  let meses = referencia.getMonth() - nacimiento.getMonth();
  let dias = referencia.getDate() - nacimiento.getDate();

  if (dias < 0) {
    meses--;
    const mesAnterior = new Date(referencia.getFullYear(), referencia.getMonth(), 0);
    dias += mesAnterior.getDate();
  }
  if (meses < 0) {
    anios--;
    meses += 12;
  }

  // Días totales
  const diffMs = referencia.getTime() - nacimiento.getTime();
  const diasTotales = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const semanasTotal = Math.floor(diasTotales / 7);
  const horasTotal = diasTotales * 24;

  // Próximo cumpleaños
  let proximoCumple = new Date(referencia.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
  if (proximoCumple <= referencia) {
    proximoCumple = new Date(referencia.getFullYear() + 1, nacimiento.getMonth(), nacimiento.getDate());
  }
  const diasParaCumple = Math.ceil((proximoCumple.getTime() - referencia.getTime()) / (1000 * 60 * 60 * 24));

  // Día de la semana en que nació
  const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const diaSemana = diasSemana[nacimiento.getDay()];

  // Signo zodiacal
  const signo = obtenerSigno(nacimiento.getMonth() + 1, nacimiento.getDate());

  return { anios, meses, dias, diasTotales, semanasTotal, horasTotal, diasParaCumple, diaSemana, signo };
}

function obtenerSigno(mes: number, dia: number) {
  const signos = [
    { nombre: "Capricornio", emoji: "♑", desde: [12, 22], hasta: [1, 19] },
    { nombre: "Acuario", emoji: "♒", desde: [1, 20], hasta: [2, 18] },
    { nombre: "Piscis", emoji: "♓", desde: [2, 19], hasta: [3, 20] },
    { nombre: "Aries", emoji: "♈", desde: [3, 21], hasta: [4, 19] },
    { nombre: "Tauro", emoji: "♉", desde: [4, 20], hasta: [5, 20] },
    { nombre: "Géminis", emoji: "♊", desde: [5, 21], hasta: [6, 20] },
    { nombre: "Cáncer", emoji: "♋", desde: [6, 21], hasta: [7, 22] },
    { nombre: "Leo", emoji: "♌", desde: [7, 23], hasta: [8, 22] },
    { nombre: "Virgo", emoji: "♍", desde: [8, 23], hasta: [9, 22] },
    { nombre: "Libra", emoji: "♎", desde: [9, 23], hasta: [10, 22] },
    { nombre: "Escorpio", emoji: "♏", desde: [10, 23], hasta: [11, 21] },
    { nombre: "Sagitario", emoji: "♐", desde: [11, 22], hasta: [12, 21] },
  ];

  for (const s of signos) {
    if (s.nombre === "Capricornio") {
      if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return s;
    } else {
      if (
        (mes === s.desde[0] && dia >= s.desde[1]) ||
        (mes === s.hasta[0] && dia <= s.hasta[1])
      ) return s;
    }
  }
  return signos[0];
}

function obtenerGeneracion(anioNac: number) {
  if (anioNac >= 2013) return "Generación Alpha";
  if (anioNac >= 1997) return "Generación Z";
  if (anioNac >= 1981) return "Millennial";
  if (anioNac >= 1965) return "Generación X";
  if (anioNac >= 1946) return "Baby Boomer";
  return "Generación Silenciosa";
}

export default function CalculadoraEdad() {
  useCalculatorTracking();
  const { values, setField } = useUrlState(
    { nacimiento: "" },
    { paramNames: { nacimiento: "fecha" } }
  );

  const resultado = useMemo(() => {
    if (!values.nacimiento) return null;
    const nacimiento = new Date(values.nacimiento + "T12:00:00");
    const hoy = new Date();
    if (isNaN(nacimiento.getTime()) || nacimiento > hoy) return null;
    return {
      ...calcularEdad(nacimiento, hoy),
      generacion: obtenerGeneracion(nacimiento.getFullYear()),
    };
  }, [values.nacimiento]);

  const formatNum = (num: number) =>
    new Intl.NumberFormat("es-CO").format(num);

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-purple-500/5">
        <CalculatorHeader title="Calculadora de Edad" subtitle="Tu edad exacta en años, meses y días" icon="calendar" gradient="herramientas" />

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuándo naciste?
            </label>
            <input
              type="date"
              value={values.nacimiento}
              onChange={(e) => setField("nacimiento", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          {resultado && (
            <div className="mt-8 space-y-4 animate-result-appear">
              {/* Edad principal */}
              <div className="p-8 bg-purple-50 dark:bg-purple-950/50 rounded-3xl ring-1 ring-purple-100 dark:ring-purple-900">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tu edad exacta</p>
                  <p className="text-4xl font-black text-purple-600 dark:text-purple-400">
                    {resultado.anios} años, {resultado.meses} meses y {resultado.dias} días
                  </p>
                </div>
              </div>

              {/* Datos curiosos */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-center ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Días vividos</p>
                  <p className="text-xl font-black text-slate-700 dark:text-slate-200">{formatNum(resultado.diasTotales)}</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-center ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Semanas vividas</p>
                  <p className="text-xl font-black text-slate-700 dark:text-slate-200">{formatNum(resultado.semanasTotal)}</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-center ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Horas vividas</p>
                  <p className="text-xl font-black text-slate-700 dark:text-slate-200">{formatNum(resultado.horasTotal)}</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-center ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Próximo cumpleaños</p>
                  <p className="text-xl font-black text-purple-600 dark:text-purple-400">{resultado.diasParaCumple} días</p>
                </div>
              </div>

              {/* Más datos */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Naciste un</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 capitalize">{resultado.diaSemana}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Signo zodiacal</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{resultado.signo.emoji} {resultado.signo.nombre}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Generación</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{resultado.generacion}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de edades clave */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl space-y-4">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-500">
              <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
            </span>
            Edades clave en Colombia
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Edad</th>
                  <th className="text-left py-2 font-bold text-slate-700 dark:text-slate-300">Hito</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-semibold">14 años</td>
                  <td className="py-2">Edad mínima para trabajar (con permiso del Ministerio de Trabajo)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-semibold">18 años</td>
                  <td className="py-2">Mayoría de edad, derecho al voto, cédula de ciudadanía</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-semibold">25 años</td>
                  <td className="py-2">Dejas de estar como beneficiario en la EPS de tus padres</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-semibold">57 años</td>
                  <td className="py-2">Edad de pensión para mujeres (con 1,300 semanas cotizadas)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-semibold">62 años</td>
                  <td className="py-2">Edad de pensión para hombres (con 1,300 semanas cotizadas)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-semibold">70 años</td>
                  <td className="py-2">Edad máxima de retiro forzoso en el sector público</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CalculatorFooter href="/herramientas/calculadora-edad" />
    </div>
  );
}
