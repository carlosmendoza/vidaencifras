"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";
import {
  DEPARTAMENTOS,
  TIPOS_VEHICULO,
  getTarifas,
  calcularImpuesto,
  type TipoVehiculo,
} from "@/lib/data/impuestoVehicularColombia";

interface Resultado {
  impuestoAnual: number;
  tarifaAplicada: number;
  descuento: number;
  conDescuento: number;
  departamento: string;
  fechaLimite: string;
}

export default function CalculadoraImpuestoVehicular() {
  const [departamento, setDepartamento] = useState<string>("BOG");
  const [tipoVehiculo, setTipoVehiculo] = useState<TipoVehiculo>("particular");
  const [valorComercial, setValorComercial] = useState<string>("50000000");

  const departamentoSeleccionado = DEPARTAMENTOS.find((d) => d.codigo === departamento)!;

  const resultado = useMemo((): Resultado | null => {
    const valor = parseFloat(valorComercial);
    if (isNaN(valor) || valor <= 0) return null;

    const tarifas = getTarifas(departamentoSeleccionado, tipoVehiculo);
    const { impuesto, tarifa } = calcularImpuesto(valor, tarifas);

    const descuento = impuesto * (departamentoSeleccionado.descuentoProntoPago / 100);
    const conDescuento = impuesto - descuento;

    return {
      impuestoAnual: impuesto,
      tarifaAplicada: tarifa,
      descuento,
      conDescuento,
      departamento: departamentoSeleccionado.nombre,
      fechaLimite: departamentoSeleccionado.fechaLimiteProntoPago,
    };
  }, [valorComercial, departamentoSeleccionado, tipoVehiculo]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const faqs = [
    {
      question: "¿Cómo se calcula el impuesto vehicular?",
      answer:
        "Se aplica un porcentaje sobre el valor comercial según tablas de la DIAN. Las tarifas varían por tipo de vehículo y rango de valor.",
    },
    {
      question: "¿Qué pasa si no pago el impuesto?",
      answer:
        "Acumulas intereses de mora y sanciones. Además, no podrás hacer traspaso ni renovar documentos.",
    },
    {
      question: "¿Cuánto es el descuento por pronto pago?",
      answer:
        "La mayoría de departamentos ofrecen 10% de descuento si pagas antes de la fecha límite.",
    },
    {
      question: "¿Dónde consulto el valor comercial?",
      answer:
        "En la Resolución de valores del Ministerio de Transporte o en tu Secretaría de Hacienda departamental.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Calculadora de Préstamos",
      href: "/finanzas/calculadora-prestamos",
      description: "Financia tu vehículo",
      icon: "landmark",
    },
    {
      name: "Impuesto de Renta",
      href: "/finanzas/calculadora-impuesto-renta",
      description: "Calcula tu impuesto anual",
      icon: "file-text",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-amber-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="car" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Impuesto Vehicular
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula el impuesto de tu vehículo en Colombia
          </p>
        </div>

        <div className="space-y-6">
          {/* Departamento */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Departamento de matrícula
            </label>
            <select
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl text-lg font-semibold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500"
            >
              {DEPARTAMENTOS.map((d) => (
                <option key={d.codigo} value={d.codigo}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo de vehículo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tipo de vehículo
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TIPOS_VEHICULO.map((t) => (
                <button
                  key={t.valor}
                  onClick={() => setTipoVehiculo(t.valor)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left ${
                    tipoVehiculo === t.valor
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="block font-bold">{t.nombre}</span>
                  <span className="text-xs opacity-75">{t.descripcion}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Valor comercial */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Valor comercial del vehículo
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <input
                type="number"
                value={valorComercial}
                onChange={(e) => setValorComercial(e.target.value)}
                placeholder="50000000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Según tablas del Ministerio de Transporte
            </p>
          </div>

          {/* Resultado */}
          {resultado && (
            <div className="mt-8 space-y-4 animate-result-appear">
              {/* Impuesto principal */}
              <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-3xl text-center ring-1 ring-amber-100 dark:ring-amber-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">
                  Impuesto anual
                </p>
                <p className="text-5xl font-black text-amber-600 dark:text-amber-400">
                  ${formatMoney(resultado.impuestoAnual)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Tarifa aplicada: {resultado.tarifaAplicada}%
                </p>
              </div>

              {/* Con descuento */}
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-emerald-700 dark:text-emerald-300">
                      Con descuento pronto pago ({departamentoSeleccionado.descuentoProntoPago}%)
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {resultado.fechaLimite}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-emerald-600">
                      ${formatMoney(resultado.conDescuento)}
                    </p>
                    <p className="text-sm text-emerald-500">
                      Ahorras ${formatMoney(resultado.descuento)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Desglose */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-400">Valor comercial</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ${formatMoney(parseFloat(valorComercial))}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-400">Tarifa aplicada</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {resultado.tarifaAplicada}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-400">Departamento</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {resultado.departamento}
                  </span>
                </div>
              </div>

              <ShareButtons
                title="Calculadora de Impuesto Vehicular Colombia"
                text={`Calculé el impuesto vehicular de mi ${TIPOS_VEHICULO.find((t) => t.valor === tipoVehiculo)?.nombre.toLowerCase()} en ${resultado.departamento}`}
                result={{
                  label: "Impuesto anual",
                  value: `$${formatMoney(resultado.impuestoAnual)}`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Tabla de tarifas */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
          </span>
          Tarifas para vehículos particulares
        </h2>
        <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Rango de valor</th>
                <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Tarifa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Hasta $45.000.000</td>
                <td className="px-4 py-3 text-right font-bold text-amber-600">1.5%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">$45.000.001 - $90.000.000</td>
                <td className="px-4 py-3 text-right font-bold text-amber-600">2.5%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Más de $90.000.000</td>
                <td className="px-4 py-3 text-right font-bold text-amber-600">3.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Las tarifas pueden variar ligeramente entre departamentos. Consulta con tu Secretaría de Hacienda local.
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <FAQ items={faqs} colorClass="amber" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
