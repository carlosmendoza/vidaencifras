"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Icon } from "@/lib/icons";

const faqs = [
  {
    question: "¿Qué es la inflación y cómo me afecta?",
    answer:
      "La inflación es el aumento general de los precios. Te afecta porque el dinero que tienes hoy compra menos cosas mañana. Por ejemplo, si la inflación es 10% anual, algo que hoy cuesta $100.000 costará $110.000 el próximo año.",
  },
  {
    question: "¿Qué es el IPC y quién lo mide en Colombia?",
    answer:
      "El IPC (Índice de Precios al Consumidor) mide la variación de precios de una canasta de bienes y servicios. En Colombia lo calcula el DANE mensualmente, midiendo precios en 38 ciudades del país.",
  },
  {
    question: "¿Cómo puedo proteger mi dinero de la inflación?",
    answer:
      "Para proteger tu dinero, busca inversiones que rindan por encima de la inflación: CDTs a tasa fija, fondos de inversión, acciones, finca raíz, o bonos indexados a la inflación (TES UVR).",
  },
  {
    question: "¿Por qué el Banco de la República tiene meta de inflación del 3%?",
    answer:
      "Una inflación baja y estable (alrededor del 3%) favorece el crecimiento económico, facilita la planificación financiera de familias y empresas, y protege el poder adquisitivo de los colombianos, especialmente de los más vulnerables.",
  },
];

interface ResultadoInflacion {
  valorFuturo: number;
  valorPasado: number;
  perdidaPoder: number;
  porcentajePerdida: number;
  equivalenteHoy: number;
  inflacionAcumulada: number;
  evolucion: {
    año: number;
    valor: number;
    inflacionAcumulada: number;
  }[];
}

// Inflación histórica de Colombia (IPC anual)
const inflacionHistorica: { [key: number]: number } = {
  2024: 5.2,
  2023: 9.28,
  2022: 13.12,
  2021: 5.62,
  2020: 1.61,
  2019: 3.80,
  2018: 3.18,
  2017: 4.09,
  2016: 5.75,
  2015: 6.77,
  2014: 3.66,
  2013: 1.94,
  2012: 2.44,
  2011: 3.73,
  2010: 3.17,
  2009: 2.00,
  2008: 7.67,
  2007: 5.69,
  2006: 4.48,
  2005: 4.85,
  2004: 5.50,
  2003: 6.49,
  2002: 6.99,
  2001: 7.65,
  2000: 8.75,
};

