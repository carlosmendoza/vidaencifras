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
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-400 mb-6">
        Dato del día
      </p>

      <div className="bg-indigo-50 dark:bg-slate-800/60 rounded-2xl p-8 md:p-12 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-shrink-0 text-center md:text-left">
            <span
              className={`text-6xl md:text-7xl font-black bg-gradient-to-br ${dato.gradient} bg-clip-text text-transparent leading-none`}
            >
              {dato.numero}
            </span>
            {dato.unidad && (
              <span className="block text-lg font-bold text-slate-400 dark:text-slate-500 mt-1">
                {dato.unidad}
              </span>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-5">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {dato.dato}
            </p>
            <Link
              href={dato.calculadora}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
            >
              Probar {dato.nombreCalculadora}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
