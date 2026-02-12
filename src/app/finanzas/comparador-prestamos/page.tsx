"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";
import { CurrencyInput } from "@/components/CurrencyInput";
import {
  BANCOS_PRESTAMOS,
  TIPOS_PRESTAMO,
  getTasaTipica,
  bancoOfreceProducto,
  type TipoPrestamo,
} from "@/lib/data/bancosPrestamosColombia";

interface ResultadoBanco {
  nombre: string;
  tasa: number;
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
  seguroTotal: number;
  administracionTotal: number;
  costoTotal: number;
}

export default function ComparadorPrestamos() {
  const [monto, setMonto] = useState<string>("20000000");
  const [plazo, setPlazo] = useState<string>("36");
  const [tipoPrestamo, setTipoPrestamo] = useState<TipoPrestamo>("libre_inversion");

  const resultados = useMemo((): ResultadoBanco[] => {
    const montoNum = parseFloat(monto);
    const plazoNum = parseInt(plazo);

    if (isNaN(montoNum) || isNaN(plazoNum) || montoNum <= 0 || plazoNum <= 0) {
      return [];
    }

    return BANCOS_PRESTAMOS
      .filter((banco) => bancoOfreceProducto(banco, tipoPrestamo))
      .map((banco) => {
        const tasaAnual = getTasaTipica(banco, tipoPrestamo);
        const tasaMensual = tasaAnual / 100 / 12;

        // Cuota mensual (sistema francés)
        const cuotaMensual = tasaMensual > 0
          ? montoNum * (tasaMensual * Math.pow(1 + tasaMensual, plazoNum)) /
            (Math.pow(1 + tasaMensual, plazoNum) - 1)
          : montoNum / plazoNum;

        const totalPagar = cuotaMensual * plazoNum;
        const totalIntereses = totalPagar - montoNum;

        // Costos adicionales
        const seguroTotal = (banco.seguroVida / 100) * montoNum * (plazoNum / 12);
        const administracionTotal = banco.administracion * plazoNum;
        const costoTotal = totalPagar + seguroTotal + administracionTotal + banco.estudio;

        return {
          nombre: banco.nombre,
          tasa: tasaAnual,
          cuotaMensual,
          totalPagar,
          totalIntereses,
          seguroTotal,
          administracionTotal,
          costoTotal,
        };
      })
      .sort((a, b) => a.costoTotal - b.costoTotal);
  }, [monto, plazo, tipoPrestamo]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const plazosRapidos = tipoPrestamo === "vivienda"
    ? [60, 120, 180, 240]
    : [12, 24, 36, 48, 60, 72];

  const mejorOpcion = resultados[0];
  const peorOpcion = resultados[resultados.length - 1];
  const ahorroPotencial = peorOpcion && mejorOpcion
    ? peorOpcion.costoTotal - mejorOpcion.costoTotal
    : 0;

  const faqs = [
    {
      question: "¿Cómo elijo el mejor préstamo?",
      answer:
        "Compara el Costo Total del Crédito, no solo la tasa. Un préstamo con tasa más baja puede ser más caro por seguros y administración.",
    },
    {
      question: "¿Qué diferencia hay entre tasa nominal y efectiva?",
      answer:
        "La tasa efectiva anual (EA) es la que realmente pagas. Siempre compara usando tasa EA.",
    },
    {
      question: "¿Puedo pagar mi préstamo antes de tiempo?",
      answer:
        "Sí, por ley puedes prepagar sin penalización. Esto reduce los intereses totales.",
    },
    {
      question: "¿Qué documentos necesito?",
      answer:
        "Generalmente: cédula, certificado de ingresos, extractos bancarios y declaración de renta si aplica.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Préstamos",
      href: "/finanzas/calculadora-prestamos",
      description: "Calcula cuotas detalladamente",
      icon: "landmark",
    },
    {
      name: "Comparador de CDTs",
      href: "/finanzas/comparador-cdt",
      description: "Compara tasas de ahorro",
      icon: "bar-chart",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl shadow-teal-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="landmark" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Comparador de Préstamos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Encuentra la mejor tasa entre bancos colombianos
          </p>
        </div>

        <div className="space-y-6">
          {/* Tipo de préstamo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tipo de préstamo
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIPOS_PRESTAMO.map((tipo) => (
                <button
                  key={tipo.valor}
                  onClick={() => setTipoPrestamo(tipo.valor)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    tipoPrestamo === tipo.valor
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tipo.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Monto y plazo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Monto del préstamo
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  $
                </span>
                <CurrencyInput
                  value={monto}
                  onChange={(v) => setMonto(v)}
                  locale="es-CO"
                  placeholder="20000000"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Plazo (meses)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={plazo}
                  onChange={(e) => setPlazo(e.target.value)}
                  placeholder="36"
                  className="w-full px-6 py-4 rounded-2xl text-lg font-semibold pr-20"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  meses
                </span>
              </div>
            </div>
          </div>

          {/* Plazos rápidos */}
          <div className="flex flex-wrap gap-2">
            {plazosRapidos.map((p) => (
              <button
                key={p}
                onClick={() => setPlazo(p.toString())}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  plazo === p.toString()
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {p} meses {tipoPrestamo === "vivienda" && `(${p / 12} años)`}
              </button>
            ))}
          </div>

          {/* Resultados */}
          {resultados.length > 0 && (
            <div className="mt-8 space-y-6 animate-result-appear">
              {/* Mejor opción destacada */}
              <div className="p-8 bg-teal-50 dark:bg-teal-950/50 rounded-3xl ring-1 ring-teal-100 dark:ring-teal-900">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="seal-check" className="w-6 h-6 text-teal-600" />
                  <h3 className="text-lg font-bold text-teal-700 dark:text-teal-300">
                    Mejor opción: {mejorOpcion.nombre}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Cuota mensual</p>
                    <p className="text-2xl font-black text-teal-600">${formatMoney(mejorOpcion.cuotaMensual)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tasa EA</p>
                    <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                      {mejorOpcion.tasa.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total intereses</p>
                    <p className="text-2xl font-black text-amber-600">
                      ${formatMoney(mejorOpcion.totalIntereses)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Costo total</p>
                    <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                      ${formatMoney(mejorOpcion.costoTotal)}
                    </p>
                  </div>
                </div>
                {ahorroPotencial > 0 && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center">
                    Ahorras <strong>${formatMoney(ahorroPotencial)}</strong> vs la opción más cara
                  </p>
                )}
                <ShareButtons
                  title="Comparador de Préstamos Colombia"
                  text={`El mejor préstamo de ${TIPOS_PRESTAMO.find(t => t.valor === tipoPrestamo)?.nombre.toLowerCase()} para $${formatMoney(parseFloat(monto))} a ${plazo} meses es ${mejorOpcion.nombre}`}
                  result={{
                    label: "Cuota mensual",
                    value: `$${formatMoney(mejorOpcion.cuotaMensual)}`,
                  }}
                />
              </div>

              {/* Tabla comparativa */}
              <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Banco</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Tasa EA</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Cuota</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Intereses</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Otros costos</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Costo total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {resultados.map((r, index) => (
                      <tr
                        key={r.nombre}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          index === 0 ? "bg-teal-50/50 dark:bg-teal-900/20" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                          {index === 0 && (
                            <Icon name="seal-check" className="w-5 h-5 inline-block mr-2 text-teal-600" />
                          )}
                          {r.nombre}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                          {r.tasa.toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-800 dark:text-slate-100">
                          ${formatMoney(r.cuotaMensual)}
                        </td>
                        <td className="px-4 py-3 text-right text-amber-600">
                          ${formatMoney(r.totalIntereses)}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500">
                          ${formatMoney(r.seguroTotal + r.administracionTotal)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-teal-600">
                          ${formatMoney(r.costoTotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Nota sobre tasas */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-2xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Nota:</strong> Las tasas mostradas son referencias típicas. La tasa real depende de tu perfil crediticio, ingresos y relación con el banco. Consulta directamente con cada entidad para cotizaciones personalizadas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Consejos */}
      <div className="max-w-4xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
          </span>
          Consejos para obtener mejor tasa
        </h2>
        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Mantén buen historial crediticio:</strong> Paga a tiempo tus deudas y mantén bajo tu nivel de endeudamiento.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Sé cliente del banco:</strong> Las mejores tasas suelen ser para clientes con productos activos (nómina, ahorro, tarjetas).</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Negocia:</strong> Lleva cotizaciones de otros bancos para negociar mejores condiciones.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-500">•</span>
            <span><strong>Considera el plazo:</strong> Plazos más cortos = menos intereses totales, aunque cuotas más altas.</span>
          </li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="teal" />
      </div>

      <div className="max-w-4xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