export default function CalculadoraInflacion() {
  const [monto, setMonto] = useState<string>("");
  const [añoInicio, setAñoInicio] = useState<string>("2020");
  const [añoFin, setAñoFin] = useState<string>("2024");
  const [tipoCalculo, setTipoCalculo] = useState<"historico" | "proyeccion">("historico");
  const [inflacionPersonalizada, setInflacionPersonalizada] = useState<string>("5");
  const [añosProyeccion, setAñosProyeccion] = useState<string>("10");
  const [resultado, setResultado] = useState<ResultadoInflacion | null>(null);

  const añosDisponibles = Object.keys(inflacionHistorica).map(Number).sort((a, b) => a - b);
  const añoMinimo = añosDisponibles[0];
  const añoMaximo = añosDisponibles[añosDisponibles.length - 1];

  const calcular = () => {
    const montoNum = parseFloat(monto) || 0;
    if (montoNum <= 0) return;

    if (tipoCalculo === "historico") {
      const inicio = parseInt(añoInicio);
      const fin = parseInt(añoFin);

      if (inicio >= fin || inicio < añoMinimo || fin > añoMaximo) return;

      // Calcular inflación acumulada entre los años
      let factorInflacion = 1;
      const evolucion: ResultadoInflacion["evolucion"] = [];
      let valorActual = montoNum;

      for (let año = inicio; año <= fin; año++) {
        const inflacionAño = inflacionHistorica[año] || 0;
        if (año > inicio) {
          factorInflacion *= (1 + inflacionAño / 100);
          valorActual = montoNum * factorInflacion;
        }
        evolucion.push({
          año,
          valor: valorActual,
          inflacionAcumulada: (factorInflacion - 1) * 100,
        });
      }

      const valorEquivalenteHoy = montoNum * factorInflacion;
      const perdida = valorEquivalenteHoy - montoNum;

      setResultado({
        valorFuturo: valorEquivalenteHoy,
        valorPasado: montoNum,
        perdidaPoder: perdida,
        porcentajePerdida: (factorInflacion - 1) * 100,
        equivalenteHoy: montoNum / factorInflacion,
        inflacionAcumulada: (factorInflacion - 1) * 100,
        evolucion,
      });
    } else {
      // Proyección futura
      const años = parseInt(añosProyeccion) || 10;
      const inflacionAnual = parseFloat(inflacionPersonalizada) || 5;

      const evolucion: ResultadoInflacion["evolucion"] = [];
      let valorActual = montoNum;
      const añoActual = new Date().getFullYear();

      for (let i = 0; i <= años; i++) {
        const inflacionAcumulada = (Math.pow(1 + inflacionAnual / 100, i) - 1) * 100;
        evolucion.push({
          año: añoActual + i,
          valor: valorActual,
          inflacionAcumulada,
        });
        valorActual = montoNum * Math.pow(1 + inflacionAnual / 100, i + 1);
      }

      const factorInflacion = Math.pow(1 + inflacionAnual / 100, años);
      const valorFuturoNecesario = montoNum * factorInflacion;
      const perdida = valorFuturoNecesario - montoNum;

      setResultado({
        valorFuturo: valorFuturoNecesario,
        valorPasado: montoNum,
        perdidaPoder: perdida,
        porcentajePerdida: (factorInflacion - 1) * 100,
        equivalenteHoy: montoNum / factorInflacion,
        inflacionAcumulada: (factorInflacion - 1) * 100,
        evolucion,
      });
    }
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatPercent = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-teal-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"><Icon name="trending-down" className="w-10 h-10" /></div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Inflación
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Entiende cómo la inflación afecta tu dinero
          </p>
        </div>

        <div className="space-y-6">
          {/* Tipo de cálculo */}
          <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTipoCalculo("historico")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                tipoCalculo === "historico"
                  ? "bg-teal-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              Histórico
            </button>
            <button
              onClick={() => setTipoCalculo("proyeccion")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                tipoCalculo === "proyeccion"
                  ? "bg-teal-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              Proyección
            </button>
          </div>

          {/* Monto */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              {tipoCalculo === "historico"
                ? "¿Cuánto valía en el año inicial?"
                : "¿Cuánto vale hoy?"}
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <CurrencyInput
                value={monto}
                onChange={(v) => setMonto(v)}
                locale="es-CO"
                placeholder="1.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
          </div>

          {tipoCalculo === "historico" ? (
            <>
              {/* Año inicio */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                    Año inicial
                  </label>
                  <select
                    value={añoInicio}
                    onChange={(e) => setAñoInicio(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
                  >
                    {añosDisponibles.map((año) => (
                      <option key={año} value={año}>{año}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                    Año final
                  </label>
                  <select
                    value={añoFin}
                    onChange={(e) => setAñoFin(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
                  >
                    {añosDisponibles.map((año) => (
                      <option key={año} value={año}>{año}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-slate-400 ml-1">
                Datos del IPC según el DANE (Departamento Administrativo Nacional de Estadística)
              </p>
            </>
          ) : (
            <>
              {/* Años a proyectar */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  ¿Cuántos años quieres proyectar?
                </label>
                <input
                  type="number"
                  value={añosProyeccion}
                  onChange={(e) => setAñosProyeccion(e.target.value)}
                  placeholder="10"
                  min="1"
                  max="50"
                  className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
                />
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 15, 20, 30].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAñosProyeccion(a.toString())}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        añosProyeccion === a.toString()
                          ? "bg-teal-500 text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {a} años
                    </button>
                  ))}
                </div>
              </div>

              {/* Inflación estimada */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  Inflación anual estimada
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inflacionPersonalizada}
                    onChange={(e) => setInflacionPersonalizada(e.target.value)}
                    placeholder="5"
                    step="0.1"
                    className="w-full px-6 py-4 rounded-2xl text-lg font-semibold pr-12"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[3, 4, 5, 6, 8].map((i) => (
                    <button
                      key={i}
                      onClick={() => setInflacionPersonalizada(i.toString())}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        inflacionPersonalizada === i.toString()
                          ? "bg-teal-500 text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {i}%
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 ml-1">
                  El Banco de la República tiene meta de inflación del 3% anual.
                </p>
              </div>
            </>
          )}

          <button
            onClick={calcular}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-teal-500/20 active:scale-[0.99]"
          >
            Calcular impacto
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              {/* Resumen principal */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900">
                <div className="text-center">
                  {tipoCalculo === "historico" ? (
                    <>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        ${formatMoney(parseFloat(monto))} de {añoInicio} equivalen hoy a
                      </p>
                      <p className="text-4xl font-black text-teal-600">
                        ${formatMoney(resultado.valorFuturo)}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                        Inflación acumulada: {formatPercent(resultado.inflacionAcumulada)}%
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Para tener el mismo poder de compra en {añosProyeccion} años necesitarás
                      </p>
                      <p className="text-4xl font-black text-teal-600">
                        ${formatMoney(resultado.valorFuturo)}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                        Inflación proyectada: {formatPercent(resultado.inflacionAcumulada)}%
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Explicación del impacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    {tipoCalculo === "historico" ? "Pérdida de poder adquisitivo" : "Dinero extra que necesitarás"}
                  </p>
                  <p className="text-2xl font-black text-red-600">
                    +${formatMoney(resultado.perdidaPoder)}
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    {tipoCalculo === "historico"
                      ? `$${formatMoney(parseFloat(monto))} de hoy valdrían en ${añoInicio}`
                      : `$${formatMoney(parseFloat(monto))} de hoy valdrán en ${parseInt(añosProyeccion) + new Date().getFullYear()}`}
                  </p>
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                    ${formatMoney(resultado.equivalenteHoy)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">en términos de poder de compra</p>
                </div>
              </div>

              {/* Evolución */}
              {resultado.evolucion.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">
                    {tipoCalculo === "historico" ? "Inflación año a año" : "Proyección"}
                  </h3>
                  <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Año</th>
                          <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Valor equivalente</th>
                          <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Inflación acum.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {resultado.evolucion.map((row) => (
                          <tr key={row.año} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">{row.año}</td>
                            <td className="px-4 py-3 text-right font-bold text-teal-600">
                              ${formatMoney(row.valor)}
                            </td>
                            <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                              {formatPercent(row.inflacionAcumulada)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Consejo */}
              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-xl text-sm text-teal-700 dark:text-teal-300">
                <span className="inline-flex items-center gap-1 text-teal-600"><Icon name="lightbulb" className="w-4 h-4" weight="fill" /> <strong>Tip:</strong></span> Para proteger tu dinero de la inflación, busca inversiones que rindan por encima del IPC: CDTs, fondos de inversión, acciones o finca raíz.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-500"><Icon name="lightbulb" className="w-5 h-5" weight="fill" /></span>
            ¿Qué es la inflación?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
            La inflación es el aumento generalizado de los precios en la economía. Cuando hay inflación, el dinero pierde poder de compra: con los mismos $100.000 puedes comprar menos cosas que antes.
          </p>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>IPC:</strong> El Índice de Precios al Consumidor mide la inflación en Colombia. Lo calcula el DANE cada mes.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Meta de inflación:</strong> El Banco de la República busca mantener la inflación alrededor del 3% anual.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Impacto en ahorros:</strong> Si tu cuenta de ahorros rinde 3% pero la inflación es 5%, en realidad estás perdiendo 2% de poder adquisitivo.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500">•</span>
              <span><strong>Salario mínimo:</strong> Se ajusta anualmente considerando la inflación del año anterior para mantener el poder de compra.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <FAQ items={faqs} colorClass="teal" />
        </div>
      </div>
    </div>
  );
}
