"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Persona {
  id: number;
  nombre: string;
  pagado: string;
}

interface Moneda {
  codigo: string;
  simbolo: string;
  nombre: string;
  locale: string;
}

const monedas: Moneda[] = [
  { codigo: "USD", simbolo: "$", nombre: "Dólar", locale: "en-US" },
  { codigo: "EUR", simbolo: "€", nombre: "Euro", locale: "es-ES" },
  { codigo: "ARS", simbolo: "$", nombre: "Peso ARG", locale: "es-AR" },
  { codigo: "MXN", simbolo: "$", nombre: "Peso MXN", locale: "es-MX" },
  { codigo: "COP", simbolo: "$", nombre: "Peso COL", locale: "es-CO" },
  { codigo: "CLP", simbolo: "$", nombre: "Peso CLP", locale: "es-CL" },
  { codigo: "PEN", simbolo: "S/", nombre: "Sol", locale: "es-PE" },
  { codigo: "BRL", simbolo: "R$", nombre: "Real", locale: "pt-BR" },
];

function detectarMoneda(): Moneda {
  if (typeof navigator === "undefined") return monedas[0];
  const locale = navigator.language || "en-US";
  const encontrada = monedas.find(m => m.locale.toLowerCase() === locale.toLowerCase());
  if (encontrada) return encontrada;
  const codigoPais = locale.split("-")[1]?.toUpperCase();
  if (codigoPais) {
    const porPais = monedas.find(m => m.locale.endsWith(codigoPais));
    if (porPais) return porPais;
  }
  return monedas[0];
}

