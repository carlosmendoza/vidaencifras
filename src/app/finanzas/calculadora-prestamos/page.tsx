"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Moneda {
  codigo: string;
  simbolo: string;
  nombre: string;
  locale: string;
}

const monedas: Moneda[] = [
  { codigo: "USD", simbolo: "$", nombre: "Dólar estadounidense", locale: "en-US" },
  { codigo: "EUR", simbolo: "€", nombre: "Euro", locale: "es-ES" },
  { codigo: "ARS", simbolo: "$", nombre: "Peso argentino", locale: "es-AR" },
  { codigo: "MXN", simbolo: "$", nombre: "Peso mexicano", locale: "es-MX" },
  { codigo: "COP", simbolo: "$", nombre: "Peso colombiano", locale: "es-CO" },
  { codigo: "CLP", simbolo: "$", nombre: "Peso chileno", locale: "es-CL" },
  { codigo: "PEN", simbolo: "S/", nombre: "Sol peruano", locale: "es-PE" },
  { codigo: "BRL", simbolo: "R$", nombre: "Real brasileño", locale: "pt-BR" },
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

interface Resultado {
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
  amortizacion: {
    mes: number;
    cuota: number;
    capital: number;
    interes: number;
    saldo: number;
  }[];
}

export default function Prestamos() {
  const [monto, setMonto] = useState<string>("");
  const [tasaAnual, setTasaAnual] = useState<string>("");
  const [plazoMeses, setPlazoMeses] = useState<string>("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(false);
  const [moneda, setMoneda] = useState<Moneda>(monedas[0]);
  const [mostrarSelectorMoneda, setMostrarSelectorMoneda] = useState<boolean>(false);

  useEffect(() => {
    setMoneda(detectarMoneda());
  }, []);

  const calcular = () => {
    const P = parseFloat(monto);
    const tasaAnualNum = parseFloat(tasaAnual);
    const n = parseInt(plazoMeses);

    if (isNaN(P) || isNaN(tasaAnualNum) || isNaN(n) || P <= 0 || n <= 0) return;

    const r = tasaAnualNum / 100 / 12; // Tasa mensual

    let cuotaMensual: number;
    if (r === 0) {
      cuotaMensual = P / n;
    } else {
      cuotaMensual = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPagar = cuotaMensual * n;
    const totalIntereses = totalPagar - P;

    // Tabla de amortización
    const amortizacion: Resultado["amortizacion"] = [];
    let saldo = P;

    for (let mes = 1; mes <= n; mes++) {
      const interesMes = saldo * r;
      const capitalMes = cuotaMensual - interesMes;
      saldo -= capitalMes;

      amortizacion.push({
        mes,
        cuota: cuotaMensual,
        capital: capitalMes,
        interes: interesMes,
        saldo: Math.max(0, saldo),
      });
    }

    setResultado({
      cuotaMensual,
      totalPagar,
      totalIntereses,
      amortizacion,
    });
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const plazosRapidos = [12, 24, 36, 48, 60, 72];

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-rose-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">🏦</div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Préstamos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula tu cuota mensual y amortización
          </p>
        </div>

        <div className="space-y-6">
          {/* Monto del préstamo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Monto del préstamo
              </label>
              <button
                onClick={() => setMostrarSelectorMoneda(!mostrarSelectorMoneda)}
                className="text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                {moneda.codigo} {moneda.simbolo}
                <span className="text-[10px]">▼</span>
              </button>
            </div>

            {mostrarSelectorMoneda && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto">
                <div className="grid grid-cols-2 gap-1">
                  {monedas.map((m) => (
                    <button
                      key={m.codigo}
                      onClick={() => {
                        setMoneda(m);
                        setMostrarSelectorMoneda(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                        moneda.codigo === m.codigo
                          ? "bg-rose-100 text-rose-700 font-semibold"
                          : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <span className="font-medium">{m.simbolo}</span> {m.codigo}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">{moneda.simbolo}</span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="100000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
          </div>

          {/* Tasa de interés */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tasa de interés anual
            </label>
            <div className="relative">
              <input
                type="number"
                value={tasaAnual}
                onChange={(e) => setTasaAnual(e.target.value)}
                placeholder="12"
                step="0.1"
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-12"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">%</span>
            </div>
          </div>

          {/* Plazo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Plazo en meses
            </label>
            <div className="relative">
              <input
                type="number"
                value={plazoMeses}
                onChange={(e) => setPlazoMeses(e.target.value)}
                placeholder="36"
                className="w-full px-6 py-4 rounded-2xl text-xl font-semibold pr-16"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">meses</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {plazosRapidos.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlazoMeses(p.toString())}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    plazoMeses === p.toString()
                      ? "bg-rose-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {p} meses
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-rose-500/20 active:scale-[0.99]"
          >
            Calcular Cuota
          </button>

          {resultado && (
            <div className="mt-10 space-y-4">
              {/* Cuota mensual */}
              <div className="p-8 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/50 dark:to-pink-950/50 rounded-3xl text-center ring-1 ring-rose-100 dark:ring-rose-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">Tu cuota mensual</p>
                <p className="text-5xl font-black text-rose-600">
                  {moneda.simbolo}{formatMoney(resultado.cuotaMensual)}
                </p>
              </div>

              {/* Detalles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total a pagar</p>
                  <p className="text-xl font-black text-slate-700 dark:text-slate-300">
                    {moneda.simbolo}{formatMoney(resultado.totalPagar)}
                  </p>
                </div>
                <div className="p-5 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total intereses</p>
                  <p className="text-xl font-black text-rose-600">
                    {moneda.simbolo}{formatMoney(resultado.totalIntereses)}
                  </p>
                </div>
              </div>

              {/* Barra visual */}
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="w-3 h-3 bg-slate-400 rounded"></span>
                  <span className="text-slate-600 dark:text-slate-300">Capital: {((parseFloat(monto) / resultado.totalPagar) * 100).toFixed(1)}%</span>
                  <span className="w-3 h-3 bg-rose-400 rounded ml-4"></span>
                  <span className="text-slate-600 dark:text-slate-300">Intereses: {((resultado.totalIntereses / resultado.totalPagar) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-4 rounded-full overflow-hidden flex">
                  <div
                    className="bg-slate-400 h-full"
                    style={{ width: `${(parseFloat(monto) / resultado.totalPagar) * 100}%` }}
                  ></div>
                  <div
                    className="bg-rose-400 h-full"
                    style={{ width: `${(resultado.totalIntereses / resultado.totalPagar) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Tabla de amortización */}
              <button
                onClick={() => setMostrarTabla(!mostrarTabla)}
                className="w-full py-3 rounded-xl font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors flex items-center justify-center gap-2"
              >
                {mostrarTabla ? "Ocultar" : "Ver"} tabla de amortización
                <span className={`transition-transform ${mostrarTabla ? "rotate-180" : ""}`}>▼</span>
              </button>

              {mostrarTabla && (
                <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 max-h-80">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0">
                      <tr>
                        <th className="px-3 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Mes</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Cuota</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Capital</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Interés</th>
                        <th className="px-3 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Saldo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {resultado.amortizacion.map((row) => (
                        <tr key={row.mes} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-3 py-2 font-semibold text-slate-800 dark:text-slate-100">{row.mes}</td>
                          <td className="px-3 py-2 text-right">{moneda.simbolo}{formatMoney(row.cuota)}</td>
                          <td className="px-3 py-2 text-right text-slate-600 dark:text-slate-300">{moneda.simbolo}{formatMoney(row.capital)}</td>
                          <td className="px-3 py-2 text-right text-rose-600">{moneda.simbolo}{formatMoney(row.interes)}</td>
                          <td className="px-3 py-2 text-right font-semibold">{moneda.simbolo}{formatMoney(row.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center text-base">💡</span>
          Sistema de amortización francés
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Esta calculadora usa el <strong className="text-slate-700 dark:text-slate-300">sistema francés</strong>,
          donde todas las cuotas son iguales. Al principio pagas más intereses y menos capital,
          pero esto se invierte gradualmente a lo largo del préstamo.
        </p>
      </div>
    </div>
  );
}
