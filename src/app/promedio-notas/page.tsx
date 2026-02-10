"use client";

import { useState } from "react";
import Link from "next/link";

interface Nota {
  id: number;
  valor: string;
  peso: string;
}

export default function PromedioNotas() {
  const [notas, setNotas] = useState<Nota[]>([
    { id: 1, valor: "", peso: "" },
    { id: 2, valor: "", peso: "" },
    { id: 3, valor: "", peso: "" },
  ]);
  const [tipoPonderado, setTipoPonderado] = useState(false);
  const [resultado, setResultado] = useState<number | null>(null);

  const agregarNota = () => {
    setNotas([...notas, { id: Date.now(), valor: "", peso: "" }]);
  };

  const eliminarNota = (id: number) => {
    if (notas.length > 1) {
      setNotas(notas.filter((n) => n.id !== id));
    }
  };

  const actualizarNota = (id: number, campo: "valor" | "peso", value: string) => {
    setNotas(
      notas.map((n) => (n.id === id ? { ...n, [campo]: value } : n))
    );
  };

  const calcular = () => {
    const notasValidas = notas.filter((n) => n.valor !== "");

    if (notasValidas.length === 0) return;

    if (tipoPonderado) {
      let sumaPonderada = 0;
      let sumaPesos = 0;

      notasValidas.forEach((n) => {
        const valor = parseFloat(n.valor);
        const peso = parseFloat(n.peso) || 1;
        sumaPonderada += valor * peso;
        sumaPesos += peso;
      });

      setResultado(sumaPonderada / sumaPesos);
    } else {
      const suma = notasValidas.reduce((acc, n) => acc + parseFloat(n.valor), 0);
      setResultado(suma / notasValidas.length);
    }
  };

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-blue-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">📚</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Promedio de Notas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula tu promedio simple o ponderado
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setTipoPonderado(false)}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${
                !tipoPonderado
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setTipoPonderado(true)}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${
                tipoPonderado
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Ponderado
            </button>
          </div>

          <div className="space-y-3">
            {notas.map((nota, index) => (
              <div key={nota.id} className="flex gap-3 items-center">
                <span className="text-slate-400 dark:text-slate-500 font-bold w-8 text-center">#{index + 1}</span>
                <input
                  type="number"
                  value={nota.valor}
                  onChange={(e) => actualizarNota(nota.id, "valor", e.target.value)}
                  placeholder="Nota"
                  step="0.1"
                  className="flex-1 px-5 py-4 rounded-xl text-lg font-semibold"
                />
                {tipoPonderado && (
                  <div className="relative w-24 sm:w-32">
                    <input
                      type="number"
                      value={nota.peso}
                      onChange={(e) => actualizarNota(nota.id, "peso", e.target.value)}
                      placeholder="20"
                      className="w-full px-3 py-4 rounded-xl text-lg font-semibold pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">%</span>
                  </div>
                )}
                <button
                  onClick={() => eliminarNota(nota.id)}
                  className="w-10 h-10 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={agregarNota}
            className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 dark:text-slate-500 font-bold hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            + Agregar otra nota
          </button>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.99]"
          >
            Calcular Promedio
          </button>

          {resultado !== null && (
            <div className="mt-10 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-3xl text-center ring-1 ring-blue-100 dark:ring-blue-900">
              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">Tu promedio es:</p>
              <p className="text-7xl font-black text-indigo-600 tracking-tighter">
                {resultado.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-base">ℹ️</span>
          ¿Cuál es la diferencia?
        </h2>
        <div className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Promedio simple:</strong> Suma todas las notas y divide entre
            la cantidad. Todas las notas valen lo mismo.
          </p>
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Promedio ponderado:</strong> Cada nota tiene un peso
            diferente (por ejemplo, el examen final vale 40% y los parciales 30%
            cada uno).
          </p>
        </div>
      </div>
    </div>
  );
}