export default function DividirCuenta() {
  const [total, setTotal] = useState<string>("");
  const [propina, setPropina] = useState<string>("10");
  const [propinaCustom, setPropinaCustom] = useState<string>("");
  const [personas, setPersonas] = useState<Persona[]>([
    { id: 1, nombre: "Persona 1", pagado: "" },
    { id: 2, nombre: "Persona 2", pagado: "" },
  ]);
  const [modo, setModo] = useState<"igual" | "diferente">("igual");
  const [moneda, setMoneda] = useState<Moneda>(monedas[0]);
  const [resultado, setResultado] = useState<{
    totalConPropina: number;
    porPersona: number;
    propinaTotal: number;
  } | null>(null);
  const [resultadoDiferente, setResultadoDiferente] = useState<
    { nombre: string; debe: number }[] | null
  >(null);

  useEffect(() => {
    setMoneda(detectarMoneda());
  }, []);

  const propinaActual = propinaCustom !== "" ? propinaCustom : propina;

  const agregarPersona = () => {
    setPersonas([
      ...personas,
      { id: Date.now(), nombre: `Persona ${personas.length + 1}`, pagado: "" },
    ]);
  };

  const eliminarPersona = (id: number) => {
    if (personas.length > 2) {
      setPersonas(personas.filter((p) => p.id !== id));
    }
  };

  const actualizarPersona = (
    id: number,
    campo: "nombre" | "pagado",
    value: string
  ) => {
    setPersonas(
      personas.map((p) => (p.id === id ? { ...p, [campo]: value } : p))
    );
  };

  const seleccionarPropina = (valor: string) => {
    setPropina(valor);
    setPropinaCustom("");
  };

  const calcularIgual = () => {
    const t = parseFloat(total);
    const p = parseFloat(propinaActual) / 100;

    if (isNaN(t)) return;

    const propinaTotal = t * p;
    const totalConPropina = t + propinaTotal;
    const porPersona = totalConPropina / personas.length;

    setResultado({ totalConPropina, porPersona, propinaTotal });
    setResultadoDiferente(null);
  };

  const calcularDiferente = () => {
    const totalGastado = personas.reduce(
      (acc, p) => acc + (parseFloat(p.pagado) || 0),
      0
    );
    const p = parseFloat(propinaActual) / 100;
    const propinaTotal = totalGastado * p;
    const totalConPropina = totalGastado + propinaTotal;
    const porPersona = totalConPropina / personas.length;

    const resultados = personas.map((persona) => {
      const gastado = parseFloat(persona.pagado) || 0;
      const propinaProporcional = gastado * p;
      const totalPersona = gastado + propinaProporcional;
      const diferencia = totalPersona - porPersona;

      return {
        nombre: persona.nombre,
        debe: -diferencia,
      };
    });

    setResultadoDiferente(resultados);
    setResultado({ totalConPropina, porPersona, propinaTotal });
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/herramientas"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Herramientas
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-pink-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">🧾</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Dividir Cuenta
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Divide gastos entre amigos fácilmente
          </p>
        </div>

        <div className="space-y-6">
          {/* Selector de modo */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setModo("igual")}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${
                modo === "igual"
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Dividir igual
            </button>
            <button
              onClick={() => setModo("diferente")}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${
                modo === "diferente"
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Cada quien lo suyo
            </button>
          </div>

          {modo === "igual" ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  Total de la cuenta
                </label>
                <select
                  value={moneda.codigo}
                  onChange={(e) => setMoneda(monedas.find(m => m.codigo === e.target.value) || monedas[0])}
                  className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-transparent border-none cursor-pointer hover:text-pink-600"
                >
                  {monedas.map((m) => (
                    <option key={m.codigo} value={m.codigo}>
                      {m.simbolo} {m.codigo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">{moneda.simbolo}</span>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="50000"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  ¿Cuánto consumió cada quien?
                </label>
                <select
                  value={moneda.codigo}
                  onChange={(e) => setMoneda(monedas.find(m => m.codigo === e.target.value) || monedas[0])}
                  className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-transparent border-none cursor-pointer hover:text-pink-600"
                >
                  {monedas.map((m) => (
                    <option key={m.codigo} value={m.codigo}>
                      {m.simbolo} {m.codigo}
                    </option>
                  ))}
                </select>
              </div>
              {personas.map((persona) => (
                <div key={persona.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={persona.nombre}
                    onChange={(e) =>
                      actualizarPersona(persona.id, "nombre", e.target.value)
                    }
                    className="w-28 sm:w-32 px-4 py-3 rounded-xl text-sm font-semibold"
                  />
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold text-sm">{moneda.simbolo}</span>
                    <input
                      type="number"
                      value={persona.pagado}
                      onChange={(e) =>
                        actualizarPersona(persona.id, "pagado", e.target.value)
                      }
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-lg font-semibold"
                    />
                  </div>
                  <button
                    onClick={() => eliminarPersona(persona.id)}
                    className="w-10 h-10 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={agregarPersona}
                className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-500 font-bold hover:border-pink-400 hover:text-pink-500 transition-colors"
              >
                + Agregar persona
              </button>
            </div>
          )}

          {/* Propina */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Propina
            </label>
            <div className="flex gap-2">
              {["0", "10", "15", "20"].map((p) => (
                <button
                  key={p}
                  onClick={() => seleccionarPropina(p)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    propina === p && propinaCustom === ""
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {p}%
                </button>
              ))}
              <div className="relative w-20">
                <input
                  type="number"
                  value={propinaCustom}
                  onChange={(e) => setPropinaCustom(e.target.value)}
                  placeholder="Otro"
                  className={`w-full py-3 px-3 rounded-xl font-bold text-center transition-all ${
                    propinaCustom !== ""
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white ring-2 ring-pink-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                />
                {propinaCustom !== "" && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold text-sm">%</span>
                )}
              </div>
            </div>
          </div>

          {/* Número de personas (solo modo igual) */}
          {modo === "igual" && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿Cuántos son?
              </label>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() =>
                    personas.length > 2 &&
                    setPersonas(personas.slice(0, -1))
                  }
                  className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center py-4 bg-white/60 rounded-xl font-black text-2xl text-slate-700 dark:text-slate-300 ring-1 ring-slate-100 dark:ring-slate-900">
                  {personas.length}
                </div>
                <button
                  onClick={agregarPersona}
                  className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={modo === "igual" ? calcularIgual : calcularDiferente}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-pink-500/20 active:scale-[0.99]"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-10 p-8 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50 rounded-3xl ring-1 ring-pink-100 dark:ring-pink-900">
              <div className="text-center mb-6">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">Cada persona paga</p>
                <p className="text-5xl font-black text-pink-600 tracking-tighter">
                  {moneda.simbolo}{formatMoney(resultado.porPersona)}
                </p>
              </div>
              <div className="border-t border-pink-200 dark:border-pink-700 pt-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Subtotal</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {moneda.simbolo}{formatMoney(resultado.totalConPropina - resultado.propinaTotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Propina ({propinaActual}%)</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{moneda.simbolo}{formatMoney(resultado.propinaTotal)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-pink-100 dark:border-pink-900">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Total</span>
                  <span className="font-black text-lg text-slate-800 dark:text-slate-100">{moneda.simbolo}{formatMoney(resultado.totalConPropina)}</span>
                </div>
              </div>
            </div>
          )}

          {resultadoDiferente && (
            <div className="mt-4 space-y-3">
              {resultadoDiferente.map((r) => (
                <div
                  key={r.nombre}
                  className={`p-4 rounded-2xl flex justify-between items-center ${
                    r.debe > 0.01
                      ? "bg-rose-50 dark:bg-rose-950/50 ring-1 ring-rose-100 dark:ring-rose-900"
                      : r.debe < -0.01
                      ? "bg-emerald-50 dark:bg-emerald-950/50 ring-1 ring-emerald-100 dark:ring-emerald-900"
                      : "bg-slate-50 dark:bg-slate-800/50 ring-1 ring-slate-100 dark:ring-slate-900"
                  }`}
                >
                  <span className="font-bold text-slate-700 dark:text-slate-300">{r.nombre}</span>
                  <span
                    className={`font-bold ${
                      r.debe > 0.01
                        ? "text-rose-600"
                        : r.debe < -0.01
                        ? "text-emerald-600"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {r.debe > 0.01
                      ? `Debe poner ${moneda.simbolo}${formatMoney(r.debe)}`
                      : r.debe < -0.01
                      ? `Le deben ${moneda.simbolo}${formatMoney(Math.abs(r.debe))}`
                      : "Está a mano"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center text-base">💡</span>
          Consejos
        </h2>
        <ul className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-pink-500">•</span>
            En muchos países es costumbre dejar entre 10% y 20% de propina
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500">•</span>
            El modo "Cada quien lo suyo" es ideal cuando hay diferencias grandes en lo que consumió cada persona
          </li>
        </ul>
      </div>
    </div>
  );
}
