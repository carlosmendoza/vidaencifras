"use client";

import Link from "next/link";
import { datosDelDia } from "@/lib/datos-del-dia";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function DatoDelDia() {
  const index = getDayOfYear() % datosDelDia.length;
  const dato = datosDelDia[index];

  return (
    <section id="dato-del-dia">
      <Link
        href={dato.calculadora}
        className="block sm:flex sm:items-center gap-4 md:gap-6 bg-indigo-50 dark:bg-slate-800/60 rounded-xl px-5 py-4 hover:bg-indigo-100/80 dark:hover:bg-slate-800 transition-colors group"
      >
        <div className="flex items-center gap-3 sm:contents">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 whitespace-nowrap sm:hidden">
            Dato del día
          </span>
          <span className="hidden sm:block text-xs font-bold uppercase tracking-widest text-indigo-400 whitespace-nowrap">
            Dato del día
          </span>
          <span className="hidden sm:block w-px h-6 bg-indigo-200 dark:bg-slate-700 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-0 sm:contents">
          <span
            className={`text-2xl md:text-3xl font-black bg-gradient-to-br ${dato.gradient} bg-clip-text text-transparent leading-none flex-shrink-0`}
          >
            {dato.numero}
            {dato.unidad && (
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 ml-1">
                {dato.unidad}
              </span>
            )}
          </span>
          <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-snug">
            {dato.dato}
          </span>
        </div>
        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs whitespace-nowrap mt-2 sm:mt-0 sm:ml-auto group-hover:underline">
          Probar calculadora →
        </span>
      </Link>
    </section>
  );
}
